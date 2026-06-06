/**
 * Point d'entrée unique — vérifie l'environnement, charge l'application, intercepte les erreurs.
 */

const EXPECTED_SCRIPTS = [
  "js/data.js",
  "js/pool.js",
  "js/store.js",
  "js/pretest-session.js",
  "js/backup.js",
  "js/dialog.js",
  "js/rct-app.js",
];

function escapeHtml(raw) {
  return String(raw)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showFatalError(title, details, hints = []) {
  const el = document.getElementById("app");
  const hintHtml = hints.length
    ? `<ul class="boot-error__hints">${hints.map((h) => `<li>${h}</li>`).join("")}</ul>`
    : "";
  const html = `<main class="main boot-error">
    <h2 class="screen-title">${escapeHtml(title)}</h2>
    ${hintHtml}
    <pre class="boot-error__pre">${escapeHtml(details)}</pre>
  </main>`;
  if (el) el.innerHTML = html;
  console.error(title, details);
}

function protocolError() {
  showFatalError(
    "Ouverture incorrecte",
    "L'application ne peut pas démarrer avec file:// (double-clic sur index.html).",
    [
      "Ouvrez un terminal dans le dossier <strong>docs/</strong> du projet.",
      "Lancez : <code>python -m http.server 8080</code>",
      "Puis ouvrez : <strong>http://localhost:8080</strong>",
    ],
  );
}

async function verifyScriptsReachable() {
  const missing = [];
  for (const path of EXPECTED_SCRIPTS) {
    try {
      const res = await fetch(path, { cache: "no-store" });
      if (!res.ok) missing.push(`${path} (HTTP ${res.status})`);
    } catch (err) {
      missing.push(`${path} (${err?.message || "réseau"})`);
    }
  }
  if (missing.length) {
    throw new Error(
      `Fichiers JavaScript introuvables :\n${missing.join("\n")}`,
    );
  }
}

function installGlobalErrorHandlers() {
  window.addEventListener("error", (event) => {
    if (window.__RCT_APP_READY__) return;
    const msg = event.error?.stack || event.message || "Erreur inconnue";
    showFatalError(
      "Erreur dans l'application",
      msg,
      [
        "Vérifiez que le serveur est lancé depuis le dossier <strong>docs/</strong>.",
        "URL attendue : <strong>http://localhost:8080</strong>",
      ],
    );
  });

  window.addEventListener("unhandledrejection", (event) => {
    if (window.__RCT_APP_READY__) return;
    const reason = event.reason;
    const msg = reason?.stack || reason?.message || String(reason);
    showFatalError(
      "Erreur asynchrone",
      msg,
      [
        "Si le problème persiste : F12 → Application → Local Storage → supprimer les clés <code>tam-rct-*</code>, puis recharger.",
      ],
    );
  });
}

async function start() {
  if (location.protocol === "file:") {
    protocolError();
    return;
  }

  installGlobalErrorHandlers();

  try {
    await verifyScriptsReachable();
    // Chaîne de modules dans l'ordre (évite les imports manquants entre fichiers).
    await import("./data.js");
    await import("./pool.js");
    await import("./store.js");
    await import("./pretest-session.js");
    await import("./rct-app.js?v=2026-06-06q");
  } catch (err) {
    const msg = err?.stack || err?.message || String(err);
    const wrongFolder = /introuvables|HTTP 404/i.test(msg);
    showFatalError(
      "Impossible de démarrer l'application",
      msg,
      wrongFolder
        ? [
            "Le serveur HTTP n'est probablement pas lancé depuis <strong>docs/</strong>.",
            "Terminal : <code>cd docs</code> puis <code>python -m http.server 8080</code>",
            "Puis : <strong>http://localhost:8080</strong>",
          ]
        : [
            "Vérifiez la console (F12) pour le détail.",
            "Serveur attendu : <strong>http://localhost:8080</strong> depuis <strong>docs/</strong>.",
          ],
    );
  }
}

start();
