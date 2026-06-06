/**
 * Construction de file pré-examen (erreurs réparties + nouvelles + SRS).
 */
import {
  PRETEST_FINAL_UNLOCK_RATE,
  getPretestModuleMastery,
  getQuestionsForModule,
  getSrsRow,
  isPretestCardEverMastered,
  isSrsEligible,
} from "./store.js";

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
 * @param {string} moduleId
 * @param {number} targetCount
 * @returns {string[]} questionIds
 */
export function buildPretestQueue(axisId, moduleId, targetCount) {
  const chapter = getQuestionsForModule(axisId, moduleId);
  const now = Date.now();
  const { rate } = getPretestModuleMastery(axisId, moduleId);
  const focusUnmastered = rate < PRETEST_FINAL_UNLOCK_RATE;

  const pending = chapter
    .filter((q) => getSrsRow(q.questionId).pendingReview)
    .map((q) => q.questionId);

  const maxReview = focusUnmastered
    ? Math.min(pending.length, Math.max(0, Math.floor(targetCount * 0.2)))
    : Math.min(pending.length, Math.max(1, Math.floor(targetCount / 2)));
  const reviewPick = shuffle(pending).slice(0, maxReview);
  const reviewSet = new Set(reviewPick);

  const pool = [...reviewPick];

  if (focusUnmastered) {
    const notYet = shuffle(
      chapter.filter(
        (q) =>
          !reviewSet.has(q.questionId) && !isPretestCardEverMastered(q.questionId),
      ),
    );
    for (const q of notYet) {
      if (pool.length >= targetCount) break;
      pool.push(q.questionId);
    }
  }

  if (pool.length < targetCount) {
    const eligible = chapter.filter((q) => {
      if (reviewSet.has(q.questionId) || pool.includes(q.questionId)) return false;
      return isSrsEligible(q.questionId, now);
    });

    const dueSrs = shuffle(
      eligible.filter((q) => {
        const row = getSrsRow(q.questionId);
        return !row.pendingReview && row.intervalIndex > 0;
      }),
    ).map((q) => q.questionId);

    const fresh = shuffle(
      eligible.filter(
        (q) =>
          getSrsRow(q.questionId).intervalIndex === 0 &&
          !getSrsRow(q.questionId).pendingReview,
      ),
    ).map((q) => q.questionId);

    for (const id of [...dueSrs, ...fresh]) {
      if (pool.length >= targetCount) break;
      if (!pool.includes(id)) pool.push(id);
    }
  }

  if (pool.length < targetCount) {
    for (const q of shuffle(chapter)) {
      if (pool.length >= targetCount) break;
      if (!pool.includes(q.questionId)) pool.push(q.questionId);
    }
  }

  return shuffle(pool.slice(0, targetCount));
}

export function createPretestSession(axisId, moduleId, targetCount) {
  return {
    axisId,
    moduleId,
    targetCount,
    queue: buildPretestQueue(axisId, moduleId, targetCount),
    index: 0,
    masterCount: 0,
    startedAt: Date.now(),
  };
}
