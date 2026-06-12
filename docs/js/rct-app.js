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
  pickNextClozeModule,
  countClozeAlternatives,
  countUntouchedClozeConsignes,
  getClozeIdleState,
  formatClozeWaitFr,
  renderClozeHtml,
  CLOZE_DAILY_NEW_TARGET,
  CLOZE_CONSIGNE_MASTERY_RATE,
  getClozeSessionBlankIds,
  hasUnfinishedClozeCycle,
  isClozeSessionComplete,
} from "./cloze.js";
import { createPretestSession } from "./pretest-session.js";
import { closeReader, isReaderOpen, openReader, setReaderEmbedded } from "./rct-reader.js";
import {
  FINAL_EXAM_PASS_RATE,
  FINAL_EXAM_QUESTION_COUNT,
  appendFinalExamResult,
  applyClozeMaster,
  applyClozeReview,
  mergeClozeConfirmed,
  applySrsMaster,
  ensureSrsIntroduced,
  applySrsReview,
  addClozeDailyExtra,
  clearActiveClozeSession,
  CLOZE_DAILY_MAX,
  declineClozeDailyExtra,
  getActiveClozeSession,
  getClozeDailyIntroCount,
  getClozeDailyMaxExtra,
  getClozeDailyNewTarget,
  markClozeExtensionOffered,
  getClozeState,
  getSrsRow,
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
  PRETEST_FINAL_UNLOCK_RATE,
  isHelpDismissed,
  isPretestChapterUnlocked,
  migrateStorage,
  sanitizePretestActiveSessions,
  needsPretestPauseWarning,
  onPretestSessionComplete,
  onClozeSessionComplete,
  recordClozeDailyIntro,
  recordClozeSessionResult,
  shouldOfferClozeDailyExtra,
  recordPretestSessionResult,
  resetAllUserProgress,
  saveActiveClozeSession,
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

/** Remonte la page après passage à une nouvelle consigne (évite de rester scrollé en bas). */
function scrollMainToTop() {
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
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

/** @type {"reader"|"exam"} */
let activeAppSection = "reader";
/** @type {"pretest"|"final"} */
let activeTab = "pretest";
/** @type {string} */
let screen = "pretest-chapters";
let route = { axisId: null, groupId: null, moduleId: null };

/** @type {null | { mode: "pretest"|"final"|"pretest-cloze", axisId?: string, moduleId?: string, questionId?: string, targetCount: number, queue: string[], index: number, flipped: boolean, revealedBlanks?: Set<string>, confirmedBlanks?: Set<string>, sessionBlankIds?: Set<string>, errors: object[] }} */
let cardSession = null;

/** @type {null | "welcome"|"pretest"|"final"} */
let pendingHelp = null;
/** Proposition de reprise depuis fichier après popup « Compris » (cache vide). */
let pendingBackupRestore = false;
let showPauseWarn = false;
let pauseWarnContinue = null;
let showClozeDailyExtra = false;
let clozeDailyExtraContinue = null;
let showClozeIdleWait = null;
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

function helpAcronymesLineHtml() {
  return `<p><strong>Acronymes</strong> «&nbsp;carte recto-verso&nbsp;» : après avoir pris connaissance du verso de la carte, cliquez sur «&nbsp;Je maîtrise&nbsp;» ou «&nbsp;À revoir&nbsp;».</p>`;
}

function helpChapitresConsignesLineHtml() {
  return `<p><strong>Chapitres «&nbsp;Consignes&nbsp;»</strong> (texte à trous) : remplir les trous selon la réponse attendue.</p>`;
}

function clozeHelpEncartHtml() {
  return `<div class="help-cloze-box" role="note">
    <p class="help-cloze-box__label">Principe du texte à trous</p>
    <ul class="help-modal__list">
      <li><strong>1er toucher</strong> sur un trou (<strong>···</strong>) : le mot attendu s’affiche sur <strong>fond bleu</strong>.</li>
      <li><strong>2e toucher</strong> : si c’était le mot auquel vous pensiez, le fond passe au <strong>jaune</strong> — réponse validée.</li>
      <li>Si vous ne l’aviez pas trouvé, laissez le mot sur <strong>fond bleu</strong> sans retoucher.</li>
      <li><strong>3e toucher</strong> sur un mot jaune : annule une validation accidentelle (retour au bleu).</li>
    </ul>
    <p>Quand tous les trous sont validés (jaunes), passage à la consigne suivante. Sinon, cliquez sur «&nbsp;Revoir cette consigne plus tard&nbsp;».</p>
  </div>`;
}

function helpAppSectionsHtml() {
  return `<div class="help-app-sections">
    <div class="help-app-section help-app-section--reader" role="note">
      <p class="help-app-section__label">Consultation et recherche</p>
      <p>RCT intégral, recherche par mot, surlignages manuels. Vos annotations sont conservées sur cet appareil.</p>
    </div>
    <div class="help-app-section help-app-section--exam" role="note">
      <p class="help-app-section__label">Préparation à l'examen</p>
      <p>Pré-examen (cartes et textes à trous) et examen final. Maîtrise, sessions en cours et historique sont conservés sur cet appareil.</p>
    </div>
  </div>`;
}

function helpDailyConsignesHtml() {
  return `<p><strong>${CLOZE_DAILY_NEW_TARGET} nouvelles consignes par jour</strong>, présentées l’une après l’autre sans revenir en arrière. À la fin de ce lot, vous pourrez <strong>une seule fois</strong> en ajouter (de 1 à 10, maximum <strong>${CLOZE_DAILY_MAX}</strong> dans la journée) ou passer aux révisions. Les révisions priorisent les consignes les moins bien réussies, selon le calendrier SRS.</p>`;
}

/** Déverrouillage de l'onglet Examen final. */
function examFinalGoalText() {
  const pct = Math.round(PRETEST_FINAL_UNLOCK_RATE * 100);
  return `L’<strong>Examen final</strong> s’ouvre lorsque <strong>Acronymes et tous les chapitres</strong> atteignent au moins <strong>${pct}&nbsp;%</strong> de maîtrise en <strong>Pré-examen</strong>.`;
}

function examFinalRulesText() {
  return `Pour réussir l’<strong>Examen final</strong>, vous devrez répondre correctement à <strong>${FINAL_PASS_COUNT} questions sur ${FINAL_EXAM_QUESTION_COUNT}</strong>.`;
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
      ${helpAppSectionsHtml()}
      <p>Au démarrage, l’application ouvre <strong>Consultation et recherche</strong>. L’onglet <strong>Préparation à l'examen</strong> sert au pré-examen et à l’examen final.</p>
      <p><strong>Conseil :</strong> commencez par <strong>Acronymes</strong>, puis les chapitres «&nbsp;Consignes&nbsp;».</p>
      <p>Le <strong>Pré-examen</strong> propose deux formats :</p>
      ${helpAcronymesLineHtml()}
      ${helpChapitresConsignesLineHtml()}
      ${clozeHelpEncartHtml()}
      ${helpDailyConsignesHtml()}
      <p>${examFinalGoalText()}</p>
      <p>${examFinalRulesText()}</p>`;
    },
  },
  pretest: {
    title: "Mode Pré-examen",
    get body() {
      return `${helpAcronymesLineHtml()}
      ${helpChapitresConsignesLineHtml()}
      ${clozeHelpEncartHtml()}
      ${helpDailyConsignesHtml()}
      <p>Objectif <strong>${Math.round(CLOZE_CONSIGNE_MASTERY_RATE * 100)}&nbsp;%</strong> de mots validés par consigne. Révisions espacées depuis la première apparition de chaque consigne.</p>
      <p>${examFinalGoalText()}</p>
      <p>${examFinalRulesText()}</p>`;
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
  stashClozeProgressBeforeLeave();
  activeTab = tab;
  cardSession = null;
  route = { axisId: null, groupId: null, moduleId: null };
  screen = tab === "pretest" ? "pretest-chapters" : "final-setup";

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
    const main = `<p class="header__unlock">Pré-examen : ${okCount} / ${totalCh} à ${pre.thresholdPct} % pour l'examen final.</p>`;
    if (!pending) return main;
    return `${main}<p class="header__unlock header__unlock--sub">Reste : ${pending}.</p>`;
  }

  return "";
}

function renderAppSectionTabsHtml() {
  return `
    <nav class="app-section-tabs" aria-label="Sections RCT">
      <button type="button" class="app-section-tabs__btn ${activeAppSection === "reader" ? "app-section-tabs__btn--active" : ""}" data-app-section="reader">Consultation et recherche</button>
      <button type="button" class="app-section-tabs__btn ${activeAppSection === "exam" ? "app-section-tabs__btn--active" : ""}" data-app-section="exam">Préparation à l'examen</button>
    </nav>`;
}

function renderExamChrome(mainHtml) {
  const lockFinal = !isFinalExamUnlocked();
  const unlockPct = Math.round(PRETEST_FINAL_UNLOCK_RATE * 100);
  const finalTitle = lockFinal
    ? `Pré-examen : ${unlockPct} % de maîtrise sur Acronymes et chaque chapitre`
    : "Examen final";
  return `
    <div class="app-top-bar">
      <header class="header header--app">
        <div class="header__app-title-row">
          <h1>RCT <span class="header__app-subtitle">(Règlement de Circulation Tramway TaM)</span></h1>
          <button type="button" class="header__help-btn" data-exam-help title="Aide pré-examen" aria-label="Aide pré-examen"><span aria-hidden="true">?</span></button>
        </div>
        ${renderUnlockBanner()}
      </header>
      <nav class="tabs" aria-label="Modes d'examen">
        <button type="button" class="tabs__btn ${activeTab === "pretest" ? "tabs__btn--active" : ""}" data-tab="pretest">Pré-examen</button>
        <button type="button" class="tabs__btn ${activeTab === "final" ? "tabs__btn--active" : ""}" data-tab="final" ${lockFinal ? `disabled title="${finalTitle}"` : ""}>Examen final</button>
      </nav>
    </div>
    ${mainHtml}`;
}

function bindAppSectionTabs() {
  app.querySelectorAll("[data-app-section]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.appSection;
      if (section === "reader" || section === "exam") setAppSection(section);
    });
  });
}

function prepareExamSectionOnEnter() {
  if (cardSession) return false;

  if (tryResumeClozeSession()) return true;

  const savedFinal = getActiveFinalSession();
  if (
    savedFinal?.queue?.length &&
    savedFinal.index < savedFinal.queue.length &&
    isFinalExamUnlocked()
  ) {
    activeTab = "final";
    screen = "final-setup";
  }
  return false;
}

function setAppSection(section) {
  if (section === activeAppSection) return;
  if (section === "reader") {
    stashClozeProgressBeforeLeave();
    activeAppSection = "reader";
    render();
    return;
  }
  stashClozeProgressBeforeLeave();
  activeAppSection = "exam";
  if (cardSession) {
    render();
    return;
  }
  if (tryResumeClozeSession()) return;
  if (reconcileExamScreenAfterSessionLost({ allowResume: true })) return;
  prepareExamSectionOnEnter();
  render();
}

function renderReaderSection() {
  app.innerHTML = `<div class="app-root app-root--reader">${renderAppSectionTabsHtml()}</div>`;
  bindAppSectionTabs();
  if (!isReaderOpen()) {
    openReader(null, { embedded: true });
  } else {
    setReaderEmbedded(true);
  }
}

function renderExamSection(mainHtml) {
  closeReader();
  app.innerHTML = `
    <div class="app-root">
      ${renderAppSectionTabsHtml()}
      <div class="app-root__exam">${renderExamChrome(mainHtml)}</div>
    </div>`;
  bindAppSectionTabs();
  bindTabs();
  bindExamChrome();
  if (activeTab === "pretest") bindPretest();
  else bindFinal();
  bindHiddenResetGesture();
}

function bindExamChrome() {
  app.querySelector("[data-exam-help]")?.addEventListener("click", () => {
    pendingHelp = "pretest";
    render();
  });
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
  const dismissHtml = `<label class="help-modal__dismiss"><input type="checkbox" data-help-dismiss /> ${mode === "welcome" ? "Ne plus afficher au démarrage" : "Ne plus afficher"}</label>`;
  app.innerHTML = `
    <div class="help-backdrop" role="dialog" aria-modal="true">
      <div class="help-modal">
        <h2>${escapeHtml(h.title)}</h2>
        <div class="help-modal__body">${bodyHtml}</div>
        ${dismissHtml}
        <button type="button" class="btn btn--primary" data-help-close>Compris</button>
      </div>
    </div>`;
  app.querySelector("[data-help-close]").addEventListener("click", () => {
    if (app.querySelector("[data-help-dismiss]")?.checked) dismissHelp(mode);
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

function renderClozeIdleModal(idle) {
  const axisId = idle.axisId ?? "circulation";
  const waitLabel =
    idle.waitMs != null ? formatClozeWaitFr(idle.waitMs) : null;
  const untouched = countUntouchedClozeConsignes(axisId);
  const canAddNew = untouched > 0;
  const body = waitLabel
    ? `<p>Aucune consigne à travailler pour le moment selon le calendrier SRS.</p>
       <p>Prochaine révision possible dans environ <strong>${waitLabel}</strong>.</p>`
    : `<p>Aucune consigne à travailler pour le moment.</p>`;
  const deferred =
    idle.deferredCount > 0
      ? `<p>Vous avez ${idle.deferredCount} consigne${idle.deferredCount > 1 ? "s" : ""} marquée${idle.deferredCount > 1 ? "s" : ""} « À revoir » : elles reviendront après d’autres consignes.</p>`
      : "";
  const bridgeHint = canAddNew
    ? `<p>Vous pouvez attendre la prochaine révision SRS, ou mettre en route <strong>5 nouvelles consignes</strong> pour combler ce créneau — les révisions précédentes reprendront ensuite selon leur calendrier.</p>`
    : `<p>Revenez plus tard ou reprenez demain pour de nouvelles consignes.</p>`;

  const actions = canAddNew
    ? `<div class="help-modal__actions help-modal__actions--extra">
         <div class="help-modal__actions--pair">
           <button type="button" class="btn btn--ghost" data-idle-wait>
             <span class="btn__stack">Revenir dans</span>
             <span class="btn__stack">${waitLabel ? `~${waitLabel}` : "un moment"}</span>
           </button>
           <button type="button" class="btn btn--primary" data-idle-extra="5">
             <span class="btn__stack">+5 nouvelles</span>
             <span class="btn__stack">consignes</span>
           </button>
         </div>
       </div>`
    : `<button type="button" class="btn btn--primary" data-idle-wait>Compris</button>`;

  app.innerHTML = `
    <div class="help-backdrop" role="dialog" aria-modal="true">
      <div class="help-modal">
        <h2>Pause d’apprentissage</h2>
        <div class="help-modal__body">
          ${body}
          ${deferred}
          ${bridgeHint}
        </div>
        ${actions}
      </div>
    </div>`;

  const leave = () => {
    showClozeIdleWait = null;
    route.axisId = axisId;
    route.groupId = null;
    route.moduleId = null;
    screen = "pretest-groups";
    render();
  };

  app.querySelector("[data-idle-wait]")?.addEventListener("click", leave);
  app.querySelector("[data-idle-extra='5']")?.addEventListener("click", () => {
    addClozeDailyExtra(5);
    showClozeIdleWait = null;
    continueClozeRevision(axisId);
  });
}

function renderClozeDailyExtraModal() {
  markClozeExtensionOffered();
  const count = getClozeDailyIntroCount();
  const target = getClozeDailyNewTarget();
  const maxExtra = getClozeDailyMaxExtra();
  const pickerCells = Array.from({ length: 10 }, (_, i) => {
    const n = i + 1;
    const enabled = n <= maxExtra;
    return `<label class="cloze-extra-picker__choice${enabled ? "" : " cloze-extra-picker__choice--disabled"}">
      <span class="cloze-extra-picker__num">${n}</span>
      <input type="radio" name="cloze-extra-count" value="${n}"${enabled ? "" : " disabled"} />
    </label>`;
  }).join("");

  app.innerHTML = `
    <div class="help-backdrop" role="dialog" aria-modal="true">
      <div class="help-modal">
        <h2>Lot du jour terminé</h2>
        <div class="help-modal__body">
          <p>Vous avez fait vos <strong>${target}</strong> premières consignes du jour (nouvelles consignes vues : <strong>${count}</strong>).</p>
          <p>C’est le <strong>seul moment de la journée</strong> pour en ajouter d’autres (maximum <strong>${CLOZE_DAILY_MAX}</strong> au total). Sinon, vous repasserez vos consignes par ordre de difficulté, selon le calendrier SRS.</p>
          <div class="cloze-extra-picker" role="group" aria-label="Nombre de consignes supplémentaires">
            ${pickerCells}
          </div>
        </div>
        <div class="help-modal__actions help-modal__actions--extra">
          <button type="button" class="btn btn--primary" data-extra-confirm disabled>
            Valider le nombre choisi
          </button>
          <button type="button" class="btn btn--ghost" data-extra-decline>
            Non, révisions seulement
          </button>
        </div>
      </div>
    </div>`;

  const finish = () => {
    showClozeDailyExtra = false;
    const cont = clozeDailyExtraContinue;
    clozeDailyExtraContinue = null;
    cont?.();
  };

  const confirmBtn = app.querySelector("[data-extra-confirm]");
  app.querySelectorAll('input[name="cloze-extra-count"]').forEach((input) => {
    input.addEventListener("change", () => {
      if (confirmBtn) confirmBtn.disabled = false;
    });
  });

  confirmBtn?.addEventListener("click", () => {
    const picked = app.querySelector('input[name="cloze-extra-count"]:checked');
    if (!picked) return;
    addClozeDailyExtra(Number(picked.value));
    finish();
  });

  app.querySelector("[data-extra-decline]")?.addEventListener("click", () => {
    declineClozeDailyExtra();
    finish();
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
  return axisId === "circulation" || axisId === "urgence";
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
    return `<span class="${cls}">Consigne maîtrisée : ${mastered} / ${total} (${pct} %) <span class="badge__celebrate" aria-hidden="true">🥳</span></span>`;
  }
  return `<span class="${cls}">Consigne maîtrisée : ${mastered} / ${total} (${pct} %)</span>`;
}

function carteBadgeHtml({ mastered, total, pct, complete, sessionLabel }) {
  if (sessionLabel) {
    const pctNote =
      pct != null ? ` · ${pct} % au chapitre` : "";
    return `<span class="badge badge--active">Session en cours : carte ${sessionLabel.current} / ${sessionLabel.total}${pctNote}</span>`;
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

/** Carte liste avec bandeau vert (modules / blocs pré-examen). */
function pretestModuleCardHtml({
  code,
  title,
  desc,
  badge,
  countLabel,
  dataAttr,
  dataValue,
}) {
  return `
    <button type="button" class="module-card" ${dataAttr}="${escapeHtml(dataValue)}">
      <div class="module-card__banner">
        <span class="module-card__name">${escapeHtml(title)}</span>
        <span class="module-card__ref">${escapeHtml(code)}</span>
      </div>
      <div class="module-card__body">
        ${desc ? `<p class="module-card__desc module-card__desc--muted">${desc}</p>` : ""}
        <div class="module-card__foot">
          ${badge}
          <span class="module-card__count">${countLabel}</span>
        </div>
      </div>
    </button>`;
}

function moduleCardCount(axisId, moduleId) {
  return getQuestionsForModule(axisId, moduleId).length;
}

/** Seuil au-delà duquel l'écran « taille de session » (25, 50…) est proposé. */
const PRETEST_SETUP_MIN_CARDS = 25;

/** Une seule carte ou bloc ≤ 25 cartes : session directe (pas d'écran quota). */
function openPretestModule(axisId, moduleId) {
  syncRouteGroupFromModule(axisId, moduleId);
  if (isClozePretestModule(axisId, moduleId)) {
    openClozePretest(axisId, moduleId);
    return;
  }
  const count = moduleCardCount(axisId, moduleId);
  if (count <= PRETEST_SETUP_MIN_CARDS) {
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

/** Écran quiz sans session en mémoire (ex. après bascule Consultation ↔ Examen). */
function reconcileExamScreenAfterSessionLost({ allowResume = false } = {}) {
  if (cardSession) return false;

  if (screen === "pretest-cloze") {
    if (allowResume && tryResumeClozeSession()) return true;
    screen =
      route.axisId && route.moduleId
        ? pretestBackAfterModule(route.axisId, route.moduleId)
        : route.axisId
          ? axisHasModuleGroups(route.axisId)
            ? "pretest-groups"
            : "pretest-modules"
          : "pretest-chapters";
    return false;
  }

  if (screen === "pretest-card") {
    screen =
      route.axisId && route.moduleId
        ? pretestBackAfterModule(route.axisId, route.moduleId)
        : "pretest-chapters";
    return false;
  }

  if (screen === "final-card" || screen === "final-results") {
    screen = "final-setup";
    return false;
  }

  return false;
}

function pretestBackLabel(screenName) {
  if (screenName === "pretest-groups") return "← Chapitres";
  if (screenName === "pretest-modules" && route.groupId) return "← Groupes";
  if (screenName === "pretest-modules") return "← Chapitres";
  return "← Retour";
}

function navigatePretestBack() {
  stashClozeProgressBeforeLeave();
  switch (screen) {
    case "pretest-modules":
      if (route.groupId) {
        screen = "pretest-groups";
        route.moduleId = null;
      } else {
        screen = "pretest-chapters";
        route = { axisId: null, groupId: null, moduleId: null };
      }
      break;
    case "pretest-groups":
      screen = "pretest-chapters";
      route = { axisId: null, groupId: null, moduleId: null };
      break;
    case "pretest-setup":
    case "pretest-cloze":
    case "pretest-card":
      if (route.groupId) {
        screen = "pretest-modules";
        route.moduleId = null;
      } else if (pretestModuleCount(route.axisId) > 1) {
        screen = "pretest-modules";
        route.moduleId = null;
      } else {
        screen = "pretest-chapters";
        route = { axisId: null, groupId: null, moduleId: null };
      }
      break;
    default:
      screen = "pretest-chapters";
      route = { axisId: null, groupId: null, moduleId: null };
  }
}

function pretestSessionCardLabel(session) {
  const total = session.queue?.length ?? session.targetCount ?? 0;
  const current = Math.min((session.index ?? 0) + 1, Math.max(1, total));
  return { current, total };
}

/** Sauvegarde la consigne en cours avant de quitter l’écran (navigation, onglet, rafraîchissement). */
function stashClozeProgressBeforeLeave() {
  if (cardSession?.mode !== "pretest-cloze") return;
  const { questionId, confirmedBlanks } = cardSession;
  if (confirmedBlanks?.size) {
    mergeClozeConfirmed(questionId, [...confirmedBlanks]);
    onClozeSessionComplete();
  }
  persistActiveClozeSession();
  cardSession = null;
}

function persistActiveClozeSession(overrides = {}) {
  const axisId = overrides.axisId ?? cardSession?.axisId;
  if (!axisId || !usesConsigneLabels(axisId)) return;

  if (overrides.pendingDailyExtra) {
    saveActiveClozeSession({ axisId, pendingDailyExtra: true });
    return;
  }

  if (cardSession?.mode === "pretest-cloze") {
    saveActiveClozeSession({
      axisId: cardSession.axisId,
      moduleId: cardSession.moduleId,
      questionId: cardSession.questionId,
      revealedBlanks: [...(cardSession.revealedBlanks ?? [])],
      confirmedBlanks: [...(cardSession.confirmedBlanks ?? [])],
      sessionBlankIds: [...(cardSession.sessionBlankIds ?? [])],
      pendingDailyExtra: false,
    });
    return;
  }

  if (hasUnfinishedClozeCycle(axisId)) {
    saveActiveClozeSession({
      axisId,
      pendingDailyExtra: Boolean(overrides.pendingDailyExtra),
    });
  } else {
    clearActiveClozeSession();
  }
}

function canResumeClozeSession() {
  const saved = getActiveClozeSession();
  if (!saved?.axisId || !usesConsigneLabels(saved.axisId)) return false;
  if (!isPretestChapterUnlocked(saved.axisId)) return false;
  if (saved.questionId) {
    return Boolean(getQuestionById(saved.questionId));
  }
  return saved.pendingDailyExtra || hasUnfinishedClozeCycle(saved.axisId);
}

function tryResumeClozeSession() {
  const saved = getActiveClozeSession();
  if (!saved?.axisId || !canResumeClozeSession()) {
    clearActiveClozeSession();
    return false;
  }

  activeAppSection = "exam";
  activeTab = "pretest";
  route = {
    axisId: saved.axisId,
    groupId: null,
    moduleId: saved.moduleId ?? null,
  };

  if (saved.pendingDailyExtra && shouldOfferClozeDailyExtra()) {
    showClozeDailyExtra = true;
    clozeDailyExtraContinue = () => continueClozeRevision(saved.axisId);
    render();
    return true;
  }

  if (saved.questionId && saved.moduleId) {
    const q = getQuestionById(saved.questionId);
    if (!q) {
      clearActiveClozeSession();
      return false;
    }
    const raw = q.answer ?? "";
    const { blankCount } = getClozeState(saved.questionId);
    const sessionBlankIds = new Set(
      saved.sessionBlankIds?.length
        ? saved.sessionBlankIds
        : getClozeSessionBlankIds(raw, blankCount, saved.questionId),
    );
    cardSession = {
      mode: "pretest-cloze",
      axisId: saved.axisId,
      moduleId: saved.moduleId,
      questionId: saved.questionId,
      revealedBlanks: new Set(saved.revealedBlanks ?? []),
      confirmedBlanks: new Set(saved.confirmedBlanks ?? []),
      sessionBlankIds,
    };
    screen = "pretest-cloze";
    render();
    return true;
  }

  const next = pickNextClozeModule(saved.axisId);
  if (next) {
    openClozePretest(next.axisId, next.moduleId);
    return true;
  }

  clearActiveClozeSession();
  return false;
}

function openClozePretest(axisId, moduleId, { scrollToTop = false } = {}) {
  if (!isPretestChapterUnlocked(axisId)) return;
  const questions = getQuestionsForModule(axisId, moduleId);
  const q = questions[0];
  if (!q) return;

  const start = () => {
    ensureSrsIntroduced(q.questionId);
    const raw = q.answer ?? "";
    const { blankCount } = getClozeState(q.questionId);
    const saved = getActiveClozeSession();
    const resumeSame =
      saved?.questionId === q.questionId &&
      saved?.moduleId === moduleId &&
      saved?.axisId === axisId;
    const sessionBlankIds = new Set(
      resumeSame && saved.sessionBlankIds?.length
        ? saved.sessionBlankIds
        : getClozeSessionBlankIds(raw, blankCount, q.questionId),
    );
    cardSession = {
      mode: "pretest-cloze",
      axisId,
      moduleId,
      questionId: q.questionId,
      revealedBlanks: new Set(
        resumeSame ? (saved.revealedBlanks ?? []) : [],
      ),
      confirmedBlanks: new Set(
        resumeSame ? (saved.confirmedBlanks ?? []) : [],
      ),
      sessionBlankIds,
    };
    activeAppSection = "exam";
    screen = "pretest-cloze";
    route = { axisId, groupId: null, moduleId };
    persistActiveClozeSession();
    render();
    if (scrollToTop) scrollMainToTop();
  };

  if (needsPretestPauseWarning()) {
    showPauseWarn = true;
    pauseWarnContinue = start;
    render();
    return;
  }
  start();
}

function continueClozeRevision(axisId) {
  const next = pickNextClozeModule(axisId);
  if (next) {
    openClozePretest(next.axisId, next.moduleId, { scrollToTop: true });
    return;
  }
  clearActiveClozeSession();
  const idle = getClozeIdleState(axisId);
  showClozeIdleWait = { ...idle, axisId };
  render();
}

function continueAfterClozePretest(axisId, wasNew) {
  const tryNext = () => continueClozeRevision(axisId);
  if (wasNew && shouldOfferClozeDailyExtra()) {
    showClozeDailyExtra = true;
    clozeDailyExtraContinue = tryNext;
    persistActiveClozeSession({ axisId, pendingDailyExtra: true });
    void writeProgressBackupFile();
    render();
    return;
  }
  if (needsPretestPauseWarning()) {
    showPauseWarn = true;
    pauseWarnContinue = tryNext;
    void writeProgressBackupFile();
    render();
    return;
  }
  tryNext();
  void writeProgressBackupFile();
}

function finishClozePretestAsMaster() {
  const { axisId, moduleId, questionId, confirmedBlanks, sessionBlankIds } =
    cardSession;
  const q = getQuestionById(questionId);
  const raw =
    q?.answer ??
    getModuleById(axisId, moduleId)?.questions?.find((item) => item.id === questionId)
      ?.answer ??
    "";
  const { segments } = buildClozeSegments(raw);
  const wasNew = (getSrsRow(questionId).clozeSeed ?? 0) === 0;
  const confirmedIds = [...(confirmedBlanks ?? [])];
  const sessionTotal = sessionBlankIds?.size ?? confirmedIds.length;

  recordClozeSessionResult(questionId, confirmedIds.length, sessionTotal);
  applyClozeMaster(questionId, segments.length, confirmedIds);
  if (wasNew) recordClozeDailyIntro();
  onClozeSessionComplete();
  recordPretestSessionResult(getPretestScopeKey(axisId, moduleId), 1, 1);
  cardSession = null;
  persistActiveClozeSession({ axisId });
  continueAfterClozePretest(axisId, wasNew);
}

function finishClozePretestAsReview() {
  const { axisId, moduleId, questionId, confirmedBlanks, sessionBlankIds } =
    cardSession;
  const wasNew = (getSrsRow(questionId).clozeSeed ?? 0) === 0;
  const confirmedIds = [...(confirmedBlanks ?? [])];
  const sessionTotal = sessionBlankIds?.size ?? Math.max(confirmedIds.length, 1);

  recordClozeSessionResult(questionId, confirmedIds.length, sessionTotal);
  if (confirmedIds.length) mergeClozeConfirmed(questionId, confirmedIds);
  const others = countClozeAlternatives(questionId, axisId);
  const defer = others > 0 ? Math.min(3, others) : 0;
  applyClozeReview(questionId, defer);
  onClozeSessionComplete();
  if (wasNew) recordClozeDailyIntro();
  recordPretestSessionResult(getPretestScopeKey(axisId, moduleId), 0, 1);
  cardSession = null;
  persistActiveClozeSession({ axisId });
  continueAfterClozePretest(axisId, wasNew);
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
    activeAppSection = "exam";
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
  if (screen === "pretest-cloze" && !cardSession) {
    if (reconcileExamScreenAfterSessionLost({ allowResume: true })) return "";
  }

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
      <p class="intro-note">Commencez par <strong>Acronymes</strong>, puis les chapitres consignes. L'examen final s'ouvre à <strong>${pre.thresholdPct} %</strong> de maîtrise sur chaque partie (cartes ou textes à trous).</p>
      <div class="modules">
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
                      pct: chPct,
                    })
                  : carteBadgeHtml({
                        mastered,
                        total,
                        pct: chPct,
                        complete: total > 0 && mastered >= total,
                      });
            }
            return pretestModuleCardHtml({
              code: axisChapterLabel(axis),
              title: axis.title,
              desc: axisCetMeta(axis),
              badge,
              countLabel,
              dataAttr: "data-pretest-axis",
              dataValue: axis.id,
            });
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
    const ch = getPretestUnlockProgress().chapters.find((c) => c.axisId === axisId);
    const chPct = ch?.masteryPct ?? Math.round(rate * 100);
    return carteBadgeHtml({
      sessionLabel: pretestSessionCardLabel(active),
      pct: chPct,
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
      <div class="modules">
        ${groups
          .map((group) => {
            const n = group.moduleIds.length;
            const modules = getModulesInGroup(route.axisId, group.id);
            const agg = getConsignesAggregate(route.axisId, modules);
            const badge = consigneBadgeHtml(agg);
            return pretestModuleCardHtml({
              code: group.code,
              title: group.title,
              desc: "",
              badge,
              countLabel: consigneCountLabel(n),
              dataAttr: "data-pretest-group",
              dataValue: group.id,
            });
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
      <div class="modules">
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
            return pretestModuleCardHtml({
              code: mod.code,
              title: mod.title,
              desc: group ? "" : moduleCetMeta(mod),
              badge,
              countLabel: moduleCardCountLabel(route.axisId, mod.id, n),
              dataAttr: "data-pretest-module",
              dataValue: mod.id,
            });
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
        ? `← ${axis.title}`
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
  activeAppSection = "exam";
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

function tryCompleteClozeSession() {
  if (cardSession?.mode !== "pretest-cloze") return;
  const { confirmedBlanks, sessionBlankIds } = cardSession;
  if (!isClozeSessionComplete(confirmedBlanks, sessionBlankIds)) return;
  finishClozePretestAsMaster();
}

function renderClozePretest() {
  if (!cardSession || cardSession.mode !== "pretest-cloze") {
    if (reconcileExamScreenAfterSessionLost({ allowResume: true })) return "";
    return renderPretest();
  }

  const { axisId, moduleId, questionId } = cardSession;
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
  const { blankCount } = getClozeState(questionId);
  const confirmedBlanks = cardSession.confirmedBlanks ?? new Set();
  const revealedBlanks = cardSession.revealedBlanks ?? new Set();
  const sessionBlankIds =
    cardSession.sessionBlankIds ??
    getClozeSessionBlankIds(raw, blankCount, questionId);
  cardSession.sessionBlankIds = sessionBlankIds;

  const { html, totalSegments, blankCount: shownBlanks } = renderClozeHtml(raw, {
    blankCount,
    questionId,
    revealedBlanks,
    confirmedBlanks,
  });

  const moduleRef = mod.cetPage
    ? `RCT p. ${mod.cetPage} — ${escapeHtml(mod.code)}`
    : escapeHtml(mod.code);

  const sessionDone = confirmedBlanks.size;
  const sessionTotal = sessionBlankIds.size;
  const consignePct = getClozeDisplayProgress(questionId, raw).pct;
  const sessionComplete = sessionDone >= sessionTotal;
  const reviewBtn = sessionComplete
    ? ""
    : `<div class="cloze-actions">
        <button type="button" class="btn btn--ghost" data-cloze-review>Revoir cette consigne plus tard</button>
      </div>`;

  return `
    <main class="main">
      <button type="button" class="link-back" data-cloze-abort>${escapeHtml(backLabel)}</button>
      <p class="quiz-meta">${sessionDone} / ${sessionTotal} trous validés · consigne ${consignePct} %</p>
      <article class="cloze-card">
        <div class="module-card__banner">
          <span class="module-card__name">${escapeHtml(mod.title)}</span>
          <span class="module-card__ref">${escapeHtml(mod.code)}</span>
        </div>
        <div class="cloze-card__inner">
        <h2 class="cloze-card__prompt">${escapeHtml(promptForCard(q))}</h2>
        <p class="cloze-card__ref">(${moduleRef})</p>
        <div class="cloze-card__body">${html}</div>
        </div>
      </article>
      ${reviewBtn}
    </main>`;
}

/* ─── Carte flashcard (pré-examen + final) ─── */

function renderFlashcard() {
  if (!cardSession) {
    if (screen.startsWith("final")) {
      screen = "final-setup";
      return renderFinal();
    }
    if (reconcileExamScreenAfterSessionLost({ allowResume: true })) return "";
    return renderPretest();
  }

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
  if (axisHasModuleGroups(axisId) && usesConsigneLabels(axisId)) {
    const saved = getActiveClozeSession();
    if (
      saved?.axisId === axisId &&
      saved.questionId &&
      canResumeClozeSession()
    ) {
      tryResumeClozeSession();
      return;
    }
    const next = pickNextClozeModule(axisId);
    if (next) {
      openPretestModule(next.axisId, next.moduleId);
      return;
    }
  }
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
      stashClozeProgressBeforeLeave();
      screen = "pretest-chapters";
      route = { axisId: null, groupId: null, moduleId: null };
      render();
    },
  );

  app.querySelector("[data-pretest-back]")?.addEventListener("click", () => {
    navigatePretestBack();
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
    stashClozeProgressBeforeLeave();
    screen = pretestBackAfterModule(axisId, moduleId);
    if (screen === "pretest-chapters") {
      route = { axisId: null, groupId: null, moduleId: null };
    }
    render();
  });

  app.querySelector(".cloze-card__body")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cloze-blank]");
    if (!btn || cardSession?.mode !== "pretest-cloze") return;
    const id = btn.dataset.clozeBlank;
    if (!id) return;
    if (!cardSession.revealedBlanks) cardSession.revealedBlanks = new Set();
    if (!cardSession.confirmedBlanks) cardSession.confirmedBlanks = new Set();
    if (cardSession.confirmedBlanks.has(id)) {
      cardSession.confirmedBlanks.delete(id);
      persistActiveClozeSession();
      render();
      return;
    }
    if (!cardSession.revealedBlanks.has(id)) {
      cardSession.revealedBlanks.add(id);
      persistActiveClozeSession();
      render();
      return;
    }
    cardSession.confirmedBlanks.add(id);
    persistActiveClozeSession();
    render();
    tryCompleteClozeSession();
  });

  app.querySelector("[data-cloze-review]")?.addEventListener("click", () => {
    if (cardSession?.mode === "pretest-cloze") finishClozePretestAsReview();
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

  if (showClozeIdleWait) {
    renderClozeIdleModal(showClozeIdleWait);
    return;
  }

  if (showClozeDailyExtra) {
    renderClozeDailyExtraModal();
    return;
  }

  if (showPauseWarn) {
    renderPauseWarnModal();
    return;
  }

  if (pendingHelp) {
    renderHelpModal(pendingHelp);
    return;
  }

  if (activeAppSection === "reader") {
    renderReaderSection();
    return;
  }

  const mainHtml = activeTab === "pretest" ? renderPretest() : renderFinal();
  renderExamSection(mainHtml);
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
  if (!title || activeAppSection !== "exam") return;
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

/** Au chargement : nettoie les sessions examen invalides sans ouvrir l’onglet Examen. */
function tryRestoreOnLoad() {
  const savedFinal = getActiveFinalSession();
  if (!savedFinal?.queue?.length) return false;

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
    tryRestoreOnLoad();
    pendingBackupRestore = shouldOfferBackupRestore();
    if (!isHelpDismissed("welcome")) {
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
  if (cardSession?.mode === "pretest-cloze") stashClozeProgressBeforeLeave();
  else if (showClozeDailyExtra && route.axisId) {
    persistActiveClozeSession({ axisId: route.axisId, pendingDailyExtra: true });
  }
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
