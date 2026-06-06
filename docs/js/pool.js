/**
 * Index plat des questions RCT (métadonnées chapitre / module).
 */

function rctData() {
  return globalThis.__RCT_DATA__;
}

let _cache = null;

export function invalidateQuestionPool() {
  _cache = null;
}

export function getQuestionPool() {
  if (_cache) return _cache;
  const { AXES, MODULES } = rctData();
  const all = [];
  for (const axis of AXES) {
    const modules = MODULES[axis.id] || [];
    for (const mod of modules) {
      for (const q of mod.questions) {
        const answer =
          q.answer != null && String(q.answer).trim()
            ? q.answer
            : q.choices?.[q.correct ?? 0] ?? "";
        all.push({
          questionId: q.id,
          prompt: q.prompt,
          cardPrompt: q.cardPrompt || null,
          answer,
          answerInfo: q.answerInfo || null,
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

export function getModulesForAxis(axisId) {
  return rctData().getModulesForAxis(axisId);
}

export function getModuleGroupsForAxis(axisId) {
  return rctData().getModuleGroupsForAxis(axisId);
}

export function getModuleGroupById(axisId, groupId) {
  return rctData().getModuleGroupById(axisId, groupId);
}

export function getModulesInGroup(axisId, groupId) {
  return rctData().getModulesInGroup(axisId, groupId);
}

export function getGroupForModule(axisId, moduleId) {
  return rctData().getGroupForModule(axisId, moduleId);
}

export function axisHasModuleGroups(axisId) {
  return rctData().axisHasModuleGroups(axisId);
}

export function getModuleById(axisId, moduleId) {
  return rctData().getModuleById(axisId, moduleId);
}

export function getQuestionById(questionId) {
  return getQuestionPool().find((q) => q.questionId === questionId) || null;
}

export function getAxisById(axisId) {
  return rctData().AXES.find((a) => a.id === axisId) || null;
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
