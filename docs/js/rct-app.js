import { AXES, getModuleById, getModulesForAxis } from "./data.js";
import {
  pickAndRestoreBackupFile,
  shouldOfferBackupRestore,
  writeIntentionalResetBackup,
  writeProgressBackupFile,
} from "./backup.js";
import { showAlert, showConfirm } from "./dialog.js";
import {
  getAxisById,
  getQuestionById,
  getQuestionPool,
  invalidateQuestionPool,
  getQuestionsForAxis,
  getTotalQuestionCount,
  sessionSizesForChapter,
} from "./pool.js";
import { createPretestSession } from "./pretest-session.js";
import {
  FINAL_EXAM_PASS_RATE,
  FINAL_EXAM_QUESTION_COUNT,
  appendFinalExamResult,
  applySrsMaster,
  applySrsReview,
  dismissHelp,
  getActiveFinalSession,
  getActivePretestSession,
  getPretestModuleMastery,
  getPretestPref,
  getPretestScopeKey,
  getQuestionsForModule,
  getPretestUnlockProgress,
  isDevBypassUnlock,
  isFinalExamUnlocked,
  isHelpDismissed,
  isPretestChapterUnlocked,
  migrateStorage,
  sanitizePretestActiveSessions,
  needsPretestPauseWarning,
  onPretestSessionComplete,
  recordPretestSessionResult,
  resetAllUserProgress,
  saveActiveFinalSession,
  saveActivePretestSession,
  saveFinalPref,
  savePretestPref,
} from "./store.js";

/** Version affichée — si la pop-up dit encore « Mode Révision », le navigateur sert un ancien fichier. */
const APP_BUILD = "2026-06-06k";

function getApp() {
  return document.getElementById("app");
}

/** Conteneur racine (#app) — utilisé par tous les écrans. */
const app = {
  querySelector(sel) {
    return getApp()?.querySelector(sel) ?? null;
  },
  querySelectorAll(sel) {
    return getApp()?.querySelectorAll(sel) ?? [];
  },
  set innerHTML(html) {
    const el = getApp();
    if (el) el.innerHTML = html;
  },
  get innerHTML() {
    return getApp()?.innerHTML ?? "";
  },
};

/** @type {"pretest"|"final"} */
let activeTab = "pretest";
/** @type {string} */
let screen = "pretest-chapters";
let route = { axisId: null, moduleId: null };

/** @type {null | { mode: "pretest"|"final", axisId?: string, targetCount: number, queue: string[], index: number, flipped: boolean, errors: object[] }} */
let cardSession = null;

/** @type {null | "welcome"|"pretest"|"final"} */
let pendingHelp = null;
/** Proposition de reprise depuis fichier après popup « Compris » (cache vide). */
let pendingBackupRestore = false;
let showPauseWarn = false;
let pauseWarnContinue = null;
/** @type {string} */
let cetTitleTapCount = 0;
let cetTitleTapTimer = null;

const FINAL_PASS_COUNT = Math.ceil(
  FINAL_EXAM_PASS_RATE * FINAL_EXAM_QUESTION_COUNT,
);

function axisChapterLabel(axis) {
  if (axis.id === "acronymes") return "Acronymes";
  return `Chapitre ${axis.num}`;
}

/** Parties disponibles (Acronymes, ch. 1, ch. 2…) pour les textes d'aide. */
function availablePartsListHtml() {
  const parts = AXES.filter((a) => a.available).map((a) => {
    const label = axisChapterLabel(a);
    if (a.id === "acronymes") return `<strong>${label}</strong>`;
    const short =
      a.id === "circulation"
        ? "circulation en ligne"
        : a.id === "urgence"
          ? "urgence"
          : escapeHtml(a.title);
    return `<strong>${label}</strong> (${short})`;
  });
  if (parts.length === 0) return "les parties disponibles";
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(", ")} et ${parts[parts.length - 1]}`;
}

/** Formulation unique — déverrouillage de l'onglet Examen final. */
function examFinalGoalText() {
  return `L'<strong>Examen final</strong> s'ouvre lorsque ${availablePartsListHtml()} affichent chacune <strong>100 %</strong> de cartes marquées <strong>Je maîtrise</strong> au moins une fois en <strong>Pré-examen</strong>.`;
}

function axisCetMeta(axis) {
  if (axis.id === "acronymes") return escapeHtml(axis.desc);
  return `RCT p. ${axis.cetPages} — ${escapeHtml(axis.desc)}`;
}

const HELP_TEXT = {
  welcome: {
    title: "Présentation",
    get body() {
      return `<p><strong>Important :</strong> votre progression est enregistrée sur cet appareil (même lien et même navigateur).</p>
      <p><strong>Conseil :</strong> commencez par <strong>Acronymes</strong>, puis le <strong>chapitre 1</strong> (circulation en ligne)${AXES.some((a) => a.id === "urgence" && a.available) ? ", puis le <strong>chapitre 2</strong> (urgence)" : ""}.</p>
      <p>Deux modes : <strong>Pré-examen</strong> (cartes recto-verso — <strong>Je maîtrise</strong> / <strong>À revoir</strong>) et <strong>Examen final</strong> (${FINAL_EXAM_QUESTION_COUNT} questions tirées au hasard, réussite ${FINAL_PASS_COUNT} / ${FINAL_EXAM_QUESTION_COUNT}).</p>
      <p>${examFinalGoalText()}</p>`;
    },
  },
  pretest: {
    title: "Mode Pré-examen",
    get body() {
      return `<p>Cartes <strong>recto-verso</strong> : réfléchissez, retournez la carte, puis indiquez <strong>Je maîtrise</strong> ou <strong>À revoir</strong> (répétition espacée).</p>
      <p>Choisissez d'abord un <strong>chapitre</strong>, puis une <strong>consigne</strong> (ex. tableau des vitesses, prise de service au dépôt, relève en ligne). Chaque consigne se travaille <strong>séparément</strong> — les cartes ne sont pas mélangées entre consignes.</p>
      <p>Choisissez un quota par session (ou « tout le bloc » sur les petites consignes). Une session interrompue reprend où vous l'avez laissée.</p>
      <p><strong>Conseil :</strong> laissez au moins <strong>5 minutes</strong> entre deux sessions de pré-examen (quel que soit le chapitre) pour mieux mémoriser.</p>
      <p>${examFinalGoalText()}</p>`;
    },
  },
  final: {
    title: "Mode Examen final",
    get body() {
      return `<p>Même principe de <strong>carte</strong>, sur <strong>toutes les parties</strong> mélangées.</p>
      <p>Chaque session tire <strong>${FINAL_EXAM_QUESTION_COUNT} questions</strong> différentes dans le pool complet.</p>
      <p>${examFinalGoalText()}</p>
      <p>Après le verso, indiquez <strong>Correct</strong> ou <strong>Incorrect</strong> (auto-évaluation honnête). Pas de résultat carte par carte : le bilan arrive à la fin.</p>
      <p>Seuil de réussite : <strong>${FINAL_PASS_COUNT} / ${FINAL_EXAM_QUESTION_COUNT}</strong> (<strong>90 %</strong>).</p>`;
    },
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
    "Ce n'est pas encore suffisant — reprenez les pré-examens par chapitre.",
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
function escapeHtml(raw) {
  return String(raw)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
  if (tab === "final" && !isFinalExamUnlocked()) return;
  activeTab = tab;
  cardSession = null;
  route = { axisId: null, moduleId: null };
  screen = tab === "pretest" ? "pretest-chapters" : "final-setup";

  if (tab === "pretest" && !isHelpDismissed("pretest")) pendingHelp = "pretest";
  if (tab === "final" && !isHelpDismissed("final")) pendingHelp = "final";
  render();
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function finalScoreTier(score, total) {
  const vert = Math.ceil(FINAL_EXAM_PASS_RATE * total);
  const orange = Math.ceil(0.8 * total);
  if (score >= vert) return "green";
  if (score >= orange) return "orange";
  return "red";
}

/* ─── Shell ─── */

function renderUnlockBanner() {
  if (isDevBypassUnlock()) {
    return `<p class="header__unlock header__unlock--dev">Mode test actif (déverrouillage complet).</p>`;
  }
  const pre = getPretestUnlockProgress();

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
    const main = `<p class="header__unlock">Pré-examen : ${okCount} / ${totalCh} à 100 % pour l'examen final.</p>`;
    if (!pending) return main;
    return `${main}<p class="header__unlock header__unlock--sub">Reste : ${pending}.</p>`;
  }

  return "";
}

function renderTabsShell(mainHtml) {
  const lockFinal = !isFinalExamUnlocked();
  const finalTitle = lockFinal
    ? "Pré-examen : 100 % de cartes maîtrisées sur Acronymes, ch. 1 et ch. 2"
    : "Examen final";
  return `
    <div class="app-top-bar">
      <header class="header header--app">
        <h1>RCT</h1>
        <p>Règlement de Circulation Tramway TaM</p>
        ${renderUnlockBanner()}
      </header>
      <nav class="tabs" aria-label="Modes">
        <button type="button" class="tabs__btn ${activeTab === "pretest" ? "tabs__btn--active" : ""}" data-tab="pretest">Pré-examen</button>
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
  const app = getApp();
  const h = HELP_TEXT[mode];
  if (!app || !h) {
    pendingHelp = null;
    if (app) render();
    return;
  }
  const bodyHtml = h.body;
  app.innerHTML = `
    <div class="help-backdrop" role="dialog" aria-modal="true">
      <div class="help-modal">
        <h2>${escapeHtml(h.title)}</h2>
        <div class="help-modal__body">${bodyHtml}</div>
        <label class="help-modal__dismiss"><input type="checkbox" data-help-dismiss /> ${mode === "welcome" ? "Ne plus afficher au démarrage" : "Ne plus afficher"}</label>
        <button type="button" class="btn btn--primary" data-help-close>Compris</button>
      </div>
    </div>`;
  app.querySelector("[data-help-close]").addEventListener("click", () => {
    if (app.querySelector("[data-help-dismiss]").checked) dismissHelp(mode);
    pendingHelp = null;
    render();
    if ((mode === "welcome" || mode === "pretest") && pendingBackupRestore) {
      pendingBackupRestore = false;
      queueBackupRestoreOffer();
    }
  });
}

function queueBackupRestoreOffer() {
  window.setTimeout(() => {
    offerBackupRestore().catch(() => {});
  }, 0);
}

async function offerBackupRestore() {
  const ok = await showConfirm({
    title: "Reprendre votre progression ?",
    message:
      "Les données de l'application semblent vides, mais une sauvegarde (fichier tam-rct-progression.json) a peut‑être été enregistrée sur cet appareil.\n\nVoulez-vous la récupérer ?",
    confirmLabel: "Choisir le fichier",
    cancelLabel: "Non merci",
  });
  if (!ok) return;

  const result = await pickAndRestoreBackupFile();
  if (result.cancelled) return;
  if (!result.ok) {
    await showAlert({
      title: "Reprise impossible",
      message: result.reason || "Sauvegarde non utilisable.",
    });
    return;
  }
  await showAlert({
    title: "Progression restaurée",
    message: "Votre sauvegarde a été rechargée. Vous pouvez continuer le pré-examen.",
  });
  render();
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
        <div class="help-modal__actions help-modal__actions--pair">
          <button type="button" class="btn btn--ghost" data-pause-cancel>
            <span class="btn__stack">Attendre</span>
            <span class="btn__stack">5 minutes</span>
          </button>
          <button type="button" class="btn btn--primary" data-pause-go>
            <span class="btn__stack">Continuer</span>
            <span class="btn__stack">quand même</span>
          </button>
        </div>
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

/* ─── Pré-examen ─── */

function pretestModuleCount(axisId) {
  return getModulesForAxis(axisId).length;
}

function findActivePretestSessionOnAxis(axisId) {
  for (const mod of getModulesForAxis(axisId)) {
    const session = reconcileActivePretestSession(axisId, mod.id);
    if (session) return session;
  }
  return null;
}

/** Session interrompue : alignée sur les questions actuelles de la consigne. */
function reconcileActivePretestSession(axisId, moduleId) {
  const scopeKey = getPretestScopeKey(axisId, moduleId);
  const session = getActivePretestSession(scopeKey);
  if (!session?.queue?.length) return null;

  const validIds = new Set(
    getQuestionsForModule(axisId, moduleId).map((q) => q.questionId),
  );
  const queue = session.queue.filter((id) => validIds.has(id));

  if (!queue.length || (session.index ?? 0) >= queue.length) {
    saveActivePretestSession(scopeKey, null);
    return null;
  }

  if (
    queue.length !== session.queue.length ||
    session.targetCount !== queue.length
  ) {
    session.queue = queue;
    session.targetCount = queue.length;
    session.index = Math.min(session.index ?? 0, queue.length - 1);
    saveActivePretestSession(scopeKey, session);
  }
  return session;
}

function moduleCetMeta(mod) {
  if (mod.cetPage) return `RCT p. ${mod.cetPage} — ${escapeHtml(mod.code)}`;
  return escapeHtml(mod.code);
}

function carteCountLabel(n) {
  if (n <= 0) return "0 carte";
  return n === 1 ? "1 carte" : `${n} cartes`;
}

function moduleCardCount(axisId, moduleId) {
  return getQuestionsForModule(axisId, moduleId).length;
}

/** Une seule carte : pas d'écran « Démarrer / tout le bloc ». */
function openPretestModule(axisId, moduleId) {
  route.axisId = axisId;
  route.moduleId = moduleId;
  const count = moduleCardCount(axisId, moduleId);
  if (count <= 1) {
    const active = reconcileActivePretestSession(axisId, moduleId);
    launchPretestSession(
      axisId,
      moduleId,
      active?.targetCount ?? Math.max(1, count),
      active,
    );
    return;
  }
  screen = "pretest-setup";
  render();
}

function pretestBackAfterModule(axisId, moduleId) {
  return pretestModuleCount(axisId) > 1 ? "pretest-modules" : "pretest-chapters";
}

function pretestSessionCardLabel(session) {
  const total = session.queue?.length ?? session.targetCount ?? 0;
  const current = Math.min((session.index ?? 0) + 1, Math.max(1, total));
  return { current, total };
}

function launchPretestSession(axisId, moduleId, count, resumeSession) {
  if (!isPretestChapterUnlocked(axisId)) return;
  const scopeKey = getPretestScopeKey(axisId, moduleId);
  const start = () => {
    const session =
      resumeSession || createPretestSession(axisId, moduleId, count);
    if (!resumeSession) saveActivePretestSession(scopeKey, session);
    cardSession = {
      mode: "pretest",
      axisId,
      moduleId,
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
    screen !== "pretest-chapters" &&
    !isPretestChapterUnlocked(route.axisId)
  ) {
    screen = "pretest-chapters";
    route = { axisId: null, moduleId: null };
  }
  if (
    route.axisId &&
    route.moduleId &&
    (screen === "pretest-setup" || screen === "pretest-card") &&
    !getModuleById(route.axisId, route.moduleId)
  ) {
    screen =
      pretestModuleCount(route.axisId) > 1
        ? "pretest-modules"
        : "pretest-chapters";
    route.moduleId = null;
  }
  switch (screen) {
    case "pretest-chapters":
      return renderPretestChapters();
    case "pretest-modules":
      return renderPretestModules();
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

  return `
    <main class="main">
      <p class="intro-note">Choisissez un chapitre, puis une <strong>consigne</strong> (vitesses, prise de service, relève…). Chaque consigne se travaille à part. Marquez chaque carte <strong>Je maîtrise</strong> pour progresser vers l'examen final (100 % requis sur chaque chapitre).</p>
      <div class="axes">
        ${AXES.filter((a) => a.available)
          .map((axis) => {
            const n = getQuestionsForAxis(axis.id).length;
            const active = findActivePretestSessionOnAxis(axis.id);
            const ch = pre.chapters.find((c) => c.axisId === axis.id);
            const pct = ch?.masteryPct ?? 0;
            const mastered = ch?.mastered ?? 0;
            const total = ch?.total ?? n;
            const okBadge = ch?.ok
              ? `<span class="badge badge--ok">Examen final : OK (${pct} %)</span>`
              : `<span class="badge">Cartes maîtrisées : ${mastered} / ${total} (${pct} %) · ${pre.thresholdPct} % requis</span>`;
            const badge = active
              ? (() => {
                  const { current, total: stTotal } =
                    pretestSessionCardLabel(active);
                  return `<span class="badge badge--active">Session en cours : carte ${current} / ${stTotal}</span>`;
                })()
              : okBadge;
            const cardClass =
              axis.id === "acronymes"
                ? "axis-card axis-card--recommended"
                : "axis-card";
            return `
              <button type="button" class="${cardClass}" data-pretest-axis="${axis.id}">
                <span class="axis-card__num">${axisChapterLabel(axis)}</span>
                <div class="axis-card__title">${escapeHtml(axis.title)}</div>
                <p class="axis-card__desc">${axisCetMeta(axis)}</p>
                <div class="axis-card__meta">${badge} · ${carteCountLabel(n)}</div>
              </button>`;
          })
          .join("")}
      </div>
      <p class="footer-note">Basé sur doc TaM — Outil d'entraînement personnel · build ${APP_BUILD}</p>
    </main>`;
}

function renderPretestModules() {
  const axis = getAxisById(route.axisId);
  const modules = getModulesForAxis(route.axisId);

  return `
    <main class="main">
      <button type="button" class="link-back" data-pretest-back-chapters>← Chapitres</button>
      <h2 class="screen-title">${escapeHtml(axis.title)}</h2>
      <p class="screen-sub">${axisChapterLabel(axis)} — RCT p. ${escapeHtml(axis.cetPages)}</p>
      <p class="intro-note">Choisissez une consigne à travailler <strong>séparément</strong> (les cartes ne sont pas mélangées entre consignes).</p>
      <div class="axes">
        ${modules
          .map((mod) => {
            const n = mod.questions.length;
            const { mastered, total, rate } = getPretestModuleMastery(
              route.axisId,
              mod.id,
            );
            const pct = Math.round(rate * 100);
            const active = reconcileActivePretestSession(route.axisId, mod.id);
            const okBadge =
              total > 0 && rate >= 1
                ? `<span class="badge badge--ok">Maîtrisé (${pct} %)</span>`
                : `<span class="badge">Cartes maîtrisées : ${mastered} / ${total} (${pct} %)</span>`;
            const badge = active
              ? (() => {
                  const { current, total: stTotal } =
                    pretestSessionCardLabel(active);
                  return `<span class="badge badge--active">Session en cours : carte ${current} / ${stTotal}</span>`;
                })()
              : okBadge;
            return `
              <button type="button" class="axis-card" data-pretest-module="${mod.id}">
                <span class="axis-card__num">${escapeHtml(mod.code)}</span>
                <div class="axis-card__title">${escapeHtml(mod.title)}</div>
                <p class="axis-card__desc">${moduleCetMeta(mod)}</p>
                <div class="axis-card__meta">${badge} · ${carteCountLabel(n)}</div>
              </button>`;
          })
          .join("")}
      </div>
      <p class="footer-note">Basé sur doc TaM — Outil d'entraînement personnel · build ${APP_BUILD}</p>
    </main>`;
}

function renderPretestSetup() {
  const axis = getAxisById(route.axisId);
  const mod = getModuleById(route.axisId, route.moduleId);
  if (!axis || !mod) {
    screen =
      route.axisId && pretestModuleCount(route.axisId) > 1
        ? "pretest-modules"
        : "pretest-chapters";
    if (screen === "pretest-chapters") route = { axisId: null, moduleId: null };
    else route.moduleId = null;
    return renderPretest();
  }
  const chapterCount = getQuestionsForModule(route.axisId, route.moduleId).length;
  const scopeKey = getPretestScopeKey(route.axisId, route.moduleId);
  const sizes = sessionSizesForChapter(chapterCount);
  const pref = getPretestPref(scopeKey);
  const defaultSize = sizes.includes(pref) ? pref : sizes[0] ?? chapterCount;
  const active = reconcileActivePretestSession(route.axisId, route.moduleId);
  const backLabel =
    pretestModuleCount(route.axisId) > 1 ? "← Consignes" : "← Chapitres";

  const radios = sizes
    .map(
      (n) => `
      <label class="radio-row">
        <input type="radio" name="pretest-size" value="${n}" ${n === defaultSize ? "checked" : ""} />
        <span>${n} cartes${n === chapterCount ? " (tout le bloc)" : ""}</span>
      </label>`,
    )
    .join("");

  const sizesLead =
    sizes.length === 1 && sizes[0] === chapterCount
      ? `<p class="setup-box__lead">Cette consigne compte <strong>${carteCountLabel(chapterCount)}</strong>.</p>`
      : `<p class="setup-box__lead">Nombre de cartes pour cette session :</p>`;

  const resumeLabel = active
    ? (() => {
        const { current, total } = pretestSessionCardLabel(active);
        return `Reprendre (carte ${current} / ${total})`;
      })()
    : "";

  return `
    <main class="main">
      <button type="button" class="link-back" data-pretest-back>${backLabel}</button>
      <h2 class="screen-title">${escapeHtml(mod.title)}</h2>
      <p class="screen-sub">${axisChapterLabel(axis)} — ${moduleCetMeta(mod)} · ${carteCountLabel(chapterCount)}</p>
      <div class="setup-box">
        ${sizesLead}
        <div class="radio-group">${radios}</div>
        ${
          active
            ? `<button type="button" class="btn btn--primary" data-pretest-resume>${resumeLabel}</button>
               <button type="button" class="btn btn--ghost" data-pretest-new>Nouvelle session</button>`
            : `<button type="button" class="btn btn--primary" data-pretest-start>Démarrer</button>`
        }
      </div>
    </main>`;
}

function selectedPretestSize(axisId, moduleId) {
  const chapterCount = getQuestionsForModule(axisId, moduleId).length;
  const sizes = sessionSizesForChapter(chapterCount);
  const checked = Number(
    app.querySelector('input[name="pretest-size"]:checked')?.value,
  );
  if (checked > 0) return checked;
  const scopeKey = getPretestScopeKey(axisId, moduleId);
  const pref = getPretestPref(scopeKey);
  return sizes.includes(pref) ? pref : sizes[0] ?? chapterCount;
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
  const count = Math.min(FINAL_EXAM_QUESTION_COUNT, total);

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
      <p class="intro-note">Session de <strong>${count} questions</strong> tirées au hasard parmi Acronymes, chapitre 1 et chapitre 2 (pool : ${total} questions). Réussite : <strong>${FINAL_PASS_COUNT} / ${count}</strong> (90 %).</p>
      ${finalResume}
      <div class="setup-box">
        <button type="button" class="btn btn--primary" data-final-start>Démarrer l'examen (${count} questions)</button>
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
  const moduleRef =
    cardSession.mode === "pretest"
      ? `${q.moduleCode} · RCT p. ${getModuleById(q.axisId, q.moduleId)?.cetPage ?? "—"}`
      : `voir ch. ${q.moduleCode}`;

  const chapterLine =
    cardSession.mode === "pretest"
      ? `<p class="flashcard__chapter">${escapeHtml(q.moduleTitle)}</p>`
      : `<p class="flashcard__chapter">${escapeHtml(q.axisTitle)}</p>`;

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
            ${chapterLine}
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
  const moduleId = cardSession.moduleId;
  const scopeKey =
    moduleId != null ? getPretestScopeKey(axisId, moduleId) : axisId;
  cardSession.index++;
  cardSession.flipped = false;

  if (cardSession.index >= cardSession.queue.length) {
    if (cardSession.mode === "pretest") {
      const total = cardSession.queue.length;
      recordPretestSessionResult(
        scopeKey,
        cardSession.masterCount ?? 0,
        total,
      );
      onPretestSessionComplete(axisId, moduleId);
      saveActivePretestSession(scopeKey, null);
      cardSession = null;
      screen = pretestBackAfterModule(axisId, moduleId);
      if (screen === "pretest-chapters") route = { axisId: null, moduleId: null };
      void writeProgressBackupFile();
    } else {
      const total = cardSession.queue.length;
      appendFinalExamResult({
        correctCount: cardSession.correctCount ?? 0,
        targetCount: total,
        tier: finalScoreTier(cardSession.correctCount ?? 0, total),
      });
      saveActiveFinalSession(null);
      screen = "final-results";
      void writeProgressBackupFile();
    }
    render();
    return;
  }

  if (cardSession.mode === "final") {
    persistFinalSession();
  }

  if (cardSession.mode === "pretest" && moduleId != null) {
    const session = getActivePretestSession(scopeKey);
    if (session) {
      session.index = cardSession.index;
      saveActivePretestSession(scopeKey, session);
    }
  }
  render();
}

function openPretestAxis(axisId) {
  const modules = getModulesForAxis(axisId);
  route.axisId = axisId;
  route.moduleId = null;
  if (modules.length > 1) {
    screen = "pretest-modules";
  } else if (modules.length === 1) {
    openPretestModule(axisId, modules[0].id);
    return;
  } else {
    screen = "pretest-chapters";
    route = { axisId: null, moduleId: null };
  }
  render();
}

function bindPretest() {
  app.querySelectorAll("[data-pretest-axis]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const axisId = btn.dataset.pretestAxis;
      if (!isPretestChapterUnlocked(axisId)) return;
      openPretestAxis(axisId);
    });
  });

  app.querySelectorAll("[data-pretest-module]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openPretestModule(route.axisId, btn.dataset.pretestModule);
    });
  });

  app.querySelector("[data-pretest-back-chapters]")?.addEventListener(
    "click",
    () => {
      screen = "pretest-chapters";
      route = { axisId: null, moduleId: null };
      render();
    },
  );

  app.querySelector("[data-pretest-back]")?.addEventListener("click", () => {
    if (pretestModuleCount(route.axisId) > 1) {
      screen = "pretest-modules";
      route.moduleId = null;
    } else {
      screen = "pretest-chapters";
      route = { axisId: null, moduleId: null };
    }
    render();
  });

  app.querySelector("[data-pretest-start]")?.addEventListener("click", () => {
    const scopeKey = getPretestScopeKey(route.axisId, route.moduleId);
    const n = selectedPretestSize(route.axisId, route.moduleId);
    savePretestPref(scopeKey, n);
    launchPretestSession(route.axisId, route.moduleId, n, null);
  });

  app.querySelector("[data-pretest-resume]")?.addEventListener("click", () => {
    const session = reconcileActivePretestSession(
      route.axisId,
      route.moduleId,
    );
    if (session)
      launchPretestSession(
        route.axisId,
        route.moduleId,
        session.targetCount,
        session,
      );
  });

  app.querySelector("[data-pretest-new]")?.addEventListener("click", () => {
    const scopeKey = getPretestScopeKey(route.axisId, route.moduleId);
    const n = selectedPretestSize(route.axisId, route.moduleId);
    savePretestPref(scopeKey, n);
    saveActivePretestSession(scopeKey, null);
    launchPretestSession(route.axisId, route.moduleId, n, null);
  });

  bindFlashcard();
}

function bindFinal() {
  app.querySelector("[data-final-start]")?.addEventListener("click", () => {
    const n = Math.min(FINAL_EXAM_QUESTION_COUNT, getTotalQuestionCount());
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
    if (cardSession?.mode === "pretest" && cardSession.moduleId) {
      const scopeKey = getPretestScopeKey(
        cardSession.axisId,
        cardSession.moduleId,
      );
      const session = getActivePretestSession(scopeKey);
      if (session) {
        session.index = cardSession.index;
        saveActivePretestSession(scopeKey, session);
      }
      route.axisId = cardSession.axisId;
      route.moduleId = cardSession.moduleId;
    }
    cardSession = null;
    screen = pretestBackAfterModule(route.axisId, route.moduleId);
    if (screen === "pretest-chapters") route = { axisId: null, moduleId: null };
    render();
  });

  app.querySelector("[data-srs-master]")?.addEventListener("click", () => {
    const qid = cardSession.queue[cardSession.index];
    applySrsMaster(qid);
    cardSession.masterCount = (cardSession.masterCount ?? 0) + 1;
    if (cardSession.mode === "pretest" && cardSession.moduleId) {
      const scopeKey = getPretestScopeKey(
        cardSession.axisId,
        cardSession.moduleId,
      );
      const session = getActivePretestSession(scopeKey);
      if (session) {
        session.masterCount = cardSession.masterCount;
        saveActivePretestSession(scopeKey, session);
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
  if (!getApp()) return;

  document.body.classList.remove("quiz-modal-open");

  if (showPauseWarn) {
    renderPauseWarnModal();
    return;
  }

  if (pendingHelp) {
    renderHelpModal(pendingHelp);
    return;
  }

  const mainHtml =
    activeTab === "pretest" ? renderPretest() : renderFinal();

  app.innerHTML = renderTabsShell(mainHtml);
  bindTabs();

  if (activeTab === "pretest") bindPretest();
  else bindFinal();

  bindHiddenResetGesture();
}

async function requestFullProgressReset() {
  const ok = await showConfirm({
    title: "Réinitialiser la progression",
    message:
      "Effacer toute votre progression RCT sur cet appareil ?\n\nMaîtrise pré-examen, sessions en cours et historique d'examens seront supprimés. Cette action est irréversible.",
    confirmLabel: "Tout effacer",
    cancelLabel: "Annuler",
    danger: true,
  });
  if (!ok) return;

  await writeIntentionalResetBackup();
  resetAllUserProgress();
  activeTab = "pretest";
  screen = "pretest-chapters";
  route = { axisId: null, moduleId: null };
  cardSession = null;
  pendingHelp = null;
  render();
}

/** Réinitialisation cachée : 5 appuis rapides sur le titre « RCT » dans l'en-tête. */
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

/** Reprise au chargement : examen final en cours uniquement. */
function tryRestoreOnLoad() {
  const savedFinal = getActiveFinalSession();
  if (savedFinal?.queue?.length) {
    const validIds = new Set(getQuestionPool().map((q) => q.questionId));
    const queue = savedFinal.queue.filter((id) => validIds.has(id));
    if (!queue.length || (savedFinal.index ?? 0) >= queue.length) {
      saveActiveFinalSession(null);
      return false;
    }
    if (queue.length !== savedFinal.queue.length) {
      savedFinal.queue = queue;
      savedFinal.targetCount = queue.length;
      savedFinal.index = Math.min(savedFinal.index ?? 0, queue.length - 1);
      saveActiveFinalSession(savedFinal);
    }
  }
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

function showBootError(err) {
  const el = getApp();
  const msg = err?.stack || err?.message || String(err);
  const html = `<main class="main boot-error"><h2 class="screen-title">Erreur au démarrage</h2>
    <p>Build : <strong>${APP_BUILD}</strong> — serveur depuis <code>docs/</code> : <strong>http://localhost:8080</strong></p>
    <pre class="boot-error__pre">${escapeHtml(msg)}</pre></main>`;
  if (el) el.innerHTML = html;
  console.error(err);
}

function init() {
  try {
    if (!getApp()) {
      showBootError(new Error("Élément #app introuvable dans index.html"));
      return;
    }
    migrateStorage();
    invalidateQuestionPool();
    sanitizePretestActiveSessions();
    const restored = tryRestoreOnLoad();
    pendingBackupRestore = !restored && shouldOfferBackupRestore();
    if (!restored && !isHelpDismissed("welcome")) {
      pendingHelp = "welcome";
    } else if (pendingBackupRestore) {
      queueBackupRestoreOffer();
      pendingBackupRestore = false;
    }
    render();
    window.__RCT_APP_READY__ = true;
  } catch (err) {
    showBootError(err);
  }
}

window.addEventListener("beforeunload", () => {
  if (cardSession?.mode === "final") persistFinalSession();
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
