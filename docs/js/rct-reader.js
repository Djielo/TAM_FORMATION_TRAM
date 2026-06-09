/**
 * Consultation intégrale du RCT — panneau plein écran, sommaire, recherche au fil de la frappe.
 */

import {
  RCT_IMAGE_BASE,
  RCT_LECTURE_SECTIONS,
  RCT_LECTURE_TOC,
} from "./data-rct-lecture.js";

const READER_STATE = {
  open: false,
  minimized: false,
  query: "",
  activeSectionId: RCT_LECTURE_TOC[0]?.id || null,
};

let searchIndex = null;
let overlayEl = null;
/** Navigation sommaire en cours — ne pas restaurer l'ancien scroll contenu. */
let pendingNavSectionId = null;

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
    if (block.type === "sommaire-ch1") {
      for (const entry of block.entries || []) {
        parts.push(entry.title, String(entry.page ?? ""));
        parts.push(...(entry.subs || []));
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
    if (block.headers) parts.push(...block.headers);
    if (block.rows) {
      for (const row of block.rows) parts.push(...row);
    }
  }
  return parts.join(" ");
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

function highlightText(text, queryNorm) {
  const raw = String(text);
  if (!queryNorm) return escapeHtml(raw);
  const norm = normalizeSearchText(raw);
  const idx = norm.indexOf(queryNorm);
  if (idx < 0) return escapeHtml(raw);

  const end = idx + queryNorm.length;
  return (
    escapeHtml(raw.slice(0, idx)) +
    `<mark class="rct-reader__mark">${escapeHtml(raw.slice(idx, end))}</mark>` +
    highlightText(raw.slice(end), queryNorm)
  );
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
  if (item?.text && item?.tail && !item?.lines) {
    const tail = `<span class="lecture-note lecture-note--purple">${highlightText(item.tail.text, queryNorm)}</span>`;
    return `<li class="lecture-steps__item" value="${num}"><p>${highlightText(item.text, queryNorm)}${tail}</p></li>`;
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

function renderBlock(block, queryNorm) {
  switch (block.type) {
    case "page-scan": {
      const src = `${RCT_IMAGE_BASE}${escapeHtml(block.src || "")}`;
      const cap = block.caption || "Page RCT";
      return `<figure class="lecture-page-scan">
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
    case "p":
      if (block.parts?.length) {
        const inner = block.parts
          .map((part) => {
            const cls = part.red ? "lecture-inline--red" : "";
            const chunk = highlightText(part.t, queryNorm);
            return cls ? `<span class="${cls}">${chunk}</span>` : chunk;
          })
          .join("");
        return `<p class="lecture-p">${inner}</p>`;
      }
      return `<p class="lecture-p">${highlightText(block.text, queryNorm)}</p>`;
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
      const prefix = block.prefix
        ? `<span class="lecture-warning__prefix">${highlightText(block.prefix, queryNorm)}</span> `
        : "";
      const body = block.text ? highlightText(block.text, queryNorm) : "";
      const suffix = block.suffix
        ? `<span class="lecture-warning__suffix">${highlightText(block.suffix, queryNorm)}</span>`
        : "";
      return `<aside class="lecture-warning" role="note">${prefix}${body}${suffix}</aside>`;
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
          const text = typeof item === "string" ? item : item.text || "";
          const cls = item?.red ? " lecture-ul__li--red" : "";
          return `<li class="${cls.trim()}">${highlightText(text, queryNorm)}</li>`;
        })
        .join("")}</ul>`;
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
    default:
      return "";
  }
}

function renderSectionBody(section, queryNorm) {
  return (section.blocks || []).map((b) => renderBlock(b, queryNorm)).join("");
}

function renderTocItem(section, queryNorm, activeId) {
  const visible = sectionMatchesQuery(section.id, queryNorm);
  if (!visible) return "";
  const levelClass = `rct-reader__toc-item--l${section.level}`;
  const active = section.id === activeId ? " rct-reader__toc-item--active" : "";
  const label = [
    section.code ? `<span class="rct-reader__toc-code">${escapeHtml(section.code)}</span>` : "",
    `<span class="rct-reader__toc-title">${highlightText(section.title, queryNorm)}</span>`,
    section.page != null
      ? `<span class="rct-reader__toc-page">p. ${section.page}</span>`
      : "",
  ].join("");
  return `<button type="button" class="rct-reader__toc-item ${levelClass}${active}" data-reader-section="${escapeHtml(section.id)}">${label}</button>`;
}

function renderToc(queryNorm, activeId) {
  const items = RCT_LECTURE_TOC.map((s) => renderTocItem(s, queryNorm, activeId)).join("");
  if (!items && queryNorm) {
    return `<p class="rct-reader__toc-empty">Aucune section ne correspond à « ${escapeHtml(queryNorm)} ».</p>`;
  }
  return items;
}

function renderSectionArticle(section, queryNorm, forceShow) {
  const visible = forceShow || sectionContentVisible(section.id, queryNorm);
  if (!visible) return "";
  const hidden =
    queryNorm && !sectionContentVisible(section.id, queryNorm) ? " hidden" : "";
  return `<article class="lecture-section${hidden}" id="reader-${escapeHtml(section.id)}" data-reader-article="${escapeHtml(section.id)}">
    <div class="lecture-section__body">${renderSectionBody(section, queryNorm)}</div>
  </article>`;
}

function renderReaderMarkup() {
  const queryNorm = normalizeSearchText(READER_STATE.query.trim());
  const matchCount = queryNorm
    ? RCT_LECTURE_TOC.filter((s) => sectionMatchesQuery(s.id, queryNorm)).length
    : RCT_LECTURE_TOC.length;
  const minimizedClass = READER_STATE.minimized ? " rct-reader--minimized" : "";
  const showAll = !queryNorm;

  return `<div class="rct-reader${minimizedClass}" role="dialog" aria-modal="true" aria-label="Consultation du RCT">
    <div class="rct-reader__chrome">
      <div class="rct-reader__chrome-main">
        <h2 class="rct-reader__title">Consultation et recherche — RCT</h2>
        <p class="rct-reader__subtitle">Pages 1–9 · § 1.1 — scans source/images/RCT</p>
      </div>
      <div class="rct-reader__chrome-actions">
        <button type="button" class="rct-reader__btn-icon" data-reader-minimize title="${READER_STATE.minimized ? "Agrandir" : "Réduire"}" aria-label="${READER_STATE.minimized ? "Agrandir le panneau" : "Réduire le panneau"}">${READER_STATE.minimized ? "▢" : "—"}</button>
        <button type="button" class="rct-reader__btn-icon rct-reader__btn-icon--close" data-reader-close title="Fermer" aria-label="Fermer la consultation">×</button>
      </div>
    </div>
    <div class="rct-reader__body">
      <aside class="rct-reader__sidebar" aria-label="Sommaire">
        <label class="rct-reader__search-label" for="rct-reader-search">Rechercher dans le RCT</label>
        <div class="rct-reader__search-wrap">
          <input type="search" id="rct-reader-search" class="rct-reader__search" value="${escapeHtml(READER_STATE.query)}" placeholder="Ex. frein, chasse-corps, PCC…" autocomplete="off" enterkeyhint="search" />
          ${
            READER_STATE.query.trim()
              ? `<button type="button" class="rct-reader__search-clear" data-reader-search-clear title="Effacer la recherche" aria-label="Effacer la recherche">×</button>`
              : ""
          }
        </div>
        <p class="rct-reader__search-meta" aria-live="polite">${matchCount} section${matchCount > 1 ? "s" : ""}</p>
        <nav class="rct-reader__toc">${renderToc(queryNorm, READER_STATE.activeSectionId)}</nav>
      </aside>
      <div class="rct-reader__content" tabindex="0">
        <div class="rct-reader__content-inner">
          ${RCT_LECTURE_SECTIONS.map((s) => renderSectionArticle(s, queryNorm, showAll)).join("")}
        </div>
      </div>
    </div>
  </div>`;
}

function scrollContentToSection(sectionId) {
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
  root.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

function scrollTocToActive(sectionId) {
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
  toc.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

function queueSectionNavigation(sectionId) {
  const run = () => {
    scrollContentToSection(sectionId);
    scrollTocToActive(sectionId);
  };
  requestAnimationFrame(() => {
    run();
    requestAnimationFrame(run);
  });
  const article = overlayEl?.querySelector(`#reader-${CSS.escape(sectionId)}`);
  article?.querySelectorAll("img").forEach((img) => {
    if (!img.complete) {
      img.addEventListener("load", () => scrollContentToSection(sectionId), {
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
  overlayEl.className = "rct-reader-root";
  overlayEl.innerHTML = renderReaderMarkup();
  document.body.appendChild(overlayEl);
  document.body.classList.add("rct-reader-open");
  bindOverlay();
  if (READER_STATE.activeSectionId) {
    queueSectionNavigation(READER_STATE.activeSectionId);
  }
}

function unmountOverlay() {
  document.body.classList.remove("rct-reader-open");
  overlayEl?.remove();
  overlayEl = null;
}

function refreshOverlay(options = {}) {
  if (!overlayEl) return;
  const navSectionId = pendingNavSectionId;
  const preserveContentScroll = !navSectionId;
  const scrollTop = preserveContentScroll
    ? (overlayEl.querySelector(".rct-reader__content")?.scrollTop ?? 0)
    : 0;
  const searchFocus =
    options.focusSearch === true ||
    document.activeElement?.id === "rct-reader-search";
  const selStart = options.focusSearch
    ? 0
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
}

function bindOverlay() {
  if (!overlayEl) return;

  overlayEl.querySelector("[data-reader-close]")?.addEventListener("click", () => {
    closeReader();
  });

  overlayEl.querySelector("[data-reader-minimize]")?.addEventListener("click", () => {
    READER_STATE.minimized = !READER_STATE.minimized;
    refreshOverlay();
  });

  const search = overlayEl.querySelector("#rct-reader-search");
  search?.addEventListener("input", () => {
    READER_STATE.query = search.value;
    refreshOverlay();
  });

  overlayEl.querySelector("[data-reader-search-clear]")?.addEventListener("click", () => {
    READER_STATE.query = "";
    refreshOverlay({ focusSearch: true });
  });

  overlayEl.querySelectorAll("[data-reader-section]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-reader-section");
      if (!id) return;
      READER_STATE.activeSectionId = id;
      pendingNavSectionId = id;
      refreshOverlay();
    });
  });

  overlayEl.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      ev.preventDefault();
      if (READER_STATE.minimized) {
        READER_STATE.minimized = false;
        refreshOverlay();
      } else {
        closeReader();
      }
    }
  });
}

export function isReaderOpen() {
  return READER_STATE.open;
}

export function openReader(sectionId = null) {
  READER_STATE.open = true;
  READER_STATE.minimized = false;
  if (sectionId) READER_STATE.activeSectionId = sectionId;
  mountOverlay();
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
