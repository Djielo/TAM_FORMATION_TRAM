/**
 * Vue cachée — aide-mémoire consignes (rédaction manuelle).
 * Accès : 5 appuis rapides sur le titre d'une pop-up d'aide.
 */
import { CONSIGNES_SYNTHESE_SECTIONS } from "./data-rct-consignes-synthese.js";

const ROOT_ID = "consignes-synthese-root";
const TAP_WINDOW_MS = 2500;
const TAP_COUNT = 5;

function escapeHtml(raw) {
  return String(raw)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMemoList(items) {
  if (!items?.length) return "";
  return `<ul class="synthese-fiche__steps">${items.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`;
}

function renderEntry(entry) {
  const noteHtml = entry.note
    ? `<p class="synthese-fiche__note" role="note">${escapeHtml(entry.note)}</p>`
    : "";
  const refsHtml = entry.refs
    ? `<p class="synthese-fiche__refs">${escapeHtml(entry.refs)}</p>`
    : "";
  return `<article class="synthese-fiche" id="synthese-${escapeHtml(entry.id)}">
    <header class="synthese-fiche__head">
      <h4 class="synthese-fiche__title">${escapeHtml(entry.title)}</h4>
      ${refsHtml}
    </header>
    ${formatMemoList(entry.memo)}
    ${noteHtml}
  </article>`;
}

function renderSection(section) {
  const chapterClass = section.chapter === "urgence" ? "urgence" : "circulation";
  const commonHtml = section.common?.length
    ? `<div class="synthese-section__common">${formatMemoList(section.common)}</div>`
    : "";
  return `<section class="synthese-section synthese-section--${chapterClass}" aria-labelledby="synthese-${escapeHtml(section.id)}">
    <h3 id="synthese-${escapeHtml(section.id)}" class="synthese-section__title">${escapeHtml(section.title)}</h3>
    ${commonHtml}
    ${section.entries.map(renderEntry).join("")}
  </section>`;
}

function renderSyntheseHtml() {
  const circulation = CONSIGNES_SYNTHESE_SECTIONS.filter((s) => s.chapter === "circulation");
  const urgence = CONSIGNES_SYNTHESE_SECTIONS.filter((s) => s.chapter === "urgence");

  return `<div class="synthese-chapter-block">
      <h2 class="synthese-chapter-block__title">Ch. 1 — Circulation en ligne</h2>
      ${circulation.map(renderSection).join("")}
    </div>
    <div class="synthese-chapter-block">
      <h2 class="synthese-chapter-block__title">Ch. 2 — Consignes d'urgence</h2>
      ${urgence.map(renderSection).join("")}
    </div>`;
}

function getRoot() {
  let root = document.getElementById(ROOT_ID);
  if (!root) {
    root = document.createElement("div");
    root.id = ROOT_ID;
    root.hidden = true;
    document.body.appendChild(root);
  }
  return root;
}

function setBodyLocked(locked) {
  document.body.classList.toggle("consignes-synthese-open", locked);
}

/** @type {(() => void) | null} */
let keyHandler = null;

export function closeConsignesSynthese() {
  const root = document.getElementById(ROOT_ID);
  if (!root) return;
  root.hidden = true;
  root.innerHTML = "";
  setBodyLocked(false);
  if (keyHandler) {
    document.removeEventListener("keydown", keyHandler);
    keyHandler = null;
  }
}

export function openConsignesSynthese() {
  const root = getRoot();
  root.innerHTML = `<div class="help-backdrop consignes-synthese-backdrop" role="dialog" aria-modal="true" aria-labelledby="consignes-synthese-title">
    <div class="help-modal consignes-synthese-modal">
      <h2 id="consignes-synthese-title">Aide-mémoire consignes</h2>
      <div class="help-modal__body consignes-synthese-modal__body">${renderSyntheseHtml()}</div>
      <button type="button" class="btn btn--primary" data-synthese-close>Fermer</button>
    </div>
  </div>`;
  root.hidden = false;
  setBodyLocked(true);

  const backdrop = root.querySelector(".consignes-synthese-backdrop");
  const closeBtn = root.querySelector("[data-synthese-close]");
  const close = () => closeConsignesSynthese();
  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", (ev) => {
    if (ev.target === backdrop) close();
  });
  keyHandler = (ev) => {
    if (ev.key === "Escape") close();
  };
  document.addEventListener("keydown", keyHandler);
  closeBtn?.focus();
}

/** 5 appuis rapides sur le titre d'aide → ouvre l'aide-mémoire. */
export function bindHiddenConsignesSyntheseGesture(titleEl) {
  if (!titleEl) return;
  let tapCount = 0;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let tapTimer = null;

  titleEl.classList.add("help-modal__title--hidden-trigger");
  titleEl.addEventListener("click", () => {
    tapCount += 1;
    if (tapTimer) clearTimeout(tapTimer);
    tapTimer = setTimeout(() => {
      tapCount = 0;
    }, TAP_WINDOW_MS);
    if (tapCount >= TAP_COUNT) {
      tapCount = 0;
      if (tapTimer) clearTimeout(tapTimer);
      openConsignesSynthese();
    }
  });
}
