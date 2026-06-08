/**
 * Texte à trous — tokens mot à mot (pré-examen lecture).
 */
import { getModulesForAxis } from "./data.js";
import {
  getClozeDailyIntroCount,
  getClozeDailyNewTarget,
  getSrsRow,
  hasClozeDeclinedNewToday,
  isSrsEligible,
  shouldOfferClozeDailyExtra,
} from "./store.js";

export const CLOZE_INITIAL_BLANKS = 5;
export const CLOZE_MIN_BLANKS = 5;
/** Trous ajoutés à chaque « Je maîtrise ». */
export const CLOZE_MASTER_STEP = 2;
/** Trous retirés à chaque « À revoir » (sans descendre sous CLOZE_MIN_BLANKS). */
export const CLOZE_REVIEW_STEP = 1;
/** Objectif de nouvelles consignes découvertes par jour (file automatique). */
export const CLOZE_DAILY_NEW_TARGET = 10;
/** Part des mots masquables validés pour considérer une consigne maîtrisée. */
export const CLOZE_CONSIGNE_MASTERY_RATE = 0.9;

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

function renderTokenHtml(tok, blankIds, revealedBlanks, confirmedBlanks) {
  if (tok.kind === "space" || tok.kind === "punct") {
    return escapeHtml(tok.text);
  }
  if (tok.kind === "word") {
    return escapeHtml(tok.text);
  }
  if (tok.kind === "blankable") {
    const wasBlank = blankIds.has(tok.blankId);
    const isConfirmed =
      confirmedBlanks && confirmedBlanks.has(tok.blankId);
    const isRevealed =
      isConfirmed || (revealedBlanks && revealedBlanks.has(tok.blankId));
    if (wasBlank && !isRevealed) {
      const w = Math.max(2.5, Math.min(tok.text.length * 0.55, 6));
      return `<button type="button" class="cloze-blank" data-cloze-blank="${escapeHtml(tok.blankId)}" style="min-width:${w}rem" aria-label="1er toucher : afficher le mot" title="1er toucher : afficher · 2e toucher : valider">···</button>`;
    }
    if (wasBlank && isConfirmed) {
      return `<button type="button" class="cloze-filled cloze-filled--confirmed" data-cloze-blank="${escapeHtml(tok.blankId)}" aria-label="Touchez pour annuler la validation" title="Toucher à nouveau pour repasser en mot non validé">${escapeHtml(tok.text)}</button>`;
    }
    if (wasBlank && isRevealed) {
      return `<button type="button" class="cloze-filled cloze-filled--pending" data-cloze-blank="${escapeHtml(tok.blankId)}" aria-label="2e toucher : valider ce mot" title="Toucher à nouveau pour valider">${escapeHtml(tok.text)}</button>`;
    }
    return escapeHtml(tok.text);
  }
  return escapeHtml(tok.text ?? "");
}

function renderRowHtml(row, blankIds, revealedBlanks, confirmedBlanks, tone) {
  const inner = row.tokens
    .map((t) => renderTokenHtml(t, blankIds, revealedBlanks, confirmedBlanks))
    .join("");
  const cls = row.sub
    ? "cloze-point cloze-point--sub"
    : `cloze-point cloze-point--${tone}`;
  return `<div class="${cls}">${escapeHtml(row.prefix)}${inner}</div>`;
}

/** Ids des trous actifs pour une session. */
export function getClozeSessionBlankIds(answerRaw, blankCount, questionId) {
  const { segments } = buildClozeSegments(answerRaw);
  return pickBlankSegmentIds(segments, blankCount, questionId);
}

export function isClozeSessionComplete(confirmedBlanks, sessionBlankIds) {
  if (!sessionBlankIds?.size) return false;
  for (const id of sessionBlankIds) {
    if (!confirmedBlanks?.has(id)) return false;
  }
  return true;
}

/**
 * @param {string} raw
 * @param {{ blankCount: number, questionId: string, revealedBlanks?: Set<string>, confirmedBlanks?: Set<string> }} opts
 */
export function renderClozeHtml(raw, opts) {
  const { segments, blocks } = buildClozeSegments(raw);
  const blankIds = pickBlankSegmentIds(
    segments,
    opts.blankCount,
    opts.questionId,
  );
  const revealedBlanks = opts.revealedBlanks ?? new Set();
  const confirmedBlanks = opts.confirmedBlanks ?? new Set();

  let mainIndex = 0;
  const bodyHtml = blocks
    .filter((b) => b.kind === "point")
    .map((block) => {
      mainIndex += 1;
      const tone = mainIndex % 2 === 0 ? "a" : "b";
      return renderRowHtml(block.row, blankIds, revealedBlanks, confirmedBlanks, tone);
    })
    .join("");

  const encartHtml = blocks
    .filter((b) => b.kind === "encart")
    .map((block) => {
      const inner = block.rows
        .map((row) =>
          renderRowHtml(row, blankIds, revealedBlanks, confirmedBlanks, "encart"),
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
 * Progression affichée : part des mots masquables validés (double toucher).
 */
export function getClozeDisplayProgress(questionId, answerRaw) {
  const { segments } = buildClozeSegments(answerRaw);
  const total = segments.length;
  if (!total) {
    return { pct: 0, inProgress: false, complete: false };
  }
  const row = getSrsRow(questionId);
  const confirmed = new Set(row.clozeConfirmedIds ?? []);
  const pct = Math.min(100, Math.round((confirmed.size / total) * 100));
  const complete = confirmed.size / total >= CLOZE_CONSIGNE_MASTERY_RATE;
  return {
    pct,
    inProgress: confirmed.size > 0 && !complete,
    complete,
  };
}

/** Phase découverte : nouvelles consignes à la file jusqu’au quota du jour. */
export function isClozeNewDiscoveryActive(axisId = "circulation") {
  if (hasClozeDeclinedNewToday()) return false;
  if (getClozeDailyIntroCount() >= getClozeDailyNewTarget()) return false;
  return countUntouchedClozeConsignes(axisId) > 0;
}

function listClozeModules(axisId = "circulation") {
  return getModulesForAxis(axisId).filter((mod) =>
    isClozePretestModule(axisId, mod.id),
  );
}

function pickNextUntouchedClozeModule(axisId = "circulation") {
  for (const mod of listClozeModules(axisId)) {
    const q = mod.questions?.[0];
    if (!q?.id) continue;
    if ((getSrsRow(q.id).clozeSeed ?? 0) === 0) {
      return { axisId, moduleId: mod.id };
    }
  }
  return null;
}

/**
 * Choisit la prochaine consigne texte à trous (file interne, pas de choix utilisateur).
 * D’abord les nouvelles (quota/j), puis révisions par score session + SRS.
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

function pickNextClozeRevisionModule(axisId = "circulation") {
  const now = Date.now();
  const candidates = [];

  for (const mod of listClozeModules(axisId)) {
    const q = mod.questions?.[0];
    if (!q?.id) continue;
    const questionId = q.id;
    const row = getSrsRow(questionId);

    if ((row.clozeSeed ?? 0) === 0) continue;
    if (row.sessionsUntilEligible > 0) continue;

    const srsDue = isSrsEligible(questionId, now);
    if (
      (row.intervalIndex ?? 0) > 0 &&
      !row.pendingReview &&
      !srsDue
    ) {
      continue;
    }

    const total = row.clozeLastSessionTotal || CLOZE_INITIAL_BLANKS;
    const hits = Math.min(row.clozeLastSessionHits ?? 0, total);

    candidates.push({
      axisId,
      moduleId: mod.id,
      hits,
      total,
      srsDue,
      lastClozeAt: row.lastClozeAt ?? 0,
      pendingReview: Boolean(row.pendingReview),
    });
  }

  if (!candidates.length) return null;

  candidates.sort((a, b) => {
    if (a.hits !== b.hits) return a.hits - b.hits;
    if (a.pendingReview !== b.pendingReview) return a.pendingReview ? -1 : 1;
    if (a.srsDue !== b.srsDue) return a.srsDue ? -1 : 1;
    return a.lastClozeAt - b.lastClozeAt;
  });

  const best = candidates[0];
  return { axisId: best.axisId, moduleId: best.moduleId };
}

export function pickNextClozeModule(axisId = "circulation") {
  if (axisId !== "circulation" && axisId !== "urgence") return null;
  if (isClozeNewDiscoveryActive(axisId)) {
    return pickNextUntouchedClozeModule(axisId);
  }
  return pickNextClozeRevisionModule(axisId);
}

/** Lot consignes du jour non terminé (nouvelles, révisions ou prolongation en attente). */
export function hasUnfinishedClozeCycle(axisId = "circulation") {
  if (shouldOfferClozeDailyExtra()) return true;
  return pickNextClozeModule(axisId) != null;
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
