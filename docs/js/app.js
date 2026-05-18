import { AXES, MODULES } from "./data.js";
import { showConfirm } from "./dialog.js";
import {
  SESSION_SIZE_OPTIONS,
  getAxisById,
  getQuestionById,
  getQuestionPool,
  getQuestionsForAxis,
  getTotalQuestionCount,
  sessionSizesForChapter,
} from "./pool.js";
import { createPretestSession } from "./pretest-session.js";
import {
  appendFinalExamResult,
  applySrsMaster,
  applySrsReview,
  countPretestUnlockedChapters,
  dismissHelp,
  getActiveFinalSession,
  getActivePretestSession,
  getActiveQuizSession,
  getAxisRevisionMastery,
  getFinalPref,
  getMasteryStats,
  getModuleQuestionStats,
  getPretestPref,
  getPretestUnlockProgress,
  isDevBypassUnlock,
  isFinalExamUnlocked,
  isHelpDismissed,
  isModulePerfect,
  isPretestChapterUnlocked,
  isPretestTabUnlocked,
  isUnlockComplete,
  migrateStorage,
  needsPretestPauseWarning,
  onPretestSessionComplete,
  recordPretestSessionResult,
  recordQuestionAttempt,
  resetAllUserProgress,
  saveActiveFinalSession,
  saveActivePretestSession,
  saveActiveQuizSession,
  saveFinalPref,
  saveModuleScore,
  savePretestPref,
} from "./progress.js";

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
/** @type {string} */
let cetTitleTapCount = 0;
let cetTitleTapTimer = null;

/** Formulation unique — déverrouillage de l'onglet Examen final. */
const EXAM_FINAL_GOAL_TEXT =
  "L'<strong>Examen final</strong> reste verrouillé tant que la <strong>Révision</strong> (QCM) n'est pas complète sur tout le <strong>CET</strong> (100 % de bonnes réponses) et que chaque chapitre n'a pas atteint <strong>80 %</strong> en mode <strong>Pré-examen</strong> (acronymes inclus).";

function axisChapterLabel(axis) {
  if (axis.id === "acronymes") return "Acronymes";
  return `Chapitre ${axis.num}`;
}

function axisCetMeta(axis) {
  if (axis.id === "acronymes") return escapeHtml(axis.desc);
  return `CET p. ${axis.cetPages} — ${escapeHtml(axis.desc)}`;
}

function revisionHelpBody() {
  return `<p><strong>Important :</strong> votre progression est enregistrée sur cet appareil (même lien et même navigateur).</p>
      <p><strong>Conseil :</strong> commencez par le chapitre <strong>Acronymes</strong> pour connaître les sigles utilisés dans les questions des chapitres 1 à 4.</p>
      <p>Parcourez les <strong>chapitres</strong> et les <strong>modules</strong> en mode <strong>Révision</strong> (QCM).</p>
      <p>L'onglet <strong>Pré-examen</strong> devient accessible dès qu'<strong>un chapitre</strong> est validé à <strong>100 %</strong> en Révision (QCM). Chaque chapitre s'y débloque ensuite <strong>indépendamment</strong> quand toutes ses questions ont été <strong>répondues correctement au moins une fois</strong> en mode Révision.</p>
      <p>${EXAM_FINAL_GOAL_TEXT}</p>`;
}

const HELP_TEXT = {
  revision: {
    title: "Mode Révision",
    get body() {
      return revisionHelpBody();
    },
  },
  pretest: {
    title: "Mode Pré-examen",
    body: `<p>Chaque chapitre (<strong>Acronymes</strong>, ch. 1 à 4) s'ouvre en Pré-examen dès que vous avez validé <strong>100 %</strong> de ses questions en <strong>Révision</strong> (QCM).</p>
      <p>Cartes <strong>recto-verso</strong> par chapitre débloqué : réfléchissez, retournez la carte, puis indiquez <strong>Je maîtrise</strong> ou <strong>À revoir</strong> (répétition espacée).</p>
      <p>Choisissez un quota par session (25 à 150). Une session interrompue reprend où vous l'avez laissée.</p>
      <p>Les erreurs sont reprises sur les sessions suivantes, mélangées avec de nouvelles cartes.</p>
      <p><strong>Conseil :</strong> laissez au moins <strong>5 minutes</strong> entre deux sessions de pré-examen (quel que soit le chapitre) pour mieux mémoriser.</p>
      <p>${EXAM_FINAL_GOAL_TEXT}</p>`,
  },
  final: {
    title: "Mode Examen final",
    body: `<p>Même principe de <strong>carte</strong>, mais sur <strong>tous les chapitres</strong> mélangés.</p>
      <p>${EXAM_FINAL_GOAL_TEXT}</p>
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

/** Mélange les propositions d'une question QCM (index `correct` mis à jour). */
function shuffleQuestionChoices(q) {
  const tagged = q.choices.map((text, originalIndex) => ({
    text,
    originalIndex,
  }));
  const shuffled = shuffle(tagged);
  return {
    ...q,
    choices: shuffled.map((item) => item.text),
    correct: shuffled.findIndex((item) => item.originalIndex === q.correct),
  };
}

function prepareQuestionsForQuiz(questions) {
  return questions.map(shuffleQuestionChoices);
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
    return {
      headline: parts[0].trim(),
      subtitle: parts.slice(1).join(" — ").trim(),
    };
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

/** « 18 sur 23 validés (78 %) » — chapitres et modules. */
function formatValidatedCount(validated, total, includePct = true) {
  const core = `${validated} sur ${total} validés`;
  if (!includePct || total <= 0) return core;
  const pct = Math.round((validated / total) * 100);
  return `${core} (${pct} %)`;
}

/** Ligne meta tuile chapitre (accueil Révision) : modules + avancement QCM. */
function formatAxisHomeMeta(axis) {
  const modules = MODULES[axis.id] || [];
  const modPart =
    modules.length === 1 ? "1 module" : `${modules.length} modules`;
  const rev = getAxisRevisionMastery(axis.id);
  return `${modPart} · ${formatValidatedCount(rev.validated, rev.total)}`;
}

function correctChoiceText(q) {
  return q.choices[q.correct];
}

/** Énoncé carte (pré-examen / examen final) : `cardPrompt` si défini, sinon `prompt`. */
function promptForCard(q) {
  return (q.cardPrompt && String(q.cardPrompt).trim()) || q.prompt;
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

  if (!rev.complete) {
    const preUnlocked = countPretestUnlockedChapters();
    const preLine = preUnlocked
      ? ` · Pré-examen : ${preUnlocked} chapitre(s) débloqué(s)`
      : "";
    return `<p class="header__unlock">Révision : ${formatValidatedCount(rev.validated, rev.total)}${preLine}.</p>`;
  }

  if (!pre.complete) {
    const okCount = pre.chapters.filter((c) => c.ok).length;
    const totalCh = pre.chapters.length;
    const pending = pre.chapters
      .filter((c) => !c.ok)
      .map((c) =>
        c.num != null
          ? `ch. ${c.num} (${c.masteryPct} %)`
          : `${c.title} (${c.masteryPct} %)`,
      )
      .join(" · ");
    const main = `<p class="header__unlock">Pré-examen : ${okCount} / ${totalCh} chapitres validés.</p>`;
    if (!pending) return main;
    return `${main}<p class="header__unlock header__unlock--sub">Reste : ${pending}.</p>`;
  }

  return "";
}

function renderTabsShell(mainHtml) {
  const lockPretest = !isPretestTabUnlocked();
  const lockFinal = !isFinalExamUnlocked();
  const totalQ = getTotalQuestionCount();
  const pretestTitle = lockPretest
    ? "Validez toutes les questions d'au moins un chapitre en Révision (QCM)"
    : "Pré-examen par chapitre (débloqué au fil de la révision)";
  const finalTitle = lockFinal
    ? isUnlockComplete()
      ? "Pré-examen : maîtriser 80 % des réponses de chaque chapitre"
      : "Terminez d'abord la révision complète"
    : "Examen final";
  return `
    <div class="app-top-bar">
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
    </div>
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

/** Pas de reprise ni de bandeau « QCM en cours » si le module est déjà à 100 %. */
function discardActiveQuizIfPerfect(axisId, moduleId) {
  if (!isModulePerfect(axisId, moduleId)) return;
  const saved = getActiveQuizSession();
  if (saved?.axisId === axisId && saved?.moduleId === moduleId) {
    saveActiveQuizSession(null);
  }
}

/** QCM révision interrompu dans ce chapitre (hors module déjà à 100 %). */
function formatModuleStatusLine(stats, inProgress, activeQuiz) {
  if (inProgress && activeQuiz) {
    return `<span class="module-card__best module-card__best--active">QCM en cours (q. ${activeQuiz.index + 1})</span>`;
  }
  if (stats.perfect) {
    return `<span class="module-card__best module-card__best--perfect" title="Toutes les questions validées"><span class="module-card__celebrate" aria-hidden="true">🥳</span> ${formatValidatedCount(stats.validated, stats.total)}</span>`;
  }
  if (stats.validated > 0) {
    return `<span class="module-card__best">${formatValidatedCount(stats.validated, stats.total)}</span>`;
  }
  if (stats.bestRun) {
    return `<span class="module-card__best">Meilleur : ${stats.bestRun.score}/${stats.total}</span>`;
  }
  return "";
}

function isChapterQuizInProgress(axisId) {
  const active = getActiveQuizSession();
  if (!active || active.axisId !== axisId) return false;
  if (active.index >= (active.questionIds?.length ?? 0)) return false;
  if (isModulePerfect(axisId, active.moduleId)) return false;
  return true;
}

function persistQuizSession() {
  if (
    screen !== "quiz" ||
    !route.axisId ||
    !route.moduleId ||
    !quiz.questions?.length
  )
    return;
  if (isModulePerfect(route.axisId, route.moduleId)) return;
  saveActiveQuizSession({
    axisId: route.axisId,
    moduleId: route.moduleId,
    questionIds: quiz.questions.map((q) => q.id),
    choiceLayout: quiz.questions.map((q) => ({
      id: q.id,
      choices: q.choices,
      correct: q.correct,
    })),
    index: quiz.index,
    score: quiz.score,
  });
}

function applySavedChoiceLayout(base, layout) {
  if (
    !layout?.choices?.length ||
    layout.choices.length !== base.choices.length
  ) {
    return shuffleQuestionChoices(base);
  }
  const sameChoiceSet =
    layout.choices.every((label) => base.choices.includes(label)) &&
    base.choices.every((label) => layout.choices.includes(label));
  if (!sameChoiceSet) {
    return shuffleQuestionChoices(base);
  }
  const newChoices = layout.choices.map(
    (label) => base.choices[base.choices.indexOf(label)],
  );
  const correctLabel = layout.choices[layout.correct];
  const newCorrect = newChoices.indexOf(correctLabel);
  if (newCorrect < 0) return shuffleQuestionChoices(base);
  return { ...base, choices: newChoices, correct: newCorrect };
}

function buildQuizFromSaved(saved, mod) {
  const byId = Object.fromEntries(mod.questions.map((q) => [q.id, q]));
  const layoutById = Object.fromEntries(
    (saved.choiceLayout || []).map((row) => [row.id, row]),
  );
  const questions = saved.questionIds
    .map((id) => applySavedChoiceLayout(byId[id], layoutById[id]))
    .filter(Boolean);
  const ordered = questions.length ? questions : shuffle(mod.questions);
  return {
    questions: questions.length ? questions : prepareQuestionsForQuiz(ordered),
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
      questions: prepareQuestionsForQuiz(shuffle(mod.questions)),
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
  return `
    <main class="main">
      <div class="axes">
        ${AXES.map((axis) => {
          const chapterInProgress =
            axis.available && isChapterQuizInProgress(axis.id);
          const rev = axis.available ? getAxisRevisionMastery(axis.id) : null;
          let badgeClass = "badge";
          if (rev?.complete) badgeClass += " badge--ok";
          else if (chapterInProgress) badgeClass += " badge--active";
          return `
            <button type="button" class="${axis.id === "acronymes" ? "axis-card axis-card--recommended" : "axis-card"}" data-axis="${axis.id}" ${axis.available ? "" : "disabled"}>
              <span class="axis-card__num">${axisChapterLabel(axis)}</span>
              <div class="axis-card__title-row">
                <div class="axis-card__title">${escapeHtml(axis.title)}</div>
                ${chapterInProgress ? `<span class="axis-card__status">En cours</span>` : ""}
              </div>
              <p class="axis-card__desc">${axisCetMeta(axis)}</p>
              <div class="axis-card__meta">
                ${
                  axis.available
                    ? `<span class="${badgeClass}">${formatAxisHomeMeta(axis)}</span>`
                    : `<span class="badge badge--soon">Bientôt</span>`
                }
              </div>
            </button>`;
        }).join("")}
      </div>
      <p class="footer-note">Basé sur doc TaM — Outil d'entraînement personnel.</p>
    </main>`;
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
      <p class="screen-sub">${axis.id === "acronymes" ? axisCetMeta(axis) : `${axisChapterLabel(axis)} — CET p. ${axis.cetPages}`}</p>
      <div class="modules">
        ${modules
          .map((m) => {
            const stats = getModuleQuestionStats(route.axisId, m.id);
            const perfect = stats.perfect;
            const inProgress =
              !perfect &&
              activeQuiz?.axisId === route.axisId &&
              activeQuiz?.moduleId === m.id &&
              activeQuiz.index < (activeQuiz.questionIds?.length ?? 0);
            const { headline, subtitle } = splitModuleTitle(m.title);
            const nQ = m.questions.length;
            const statusLine = formatModuleStatusLine(
              stats,
              inProgress,
              activeQuiz,
            );
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
                    ${statusLine}
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

  const nextLabel =
    quiz.index + 1 < total ? "Question suivante" : "Voir le résultat";
  let postChoicesHtml = "";
  if (quiz.answered && quiz.feedbackModalDismissed) {
    postChoicesHtml = `<div class="quiz-actions"><button type="button" class="btn btn--primary" data-next>${nextLabel}</button></div>`;
  }

  let modalHtml = "";
  if (quiz.answered && !quiz.feedbackModalDismissed) {
    const ok = quiz.selected === q.correct;
    const title = ok
      ? "Bravo. Réponse correcte !"
      : "Mauvaise réponse. À revoir !";
    const titleCls = ok
      ? "quiz-modal__title quiz-modal__title--ok"
      : "quiz-modal__title quiz-modal__title--ko";
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
    if (quiz.answered && !quiz.feedbackModalDismissed)
      document.body.classList.add("quiz-modal-open");
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
        <button type="button" class="btn btn--ghost" data-modules>Revenir aux modules</button>
      </div>
    </main>`;
}

function bindRevision() {
  app
    .querySelectorAll(".axis-card[data-axis]:not(:disabled)")
    .forEach((btn) => {
      btn.addEventListener("click", () =>
        navigate("axis", { axisId: btn.dataset.axis }),
      );
    });

  app
    .querySelector("[data-back='home']")
    ?.addEventListener("click", () => navigate("home"));
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

  if (screen === "quiz") bindQuizHandlers();
  app
    .querySelector("[data-retry]")
    ?.addEventListener("click", () =>
      startQuiz(route.axisId, route.moduleId, true),
    );
  app
    .querySelector("[data-modules]")
    ?.addEventListener("click", () => navigate("axis"));
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
  if (!isPretestChapterUnlocked(axisId)) return;
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
  if (
    route.axisId &&
    (screen === "pretest-setup" || screen === "pretest-card") &&
    !isPretestChapterUnlocked(route.axisId)
  ) {
    screen = "pretest-chapters";
    route.axisId = null;
  }
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
    ? `<p class="footer-note">Examen final déverrouillé.</p>`
    : `<p class="footer-note">${EXAM_FINAL_GOAL_TEXT}</p>`;

  return `
    <main class="main">
      <p class="intro-note">Choisissez un chapitre débloqué pour une session de cartes. Un chapitre s'ouvre après <strong>100 %</strong> de bonnes réponses en Révision (QCM) sur ce chapitre.</p>
      <div class="axes">
        ${AXES.filter((a) => a.available)
          .map((axis) => {
            const n = getQuestionsForAxis(axis.id).length;
            const rev = getAxisRevisionMastery(axis.id);
            const unlocked = isPretestChapterUnlocked(axis.id);
            const active = getActivePretestSession(axis.id);
            const ch = pre.chapters.find((c) => c.axisId === axis.id);
            const pct = ch?.masteryPct ?? 0;
            const mastered = ch?.mastered ?? 0;
            const total = ch?.total ?? n;
            const lockBadge = `<span class="badge badge--soon">Révision : ${rev.validated} / ${rev.total} · Pré-examen après 100 %</span>`;
            const okBadge = ch?.ok
              ? `<span class="badge badge--ok">Examen final : OK (${pct} %)</span>`
              : `<span class="badge">Maîtrise cartes : ${mastered} / ${total} (${pct} %) · ${pre.thresholdPct} % requis</span>`;
            const badge = !unlocked
              ? lockBadge
              : active
                ? `<span class="badge badge--active">Session : ${active.index}/${active.targetCount}</span>`
                : okBadge;
            const cardClass = unlocked
              ? "axis-card"
              : "axis-card axis-card--locked";
            const lockTitle = unlocked
              ? ""
              : ` title="Validez les ${rev.total} questions de ce chapitre en Révision (QCM)"`;
            return `
              <button type="button" class="${cardClass}" data-pretest-axis="${axis.id}" ${unlocked ? "" : "disabled"}${lockTitle}>
                <span class="axis-card__num">${axisChapterLabel(axis)}</span>
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
      </label>`,
    )
    .join("");

  return `
    <main class="main">
      <button type="button" class="link-back" data-pretest-back>← Chapitres</button>
      <h2 class="screen-title">${escapeHtml(axis.title)}</h2>
      <p class="screen-sub">${chapterCount} questions dans ce chapitre</p>
      <div class="setup-box">
        <p class="setup-box__lead">Choisissez votre objectif potentiel de cartes à maîtriser pour cette session.</p>
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
      </label>`,
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
             </li>`,
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
  const pct =
    ((cardSession.index + (cardSession.flipped ? 1 : 0)) / total) * 100;
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
            <h2 class="flashcard__prompt">${escapeHtml(promptForCard(q))}</h2>
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
      const axisId = btn.dataset.pretestAxis;
      if (!isPretestChapterUnlocked(axisId)) return;
      route.axisId = axisId;
      screen = "pretest-setup";
      render();
    });
  });

  app.querySelector("[data-pretest-back]")?.addEventListener("click", () => {
    screen = "pretest-chapters";
    render();
  });

  app.querySelector("[data-pretest-start]")?.addEventListener("click", () => {
    const n = Number(
      app.querySelector('input[name="pretest-size"]:checked')?.value || 25,
    );
    savePretestPref(route.axisId, n);
    launchPretestSession(route.axisId, n, null);
  });

  app.querySelector("[data-pretest-resume]")?.addEventListener("click", () => {
    const session = getActivePretestSession(route.axisId);
    if (session)
      launchPretestSession(route.axisId, session.targetCount, session);
  });

  app.querySelector("[data-pretest-new]")?.addEventListener("click", () => {
    const n = Number(
      app.querySelector('input[name="pretest-size"]:checked')?.value || 25,
    );
    savePretestPref(route.axisId, n);
    saveActivePretestSession(route.axisId, null);
    launchPretestSession(route.axisId, n, null);
  });

  bindFlashcard();
}

function bindFinal() {
  app.querySelector("[data-final-start]")?.addEventListener("click", () => {
    const n = Number(
      app.querySelector('input[name="final-size"]:checked')?.value || 50,
    );
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

  bindHiddenResetGesture();
}

async function requestFullProgressReset() {
  const ok = await showConfirm({
    title: "Réinitialiser la progression",
    message:
      "Effacer toute votre progression CET sur cet appareil ?\n\nScores, questions validées, pré-examen et examens en cours seront supprimés. Cette action est irréversible.",
    confirmLabel: "Tout effacer",
    cancelLabel: "Annuler",
    danger: true,
  });
  if (!ok) return;

  resetAllUserProgress();
  activeTab = "revision";
  screen = "home";
  route = { axisId: null, moduleId: null };
  cardSession = null;
  pendingHelp = null;
  render();
}

/** Réinitialisation cachée : 5 appuis rapides sur le titre « CET » dans l'en-tête. */
function bindHiddenResetGesture() {
  const title = app.querySelector(".header--app h1");
  if (!title) return;
  title.classList.add("header__cet-title");
  title.replaceWith(title.cloneNode(true));
  const fresh = app.querySelector(".header--app h1");
  if (!fresh) return;
  fresh.addEventListener("click", () => {
    cetTitleTapCount += 1;
    clearTimeout(cetTitleTapTimer);
    cetTitleTapTimer = setTimeout(() => {
      cetTitleTapCount = 0;
    }, 2500);
    if (cetTitleTapCount >= 5) {
      cetTitleTapCount = 0;
      requestFullProgressReset();
    }
  });
}

/* ─── Init ─── */

/** Reprise au chargement : examen final en cours uniquement (pas de QCM révision). */
function tryRestoreOnLoad() {
  const savedQuiz = getActiveQuizSession();
  if (savedQuiz?.axisId && savedQuiz?.moduleId) {
    const mod = MODULES[savedQuiz.axisId]?.find(
      (m) => m.id === savedQuiz.moduleId,
    );
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
  migrateStorage();
  const restored = tryRestoreOnLoad();
  if (!restored && !isHelpDismissed("revision")) pendingHelp = "revision";
  render();
}

window.addEventListener("beforeunload", () => {
  if (screen === "quiz") persistQuizSession();
  if (cardSession?.mode === "final") persistFinalSession();
});

init();
