/**
 * Texte à trous — tokens mot à mot (pré-examen lecture).
 */
import { getModulesForAxis } from "./data.js";
import {
  getClozeDailyIntroCount,
  getClozeDailyIntroCountByAxis,
  getClozeDailyServeCountByAxis,
  getClozeDailyNewTarget,
  getActiveClozeSession,
  getSrsRow,
  hasClozeDeclinedNewToday,
  isSrsEligible,
  shouldOfferClozeDailyExtra,
  normalizeClozeBlanksForConsigne,
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
export const CONSIGNE_CLOZE_AXIS_IDS = ["circulation", "urgence"];

export function isConsigneClozeAxis(axisId) {
  return CONSIGNE_CLOZE_AXIS_IDS.includes(axisId);
}

export function isClozePretestModule(axisId, moduleId) {
  return isConsigneClozeAxis(axisId);
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
export function getClozeMaxSegments(answerRaw) {
  return buildClozeSegments(answerRaw).segments.length;
}

/** Trous actifs effectifs (ex. consigne à 4 mots masquables → max 4, pas 5). */
export function getEffectiveClozeBlankCount(storedBlanks, maxSegments) {
  if (maxSegments <= 0) return 0;
  const base = storedBlanks ?? CLOZE_INITIAL_BLANKS;
  return Math.min(base, maxSegments);
}

export function resolveClozeBlankCount(questionId, answerRaw) {
  const maxSeg = getClozeMaxSegments(answerRaw);
  const stored = getSrsRow(questionId).clozeBlanks ?? CLOZE_INITIAL_BLANKS;
  return getEffectiveClozeBlankCount(stored, maxSeg);
}

export function getClozeSessionBlankIds(answerRaw, blankCount, questionId) {
  const { segments } = buildClozeSegments(answerRaw);
  const maxSeg = segments.length;
  const effective = getEffectiveClozeBlankCount(blankCount, maxSeg);
  return pickBlankSegmentIds(segments, effective, questionId);
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
  const effectiveBlanks = getEffectiveClozeBlankCount(
    opts.blankCount,
    segments.length,
  );
  const blankIds = pickBlankSegmentIds(
    segments,
    effectiveBlanks,
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
export function isClozeConsigneRetired(questionId) {
  return Boolean(getSrsRow(questionId).clozeDeclaredMaster);
}

export function getClozeDisplayProgress(questionId, answerRaw) {
  const { segments } = buildClozeSegments(answerRaw);
  const total = segments.length;
  if (!total) {
    return { pct: 0, inProgress: false, complete: false };
  }
  const row = getSrsRow(questionId);
  if (row.clozeDeclaredMaster) {
    return { pct: 100, inProgress: false, complete: true };
  }
  const confirmed = new Set(row.clozeConfirmedIds ?? []);
  const pct = Math.min(100, Math.round((confirmed.size / total) * 100));
  const complete = confirmed.size / total >= CLOZE_CONSIGNE_MASTERY_RATE;
  return {
    pct,
    inProgress: confirmed.size > 0 && !complete,
    complete,
  };
}

/** Dernière consigne servie — évite deux fois de suite la même question. */
let lastClozeServedQuestionId = null;

export function getLastClozeServedQuestionId() {
  return lastClozeServedQuestionId;
}

export function noteClozeQuestionServed(questionId) {
  lastClozeServedQuestionId = questionId ?? null;
}

/** Phase découverte : nouvelles consignes à la file jusqu’au quota du jour (pool global ch. 1 + 2). */
export function isClozeNewDiscoveryActive() {
  if (hasClozeDeclinedNewToday()) return false;
  if (getClozeDailyIntroCount() >= getClozeDailyNewTarget()) return false;
  return countUntouchedClozeConsignes() > 0;
}

function listClozeModules(axisId) {
  return getModulesForAxis(axisId).filter((mod) =>
    isClozePretestModule(axisId, mod.id),
  );
}

/** Alterne circulation / urgence lors de l’introduction de nouvelles consignes. */
function consigneClozeAxisOrder(lastAxisId = null) {
  const axes = [...CONSIGNE_CLOZE_AXIS_IDS];
  if (lastAxisId === axes[0]) return [axes[1], axes[0]];
  return axes;
}

function pickNextUntouchedClozeModule(lastAxisHint = null) {
  const saved = getActiveClozeSession();
  const lastAxis = lastAxisHint ?? (saved?.moduleId ? saved.axisId : null);
  for (const axisId of consigneClozeAxisOrder(lastAxis)) {
    for (const mod of listClozeModules(axisId)) {
      const q = mod.questions?.[0];
      if (!q?.id) continue;
      if (isClozeConsigneRetired(q.id)) continue;
      if ((getSrsRow(q.id).clozeSeed ?? 0) === 0) {
        return { axisId, moduleId: mod.id };
      }
    }
  }
  return null;
}

/**
 * Choisit la prochaine consigne texte à trous (file interne, pas de choix utilisateur).
 * Pool global circulation + urgence : d’abord les nouvelles (quota/j), puis révisions SRS.
 */
export function countClozeAlternatives(excludeQuestionId) {
  let n = 0;
  for (const axisId of CONSIGNE_CLOZE_AXIS_IDS) {
    for (const mod of listClozeModules(axisId)) {
      const q = mod.questions?.[0];
      if (!q?.id || q.id === excludeQuestionId) continue;
      if (isClozeConsigneRetired(q.id)) continue;
      const row = getSrsRow(q.id);
      if (row.sessionsUntilEligible > 0) continue;
      n += 1;
    }
  }
  return n;
}

/** Consignes jamais ouvertes. Sans axisId : total global ; avec axisId : un chapitre seulement. */
export function countUntouchedClozeConsignes(axisId = null) {
  const axes =
    axisId && isConsigneClozeAxis(axisId)
      ? [axisId]
      : CONSIGNE_CLOZE_AXIS_IDS;
  let n = 0;
  for (const ax of axes) {
    for (const mod of listClozeModules(ax)) {
      const q = mod.questions?.[0];
      if (!q?.id) continue;
      if (isClozeConsigneRetired(q.id)) continue;
      if ((getSrsRow(q.id).clozeSeed ?? 0) === 0) n += 1;
    }
  }
  return n;
}

/** Délai avant la prochaine révision SRS, ou null si rien de planifié (pool global). */
export function getClozeIdleState() {
  const now = Date.now();
  let waitMs = Infinity;
  let deferredCount = 0;

  for (const axisId of CONSIGNE_CLOZE_AXIS_IDS) {
    for (const mod of listClozeModules(axisId)) {
      const q = mod.questions?.[0];
      if (!q?.id) continue;
      if (isClozeConsigneRetired(q.id)) continue;
      const row = getSrsRow(q.id);
      if (row.pendingReview && row.sessionsUntilEligible > 0) deferredCount += 1;
      if (row.pendingReview || (row.intervalIndex ?? 0) === 0) continue;
      if (row.nextReviewAt > now) {
        waitMs = Math.min(waitMs, row.nextReviewAt - now);
      }
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

/** Insère une consigne maîtrisée due SRS environ toutes les N révisions. */
const CLOZE_SRS_REFRESH_EVERY = 12;
let clozeRevisionPickCount = 0;

function pickFromSorted(candidates, excludeQuestionId) {
  if (!candidates.length) return null;
  if (excludeQuestionId && candidates.length > 1) {
    const filtered = candidates.filter((c) => c.questionId !== excludeQuestionId);
    if (filtered.length) return filtered[0];
  }
  return candidates[0];
}

function pickNextClozeRevisionModule(excludeQuestionId = null) {
  const now = Date.now();
  const learning = [];
  const maintenance = [];

  for (const axisId of CONSIGNE_CLOZE_AXIS_IDS) {
    for (const mod of listClozeModules(axisId)) {
      const q = mod.questions?.[0];
      if (!q?.id) continue;
      const questionId = q.id;
      const answerRaw = q.answer ?? "";
      if (isClozeConsigneRetired(questionId)) continue;
      const row = getSrsRow(questionId);

      if ((row.clozeSeed ?? 0) === 0) continue;
      if (row.sessionsUntilEligible > 0) continue;

      const maxSeg = getClozeMaxSegments(answerRaw);
      const activeBlanks = getEffectiveClozeBlankCount(row.clozeBlanks, maxSeg);
      const complete = getClozeDisplayProgress(questionId, answerRaw).complete;
      const srsDue = isSrsEligible(questionId, now);

      const entry = {
        axisId,
        moduleId: mod.id,
        questionId,
        activeBlanks,
        lastClozeAt: row.lastClozeAt ?? 0,
        pendingReview: Boolean(row.pendingReview),
      };

      if (complete) {
        if (!srsDue) continue;
        maintenance.push(entry);
      } else {
        learning.push(entry);
      }
    }
  }

  const sortLearning = (a, b) => {
    if (a.activeBlanks !== b.activeBlanks) return a.activeBlanks - b.activeBlanks;
    if (a.pendingReview !== b.pendingReview) return a.pendingReview ? -1 : 1;
    return a.lastClozeAt - b.lastClozeAt;
  };
  const sortMaintenance = (a, b) => a.lastClozeAt - b.lastClozeAt;

  learning.sort(sortLearning);
  maintenance.sort(sortMaintenance);

  if (
    maintenance.length &&
    learning.length &&
    clozeRevisionPickCount >= CLOZE_SRS_REFRESH_EVERY
  ) {
    clozeRevisionPickCount = 0;
    const pick = pickFromSorted(maintenance, excludeQuestionId);
    if (pick) {
      return { axisId: pick.axisId, moduleId: pick.moduleId, srsRefresh: true };
    }
  }

  clozeRevisionPickCount += 1;

  let pick = pickFromSorted(learning, excludeQuestionId);
  if (pick) {
    return { axisId: pick.axisId, moduleId: pick.moduleId };
  }

  pick = pickFromSorted(maintenance, excludeQuestionId);
  if (pick) {
    clozeRevisionPickCount = 0;
    return { axisId: pick.axisId, moduleId: pick.moduleId, srsRefresh: true };
  }

  return null;
}

/** @param {string|null} [lastAxisHint] Chapitre terminé — alterne l’intro des nouvelles consignes. */
export function pickNextClozeModule(lastAxisHint = null) {
  if (isClozeNewDiscoveryActive()) {
    return pickNextUntouchedClozeModule(lastAxisHint);
  }
  return pickNextClozeRevisionModule(lastClozeServedQuestionId);
}

/**
 * Proposer une prolongation (+ consignes) seulement si le quota du jour est atteint
 * et qu'il ne reste plus de révision dans la file.
 */
export function canOfferClozeDailyExtra() {
  if (!shouldOfferClozeDailyExtra()) return false;
  return pickNextClozeRevisionModule(lastClozeServedQuestionId) == null;
}

/** Lot consignes du jour non terminé (nouvelles, révisions ou prolongation en attente). */
export function hasUnfinishedClozeCycle() {
  if (canOfferClozeDailyExtra()) return true;
  if (isClozeNewDiscoveryActive()) return true;
  return pickNextClozeRevisionModule(lastClozeServedQuestionId) != null;
}

/** Statistiques du pool consignes (texte à trous) pour un chapitre. */
export function getClozeAxisPoolStats(axisId) {
  let complete = 0;
  let inProgress = 0;
  let untouched = 0;
  let touched = 0;
  let total = 0;

  for (const mod of listClozeModules(axisId)) {
    const q = mod.questions?.[0];
    if (!q?.id) continue;
    if (isClozeConsigneRetired(q.id)) continue;
    total += 1;
    const row = getSrsRow(q.id);
    const prog = getClozeDisplayProgress(q.id, q.answer ?? "");
    if ((row.clozeSeed ?? 0) === 0) untouched += 1;
    else touched += 1;
    if (prog.complete) complete += 1;
    else if (prog.inProgress) inProgress += 1;
  }

  return {
    complete,
    inProgress,
    untouched,
    touched,
    total,
    dailyCompleted: getClozeDailyIntroCountByAxis(axisId),
    dailyOpened: getClozeDailyServeCountByAxis(axisId),
  };
}

/** Quota et pool global consignes (nouvelles du jour). */
export function getClozeDailyPoolStats() {
  return {
    dailyCount: getClozeDailyIntroCount(),
    dailyTarget: getClozeDailyNewTarget(),
    untouchedTotal: countUntouchedClozeConsignes(),
  };
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
