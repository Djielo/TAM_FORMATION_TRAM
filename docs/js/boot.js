/**
 * Point d'entrée unique — vérifie l'environnement, charge l'application, intercepte les erreurs.
 *
 * Cache : index.html injecte une import map (scope /js/) avec ?v=__RCT_BUST__ sur
 * chaque module listé dans modules-manifest.js — les imports statiques type
 * import x from "./store.js" ne contournent plus le cache navigateur.
 */

const BUST = globalThis.__RCT_BUST__ || String(Date.now());
globalThis.__RCT_BUST__ = BUST;

const MODULE_FILES = globalThis.__RCT_JS_MODULES__ || [
  "build.js",
  "data.js",
  "pool.js",
  "store.js",
  "pretest-session.js",
  "backup.js",
  "dialog.js",
  "cloze.js",
  "rct-app.js",
];

const EXPECTED_SCRIPTS = MODULE_FILES.map((f) => `js/${f}`);

function mod(path) {
  return import(`${path}?v=${BUST}`);
}

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
      "Lancez : <code>python serve.py</code> (ou <code>python -m http.server 8080</code>).",
      "Puis ouvrez : <strong>http://localhost:8080</strong>",
    ],
  );
}

async function verifyScriptsReachable() {
  const missing = [];
  for (const path of EXPECTED_SCRIPTS) {
    try {
      const res = await fetch(`${path}?v=${BUST}`, { cache: "no-store" });
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
        "Rechargez avec <strong>Ctrl+F5</strong>.",
        "Serveur lancé depuis <strong>docs/</strong> : <code>python serve.py</code>.",
        "Nouveau module JS ? Ajoutez-le dans <code>js/modules-manifest.js</code>.",
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
        "Rechargez avec <strong>Ctrl+F5</strong>.",
        "Si le problème persiste : F12 → Application → Local Storage → supprimer les clés <code>tam-rct-*</code>.",
        "Nouveau module JS ? Vérifiez <code>js/modules-manifest.js</code>.",
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
    globalThis.__RCT_BUILD__ = await mod("./build.js");
    globalThis.__RCT_DATA__ = await mod("./data.js");
    const pool = await mod("./pool.js");
    pool.invalidateQuestionPool();
    await mod("./rct-app.js");
  } catch (err) {
    const msg = err?.stack || err?.message || String(err);
    const wrongFolder = /introuvables|HTTP 404/i.test(msg);
    showFatalError(
      "Impossible de démarrer l'application",
      msg,
      wrongFolder
        ? [
            "Le serveur HTTP n'est probablement pas lancé depuis <strong>docs/</strong>.",
            "Terminal : <code>cd docs</code> puis <code>python serve.py</code>",
            "Fichier manquant ? Ajoutez-le à <code>js/modules-manifest.js</code>.",
          ]
        : [
            "Rechargez avec <strong>Ctrl+F5</strong> (pas seulement F5).",
            "Serveur : <code>python serve.py</code> depuis <strong>docs/</strong> (cache HTTP désactivé).",
            "Import cassé après ajout d'un fichier ? <code>js/modules-manifest.js</code>.",
          ],
    );
  }
}

start();
