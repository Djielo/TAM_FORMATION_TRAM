/**
 * Réduit chaque QCM à 2 propositions : bonne réponse + distracteur le plus pertinent.
 * Usage : node scripts/reduce-qcm-to-two.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MODULES_ACRONYMES } from "../docs/js/data-rct-acronymes.js";
import { MODULES_CH1 } from "../docs/js/data-rct-ch1.js";
import { MODULES_CH2 } from "../docs/js/data-rct-ch2.js";
import { MODULES_CH3 } from "../docs/js/data-rct-ch3.js";
import { MODULES_CH4 } from "../docs/js/data-rct-ch4.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const FILES = [
  ["docs/js/data-rct-acronymes.js", MODULES_ACRONYMES],
  ["docs/js/data-rct-ch1.js", MODULES_CH1],
  ["docs/js/data-rct-ch2.js", MODULES_CH2],
  ["docs/js/data-rct-ch3.js", MODULES_CH3],
  ["docs/js/data-rct-ch4.js", MODULES_CH4],
];

const STOP = new Set([
  "de",
  "du",
  "des",
  "la",
  "le",
  "les",
  "en",
  "à",
  "au",
  "aux",
  "un",
  "une",
  "et",
  "ou",
  "si",
  "par",
  "sur",
  "d",
  "l",
  "ce",
  "cette",
  "son",
  "sa",
  "ses",
]);

/** Correspondance lettres sigle ↔ mots (sigles RCT). */
function acronymLetterScore(acronym, text) {
  const letters = acronym.replace(/[^A-Za-zÀ-ÿ0-9]/g, "").split("");
  if (!letters.length) return 0;

  const words = text.split(/[\s'’—\-]+/).filter(Boolean);
  let seq = 0;
  for (let i = 0; i < letters.length && i < words.length; i++) {
    const w = words[i];
    const t = letters[i].toLowerCase();
    if (w[0]?.toLowerCase() === t) seq++;
    else if (w.toLowerCase().startsWith(t)) seq += 0.7;
  }

  const caps = [...text.matchAll(/([A-ZÀ-Ÿ])/g)].map((m) => m[1]);
  let cap = 0;
  for (const L of letters) {
    if (caps.includes(L)) cap++;
  }

  const initials = words.map((w) => w[0]?.toUpperCase()).filter(Boolean);
  let init = 0;
  for (const L of letters) {
    if (initials.includes(L)) init++;
  }

  return Math.max(seq, cap * 0.85, init);
}

function tokenize(s) {
  return s
    .toLowerCase()
    .split(/[^\wàâäéèêëïîôùûüç]+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

function scoreDistractor(correctIdx, wrongIdx, choices, prompt, explanation) {
  const correct = choices[correctIdx];
  const distractor = choices[wrongIdx];
  let score = 0;

  const acro = prompt.match(/acronyme\s+([A-Z0-9]+)/i)?.[1];
  if (acro) {
    const cs = acronymLetterScore(acro, correct);
    const ds = acronymLetterScore(acro, distractor);
    score += ds * 5;
    if (ds >= cs - 0.5) score += 8;
    if (ds >= cs) score += 4;
  }

  const lr =
    Math.min(distractor.length, correct.length) /
    Math.max(distractor.length, correct.length, 1);
  score += lr * 4;

  const cw = tokenize(correct);
  const dw = tokenize(distractor);
  score += cw.filter((w) => dw.includes(w)).length * 2.5;

  const prefixes = [
    "Signal",
    "Boîtier",
    "Frein",
    "Bouton",
    "Point",
    "Tableau",
    "Barrière",
    "Voie",
  ];
  for (const p of prefixes) {
    if (correct.startsWith(p) && distractor.startsWith(p)) score += 5;
  }

  if (distractor.slice(0, 5) === correct.slice(0, 5)) score += 3;

  for (const w of dw.filter((x) => x.length > 4)) {
    if (explanation.toLowerCase().includes(w)) score += 1;
  }

  if (/\b(PCC|SAT|AEL|SAE|SIE|frein|pantographe|caténaire)\b/i.test(distractor))
    score += 1.5;

  if (/\b(dimanche|lendemain|10\s*h|courrier|oral simple)\b/i.test(distractor))
    score -= 6;

  if (/uniquement|seulement|sans autre/i.test(distractor)) score += 1;

  return score;
}

/** Distracteur préféré (libellé exact) quand l’heuristique se trompe. */
const PREFERRED_DISTRACTOR = {
  "abbr-bm": "Bouton de Manœuvre",
  "abbr-pcc": "Point de Contrôle Canton",
  "abbr-bt": "Boucle de Télécommande",
  "abbr-ca": "Commande Automatique",
  "abbr-cvs": "Commande de Vitesse de Service",
  "abbr-sae": "Système d'Annonce Embarqué",
};

function pickBestDistractor(q) {
  const { choices, correct, prompt, explanation, id } = q;
  const preferred = PREFERRED_DISTRACTOR[id];
  if (preferred) {
    const idx = choices.findIndex((c, i) => i !== correct && c === preferred);
    if (idx >= 0) return idx;
  }
  let bestIdx = correct === 0 ? 1 : 0;
  let bestScore = -Infinity;
  for (let i = 0; i < choices.length; i++) {
    if (i === correct) continue;
    const s = scoreDistractor(correct, i, choices, prompt, explanation);
    if (s > bestScore) {
      bestScore = s;
      bestIdx = i;
    }
  }
  return bestIdx;
}

function processQuestion(q) {
  if (q.choices.length <= 2) return q;
  const distractorIdx = pickBestDistractor(q);
  return {
    ...q,
    choices: [q.choices[q.correct], q.choices[distractorIdx]],
    correct: 0,
  };
}

function formatChoicesArray(choices, indent = "          ") {
  const allShort = choices.every((c) => c.length <= 42);
  if (allShort) {
    return `[${choices.map((c) => JSON.stringify(c)).join(", ")}]`;
  }
  return `[\n${choices.map((c) => `${indent}${JSON.stringify(c)},`).join("\n")}\n        ]`;
}

function patchFile(relPath, modulesProcessed) {
  const filePath = path.join(ROOT, relPath);
  let content = fs.readFileSync(filePath, "utf8");
  let count = 0;

  for (const mod of modulesProcessed) {
    for (const q of mod.questions) {
      const escId = q.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(
        `(id:\\s*"${escId}"[\\s\\S]*?choices:\\s*)\\[[\\s\\S]*?\\](\\s*,?\\s*\\r?\\n\\s*correct:\\s*)\\d+`,
        "m",
      );
      const arr = formatChoicesArray(q.choices);
      const next = content.replace(re, `$1${arr}$2${q.correct}`);
      if (next === content) {
        console.warn(`  ⚠ pas de remplacement : ${q.id} (${relPath})`);
      } else {
        content = next;
        count++;
      }
    }
  }

  fs.writeFileSync(filePath, content, "utf8");
  return count;
}

let total = 0;
for (const [rel, modules] of FILES) {
  const modulesProcessed = modules.map((m) => ({
    ...m,
    questions: m.questions.map(processQuestion),
  }));
  const n = patchFile(rel, modulesProcessed);
  console.log(`${rel}: ${n} questions`);
  total += n;
}
console.log(`Total: ${total} questions mises à jour.`);
