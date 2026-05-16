/**
 * Construction de file pré-examen (erreurs réparties + nouvelles + SRS).
 */
import { getQuestionsForAxis } from "./pool.js";
import { getSrsRow, isSrsEligible } from "./progress.js";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * @param {string} axisId
 * @param {number} targetCount
 * @returns {string[]} questionIds
 */
export function buildPretestQueue(axisId, targetCount) {
  const chapter = getQuestionsForAxis(axisId);
  const now = Date.now();

  const pending = chapter
    .filter((q) => getSrsRow(q.questionId).pendingReview)
    .map((q) => q.questionId);

  const maxReview = Math.min(pending.length, Math.max(1, Math.floor(targetCount / 2)));
  const reviewPick = shuffle(pending).slice(0, maxReview);
  const reviewSet = new Set(reviewPick);

  const eligible = chapter.filter((q) => {
    if (reviewSet.has(q.questionId)) return false;
    return isSrsEligible(q.questionId, now);
  });

  const dueSrs = shuffle(
    eligible.filter((q) => {
      const row = getSrsRow(q.questionId);
      return !row.pendingReview && row.intervalIndex > 0;
    })
  ).map((q) => q.questionId);

  const fresh = shuffle(
    eligible.filter((q) => getSrsRow(q.questionId).intervalIndex === 0 && !getSrsRow(q.questionId).pendingReview)
  ).map((q) => q.questionId);

  const pool = [...reviewPick];
  for (const id of [...dueSrs, ...fresh]) {
    if (pool.length >= targetCount) break;
    if (!pool.includes(id)) pool.push(id);
  }

  if (pool.length < targetCount) {
    for (const q of shuffle(chapter)) {
      if (pool.length >= targetCount) break;
      if (!pool.includes(q.questionId)) pool.push(q.questionId);
    }
  }

  return shuffle(pool.slice(0, targetCount));
}

export function createPretestSession(axisId, targetCount) {
  return {
    axisId,
    targetCount,
    queue: buildPretestQueue(axisId, targetCount),
    index: 0,
    masterCount: 0,
    startedAt: Date.now(),
  };
}
