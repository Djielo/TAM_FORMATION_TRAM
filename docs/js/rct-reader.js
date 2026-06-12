/**
 * Consultation intégrale du RCT — panneau plein écran, sommaire, recherche par occurrences (Préc. / Suiv.).
 */

import {
  rctImageSrc,
  RCT_LECTURE_SECTIONS,
  RCT_LECTURE_TOC,
} from "./data-rct-lecture.js";
import {
  flushManuelBackupFromGesture,
  LECTURE_MARKS_KEY,
  maybeOfferManuelRestore,
  scheduleManuelBackupWrite,
} from "./manuel-backup.js";

const READER_STATE = {
  open: false,
  minimized: false,
  /** Intégré sous les onglets app (pas de voile plein écran ni bouton Fermer). */
  embedded: false,
  query: "",
  /** Index de l'occurrence courante (0 = première dans le détail, de haut en bas). */
  searchMatchIndex: 0,
  activeSectionId: RCT_LECTURE_TOC[0]?.id || null,
  /** Sur tactile : sélection manuelle sans barre Google / Chrome. */
  markMode: false,
};

let searchIndex = null;
/** Occurrences <mark> du détail, dans l'ordre du document. */
let searchHits = [];
let overlayEl = null;
/** Navigation sommaire en cours — ne pas restaurer l'ancien scroll contenu. */
let pendingNavSectionId = null;
/** Pause du suivi de scroll pendant une navigation programmée. */
let scrollSpyPaused = false;
let scrollSpyRaf = 0;
/** Réinitialise les écouteurs du menu de surlignage (évite les doublons après refresh). */
let userMarksBindAbort = null;
/** Réinitialise les écouteurs dédiés au focus de la barre de recherche. */
let searchFocusBindAbort = null;

function isReaderSearchTarget(target) {
  return Boolean(
    target?.closest?.(
      ".rct-reader__search-row, .rct-reader__search-wrap, .rct-reader__search-nav, #rct-reader-search, .rct-reader__search-label, [data-reader-search-clear], [data-reader-search-prev], [data-reader-search-next]",
    ),
  );
}

function focusReaderSearch() {
  const input = overlayEl?.querySelector("#rct-reader-search");
  if (!input) return;
  try {
    input.focus({ preventScroll: true });
  } catch {
    input.focus();
  }
}

function escapeHtml(raw) {
  return String(raw)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeSearchText(raw) {
  return String(raw)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function flattenStepItem(item) {
  if (typeof item === "string") return [item];
  if (Array.isArray(item)) return item.flatMap(flattenStepItem);
  if (item?.text && !item?.lines) {
    const parts = [item.text];
    if (item.tail?.text) parts.push(item.tail.text);
    return parts;
  }
  if (item?.lines) {
    return item.lines.flatMap((line) =>
      typeof line === "string" ? [line] : [line.text || "", line.tail?.text || ""].filter(Boolean),
    );
  }
  return [];
}

function sectionPlainText(section) {
  const parts = [section.title, section.code || ""];
  for (const block of section.blocks || []) {
    if (block.text) parts.push(block.text);
    if (block.parts) parts.push(...block.parts.map((p) => p.t || ""));
    if (block.suffix) parts.push(block.suffix);
    if (block.type === "sommaire-ch1" || block.type === "sommaire-ch2") {
      if (block.chapter) parts.push(block.chapter);
      for (const entry of block.entries || []) {
        parts.push(entry.title, String(entry.page ?? ""));
        parts.push(...(entry.subs || []));
      }
    }
    if (block.type === "signal-checks") {
      for (const item of block.items || []) {
        parts.push(item.lead || "", item.sub || "");
      }
    }
    if (block.type === "codes-dest") {
      parts.push(block.title || "");
      if (block.columns) parts.push(...block.columns);
      for (const row of block.rows || []) {
        if (Array.isArray(row)) {
          for (const cell of row) {
            if (!cell) continue;
            if (typeof cell === "string") parts.push(cell);
            else {
              parts.push(cell.code || "", cell.text || "");
              if (cell.textParts) parts.push(...cell.textParts.map((p) => p.t || ""));
            }
          }
        } else {
          parts.push(row.code || "", row.text || "");
          if (row.textParts) parts.push(...row.textParts.map((p) => p.t || ""));
        }
      }
    }
    if (block.type === "signal-table") {
      for (const row of block.rows || []) {
        parts.push(row.lead || "", row.sub || "");
      }
    }
    if (block.type === "tenus-list") {
      for (const item of block.items || []) {
        parts.push(item.n || "", item.text || "");
        if (item.parts) parts.push(...item.parts.map((p) => p.t || ""));
      }
    }
    if (block.type === "codes-cas") {
      for (const panel of [block.left, block.right].filter(Boolean)) {
        parts.push(panel.title || "", panel.ref || "");
        for (const row of panel.rows || []) parts.push(row.code || "", row.text || "");
      }
    }
    if (block.type === "cas-box") {
      parts.push(block.title || "");
      for (const item of block.items || []) {
        parts.push(item.title || "", item.text || "");
      }
    }
    if (block.type === "phase-list") {
      parts.push(...(block.items || []));
    }
    if (block.type === "prio-box") {
      for (const item of block.items || []) {
        parts.push(item.title || "", item.body || "", item.lead || "");
      }
    }
    if (block.type === "zone-steps" || block.type === "zone-table") {
      for (const item of block.items || []) {
        parts.push(item.n || "", item.text || "");
        if (item.parts) parts.push(...item.parts.map((p) => p.t || ""));
        if (item.bullets) {
          for (const bullet of item.bullets) {
            if (bullet.parts) parts.push(...bullet.parts.map((p) => p.t || ""));
            else parts.push(bullet.text || (typeof bullet === "string" ? bullet : ""));
          }
        }
        const extras = item.extra ? [item.extra] : item.extras || [];
        for (const chunk of extras) {
          if (chunk.parts) parts.push(...chunk.parts.map((p) => p.t || ""));
          else parts.push(chunk.text || "");
        }
      }
    }
    if (block.type === "flow-table") {
      for (const item of block.items || []) {
        parts.push(item.text || "");
        if (item.parts) parts.push(...item.parts.map((p) => p.t || ""));
      }
    }
    if (block.type === "arrow-ul" || block.type === "hand-ul") {
      for (const item of block.items || []) {
        if (typeof item === "string") parts.push(item);
        else if (item.parts) parts.push(...item.parts.map((p) => p.t || ""));
        else parts.push(item.text || "");
      }
    }
    if (block.type === "phase-list") {
      for (const item of block.items || []) {
        if (typeof item === "string") parts.push(item);
        else {
          parts.push(item.n || "", item.text || "");
          if (item.parts) parts.push(...item.parts.map((p) => p.t || ""));
        }
      }
    }
    if (block.type === "vitesse-table") {
      parts.push(...(block.speeds || []));
      for (const row of block.rows || []) {
        parts.push(row.label || "", row.highlight || "");
        parts.push(...(row.highlights || []));
        if (row.spanNote) parts.push(row.spanNote.text || "");
        if (row.notes) parts.push(...Object.values(row.notes));
      }
    }
    if (block.type === "boxed" || block.type === "callout-box") {
      parts.push(sectionPlainText({ blocks: block.blocks || [] }));
    }
    if (block.type === "chapter-banner") {
      parts.push(block.text || "");
    }
    if (block.type === "sat-codes") {
      for (const table of block.tables || []) {
        parts.push(table.title || "");
        for (const row of table.rows || []) {
          if (row.parts) parts.push(...row.parts.map((p) => p.t || ""));
          parts.push(row.code || "");
        }
      }
    }
    if (block.type === "client-message-panel") {
      for (const col of block.columns || []) {
        parts.push(col.title || "");
        parts.push(sectionPlainText({ blocks: col.blocks || [] }));
        if (col.text) parts.push(col.text);
      }
    }
    if (block.caption) parts.push(block.caption);
    if (block.type === "version-table") {
      for (const entry of block.entries || []) {
        parts.push(entry.version, entry.date);
        for (const line of entry.lines || []) {
          parts.push(line.text, line.art || "");
        }
      }
    }
    if (block.type === "steps") {
      for (const item of block.items || []) parts.push(...flattenStepItem(item));
    }
    if (block.items) {
      parts.push(
        ...block.items.map((item) =>
          typeof item === "string" ? item : item?.text || "",
        ),
      );
    }
    if (block.headers) {
      for (const h of block.headers) {
        parts.push(typeof h === "string" ? h : h.title || "", typeof h === "string" ? "" : h.speed || "");
      }
    }
    if (block.type === "table" && block.rows) {
      for (const row of block.rows) {
        if (Array.isArray(row)) parts.push(...row.map(String));
      }
    }
    if (block.type === "pannes-table") {
      for (const h of block.headers || []) {
        parts.push(h.title || "", h.speed || "");
      }
      for (const row of block.rows || []) {
        for (const cell of row) {
          if (!cell) continue;
          parts.push(cell.text || "");
          if (cell.speed) parts.push(cell.speed);
          for (const line of cell.lines || []) {
            parts.push(line.text || "", line.speed || "");
          }
        }
      }
      parts.push(...(block.footnotes || []));
    }
    if (block.bullets) parts.push(...block.bullets);
    if (block.lines) {
      for (const line of block.lines) {
        if (line.text) parts.push(line.text);
        if (line.parts) parts.push(...line.parts.map((p) => p.t || ""));
      }
    }
  }
  return parts.join(" ");
}

function renderInlineParts(parts, queryNorm) {
  return (parts || [])
    .map((part) => {
      const classes = [];
      if (part.red) classes.push("lecture-inline--red");
      if (part.green) classes.push("lecture-inline--green");
      if (part.blue) classes.push("lecture-inline--blue");
      if (part.purple) classes.push("lecture-inline--purple");
      if (part.bold) classes.push("lecture-inline--bold");
      if (part.underline) classes.push("lecture-inline--underline");
      if (part.italic) classes.push("lecture-inline--italic");
      if (part.orange) classes.push("lecture-inline--orange");
      const chunk = highlightText(part.t, queryNorm);
      return classes.length ? `<span class="${classes.join(" ")}">${chunk}</span>` : chunk;
    })
    .join("");
}

function renderZoneTableBody(item, queryNorm) {
  let body = "";
  if (item.bullets?.length) {
    body = item.bullets
      .map((bullet) => {
        const chunk = bullet.parts?.length
          ? renderInlineParts(bullet.parts, queryNorm)
          : highlightText(bullet.text || (typeof bullet === "string" ? bullet : ""), queryNorm);
        return `<div class="lecture-zone-table__bullet">${chunk.startsWith("•") ? chunk : `• ${chunk}`}</div>`;
      })
      .join("");
  } else {
    body = item.parts?.length
      ? renderInlineParts(item.parts, queryNorm)
      : highlightText(item.text || "", queryNorm);
  }
  const extras = item.extra ? [item.extra] : item.extras || [];
  for (const chunk of extras) {
    if (chunk.parts?.length) {
      body += `<div class="lecture-zone-table__extra">${renderInlineParts(chunk.parts, queryNorm)}</div>`;
    } else {
      body += `<div class="lecture-zone-table__extra">${highlightText(chunk.text || "", queryNorm)}</div>`;
    }
  }
  return body;
}

function renderZoneTable(block, queryNorm) {
  return `<div class="lecture-table-wrap"><table class="lecture-table lecture-table--zone"><tbody>${(block.items || [])
    .map((item) => {
      const numCls = item.nColor ? ` lecture-zone-table__num--${item.nColor}` : "";
      const chevronCls = item.marker === "chevron" ? " lecture-zone-table__num--chevron" : "";
      const marker =
        item.marker === "chevron"
          ? `<span aria-hidden="true">▼</span>`
          : item.n
            ? highlightText(item.n, queryNorm)
            : "";
      const num =
        item.n || item.marker === "chevron"
          ? `<td class="lecture-zone-table__num${numCls}${chevronCls}">${marker}</td>`
          : "<td></td>";
      const boxedCls = item.boxed
        ? ` lecture-zone-table__text--boxed${item.nColor ? ` lecture-zone-table__text--boxed-${item.nColor}` : ""}`
        : "";
      const rowColorCls = item.rowColor ? ` lecture-zone-table__text--${item.rowColor}` : "";
      const body = renderZoneTableBody(item, queryNorm);
      return `<tr>${num}<td class="lecture-zone-table__text${boxedCls}${rowColorCls}">${body}</td></tr>`;
    })
    .join("")}</tbody></table></div>`;
}

function renderFlowTable(block, queryNorm) {
  const rows = [];
  const items = block.items || [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const alignCls = item.align === "left" ? " lecture-flow-table__cell--left" : " lecture-flow-table__cell--center";
    const colorCls = item.color ? ` lecture-flow-table__cell--${item.color}` : "";
    const body = item.parts?.length
      ? renderInlineParts(item.parts, queryNorm)
      : highlightText(item.text || "", queryNorm);
    const prefix = item.noArrow ? "" : `<span class="lecture-flow-table__arrow" aria-hidden="true">➔</span>`;
    rows.push(
      `<tr><td class="lecture-flow-table__cell${alignCls}${colorCls}">${prefix}${body}</td></tr>`,
    );
    if (block.connector !== false && i < items.length - 1) {
      rows.push(`<tr class="lecture-flow-table__connector"><td aria-hidden="true">▼</td></tr>`);
    }
  }
  return `<div class="lecture-table-wrap"><table class="lecture-table lecture-table--flow"><tbody>${rows.join("")}</tbody></table></div>`;
}

function renderClientMessagePanel(block, queryNorm) {
  const tone =
    block.tone === "accent"
      ? " lecture-client-messages--accent"
      : " lecture-client-messages--soft";
  const renderCell = (col, colspan) => {
    const title = col.title
      ? `<div class="lecture-client-messages__title">${highlightText(col.title, queryNorm)}</div>`
      : "";
    const body = col.blocks?.length
      ? renderNestedBlocks(col.blocks, queryNorm)
      : col.text
        ? `<p class="lecture-client-messages__text">${highlightText(col.text, queryNorm)}</p>`
        : "";
    const span = colspan ? ` colspan="${colspan}"` : "";
    return `<td class="lecture-client-messages__cell"${span}>${title}${body}</td>`;
  };
  const cols = block.columns || [];
  if (!cols.length) return "";
  const cells =
    block.fullWidth && cols.length === 1
      ? renderCell(cols[0], 2)
      : cols.map((col) => renderCell(col)).join("");
  return `<div class="lecture-table-wrap lecture-table-wrap--client-messages"><table class="lecture-table lecture-client-messages${tone}"><tbody><tr>${cells}</tr></tbody></table></div>`;
}

function renderPannesCell(cell, queryNorm) {
  if (!cell) return "";
  const chunks = [];
  if (cell.text) {
    const inner = cell.bold
      ? `<strong>${highlightText(cell.text, queryNorm)}</strong>`
      : highlightText(cell.text, queryNorm);
    chunks.push(`<span class="lecture-pannes__text">${inner}</span>`);
  }
  if (cell.marker) {
    chunks.push(
      `<span class="lecture-pannes__marker">${highlightText(cell.marker, queryNorm)}</span>`,
    );
  }
  if (cell.speed) {
    chunks.push(
      `<span class="lecture-pannes__speed">${highlightText(cell.speed, queryNorm)}</span>`,
    );
  }
  for (const line of cell.lines || []) {
    if (line.text) {
      const inner = highlightText(line.text, queryNorm);
      const marker = line.marker
        ? ` <span class="lecture-pannes__marker">${highlightText(line.marker, queryNorm)}</span>`
        : "";
      chunks.push(`<div class="lecture-pannes__line">${inner}${marker}</div>`);
    }
    if (line.speed) {
      chunks.push(
        `<div class="lecture-pannes__speed">${highlightText(line.speed, queryNorm)}</div>`,
      );
    }
  }
  return chunks.join("");
}

function anchorSearchText(anchorId) {
  const parent = RCT_LECTURE_SECTIONS.find((s) =>
    (s.blocks || []).some((b) => b.type === "anchor" && b.id === anchorId),
  );
  if (!parent) return "";
  const blocks = parent.blocks || [];
  const start = blocks.findIndex((b) => b.type === "anchor" && b.id === anchorId);
  if (start < 0) return "";
  const parts = [];
  for (let i = start + 1; i < blocks.length; i++) {
    if (blocks[i].type === "anchor") break;
    parts.push(sectionPlainText({ blocks: [blocks[i]] }));
  }
  return parts.join(" ");
}

function buildSearchIndex() {
  return RCT_LECTURE_TOC.map((entry) => {
    if (entry.anchorOnly) {
      return {
        sectionId: entry.id,
        plain: normalizeSearchText(
          [entry.title, entry.code || "", anchorSearchText(entry.id)].join(" "),
        ),
        title: entry.title,
        code: entry.code,
        page: entry.page,
      };
    }
    const section = RCT_LECTURE_SECTIONS.find((s) => s.id === entry.id);
    return {
      sectionId: entry.id,
      plain: normalizeSearchText(section ? sectionPlainText(section) : entry.title),
      title: entry.title,
      code: entry.code,
      page: entry.page,
    };
  });
}

function getSearchIndex() {
  if (!searchIndex) searchIndex = buildSearchIndex();
  return searchIndex;
}

function sectionMatchesQuery(sectionId, queryNorm) {
  if (!queryNorm) return true;
  const hit = getSearchIndex().find((row) => row.sectionId === sectionId);
  return hit ? hit.plain.includes(queryNorm) : false;
}

function sectionContentVisible(sectionId, queryNorm) {
  if (!queryNorm) return true;
  if (sectionMatchesQuery(sectionId, queryNorm)) return true;
  return RCT_LECTURE_TOC.some(
    (entry) =>
      entry.anchorOnly &&
      entry.parentId === sectionId &&
      sectionMatchesQuery(entry.id, queryNorm),
  );
}

function renderListItemBody(item, queryNorm) {
  if (typeof item === "string") {
    return highlightText(item, queryNorm);
  }
  if (item?.parts?.length) {
    return renderInlineParts(item.parts, queryNorm);
  }
  const text = item.text || "";
  return item.bold === true
    ? `<strong>${highlightText(text, queryNorm)}</strong>`
    : highlightText(text, queryNorm);
}

function findTermRanges(raw, term, occupied) {
  const tnorm = normalizeSearchText(term);
  if (!tnorm) return;
  const norm = normalizeSearchText(raw);
  let pos = 0;
  while (pos < norm.length) {
    const idx = norm.indexOf(tnorm, pos);
    if (idx < 0) break;
    const end = idx + tnorm.length;
    const overlaps = occupied.some((r) => !(end <= r.start || idx >= r.end));
    if (!overlaps) occupied.push({ start: idx, end });
    pos = idx + 1;
  }
}

function highlightText(text, queryNorm) {
  const raw = String(text);
  if (!queryNorm) return escapeHtml(raw);
  const terms = [...new Set(String(queryNorm).split(/\s+/).filter(Boolean))];
  if (!terms.length) return escapeHtml(raw);

  const ranges = [];
  terms.forEach((term) => findTermRanges(raw, term, ranges));
  if (!ranges.length) return escapeHtml(raw);

  ranges.sort((a, b) => a.start - b.start || a.end - b.end);
  let html = "";
  let cursor = 0;
  for (const range of ranges) {
    if (range.start < cursor) continue;
    html += escapeHtml(raw.slice(cursor, range.start));
    html += `<mark class="rct-reader__mark" data-search-hit>${escapeHtml(raw.slice(range.start, range.end))}</mark>`;
    cursor = range.end;
  }
  html += escapeHtml(raw.slice(cursor));
  return html;
}

function refreshSearchHitList() {
  const inner = overlayEl?.querySelector(".rct-reader__content-inner");
  searchHits = inner ? [...inner.querySelectorAll("mark[data-search-hit]")] : [];
}

function getSectionIdFromSearchHit(el) {
  return el?.closest("[data-reader-article]")?.getAttribute("data-reader-article") || null;
}

/** @param {"next"|"prev"} direction — Suiv. : occurrence en haut ; Préc. : en bas si possible. */
function scrollToSearchHit(mark, direction = "next") {
  const root = overlayEl?.querySelector(".rct-reader__content");
  if (!root || !mark) return;
  pauseScrollSpy(1200);

  const topInset = 14;
  const bottomInset = 14;

  const position = () => {
    const rootRect = root.getBoundingClientRect();
    const markRect = mark.getBoundingClientRect();
    if (!mark.isConnected) return;
    const markTop = markRect.top - rootRect.top + root.scrollTop;
    const maxScroll = Math.max(0, root.scrollHeight - root.clientHeight);
    let target;
    if (direction === "prev") {
      target = markTop - root.clientHeight + markRect.height + bottomInset;
    } else {
      target = markTop - topInset;
    }
    root.scrollTo({ top: Math.max(0, Math.min(target, maxScroll)), behavior: "smooth" });
  };

  position();
  requestAnimationFrame(() => {
    position();
    requestAnimationFrame(position);
  });

  mark.closest("[data-reader-article]")?.querySelectorAll("img").forEach((img) => {
    if (!img.complete) img.addEventListener("load", position, { once: true });
  });
}

function updateSearchNavUi() {
  const meta = overlayEl?.querySelector(".rct-reader__search-meta");
  const prev = overlayEl?.querySelector("[data-reader-search-prev]");
  const next = overlayEl?.querySelector("[data-reader-search-next]");
  const query = READER_STATE.query.trim();
  const queryNorm = normalizeSearchText(query);
  const total = searchHits.length;
  const idx = READER_STATE.searchMatchIndex;

  if (meta) {
    if (!queryNorm) meta.textContent = "";
    else if (!total) meta.textContent = `Aucune occurrence de « ${query} »`;
    else meta.textContent = `${idx + 1} / ${total}`;
  }

  if (prev) prev.disabled = !queryNorm || total === 0 || idx <= 0;
  if (next) next.disabled = !queryNorm || total === 0 || idx >= total - 1;
}

function setSearchMatchIndex(index, options = {}) {
  const queryNorm = normalizeSearchText(READER_STATE.query.trim());
  if (!queryNorm || !searchHits.length) {
    READER_STATE.searchMatchIndex = 0;
    searchHits.forEach((el) => el.classList.remove("rct-reader__mark--current"));
    updateSearchNavUi();
    return;
  }

  const prevIndex = READER_STATE.searchMatchIndex;
  const clamped = Math.max(0, Math.min(index, searchHits.length - 1));
  const direction =
    options.direction ||
    (clamped > prevIndex ? "next" : clamped < prevIndex ? "prev" : "next");
  READER_STATE.searchMatchIndex = clamped;

  searchHits.forEach((el, i) => {
    el.classList.toggle("rct-reader__mark--current", i === clamped);
  });

  const hit = searchHits[clamped];
  if (hit && options.scroll !== false) {
    scrollToSearchHit(hit, direction);
  }

  const sectionId = getSectionIdFromSearchHit(hit);
  if (sectionId) {
    READER_STATE.activeSectionId = sectionId;
    highlightTocItem(sectionId);
    scrollTocToActive(sectionId, "auto");
  }

  updateSearchNavUi();
}

const USER_MARKS_KEY = LECTURE_MARKS_KEY;
const USER_MARKS_KEY_LEGACY = "rct-lecture-user-marks";
const USER_MARK_COLORS = [
  { id: "yellow", label: "Jaune" },
  { id: "blue", label: "Bleu" },
  { id: "green", label: "Vert" },
  { id: "red", label: "Rouge" },
  { id: "purple", label: "Violet" },
];

function loadUserMarks() {
  try {
    const raw =
      localStorage.getItem(USER_MARKS_KEY) ||
      localStorage.getItem(USER_MARKS_KEY_LEGACY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUserMarks(marks) {
  try {
    localStorage.setItem(USER_MARKS_KEY, JSON.stringify(marks));
    if (localStorage.getItem(USER_MARKS_KEY_LEGACY)) {
      localStorage.removeItem(USER_MARKS_KEY_LEGACY);
    }
    scheduleManuelBackupWrite();
  } catch (err) {
    console.warn("Sauvegarde des surlignages RCT impossible :", err);
  }
}

function reapplyMarksInPlace() {
  const content = overlayEl?.querySelector(".rct-reader__content");
  if (!content) return;
  applyUserMarks(content);
  syncAllUserMarksFromDom(content);
}

function newMarkId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function isMarkableTextNode(node) {
  if (!node || node.nodeType !== Node.TEXT_NODE) return false;
  const parent = node.parentElement;
  if (!parent) return false;
  if (parent.closest(".lecture-page-scan, .rct-reader__mark-menu")) return false;
  return true;
}

function getMarkColorId(span) {
  for (const c of USER_MARK_COLORS) {
    if (span.classList.contains(`lecture-user-mark--${c.id}`)) return c.id;
  }
  return null;
}

function getArticlePlainText(article) {
  const walker = createTextWalker(article);
  let text = "";
  while (walker.nextNode()) {
    text += walker.currentNode.textContent || "";
  }
  return text;
}

function getNodeStartOffset(article, node) {
  const walker = createTextWalker(article);
  let count = 0;
  while (walker.nextNode()) {
    const textNode = walker.currentNode;
    if (node.contains(textNode)) return count;
    count += textNode.length;
  }
  return count;
}

function rangeIntersectsUserMark(range, article) {
  if (!range || range.collapsed) return false;
  const root =
    range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? range.commonAncestorContainer
      : range.commonAncestorContainer.parentElement;
  if (root?.closest(".lecture-user-mark")) return true;
  return [...article.querySelectorAll(".lecture-user-mark")].some((span) =>
    range.intersectsNode(span),
  );
}

function getIntersectionRange(a, b) {
  if (
    a.compareBoundaryPoints(Range.END_TO_START, b) > 0 ||
    b.compareBoundaryPoints(Range.END_TO_START, a) > 0
  ) {
    return null;
  }
  const range = document.createRange();
  if (a.compareBoundaryPoints(Range.START_TO_START, b) <= 0) {
    range.setStart(b.startContainer, b.startOffset);
  } else {
    range.setStart(a.startContainer, a.startOffset);
  }
  if (a.compareBoundaryPoints(Range.END_TO_END, b) >= 0) {
    range.setEnd(b.endContainer, b.endOffset);
  } else {
    range.setEnd(a.endContainer, a.endOffset);
  }
  return range;
}

function createTextWalker(root) {
  return document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return isMarkableTextNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
}

function getPlainTextOffsetInArticle(article, container, offset) {
  const walker = createTextWalker(article);
  let count = 0;
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node === container) return count + offset;
    count += node.length;
  }
  return count;
}

function findTextRangeByOffset(article, start, length) {
  const walker = createTextWalker(article);
  let charCount = 0;
  let startNode = null;
  let startOff = 0;
  let endNode = null;
  let endOff = 0;
  let remaining = length;
  let foundStart = false;

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const len = node.length;
    if (!foundStart) {
      if (charCount + len > start) {
        startNode = node;
        startOff = start - charCount;
        foundStart = true;
        const avail = len - startOff;
        if (avail >= length) {
          endNode = node;
          endOff = startOff + length;
          break;
        }
        remaining = length - avail;
      }
    } else if (remaining <= len) {
      endNode = node;
      endOff = remaining;
      break;
    } else {
      remaining -= len;
    }
    charCount += len;
  }

  if (!startNode || !endNode) return null;
  const range = document.createRange();
  range.setStart(startNode, startOff);
  range.setEnd(endNode, endOff);
  return range;
}

function createUserMarkSpan(color, markId) {
  const span = document.createElement("span");
  span.className = `lecture-user-mark lecture-user-mark--${color}`;
  span.dataset.userMarkId = markId || newMarkId();
  return span;
}

function wrapRangeWithMark(range, color, markId) {
  if (!range || range.collapsed) return null;
  const span = createUserMarkSpan(color, markId);
  const contents = range.extractContents();
  span.appendChild(contents);
  range.insertNode(span);
  return span;
}

function collectUserMarksFromArticle(article, sectionId) {
  const sectionMarks = [];
  article.querySelectorAll(".lecture-user-mark[data-user-mark-id]").forEach((span) => {
    const color = getMarkColorId(span);
    const text = span.textContent || "";
    if (!color || !text) return;
    sectionMarks.push({
      id: span.dataset.userMarkId,
      sectionId,
      text,
      color,
      offset: getNodeStartOffset(article, span),
    });
  });
  return sectionMarks;
}

function syncUserMarksForSection(article, sectionId) {
  const others = loadUserMarks().filter((m) => m.sectionId !== sectionId);
  saveUserMarks([...others, ...collectUserMarksFromArticle(article, sectionId)]);
}

function syncAllUserMarksFromDom(root) {
  const all = [];
  root.querySelectorAll("[data-reader-article]").forEach((article) => {
    const sectionId = article.getAttribute("data-reader-article");
    if (!sectionId) return;
    all.push(...collectUserMarksFromArticle(article, sectionId));
  });
  if (all.length) saveUserMarks(all);
}

function eraseUserMarksInRange(range, article) {
  if (!range || range.collapsed) return false;
  const spans = [...article.querySelectorAll(".lecture-user-mark")].filter((span) =>
    range.intersectsNode(span),
  );
  if (!spans.length) return false;

  for (const span of spans) {
    const spanRange = document.createRange();
    spanRange.selectNodeContents(span);
    const intersection = getIntersectionRange(range, spanRange);
    if (!intersection) continue;

    const fullCover =
      intersection.compareBoundaryPoints(Range.START_TO_START, spanRange) === 0 &&
      intersection.compareBoundaryPoints(Range.END_TO_END, spanRange) === 0;

    if (fullCover) {
      unwrapUserMark(span);
      continue;
    }

    const color = getMarkColorId(span);
    const parent = span.parentNode;
    if (!parent || !color) continue;

    const frag = document.createDocumentFragment();
    const beforeRange = document.createRange();
    beforeRange.setStart(spanRange.startContainer, spanRange.startOffset);
    beforeRange.setEnd(intersection.startContainer, intersection.startOffset);
    const beforeText = beforeRange.toString();
    if (beforeText) {
      const beforeSpan = createUserMarkSpan(color, newMarkId());
      beforeSpan.textContent = beforeText;
      frag.appendChild(beforeSpan);
    }

    const midText = intersection.toString();
    if (midText) frag.appendChild(document.createTextNode(midText));

    const afterRange = document.createRange();
    afterRange.setStart(intersection.endContainer, intersection.endOffset);
    afterRange.setEnd(spanRange.endContainer, spanRange.endOffset);
    const afterText = afterRange.toString();
    if (afterText) {
      const afterSpan = createUserMarkSpan(color, newMarkId());
      afterSpan.textContent = afterText;
      frag.appendChild(afterSpan);
    }

    parent.replaceChild(frag, span);
    parent.normalize();
  }

  return true;
}

function findMarkRangeInArticle(article, mark) {
  const expected = mark.text;
  if (!expected) return null;

  const tryOffset = (off) => {
    const range = findTextRangeByOffset(article, off, expected.length);
    return range?.toString() === expected ? range : null;
  };

  if (typeof mark.offset === "number" && mark.offset >= 0) {
    const exact = tryOffset(mark.offset);
    if (exact) return exact;
  }

  const plain = getArticlePlainText(article);
  const candidates = [];
  let from = 0;
  while (from <= plain.length) {
    const idx = plain.indexOf(expected, from);
    if (idx < 0) break;
    candidates.push(idx);
    from = idx + 1;
  }
  if (!candidates.length) return null;

  if (typeof mark.offset === "number" && mark.offset >= 0) {
    const nearest = candidates.reduce((best, idx) =>
      Math.abs(idx - mark.offset) < Math.abs(best - mark.offset) ? idx : best,
    );
    const near = tryOffset(nearest);
    if (near) return near;
  }

  for (const idx of candidates) {
    const range = tryOffset(idx);
    if (range) return range;
  }

  return null;
}

function applyUserMarks(root) {
  const marks = loadUserMarks()
    .filter((mark) => mark.sectionId && mark.text && mark.color)
    .sort((a, b) => {
      if (a.sectionId !== b.sectionId) return a.sectionId.localeCompare(b.sectionId);
      return (b.offset ?? 0) - (a.offset ?? 0);
    });

  for (const mark of marks) {
    const article = root.querySelector(`#reader-${CSS.escape(mark.sectionId)}`);
    if (!article || article.querySelector(`[data-user-mark-id="${CSS.escape(mark.id)}"]`)) {
      continue;
    }
    const range = findMarkRangeInArticle(article, mark);
    if (!range) continue;
    wrapRangeWithMark(range, mark.color, mark.id);
  }
}

function unwrapUserMark(span) {
  const parent = span.parentNode;
  if (!parent) return;
  while (span.firstChild) parent.insertBefore(span.firstChild, span);
  parent.removeChild(span);
  parent.normalize();
}

function renderMarkMenuMarkup() {
  const swatches = USER_MARK_COLORS.map(
    (c) =>
      `<button type="button" class="rct-reader__mark-color rct-reader__mark-color--${c.id}" data-mark-color="${c.id}" title="${c.label}" aria-label="Surligner en ${c.label.toLowerCase()}"></button>`,
  ).join("");
  return `<div class="rct-reader__mark-menu" id="rct-reader-mark-menu" hidden role="toolbar" aria-label="Surligner la sélection">
    <span class="rct-reader__mark-menu-label">Surligner :</span>
    ${swatches}
    <button type="button" class="rct-reader__mark-erase" data-mark-erase hidden title="Effacer le surlignage" aria-label="Effacer le surlignage">⌫</button>
    <button type="button" class="rct-reader__mark-close" data-mark-close title="Fermer" aria-label="Fermer le menu">×</button>
  </div>`;
}

function isTouchUi() {
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

function caretRangeFromPoint(x, y) {
  if (document.caretRangeFromPoint) return document.caretRangeFromPoint(x, y);
  const pos = document.caretPositionFromPoint?.(x, y);
  if (!pos) return null;
  const range = document.createRange();
  range.setStart(pos.offsetNode, pos.offset);
  range.collapse(true);
  return range;
}

function getArticleFromRange(range) {
  const root = range.commonAncestorContainer;
  const el = root.nodeType === Node.ELEMENT_NODE ? root : root.parentElement;
  return el?.closest("[data-reader-article]") ?? null;
}

function orderRange(a, b) {
  const range = document.createRange();
  if (a.compareBoundaryPoints(Range.START_TO_START, b) <= 0) {
    range.setStart(a.startContainer, a.startOffset);
    range.setEnd(b.endContainer, b.endOffset);
  } else {
    range.setStart(b.startContainer, b.startOffset);
    range.setEnd(a.endContainer, a.endOffset);
  }
  return range;
}

function expandRangeToWord(range) {
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE || !isMarkableTextNode(node)) {
    return range.cloneRange();
  }
  const text = node.textContent || "";
  const off = Math.min(range.startOffset, text.length);
  const wordRe = /[\p{L}\p{N}'’\-]+/gu;
  let match;
  while ((match = wordRe.exec(text)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    if (off >= start && off <= end) {
      const word = document.createRange();
      word.setStart(node, start);
      word.setEnd(node, end);
      return word;
    }
  }
  return range.cloneRange();
}

function clearPendingHighlightPreview() {
  if (typeof CSS !== "undefined" && CSS.highlights) {
    CSS.highlights.delete("rct-reader-pending");
  }
  const preview = overlayEl?._pendingPreviewSpan;
  if (preview?.isConnected) unwrapUserMark(preview);
  overlayEl._pendingPreviewSpan = null;
}

function setPendingHighlightPreview(range) {
  clearPendingHighlightPreview();
  if (!range || range.collapsed) return;

  if (typeof CSS !== "undefined" && CSS.highlights && typeof Highlight !== "undefined") {
    try {
      CSS.highlights.set("rct-reader-pending", new Highlight(range.cloneRange()));
      return;
    } catch {
      /* repli span ci-dessous */
    }
  }

  const previewRange = range.cloneRange();
  const span = createUserMarkSpan("yellow", "preview-temp");
  span.classList.add("lecture-user-mark--preview");
  try {
    previewRange.surroundContents(span);
  } catch {
    span.appendChild(previewRange.extractContents());
    previewRange.insertNode(span);
  }
  overlayEl._pendingPreviewSpan = span;
}

function dismissNativeSelection() {
  requestAnimationFrame(() => {
    window.getSelection()?.removeAllRanges();
    requestAnimationFrame(() => window.getSelection()?.removeAllRanges());
  });
}

function positionMarkMenu(menu, rect) {
  menu.classList.remove("rct-reader__mark-menu--dock");
  menu.hidden = false;

  const pad = 8;
  const topBar = 64;
  const bottomSafe = isTouchUi() ? window.innerHeight * 0.58 : window.innerHeight - pad;
  const menuW = menu.offsetWidth || (isTouchUi() ? 300 : 220);
  const menuH = menu.offsetHeight || (isTouchUi() ? 48 : 40);

  let left = rect.left + rect.width / 2 - menuW / 2;
  let top = rect.top + rect.height / 2 - menuH / 2;

  if (top < topBar) top = rect.bottom + pad;
  if (top + menuH > bottomSafe) top = rect.top - menuH - pad;
  if (top + menuH > bottomSafe) top = rect.top + Math.max(4, (rect.height - menuH) / 2);
  if (top < topBar) top = topBar;

  left = Math.max(pad, Math.min(left, window.innerWidth - menuW - pad));
  top = Math.max(topBar, Math.min(top, window.innerHeight - menuH - pad));

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  menu.style.right = "";
  menu.style.bottom = "";
}

function captureMarkPending(range, article, menu) {
  const sectionId = article.getAttribute("data-reader-article");
  const touchesMark = rangeIntersectsUserMark(range, article);
  const startOff = getPlainTextOffsetInArticle(
    article,
    range.startContainer,
    range.startOffset,
  );
  const endOff = getPlainTextOffsetInArticle(
    article,
    range.endContainer,
    range.endOffset,
  );
  overlayEl._markPending = {
    range: range.cloneRange(),
    sectionId,
    touchesMark,
    anchorRect: range.getBoundingClientRect(),
    startOff,
    endOff,
    text: range.toString(),
  };

  const eraseBtn = menu.querySelector("[data-mark-erase]");
  if (eraseBtn) eraseBtn.hidden = !touchesMark;

  menu.hidden = false;
  positionMarkMenu(menu, overlayEl._markPending.anchorRect);
}

function hideMarkMenu() {
  const menu = overlayEl?.querySelector("#rct-reader-mark-menu");
  if (!menu) return;
  menu.hidden = true;
  overlayEl._markPending = null;
  clearPendingHighlightPreview();
}

function commitMarkCapture(range, article, menu, options = {}) {
  if (!range?.toString().trim()) return;
  captureMarkPending(range, article, menu);
  setPendingHighlightPreview(overlayEl._markPending.range);
  if (options.dismissNative !== false && isTouchUi() && !READER_STATE.markMode) {
    dismissNativeSelection();
  }
}

function bindUserMarks(content) {
  userMarksBindAbort?.abort();
  const ac = new AbortController();
  userMarksBindAbort = ac;

  const menu = overlayEl?.querySelector("#rct-reader-mark-menu");
  if (!menu || !content) return;

  let suppressMenuShow = false;
  let selectionChangeTimer = 0;

  const closeMarkMenu = () => {
    hideMarkMenu();
    if (document.activeElement?.id === "rct-reader-search") return;
    window.getSelection()?.removeAllRanges();
  };

  const showMenuForSelection = () => {
    if (suppressMenuShow || READER_STATE.markMode) return;

    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) {
      const pendingText = overlayEl._markPending?.text?.trim();
      if (!menu.hidden && pendingText) return;
      hideMarkMenu();
      return;
    }

    const range = sel.getRangeAt(0);
    if (!content.contains(range.commonAncestorContainer)) {
      hideMarkMenu();
      return;
    }

    const article = getArticleFromRange(range);
    if (!article) {
      hideMarkMenu();
      return;
    }

    if (!range.toString().trim()) {
      hideMarkMenu();
      return;
    }

    commitMarkCapture(range, article, menu);
  };

  const queueShowMenuForSelection = (delayMs = 10) => {
    window.clearTimeout(selectionChangeTimer);
    selectionChangeTimer = window.setTimeout(showMenuForSelection, delayMs);
  };

  let touchMark = null;

  const bindMarkModeTouch = () => {
    content.addEventListener(
      "touchstart",
      (ev) => {
        if (!READER_STATE.markMode || ev.touches.length !== 1) return;
        const t = ev.touches[0];
        const caret = caretRangeFromPoint(t.clientX, t.clientY);
        if (!caret || !content.contains(caret.startContainer)) return;
        touchMark = { x: t.clientX, y: t.clientY, start: caret.cloneRange(), moved: false };
      },
      { passive: true, signal: ac.signal },
    );

    content.addEventListener(
      "touchmove",
      (ev) => {
        if (!READER_STATE.markMode || !touchMark || ev.touches.length !== 1) return;
        const t = ev.touches[0];
        if (Math.hypot(t.clientX - touchMark.x, t.clientY - touchMark.y) < 12) return;
        touchMark.moved = true;
        const end = caretRangeFromPoint(t.clientX, t.clientY);
        if (!end) return;
        const range = orderRange(touchMark.start, end);
        const article = getArticleFromRange(range);
        if (!article || !range.toString().trim()) return;
        commitMarkCapture(range, article, menu, { dismissNative: false });
      },
      { passive: true, signal: ac.signal },
    );

    content.addEventListener(
      "touchend",
      () => {
        if (!READER_STATE.markMode || !touchMark) return;
        if (!touchMark.moved) {
          const word = expandRangeToWord(touchMark.start);
          const article = getArticleFromRange(word);
          if (article && word.toString().trim()) {
            commitMarkCapture(word, article, menu, { dismissNative: false });
          }
        }
        touchMark = null;
      },
      { passive: true, signal: ac.signal },
    );
  };

  bindMarkModeTouch();

  content.addEventListener("mouseup", () => queueShowMenuForSelection(10), {
    signal: ac.signal,
  });

  content.addEventListener(
    "touchend",
    (ev) => {
      if (isReaderSearchTarget(ev.target)) return;
      if (!READER_STATE.markMode) queueShowMenuForSelection(isTouchUi() ? 60 : 40);
    },
    { passive: true, signal: ac.signal },
  );

  document.addEventListener(
    "selectionchange",
    () => {
      if (suppressMenuShow || READER_STATE.markMode) return;
      queueShowMenuForSelection(isTouchUi() ? 40 : 30);
    },
    { signal: ac.signal },
  );

  content.addEventListener(
    "scroll",
    () => {
      closeMarkMenu();
    },
    { passive: true, signal: ac.signal },
  );

  const handlePointerOutsideMenu = (ev) => {
    if (!overlayEl?.contains(ev.target)) return;
    if (isReaderSearchTarget(ev.target)) return;
    const liveMenu = overlayEl.querySelector("#rct-reader-mark-menu");
    if (liveMenu?.contains(ev.target)) return;

    if (isTouchUi() && liveMenu && !liveMenu.hidden && overlayEl._markPending) {
      if (content.contains(ev.target)) closeMarkMenu();
      else if (
        ev.target.closest(
          "[data-reader-close], [data-reader-minimize], .rct-reader__sidebar, .rct-reader__chrome",
        )
      ) {
        closeMarkMenu();
      }
      return;
    }

    closeMarkMenu();
  };

  document.addEventListener("mousedown", handlePointerOutsideMenu, { signal: ac.signal });
  document.addEventListener("touchstart", handlePointerOutsideMenu, {
    passive: true,
    signal: ac.signal,
  });

  menu.addEventListener(
    "pointerdown",
    (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      suppressMenuShow = true;
      window.setTimeout(() => {
        suppressMenuShow = false;
      }, 450);

      const pending = overlayEl._markPending;
      if (!pending?.range || !pending.sectionId) {
        if (ev.target.closest("[data-mark-close]")) closeMarkMenu();
        return;
      }

      const article = content.querySelector(`#reader-${CSS.escape(pending.sectionId)}`);
      if (!article) {
        closeMarkMenu();
        return;
      }

      if (ev.target.closest("[data-mark-close]")) {
        closeMarkMenu();
        return;
      }

      if (ev.target.closest("[data-mark-erase]")) {
        if (!pending.touchesMark) return;
        const workRange = pending.range.cloneRange();
        eraseUserMarksInRange(workRange, article);
        syncUserMarksForSection(article, pending.sectionId);
        void flushManuelBackupFromGesture();
        closeMarkMenu();
        return;
      }

      const colorBtn = ev.target.closest("[data-mark-color]");
      if (!colorBtn) return;

      const color = colorBtn.getAttribute("data-mark-color");
      if (!color) return;

      let startOff =
        typeof pending.startOff === "number"
          ? pending.startOff
          : getPlainTextOffsetInArticle(
              article,
              pending.range.startContainer,
              pending.range.startOffset,
            );
      let endOff =
        typeof pending.endOff === "number"
          ? pending.endOff
          : getPlainTextOffsetInArticle(
              article,
              pending.range.endContainer,
              pending.range.endOffset,
            );
      const length = Math.max(0, endOff - startOff);
      if (!length) {
        closeMarkMenu();
        return;
      }

      clearPendingHighlightPreview();
      eraseUserMarksInRange(pending.range.cloneRange(), article);
      const freshRange = findTextRangeByOffset(article, startOff, length);
      if (!freshRange || !freshRange.toString().trim()) {
        closeMarkMenu();
        return;
      }

      wrapRangeWithMark(freshRange, color, newMarkId());
      syncUserMarksForSection(article, pending.sectionId);
      void flushManuelBackupFromGesture();
      closeMarkMenu();
    },
    { signal: ac.signal },
  );

  const restoreMarks = () => {
    applyUserMarks(content);
    syncAllUserMarksFromDom(content);
  };
  restoreMarks();
  requestAnimationFrame(restoreMarks);
}

function renderStepLine(line, queryNorm) {
  if (typeof line === "string") {
    if (line.startsWith("✓ ")) {
      return `<li class="lecture-steps__check"><span aria-hidden="true">✓</span> ${highlightText(line.slice(2), queryNorm)}</li>`;
    }
    return `<p class="lecture-steps__part">${highlightText(line, queryNorm)}</p>`;
  }
  if (line?.italic) {
    return `<p class="lecture-note lecture-note--blue lecture-note--italic">${highlightText(line.italic, queryNorm)}</p>`;
  }
  if (line?.check) {
    const tail = line.tail
      ? ` <span class="lecture-note lecture-note--purple">${highlightText(line.tail.text, queryNorm)}</span>`
      : "";
    return `<li class="lecture-steps__check"><span aria-hidden="true">✓</span> ${highlightText(line.check, queryNorm)}${tail}</li>`;
  }
  return "";
}

function renderStepItem(item, num, queryNorm) {
  if (typeof item === "string") {
    return `<li class="lecture-steps__item" value="${num}"><p>${highlightText(item, queryNorm)}</p></li>`;
  }
  if (item?.text && !item?.tail && !item?.lines) {
    const lead =
      item.bold === true
        ? `<strong>${highlightText(item.text, queryNorm)}</strong>`
        : highlightText(item.text, queryNorm);
    return `<li class="lecture-steps__item" value="${num}"><p>${lead}</p></li>`;
  }
  if (item?.text && item?.tail && !item?.lines) {
    const tailCls = item.tail.blue
      ? "lecture-note lecture-note--blue lecture-note--italic"
      : "lecture-note lecture-note--purple";
    const tail = `<span class="${tailCls}">${highlightText(item.tail.text, queryNorm)}</span>`;
    const lead =
      item.bold === true
        ? `<strong>${highlightText(item.text, queryNorm)}</strong>`
        : highlightText(item.text, queryNorm);
    return `<li class="lecture-steps__item" value="${num}"><p>${lead}${tail}</p></li>`;
  }
  if (item?.text && item?.lines) {
    const lead = `<p class="lecture-steps__part">${highlightText(item.text, queryNorm)}</p>`;
    const list = `<ul class="lecture-steps__checks">${item.lines.map((line) => renderStepLine(line, queryNorm)).join("")}</ul>`;
    return `<li class="lecture-steps__item" value="${num}">${lead}${list}</li>`;
  }
  if (Array.isArray(item)) {
    const paras = [];
    const checks = [];
    for (const line of item) {
      if (typeof line === "string" && line.startsWith("✓ ")) {
        checks.push(renderStepLine(line, queryNorm));
      } else {
        paras.push(renderStepLine(line, queryNorm));
      }
    }
    const checksHtml = checks.length
      ? `<ul class="lecture-steps__checks">${checks.join("")}</ul>`
      : "";
    return `<li class="lecture-steps__item" value="${num}">${paras.join("")}${checksHtml}</li>`;
  }
  return "";
}

function renderCodeLabel(row, queryNorm) {
  if (row.empty) return "";
  const colorCls = row.color ? ` lecture-codes__code--${row.color}` : "";
  const qual = row.qualifier
    ? `<span class="lecture-codes__qualifier">${highlightText(row.qualifier, queryNorm)}</span>`
    : "";
  return `<span class="lecture-codes__code${colorCls}">${highlightText(row.code || "", queryNorm)}${qual}</span>`;
}

function renderCodeDestText(row, queryNorm) {
  return row.textParts?.length
    ? renderInlineParts(row.textParts, queryNorm)
    : highlightText(row.text || "", queryNorm);
}

function renderCodesRow(row, queryNorm) {
  const colorCls = row.color ? ` lecture-codes__row--${row.color}` : "";
  const textParts = row.textParts
    ? renderInlineParts(row.textParts, queryNorm)
    : highlightText(row.text || "", queryNorm);
  return `<div class="lecture-codes__row${colorCls}">
    ${renderCodeLabel(row, queryNorm)}
    <span class="lecture-codes__text">${textParts}</span>
  </div>`;
}

function renderCodesMatrixCell(cell, queryNorm) {
  if (!cell || cell.empty) return "";
  if (cell.code) {
    return `<span class="lecture-codes__matrix-code">${renderCodeLabel(cell, queryNorm)}</span><span class="lecture-codes__matrix-sep"> : </span><span class="lecture-codes__matrix-text">${renderCodeDestText(cell, queryNorm)}</span>`;
  }
  const cls = cell.italic ? " lecture-codes__matrix-note" : "";
  return `<span class="${cls.trim()}">${highlightText(cell.text || "", queryNorm)}</span>`;
}

function renderCodesPanel(panel, queryNorm) {
  if (!panel) return "";
  const title = panel.title
    ? `<div class="lecture-codes__heading">${highlightText(panel.title, queryNorm)}</div>`
    : "";
  const ref = panel.ref
    ? `<div class="lecture-codes__ref">${highlightText(panel.ref, queryNorm)}</div>`
    : "";
  const rows = (panel.rows || []).map((row) => renderCodesRow(row, queryNorm)).join("");
  return `<div class="lecture-codes__panel">${title}${ref}${rows}</div>`;
}

function renderNestedBlocks(blocks, queryNorm) {
  return (blocks || []).map((b) => renderBlock(b, queryNorm)).join("");
}

function renderBlock(block, queryNorm) {
  switch (block.type) {
    case "page-scan": {
      const src = rctImageSrc(block.src || "").replace(/"/g, "&quot;");
      const cap = block.caption || "Page RCT";
      const landscape = block.landscape ? " lecture-page-scan--landscape" : "";
      return `<figure class="lecture-page-scan${landscape}">
        <img src="${src}" alt="${escapeHtml(cap)}" loading="lazy" decoding="async" />
        <figcaption>${highlightText(cap, queryNorm)}</figcaption>
      </figure>`;
    }
    case "doc-title":
      return `<p class="lecture-doc-title">${highlightText(block.text, queryNorm)}</p>`;
    case "h":
      return `<h3 class="lecture-h">${highlightText(block.text, queryNorm)}</h3>`;
    case "rct-section":
      return `<h3 class="lecture-rct-section">${highlightText(block.text, queryNorm)}</h3>`;
    case "rct-sub":
      return `<h4 class="lecture-rct-sub">${highlightText(block.text, queryNorm)}</h4>`;
    case "rct-lead":
      return `<p class="lecture-rct-lead">${highlightText(block.text, queryNorm)}</p>`;
    case "anchor":
      return `<div class="lecture-anchor" id="anchor-${escapeHtml(block.id || "")}" aria-hidden="true"></div>`;
    case "sommaire-ch1": {
      const rows = (block.entries || [])
        .map((entry) => {
          const subs = (entry.subs || [])
            .map(
              (sub) =>
                `<div class="lecture-sommaire__sub">${highlightText(sub, queryNorm)}</div>`,
            )
            .join("");
          const page =
            entry.page != null
              ? `<span class="lecture-sommaire__page">${entry.page}</span>`
              : "";
          return `<div class="lecture-sommaire__block">
            <div class="lecture-sommaire__section">
              <span class="lecture-rct-section">${highlightText(entry.title, queryNorm)}</span>
              ${page}
            </div>
            ${subs}
          </div>`;
        })
        .join("");
      return `<div class="lecture-sommaire" role="doc-index">${rows}</div>`;
    }
    case "sommaire-ch2": {
      const chapter = block.chapter
        ? `<h3 class="lecture-rct-section lecture-sommaire__chapter">${highlightText(block.chapter, queryNorm)}</h3>`
        : "";
      const rows = (block.entries || [])
        .map((entry) => {
          const subs = (entry.subs || [])
            .map(
              (sub) =>
                `<div class="lecture-sommaire__sub">${highlightText(sub, queryNorm)}</div>`,
            )
            .join("");
          const page =
            entry.page != null
              ? `<span class="lecture-sommaire__page">${entry.page}</span>`
              : "";
          return `<div class="lecture-sommaire__block">
            <div class="lecture-sommaire__section">
              <span class="lecture-rct-section">${highlightText(entry.title, queryNorm)}</span>
              ${page}
            </div>
            ${subs}
          </div>`;
        })
        .join("");
      return `<div class="lecture-sommaire lecture-sommaire--ch2" role="doc-index">${chapter}${rows}</div>`;
    }
    case "signal-checks":
      return `<ul class="lecture-signal-checks">${(block.items || [])
        .map((item) => {
          if (item.text && !item.lead) {
            const colorCls = item.color ? ` lecture-signal-checks__line--${item.color}` : "";
            const italic = item.italic ? " lecture-signal-checks__line--italic" : "";
            return `<li class="lecture-signal-checks__item lecture-signal-checks__item--plain${colorCls}${italic}">${highlightText(item.text, queryNorm)}</li>`;
          }
          const colorCls = item.color ? ` lecture-signal-checks__item--${item.color}` : "";
          const blinkCls = item.blink ? " lecture-signal-checks__item--blink" : "";
          const textColorCls = item.color ? ` lecture-signal-checks__text--${item.color}` : "";
          const subColorCls = item.leadOnly
            ? item.subColor
              ? ` lecture-signal-checks__text--${item.subColor}`
              : ""
            : item.subColor
              ? ` lecture-signal-checks__text--${item.subColor}`
              : textColorCls;
          const lead = item.lead
            ? `<span class="lecture-signal-checks__lead${textColorCls}">${highlightText(item.lead, queryNorm)}</span>`
            : "";
          const sub = item.sub
            ? `<span class="lecture-signal-checks__sub${subColorCls}">${highlightText(item.sub, queryNorm)}</span>`
            : "";
          return `<li class="lecture-signal-checks__item${colorCls}${blinkCls}">${lead}${sub}</li>`;
        })
        .join("")}</ul>`;
    case "codes-dest": {
      if (block.columns?.length) {
        const headers = block.columns
          .map((h) => `<th scope="col">${highlightText(h, queryNorm)}</th>`)
          .join("");
        const rows = (block.rows || [])
          .map(
            (row) =>
              `<tr>${row.map((cell) => `<td>${renderCodesMatrixCell(cell, queryNorm)}</td>`).join("")}</tr>`,
          )
          .join("");
        return `<div class="lecture-table-wrap"><table class="lecture-table lecture-table--codes-matrix"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
      }
      const title = block.title
        ? `<div class="lecture-codes__heading">${highlightText(block.title, queryNorm)}</div>`
        : "";
      const rows = (block.rows || [])
        .map(
          (row) =>
            `<tr><td class="lecture-codes__cell-code">${renderCodeLabel(row, queryNorm)}</td><td class="lecture-codes__cell-text"><span class="lecture-codes__matrix-sep">: </span>${renderCodeDestText(row, queryNorm)}</td></tr>`,
        )
        .join("");
      return `<div class="lecture-codes lecture-codes--dest">${title}<div class="lecture-table-wrap"><table class="lecture-table lecture-table--codes-simple"><tbody>${rows}</tbody></table></div></div>`;
    }
    case "codes-cas": {
      const left = block.left || {};
      const right = block.right || {};
      const maxRows = Math.max((left.rows || []).length, (right.rows || []).length);
      const bodyRows = Array.from({ length: maxRows }, (_, idx) => {
        const l = left.rows?.[idx];
        const r = right.rows?.[idx];
        const lCode = l
          ? `<td class="lecture-codes__cell-code">${renderCodeLabel(l, queryNorm)}</td>`
          : "<td></td>";
        const lText = l
          ? `<td>${l.textParts?.length ? renderInlineParts(l.textParts, queryNorm) : highlightText(l.text || "", queryNorm)}</td>`
          : "<td></td>";
        const rCode = r
          ? `<td class="lecture-codes__cell-code">${renderCodeLabel(r, queryNorm)}</td>`
          : "<td></td>";
        const rText = r
          ? `<td>${highlightText(r.text || "", queryNorm)}</td>`
          : "<td></td>";
        return `<tr>${lCode}${lText}${rCode}${rText}</tr>`;
      }).join("");
      return `<div class="lecture-table-wrap"><table class="lecture-table lecture-table--codes-cas">
        <thead>
          <tr>
            <th colspan="2" scope="colgroup">${highlightText(left.title || "", queryNorm)}<span class="lecture-codes__ref">${highlightText(left.ref || "", queryNorm)}</span></th>
            <th colspan="2" scope="colgroup">${highlightText(right.title || "", queryNorm)}<span class="lecture-codes__ref">${highlightText(right.ref || "", queryNorm)}</span></th>
          </tr>
        </thead>
        <tbody>${bodyRows}</tbody>
      </table></div>`;
    }
    case "cas-box":
      return `<aside class="lecture-cas-box" role="note">
        <div class="lecture-cas-box__title">${highlightText(block.title || "", queryNorm)}</div>
        ${(block.items || [])
          .map((item) => {
            const emphCls = item.emphasis ? ` lecture-cas-box__text--${item.emphasis}` : "";
            const title = item.title
              ? `<div class="lecture-cas-box__item-title">${highlightText(item.title, queryNorm)}</div>`
              : "";
            const text = item.text
              ? `<p class="lecture-cas-box__text${emphCls}">${highlightText(item.text, queryNorm)}</p>`
              : "";
            return `<div class="lecture-cas-box__item">${title}${text}</div>`;
          })
          .join("")}
      </aside>`;
    case "phase-list":
      return `<ol class="lecture-phase-list">${(block.items || [])
        .map((item) => {
          if (typeof item === "string") {
            return `<li class="lecture-phase-list__item">${highlightText(item, queryNorm)}</li>`;
          }
          const alt = item.bg === "purple" ? " lecture-phase-list__item--alt" : "";
          const body = item.parts?.length
            ? renderInlineParts(item.parts, queryNorm)
            : highlightText(item.text || "", queryNorm);
          return `<li class="lecture-phase-list__item${alt}"><span class="lecture-phase-list__n" aria-hidden="true">${highlightText(item.n || "", queryNorm)}</span><span class="lecture-phase-list__body">${body}</span></li>`;
        })
        .join("")}</ol>`;
    case "prio-box":
      return `<div class="lecture-prio-box">${(block.items || [])
        .map((item) => {
          const title = item.title
            ? `<div class="lecture-prio-box__title">${highlightText(item.title, queryNorm)}</div>`
            : "";
          const body = item.body
            ? `<p class="lecture-prio-box__body">${highlightText(item.body, queryNorm)}</p>`
            : "";
          const lead = item.lead
            ? `<p class="lecture-prio-box__lead">${highlightText(item.lead, queryNorm)}</p>`
            : "";
          return `<div class="lecture-prio-box__item">${title}${body}${lead}</div>`;
        })
        .join("")}</div>`;
    case "boxed": {
      const plain = block.tone === "plain" ? " lecture-boxed--plain" : "";
      return `<div class="lecture-boxed${plain}">${renderNestedBlocks(block.blocks, queryNorm)}</div>`;
    }
    case "callout-box": {
      const tone =
        block.tone === "soft"
          ? " lecture-callout-box--soft"
          : block.tone === "yellow"
            ? " lecture-callout-box--yellow"
            : "";
      const iconCls = block.icon ? " lecture-callout-box--icon" : "";
      const body = renderNestedBlocks(block.blocks, queryNorm);
      if (block.icon) {
        return `<div class="lecture-callout-box${tone}${iconCls}"><span class="lecture-callout-box__icon" aria-hidden="true">⚠</span><div class="lecture-callout-box__content">${body}</div></div>`;
      }
      return `<div class="lecture-callout-box${tone}">${body}</div>`;
    }
    case "zone-steps":
    case "zone-table":
      return renderZoneTable(block, queryNorm);
    case "flow-table":
      return renderFlowTable(block, queryNorm);
    case "client-message-panel":
      return renderClientMessagePanel(block, queryNorm);
    case "signal-table":
      return `<div class="lecture-table-wrap"><table class="lecture-table lecture-table--signal"><tbody>${(block.rows || [])
        .map((row) => {
          const colorCls = row.color ? ` lecture-signal-table__lead--${row.color}` : "";
          const blinkCls = row.blink ? " lecture-signal-table__lead--blink" : "";
          const lead = row.lead
            ? `<td class="lecture-signal-table__lead${colorCls}${blinkCls}">${highlightText(row.lead, queryNorm)}</td>`
            : "<td></td>";
          const sub = row.sub
            ? `<td class="lecture-signal-table__sub">${highlightText(row.sub, queryNorm)}</td>`
            : "<td></td>";
          return `<tr>${lead}${sub}</tr>`;
        })
        .join("")}</tbody></table></div>`;
    case "tenus-list":
      return `<ol class="lecture-tenus-list">${(block.items || [])
        .map((item) => {
          const colorCls = item.color ? ` lecture-tenus-list__item--${item.color}` : "";
          const body = item.parts?.length
            ? renderInlineParts(item.parts, queryNorm)
            : highlightText(item.text || "", queryNorm);
          return `<li class="lecture-tenus-list__item${colorCls}"><span class="lecture-tenus-list__n" aria-hidden="true">${highlightText(item.n || "", queryNorm)}</span><span class="lecture-tenus-list__body">${body}</span></li>`;
        })
        .join("")}</ol>`;
    case "figure-placeholder":
      return `<figure class="lecture-figure-placeholder" role="img" aria-label="${escapeHtml(block.caption || block.text || "Image à intégrer")}">
        <p class="lecture-figure-placeholder__text">${highlightText(block.text || block.caption || "Image à intégrer", queryNorm)}</p>
      </figure>`;
    case "arrow-p": {
      const tone = block.tone === "blue" ? " lecture-arrow-p--blue" : "";
      const emph = block.emphasis ? " lecture-arrow-p--emphasis" : "";
      const large = block.arrow === "large" ? " lecture-arrow-p--large" : "";
      const body = block.parts?.length
        ? renderInlineParts(block.parts, queryNorm)
        : highlightText(block.text || "", queryNorm);
      return `<p class="lecture-arrow-p${tone}${emph}${large}"><span class="lecture-arrow-p__icon" aria-hidden="true">➤</span>${body}</p>`;
    }
    case "consigne-red":
      return `<p class="lecture-consigne-red">${highlightText(block.text, queryNorm)}</p>`;
    case "consigne-steps":
      return `<ol class="lecture-consigne-steps">${(block.items || [])
        .map((item) => `<li>${highlightText(item, queryNorm)}</li>`)
        .join("")}</ol>`;
    case "routier-except":
      return `<div class="lecture-routier-except" role="note">
        <span class="lecture-routier-except__icon" aria-hidden="true">⚠</span>
        <div class="lecture-routier-except__body">${(block.lines || [])
          .map((line) => {
            if (line.parts?.length) {
              return `<p class="lecture-routier-except__line">${renderInlineParts(line.parts, queryNorm)}</p>`;
            }
            const cls = line.italic ? " lecture-routier-except__line--italic" : "";
            return `<p class="lecture-routier-except__line${cls}">${highlightText(line.text, queryNorm)}</p>`;
          })
          .join("")}</div>
      </div>`;
    case "vitesse-table": {
      const speeds = block.speeds || [];
      const speedIdx = (speed) => speeds.indexOf(speed);
      const headerCells = speeds
        .map((speed) => {
          const m = String(speed).match(/^(\d+)\s*(.*)$/);
          const num = m ? m[1] : speed;
          const unit = m ? ` ${m[2]}` : "";
          return `<th scope="col" class="lecture-vitesse__speed-head"><span class="lecture-vitesse__speed-line">${highlightText(num, queryNorm)}</span><span class="lecture-vitesse__speed-line">${highlightText(unit.trim(), queryNorm)}</span></th>`;
        })
        .join("");
      const bodyRows = (block.rows || [])
        .map((row) => {
          const hlSet = new Set();
          if (row.highlight) hlSet.add(row.highlight);
          for (const h of row.highlights || []) hlSet.add(h);
          const spanFrom = row.spanNote ? speedIdx(row.spanNote.from) : -1;
          const spanTo = row.spanNote ? speedIdx(row.spanNote.to) : -1;
          const cells = [];
          for (let idx = 0; idx < speeds.length; idx++) {
            const speed = speeds[idx];
            if (row.spanNote && idx >= spanFrom && idx <= spanTo) {
              if (idx === spanFrom) {
                const span = spanTo - spanFrom + 1;
                cells.push(
                  `<td colspan="${span}" class="lecture-vitesse__span-inline">${highlightText(row.spanNote.text, queryNorm)}</td>`,
                );
              }
              continue;
            }
            const highlighted = hlSet.has(speed);
            const cls = ["lecture-vitesse__cell", highlighted ? "lecture-vitesse__cell--hl" : ""]
              .filter(Boolean)
              .join(" ");
            const note = row.notes?.[speed]
              ? `<span class="lecture-vitesse__note">${highlightText(row.notes[speed], queryNorm)}</span>`
              : "";
            cells.push(`<td class="${cls}">${note}</td>`);
          }
          return `<tr>
            <th scope="row" class="lecture-vitesse__label">${highlightText(row.label, queryNorm)}</th>
            ${cells.join("")}
          </tr>`;
        })
        .join("");
      return `<div class="lecture-table-wrap lecture-table-wrap--vitesse">
        <table class="lecture-table lecture-table--vitesse">
          <thead><tr><th scope="col" class="lecture-vitesse__corner"></th>${headerCells}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>`;
    }
    case "p": {
      const extra = [
        block.italic ? " lecture-p--italic" : "",
        block.center ? " lecture-p--center" : "",
        block.red ? " lecture-p--red" : "",
        block.bold ? " lecture-p--bold" : "",
        block.frame === "dashed" ? " lecture-p--dashed-frame" : "",
      ].join("");
      if (block.parts?.length) {
        return `<p class="lecture-p${extra}">${renderInlineParts(block.parts, queryNorm)}</p>`;
      }
      return `<p class="lecture-p${extra}">${highlightText(block.text, queryNorm)}</p>`;
    }
    case "note":
      return `<p class="lecture-note">${highlightText(block.text, queryNorm)}</p>`;
    case "note-red":
      return `<p class="lecture-note lecture-note--red">${highlightText(block.text, queryNorm)}</p>`;
    case "note-purple":
      return `<p class="lecture-note lecture-note--purple">${highlightText(block.text, queryNorm)}</p>`;
    case "note-blue":
      return `<p class="lecture-note lecture-note--blue">${highlightText(block.text, queryNorm)}</p>`;
    case "note-blue-italic":
      return `<p class="lecture-note lecture-note--blue lecture-note--italic">${highlightText(block.text, queryNorm)}</p>`;
    case "warning": {
      const toneCls = block.tone === "red" ? " lecture-warning--red-text" : "";
      const prefixBlackCls = block.prefixBlack ? " lecture-warning--prefix-black" : "";
      const bulletsRedCls = block.bulletsRed ? " lecture-warning--bullets-red" : "";
      const centerCls = block.align === "center" ? " lecture-warning--center" : "";
      const extraCls = `${toneCls}${prefixBlackCls}${bulletsRedCls}${centerCls}`;
      const chunks = [];
      if (block.parts?.length) {
        chunks.push(
          `<p class="lecture-warning__line lecture-warning__lead">${renderInlineParts(block.parts, queryNorm)}</p>`,
        );
      }
      if (block.prefix && !block.parts?.length) {
        chunks.push(
          `<span class="lecture-warning__prefix">${highlightText(block.prefix, queryNorm)}</span> `,
        );
      }
      if (block.bullets?.length) {
        const bulletCls = block.bulletStyle === "arrow" ? " lecture-warning__bullets--arrow" : "";
        const items = block.bullets
          .map((item) => {
            const text = typeof item === "string" ? item : item.text || "";
            if (typeof item !== "string" && item.parts?.length) {
              return `<li>${renderInlineParts(item.parts, queryNorm)}</li>`;
            }
            return `<li>${highlightText(text, queryNorm)}</li>`;
          })
          .join("");
        chunks.push(`<ul class="lecture-warning__bullets${bulletCls}">${items}</ul>`);
      }
      if (block.lines?.length) {
        for (const line of block.lines) {
          if (line.parts?.length) {
            chunks.push(
              `<p class="lecture-warning__line">${renderInlineParts(line.parts, queryNorm)}</p>`,
            );
            continue;
          }
          const classes = ["lecture-warning__line"];
          if (line.red) classes.push("lecture-warning__line--red");
          if (line.blue) classes.push("lecture-warning__line--blue");
          if (line.bold) classes.push("lecture-warning__line--bold");
          if (line.italic) classes.push("lecture-warning__line--italic");
          chunks.push(
            `<p class="${classes.join(" ")}">${highlightText(line.text, queryNorm)}</p>`,
          );
        }
      }
      const suffix = block.suffix
        ? `<span class="lecture-warning__suffix">${highlightText(block.suffix, queryNorm)}</span>`
        : "";
      const body = block.text ? highlightText(block.text, queryNorm) : "";
      if (chunks.length) {
        const inner = `${chunks.join("")}${body}${suffix}`;
        if (block.icon) {
          return `<aside class="lecture-warning lecture-warning--icon${extraCls}" role="note"><span class="lecture-warning__icon" aria-hidden="true">⚠</span><div class="lecture-warning__content">${inner}</div></aside>`;
        }
        return `<aside class="lecture-warning${extraCls}" role="note">${inner}</aside>`;
      }
      if (block.text || block.suffix) {
        const inner = `${body}${suffix}`;
        if (block.icon) {
          return `<aside class="lecture-warning lecture-warning--icon${extraCls}" role="note"><span class="lecture-warning__icon" aria-hidden="true">⚠</span><div class="lecture-warning__content">${inner}</div></aside>`;
        }
        return `<aside class="lecture-warning${extraCls}" role="note">${inner}</aside>`;
      }
      return "";
    }
    case "highlight":
      return `<p class="lecture-highlight">${highlightText(block.text, queryNorm)}</p>`;
    case "prep-box":
      return `<ol class="lecture-prep-box">${(block.items || [])
        .map((item) => {
          if (typeof item === "string") {
            return `<li>${highlightText(item, queryNorm)}</li>`;
          }
          const lead = item.underline
            ? `<span class="lecture-inline--underline">${highlightText(item.text, queryNorm)}</span>`
            : highlightText(item.text, queryNorm);
          const suffix = item.suffix ? highlightText(item.suffix, queryNorm) : "";
          return `<li>${lead}${suffix}</li>`;
        })
        .join("")}</ol>`;
    case "sie-cycle":
      return `<ol class="lecture-sie-cycle">${(block.items || [])
        .map((item) => `<li>${highlightText(item, queryNorm)}</li>`)
        .join("")}</ol>`;
    case "freinage-modes":
      return `<ol class="lecture-freinage-modes">${(block.items || [])
        .map((item) => `<li>${highlightText(item, queryNorm)}</li>`)
        .join("")}</ol>`;
    case "pannes-table": {
      const headers = (block.headers || [])
        .map((h) => {
          const speed = h.speed
            ? `<span class="lecture-pannes__head-speed">${highlightText(h.speed, queryNorm)}</span>`
            : "";
          return `<th scope="col"><span class="lecture-pannes__head-title">${highlightText(h.title, queryNorm)}</span>${speed}</th>`;
        })
        .join("");
      const rows = (block.rows || [])
        .map((row, idx) => {
          const cells = row
            .map((cell) => `<td>${renderPannesCell(cell, queryNorm)}</td>`)
            .join("");
          const stripe = idx % 2 === 0 ? " lecture-pannes__row--alt" : "";
          return `<tr class="lecture-pannes__row${stripe}">${cells}</tr>`;
        })
        .join("");
      const footnotes = (block.footnotes || [])
        .map((note) => `<p class="lecture-pannes__footnote">${highlightText(note, queryNorm)}</p>`)
        .join("");
      return `<div class="lecture-table-wrap lecture-table-wrap--pannes">
        <table class="lecture-table lecture-table--pannes">
          <thead><tr>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
        ${footnotes}
      </div>`;
    }
    case "steps":
      return `<ol class="lecture-steps">${(block.items || [])
        .map((item, idx) => renderStepItem(item, idx + 1, queryNorm))
        .join("")}</ol>`;
    case "version-table": {
      const headers = (block.headers || [])
        .map((h) => `<th scope="col">${highlightText(h, queryNorm)}</th>`)
        .join("");
      const rows = (block.entries || [])
        .map((entry) => {
          const linesHtml = (entry.lines || [])
            .map((line) => {
              const art = line.art
                ? `<span class="lecture-art-ref">${highlightText(line.art, queryNorm)}</span>`
                : "";
              return `<div class="lecture-version-line"><span class="lecture-version-text">${highlightText(line.text, queryNorm)}</span>${art}</div>`;
            })
            .join("");
          return `<tr>
            <th scope="row">${highlightText(entry.version, queryNorm)}</th>
            <td>${highlightText(entry.date, queryNorm).replace(/\n/g, "<br>")}</td>
            <td class="lecture-version-cell">${linesHtml}</td>
          </tr>`;
        })
        .join("");
      return `<div class="lecture-table-wrap lecture-table-wrap--version"><table class="lecture-table lecture-table--version"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    case "ul":
      return `<ul class="lecture-ul">${(block.items || [])
        .map((item) => {
          if (typeof item === "string") {
            return `<li>${highlightText(item, queryNorm)}</li>`;
          }
          const cls = [
            item?.red ? "lecture-ul__li--red" : "",
            item?.orange ? "lecture-ul__li--orange" : "",
          ]
            .filter(Boolean)
            .join(" ");
          const body = renderListItemBody(item, queryNorm);
          return `<li${cls ? ` class="${cls}"` : ""}>${body}</li>`;
        })
        .join("")}</ul>`;
    case "hand-ul":
      return `<ul class="lecture-hand-ul">${(block.items || [])
        .map((item) => `<li>${renderListItemBody(item, queryNorm)}</li>`)
        .join("")}</ul>`;
    case "hand-p": {
      if (block.lead || block.body) {
        const lead = block.lead?.parts?.length
          ? renderInlineParts(block.lead.parts, queryNorm)
          : highlightText(block.lead?.text || "", queryNorm);
        const chunk = block.body?.parts?.length
          ? renderInlineParts(block.body.parts, queryNorm)
          : highlightText(block.body?.text || "", queryNorm);
        return `<div class="lecture-hand-block"><p class="lecture-hand-block__lead">${lead}</p><p class="lecture-hand-block__body">${chunk}</p></div>`;
      }
      const body = block.parts?.length
        ? renderInlineParts(block.parts, queryNorm)
        : highlightText(block.text || "", queryNorm);
      return `<p class="lecture-hand-p">${body}</p>`;
    }
    case "chevron-p": {
      const redCls = block.tone === "red" ? " lecture-chevron-p--red" : "";
      const body = block.parts?.length
        ? renderInlineParts(block.parts, queryNorm)
        : highlightText(block.text || "", queryNorm);
      return `<p class="lecture-chevron-p${redCls}">${body}</p>`;
    }
    case "arrow-ul": {
      const plain = block.tone === "plain" ? " lecture-arrow-ul--plain" : "";
      return `<ul class="lecture-arrow-ul${plain}">${(block.items || [])
        .map((item) => `<li>${renderListItemBody(item, queryNorm)}</li>`)
        .join("")}</ul>`;
    }
    case "blue-callout": {
      const body = block.parts?.length
        ? renderInlineParts(block.parts, queryNorm)
        : highlightText(block.text || "", queryNorm);
      return `<div class="lecture-blue-callout"><span class="lecture-blue-callout__icon" aria-hidden="true">➤</span>${body}</div>`;
    }
    case "ol":
      return `<ol class="lecture-ol">${(block.items || [])
        .map((item) => `<li>${highlightText(item, queryNorm)}</li>`)
        .join("")}</ol>`;
    case "sigles":
      return `<dl class="lecture-sigles">${(block.items || [])
        .map((item) => {
          const sep = item.indexOf(" = ");
          if (sep < 0) return `<div class="lecture-sigles__row">${highlightText(item, queryNorm)}</div>`;
          const abbr = item.slice(0, sep);
          const def = item.slice(sep + 3);
          return `<div class="lecture-sigles__row"><dt>${highlightText(abbr, queryNorm)}</dt><dd>${highlightText(def, queryNorm)}</dd></div>`;
        })
        .join("")}</dl>`;
    case "table": {
      const headers = (block.headers || [])
        .map((h) => `<th scope="col">${highlightText(h, queryNorm)}</th>`)
        .join("");
      const rows = (block.rows || [])
        .map(
          (row) =>
            `<tr>${row.map((cell) => `<td>${highlightText(cell, queryNorm)}</td>`).join("")}</tr>`,
        )
        .join("");
      return `<div class="lecture-table-wrap"><table class="lecture-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    case "chapter-banner":
      return `<div class="lecture-chapter-banner" role="doc-subtitle">${highlightText(block.text || "", queryNorm)}</div>`;
    case "sat-codes": {
      const tables = (block.tables || [])
        .map((table) => {
          const title = table.title
            ? `<caption class="lecture-sat-codes__caption">${highlightText(table.title, queryNorm)}</caption>`
            : "";
          const rows = (table.rows || [])
            .map(
              (row, idx) =>
                `<tr class="${idx % 2 ? "lecture-sat-codes__row--alt" : ""}"><td class="lecture-sat-codes__label">${row.parts?.length ? renderInlineParts(row.parts, queryNorm) : highlightText(row.text || "", queryNorm)}</td><td class="lecture-sat-codes__code">${highlightText(row.code || "", queryNorm)}</td></tr>`,
            )
            .join("");
          return `<table class="lecture-table lecture-table--sat-codes">${title}<tbody>${rows}</tbody></table>`;
        })
        .join("");
      return `<div class="lecture-sat-codes">${tables}</div>`;
    }
    default:
      return "";
  }
}

function renderSectionBody(section, queryNorm) {
  return (section.blocks || []).map((b) => renderBlock(b, queryNorm)).join("");
}

function renderTocItem(section, queryNorm, activeId) {
  const levelClass = `rct-reader__toc-item--l${section.level}`;
  const active = section.id === activeId ? " rct-reader__toc-item--active" : "";
  const heading = section.title
    ? section.code
      ? `<span class="rct-reader__toc-heading"><span class="rct-reader__toc-code">${escapeHtml(section.code)}</span><span class="rct-reader__toc-sep"> - </span><span class="rct-reader__toc-title">${highlightText(section.title, queryNorm)}</span></span>`
      : `<span class="rct-reader__toc-heading"><span class="rct-reader__toc-title">${highlightText(section.title, queryNorm)}</span></span>`
    : section.code
      ? `<span class="rct-reader__toc-code">${escapeHtml(section.code)}</span>`
      : "";
  const page =
    section.page != null
      ? `<span class="rct-reader__toc-page">p. ${section.page}</span>`
      : "";
  return `<button type="button" class="rct-reader__toc-item ${levelClass}${active}" data-reader-section="${escapeHtml(section.id)}">${heading}${page}</button>`;
}

function renderToc(queryNorm, activeId) {
  return RCT_LECTURE_TOC.map((s) => renderTocItem(s, queryNorm, activeId)).join("");
}

function renderSectionArticle(section, queryNorm) {
  return `<article class="lecture-section" id="reader-${escapeHtml(section.id)}" data-reader-article="${escapeHtml(section.id)}">
    <div class="lecture-section__body">${renderSectionBody(section, queryNorm)}</div>
  </article>`;
}

function renderReaderMarkup() {
  const queryNorm = normalizeSearchText(READER_STATE.query.trim());
  const minimizedClass = READER_STATE.minimized ? " rct-reader--minimized" : "";

  const shellRole = READER_STATE.embedded
    ? `role="region" aria-label="Consultation du RCT"`
    : `role="dialog" aria-modal="true" aria-label="Consultation du RCT"`;
  const windowChrome = READER_STATE.embedded
    ? ""
    : `<button type="button" class="rct-reader__btn-icon" data-reader-minimize title="${READER_STATE.minimized ? "Agrandir" : "Réduire"}" aria-label="${READER_STATE.minimized ? "Agrandir le panneau" : "Réduire le panneau"}">${READER_STATE.minimized ? "▢" : "—"}</button>
        <button type="button" class="rct-reader__btn-icon rct-reader__btn-icon--close" data-reader-close title="Fermer" aria-label="Fermer la consultation">×</button>`;

  return `<div class="rct-reader${minimizedClass}${READER_STATE.embedded ? " rct-reader--embedded" : ""}" ${shellRole}>
    <div class="rct-reader__chrome">
      <div class="rct-reader__chrome-main">
        <h2 class="rct-reader__title">Consultation et recherche — RCT</h2>
        <p class="rct-reader__subtitle">Pages 1–76 · RCT intégral — scans RCT</p>
      </div>
      <div class="rct-reader__chrome-actions">
        <button type="button" class="rct-reader__btn-icon rct-reader__mark-mode-btn${READER_STATE.markMode ? " rct-reader__mark-mode-btn--on" : ""}" data-reader-mark-mode title="${READER_STATE.markMode ? "Désactiver le mode surlignage" : "Mode surlignage (sans barre Google)"}" aria-label="${READER_STATE.markMode ? "Désactiver le mode surlignage" : "Activer le mode surlignage"}" aria-pressed="${READER_STATE.markMode ? "true" : "false"}"><svg class="rct-reader__mark-mode-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
        ${windowChrome}
      </div>
    </div>
    <div class="rct-reader__body">
      <aside class="rct-reader__sidebar" aria-label="Sommaire">
        <label class="rct-reader__search-label" for="rct-reader-search">Rechercher dans le RCT</label>
        <div class="rct-reader__search-row">
          <div class="rct-reader__search-wrap">
            <input type="text" id="rct-reader-search" class="rct-reader__search" value="${escapeHtml(READER_STATE.query)}" placeholder="Ex. frein, chasse-corps, PCC…" autocomplete="off" inputmode="search" enterkeyhint="search" />
            ${
              READER_STATE.query.trim()
                ? `<button type="button" class="rct-reader__search-clear" data-reader-search-clear title="Effacer la recherche" aria-label="Effacer la recherche">×</button>`
                : ""
            }
          </div>
          <div class="rct-reader__search-nav">
            <button type="button" class="rct-reader__search-nav-btn" data-reader-search-prev disabled title="Occurrence précédente" aria-label="Occurrence précédente">Préc.</button>
            <button type="button" class="rct-reader__search-nav-btn" data-reader-search-next disabled title="Occurrence suivante" aria-label="Occurrence suivante">Suiv.</button>
          </div>
        </div>
        <p class="rct-reader__search-meta" aria-live="polite"></p>
        <nav class="rct-reader__toc">${renderToc(queryNorm, READER_STATE.activeSectionId)}</nav>
      </aside>
      <div class="rct-reader__content${READER_STATE.markMode ? " rct-reader__content--mark-mode" : ""}" tabindex="0">
        <div class="rct-reader__content-inner">
          ${RCT_LECTURE_SECTIONS.map((s) => renderSectionArticle(s, queryNorm)).join("")}
        </div>
      </div>
    </div>
    ${renderMarkMenuMarkup()}
  </div>`;
}

/** Navigation en cours — ne pas re-scroller si l'utilisateur a défilé. */
let navScrollGuard = null;

function scrollContentToSection(sectionId, behavior = "smooth") {
  const root = overlayEl?.querySelector(".rct-reader__content");
  if (!root) return;
  const anchor = overlayEl?.querySelector(`#anchor-${CSS.escape(sectionId)}`);
  const article = overlayEl?.querySelector(`#reader-${CSS.escape(sectionId)}`);
  const target =
    anchor ||
    article?.querySelector(".lecture-rct-section, .lecture-rct-sub, .lecture-page-scan") ||
    article;
  if (!target) return;
  const top =
    target.getBoundingClientRect().top -
    root.getBoundingClientRect().top +
    root.scrollTop;
  root.scrollTo({ top: Math.max(0, top), behavior });
}

function beginNavScrollGuard(sectionId) {
  navScrollGuard?.cleanup();
  const root = overlayEl?.querySelector(".rct-reader__content");
  if (!root) return null;

  const guard = {
    sectionId,
    startTop: root.scrollTop,
    userMoved: false,
    cleanup() {
      root.removeEventListener("scroll", onScroll);
      window.clearTimeout(guard.timeoutId);
      if (navScrollGuard === guard) navScrollGuard = null;
    },
    timeoutId: 0,
  };

  const onScroll = () => {
    if (Math.abs(root.scrollTop - guard.startTop) > 48) guard.userMoved = true;
  };

  root.addEventListener("scroll", onScroll, { passive: true });
  guard.timeoutId = window.setTimeout(() => guard.cleanup(), 8000);
  navScrollGuard = guard;
  return guard;
}

function safeScrollToSectionAfterLayout(sectionId) {
  if (navScrollGuard?.userMoved) return;
  scrollContentToSection(sectionId, "auto");
}

function scrollTocToActive(sectionId, behavior = "smooth") {
  const toc = overlayEl?.querySelector(".rct-reader__toc");
  const btn = overlayEl?.querySelector(
    `.rct-reader__toc-item[data-reader-section="${CSS.escape(sectionId)}"]`,
  );
  if (!toc || !btn) return;
  const top =
    btn.getBoundingClientRect().top -
    toc.getBoundingClientRect().top +
    toc.scrollTop -
    8;
  toc.scrollTo({ top: Math.max(0, top), behavior });
}

function highlightTocItem(sectionId) {
  overlayEl?.querySelectorAll(".rct-reader__toc-item").forEach((btn) => {
    const on = btn.getAttribute("data-reader-section") === sectionId;
    btn.classList.toggle("rct-reader__toc-item--active", on);
  });
}

function collectScrollSpyMarkers() {
  const root = overlayEl?.querySelector(".rct-reader__content");
  if (!root) return [];
  const tocIds = new Set(RCT_LECTURE_TOC.map((entry) => entry.id));
  const markers = [];

  root.querySelectorAll(".lecture-anchor[id^='anchor-']").forEach((el) => {
    const id = el.id.slice("anchor-".length);
    if (tocIds.has(id)) markers.push({ id, el });
  });

  for (const section of RCT_LECTURE_SECTIONS) {
    if (!tocIds.has(section.id)) continue;
    const article = root.querySelector(`#reader-${CSS.escape(section.id)}`);
    if (!article) continue;
    const el =
      article.querySelector(".lecture-page-scan, .lecture-rct-section, .lecture-doc-title") ||
      article;
    markers.push({ id: section.id, el });
  }

  const seen = new Set();
  return markers
    .filter((marker) => {
      if (seen.has(marker.id)) return false;
      seen.add(marker.id);
      return true;
    })
    .sort((a, b) => {
      const pos = a.el.compareDocumentPosition(b.el);
      if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });
}

function updateScrollSpy() {
  if (scrollSpyPaused || !overlayEl) return;
  if (normalizeSearchText(READER_STATE.query.trim())) return;
  const root = overlayEl.querySelector(".rct-reader__content");
  if (!root) return;
  const markers = collectScrollSpyMarkers();
  if (!markers.length) return;

  const maxScroll = root.scrollHeight - root.clientHeight;
  let activeId = markers[0].id;

  if (maxScroll > 0 && root.scrollTop >= maxScroll - 12) {
    activeId = markers[markers.length - 1].id;
  } else {
    const rootRect = root.getBoundingClientRect();
    const probeLine = rootRect.top + Math.min(120, rootRect.height * 0.22);
    for (const marker of markers) {
      const rect = marker.el.getBoundingClientRect();
      if (rect.top <= probeLine) activeId = marker.id;
      else break;
    }
  }

  if (activeId !== READER_STATE.activeSectionId) {
    READER_STATE.activeSectionId = activeId;
    highlightTocItem(activeId);
    scrollTocToActive(activeId);
  }
}

function pauseScrollSpy(ms = 900) {
  scrollSpyPaused = true;
  window.setTimeout(() => {
    scrollSpyPaused = false;
  }, ms);
}

function queueSectionNavigation(sectionId) {
  pauseScrollSpy(1200);
  const guard = beginNavScrollGuard(sectionId);
  const run = () => {
    scrollContentToSection(sectionId, "auto");
    scrollTocToActive(sectionId);
    highlightTocItem(sectionId);
    if (guard) guard.startTop = overlayEl?.querySelector(".rct-reader__content")?.scrollTop ?? guard.startTop;
  };
  requestAnimationFrame(() => {
    run();
    requestAnimationFrame(run);
  });
  const article = overlayEl?.querySelector(`#reader-${CSS.escape(sectionId)}`);
  article?.querySelectorAll("img").forEach((img) => {
    if (!img.complete) {
      img.addEventListener("load", () => safeScrollToSectionAfterLayout(sectionId), {
        once: true,
      });
    }
  });
}

function mountOverlay() {
  const existing = document.getElementById("rct-reader-root");
  if (existing) existing.remove();
  overlayEl = document.createElement("div");
  overlayEl.id = "rct-reader-root";
  overlayEl.className = READER_STATE.embedded
    ? "rct-reader-root rct-reader-root--embedded"
    : "rct-reader-root";
  overlayEl.innerHTML = renderReaderMarkup();
  document.body.appendChild(overlayEl);
  document.body.classList.add("rct-reader-open");
  if (READER_STATE.embedded) document.body.classList.add("app-section-reader");
  bindOverlay();
  if (READER_STATE.activeSectionId) {
    queueSectionNavigation(READER_STATE.activeSectionId);
  }
}

function unmountOverlay() {
  userMarksBindAbort?.abort();
  userMarksBindAbort = null;
  searchFocusBindAbort?.abort();
  searchFocusBindAbort = null;
  navScrollGuard?.cleanup();
  navScrollGuard = null;
  document.body.classList.remove("rct-reader-open", "app-section-reader");
  overlayEl?.remove();
  overlayEl = null;
  READER_STATE.embedded = false;
}

function refreshOverlay(options = {}) {
  if (!overlayEl) return;
  const navSectionId = pendingNavSectionId;
  const preserveContentScroll = !navSectionId && !options.resetContentScroll;
  const scrollTop = preserveContentScroll
    ? (overlayEl.querySelector(".rct-reader__content")?.scrollTop ?? 0)
    : 0;
  const searchFocus =
    options.focusSearch === true ||
    document.activeElement?.id === "rct-reader-search";
  const selStart = options.focusSearch
    ? (options.searchCaret ?? READER_STATE.query.length)
    : overlayEl.querySelector("#rct-reader-search")?.selectionStart;
  overlayEl.innerHTML = renderReaderMarkup();
  bindOverlay();
  const content = overlayEl.querySelector(".rct-reader__content");
  if (content) content.scrollTop = scrollTop;
  if (navSectionId) {
    pendingNavSectionId = null;
    queueSectionNavigation(navSectionId);
  }
  if (searchFocus) {
    const input = overlayEl.querySelector("#rct-reader-search");
    input?.focus();
    if (input && typeof selStart === "number") {
      try {
        input.setSelectionRange(selStart, selStart);
      } catch {
        /* ignore */
      }
    }
  }

  if (normalizeSearchText(READER_STATE.query.trim())) {
    refreshSearchHitList();
    setSearchMatchIndex(READER_STATE.searchMatchIndex, { scroll: false });
  } else {
    updateSearchNavUi();
  }
}

function bindTocSectionButtons(root = overlayEl) {
  root?.querySelectorAll("[data-reader-section]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-reader-section");
      if (!id) return;
      READER_STATE.activeSectionId = id;
      queueSectionNavigation(id);
    });
  });
}

function clearReaderSearch() {
  const search = overlayEl?.querySelector("#rct-reader-search");
  const content = overlayEl?.querySelector(".rct-reader__content");
  const scrollTop = content?.scrollTop ?? 0;
  if (search) search.value = "";
  READER_STATE.query = "";
  READER_STATE.searchMatchIndex = 0;
  searchHits = [];
  refreshReaderSearchResults({ resetContentScroll: false });
  if (content) content.scrollTop = scrollTop;
  focusReaderSearch();
  requestAnimationFrame(updateScrollSpy);
}

/** Met à jour contenu et sommaire sans détruire le champ de recherche (garde le focus). */
function refreshReaderSearchResults(options = {}) {
  if (!overlayEl) return;
  const queryNorm = normalizeSearchText(READER_STATE.query.trim());
  const content = overlayEl.querySelector(".rct-reader__content");
  const scrollTop = options.resetContentScroll ? 0 : (content?.scrollTop ?? 0);

  const inner = overlayEl.querySelector(".rct-reader__content-inner");
  if (inner) {
    inner.innerHTML = RCT_LECTURE_SECTIONS.map((s) =>
      renderSectionArticle(s, queryNorm),
    ).join("");
  }

  const toc = overlayEl.querySelector(".rct-reader__toc");
  if (toc) {
    toc.innerHTML = renderToc(queryNorm, READER_STATE.activeSectionId);
    bindTocSectionButtons(toc);
  }

  const wrap = overlayEl.querySelector(".rct-reader__search-wrap");
  if (wrap) {
    const existing = wrap.querySelector("[data-reader-search-clear]");
    if (READER_STATE.query.trim() && !existing) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "rct-reader__search-clear";
      btn.dataset.readerSearchClear = "";
      btn.title = "Effacer la recherche";
      btn.setAttribute("aria-label", "Effacer la recherche");
      btn.textContent = "×";
      btn.addEventListener("click", clearReaderSearch);
      wrap.appendChild(btn);
    } else if (!READER_STATE.query.trim() && existing) {
      existing.remove();
    }
  }

  if (content) content.scrollTop = scrollTop;
  reapplyMarksInPlace();
  refreshSearchHitList();

  if (queryNorm && searchHits.length) {
    setSearchMatchIndex(READER_STATE.searchMatchIndex, {
      scroll: options.scrollToMatch !== false,
    });
  } else {
    READER_STATE.searchMatchIndex = 0;
    updateSearchNavUi();
  }
}

/**
 * Isole la barre de recherche des handlers globaux (surlignage) sans bloquer
 * le focus natif : jamais de stopPropagation en phase capture sur l'input.
 */
function bindSearchFocusTargets() {
  searchFocusBindAbort?.abort();
  const ac = new AbortController();
  searchFocusBindAbort = ac;
  const { signal } = ac;

  const search = overlayEl?.querySelector("#rct-reader-search");
  const row = overlayEl?.querySelector(".rct-reader__search-row");
  const wrap = overlayEl?.querySelector(".rct-reader__search-wrap");
  const label = overlayEl?.querySelector(".rct-reader__search-label");
  const nav = overlayEl?.querySelector(".rct-reader__search-nav");

  const stopBubble = (ev) => {
    ev.stopPropagation();
  };

  for (const node of [search, row, wrap, label, nav].filter(Boolean)) {
    node.addEventListener("pointerdown", stopBubble, { signal });
    node.addEventListener("touchstart", stopBubble, { signal, passive: true });
    node.addEventListener("click", stopBubble, { signal });
  }

  search?.addEventListener(
    "pointerdown",
    () => {
      focusReaderSearch();
    },
    { signal },
  );

  for (const node of [wrap, label].filter(Boolean)) {
    node.addEventListener(
      "pointerdown",
      (ev) => {
        ev.preventDefault();
        focusReaderSearch();
      },
      { signal },
    );
  }
}

function bindOverlay() {
  if (!overlayEl) return;

  overlayEl.querySelector("[data-reader-close]")?.addEventListener("click", () => {
    if (!READER_STATE.embedded) closeReader();
  });

  overlayEl.querySelector("[data-reader-mark-mode]")?.addEventListener("click", () => {
    READER_STATE.markMode = !READER_STATE.markMode;
    closeMarkMenu();
    refreshOverlay();
  });

  overlayEl.querySelector("[data-reader-minimize]")?.addEventListener("click", () => {
    READER_STATE.minimized = !READER_STATE.minimized;
    refreshOverlay();
  });

  const search = overlayEl.querySelector("#rct-reader-search");
  bindSearchFocusTargets();

  search?.addEventListener("input", () => {
    const next = search.value;
    const prevNorm = normalizeSearchText(READER_STATE.query.trim());
    const nextNorm = normalizeSearchText(next.trim());
    READER_STATE.query = next;
    if (prevNorm !== nextNorm) READER_STATE.searchMatchIndex = 0;
    refreshReaderSearchResults({ scrollToMatch: Boolean(nextNorm) });
  });

  overlayEl.querySelector("[data-reader-search-clear]")?.addEventListener("click", clearReaderSearch);

  overlayEl.querySelector("[data-reader-search-prev]")?.addEventListener("click", () => {
    setSearchMatchIndex(READER_STATE.searchMatchIndex - 1, { direction: "prev" });
  });

  overlayEl.querySelector("[data-reader-search-next]")?.addEventListener("click", () => {
    setSearchMatchIndex(READER_STATE.searchMatchIndex + 1, { direction: "next" });
  });

  bindTocSectionButtons();

  overlayEl.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      if (READER_STATE.embedded) return;
      ev.preventDefault();
      if (READER_STATE.minimized) {
        READER_STATE.minimized = false;
        refreshOverlay();
      } else {
        closeReader();
      }
    }
  });

  const content = overlayEl.querySelector(".rct-reader__content");
  content?.addEventListener(
    "scroll",
    () => {
      cancelAnimationFrame(scrollSpyRaf);
      scrollSpyRaf = requestAnimationFrame(updateScrollSpy);
    },
    { passive: true },
  );
  requestAnimationFrame(updateScrollSpy);

  const contentEl = overlayEl.querySelector(".rct-reader__content");
  bindUserMarks(contentEl);
}

export function isReaderOpen() {
  return READER_STATE.open;
}

export function openReader(sectionId = null, options = {}) {
  READER_STATE.open = true;
  READER_STATE.minimized = false;
  READER_STATE.embedded = options.embedded === true;
  if (sectionId) READER_STATE.activeSectionId = sectionId;
  if (overlayEl) {
    overlayEl.classList.toggle("rct-reader-root--embedded", READER_STATE.embedded);
    document.body.classList.toggle("app-section-reader", READER_STATE.embedded);
    refreshOverlay();
    return;
  }
  searchIndex = null;
  mountOverlay();
  void maybeOfferManuelRestore(reapplyMarksInPlace);
}

export function setReaderEmbedded(embedded) {
  READER_STATE.embedded = embedded;
  if (!overlayEl) return;
  overlayEl.classList.toggle("rct-reader-root--embedded", embedded);
  document.body.classList.toggle("app-section-reader", embedded);
  refreshOverlay();
}

export function closeReader() {
  READER_STATE.open = false;
  READER_STATE.minimized = false;
  unmountOverlay();
}

export function toggleReader() {
  if (READER_STATE.open) closeReader();
  else openReader();
}
