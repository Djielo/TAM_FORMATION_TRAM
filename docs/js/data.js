/**
 * RCT — Règlement de Circulation Tramway TaM (EXP-CSG-01-17)
 * Périmètre actif : acronymes + ch. 1 (circulation) + ch. 2 (urgence).
 */

import { MODULES_ACRONYMES } from "./data-rct-acronymes.js";
import { MODULES_CH3 } from "./data-rct-ch3.js";
import { MODULES_CH4 } from "./data-rct-ch4.js";

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

export function getModulesForAxis(axisId) {
  return MODULES[axisId] || [];
}

export function getModuleById(axisId, moduleId) {
  return getModulesForAxis(axisId).find((m) => m.id === moduleId) || null;
}
