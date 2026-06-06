/**
 * RCT — Règlement de Circulation Tramway TaM (EXP-CSG-01-17)
 * Périmètre actif : acronymes + ch. 1 (circulation) + ch. 2 (urgence).
 */

const bust = globalThis.__RCT_BUST__ || String(Date.now());

const [{ MODULES_ACRONYMES }, { MODULES_CH3, MODULE_GROUPS_CH3 }, { MODULES_CH4 }] =
  await Promise.all([
    import(`./data-rct-acronymes.js?v=${bust}`),
    import(`./data-rct-ch3.js?v=${bust}`),
    import(`./data-rct-ch4.js?v=${bust}`),
  ]);

export { MODULES_ACRONYMES, MODULES_CH3, MODULE_GROUPS_CH3, MODULES_CH4 };

export const AXES = [
  {
    id: "acronymes",
    num: null,
    title: "Acronymes",
    desc: "Sigles du RCT — à connaître avant les chapitres 1 et 2",
    cetPages: "liste",
    available: true,
  },
  {
    id: "circulation",
    num: 1,
    title: "Consignes de circulation en ligne",
    desc: "Tableau des vitesses, PDS, VUT, portes, PCC…",
    cetPages: "34, 38–58",
    available: MODULES_CH3.length > 0,
  },
  {
    id: "urgence",
    num: 2,
    title: "Consignes d'urgence",
    desc: "4 consignes générales, évacuation, coordinateur…",
    cetPages: "59–75",
    available: MODULES_CH4.length > 0,
  },
];

/** Clés = id des axes dans AXES */
export const MODULES = {
  acronymes: MODULES_ACRONYMES,
  circulation: MODULES_CH3,
  urgence: MODULES_CH4,
};

export const MODULE_GROUPS = {
  circulation: MODULE_GROUPS_CH3,
};

export function getModulesForAxis(axisId) {
  return MODULES[axisId] || [];
}

export function getModuleGroupsForAxis(axisId) {
  return MODULE_GROUPS[axisId] || [];
}

export function getModuleGroupById(axisId, groupId) {
  return getModuleGroupsForAxis(axisId).find((g) => g.id === groupId) || null;
}

export function getModulesInGroup(axisId, groupId) {
  const group = getModuleGroupById(axisId, groupId);
  if (!group) return [];
  const byId = new Map(getModulesForAxis(axisId).map((m) => [m.id, m]));
  return group.moduleIds.map((id) => byId.get(id)).filter(Boolean);
}

export function getGroupForModule(axisId, moduleId) {
  for (const group of getModuleGroupsForAxis(axisId)) {
    if (group.moduleIds.includes(moduleId)) return group;
  }
  return null;
}

export function axisHasModuleGroups(axisId) {
  return getModuleGroupsForAxis(axisId).length > 0;
}

export function getModuleById(axisId, moduleId) {
  return getModulesForAxis(axisId).find((m) => m.id === moduleId) || null;
}
