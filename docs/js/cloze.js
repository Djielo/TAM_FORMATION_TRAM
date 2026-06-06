/**
 * Texte à trous — tokens mot à mot (pré-examen lecture).
 */
import { getSrsRow } from "./store.js";

export const CLOZE_INITIAL_BLANKS = 5;
export const CLOZE_BLANK_STEP = 5;

/** Toutes les consignes du ch. circulation (y compris vitesses, une consigne par palier). */
export function isClozePretestModule(axisId, moduleId) {
  return axisId === "circulation";
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

function hashSeed(questionId, clozeSeed) {
  const str = `${questionId}:${clozeSeed}`;
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Choisit les ids de tokens à masquer. */
export function pickBlankSegmentIds(segments, blankCount, questionId, clozeSeed) {
  const ids = segments.map((s) => s.id);
  if (!ids.length || blankCount <= 0) return new Set();

  const rng = mulberry32(hashSeed(questionId, clozeSeed));
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
 * @param {{ blankCount: number, questionId: string, clozeSeed: number, revealedAll?: boolean, revealedBlanks?: Set<string> }} opts
 */
export function renderClozeHtml(raw, opts) {
  const { segments, blocks } = buildClozeSegments(raw);
  const blankIds = pickBlankSegmentIds(
    segments,
    opts.blankCount,
    opts.questionId,
    opts.clozeSeed,
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
