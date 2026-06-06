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
  getModuleById,
  getModulesForAxis,
  getModuleGroupsForAxis,
  getModuleGroupById,
  getModulesInGroup,
  getGroupForModule,
  axisHasModuleGroups,
  sessionSizesForChapter,
} from "./pool.js";
import {
  buildClozeSegments,
  getClozeDisplayProgress,
  isClozePretestModule,
  renderClozeHtml,
} from "./cloze.js";
import { createPretestSession } from "./pretest-session.js";
import {
  FINAL_EXAM_PASS_RATE,
  FINAL_EXAM_QUESTION_COUNT,
  appendFinalExamResult,
  applyClozeMaster,
  applyClozeReview,
  applySrsMaster,
  applySrsReview,
  getClozeState,
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
const APP_BUILD = globalThis.__RCT_BUILD__?.APP_BUILD || "dev";
const { AXES } = globalThis.__RCT_DATA__;

const ANSWER_POINT_COLORS = ["#1a6b4a", "#5a9a7a"];

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
let route = { axisId: null, groupId: null, moduleId: null };

/** @type {null | { mode: "pretest"|"final"|"pretest-cloze", axisId?: string, moduleId?: string, questionId?: string, targetCount: number, queue: string[], index: number, flipped: boolean, revealed?: boolean, revealedBlanks?: Set<string>, errors: object[] }} */
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

const ANSWER_WARNING_MARK = "@@WARNING@@";
const ANSWER_INFO_MARK = "@@INFO@@";
const ANSWER_ENCART_MARK_RE = /@@WARNING@@|@@INFO@@/g;

/** Corps de réponse + encarts (`@@WARNING@@` attention orange, `@@INFO@@` information jaune). */
function splitAnswerBodyAndEncarts(raw) {
  const text = String(raw ?? "");
  if (!text.includes(ANSWER_WARNING_MARK) && !text.includes(ANSWER_INFO_MARK)) {
    return { body: text, encarts: [] };
  }
  const segments = text.split(ANSWER_ENCART_MARK_RE);
  const marks = [...text.matchAll(ANSWER_ENCART_MARK_RE)].map((match) =>
    match[0] === ANSWER_WARNING_MARK ? "warning" : "info",
  );
  return {
    body: (segments[0] ?? "").trimEnd(),
    encarts: marks
      .map((type, i) => ({
        type,
        content: (segments[i + 1] ?? "").trim(),
      }))
      .filter((entry) => entry.content),
  };
}

/** Réponse attendue (carte) : champ `answer` ou repli ancien format QCM. */
function answerForCard(q) {
  let raw = "";
  if (q.answer != null && String(q.answer).trim()) raw = q.answer;
  else if (q.choices?.length) raw = q.choices[q.correct ?? 0] ?? "";
  return splitAnswerBodyAndEncarts(raw).body;
}

/** Encarts hors points numérotés (attention orange, information jaune). */
function answerEncartsForCard(q) {
  let raw = "";
  if (q.answer != null && String(q.answer).trim()) raw = q.answer;
  const fromAnswer = splitAnswerBodyAndEncarts(raw).encarts;
  if (fromAnswer.length) return fromAnswer;
  if (q?.answerInfo != null && String(q.answerInfo).trim()) {
    return [{ type: "warning", content: String(q.answerInfo).trim() }];
  }
  const mod = getModuleById(q.axisId, q.moduleId);
  const src = mod?.questions?.find((item) => item.id === q.questionId);
  if (src?.answerInfo != null && String(src.answerInfo).trim()) {
    return [{ type: "warning", content: String(src.answerInfo).trim() }];
  }
  if (src?.answer != null && String(src.answer).trim()) {
    return splitAnswerBodyAndEncarts(src.answer).encarts;
  }
  return [];
}

/** Découpe une réponse en points numérotés (`1. …`, `2. …`). */
function splitAnswerPoints(raw) {
  const text = String(raw ?? "").trim();
  if (!text) return [];
  const byNewline = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (byNewline.length > 1) return byNewline;
  const byNumber = text
    .split(/(?=\d+\.\s)/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (byNumber.length > 1) return byNumber;
  return [text];
}

/** Sous-point d'une liste (`- …`) sous un intitulé `3. Feux de détresse :`. */
function isAnswerSubPoint(line) {
  return String(line ?? "").trim().startsWith("- ");
}

/** Réponse multi-points : un point par ligne, couleurs alternées. */
function formatAnswerHtml(raw) {
  const points = splitAnswerPoints(raw);
  if (!points.length) return "";
  let mainIndex = 0;
  return points
    .map((point) => {
      const sub = isAnswerSubPoint(point);
      if (!sub) mainIndex += 1;
      const tone = sub ? "sub" : mainIndex % 2 === 0 ? "a" : "b";
      const color = sub ? ANSWER_POINT_COLORS[1] : ANSWER_POINT_COLORS[(mainIndex - 1) % 2];
      return `<div class="flashcard__answer-point flashcard__answer-point--${tone}" style="color:${color}">${escapeHtml(point)}</div>`;
    })
    .join("");
}

/** Intitulé d'encart (`Cas n° 1… :`, `En cas de… :`) — pas de tiret devant. */
function isEncartIntroLine(line) {
  const trimmed = String(line ?? "").trim();
  if (!trimmed) return false;
  if (/^Cas n°\s*\d+/i.test(trimmed)) return true;
  return trimmed.endsWith(":");
}

/** Préfixe `- ` sur chaque ligne d'encart sauf intitulés d'introduction. */
function prefixEncartLine(line) {
  const trimmed = String(line ?? "").trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("- ")) return trimmed;
  if (isEncartIntroLine(trimmed)) return trimmed;
  return `- ${trimmed}`;
}

function formatAnswerEncartLinesHtml(raw, lineClass) {
  const lines = String(raw ?? "")
    .trim()
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  return lines
    .map((line) => {
      const display = prefixEncartLine(line);
      const cls = /^Cas n°\s*\d+/i.test(line)
        ? `${lineClass} ${lineClass}--case-title`
        : lineClass;
      return `<p class="${cls}">${escapeHtml(display)}</p>`;
    })
    .join("");
}

/** Encadré attention orange (hors points numérotés), ex. RCT p. 42. */
function formatAnswerAttentionHtml(raw) {
  const text = String(raw ?? "").trim();
  if (!text) return "";
  const body = formatAnswerEncartLinesHtml(text, "flashcard__answer-info-line");
  return `<div class="flashcard__answer-info" role="note">
    <p class="flashcard__answer-info-heading"><span class="flashcard__answer-info-icon" aria-hidden="true">⚠</span> ATTENTION :</p>
    ${body}
  </div>`;
}

/** Encadré information jaune (exemples, précisions), ex. RCT p. 46–47. */
function formatAnswerInformationHtml(raw) {
  const text = String(raw ?? "").trim();
  if (!text) return "";
  const body = formatAnswerEncartLinesHtml(text, "flashcard__answer-note-line");
  return `<div class="flashcard__answer-note" role="note">
    <p class="flashcard__answer-note-heading"><span class="flashcard__answer-note-icon" aria-hidden="true">i</span> INFORMATION :</p>
    ${body}
  </div>`;
}

function formatAnswerEncartsHtml(encarts) {
  return encarts
    .map((entry) =>
      entry.type === "info"
        ? formatAnswerInformationHtml(entry.content)
        : formatAnswerAttentionHtml(entry.content),
    )
    .join("");
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
  route = { axisId: null, groupId: null, moduleId: null };
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

function syncRouteGroupFromModule(axisId, moduleId) {
  route.axisId = axisId;
  route.moduleId = moduleId ?? null;
  route.groupId = moduleId ? getGroupForModule(axisId, moduleId)?.id ?? null : null;
}

/** Chapitre consignes (texte à trous) — libellés « consigne », pas « carte » / « session ». */
function usesConsigneLabels(axisId) {
  return axisId === "circulation";
}

function isClozeModuleActive(axisId, moduleId) {
  return (
    cardSession?.mode === "pretest-cloze" &&
    cardSession.axisId === axisId &&
    cardSession.moduleId === moduleId
  );
}

/** Progression d'une consigne (= un module) pour affichage badge. */
function getModuleConsigneState(axisId, mod) {
  const moduleId = mod.id;
  if (isClozePretestModule(axisId, moduleId) && mod.questions?.length === 1) {
    const q = mod.questions[0];
    const prog = getClozeDisplayProgress(q.id, q.answer ?? "");
    const inProgress =
      prog.inProgress || isClozeModuleActive(axisId, moduleId);
    return {
      mastered: prog.complete ? 1 : 0,
      inProgressCount: inProgress ? 1 : 0,
      total: 1,
      pct: prog.complete ? 100 : prog.pct,
      inProgress,
      complete: prog.complete,
    };
  }
  const { rate } = getPretestModuleMastery(axisId, moduleId);
  const session = reconcileActivePretestSession(axisId, moduleId);
  const pct = Math.round(rate * 100);
  const complete = rate >= 1;
  return {
    mastered: complete ? 1 : 0,
    inProgressCount: session ? 1 : 0,
    total: 1,
    pct: complete ? 100 : pct,
    inProgress: !!session,
    complete,
  };
}

/** Agrège plusieurs consignes (bloc, chapitre…). */
function getConsignesAggregate(axisId, modules) {
  let mastered = 0;
  let inProgressCount = 0;
  let pctSum = 0;
  let inProgress = false;
  const total = modules.length;
  for (const mod of modules) {
    const s = getModuleConsigneState(axisId, mod);
    mastered += s.mastered;
    pctSum += s.pct;
    if (s.inProgress) {
      inProgress = true;
      inProgressCount += s.inProgressCount;
    }
  }
  const pct = total > 0 ? Math.round(pctSum / total) : 0;
  return {
    mastered,
    inProgressCount,
    total,
    pct,
    inProgress,
    complete: total > 0 && mastered >= total,
  };
}

function progressBadgeClass({ inProgress, complete, mastered, pct }) {
  if (inProgress) return "badge badge--active";
  if (complete) return "badge badge--ok";
  if (mastered === 0 && pct === 0) return "badge badge--todo";
  return "badge badge--partial";
}

function consigneBadgeHtml({
  mastered,
  inProgressCount = 0,
  total,
  pct,
  inProgress,
  complete,
}) {
  const cls = progressBadgeClass({ inProgress, complete, mastered, pct });
  if (inProgress) {
    return `<span class="${cls}">Maîtrise de consigne en cours : ${inProgressCount} / ${total} (${pct} %)</span>`;
  }
  if (complete) {
    return `<span class="${cls}">Consigne maîtrisée : ${mastered} / ${total} (100 %) <span class="badge__celebrate" aria-hidden="true">🥳</span></span>`;
  }
  return `<span class="${cls}">Consigne maîtrisée : ${mastered} / ${total} (${pct} %)</span>`;
}

function carteBadgeHtml({ mastered, total, pct, complete, sessionLabel }) {
  if (sessionLabel) {
    return `<span class="badge badge--active">Session en cours : carte ${sessionLabel.current} / ${sessionLabel.total}</span>`;
  }
  const cls = progressBadgeClass({ inProgress: false, complete, mastered, pct });
  if (complete) {
    return `<span class="${cls}">Cartes maîtrisées : ${mastered} / ${total} (100 %) <span class="badge__celebrate" aria-hidden="true">🥳</span></span>`;
  }
  return `<span class="${cls}">Cartes maîtrisées : ${mastered} / ${total} (${pct} %)</span>`;
}

function consigneCountLabel(n) {
  if (n <= 0) return "0 consigne";
  return n === 1 ? "1 consigne" : `${n} consignes`;
}

function moduleCardCount(axisId, moduleId) {
  return getQuestionsForModule(axisId, moduleId).length;
}

/** Une seule carte : pas d'écran « Démarrer / tout le bloc ». */
function openPretestModule(axisId, moduleId) {
  syncRouteGroupFromModule(axisId, moduleId);
  if (isClozePretestModule(axisId, moduleId)) {
    openClozePretest(axisId, moduleId);
    return;
  }
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
  const group = getGroupForModule(axisId, moduleId);
  if (group) {
    route.groupId = group.id;
    route.moduleId = null;
    return "pretest-modules";
  }
  if (axisHasModuleGroups(axisId)) {
    route.groupId = null;
    route.moduleId = null;
    return "pretest-groups";
  }
  route.groupId = null;
  route.moduleId = null;
  return pretestModuleCount(axisId) > 1 ? "pretest-modules" : "pretest-chapters";
}

function pretestBackLabel(screenName) {
  if (screenName === "pretest-chapters") return "← Chapitres";
  if (screenName === "pretest-groups") return "← Chapitres";
  if (screenName === "pretest-modules" && route.groupId) {
    const group = getModuleGroupById(route.axisId, route.groupId);
    return group ? `← ${group.title}` : "← Groupes";
  }
  if (screenName === "pretest-modules") return "← Consignes";
  return "← Retour";
}

function pretestSessionCardLabel(session) {
  const total = session.queue?.length ?? session.targetCount ?? 0;
  const current = Math.min((session.index ?? 0) + 1, Math.max(1, total));
  return { current, total };
}

function openClozePretest(axisId, moduleId) {
  if (!isPretestChapterUnlocked(axisId)) return;
  const questions = getQuestionsForModule(axisId, moduleId);
  const q = questions[0];
  if (!q) return;

  const start = () => {
    cardSession = {
      mode: "pretest-cloze",
      axisId,
      moduleId,
      questionId: q.questionId,
      revealed: false,
      revealedBlanks: new Set(),
    };
    screen = "pretest-cloze";
    render();
  };

  if (needsPretestPauseWarning()) {
    showPauseWarn = true;
    pauseWarnContinue = start;
    render();
    return;
  }
  start();
}

function finishClozePretest(mastered) {
  const { axisId, moduleId, questionId } = cardSession;
  const q = getQuestionById(questionId);
  const raw =
    q?.answer ??
    getModuleById(axisId, moduleId)?.questions?.find((item) => item.id === questionId)
      ?.answer ??
    "";
  const { segments } = buildClozeSegments(raw);

  if (mastered) {
    applyClozeMaster(questionId, segments.length);
  } else {
    applyClozeReview(questionId);
  }
  onPretestSessionComplete(axisId, moduleId);
  recordPretestSessionResult(
    getPretestScopeKey(axisId, moduleId),
    mastered ? 1 : 0,
    1,
  );
  cardSession = null;
  const back = pretestBackAfterModule(axisId, moduleId);
  screen = back;
  if (screen === "pretest-chapters") route = { axisId: null, groupId: null, moduleId: null };
  void writeProgressBackupFile();
  render();
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
    !route.groupId &&
    screen === "pretest-modules" &&
    axisHasModuleGroups(route.axisId)
  ) {
    screen = "pretest-groups";
    route.moduleId = null;
  }
  if (
    route.axisId &&
    screen !== "pretest-chapters" &&
    !isPretestChapterUnlocked(route.axisId)
  ) {
    screen = "pretest-chapters";
    route = { axisId: null, groupId: null, moduleId: null };
  }
  if (
    route.axisId &&
    route.groupId &&
    (screen === "pretest-modules" || screen === "pretest-setup" || screen === "pretest-cloze") &&
    !getModuleGroupById(route.axisId, route.groupId)
  ) {
    screen = axisHasModuleGroups(route.axisId) ? "pretest-groups" : "pretest-modules";
    route.groupId = null;
    route.moduleId = null;
  }
  if (
    route.axisId &&
    route.moduleId &&
    (screen === "pretest-setup" || screen === "pretest-card" || screen === "pretest-cloze") &&
    !getModuleById(route.axisId, route.moduleId)
  ) {
    screen = route.groupId
      ? "pretest-modules"
      : axisHasModuleGroups(route.axisId)
        ? "pretest-groups"
        : pretestModuleCount(route.axisId) > 1
          ? "pretest-modules"
          : "pretest-chapters";
    route.moduleId = null;
  }
  switch (screen) {
    case "pretest-chapters":
      return renderPretestChapters();
    case "pretest-groups":
      return renderPretestGroups();
    case "pretest-modules":
      return renderPretestModules();
    case "pretest-setup":
      return renderPretestSetup();
    case "pretest-card":
      return renderFlashcard();
    case "pretest-cloze":
      return renderClozePretest();
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
            const ch = pre.chapters.find((c) => c.axisId === axis.id);
            const chPct = ch?.masteryPct ?? 0;
            let badge;
            let countLabel;
            if (usesConsigneLabels(axis.id)) {
              const modules = getModulesForAxis(axis.id);
              const agg = getConsignesAggregate(axis.id, modules);
              countLabel = consigneCountLabel(modules.length);
              if (ch?.ok) {
                badge = `<span class="badge badge--ok">Examen final : OK (${chPct} %)</span>`;
              } else {
                badge = consigneBadgeHtml(agg);
                if (!agg.inProgress) {
                  badge += ` · ${pre.thresholdPct} % requis`;
                }
              }
            } else {
              const n = getQuestionsForAxis(axis.id).length;
              const active = findActivePretestSessionOnAxis(axis.id);
              const mastered = ch?.mastered ?? 0;
              const total = ch?.total ?? n;
              countLabel = carteCountLabel(n);
              badge = ch?.ok
                ? `<span class="badge badge--ok">Examen final : OK (${chPct} %)</span>`
                : active
                  ? carteBadgeHtml({
                      sessionLabel: pretestSessionCardLabel(active),
                    })
                  : carteBadgeHtml({
                        mastered,
                        total,
                        pct: chPct,
                        complete: total > 0 && mastered >= total,
                      }) + ` · ${pre.thresholdPct} % requis`;
            }
            const cardClass =
              axis.id === "acronymes"
                ? "axis-card axis-card--recommended"
                : "axis-card";
            return `
              <button type="button" class="${cardClass}" data-pretest-axis="${axis.id}">
                <span class="axis-card__num">${axisChapterLabel(axis)}</span>
                <div class="axis-card__title">${escapeHtml(axis.title)}</div>
                <p class="axis-card__desc">${axisCetMeta(axis)}</p>
                <div class="axis-card__meta">${badge} · ${countLabel}</div>
              </button>`;
          })
          .join("")}
      </div>
      <p class="footer-note">Basé sur doc TaM — Outil d'entraînement personnel · build ${APP_BUILD}</p>
    </main>`;
}

function moduleCardCountLabel(axisId, moduleId, n) {
  if (isClozePretestModule(axisId, moduleId)) {
    return n <= 1 ? "texte à trous" : `${n} textes à trous`;
  }
  return carteCountLabel(n);
}

/** Badge maîtrise / progression pour une consigne pré-examen. */
function pretestModuleBadgeHtml(axisId, moduleId, mod, active) {
  if (usesConsigneLabels(axisId)) {
    const state = getModuleConsigneState(axisId, mod);
    if (active && !state.inProgress) {
      state.inProgress = true;
      state.inProgressCount = 1;
    }
    return consigneBadgeHtml(state);
  }

  const n = mod.questions.length;
  const { mastered, total, rate } = getPretestModuleMastery(axisId, moduleId);
  const pct = Math.round(rate * 100);

  if (active) {
    return carteBadgeHtml({
      sessionLabel: pretestSessionCardLabel(active),
    });
  }
  if (total > 0 && rate >= 1) {
    return carteBadgeHtml({ mastered, total, pct, complete: true });
  }
  return carteBadgeHtml({ mastered, total, pct, complete: false });
}

function renderPretestGroups() {
  const axis = getAxisById(route.axisId);
  const groups = getModuleGroupsForAxis(route.axisId);

  return `
    <main class="main">
      <button type="button" class="link-back" data-pretest-back-chapters>← Chapitres</button>
      <h2 class="screen-title">${escapeHtml(axis.title)}</h2>
      <p class="screen-sub">${axisChapterLabel(axis)} — RCT p. ${escapeHtml(axis.cetPages)}</p>
      <p class="intro-note">Choisissez un <strong>bloc</strong>, puis une consigne à travailler séparément.</p>
      <div class="axes">
        ${groups
          .map((group) => {
            const n = group.moduleIds.length;
            const modules = getModulesInGroup(route.axisId, group.id);
            const agg = getConsignesAggregate(route.axisId, modules);
            const badge = consigneBadgeHtml(agg);
            return `
              <button type="button" class="axis-card" data-pretest-group="${group.id}">
                <span class="axis-card__num">${escapeHtml(group.code)}</span>
                <div class="axis-card__title">${escapeHtml(group.title)}</div>
                <div class="axis-card__meta">${badge} · ${consigneCountLabel(n)}</div>
              </button>`;
          })
          .join("")}
      </div>
      <p class="footer-note">Basé sur doc TaM — Outil d'entraînement personnel · build ${APP_BUILD}</p>
    </main>`;
}

function renderPretestModules() {
  const axis = getAxisById(route.axisId);
  const group = route.groupId
    ? getModuleGroupById(route.axisId, route.groupId)
    : null;
  const modules = group
    ? getModulesInGroup(route.axisId, route.groupId)
    : getModulesForAxis(route.axisId);
  const backLabel = pretestBackLabel("pretest-modules");
  const listTitle = group ? group.title : axis.title;
  const listSub = group
    ? `${axisChapterLabel(axis)} — ${escapeHtml(group.code)}`
    : `${axisChapterLabel(axis)} — RCT p. ${escapeHtml(axis.cetPages)}`;

  return `
    <main class="main">
      <button type="button" class="link-back" data-pretest-back>${backLabel}</button>
      <h2 class="screen-title">${escapeHtml(listTitle)}</h2>
      <p class="screen-sub">${listSub}</p>
      <p class="intro-note">Choisissez une consigne à travailler <strong>séparément</strong>.</p>
      <div class="axes">
        ${modules
          .map((mod) => {
            const n = mod.questions.length;
            const active = reconcileActivePretestSession(route.axisId, mod.id);
            const badge = pretestModuleBadgeHtml(
              route.axisId,
              mod.id,
              mod,
              active,
            );
            return `
              <button type="button" class="axis-card" data-pretest-module="${mod.id}">
                <span class="axis-card__num">${escapeHtml(mod.code)}</span>
                <div class="axis-card__title">${escapeHtml(mod.title)}</div>
                ${group ? "" : `<p class="axis-card__desc">${moduleCetMeta(mod)}</p>`}
                <div class="axis-card__meta">${badge} · ${moduleCardCountLabel(route.axisId, mod.id, n)}</div>
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
    screen = route.groupId
      ? "pretest-modules"
      : axisHasModuleGroups(route.axisId)
        ? "pretest-groups"
        : pretestModuleCount(route.axisId) > 1
          ? "pretest-modules"
          : "pretest-chapters";
    if (screen === "pretest-chapters") {
      route = { axisId: null, groupId: null, moduleId: null };
    } else {
      route.moduleId = null;
    }
    return renderPretest();
  }
  const chapterCount = getQuestionsForModule(route.axisId, route.moduleId).length;
  const scopeKey = getPretestScopeKey(route.axisId, route.moduleId);
  const sizes = sessionSizesForChapter(chapterCount);
  const pref = getPretestPref(scopeKey);
  const defaultSize = sizes.includes(pref) ? pref : sizes[0] ?? chapterCount;
  const active = reconcileActivePretestSession(route.axisId, route.moduleId);
  const backLabel =
    route.groupId && getModuleGroupById(route.axisId, route.groupId)
      ? `← ${getModuleGroupById(route.axisId, route.groupId).title}`
      : pretestModuleCount(route.axisId) > 1
        ? "← Consignes"
        : "← Chapitres";

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

/* ─── Texte à trous (pré-examen consignes) ─── */

function renderClozePretest() {
  const { axisId, moduleId, questionId, revealed } = cardSession;
  const q = getQuestionById(questionId);
  const mod = getModuleById(axisId, moduleId);
  if (!q || !mod) {
    cardSession = null;
    screen = pretestBackAfterModule(axisId, moduleId);
    return renderPretest();
  }

  syncRouteGroupFromModule(axisId, moduleId);
  const backLabel = pretestBackLabel("pretest-modules");

  const raw = q.answer ?? "";
  const { blankCount, clozeSeed } = getClozeState(questionId);
  const { html, totalSegments, blankCount: shownBlanks } = renderClozeHtml(raw, {
    blankCount,
    questionId,
    clozeSeed,
    revealedAll: revealed,
    revealedBlanks: cardSession.revealedBlanks ?? new Set(),
  });

  const moduleRef = mod.cetPage
    ? `RCT p. ${mod.cetPage} — ${escapeHtml(mod.code)}`
    : escapeHtml(mod.code);

  const revealLabel = revealed
    ? "Masquer la réponse complète"
    : "Voir la réponse complète";

  return `
    <main class="main">
      <button type="button" class="link-back" data-cloze-abort>${escapeHtml(backLabel)}</button>
      <p class="quiz-meta">Texte à trous · ${shownBlanks} / ${totalSegments} mots masqués</p>
      <p class="cloze-hint">${
        revealed
          ? "Les mots <strong class=\"cloze-hint__mark\">en bleu</strong> étaient masqués."
          : "Retrouvez les mots masqués, puis touchez un <strong class=\"cloze-hint__mark\">trou</strong> pour vérifier."
      }</p>
      <article class="cloze-card">
        <p class="cloze-card__chapter">${escapeHtml(mod.title)}</p>
        <h2 class="cloze-card__prompt">${escapeHtml(promptForCard(q))}</h2>
        <p class="cloze-card__ref">(${moduleRef})</p>
        <div class="cloze-card__body">${html}</div>
        <button type="button" class="btn btn--ghost btn--small cloze-reveal" data-cloze-reveal>${revealLabel}</button>
      </article>
      <div class="cloze-actions">
        <button type="button" class="btn btn--primary" data-cloze-master>Je maîtrise</button>
        <button type="button" class="btn btn--ghost" data-cloze-review>À revoir</button>
      </div>
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

  const answerEncartsBlock = formatAnswerEncartsHtml(answerEncartsForCard(q));

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
                <div class="flashcard__answer">${formatAnswerHtml(answerForCard(q))}${answerEncartsBlock}</div>
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
      if (screen === "pretest-chapters") {
        route = { axisId: null, groupId: null, moduleId: null };
      }
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
  route.groupId = null;
  route.moduleId = null;
  if (axisHasModuleGroups(axisId)) {
    screen = "pretest-groups";
  } else if (modules.length > 1) {
    screen = "pretest-modules";
  } else if (modules.length === 1) {
    openPretestModule(axisId, modules[0].id);
    return;
  } else {
    screen = "pretest-chapters";
    route = { axisId: null, groupId: null, moduleId: null };
  }
  render();
}

function openPretestGroup(groupId) {
  route.groupId = groupId;
  route.moduleId = null;
  screen = "pretest-modules";
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

  app.querySelectorAll("[data-pretest-group]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openPretestGroup(btn.dataset.pretestGroup);
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
      route = { axisId: null, groupId: null, moduleId: null };
      render();
    },
  );

  app.querySelector("[data-pretest-back]")?.addEventListener("click", () => {
    if (route.groupId) {
      screen = "pretest-groups";
      route.groupId = null;
      route.moduleId = null;
    } else if (pretestModuleCount(route.axisId) > 1) {
      screen = "pretest-modules";
      route.moduleId = null;
    } else {
      screen = "pretest-chapters";
      route = { axisId: null, groupId: null, moduleId: null };
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
  bindClozePretest();
}

function bindClozePretest() {
  app.querySelector("[data-cloze-abort]")?.addEventListener("click", () => {
    const axisId = cardSession?.axisId ?? route.axisId;
    const moduleId = cardSession?.moduleId ?? route.moduleId;
    cardSession = null;
    screen = pretestBackAfterModule(axisId, moduleId);
    if (screen === "pretest-chapters") {
      route = { axisId: null, groupId: null, moduleId: null };
    }
    render();
  });

  app.querySelector(".cloze-card__body")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cloze-blank]");
    if (!btn || cardSession?.mode !== "pretest-cloze" || cardSession.revealed) return;
    const id = btn.dataset.clozeBlank;
    if (!id) return;
    if (!cardSession.revealedBlanks) cardSession.revealedBlanks = new Set();
    cardSession.revealedBlanks.add(id);
    render();
  });

  app.querySelector("[data-cloze-reveal]")?.addEventListener("click", () => {
    if (cardSession?.mode === "pretest-cloze") {
      cardSession.revealed = !cardSession.revealed;
      if (!cardSession.revealed) cardSession.revealedBlanks = new Set();
      render();
    }
  });

  app.querySelector("[data-cloze-master]")?.addEventListener("click", () => {
    if (cardSession?.mode === "pretest-cloze") finishClozePretest(true);
  });

  app.querySelector("[data-cloze-review]")?.addEventListener("click", () => {
    if (cardSession?.mode === "pretest-cloze") finishClozePretest(false);
  });
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
      syncRouteGroupFromModule(route.axisId, route.moduleId);
    }
    cardSession = null;
    screen = pretestBackAfterModule(route.axisId, route.moduleId);
    if (screen === "pretest-chapters") {
      route = { axisId: null, groupId: null, moduleId: null };
    }
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
      answer: answerForCard(q),
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
  route = { axisId: null, groupId: null, moduleId: null };
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
