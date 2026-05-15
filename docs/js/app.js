import { AXES, MODULES } from "./data.js";

const STORAGE_KEY = "tam-bible-revision-v1";

/** @type {"home"|"axis"|"quiz"|"results"} */
let screen = "home";
let route = { axisId: null, moduleId: null };
let quiz = { questions: [], index: 0, score: 0, answered: false, selected: null };

const app = document.getElementById("app");

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
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
  };
  navigate("quiz", { axisId, moduleId });
}

function renderHome() {
  const progress = loadProgress();
  const doneCount = Object.keys(progress).length;

  app.innerHTML = `
    <header class="header">
      <h1>Révision Bible tram</h1>
      <p>Consignes d'exploitation TaM — apprentissage par axes</p>
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
              <p class="axis-card__desc">Bible p. ${axis.biblePages} — ${axis.desc}</p>
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
      <p>Chapitre ${axis.num} — Bible p. ${axis.biblePages}</p>
    </header>
    <main class="main">
      <p style="font-size:0.875rem;color:var(--muted);margin:0 0 1rem;">
        Choisissez un sous-thème. Chaque module = quiz texte issu de la Bible.
      </p>
      <div class="modules">
        ${modules
          .map((m) => {
            const prog = getModuleProgress(route.axisId, m.id);
            const meta = prog
              ? `Meilleur : ${prog.score}/${prog.total}`
              : `${m.questions.length} questions`;
            return `
              <button type="button" class="module-btn" data-module="${m.id}">
                <span class="module-btn__code">${m.code}</span>
                <span class="module-btn__label">${m.title}</span>
                <span class="module-btn__count">${meta}</span>
              </button>`;
          })
          .join("")}
      </div>
    </main>`;

  app.querySelector("[data-back]").addEventListener("click", () => navigate("home"));
  app.querySelectorAll("[data-module]").forEach((btn) => {
    btn.addEventListener("click", () => startQuiz(route.axisId, btn.dataset.module));
  });
}

function renderQuiz() {
  const q = quiz.questions[quiz.index];
  const total = quiz.questions.length;
  const pct = ((quiz.index + (quiz.answered ? 1 : 0)) / total) * 100;

  let choicesHtml = q.choices
    .map((text, i) => {
      let cls = "choice";
      if (quiz.answered) {
        if (i === q.correct) cls += " choice--correct";
        else if (i === quiz.selected) cls += " choice--wrong";
      }
      return `<button type="button" class="${cls}" data-choice="${i}" ${
        quiz.answered ? "disabled" : ""
      }>${text}</button>`;
    })
    .join("");

  let feedbackHtml = "";
  if (quiz.answered) {
    const ok = quiz.selected === q.correct;
    feedbackHtml = `
      <div class="feedback ${ok ? "feedback--ok" : "feedback--ko"}">
        <strong>${ok ? "Correct" : "À revoir"}</strong>
        ${q.explanation}
      </div>
      <div class="quiz-actions">
        <button type="button" class="btn btn--primary" data-next>
          ${quiz.index + 1 < total ? "Question suivante" : "Voir le résultat"}
        </button>
      </div>`;
  }

  app.innerHTML = `
    <header class="header">
      <button type="button" class="header__back" data-back="axis">← Modules</button>
      <h1>${quiz.moduleCode}</h1>
      <p>${quiz.moduleTitle}</p>
    </header>
    <main class="main">
      <div class="quiz-progress" aria-hidden="true">
        <div class="quiz-progress__bar" style="width:${pct}%"></div>
      </div>
      <p style="font-size:0.8rem;color:var(--muted);margin:0 0 0.75rem;">
        Question ${quiz.index + 1} / ${total}
      </p>
      <article class="quiz-card">
        <p class="quiz-card__tag">Quiz · sans image</p>
        <h2 class="quiz-card__question">${q.prompt}</h2>
        <div class="choices">${choicesHtml}</div>
        ${feedbackHtml}
      </article>
    </main>`;

  app.querySelector("[data-back]").addEventListener("click", () => navigate("axis"));

  if (!quiz.answered) {
    app.querySelectorAll("[data-choice]").forEach((btn) => {
      btn.addEventListener("click", () => {
        quiz.selected = Number(btn.dataset.choice);
        quiz.answered = true;
        if (quiz.selected === q.correct) quiz.score++;
        render();
      });
    });
  } else {
    app.querySelector("[data-next]").addEventListener("click", () => {
      if (quiz.index + 1 < total) {
        quiz.index++;
        quiz.answered = false;
        quiz.selected = null;
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
    });
  }
}

function renderResults() {
  const total = quiz.questions.length;
  const pct = Math.round((quiz.score / total) * 100);

  app.innerHTML = `
    <header class="header">
      <h1>Résultat</h1>
      <p>${quiz.moduleTitle}</p>
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
