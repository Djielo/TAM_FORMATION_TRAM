/**
 * RCT — Règlement de circulation tramway TaM (EXP-CSG-01-17)
 * Point d'agrégation : axes + modules par chapitre (data-cet-ch1 … ch4).
 */

import { MODULES_ACRONYMES } from "./data-cet-acronymes.js";
import { MODULES_CH1 } from "./data-cet-ch1.js";
import { MODULES_CH2 } from "./data-cet-ch2.js";
import { MODULES_CH3 } from "./data-cet-ch3.js";
import { MODULES_CH4 } from "./data-cet-ch4.js";

export const AXES = [
  {
    id: "acronymes",
    num: null,
    title: "Acronymes",
    desc: "Sigles du RCT — à connaître avant les chapitres 1 à 4",
    cetPages: "liste",
    available: true,
  },
  {
    id: "materiel",
    num: 1,
    title: "Utilisation du matériel roulant",
    desc: "Cabine, sablières, veille automatique, modes dégradés…",
    cetPages: "3–19",
    available: true,
  },
  {
    id: "signalisation",
    num: 2,
    title: "Respect de la signalisation",
    desc: "Feux, panneaux, zones spécifiques, traversées routières…",
    cetPages: "20–37",
    available: true,
  },
  {
    id: "circulation",
    num: 3,
    title: "Consignes de circulation en ligne",
    desc: "Prise de service, VUT, portes, PCC…",
    cetPages: "38–58",
    available: MODULES_CH3.length > 0,
  },
  {
    id: "urgence",
    num: 4,
    title: "Consignes d'urgence",
    desc: "4 consignes générales, évacuation, coordinateur…",
    cetPages: "59–75",
    available: MODULES_CH4.length > 0,
  },
];

/** Clés = id des axes dans AXES */
export const MODULES = {
  acronymes: MODULES_ACRONYMES,
  materiel: MODULES_CH1,
  signalisation: MODULES_CH2,
  circulation: MODULES_CH3,
  urgence: MODULES_CH4,
};
