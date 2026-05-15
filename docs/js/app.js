import { AXES, MODULES } from "./data.js";

const STORAGE_KEY = "tam-cet-revision-v1";
const STORAGE_KEY_LEGACY = "tam-bible-revision-v1";

/** @type {"home"|"axis"|"quiz"|"results"} */
let screen = "home";
let route = { axisId: null, moduleId: null };
let quiz = {
  questions: [],
  index: 0,
  score: 0,
  answered: false,
  selected: null,
  feedbackModalDismissed: false,
};

const app = document.getElementById("app");

function loadProgress() {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ||
      localStorage.getItem(STORAGE_KEY_LEGACY) ||
      "{}";
    const data = JSON.parse(raw);
    if (
      Object.keys(data).length &&
      !localStorage.getItem(STORAGE_KEY) &&
      localStorage.getItem(STORAGE_KEY_LEGACY)
    ) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    return data;
  } catch {
    return {};
  }
}

function saveModuleScore(axisId, moduleId, score, total) {
  const all = loadProgress();
  const key = `${axisId}/${moduleId}`;
  const prev = all[key];
  if (!prev || score > prev.score) {
    all[key] = { score, total, at: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
}

function getModuleProgress(axisId, moduleId) {
  return loadProgress()[`${axisId}/${moduleId}`] || null;
}

function navigate(nextScreen, nextRoute = {}) {
  screen = nextScreen;
  route = { ...route, ...nextRoute };
  render();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Découpe « SM — Signal de manœuvre » en titre court + libellé (tiret cadratin). */
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

/** Titre module dans l'en-tête quiz / résultat : ligne principale + (précision) sans « — ». */
function formatModuleTitleForHeader(fullTitle) {
  const { headline, subtitle } = splitModuleTitle(fullTitle);
  if (!subtitle) {
    return `<div class="header-module"><span class="header-module__primary">${escapeHtml(headline)}</span></div>`;
  }
  return `<div class="header-module"><span class="header-module__primary">${escapeHtml(headline)}</span><span class="header-module__secondary">(${escapeHtml(subtitle)})</span></div>`;
}

function formatQuestionCount(n) {
  if (n === 1) return "1 question";
  return `${n} questions`;
}

function escapeHtml(raw) {
  return String(raw)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
      return `<button type="button" class="${cls}" data-choice="${i}" ${
        quiz.answered ? "disabled" : ""
      }>${escapeHtml(text)}</button>`;
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
    const title = ok ? "Bravo. Réponse correcte !" : "Mauvaise réponse. À revoir !";
    const titleCls = ok ? "quiz-modal__title quiz-modal__title--ok" : "quiz-modal__title quiz-modal__title--ko";
    const answerLabel = ok ? "Réponse correcte" : "Bonne réponse";
    const bodyInner = `
        <p class="quiz-modal__label">${answerLabel}</p>
        <p class="quiz-modal__correct-choice">${escapeHtml(q.choices[q.correct])}</p>
        <p class="quiz-modal__text">${escapeHtml(q.explanation)}</p>`;
    modalHtml = `
    <div class="quiz-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="quiz-feedback-title" aria-describedby="quiz-feedback-question">
      <div class="quiz-modal">
        <h2 id="quiz-feedback-title" class="${titleCls}">${title}</h2>
        <div class="quiz-modal__question-wrap">
          <p class="quiz-modal__question-label">La question était :</p>
          <p id="quiz-feedback-question" class="quiz-modal__question">${escapeHtml(q.prompt)}</p>
        </div>
        <div class="quiz-modal__body">${bodyInner}</div>
        <div class="quiz-modal__actions">
          <button type="button" class="btn btn--ghost quiz-modal__btn-narrow" data-modal-close>Fermer</button>
          <button type="button" class="btn btn--primary" data-modal-next>${nextLabel}</button>
        </div>
      </div>
    </div>`;
  }

  app.innerHTML = `
    <header class="header">
      <button type="button" class="header__back" data-back="axis">← Modules</button>
      <h1>${escapeHtml(quiz.moduleCode)}</h1>
      ${formatModuleTitleForHeader(quiz.moduleTitle)}
    </header>
    <main class="main quiz-main">
      <div class="quiz-progress" aria-hidden="true">
        <div class="quiz-progress__bar" style="width:${pct}%"></div>
      </div>
      <p style="font-size:0.8rem;color:var(--muted);margin:0 0 0.75rem;">
        Question ${quiz.index + 1} / ${total}
      </p>
      <article class="quiz-card">
        <p class="quiz-card__tag">Quiz · sans image</p>
        <h2 class="quiz-card__question">${escapeHtml(q.prompt)}</h2>
        <div class="choices">${choicesHtml}</div>
        ${postChoicesHtml}
      </article>
      ${modalHtml}
    </main>`;

  app.querySelector("[data-back]").addEventListener("click", () => navigate("axis"));

  function goNext() {
    if (quiz.index + 1 < total) {
      quiz.index++;
      quiz.answered = false;
      quiz.selected = null;
      quiz.feedbackModalDismissed = false;
      render();
    } else {
      saveModuleScore(
        route.axisId,
        route.moduleId,
        quiz.score,
        quiz.questions.length
      );
      navigate("results");
    }
  }

  if (!quiz.answered) {
    app.querySelectorAll("[data-choice]").forEach((btn) => {
      btn.addEventListener("click", () => {
        quiz.selected = Number(btn.dataset.choice);
        quiz.answered = true;
        quiz.feedbackModalDismissed = false;
        if (quiz.selected === q.correct) quiz.score++;
        render();
      });
    });
  } else {
    app.querySelector("[data-modal-close]")?.addEventListener("click", () => {
      quiz.feedbackModalDismissed = true;
      render();
    });
    app.querySelector("[data-modal-next]")?.addEventListener("click", () => goNext());
    app.querySelector("[data-next]")?.addEventListener("click", () => goNext());
  }

  if (quiz.answered && !quiz.feedbackModalDismissed) {
    document.body.classList.add("quiz-modal-open");
  }
}

function startQuiz(axisId, moduleId) {
  const mod = MODULES[axisId].find((m) => m.id === moduleId);
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
  navigate("quiz", { axisId, moduleId });
}

function renderHome() {
  const progress = loadProgress();
  const doneCount = Object.keys(progress).length;

  app.innerHTML = `
    <header class="header">
      <h1>Révision CET</h1>
      <p>Consignes d'exploitation TaM</p>
    </header>
    <main class="main">
      <div class="axes">
        ${AXES.map((axis) => {
          const modules = MODULES[axis.id] || [];
          const qCount = modules.reduce((n, m) => n + m.questions.length, 0);
          return `
            <button
              type="button"
              class="axis-card"
              data-axis="${axis.id}"
              ${axis.available ? "" : "disabled"}
            >
              <span class="axis-card__num">Chapitre ${axis.num}</span>
              <div class="axis-card__title">${axis.title}</div>
              <p class="axis-card__desc">CET p. ${axis.cetPages} — ${axis.desc}</p>
              <div class="axis-card__meta">
                ${
                  axis.available
                    ? `<span class="badge">${modules.length} modules · ${qCount} questions</span>`
                    : `<span class="badge badge--soon">Bientôt</span>`
                }
              </div>
            </button>`;
        }).join("")}
      </div>
      ${
        doneCount
          ? `<p class="footer-note">${doneCount} module(s) déjà révisé(s) — progression enregistrée sur cet appareil.</p>`
          : ""
      }
      <p class="footer-note">
        Document interne TaM — outil d'entraînement personnel, ne remplace pas la formation officielle.
      </p>
    </main>`;

  app.querySelectorAll(".axis-card[data-axis]:not(:disabled)").forEach((btn) => {
    btn.addEventListener("click", () =>
      navigate("axis", { axisId: btn.dataset.axis, moduleId: null })
    );
  });
}

function renderAxis() {
  const axis = AXES.find((a) => a.id === route.axisId);
  const modules = MODULES[route.axisId] || [];

  app.innerHTML = `
    <header class="header">
      <button type="button" class="header__back" data-back="home">← Accueil</button>
      <h1>${axis.title}</h1>
      <p>Chapitre ${axis.num} — CET p. ${axis.cetPages}</p>
    </header>
    <main class="main">
      <p style="font-size:0.875rem;color:var(--muted);margin:0 0 1rem;">
        Choisissez un sous-thème. Chaque module = quiz texte issu du CET.
      </p>
      <div class="modules">
        ${modules
          .map((m) => {
            const prog = getModuleProgress(route.axisId, m.id);
            const { headline, subtitle } = splitModuleTitle(m.title);
            const nQ = m.questions.length;
            const countLabel = formatQuestionCount(nQ);
            const bestLine = prog
              ? `<span class="module-card__best">Meilleur : ${prog.score}/${prog.total}</span>`
              : "";
            const descParagraph = subtitle
              ? `<p class="module-card__desc">${escapeHtml(subtitle)}</p>`
              : `<p class="module-card__desc module-card__desc--muted">Paragraphe ${escapeHtml(m.code)} — même intitulé que dans le CET</p>`;
            return `
              <button
                type="button"
                class="module-card"
                data-module="${m.id}"
                aria-label="${escapeHtml(m.code)}, ${escapeHtml(headline)}, ${escapeHtml(countLabel)}"
              >
                <div class="module-card__banner">
                  <span class="module-card__ref">${escapeHtml(m.code)}</span>
                  <span class="module-card__name">${escapeHtml(headline)}</span>
                </div>
                <div class="module-card__body">
                  ${descParagraph}
                  <div class="module-card__foot">
                    <span class="module-card__count">${countLabel}</span>
                    ${bestLine}
                  </div>
                </div>
              </button>`;
          })
          .join("")}
      </div>
    </main>`;

  app.querySelector("[data-back]").addEventListener("click", () => navigate("home"));
  app.querySelectorAll(".module-card[data-module]").forEach((btn) => {
    btn.addEventListener("click", () => startQuiz(route.axisId, btn.dataset.module));
  });
}

function renderResults() {
  const total = quiz.questions.length;
  const pct = Math.round((quiz.score / total) * 100);

  app.innerHTML = `
    <header class="header">
      <h1>Résultat</h1>
      ${formatModuleTitleForHeader(quiz.moduleTitle)}
    </header>
    <main class="main">
      <div class="results">
        <p class="results__score">${quiz.score}/${total}</p>
        <p class="results__label">${pct}% de bonnes réponses</p>
        <button type="button" class="btn btn--primary" data-retry>Recommencer ce module</button>
        <button type="button" class="btn btn--ghost" data-modules>Autres modules</button>
      </div>
    </main>`;

  app.querySelector("[data-retry]").addEventListener("click", () =>
    startQuiz(route.axisId, route.moduleId)
  );
  app.querySelector("[data-modules]").addEventListener("click", () => navigate("axis"));
}

function render() {
  document.body.classList.remove("quiz-modal-open");
  switch (screen) {
    case "home":
      renderHome();
      break;
    case "axis":
      renderAxis();
      break;
    case "quiz":
      renderQuiz();
      break;
    case "results":
      renderResults();
      break;
    default:
      navigate("home");
  }
}

render();
