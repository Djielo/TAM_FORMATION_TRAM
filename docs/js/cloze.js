/**
 * Texte à trous — tokens mot à mot (pré-examen lecture).
 */
import { getModulesForAxis } from "./data.js";
import {
  getClozeDailyIntroCount,
  getClozeDailyNewTarget,
  getSrsRow,
  isSrsEligible,
} from "./store.js";

export const CLOZE_INITIAL_BLANKS = 5;
export const CLOZE_MIN_BLANKS = 5;
/** Trous ajoutés à chaque « Je maîtrise ». */
export const CLOZE_MASTER_STEP = 2;
/** Trous retirés à chaque « À revoir » (sans descendre sous CLOZE_MIN_BLANKS). */
export const CLOZE_REVIEW_STEP = 1;
/** Objectif de nouvelles consignes découvertes par jour (file automatique). */
export const CLOZE_DAILY_NEW_TARGET = 10;

/** Chapitres consignes (texte à trous) — libellés « consigne », pas « carte » / « session ». */
export function isClozePretestModule(axisId, moduleId) {
  return axisId === "circulation" || axisId === "urgence";
}

const ANSWER_WARNING_MARK = "@@WARNING@@";
const ANSWER_INFO_MARK = "@@INFO@@";
const ANSWER_ENCART_MARK_RE = /@@WARNING@@|@@INFO@@/g;

/** Mots outils — jamais masqués seuls. */
const STOP_WORDS = new Set([
  "le", "la", "les", "de", "du", "des", "d", "l", "à", "au", "aux", "en", "et", "ou",
  "un", "une", "si", "ne", "pas", "par", "pour", "sur", "avec", "sans", "dans", "son",
  "sa", "ses", "ce", "cette", "qui", "que", "plus", "moins", "y", "se", "the", "ou",
  "ou", "ni", "car", "donc", "or", "mais", "très", "tout", "tous", "toute", "toutes",
  "être", "est", "sont", "a", "as", "ont", "il", "elle", "on", "nous", "vous", "ils",
  "the", "and", "or", "of", "to", "in",
]);

/** Corps + encarts (même découpage que rct-app). */
export function splitAnswerBodyAndEncarts(raw) {
  const text = String(raw ?? "");
  if (!text.includes(ANSWER_WARNING_MARK) && !text.includes(ANSWER_INFO_MARK)) {
    return { body: text, encarts: [] };
  }
  const segments = text.split(ANSWER_ENCART_MARK_RE);
  const marks = [...text.matchAll(ANSWER_ENCART_MARK_RE)].map((match) =>
    match[0] === ANSWER_WARNING_MARK ? "warning" : "info",
  );
  return {
    body: (segments[0] ?? "").trimEnd(),
    encarts: marks
      .map((type, i) => ({
        type,
        content: (segments[i + 1] ?? "").trim(),
      }))
      .filter((entry) => entry.content),
  };
}

function normalizeWord(w) {
  return w
    .toLowerCase()
    .replace(/^[^a-zéèêàùâîôûç0-9]+|[^a-zéèêàùâîôûç0-9]+$/gi, "");
}

function isBlankableWord(text) {
  const t = String(text ?? "").trim();
  if (!t) return false;
  if (/^\d+[,.]?\d*$/.test(t)) return true;
  if (/^[A-ZÉÈÊÀÙÂÎÔÛÇ0-9-]{2,}$/.test(t)) return true;
  const core = normalizeWord(t);
  if (!core) return false;
  if (STOP_WORDS.has(core)) return false;
  return core.length >= 3;
}

/**
 * Découpe une ligne en tokens affichables (mots, nombres, ponctuation, espaces).
 * Regroupe les seuils : « < 0,20 g/l », « 0,20 g/l » — jamais « 0,20 » seul.
 */
function tokenizeLineBody(text) {
  const tokens = [];
  const s = String(text ?? "");
  let i = 0;

  while (i < s.length) {
    if (/\s/.test(s[i])) {
      let ws = "";
      while (i < s.length && /\s/.test(s[i])) {
        ws += s[i];
        i += 1;
      }
      tokens.push({ kind: "space", text: ws });
      continue;
    }

    const rest = s.slice(i);

    const threshold = rest.match(/^<\s*\d+[,.]?\d*\s*g\/l/i);
    if (threshold) {
      const chunk = threshold[0].replace(/\s+/g, " ").trim();
      tokens.push({ kind: "blankable", text: chunk });
      i += threshold[0].length;
      continue;
    }

    const measure = rest.match(/^\d+[,.]?\d*\s*g\/l/i);
    if (measure) {
      tokens.push({ kind: "blankable", text: measure[0].replace(/\s+/g, " ").trim() });
      i += measure[0].length;
      continue;
    }

    const kmh = rest.match(/^\d+[,.]?\d*\s*km\/h/i);
    if (kmh) {
      tokens.push({ kind: "blankable", text: kmh[0].replace(/\s+/g, " ").trim() });
      i += kmh[0].length;
      continue;
    }

    const num = rest.match(/^\d+[,.]?\d*/);
    if (num) {
      tokens.push({ kind: "blankable", text: num[0] });
      i += num[0].length;
      continue;
    }

    if (/^[.,;:!?)=>]/.test(s[i])) {
      tokens.push({ kind: "punct", text: s[i] });
      i += 1;
      continue;
    }

    const word = rest.match(/^[«»"'(]?[\p{L}\p{N}_-]+/u);
    if (word) {
      const w = word[0];
      tokens.push({
        kind: isBlankableWord(w) ? "blankable" : "word",
        text: w,
      });
      i += w.length;
      continue;
    }

    tokens.push({ kind: "punct", text: s[i] });
    i += 1;
  }

  return tokens;
}

function parseLineToRow(line, lineKey) {
  const numbered = line.match(/^(\d+\.\s*)([\s\S]*)$/);
  if (numbered) {
    return {
      id: lineKey,
      prefix: numbered[1],
      tokens: tokenizeLineBody(numbered[2]),
      sub: false,
    };
  }

  const sub = line.match(/^(-\s*)([\s\S]*)$/);
  if (sub) {
    return {
      id: lineKey,
      prefix: sub[1],
      tokens: tokenizeLineBody(sub[2]),
      sub: true,
    };
  }

  return {
    id: lineKey,
    prefix: "",
    tokens: tokenizeLineBody(line),
    sub: false,
  };
}

/**
 * @param {string} raw
 * @returns {{ blankables: object[], blocks: object[] }}
 */
export function buildClozeSegments(raw) {
  const { body, encarts } = splitAnswerBodyAndEncarts(raw);
  const blocks = [];
  const blankables = [];
  let blankIdx = 0;

  function assignBlankIds(row) {
    for (const tok of row.tokens) {
      if (tok.kind === "blankable") {
        tok.blankId = `${row.id}-b${blankIdx}`;
        blankIdx += 1;
        blankables.push({ id: tok.blankId, text: tok.text });
      }
    }
    return row;
  }

  const bodyLines = String(body ?? "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  bodyLines.forEach((line, lineIndex) => {
    const row = assignBlankIds(parseLineToRow(line, `b${lineIndex}`));
    if (row.tokens.length) blocks.push({ kind: "point", row });
  });

  encarts.forEach((encart, encartIndex) => {
    const rows = String(encart.content ?? "")
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, lineIndex) =>
        assignBlankIds(parseLineToRow(line, `e${encartIndex}-${lineIndex}`)),
      )
      .filter((row) => row.tokens.length);
    if (rows.length) {
      blocks.push({ kind: "encart", type: encart.type, rows });
    }
  });

  return { segments: blankables, blocks };
}

/** PRNG déterministe (seed entier). */
function mulberry32(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function hashQuestionOrder(questionId) {
  const str = `${questionId}:cloze-order`;
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Choisit les ids à masquer — ordre fixe par consigne (premiers N d'une permutation stable).
 * Les mêmes mots restent masqués tant qu'on garde le même nombre de trous.
 */
export function pickBlankSegmentIds(segments, blankCount, questionId) {
  const ids = segments.map((s) => s.id);
  if (!ids.length || blankCount <= 0) return new Set();

  const rng = mulberry32(hashQuestionOrder(questionId));
  const shuffled = [...ids];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const n = Math.min(blankCount, shuffled.length);
  return new Set(shuffled.slice(0, n));
}

function escapeHtml(raw) {
  return String(raw)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderTokenHtml(tok, blankIds, revealedAll, revealedBlanks) {
  if (tok.kind === "space" || tok.kind === "punct") {
    return escapeHtml(tok.text);
  }
  if (tok.kind === "word") {
    return escapeHtml(tok.text);
  }
  if (tok.kind === "blankable") {
    const wasBlank = blankIds.has(tok.blankId);
    const isOpen =
      revealedAll || (revealedBlanks && revealedBlanks.has(tok.blankId));
    if (wasBlank && !isOpen) {
      const w = Math.max(2.5, Math.min(tok.text.length * 0.55, 6));
      return `<button type="button" class="cloze-blank" data-cloze-blank="${escapeHtml(tok.blankId)}" style="min-width:${w}rem" aria-label="Toucher pour vérifier ce mot" title="Toucher pour vérifier">···</button>`;
    }
    if (wasBlank && isOpen) {
      return `<span class="cloze-filled">${escapeHtml(tok.text)}</span>`;
    }
    return escapeHtml(tok.text);
  }
  return escapeHtml(tok.text ?? "");
}

function renderRowHtml(row, blankIds, revealedAll, revealedBlanks, tone) {
  const inner = row.tokens
    .map((t) => renderTokenHtml(t, blankIds, revealedAll, revealedBlanks))
    .join("");
  const cls = row.sub
    ? "cloze-point cloze-point--sub"
    : `cloze-point cloze-point--${tone}`;
  return `<div class="${cls}">${escapeHtml(row.prefix)}${inner}</div>`;
}

/**
 * @param {string} raw
 * @param {{ blankCount: number, questionId: string, revealedAll?: boolean, revealedBlanks?: Set<string> }} opts
 */
export function renderClozeHtml(raw, opts) {
  const { segments, blocks } = buildClozeSegments(raw);
  const blankIds = pickBlankSegmentIds(
    segments,
    opts.blankCount,
    opts.questionId,
  );
  const revealedAll = !!opts.revealedAll;
  const revealedBlanks = opts.revealedBlanks ?? new Set();

  let mainIndex = 0;
  const bodyHtml = blocks
    .filter((b) => b.kind === "point")
    .map((block) => {
      mainIndex += 1;
      const tone = mainIndex % 2 === 0 ? "a" : "b";
      return renderRowHtml(block.row, blankIds, revealedAll, revealedBlanks, tone);
    })
    .join("");

  const encartHtml = blocks
    .filter((b) => b.kind === "encart")
    .map((block) => {
      const inner = block.rows
        .map((row) =>
          renderRowHtml(row, blankIds, revealedAll, revealedBlanks, "encart"),
        )
        .join("");
      const cls =
        block.type === "warning"
          ? "cloze-encart cloze-encart--warning"
          : "cloze-encart cloze-encart--info";
      const label = block.type === "warning" ? "ATTENTION" : "INFORMATION";
      return `<div class="${cls}" role="note"><p class="cloze-encart__label">${label}</p>${inner}</div>`;
    })
    .join("");

  return {
    html: bodyHtml + encartHtml,
    totalSegments: segments.length,
    blankCount: blankIds.size,
  };
}

/**
 * Progression affichée (niveau de trous / mots masquables).
 * 0 % tant qu'aucun passage enregistré ; ensuite proportion des trous actifs.
 */
export function getClozeDisplayProgress(questionId, answerRaw) {
  const { segments } = buildClozeSegments(answerRaw);
  const total = segments.length;
  if (!total) {
    return { pct: 0, inProgress: false, complete: false };
  }
  const row = getSrsRow(questionId);
  const blanks = row.clozeBlanks ?? CLOZE_INITIAL_BLANKS;
  const touched = (row.clozeSeed ?? 0) > 0;
  const pct = touched ? Math.min(100, Math.round((blanks / total) * 100)) : 0;
  const complete = touched && blanks >= total;
  return {
    pct,
    inProgress: touched && !complete,
    complete,
  };
}

/**
 * Choisit la prochaine consigne texte à trous (file interne, pas de choix utilisateur).
 * Priorité : SRS échu → nouvelles (quota/j) → en cours → à revoir (après rotation).
 */
export function countClozeAlternatives(excludeQuestionId, axisId = "circulation") {
  if (axisId !== "circulation") return 0;
  const modules = getModulesForAxis(axisId).filter((mod) =>
    isClozePretestModule(axisId, mod.id),
  );
  let n = 0;
  for (const mod of modules) {
    const q = mod.questions?.[0];
    if (!q?.id || q.id === excludeQuestionId) continue;
    const row = getSrsRow(q.id);
    if (row.sessionsUntilEligible > 0) continue;
    n += 1;
  }
  return n;
}

/** Consignes jamais ouvertes (encore introduisibles). */
export function countUntouchedClozeConsignes(axisId = "circulation") {
  if (axisId !== "circulation") return 0;
  const modules = getModulesForAxis(axisId).filter((mod) =>
    isClozePretestModule(axisId, mod.id),
  );
  let n = 0;
  for (const mod of modules) {
    const q = mod.questions?.[0];
    if (!q?.id) continue;
    if ((getSrsRow(q.id).clozeSeed ?? 0) === 0) n += 1;
  }
  return n;
}

/** Délai avant la prochaine révision SRS, ou null si rien de planifié. */
export function getClozeIdleState(axisId = "circulation") {
  if (axisId !== "circulation") return { waitMs: null, deferredCount: 0 };
  const modules = getModulesForAxis(axisId).filter((mod) =>
    isClozePretestModule(axisId, mod.id),
  );
  const now = Date.now();
  let waitMs = Infinity;
  let deferredCount = 0;

  for (const mod of modules) {
    const q = mod.questions?.[0];
    if (!q?.id) continue;
    const row = getSrsRow(q.id);
    if (row.pendingReview && row.sessionsUntilEligible > 0) deferredCount += 1;
    if (row.pendingReview || (row.intervalIndex ?? 0) === 0) continue;
    if (row.nextReviewAt > now) {
      waitMs = Math.min(waitMs, row.nextReviewAt - now);
    }
  }

  return {
    waitMs: Number.isFinite(waitMs) ? waitMs : null,
    deferredCount,
  };
}

export function formatClozeWaitFr(ms) {
  const mins = Math.max(1, Math.ceil(ms / 60_000));
  if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""}`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

export function pickNextClozeModule(axisId = "circulation") {
  if (axisId !== "circulation") return null;
  const modules = getModulesForAxis(axisId).filter((mod) =>
    isClozePretestModule(axisId, mod.id),
  );
  const now = Date.now();
  const dailyNew = getClozeDailyIntroCount();
  const dailyTarget = getClozeDailyNewTarget();
  let best = null;
  let bestScore = -Infinity;

  for (const mod of modules) {
    const q = mod.questions?.[0];
    if (!q?.id) continue;
    const questionId = q.id;
    const row = getSrsRow(questionId);
    let score = 0;

    if (row.sessionsUntilEligible > 0) continue;

    if (isSrsEligible(questionId, now) && (row.intervalIndex ?? 0) > 0 && !row.pendingReview) {
      score += 600_000 + Math.min(now - (row.nextReviewAt ?? 0), 86_400_000);
    }

    const touched = (row.clozeSeed ?? 0) > 0;
    if (!touched) {
      if (dailyNew < dailyTarget) score += 400_000 - dailyNew * 100;
      else score -= 50_000;
    } else {
      const prog = getClozeDisplayProgress(questionId, q.answer ?? "");
      if (prog.inProgress) score += 300_000 + (100 - prog.pct) * 100;
      else if (!prog.complete) score += 200_000;
      else if (!row.pendingReview) score += 10_000;
    }

    if (row.pendingReview) score += 250_000;

    score += Math.random() * 10_000;

    if (score > bestScore) {
      bestScore = score;
      best = mod.id;
    }
  }

  return best && bestScore > 0 ? { axisId, moduleId: best } : null;
}

/** Maîtrise chapitre consignes : moyenne des % texte à trous (100 % = tous les mots masqués). */
export function getConsignesChapterMastery(axisId) {
  const modules = getModulesForAxis(axisId).filter((mod) =>
    isClozePretestModule(axisId, mod.id),
  );
  const total = modules.length;
  if (!total) return { mastered: 0, total: 0, rate: 0 };
  let pctSum = 0;
  let completeCount = 0;
  for (const mod of modules) {
    const q = mod.questions?.[0];
    if (!q?.id) continue;
    const prog = getClozeDisplayProgress(q.id, q.answer ?? "");
    pctSum += prog.complete ? 100 : prog.pct;
    if (prog.complete) completeCount += 1;
  }
  const avgPct = pctSum / total;
  return {
    mastered: completeCount,
    total,
    rate: avgPct / 100,
  };
}

globalThis.__RCT_CONSIGNE_CHAPTER_MASTERY__ = getConsignesChapterMastery;
