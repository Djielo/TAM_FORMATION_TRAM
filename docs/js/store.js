/**
 * Persistance locale : maîtrise QCM, SRS pré-examen, sessions, préférences.
 */
import {
  getQuestionPool,
  getQuestionsForAxis,
  getTotalQuestionCount,
} from "./pool.js";

function rctData() {
  return globalThis.__RCT_DATA__;
}

/** Filtre le pool — défini ici pour ne pas dépendre d'un export optionnel de pool.js. */
export function getQuestionsForModule(axisId, moduleId) {
  return getQuestionPool().filter(
    (q) => q.axisId === axisId && q.moduleId === moduleId,
  );
}

/** Incrémenter si la structure localStorage ou les règles de comptage changent. */
export const STORAGE_SCHEMA_VERSION = 8;

/** Part des questions du chapitre maîtrisées en pré-examen pour débloquer l'examen final. */
export const PRETEST_FINAL_UNLOCK_RATE = 0.9;

/** Nombre de questions par session d'examen final. */
export const FINAL_EXAM_QUESTION_COUNT = 50;

/** Seuil de réussite examen final (proportion de réponses « Correct »). */
export const FINAL_EXAM_PASS_RATE = 0.9;

export const KEYS = {
  revision: "tam-rct-revision-v1",
  revisionLegacy: "tam-bible-revision-v1",
  mastery: "tam-rct-question-mastery-v1",
  srs: "tam-rct-srs-v1",
  pretestPrefs: "tam-rct-pretest-prefs-v1",
  pretestActive: "tam-rct-pretest-active-v1",
  pretestLastEnd: "tam-rct-pretest-last-end-v1",
  clozeDailyIntro: "tam-rct-cloze-daily-intro-v1",
  clozeActive: "tam-rct-cloze-active-v1",
  finalPrefs: "tam-rct-final-exam-prefs-v1",
  helpDismissed: "tam-rct-help-dismissed-v2",
  helpDismissedLegacy: "tam-rct-help-dismissed-v1",
  pretestStats: "tam-rct-pretest-stats-v1",
  devUnlock: "tam-rct-dev-unlock-v1",
  quizActive: "tam-rct-quiz-active-v1",
  finalActive: "tam-rct-final-exam-active-v1",
  finalHistory: "tam-rct-final-exam-history-v1",
  schema: "tam-rct-storage-schema-v2",
  /** Conservé après reset volontaire (5 × RCT) pour ne pas proposer une reprise. */
  voluntaryReset: "tam-rct-voluntary-reset-v1",
  /** Surlignages manuel RCT — hors reset formation ; fichier tam-rct-manuel.json */
  lectureMarks: "tam-rct-lecture-marks-v1",
};

/** Anciennes clés localStorage (renommage CET → RCT, v2025). */
const LEGACY_CET_KEYS = {
  revision: "tam-cet-revision-v1",
  mastery: "tam-cet-question-mastery-v1",
  srs: "tam-cet-srs-v1",
  pretestPrefs: "tam-cet-pretest-prefs-v1",
  pretestActive: "tam-cet-pretest-active-v1",
  pretestLastEnd: "tam-cet-pretest-last-end-v1",
  finalPrefs: "tam-cet-final-exam-prefs-v1",
  helpDismissed: "tam-cet-help-dismissed-v1",
  pretestStats: "tam-cet-pretest-stats-v1",
  devUnlock: "tam-cet-dev-unlock-v1",
  quizActive: "tam-cet-quiz-active-v1",
  finalActive: "tam-cet-final-exam-active-v1",
  finalHistory: "tam-cet-final-exam-history-v1",
  schema: "tam-cet-storage-schema-v2",
};

const ALL_STORAGE_KEYS = Object.values(KEYS);

/**
 * Paliers SRS (ms) — délais absolus depuis la première apparition de la consigne.
 * Court terme serré, puis 1 → 21 j pour couvrir ~3 semaines d’apprentissage.
 */
export const SRS_INTERVALS_MS = [
  300_000, /* 5 min */
  600_000, /* 10 min */
  1_200_000, /* 20 min */
  2_700_000, /* 45 min */
  5_400_000, /* 1 h 30 */
  10_800_000, /* 3 h */
  21_600_000, /* 6 h */
  43_200_000, /* 12 h */
  86_400_000, /* 1 j */
  172_800_000, /* 2 j */
  259_200_000, /* 3 j */
  432_000_000, /* 5 j */
  604_800_000, /* 7 j */
  864_000_000, /* 10 j */
  1_209_600_000, /* 14 j */
  1_814_400_000, /* 21 j */
];

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn("Écriture localStorage impossible :", key, err);
  }
}

/* ─── Révision (modules) ─── */

export function loadRevisionProgress() {
  try {
    const raw =
      localStorage.getItem(KEYS.revision) ||
      localStorage.getItem(KEYS.revisionLegacy) ||
      "{}";
    const data = JSON.parse(raw);
    if (
      Object.keys(data).length &&
      !localStorage.getItem(KEYS.revision) &&
      localStorage.getItem(KEYS.revisionLegacy)
    ) {
      localStorage.setItem(KEYS.revision, JSON.stringify(data));
    }
    return data;
  } catch {
    return {};
  }
}

export function saveModuleScore(axisId, moduleId, score, totalFromQuiz) {
  const mod = rctData().MODULES[axisId]?.find((m) => m.id === moduleId);
  const total = mod?.questions.length ?? totalFromQuiz;
  const all = loadRevisionProgress();
  const key = `${axisId}/${moduleId}`;
  const prev = all[key];
  if (!prev || score > prev.score) {
    all[key] = { score, total, at: Date.now() };
    writeJson(KEYS.revision, all);
  }
}

export function getModuleProgress(axisId, moduleId) {
  return loadRevisionProgress()[`${axisId}/${moduleId}`] || null;
}

/** Comptage aligné sur le pool actuel (source de vérité pour 🥳 et 404/404). */
export function getModuleQuestionStats(axisId, moduleId) {
  const mod = rctData().MODULES[axisId]?.find((m) => m.id === moduleId);
  if (!mod) return { total: 0, validated: 0, bestRun: null, perfect: false };
  const mastery = loadMastery();
  const total = mod.questions.length;
  let validated = 0;
  for (const q of mod.questions) {
    if (mastery[q.id]?.everCorrect) validated++;
  }
  const prog = getModuleProgress(axisId, moduleId);
  const bestRun = prog
    ? {
        score: prog.score,
        storedTotal: prog.total,
        stale: prog.total !== total,
      }
    : null;
  return {
    total,
    validated,
    bestRun,
    perfect: total > 0 && validated === total,
  };
}

export function isModulePerfect(axisId, moduleId) {
  return getModuleQuestionStats(axisId, moduleId).perfect;
}

function isEmptyStoredJson(raw) {
  if (!raw) return true;
  const t = raw.trim();
  if (t === "{}" || t === "[]" || t === "null") return true;
  try {
    const parsed = JSON.parse(t);
    return (
      parsed !== null &&
      typeof parsed === "object" &&
      !Array.isArray(parsed) &&
      Object.keys(parsed).length === 0
    );
  } catch {
    return false;
  }
}

/** Reprend la progression encore stockée sous les clés tam-cet-* (même origine navigateur). */
function migrateCetStorageToRct() {
  let copied = 0;
  for (const id of Object.keys(LEGACY_CET_KEYS)) {
    if (id === "schema") continue;
    const oldKey = LEGACY_CET_KEYS[id];
    const newKey = KEYS[id];
    const oldVal = localStorage.getItem(oldKey);
    if (!oldVal) continue;
    const newVal = localStorage.getItem(newKey);
    if (!newVal || isEmptyStoredJson(newVal)) {
      localStorage.setItem(newKey, oldVal);
      copied++;
    }
  }
  const oldSchema = localStorage.getItem(LEGACY_CET_KEYS.schema);
  const newSchema = localStorage.getItem(KEYS.schema);
  if (oldSchema && (!newSchema || newSchema === "0")) {
    localStorage.setItem(KEYS.schema, oldSchema);
    copied++;
  }
  return copied;
}

function hasLegacyStorage() {
  return !!(
    localStorage.getItem(KEYS.revision) ||
    localStorage.getItem(KEYS.revisionLegacy) ||
    localStorage.getItem(KEYS.mastery) ||
    localStorage.getItem(KEYS.srs) ||
    Object.values(LEGACY_CET_KEYS).some((k) => localStorage.getItem(k))
  );
}

/** Pop-up d'accueil : v2 utilise « welcome » (plus « revision » dans v1). */
function migrateHelpDismissed() {
  const legacyRaw = localStorage.getItem(KEYS.helpDismissedLegacy);
  if (!legacyRaw) return false;

  const v1 = readJson(KEYS.helpDismissedLegacy, {});
  const v2 = readJson(KEYS.helpDismissed, {});
  const merged = { ...v2 };
  if (v1.pretest) merged.pretest = true;
  if (v1.final) merged.final = true;
  writeJson(KEYS.helpDismissed, merged);
  localStorage.removeItem(KEYS.helpDismissedLegacy);
  return true;
}

/**
 * Montée de version : conserve les scores modules (le 🥳 disparaît si des questions
 * sont ajoutées au RCT) ; retire seulement les questions supprimées du pool.
 */
export function migrateStorage() {
  try {
    return migrateStorageInner();
  } catch (err) {
    console.warn("Migration localStorage échouée, réinitialisation douce :", err);
    for (const key of ALL_STORAGE_KEYS) {
      try {
        localStorage.removeItem(key);
      } catch {
        /* ignore */
      }
    }
    try {
      localStorage.setItem(KEYS.schema, String(STORAGE_SCHEMA_VERSION));
    } catch {
      /* ignore */
    }
    return { action: "reset-after-error", orphanQuestionsRemoved: 0, cetKeysCopied: 0 };
  }
}

/** Réaffiche l’aide présentation / pré-examen après une mise à jour des consignes SRS. */
function migrateHelpContentRefresh() {
  const flag = "tam-rct-help-content-srs-v5";
  if (localStorage.getItem(flag)) return false;
  const h = readJson(KEYS.helpDismissed, {});
  delete h.welcome;
  delete h.pretest;
  writeJson(KEYS.helpDismissed, h);
  try {
    localStorage.setItem(flag, "1");
  } catch {
    /* ignore */
  }
  return true;
}

function migrateStorageInner() {
  const cetCopied = migrateCetStorageToRct();
  migrateHelpDismissed();
  migrateHelpContentRefresh();

  const stored = parseInt(localStorage.getItem(KEYS.schema) || "0", 10);
  if (stored >= STORAGE_SCHEMA_VERSION) {
    if (cetCopied > 0) {
      backfillSrsEverMastered();
    }
    return {
      action: cetCopied > 0 ? "cet-to-rct" : "none",
      orphanQuestionsRemoved: 0,
      cetKeysCopied: cetCopied,
    };
  }

  if (!hasLegacyStorage()) {
    localStorage.setItem(KEYS.schema, String(STORAGE_SCHEMA_VERSION));
    return { action: "init", orphanQuestionsRemoved: 0, cetKeysCopied: cetCopied };
  }

  const poolIds = new Set(getQuestionPool().map((q) => q.questionId));
  const m = loadMastery();
  let orphanQuestionsRemoved = 0;
  for (const id of Object.keys(m)) {
    if (!poolIds.has(id)) {
      delete m[id];
      orphanQuestionsRemoved++;
    }
  }
  if (orphanQuestionsRemoved) saveMastery(m);

  if (stored < 4) {
    backfillSrsEverMastered();
  }

  localStorage.setItem(KEYS.schema, String(STORAGE_SCHEMA_VERSION));
  return { action: "migrated", orphanQuestionsRemoved, cetKeysCopied: cetCopied };
}

/** Sessions pré-examen obsolètes (anciennes clés chapitre ou IDs de cartes supprimées). */
export function sanitizePretestActiveSessions() {
  const all = loadPretestActive();
  const poolIds = new Set(getQuestionPool().map((q) => q.questionId));
  let changed = false;

  for (const [scopeKey, session] of Object.entries(all)) {
    if (!session?.queue?.length) {
      delete all[scopeKey];
      changed = true;
      continue;
    }
    const queue = session.queue.filter((id) => poolIds.has(id));
    if (
      !queue.length ||
      (session.index ?? 0) >= queue.length ||
      !session.moduleId
    ) {
      delete all[scopeKey];
      changed = true;
      continue;
    }
    if (queue.length !== session.queue.length) {
      session.queue = queue;
      session.targetCount = queue.length;
      session.index = Math.min(session.index ?? 0, queue.length - 1);
      all[scopeKey] = session;
      changed = true;
    }
  }

  if (changed) writeJson(KEYS.pretestActive, all);
}

function backfillSrsEverMastered() {
  const srs = loadSrs();
  let srsUpdated = false;
  for (const row of Object.values(srs)) {
    if ((row.intervalIndex ?? 0) >= 1 && !row.everMastered) {
      row.everMastered = true;
      srsUpdated = true;
    }
  }
  if (srsUpdated) saveSrs(srs);
}

/** Efface toute la progression RCT dans le navigateur (pas le flag voluntaryReset). */
export function resetAllUserProgress() {
  for (const key of ALL_STORAGE_KEYS) {
    localStorage.removeItem(key);
  }
  localStorage.setItem(KEYS.schema, String(STORAGE_SCHEMA_VERSION));
}

/* ─── Maîtrise par question (déverrouillage) ─── */

export function loadMastery() {
  return readJson(KEYS.mastery, {});
}

function saveMastery(data) {
  writeJson(KEYS.mastery, data);
}

/** Chaque réponse QCM (bonne ou mauvaise) — écriture immédiate dans localStorage. */
export function recordQuestionAttempt(questionId, correct) {
  const m = loadMastery();
  const row = m[questionId] || {};
  row.seen = true;
  row.lastSeenAt = Date.now();
  row.lastAttemptCorrect = correct;
  row.attempts = (row.attempts || 0) + 1;
  if (correct) {
    row.everCorrect = true;
    row.lastCorrectAt = Date.now();
  }
  m[questionId] = row;
  saveMastery(m);
}

export function recordQuestionSeen(questionId) {
  recordQuestionAttempt(questionId, false);
}

export function recordQuestionCorrect(questionId) {
  recordQuestionAttempt(questionId, true);
}

export function getMasteryStats() {
  const total = getTotalQuestionCount();
  const m = loadMastery();
  let validated = 0;
  for (const q of getQuestionPool()) {
    if (m[q.questionId]?.everCorrect) validated++;
  }
  return { total, validated, complete: validated >= total };
}

export function isUnlockComplete() {
  return getMasteryStats().complete;
}

/** Révision QCM : questions du chapitre ayant été répondues correctement au moins une fois. */
export function getAxisRevisionMastery(axisId) {
  const questions = getQuestionsForAxis(axisId);
  const m = loadMastery();
  let validated = 0;
  for (const q of questions) {
    if (m[q.questionId]?.everCorrect) validated++;
  }
  const total = questions.length;
  return {
    validated,
    total,
    rate: total > 0 ? validated / total : 0,
    complete: total > 0 && validated === total,
  };
}

export function isPretestChapterUnlocked(axisId) {
  if (isDevBypassUnlock()) return true;
  const axis = rctData().AXES.find((a) => a.id === axisId);
  return !!axis?.available;
}

/** Contournement formateur / test local (?dev=1 sur localhost ou clé localStorage). */
export function isDevBypassUnlock() {
  try {
    if (localStorage.getItem(KEYS.devUnlock) === "1") return true;
    const host = location.hostname;
    if (
      (host === "localhost" || host === "127.0.0.1") &&
      new URLSearchParams(location.search).get("dev") === "1"
    ) {
      return true;
    }
  } catch {
    /* hors navigateur */
  }
  return false;
}

export function isPretestTabUnlocked() {
  return rctData().AXES.some((a) => a.available);
}

export function loadPretestStats() {
  return readJson(KEYS.pretestStats, {});
}

/** Enregistre le résultat d'une session pré-examen terminée (auto-évaluation). */
export function recordPretestSessionResult(axisId, mastered, total) {
  if (total <= 0) return;
  const rate = mastered / total;
  const all = loadPretestStats();
  const prev = all[axisId] || { bestRate: 0, sessions: 0 };
  all[axisId] = {
    bestRate: Math.max(prev.bestRate ?? 0, rate),
    lastRate: rate,
    lastAt: Date.now(),
    sessions: (prev.sessions || 0) + 1,
    lastMastered: mastered,
    lastTotal: total,
  };
  writeJson(KEYS.pretestStats, all);
}

/** Carte pré-examen déjà validée au moins une fois (« Je maîtrise »). */
export function isPretestCardEverMastered(questionId) {
  return !!getSrsRow(questionId).everMastered;
}

/** Maîtrise d'un chapitre (cartes ou consignes selon le type). */
export function getPretestChapterMastery(axisId) {
  const consigneFn = globalThis.__RCT_CONSIGNE_CHAPTER_MASTERY__;
  if (
    (axisId === "circulation" || axisId === "urgence") &&
    typeof consigneFn === "function"
  ) {
    return consigneFn(axisId);
  }
  const questions = getQuestionsForAxis(axisId);
  let mastered = 0;
  for (const q of questions) {
    if (isPretestCardEverMastered(q.questionId)) mastered++;
  }
  const total = questions.length;
  const rate = total > 0 ? mastered / total : 0;
  return { mastered, total, rate };
}

/** Maîtrise d'une consigne (module) au sein d'un chapitre. */
export function getPretestModuleMastery(axisId, moduleId) {
  const questions = getQuestionsForModule(axisId, moduleId);
  let mastered = 0;
  for (const q of questions) {
    if (isPretestCardEverMastered(q.questionId)) mastered++;
  }
  const total = questions.length;
  const rate = total > 0 ? mastered / total : 0;
  return { mastered, total, rate };
}

/** Clé de session / préférences pré-examen (une consigne = un bloc d'apprentissage). */
export function getPretestScopeKey(axisId, moduleId) {
  return `${axisId}/${moduleId}`;
}

export function getPretestUnlockProgress() {
  const chapters = rctData().AXES.filter((a) => a.available);
  const items = chapters.map((a) => {
    const { mastered, total, rate } = getPretestChapterMastery(a.id);
    return {
      axisId: a.id,
      num: a.num,
      title: a.title,
      mastered,
      total,
      masteryRate: rate,
      masteryPct: Math.round(rate * 100),
      ok: total > 0 && rate >= PRETEST_FINAL_UNLOCK_RATE,
    };
  });
  return {
    threshold: PRETEST_FINAL_UNLOCK_RATE,
    thresholdPct: Math.round(PRETEST_FINAL_UNLOCK_RATE * 100),
    chapters: items,
    complete: items.length > 0 && items.every((i) => i.ok),
  };
}

export function isFinalExamUnlocked() {
  if (isDevBypassUnlock()) return true;
  return getPretestUnlockProgress().complete;
}

/* ─── SRS ─── */

export function loadSrs() {
  return readJson(KEYS.srs, {});
}

function saveSrs(data) {
  writeJson(KEYS.srs, data);
}

function defaultSrsRow() {
  return {
    /** Instant où la consigne a été présentée pour la première fois (ancrage SRS). */
    firstSeenAt: 0,
    intervalIndex: 0,
    nextReviewAt: 0,
    sessionsUntilEligible: 0,
    pendingReview: false,
    everMastered: false,
    /** Nombre de trous actifs (texte à trous). */
    clozeBlanks: 5,
    /** Passages enregistrés — ne change pas les positions de trous. */
    clozeSeed: 0,
    /** Ids des mots validés (2e toucher) — cumul entre sessions. */
    clozeConfirmedIds: [],
    /** Dernière session : trous validés / trous proposés (priorité révisions). */
    clozeLastSessionHits: 0,
    clozeLastSessionTotal: 0,
    lastClozeAt: 0,
  };
}

/** État texte à trous pour une carte. */
export function getClozeState(questionId) {
  const row = getSrsRow(questionId);
  return {
    blankCount: row.clozeBlanks ?? 5,
    clozeSeed: row.clozeSeed ?? 0,
  };
}

/** Enregistre les mots validés sans avancer le SRS (session interrompue). */
export function mergeClozeConfirmed(questionId, confirmedIds = []) {
  if (!confirmedIds.length) return;
  const all = loadSrs();
  const row = { ...defaultSrsRow(), ...all[questionId] };
  const set = new Set(row.clozeConfirmedIds ?? []);
  for (const id of confirmedIds) set.add(id);
  row.clozeConfirmedIds = [...set];
  if (set.size > 0) row.clozeSeed = Math.max(row.clozeSeed ?? 0, 1);
  all[questionId] = row;
  saveSrs(all);
}

/** Tous les trous de la session validés — SRS + 2 trous + mots confirmés. */
export function applyClozeMaster(questionId, maxSegments, confirmedIds = []) {
  applySrsMaster(questionId);
  const all = loadSrs();
  const row = all[questionId];
  if (!row) return;
  const set = new Set(row.clozeConfirmedIds ?? []);
  for (const id of confirmedIds) set.add(id);
  row.clozeConfirmedIds = [...set];
  const current = row.clozeBlanks ?? 5;
  row.clozeBlanks = Math.min(current + 2, Math.max(1, maxSegments));
  row.clozeSeed = (row.clozeSeed ?? 0) + 1;
  saveSrs(all);
}

/** « À revoir » — SRS − 1 trou (minimum 5), mêmes mots conservés. */
export function applyClozeReview(questionId, deferSessions = 2) {
  applySrsReview(questionId, deferSessions);
  const all = loadSrs();
  const row = all[questionId];
  if (!row) return;
  const current = row.clozeBlanks ?? 5;
  row.clozeBlanks = Math.max(5, current - 1);
  row.clozeSeed = (row.clozeSeed ?? 0) + 1;
  saveSrs(all);
}

export function getSrsRow(questionId) {
  return loadSrs()[questionId] || defaultSrsRow();
}

/** Enregistre la première apparition (horodatage fixe pour tout le parcours SRS). */
export function ensureSrsIntroduced(questionId, seenAt = Date.now()) {
  const all = loadSrs();
  const row = { ...defaultSrsRow(), ...all[questionId] };
  if (row.firstSeenAt) return row.firstSeenAt;
  if (row.intervalIndex > 0) {
    const offset =
      SRS_INTERVALS_MS[row.intervalIndex - 1] ?? SRS_INTERVALS_MS[0];
    row.firstSeenAt = seenAt - offset;
  } else {
    row.firstSeenAt = seenAt;
  }
  all[questionId] = row;
  saveSrs(all);
  return row.firstSeenAt;
}

function sessionsSkipAfterMaster(intervalIndex) {
  if (intervalIndex <= 2) return 1;
  if (intervalIndex <= 7) return 2;
  return 3;
}

export function applySrsMaster(questionId) {
  const all = loadSrs();
  const row = { ...defaultSrsRow(), ...all[questionId] };
  const firstSeen = row.firstSeenAt || Date.now();
  if (!row.firstSeenAt) row.firstSeenAt = firstSeen;
  const nextIndex = Math.min(row.intervalIndex + 1, SRS_INTERVALS_MS.length);
  const offset = SRS_INTERVALS_MS[nextIndex - 1] ?? SRS_INTERVALS_MS[0];
  row.intervalIndex = nextIndex;
  /** Échéance absolue depuis la première apparition, pas depuis ce « Je maîtrise ». */
  row.nextReviewAt = firstSeen + offset;
  row.sessionsUntilEligible = sessionsSkipAfterMaster(nextIndex);
  row.pendingReview = false;
  row.everMastered = true;
  all[questionId] = row;
  saveSrs(all);
}

export function applySrsReview(questionId, deferSessions = 2) {
  const all = loadSrs();
  const row = { ...defaultSrsRow(), ...all[questionId] };
  row.intervalIndex = 0;
  row.sessionsUntilEligible = Math.max(0, deferSessions);
  row.pendingReview = true;
  all[questionId] = row;
  saveSrs(all);
}

export function isSrsEligible(questionId, now = Date.now()) {
  const row = getSrsRow(questionId);
  if (row.sessionsUntilEligible > 0) return false;
  if (row.pendingReview) return true;
  if ((row.intervalIndex ?? 0) === 0 && !row.everMastered) return true;
  return row.nextReviewAt <= now;
}

/** Après une consigne texte à trous — décompte le délai « à revoir » sur toutes les cartes. */
export function onClozeSessionComplete() {
  const all = loadSrs();
  let changed = false;
  for (const row of Object.values(all)) {
    if (row.sessionsUntilEligible > 0) {
      row.sessionsUntilEligible -= 1;
      changed = true;
    }
  }
  if (changed) saveSrs(all);
  writeJson(KEYS.pretestLastEnd, Date.now());
}

/** Après une session pré-examen terminée pour une consigne. */
export function onPretestSessionComplete(axisId, moduleId) {
  const all = loadSrs();
  const ids = new Set(
    getQuestionsForModule(axisId, moduleId).map((q) => q.questionId),
  );
  let changed = false;
  for (const [qid, row] of Object.entries(all)) {
    if (!ids.has(qid)) continue;
    if (row.sessionsUntilEligible > 0) {
      row.sessionsUntilEligible -= 1;
      changed = true;
    }
  }
  if (changed) saveSrs(all);
  writeJson(KEYS.pretestLastEnd, Date.now());
}

export function getPretestLastEndAt() {
  return readJson(KEYS.pretestLastEnd, 0) || 0;
}

/** Pause 5 min désactivée — les intervalles SRS et le sommeil couvrent l’espacement. */
export function needsPretestPauseWarning() {
  return false;
}

/** Nouvelles consignes texte à trous — quota journalier (base + bonus opt-in). */
const CLOZE_DAILY_NEW_BASE = 10;
/** Plafond absolu de nouvelles consignes par jour. */
export const CLOZE_DAILY_MAX = 20;

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function loadClozeDailyRow() {
  const today = todayIso();
  const raw = readJson(KEYS.clozeDailyIntro, null);
  const defaults = {
    date: today,
    count: 0,
    target: CLOZE_DAILY_NEW_BASE,
    noMoreNewToday: false,
    extensionOffered: false,
  };
  if (!raw || typeof raw !== "object") return defaults;
  if (raw.date !== today) return defaults;
  return {
    ...defaults,
    count: raw.count ?? 0,
    target: Math.min(CLOZE_DAILY_MAX, raw.target ?? CLOZE_DAILY_NEW_BASE),
    noMoreNewToday: Boolean(raw.noMoreNewToday),
    extensionOffered: Boolean(raw.extensionOffered),
  };
}

function saveClozeDailyRow(row) {
  writeJson(KEYS.clozeDailyIntro, row);
}

/** Nouvelles consignes mises en route aujourd’hui. */
export function getClozeDailyIntroCount() {
  return loadClozeDailyRow().count;
}

/** Plafond du jour (10 par défaut, jusqu’à 20 si prolongation acceptée). */
export function getClozeDailyNewTarget() {
  return loadClozeDailyRow().target;
}

/** Nombre max encore ajoutable aujourd’hui (1 à 10). */
export function getClozeDailyMaxExtra() {
  const row = loadClozeDailyRow();
  return Math.max(0, Math.min(10, CLOZE_DAILY_MAX - row.target));
}

export function recordClozeDailyIntro() {
  const row = loadClozeDailyRow();
  row.count += 1;
  saveClozeDailyRow(row);
}

/** Score de la dernière session (trous validés sur trous proposés). */
export function recordClozeSessionResult(questionId, hits, total) {
  const all = loadSrs();
  const row = { ...defaultSrsRow(), ...all[questionId] };
  row.clozeLastSessionHits = Math.max(0, Math.min(hits, total));
  row.clozeLastSessionTotal = Math.max(1, total);
  row.lastClozeAt = Date.now();
  all[questionId] = row;
  saveSrs(all);
}

/** Objectif du jour atteint : unique proposition de prolongation. */
export function shouldOfferClozeDailyExtra() {
  const row = loadClozeDailyRow();
  return (
    row.count >= row.target &&
    !row.extensionOffered &&
    row.target < CLOZE_DAILY_MAX
  );
}

/** Marque la proposition de prolongation comme affichée (une fois par jour). */
export function markClozeExtensionOffered() {
  const row = loadClozeDailyRow();
  row.extensionOffered = true;
  saveClozeDailyRow(row);
}

/** L’utilisateur accepte d’introduire encore N consignes aujourd’hui (1–10). */
export function addClozeDailyExtra(extraCount) {
  const row = loadClozeDailyRow();
  const n = Math.max(1, Math.min(10, Math.floor(extraCount)));
  row.target = Math.min(CLOZE_DAILY_MAX, row.target + n);
  row.noMoreNewToday = false;
  row.extensionOffered = true;
  saveClozeDailyRow(row);
}

/** Pas de nouvelles consignes pour le reste de la journée (révisions seulement). */
export function declineClozeDailyExtra() {
  const row = loadClozeDailyRow();
  row.noMoreNewToday = true;
  row.extensionOffered = true;
  saveClozeDailyRow(row);
}

export function hasClozeDeclinedNewToday() {
  return loadClozeDailyRow().noMoreNewToday;
}

/** Session consignes en cours (texte à trous) ou reprise du lot du jour. */
export function getActiveClozeSession() {
  return readJson(KEYS.clozeActive, null);
}

export function saveActiveClozeSession(payload) {
  if (!payload) {
    localStorage.removeItem(KEYS.clozeActive);
    return;
  }
  writeJson(KEYS.clozeActive, { ...payload, savedAt: Date.now() });
}

export function clearActiveClozeSession() {
  localStorage.removeItem(KEYS.clozeActive);
}

/* ─── Pré-examen prefs / session active ─── */

export function loadPretestPrefs() {
  return readJson(KEYS.pretestPrefs, {});
}

export function savePretestPref(scopeKey, count) {
  const p = loadPretestPrefs();
  p[scopeKey] = count;
  writeJson(KEYS.pretestPrefs, p);
}

export function getPretestPref(scopeKey) {
  return loadPretestPrefs()[scopeKey] ?? 25;
}

export function loadPretestActive() {
  return readJson(KEYS.pretestActive, {});
}

export function getActivePretestSession(scopeKey) {
  return loadPretestActive()[scopeKey] || null;
}

export function saveActivePretestSession(scopeKey, session) {
  const all = loadPretestActive();
  if (session) all[scopeKey] = session;
  else delete all[scopeKey];
  writeJson(KEYS.pretestActive, all);
}

/* ─── Examen final prefs ─── */

export function loadFinalPrefs() {
  return readJson(KEYS.finalPrefs, { count: FINAL_EXAM_QUESTION_COUNT });
}

export function saveFinalPref(count) {
  writeJson(KEYS.finalPrefs, { count });
}

export function getFinalPref() {
  return loadFinalPrefs().count ?? 50;
}

/* ─── Révision : QCM en cours ─── */

export function saveActiveQuizSession(payload) {
  if (!payload) {
    localStorage.removeItem(KEYS.quizActive);
    return;
  }
  writeJson(KEYS.quizActive, { ...payload, savedAt: Date.now() });
}

export function getActiveQuizSession() {
  return readJson(KEYS.quizActive, null);
}

/* ─── Examen final : session en cours + historique ─── */

export function saveActiveFinalSession(payload) {
  if (!payload) {
    localStorage.removeItem(KEYS.finalActive);
    return;
  }
  writeJson(KEYS.finalActive, { ...payload, savedAt: Date.now() });
}

export function getActiveFinalSession() {
  return readJson(KEYS.finalActive, null);
}

export function appendFinalExamResult(result) {
  const list = readJson(KEYS.finalHistory, []);
  list.unshift({ ...result, at: Date.now() });
  writeJson(KEYS.finalHistory, list.slice(0, 30));
}

export function loadFinalExamHistory() {
  return readJson(KEYS.finalHistory, []);
}

/* ─── Aide (pop-ups) ─── */

export function loadHelpDismissed() {
  return readJson(KEYS.helpDismissed, {});
}

export function dismissHelp(mode) {
  const h = loadHelpDismissed();
  h[mode] = true;
  writeJson(KEYS.helpDismissed, h);
}

export function isHelpDismissed(mode) {
  return !!loadHelpDismissed()[mode];
}
