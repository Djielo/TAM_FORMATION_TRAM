/**
 * Index plat des questions RCT (métadonnées chapitre / module).
 */
import { AXES, MODULES } from "./data.js";

let _cache = null;

export function invalidateQuestionPool() {
  _cache = null;
}

export function getQuestionPool() {
  if (_cache) return _cache;
  const all = [];
  for (const axis of AXES) {
    const modules = MODULES[axis.id] || [];
    for (const mod of modules) {
      for (const q of mod.questions) {
        all.push({
          questionId: q.id,
          prompt: q.prompt,
          cardPrompt: q.cardPrompt || null,
          choices: q.choices,
          correct: q.correct,
          explanation: q.explanation,
          axisId: axis.id,
          axisNum: axis.num,
          axisTitle: axis.title,
          moduleId: mod.id,
          moduleCode: mod.code,
          moduleTitle: mod.title,
        });
      }
    }
  }
  _cache = all;
  return all;
}

export function getTotalQuestionCount() {
  return getQuestionPool().length;
}

export function getQuestionsForAxis(axisId) {
  return getQuestionPool().filter((q) => q.axisId === axisId);
}

export { getModuleById, getModulesForAxis } from "./data.js";

export function getQuestionById(questionId) {
  return getQuestionPool().find((q) => q.questionId === questionId) || null;
}

export function getAxisById(axisId) {
  return AXES.find((a) => a.id === axisId) || null;
}

/** Quotas pré-examen / examen final par pas de 25. */
export const SESSION_SIZE_OPTIONS = [25, 50, 75, 100, 125, 150];

/** Paliers proposés selon la taille du chapitre (petits chapitres : au moins « tout le chapitre »). */
export function sessionSizesForChapter(questionCount) {
  if (questionCount <= 0) return [];
  const fromSteps = SESSION_SIZE_OPTIONS.filter((n) => n <= questionCount);
  const sizes = new Set(fromSteps);
  if (questionCount <= 25 || !fromSteps.length) {
    sizes.add(questionCount);
  } else if (!sizes.has(questionCount)) {
    sizes.add(questionCount);
  }
  return [...sizes].sort((a, b) => a - b);
}
