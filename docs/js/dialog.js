/** Boîtes de dialogue intégrées (remplace alert / confirm natifs). */

const ROOT_ID = "app-dialog-root";
const TAG = "d" + "iv";

function escapeHtml(raw) {
  return String(raw)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMessage(message) {
  return String(message)
    .split(/\n\n+/)
    .map((block) => `<p>${escapeHtml(block.trim())}</p>`)
    .join("");
}

function el(className, attrs, inner) {
  const a = attrs ? ` ${attrs}` : "";
  return `<${TAG} class="${className}"${a}>${inner}</${TAG}>`;
}

function getRoot() {
  let root = document.getElementById(ROOT_ID);
  if (!root) {
    root = document.createElement(TAG);
    root.id = ROOT_ID;
    root.hidden = true;
    document.body.appendChild(root);
  }
  return root;
}

function setBodyLocked(locked) {
  document.body.classList.toggle("app-dialog-open", locked);
}

function mountDialog(html, onReady) {
  const root = getRoot();
  root.innerHTML = html;
  root.hidden = false;
  setBodyLocked(true);
  onReady(root);
}

function unmountDialog(root, resolve, value) {
  root.hidden = true;
  root.innerHTML = "";
  setBodyLocked(false);
  resolve(value);
}

/**
 * @param {object} opts
 * @param {string} [opts.title]
 * @param {string} opts.message
 * @param {string} [opts.confirmLabel]
 * @param {string} [opts.cancelLabel]
 * @param {boolean} [opts.danger]
 * @returns {Promise<boolean>}
 */
export function showConfirm({
  title = "Confirmation",
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  danger = false,
}) {
  return new Promise((resolve) => {
    const confirmCls = danger ? "btn btn--danger" : "btn btn--primary";
    const panel = el(
      "app-dialog",
      'role="alertdialog" aria-modal="true" aria-labelledby="app-dialog-title" aria-describedby="app-dialog-desc"',
      [
        `<h2 id="app-dialog-title" class="app-dialog__title">${escapeHtml(title)}</h2>`,
        el("app-dialog__body", 'id="app-dialog-desc"', formatMessage(message)),
        el(
          "app-dialog__actions",
          "",
          [
            `<button type="button" class="btn btn--ghost" data-dialog-cancel>${escapeHtml(cancelLabel)}</button>`,
            `<button type="button" class="${confirmCls}" data-dialog-confirm>${escapeHtml(confirmLabel)}</button>`,
          ].join("")
        ),
      ].join("")
    );
    const html = el("app-dialog-backdrop", 'role="presentation"', panel);

    mountDialog(html, (root) => {
      const backdrop = root.querySelector(".app-dialog-backdrop");
      const btnCancel = root.querySelector("[data-dialog-cancel]");
      const btnConfirm = root.querySelector("[data-dialog-confirm]");

      const finish = (value) => {
        document.removeEventListener("keydown", onKey);
        unmountDialog(root, resolve, value);
      };

      const onKey = (e) => {
        if (e.key === "Escape") finish(false);
      };

      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) finish(false);
      });
      btnCancel.addEventListener("click", () => finish(false));
      btnConfirm.addEventListener("click", () => finish(true));
      document.addEventListener("keydown", onKey);
      (danger ? btnCancel : btnConfirm).focus();
    });
  });
}

/**
 * Confirmation avec case « Ne plus afficher » (optionnelle).
 * @returns {Promise<{ confirmed: boolean, dismissChecked: boolean }>}
 */
export function showConfirmWithDismiss({
  title = "Confirmation",
  message,
  confirmLabel = "OK",
  cancelLabel = "Annuler",
  dismissLabel = "Ne plus afficher",
  danger = false,
}) {
  return new Promise((resolve) => {
    const confirmCls = danger ? "btn btn--danger" : "btn btn--primary";
    const panel = el(
      "app-dialog",
      'role="alertdialog" aria-modal="true" aria-labelledby="app-dialog-title" aria-describedby="app-dialog-desc"',
      [
        `<h2 id="app-dialog-title" class="app-dialog__title">${escapeHtml(title)}</h2>`,
        el("app-dialog__body", 'id="app-dialog-desc"', formatMessage(message)),
        `<label class="app-dialog__dismiss"><input type="checkbox" data-dialog-dismiss /> ${escapeHtml(dismissLabel)}</label>`,
        el(
          "app-dialog__actions",
          "",
          [
            `<button type="button" class="btn btn--ghost" data-dialog-cancel>${escapeHtml(cancelLabel)}</button>`,
            `<button type="button" class="${confirmCls}" data-dialog-confirm>${escapeHtml(confirmLabel)}</button>`,
          ].join("")
        ),
      ].join("")
    );
    const html = el("app-dialog-backdrop", 'role="presentation"', panel);

    mountDialog(html, (root) => {
      const backdrop = root.querySelector(".app-dialog-backdrop");
      const btnCancel = root.querySelector("[data-dialog-cancel]");
      const btnConfirm = root.querySelector("[data-dialog-confirm]");
      const dismissInput = root.querySelector("[data-dialog-dismiss]");

      const finish = (confirmed) => {
        document.removeEventListener("keydown", onKey);
        const dismissChecked = Boolean(dismissInput?.checked);
        unmountDialog(root, resolve, { confirmed, dismissChecked });
      };

      const onKey = (e) => {
        if (e.key === "Escape") finish(false);
      };

      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) finish(false);
      });
      btnCancel.addEventListener("click", () => finish(false));
      btnConfirm.addEventListener("click", () => finish(true));
      document.addEventListener("keydown", onKey);
      (danger ? btnCancel : btnConfirm).focus();
    });
  });
}

/**
 * @param {object} opts
 * @param {string} [opts.title]
 * @param {string} opts.message
 * @param {string} [opts.confirmLabel]
 * @returns {Promise<void>}
 */
export function showAlert({
  title = "Information",
  message,
  confirmLabel = "OK",
}) {
  return new Promise((resolve) => {
    const panel = el(
      "app-dialog",
      'role="alertdialog" aria-modal="true" aria-labelledby="app-dialog-title" aria-describedby="app-dialog-desc"',
      [
        `<h2 id="app-dialog-title" class="app-dialog__title">${escapeHtml(title)}</h2>`,
        el("app-dialog__body", 'id="app-dialog-desc"', formatMessage(message)),
        el(
          "app-dialog__actions app-dialog__actions--single",
          "",
          `<button type="button" class="btn btn--primary" data-dialog-confirm>${escapeHtml(confirmLabel)}</button>`
        ),
      ].join("")
    );
    const html = el("app-dialog-backdrop", 'role="presentation"', panel);

    mountDialog(html, (root) => {
      const backdrop = root.querySelector(".app-dialog-backdrop");
      const btnConfirm = root.querySelector("[data-dialog-confirm]");

      const finish = () => {
        document.removeEventListener("keydown", onKey);
        unmountDialog(root, resolve, undefined);
      };

      const onKey = (e) => {
        if (e.key === "Escape" || e.key === "Enter") finish();
      };

      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) finish();
      });
      btnConfirm.addEventListener("click", finish);
      document.addEventListener("keydown", onKey);
      btnConfirm.focus();
    });
  });
}
