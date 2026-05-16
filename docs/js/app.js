import { AXES, MODULES } from "./data.js";
import {
  getQuestionPool,
  getQuestionById,
  getQuestionsForAxis,
  getAxisById,
  getTotalQuestionCount,
  sessionSizesForChapter,
  SESSION_SIZE_OPTIONS,
} from "./pool.js";
import {
  loadRevisionProgress,
  saveModuleScore,
  getModuleProgress,
  recordQuestionAttempt,
  saveActiveQuizSession,
  getActiveQuizSession,
  saveActiveFinalSession,
  getActiveFinalSession,
  appendFinalExamResult,
  getMasteryStats,
  isUnlockComplete,
  isPretestTabUnlocked,
  isFinalExamUnlocked,
  isDevBypassUnlock,
  getPretestUnlockProgress,
  recordPretestSessionResult,
  PRETEST_FINAL_UNLOCK_RATE,
  applySrsMaster,
  applySrsReview,
  onPretestSessionComplete,
  needsPretestPauseWarning,
  getPretestPref,
  savePretestPref,
  getActivePretestSession,
  saveActivePretestSession,
  getFinalPref,
  saveFinalPref,
  isHelpDismissed,
  dismissHelp,
} from "./progress.js";
import { createPretestSession } from "./pretest-session.js";

const app = document.getElementById("app");

/** @type {"revision"|"pretest"|"final"} */
let activeTab = "revision";
/** @type {string} */
let screen = "home";
let route = { axisId: null, moduleId: null };

let quiz = {
  questions: [],
  index: 0,
  score: 0,
  answered: false,
  selected: null,
  feedbackModalDismissed: false,
  moduleTitle: "",
  moduleCode: "",
};

/** @type {null | { mode: "pretest"|"final", axisId?: string, targetCount: number, queue: string[], index: number, flipped: boolean, errors: object[] }} */
let cardSession = null;

/** @type {null | "revision"|"pretest"|"final"} */
let pendingHelp = null;
let showPauseWarn = false;
let pauseWarnContinue = null;

const HELP_TEXT = {
  revision: {
    title: "Mode Révision",
    body: `<p>Parcourez les <strong>chapitres</strong> puis les <strong>modules</strong> : chaque module est un <strong>QCM</strong> (4 choix, correction immédiate).</p>
      <p>Votre progression est enregistrée sur cet appareil (meilleur score par module).</p>
      <p>L'onglet <strong>Pré-examen</strong> s'ouvre lorsque chaque question a été <strong>vue et répondue correctement au moins une fois</strong> en révision (404/404).</p>
      <p>L'<strong>Examen final</strong> s'ouvre en plus lorsque chaque chapitre a atteint au moins <strong>80 %</strong> de « Je maîtrise » sur une session de pré-examen terminée.</p>`,
  },
  pretest: {
    title: "Mode Pré-examen",
    body: `<p>Cartes <strong>recto-verso</strong> par <strong>chapitre</strong> : réfléchissez, retournez la carte, puis indiquez <strong>Je maîtrise</strong> ou <strong>À revoir</strong> (répétition espacée).</p>
      <p>Choisissez un quota par session (25 à 150). Une session interrompue reprend où vous l'avez laissée.</p>
      <p>Les erreurs sont reprises sur les sessions suivantes, mélangées avec de nouvelles cartes.</p>
      <p><strong>Conseil :</strong> laissez au moins <strong>5 minutes</strong> entre deux sessions de pré-examen (quel que soit le chapitre) pour mieux mémoriser.</p>
      <p>Pour déverrouiller l'<strong>examen final</strong> : au moins <strong>80 %</strong> de « Je maîtrise » sur une session <strong>terminée</strong>, pour <strong>chaque chapitre</strong> (meilleur score conservé).</p>`,
  },
  final: {
    title: "Mode Examen final",
    body: `<p>Même principe de <strong>carte</strong>, mais sur <strong>tous les chapitres</strong> mélangés.</p>
      <p>Accès réservé après révision complète du CET et pré-examen solide (≥ 80 % « Je maîtrise » par chapitre).</p>
      <p>Après le verso, indiquez <strong>Correct</strong> ou <strong>Incorrect</strong> (auto-évaluation honnête). Pas de résultat carte par carte : le bilan arrive à la fin.</p>
      <p>Seuil de réussite : <strong>80 %</strong> (orange entre 70 % et 80 %, rouge en dessous).</p>`,
  },
};

const FINAL_ENCOURAGE = {
  green: [
    "Excellent travail — vous êtes prêt(e) pour l'examen officiel.",
    "Très bon niveau. Continuez ainsi jusqu'à l'épreuve.",
    "Objectif atteint : félicitations pour cette session.",
  ],
  orange: [
    "Vous y êtes presque — quelques points à revoir avant l'examen.",
    "Bon parcours : un dernier effort sur les thèmes signalés ci-dessous.",
    "Proche du seuil : repassez les questions en rouge ci-dessous.",
  ],
  red: [
    "Ce n'est pas encore suffisant — reprenez la révision et les pré-examens par chapitre.",
    "Ne vous découragez pas : ciblez les modules faibles puis réessayez.",
    "Priorité : revoir les questions listées ci-dessous, puis une nouvelle session.",
  ],
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escapeHtml(raw) {
  return String(raw)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function splitModuleTitle(fullTitle) {
  const parts = fullTitle.split(/ — /);
  if (parts.length >= 2) {
    return { headline: parts[0].trim(), subtitle: parts.slice(1).join(" — ").trim() };
  }
  return { headline: fullTitle.trim(), subtitle: "" };
}

function formatModuleTitleForHeader(fullTitle) {
  const { headline, subtitle } = splitModuleTitle(fullTitle);
  if (!subtitle) {
    return `<div class="header-module"><span class="header-module__primary">${escapeHtml(headline)}</span></div>`;
  }
  return `<div class="header-module"><span class="header-module__primary">${escapeHtml(headline)}</span><span class="header-module__secondary">(${escapeHtml(subtitle)})</span></div>`;
}

function formatQuestionCount(n) {
  return n === 1 ? "1 question" : `${n} questions`;
}

function correctChoiceText(q) {
  return q.choices[q.correct];
}

function navigate(nextScreen, nextRoute = {}) {
  screen = nextScreen;
  route = { ...route, ...nextRoute };
  render();
}

function setTab(tab) {
  if (tab === "pretest" && !isPretestTabUnlocked()) return;
  if (tab === "final" && !isFinalExamUnlocked()) return;
  activeTab = tab;
  cardSession = null;
  if (tab === "revision") screen = "home";
  else if (tab === "pretest") screen = "pretest-chapters";
  else screen = "final-setup";

  if (tab === "pretest" && !isHelpDismissed("pretest")) pendingHelp = "pretest";
  if (tab === "final" && !isHelpDismissed("final")) pendingHelp = "final";
  render();
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function finalScoreTier(score, total) {
  const vert = Math.ceil(0.8 * total);
  const orange = Math.ceil(0.7 * total);
  if (score >= vert) return "green";
  if (score >= orange) return "orange";
  return "red";
}

/* ─── Shell ─── */

function renderUnlockBanner() {
  if (isDevBypassUnlock()) {
    return `<p class="header__unlock header__unlock--dev">Mode test actif (déverrouillage complet).</p>`;
  }
  const rev = getMasteryStats();
  const pre = getPretestUnlockProgress();
  const lines = [];
  if (!rev.complete) {
    lines.push(
      `Révision : ${rev.validated} / ${rev.total} questions validées (requis pour le pré-examen).`
    );
  } else if (!pre.complete) {
    lines.push(`Pré-examen : atteignez ≥ ${pre.thresholdPct} % « Je maîtrise » par chapitre pour l'examen final.`);
    const pending = pre.chapters
      .filter((c) => !c.ok)
      .map((c) => `ch. ${c.num} (${c.bestPct} %)`)
      .join(" · ");
    if (pending) lines.push(`Reste : ${pending}.`);
  }
  if (!lines.length) return "";
  return `<p class="header__unlock">${lines.join(" ")}</p>`;
}

function renderTabsShell(mainHtml) {
  const lockPretest = !isPretestTabUnlocked();
  const lockFinal = !isFinalExamUnlocked();
  const pretestTitle = lockPretest
    ? "Validez les 404 questions en révision"
    : "Pré-examen par chapitre";
  const finalTitle = lockFinal
    ? isUnlockComplete()
      ? `Pré-examen : ≥ ${Math.round(PRETEST_FINAL_UNLOCK_RATE * 100)} % « Je maîtrise » par chapitre requis`
      : "Terminez d'abord la révision complète"
    : "Examen final";
  return `
    <header class="header header--app">
      <h1>CET</h1>
      <p>Consignes d'exploitation TaM</p>
      ${renderUnlockBanner()}
    </header>
    <nav class="tabs" aria-label="Modes">
      <button type="button" class="tabs__btn ${activeTab === "revision" ? "tabs__btn--active" : ""}" data-tab="revision">Révision</button>
      <button type="button" class="tabs__btn ${activeTab === "pretest" ? "tabs__btn--active" : ""}" data-tab="pretest" ${lockPretest ? `disabled title="${pretestTitle}"` : ""}>Pré-examen</button>
      <button type="button" class="tabs__btn ${activeTab === "final" ? "tabs__btn--active" : ""}" data-tab="final" ${lockFinal ? `disabled title="${finalTitle}"` : ""}>Examen final</button>
    </nav>
    ${mainHtml}`;
}

function bindTabs() {
  app.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      setTab(btn.dataset.tab);
    });
  });
}

function renderHelpModal(mode) {
  const h = HELP_TEXT[mode];
  app.innerHTML = `
    <div class="help-backdrop" role="dialog" aria-modal="true">
      <div class="help-modal">
        <h2>${escapeHtml(h.title)}</h2>
        <div class="help-modal__body">${h.body}</div>
        <label class="help-modal__dismiss"><input type="checkbox" data-help-dismiss /> Ne plus afficher</label>
        <button type="button" class="btn btn--primary" data-help-close>Compris</button>
      </div>
    </div>`;
  app.querySelector("[data-help-close]").addEventListener("click", () => {
    if (app.querySelector("[data-help-dismiss]").checked) dismissHelp(mode);
    pendingHelp = null;
    render();
  });
}

function renderPauseWarnModal() {
  app.innerHTML = `
    <div class="help-backdrop" role="dialog" aria-modal="true">
      <div class="help-modal">
        <h2>Pause conseillée</h2>
        <div class="help-modal__body">
          <p>Pour mieux mémoriser, nous conseillons d'attendre <strong>au moins 5 minutes</strong> entre deux sessions de pré-examen (quel que soit le chapitre).</p>
          <p>Vous pouvez tout de même continuer si vous le souhaitez.</p>
        </div>
        <button type="button" class="btn btn--ghost" data-pause-cancel>Attendre</button>
        <button type="button" class="btn btn--primary" data-pause-go>Continuer quand même</button>
      </div>
    </div>`;
  app.querySelector("[data-pause-cancel]").addEventListener("click", () => {
    showPauseWarn = false;
    pauseWarnContinue = null;
    render();
  });
  app.querySelector("[data-pause-go]").addEventListener("click", () => {
    showPauseWarn = false;
    const fn = pauseWarnContinue;
    pauseWarnContinue = null;
    fn?.();
  });
}

/* ─── Révision ─── */

function isModulePerfect(axisId, moduleId) {
  const prog = getModuleProgress(axisId, moduleId);
  return !!(prog && prog.total > 0 && prog.score === prog.total);
}

/** Pas de reprise ni de bandeau « QCM en cours » si le module est déjà à 100 %. */
function discardActiveQuizIfPerfect(axisId, moduleId) {
  if (!isModulePerfect(axisId, moduleId)) return;
  const saved = getActiveQuizSession();
  if (saved?.axisId === axisId && saved?.moduleId === moduleId) {
    saveActiveQuizSession(null);
  }
}

function persistQuizSession() {
  if (screen !== "quiz" || !route.axisId || !route.moduleId || !quiz.questions?.length) return;
  if (isModulePerfect(route.axisId, route.moduleId)) return;
  saveActiveQuizSession({
    axisId: route.axisId,
    moduleId: route.moduleId,
    questionIds: quiz.questions.map((q) => q.id),
    index: quiz.index,
    score: quiz.score,
  });
}

function buildQuizFromSaved(saved, mod) {
  const byId = Object.fromEntries(mod.questions.map((q) => [q.id, q]));
  const questions = saved.questionIds.map((id) => byId[id]).filter(Boolean);
  return {
    questions: questions.length ? questions : shuffle(mod.questions),
    index: Math.min(saved.index ?? 0, Math.max(0, questions.length - 1)),
    score: saved.score ?? 0,
    answered: false,
    selected: null,
    moduleTitle: mod.title,
    moduleCode: mod.code,
    feedbackModalDismissed: false,
  };
}

function startQuiz(axisId, moduleId, fresh = true) {
  const mod = MODULES[axisId].find((m) => m.id === moduleId);
  if (!mod) return;

  if (fresh) {
    saveActiveQuizSession(null);
    quiz = {
      questions: shuffle(mod.questions),
      index: 0,
      score: 0,
      answered: false,
      selected: null,
      moduleTitle: mod.title,
      moduleCode: mod.code,
      feedbackModalDismissed: false,
    };
  } else {
    const saved = getActiveQuizSession();
    if (saved?.axisId === axisId && saved?.moduleId === moduleId) {
      quiz = buildQuizFromSaved(saved, mod);
    } else {
      startQuiz(axisId, moduleId, true);
      return;
    }
  }
  persistQuizSession();
  navigate("quiz", { axisId, moduleId });
}

function renderRevision() {
  switch (screen) {
    case "home":
      return renderHome();
    case "axis":
      return renderAxis();
    case "quiz":
      return renderQuiz();
    case "results":
      return renderResults();
    default:
      screen = "home";
      return renderHome();
  }
}

function renderHome() {
  const stats = getMasteryStats();
  const doneCount = Object.keys(loadRevisionProgress()).length;

  return `
    <main class="main">
      <p class="intro-note">Choisissez un chapitre, puis un module pour lancer un QCM.</p>
      <div class="axes">
        ${AXES.map((axis) => {
          const modules = MODULES[axis.id] || [];
          const qCount = modules.reduce((n, m) => n + m.questions.length, 0);
          return `
            <button type="button" class="axis-card" data-axis="${axis.id}" ${axis.available ? "" : "disabled"}>
              <span class="axis-card__num">Chapitre ${axis.num}</span>
              <div class="axis-card__title">${escapeHtml(axis.title)}</div>
              <p class="axis-card__desc">CET p. ${axis.cetPages} — ${escapeHtml(axis.desc)}</p>
              <div class="axis-card__meta">
                ${axis.available ? `<span class="badge">${modules.length} modules · ${qCount} questions</span>` : `<span class="badge badge--soon">Bientôt</span>`}
              </div>
            </button>`;
        }).join("")}
      </div>
      <p class="footer-note">Progression globale : <strong>${stats.validated} / ${stats.total}</strong> questions validées (au moins une bonne réponse en QCM).</p>
      ${doneCount ? `<p class="footer-note">${doneCount} module(s) avec score enregistré.</p>` : ""}
      ${renderResumeQuizBanner()}
      <p class="footer-note">Votre progression est enregistrée sur cet appareil (rechargement de page sans perte). Utilisez toujours la même adresse (ex. <strong>localhost:8080</strong>).</p>
      <p class="footer-note">Document interne TaM — outil d'entraînement personnel.</p>
    </main>`;
}

function renderResumeQuizBanner() {
  const saved = getActiveQuizSession();
  if (!saved?.axisId || !saved?.moduleId) return "";
  if (isModulePerfect(saved.axisId, saved.moduleId)) return "";
  const mod = MODULES[saved.axisId]?.find((m) => m.id === saved.moduleId);
  if (!mod) return "";
  const axis = getAxisById(saved.axisId);
  return `<div class="resume-banner">
      <p><strong>QCM en cours</strong> — ${escapeHtml(axis?.title || "")} · ${escapeHtml(mod.code)} (question ${(saved.index ?? 0) + 1})</p>
      <button type="button" class="btn btn--primary btn--sm" data-resume-quiz>Reprendre le module</button>
      <button type="button" class="btn btn--ghost btn--sm" data-discard-quiz>Abandonner</button>
    </div>`;
}

function renderAxis() {
  const axis = getAxisById(route.axisId);
  const modules = MODULES[route.axisId] || [];
  let activeQuiz = getActiveQuizSession();
  if (activeQuiz?.axisId === route.axisId && activeQuiz?.moduleId) {
    discardActiveQuizIfPerfect(route.axisId, activeQuiz.moduleId);
    activeQuiz = getActiveQuizSession();
  }

  return `
    <main class="main">
      <button type="button" class="link-back" data-back="home">← Chapitres</button>
      <h2 class="screen-title">${escapeHtml(axis.title)}</h2>
      <p class="screen-sub">Chapitre ${axis.num} — CET p. ${axis.cetPages}</p>
      <div class="modules">
        ${modules
          .map((m) => {
            const prog = getModuleProgress(route.axisId, m.id);
            const perfect = !!(prog && prog.total > 0 && prog.score === prog.total);
            const inProgress =
              !perfect &&
              activeQuiz?.axisId === route.axisId &&
              activeQuiz?.moduleId === m.id &&
              activeQuiz.index < (activeQuiz.questionIds?.length ?? 0);
            const { headline, subtitle } = splitModuleTitle(m.title);
            const nQ = m.questions.length;
            const bestLine = prog
              ? perfect
                ? `<span class="module-card__best module-card__best--perfect" title="Module maîtrisé à 100 %"><span class="module-card__celebrate" aria-hidden="true">🥳</span> ${prog.score}/${prog.total}</span>`
                : `<span class="module-card__best">Meilleur : ${prog.score}/${prog.total}</span>`
              : "";
            const progressLine = inProgress
              ? `<span class="module-card__best module-card__best--active">QCM en cours (q. ${activeQuiz.index + 1})</span>`
              : "";
            const descParagraph = subtitle
              ? `<p class="module-card__desc">${escapeHtml(subtitle)}</p>`
              : `<p class="module-card__desc module-card__desc--muted">Paragraphe ${escapeHtml(m.code)}</p>`;
            return `
              <button type="button" class="module-card" data-module="${m.id}">
                <div class="module-card__banner">
                  <span class="module-card__ref">${escapeHtml(m.code)}</span>
                  <span class="module-card__name">${escapeHtml(headline)}</span>
                </div>
                <div class="module-card__body">
                  ${descParagraph}
                  <div class="module-card__foot">
                    <span class="module-card__count">${formatQuestionCount(nQ)}</span>
                    ${progressLine}
                    ${bestLine}
                  </div>
                </div>
              </button>`;
          })
          .join("")}
      </div>
    </main>`;
}

function renderQuiz() {
  const q = quiz.questions[quiz.index];
  const total = quiz.questions.length;
  const pct = ((quiz.index + (quiz.answered ? 1 : 0)) / total) * 100;

  const choicesHtml = q.choices
    .map((text, i) => {
      let cls = "choice";
      if (quiz.answered) {
        if (i === q.correct) cls += " choice--correct";
        else if (i === quiz.selected) cls += " choice--wrong";
      }
      return `<button type="button" class="${cls}" data-choice="${i}" ${quiz.answered ? "disabled" : ""}>${escapeHtml(text)}</button>`;
    })
    .join("");

  const nextLabel = quiz.index + 1 < total ? "Question suivante" : "Voir le résultat";
  let postChoicesHtml = "";
  if (quiz.answered && quiz.feedbackModalDismissed) {
    postChoicesHtml = `<div class="quiz-actions"><button type="button" class="btn btn--primary" data-next>${nextLabel}</button></div>`;
  }

  let modalHtml = "";
  if (quiz.answered && !quiz.feedbackModalDismissed) {
    const ok = quiz.selected === q.correct;
    const title = ok ? "Bravo. Réponse correcte !" : "Mauvaise réponse. À revoir !";
    const titleCls = ok ? "quiz-modal__title quiz-modal__title--ok" : "quiz-modal__title quiz-modal__title--ko";
    modalHtml = `
    <div class="quiz-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="quiz-feedback-title">
      <div class="quiz-modal">
        <h2 id="quiz-feedback-title" class="${titleCls}">${title}</h2>
        <div class="quiz-modal__question-wrap">
          <p class="quiz-modal__question-label">La question était :</p>
          <p class="quiz-modal__question">${escapeHtml(q.prompt)}</p>
        </div>
        <div class="quiz-modal__body">
          <p class="quiz-modal__label">${ok ? "Réponse correcte" : "Bonne réponse"}</p>
          <p class="quiz-modal__correct-choice">${escapeHtml(q.choices[q.correct])}</p>
          <p class="quiz-modal__text">${escapeHtml(q.explanation)}</p>
        </div>
        <div class="quiz-modal__actions">
          <button type="button" class="btn btn--ghost quiz-modal__btn-narrow" data-modal-close>Fermer</button>
          <button type="button" class="btn btn--primary" data-modal-next>${nextLabel}</button>
        </div>
      </div>
    </div>`;
  }

  setTimeout(() => {
    if (quiz.answered && !quiz.feedbackModalDismissed) document.body.classList.add("quiz-modal-open");
  }, 0);

  return `
    <main class="main quiz-main">
      <button type="button" class="link-back" data-back="axis">← Modules</button>
      <p class="screen-sub">${escapeHtml(quiz.moduleCode)}</p>
      <div class="quiz-progress" aria-hidden="true"><div class="quiz-progress__bar" style="width:${pct}%"></div></div>
      <p class="quiz-meta">Question ${quiz.index + 1} / ${total}</p>
      <article class="quiz-card">
        <h2 class="quiz-card__question">${escapeHtml(q.prompt)}</h2>
        <div class="choices">${choicesHtml}</div>
        ${postChoicesHtml}
      </article>
      ${modalHtml}
    </main>`;
}

function renderResults() {
  const total = quiz.questions.length;
  const pct = Math.round((quiz.score / total) * 100);
  return `
    <main class="main">
      <h2 class="screen-title">Résultat</h2>
      <div class="results">
        <p class="results__score">${quiz.score}/${total}</p>
        <p class="results__label">${pct}% de bonnes réponses</p>
        <button type="button" class="btn btn--primary" data-retry>Recommencer ce module</button>
        <button type="button" class="btn btn--ghost" data-modules>Autres modules</button>
      </div>
    </main>`;
}

function bindRevision() {
  app.querySelectorAll(".axis-card[data-axis]:not(:disabled)").forEach((btn) => {
    btn.addEventListener("click", () => navigate("axis", { axisId: btn.dataset.axis }));
  });

  app.querySelector("[data-back='home']")?.addEventListener("click", () => navigate("home"));
  app.querySelector("[data-back='axis']")?.addEventListener("click", () => {
    if (screen === "quiz") persistQuizSession();
    navigate("axis");
  });

  app.querySelectorAll("[data-module]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const moduleId = btn.dataset.module;
      if (isModulePerfect(route.axisId, moduleId)) {
        discardActiveQuizIfPerfect(route.axisId, moduleId);
        startQuiz(route.axisId, moduleId, true);
        return;
      }
      const saved = getActiveQuizSession();
      if (
        saved?.axisId === route.axisId &&
        saved?.moduleId === moduleId &&
        saved.index < (saved.questionIds?.length ?? 0)
      ) {
        startQuiz(route.axisId, moduleId, false);
      } else {
        startQuiz(route.axisId, moduleId, true);
      }
    });
  });

  app.querySelector("[data-resume-quiz]")?.addEventListener("click", () => {
    const saved = getActiveQuizSession();
    if (saved) startQuiz(saved.axisId, saved.moduleId, false);
  });
  app.querySelector("[data-discard-quiz]")?.addEventListener("click", () => {
    saveActiveQuizSession(null);
    render();
  });

  if (screen === "quiz") bindQuizHandlers();
  app.querySelector("[data-retry]")?.addEventListener("click", () => startQuiz(route.axisId, route.moduleId, true));
  app.querySelector("[data-modules]")?.addEventListener("click", () => navigate("axis"));
}

function bindQuizHandlers() {
  const q = quiz.questions[quiz.index];
  const total = quiz.questions.length;

  function goNext() {
    if (quiz.index + 1 < total) {
      quiz.index++;
      quiz.answered = false;
      quiz.selected = null;
      quiz.feedbackModalDismissed = false;
      persistQuizSession();
      render();
    } else {
      saveModuleScore(route.axisId, route.moduleId, quiz.score, total);
      saveActiveQuizSession(null);
      navigate("results");
    }
  }

  if (!quiz.answered) {
    app.querySelectorAll("[data-choice]").forEach((btn) => {
      btn.addEventListener("click", () => {
        quiz.selected = Number(btn.dataset.choice);
        quiz.answered = true;
        quiz.feedbackModalDismissed = false;
        const ok = quiz.selected === q.correct;
        recordQuestionAttempt(q.id, ok);
        if (ok) quiz.score++;
        persistQuizSession();
        render();
      });
    });
  } else {
    app.querySelector("[data-modal-close]")?.addEventListener("click", () => {
      quiz.feedbackModalDismissed = true;
      render();
    });
    app.querySelector("[data-modal-next]")?.addEventListener("click", goNext);
    app.querySelector("[data-next]")?.addEventListener("click", goNext);
  }
}

/* ─── Pré-examen ─── */

function launchPretestSession(axisId, count, resumeSession) {
  const start = () => {
    const session = resumeSession || createPretestSession(axisId, count);
    if (!resumeSession) saveActivePretestSession(axisId, session);
    cardSession = {
      mode: "pretest",
      axisId,
      targetCount: session.targetCount,
      queue: session.queue,
      index: session.index ?? 0,
      masterCount: session.masterCount ?? 0,
      flipped: false,
    };
    screen = "pretest-card";
    render();
  };

  if (!resumeSession && needsPretestPauseWarning()) {
    showPauseWarn = true;
    pauseWarnContinue = start;
    render();
    return;
  }
  start();
}

function renderPretest() {
  switch (screen) {
    case "pretest-chapters":
      return renderPretestChapters();
    case "pretest-setup":
      return renderPretestSetup();
    case "pretest-card":
      return renderFlashcard();
    default:
      screen = "pretest-chapters";
      return renderPretestChapters();
  }
}

function renderPretestChapters() {
  const pre = getPretestUnlockProgress();
  const statsLine = pre.complete
    ? `<p class="footer-note">Examen final déverrouillé (chaque chapitre ≥ ${pre.thresholdPct} % sur une session).</p>`
    : `<p class="footer-note">Pour l'examen final : ≥ ${pre.thresholdPct} % « Je maîtrise » sur une session terminée, par chapitre.</p>`;

  return `
    <main class="main">
      <p class="intro-note">Choisissez un chapitre pour une session de cartes.</p>
      <div class="axes">
        ${AXES.filter((a) => a.available)
          .map((axis) => {
            const n = getQuestionsForAxis(axis.id).length;
            const active = getActivePretestSession(axis.id);
            const ch = pre.chapters.find((c) => c.axisId === axis.id);
            const bestPct = ch?.bestPct ?? 0;
            const okBadge = ch?.ok
              ? `<span class="badge badge--ok">Examen final : OK (${bestPct} %)</span>`
              : `<span class="badge">Meilleur : ${bestPct} % / ${pre.thresholdPct} % requis</span>`;
            const badge = active
              ? `<span class="badge badge--active">Session : ${active.index}/${active.targetCount}</span>`
              : okBadge;
            return `
              <button type="button" class="axis-card" data-pretest-axis="${axis.id}">
                <span class="axis-card__num">Chapitre ${axis.num}</span>
                <div class="axis-card__title">${escapeHtml(axis.title)}</div>
                <div class="axis-card__meta">${badge} · ${n} questions</div>
              </button>`;
          })
          .join("")}
      </div>
      ${statsLine}
    </main>`;
}

function renderPretestSetup() {
  const axis = getAxisById(route.axisId);
  const chapterCount = getQuestionsForAxis(route.axisId).length;
  const sizes = sessionSizesForChapter(chapterCount);
  const pref = getPretestPref(route.axisId);
  const active = getActivePretestSession(route.axisId);

  const radios = sizes
    .map(
      (n) => `
      <label class="radio-row">
        <input type="radio" name="pretest-size" value="${n}" ${n === (sizes.includes(pref) ? pref : sizes[0]) ? "checked" : ""} />
        <span>${n} questions</span>
      </label>`
    )
    .join("");

  return `
    <main class="main">
      <button type="button" class="link-back" data-pretest-back>← Chapitres</button>
      <h2 class="screen-title">${escapeHtml(axis.title)}</h2>
      <p class="screen-sub">${chapterCount} questions dans ce chapitre</p>
      <div class="setup-box">
        <p class="setup-box__lead">Nombre de cartes pour cette session :</p>
        <div class="radio-group">${radios}</div>
        <p class="footer-note">Une session interrompue reprend à la carte suivante. Les erreurs (« À revoir ») reviennent progressivement sur les sessions suivantes.</p>
        ${
          active
            ? `<button type="button" class="btn btn--primary" data-pretest-resume>Reprendre (${active.index} / ${active.targetCount})</button>
               <button type="button" class="btn btn--ghost" data-pretest-new>Nouvelle session</button>`
            : `<button type="button" class="btn btn--primary" data-pretest-start>Démarrer</button>`
        }
      </div>
    </main>`;
}

/* ─── Examen final ─── */

function buildFinalQueue(count) {
  return shuffle(getQuestionPool().map((q) => q.questionId)).slice(0, count);
}

function persistFinalSession() {
  if (!cardSession || cardSession.mode !== "final") return;
  saveActiveFinalSession({
    targetCount: cardSession.targetCount,
    queue: cardSession.queue,
    index: cardSession.index,
    correctCount: cardSession.correctCount ?? 0,
    errors: cardSession.errors ?? [],
    flipped: cardSession.flipped,
  });
}

function launchFinalSession(count, resumeSaved = null) {
  if (resumeSaved) {
    cardSession = {
      mode: "final",
      targetCount: resumeSaved.targetCount,
      queue: resumeSaved.queue,
      index: resumeSaved.index ?? 0,
      flipped: false,
      errors: resumeSaved.errors ?? [],
      correctCount: resumeSaved.correctCount ?? 0,
    };
  } else {
    cardSession = {
      mode: "final",
      targetCount: count,
      queue: buildFinalQueue(count),
      index: 0,
      flipped: false,
      errors: [],
      correctCount: 0,
    };
    persistFinalSession();
  }
  screen = "final-card";
  render();
}

function renderFinal() {
  switch (screen) {
    case "final-setup":
      return renderFinalSetup();
    case "final-card":
      return renderFlashcard();
    case "final-results":
      return renderFinalResults();
    default:
      screen = "final-setup";
      return renderFinalSetup();
  }
}

function renderFinalSetup() {
  const total = getTotalQuestionCount();
  const pref = getFinalPref();
  const sizes = SESSION_SIZE_OPTIONS.filter((n) => n <= total);

  const radios = sizes
    .map(
      (n) => `
      <label class="radio-row">
        <input type="radio" name="final-size" value="${n}" ${n === pref ? "checked" : ""} />
        <span>${n} questions (tous chapitres)</span>
      </label>`
    )
    .join("");

  const activeFinal = getActiveFinalSession();
  const finalResume =
    activeFinal?.queue?.length && activeFinal.index < activeFinal.queue.length
      ? `<div class="resume-banner">
          <p><strong>Examen en cours</strong> — carte ${activeFinal.index + 1} / ${activeFinal.queue.length}</p>
          <button type="button" class="btn btn--primary btn--sm" data-final-resume>Reprendre</button>
          <button type="button" class="btn btn--ghost btn--sm" data-final-discard>Abandonner</button>
        </div>`
      : "";

  return `
    <main class="main">
      <p class="intro-note">Session sur l'ensemble du CET (${total} questions).</p>
      ${finalResume}
      <div class="setup-box">
        <p class="setup-box__lead">Nombre de cartes :</p>
        <div class="radio-group">${radios}</div>
        <button type="button" class="btn btn--primary" data-final-start>Démarrer l'examen</button>
      </div>
    </main>`;
}

function renderFinalResults() {
  const { correctCount, targetCount, errors } = cardSession;
  const tier = finalScoreTier(correctCount, targetCount);
  const pct = Math.round((correctCount / targetCount) * 100);
  const msg = pickRandom(FINAL_ENCOURAGE[tier]);

  const errHtml =
    errors.length === 0
      ? '<p class="footer-note">Aucune erreur déclarée — bravo.</p>'
      : `<h3 class="errors-title">Questions à revoir (${errors.length})</h3>
         <ul class="errors-list">
           ${errors
             .map(
               (e) => `
             <li class="errors-list__item">
               <span class="errors-list__chapter">${escapeHtml(e.axisTitle)}</span>
               <p class="errors-list__q">${escapeHtml(e.prompt)}</p>
               <p class="errors-list__ref">(${escapeHtml(e.moduleRef)})</p>
               <p class="errors-list__a"><strong>Réponse attendue :</strong> ${escapeHtml(e.answer)}</p>
             </li>`
             )
             .join("")}
         </ul>`;

  return `
    <main class="main">
      <h2 class="screen-title">Résultat — Examen final</h2>
      <div class="results results--tier-${tier}">
        <p class="results__score">${correctCount}/${targetCount}</p>
        <p class="results__label">${pct}% — ${tier === "green" ? "Réussi" : tier === "orange" ? "Presque" : "À retravailler"}</p>
        <p class="results__encourage">${escapeHtml(msg)}</p>
      </div>
      ${errHtml}
      <button type="button" class="btn btn--primary" data-final-retry>Nouvelle session</button>
    </main>`;
}

/* ─── Carte flashcard (pré-examen + final) ─── */

function renderFlashcard() {
  const qid = cardSession.queue[cardSession.index];
  const q = getQuestionById(qid);
  if (!q) return `<main class="main"><p>Question introuvable.</p></main>`;

  const total = cardSession.queue.length;
  const pct = ((cardSession.index + (cardSession.flipped ? 1 : 0)) / total) * 100;
  const moduleRef = `voir ch. ${q.moduleCode}`;

  const actionsPretest = cardSession.flipped
    ? `<div class="flashcard-actions">
        <button type="button" class="btn btn--primary" data-srs-master>Je maîtrise</button>
        <button type="button" class="btn btn--ghost" data-srs-review>À revoir</button>
      </div>`
    : `<p class="flashcard-hint">Réfléchissez, puis touchez la carte pour voir la réponse.</p>`;

  const actionsFinal = cardSession.flipped
    ? `<div class="flashcard-actions">
        <button type="button" class="btn btn--primary" data-final-ok>Correct</button>
        <button type="button" class="btn btn--ghost" data-final-ko>Incorrect</button>
      </div>`
    : `<p class="flashcard-hint">Réfléchissez, puis touchez la carte pour voir la réponse.</p>`;

  return `
    <main class="main">
      ${
        cardSession.mode === "pretest"
          ? `<button type="button" class="link-back" data-card-abort>← Quitter la session</button>`
          : ""
      }
      <div class="quiz-progress" aria-hidden="true"><div class="quiz-progress__bar" style="width:${pct}%"></div></div>
      <p class="quiz-meta">Carte ${cardSession.index + 1} / ${total}</p>
      <article class="flashcard ${cardSession.flipped ? "flashcard--flipped" : ""}">
        <button type="button" class="flashcard__tap" data-flip ${cardSession.flipped ? "disabled" : ""}>
          <div class="flashcard__recto">
            <p class="flashcard__chapter">${escapeHtml(q.axisTitle)}</p>
            <h2 class="flashcard__prompt">${escapeHtml(q.prompt)}</h2>
            <p class="flashcard__ref">(${escapeHtml(moduleRef)})</p>
          </div>
        </button>
        ${
          cardSession.flipped
            ? `<div class="flashcard__verso">
                <p class="flashcard__label">Réponse attendue</p>
                <p class="flashcard__answer">${escapeHtml(correctChoiceText(q))}</p>
                <p class="flashcard__explain">${escapeHtml(q.explanation)}</p>
              </div>`
            : ""
        }
      </article>
      ${cardSession.mode === "pretest" ? actionsPretest : actionsFinal}
    </main>`;
}

function advanceCard() {
  const axisId = cardSession.axisId;
  cardSession.index++;
  cardSession.flipped = false;

  if (cardSession.index >= cardSession.queue.length) {
    if (cardSession.mode === "pretest") {
      const total = cardSession.queue.length;
      recordPretestSessionResult(axisId, cardSession.masterCount ?? 0, total);
      onPretestSessionComplete(axisId);
      saveActivePretestSession(axisId, null);
      cardSession = null;
      screen = "pretest-chapters";
    } else {
      const total = cardSession.queue.length;
      appendFinalExamResult({
        correctCount: cardSession.correctCount ?? 0,
        targetCount: total,
        tier: finalScoreTier(cardSession.correctCount ?? 0, total),
      });
      saveActiveFinalSession(null);
      screen = "final-results";
    }
    render();
    return;
  }

  if (cardSession.mode === "final") {
    persistFinalSession();
  }

  if (cardSession.mode === "pretest") {
    const session = getActivePretestSession(axisId);
    if (session) {
      session.index = cardSession.index;
      saveActivePretestSession(axisId, session);
    }
  }
  render();
}

function bindPretest() {
  app.querySelectorAll("[data-pretest-axis]").forEach((btn) => {
    btn.addEventListener("click", () => {
      route.axisId = btn.dataset.pretestAxis;
      screen = "pretest-setup";
      render();
    });
  });

  app.querySelector("[data-pretest-back]")?.addEventListener("click", () => {
    screen = "pretest-chapters";
    render();
  });

  app.querySelector("[data-pretest-start]")?.addEventListener("click", () => {
    const n = Number(app.querySelector('input[name="pretest-size"]:checked')?.value || 25);
    savePretestPref(route.axisId, n);
    launchPretestSession(route.axisId, n, null);
  });

  app.querySelector("[data-pretest-resume]")?.addEventListener("click", () => {
    const session = getActivePretestSession(route.axisId);
    if (session) launchPretestSession(route.axisId, session.targetCount, session);
  });

  app.querySelector("[data-pretest-new]")?.addEventListener("click", () => {
    const n = Number(app.querySelector('input[name="pretest-size"]:checked')?.value || 25);
    savePretestPref(route.axisId, n);
    saveActivePretestSession(route.axisId, null);
    launchPretestSession(route.axisId, n, null);
  });

  bindFlashcard();
}

function bindFinal() {
  app.querySelector("[data-final-start]")?.addEventListener("click", () => {
    const n = Number(app.querySelector('input[name="final-size"]:checked')?.value || 50);
    saveFinalPref(n);
    saveActiveFinalSession(null);
    launchFinalSession(n);
  });
  app.querySelector("[data-final-resume]")?.addEventListener("click", () => {
    const saved = getActiveFinalSession();
    if (saved) launchFinalSession(null, saved);
  });
  app.querySelector("[data-final-discard]")?.addEventListener("click", () => {
    saveActiveFinalSession(null);
    render();
  });
  app.querySelector("[data-final-retry]")?.addEventListener("click", () => {
    cardSession = null;
    screen = "final-setup";
    render();
  });
  bindFlashcard();
}

function bindFlashcard() {
  app.querySelector("[data-flip]")?.addEventListener("click", () => {
    if (!cardSession.flipped) {
      cardSession.flipped = true;
      render();
    }
  });

  app.querySelector("[data-card-abort]")?.addEventListener("click", () => {
    if (cardSession?.mode === "pretest" && route.axisId) {
      const session = getActivePretestSession(route.axisId);
      if (session) {
        session.index = cardSession.index;
        saveActivePretestSession(route.axisId, session);
      }
    }
    cardSession = null;
    screen = "pretest-chapters";
    render();
  });

  app.querySelector("[data-srs-master]")?.addEventListener("click", () => {
    const qid = cardSession.queue[cardSession.index];
    applySrsMaster(qid);
    cardSession.masterCount = (cardSession.masterCount ?? 0) + 1;
    if (cardSession.mode === "pretest" && route.axisId) {
      const session = getActivePretestSession(cardSession.axisId);
      if (session) {
        session.masterCount = cardSession.masterCount;
        saveActivePretestSession(cardSession.axisId, session);
      }
    }
    advanceCard();
  });

  app.querySelector("[data-srs-review]")?.addEventListener("click", () => {
    const qid = cardSession.queue[cardSession.index];
    applySrsReview(qid);
    advanceCard();
  });

  app.querySelector("[data-final-ok]")?.addEventListener("click", () => {
    cardSession.correctCount++;
    advanceCard();
  });

  app.querySelector("[data-final-ko]")?.addEventListener("click", () => {
    const qid = cardSession.queue[cardSession.index];
    const q = getQuestionById(qid);
    cardSession.errors.push({
      axisTitle: q.axisTitle,
      prompt: q.prompt,
      moduleRef: `voir ch. ${q.moduleCode}`,
      answer: correctChoiceText(q),
    });
    advanceCard();
  });
}

/* ─── Render racine ─── */

function render() {
  document.body.classList.remove("quiz-modal-open");

  if (showPauseWarn) {
    renderPauseWarnModal();
    return;
  }

  if (pendingHelp) {
    renderHelpModal(pendingHelp);
    return;
  }

  let mainHtml = "";
  if (activeTab === "revision") mainHtml = renderRevision();
  else if (activeTab === "pretest") mainHtml = renderPretest();
  else mainHtml = renderFinal();

  app.innerHTML = renderTabsShell(mainHtml);
  bindTabs();

  if (activeTab === "revision") bindRevision();
  else if (activeTab === "pretest") bindPretest();
  else bindFinal();
}

/* ─── Init ─── */

function tryRestoreOnLoad() {
  const savedQuiz = getActiveQuizSession();
  if (
    savedQuiz?.questionIds?.length &&
    savedQuiz.index < savedQuiz.questionIds.length &&
    MODULES[savedQuiz.axisId]
  ) {
    const mod = MODULES[savedQuiz.axisId].find((m) => m.id === savedQuiz.moduleId);
    if (mod && !isModulePerfect(savedQuiz.axisId, savedQuiz.moduleId)) {
      activeTab = "revision";
      route = { axisId: savedQuiz.axisId, moduleId: savedQuiz.moduleId };
      quiz = buildQuizFromSaved(savedQuiz, mod);
      screen = "quiz";
      return true;
    }
    if (mod && isModulePerfect(savedQuiz.axisId, savedQuiz.moduleId)) {
      saveActiveQuizSession(null);
    }
  }

  const savedFinal = getActiveFinalSession();
  if (
    savedFinal?.queue?.length &&
    savedFinal.index < savedFinal.queue.length &&
    isFinalExamUnlocked()
  ) {
    activeTab = "final";
    launchFinalSession(null, savedFinal);
    return true;
  }

  return false;
}

function init() {
  const restored = tryRestoreOnLoad();
  if (!restored && !isHelpDismissed("revision")) pendingHelp = "revision";
  render();
}

window.addEventListener("beforeunload", () => {
  if (screen === "quiz") persistQuizSession();
  if (cardSession?.mode === "final") persistFinalSession();
});

init();
