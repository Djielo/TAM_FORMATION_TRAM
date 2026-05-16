/**
 * Persistance locale : maîtrise QCM, SRS pré-examen, sessions, préférences.
 */
import { AXES } from "./data.js";
import { getQuestionPool, getQuestionsForAxis, getTotalQuestionCount } from "./pool.js";

/** Meilleur taux « Je maîtrise » / session terminée requis par chapitre pour l'examen final. */
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
};

const FIVE_MIN_MS = 5 * 60 * 1000;

/** Paliers SRS (ms) — échelle indicative simplifiée. */
export const SRS_INTERVALS_MS = [
  60_000,
  120_000,
  180_000,
  300_000,
  600_000,
  900_000,
  1_800_000,
  3_600_000,
  10_800_000,
  21_600_000,
  43_200_000,
  86_400_000,
  259_200_000,
  432_000_000,
  604_800_000,
  864_000_000,
  1_296_000_000,
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

export function saveModuleScore(axisId, moduleId, score, total) {
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

/* ─── Maîtrise par question (déverrouillage) ─── */

export function loadMastery() {
  return readJson(KEYS.mastery, {});
}

function saveMastery(data) {
  writeJson(KEYS.mastery, data);
}

export function recordQuestionSeen(questionId) {
  const m = loadMastery();
  const row = m[questionId] || {};
  row.seen = true;
  row.lastSeenAt = Date.now();
  m[questionId] = row;
  saveMastery(m);
}

export function recordQuestionCorrect(questionId) {
  const m = loadMastery();
  const row = m[questionId] || {};
  row.seen = true;
  row.everCorrect = true;
  row.lastCorrectAt = Date.now();
  m[questionId] = row;
  saveMastery(m);
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
  return isDevBypassUnlock() || isUnlockComplete();
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

export function getPretestUnlockProgress() {
  const chapters = AXES.filter((a) => a.available);
  const stats = loadPretestStats();
  const items = chapters.map((a) => {
    const bestRate = stats[a.id]?.bestRate ?? 0;
    return {
      axisId: a.id,
      num: a.num,
      title: a.title,
      bestRate,
      bestPct: Math.round(bestRate * 100),
      ok: bestRate >= PRETEST_FINAL_UNLOCK_RATE,
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
