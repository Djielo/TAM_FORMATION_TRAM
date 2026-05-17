/**
 * Persistance locale : maîtrise QCM, SRS pré-examen, sessions, préférences.
 */
import { AXES, MODULES } from "./data.js";
import {
  getQuestionPool,
  getQuestionsForAxis,
  getTotalQuestionCount,
} from "./pool.js";

/** Incrémenter si la structure localStorage ou les règles de comptage changent. */
export const STORAGE_SCHEMA_VERSION = 3;

/** Part minimale des questions du chapitre marquées « Je maîtrise » en pré-examen (examen final). */
export const PRETEST_FINAL_UNLOCK_RATE = 0.8;

export const KEYS = {
  revision: "tam-cet-revision-v1",
  revisionLegacy: "tam-bible-revision-v1",
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

const FIVE_MIN_MS = 5 * 60 * 1000;

/** Paliers SRS (ms) — échelle indicative simplifiée. */
export const SRS_INTERVALS_MS = [
  60_000, 120_000, 180_000, 300_000, 600_000, 900_000, 1_800_000, 3_600_000,
  10_800_000, 21_600_000, 43_200_000, 86_400_000, 259_200_000, 432_000_000,
  604_800_000, 864_000_000, 1_296_000_000,
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
  localStorage.setItem(key, JSON.stringify(data));
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
  const mod = MODULES[axisId]?.find((m) => m.id === moduleId);
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
  const mod = MODULES[axisId]?.find((m) => m.id === moduleId);
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

function hasLegacyStorage() {
  return !!(
    localStorage.getItem(KEYS.revision) ||
    localStorage.getItem(KEYS.revisionLegacy) ||
    localStorage.getItem(KEYS.mastery) ||
    localStorage.getItem(KEYS.srs)
  );
}

/**
 * Montée de version : conserve les scores modules (le 🥳 disparaît si des questions
 * sont ajoutées au CET) ; retire seulement les questions supprimées du pool.
 */
export function migrateStorage() {
  const stored = parseInt(localStorage.getItem(KEYS.schema) || "0", 10);
  if (stored >= STORAGE_SCHEMA_VERSION) {
    return { action: "none", orphanQuestionsRemoved: 0 };
  }

  if (!hasLegacyStorage()) {
    localStorage.setItem(KEYS.schema, String(STORAGE_SCHEMA_VERSION));
    return { action: "init", orphanQuestionsRemoved: 0 };
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

  localStorage.setItem(KEYS.schema, String(STORAGE_SCHEMA_VERSION));
  return { action: "migrated", orphanQuestionsRemoved };
}

/** Efface toute la progression CET sur cet appareil. */
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
  return getAxisRevisionMastery(axisId).complete;
}

export function countPretestUnlockedChapters() {
  return AXES.filter((a) => a.available && isPretestChapterUnlocked(a.id)).length;
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
  if (isDevBypassUnlock()) return true;
  return countPretestUnlockedChapters() > 0;
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

/** Cartes du chapitre ayant reçu « Je maîtrise » au moins une fois (SRS). */
export function getPretestChapterMastery(axisId) {
  const questions = getQuestionsForAxis(axisId);
  const srs = loadSrs();
  let mastered = 0;
  for (const q of questions) {
    if ((srs[q.questionId]?.intervalIndex ?? 0) >= 1) mastered++;
  }
  const total = questions.length;
  const rate = total > 0 ? mastered / total : 0;
  return { mastered, total, rate };
}

export function getPretestUnlockProgress() {
  const chapters = AXES.filter((a) => a.available);
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
  return isUnlockComplete() && getPretestUnlockProgress().complete;
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
    intervalIndex: 0,
    nextReviewAt: 0,
    sessionsUntilEligible: 0,
    pendingReview: false,
  };
}

export function getSrsRow(questionId) {
  return loadSrs()[questionId] || defaultSrsRow();
}

function sessionsSkipAfterMaster(intervalIndex) {
  if (intervalIndex <= 2) return 1;
  if (intervalIndex <= 7) return 2;
  return 3;
}

export function applySrsMaster(questionId) {
  const all = loadSrs();
  const row = { ...defaultSrsRow(), ...all[questionId] };
  const nextIndex = Math.min(row.intervalIndex + 1, SRS_INTERVALS_MS.length);
  const delay = SRS_INTERVALS_MS[nextIndex - 1] ?? SRS_INTERVALS_MS[0];
  row.intervalIndex = nextIndex;
  row.nextReviewAt = Date.now() + delay;
  row.sessionsUntilEligible = sessionsSkipAfterMaster(nextIndex);
  row.pendingReview = false;
  all[questionId] = row;
  saveSrs(all);
}

export function applySrsReview(questionId) {
  const all = loadSrs();
  const row = { ...defaultSrsRow(), ...all[questionId] };
  row.intervalIndex = 0;
  row.nextReviewAt = Date.now();
  row.sessionsUntilEligible = 0;
  row.pendingReview = true;
  all[questionId] = row;
  saveSrs(all);
}

export function isSrsEligible(questionId, now = Date.now()) {
  const row = getSrsRow(questionId);
  if (row.pendingReview) return true;
  if (row.sessionsUntilEligible > 0) return false;
  return row.nextReviewAt <= now;
}

/** Après une session pré-examen terminée pour un chapitre. */
export function onPretestSessionComplete(axisId) {
  const all = loadSrs();
  const ids = new Set(getQuestionsForAxis(axisId).map((q) => q.questionId));
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

export function needsPretestPauseWarning() {
  const last = getPretestLastEndAt();
  if (!last) return false;
  return Date.now() - last < FIVE_MIN_MS;
}

/* ─── Pré-examen prefs / session active ─── */

export function loadPretestPrefs() {
  return readJson(KEYS.pretestPrefs, {});
}

export function savePretestPref(axisId, count) {
  const p = loadPretestPrefs();
  p[axisId] = count;
  writeJson(KEYS.pretestPrefs, p);
}

export function getPretestPref(axisId) {
  return loadPretestPrefs()[axisId] ?? 25;
}

export function loadPretestActive() {
  return readJson(KEYS.pretestActive, {});
}

export function getActivePretestSession(axisId) {
  return loadPretestActive()[axisId] || null;
}

export function saveActivePretestSession(axisId, session) {
  const all = loadPretestActive();
  if (session) all[axisId] = session;
  else delete all[axisId];
  writeJson(KEYS.pretestActive, all);
}

/* ─── Examen final prefs ─── */

export function loadFinalPrefs() {
  return readJson(KEYS.finalPrefs, { count: 50 });
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
