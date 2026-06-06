/**
 * Sauvegarde hors navigateur (fichier JSON sur l'appareil) et reprise après vidage du cache.
 */
import { KEYS, migrateStorage, STORAGE_SCHEMA_VERSION } from "./store.js";

export const BACKUP_FILE_NAME = "tam-rct-progression.json";
export const BACKUP_FORMAT_VERSION = 1;

const IDB_NAME = "tam-rct-backup";
const IDB_VERSION = 1;
const IDB_STORE = "meta";
const IDB_HANDLE_KEY = "fileHandle";

const EXPORT_KEY_IDS = [
  "revision",
  "mastery",
  "srs",
  "pretestPrefs",
  "pretestLastEnd",
  "finalPrefs",
  "helpDismissed",
  "pretestStats",
  "devUnlock",
  "finalHistory",
  "schema",
];

function isEmptyJson(raw) {
  if (!raw) return true;
  const t = raw.trim();
  if (t === "{}" || t === "[]" || t === "null") return true;
  try {
    const p = JSON.parse(t);
    return (
      p !== null &&
      typeof p === "object" &&
      !Array.isArray(p) &&
      Object.keys(p).length === 0
    );
  } catch {
    return false;
  }
}

export function isVoluntaryResetFlagged() {
  return localStorage.getItem(KEYS.voluntaryReset) === "1";
}

/** Progression locale vide (maîtrise + scores modules + SRS). */
export function isLocalProgressEmpty() {
  const mastery = localStorage.getItem(KEYS.mastery);
  if (mastery && !isEmptyJson(mastery)) return false;

  const revision =
    localStorage.getItem(KEYS.revision) ||
    localStorage.getItem(KEYS.revisionLegacy);
  if (revision && !isEmptyJson(revision)) return false;

  const srs = localStorage.getItem(KEYS.srs);
  if (srs && !isEmptyJson(srs)) return false;

  const pretestStats = localStorage.getItem(KEYS.pretestStats);
  if (pretestStats && !isEmptyJson(pretestStats)) return false;

  return true;
}

export function shouldOfferBackupRestore() {
  return isLocalProgressEmpty() && !isVoluntaryResetFlagged();
}

function buildBackupPayload(intentionalReset = false) {
  const storage = {};
  for (const id of EXPORT_KEY_IDS) {
    const key = KEYS[id];
    const val = localStorage.getItem(key);
    if (val != null) storage[key] = val;
  }
  const legacy = localStorage.getItem(KEYS.revisionLegacy);
  if (legacy != null) storage[KEYS.revisionLegacy] = legacy;

  return {
    formatVersion: BACKUP_FORMAT_VERSION,
    app: "tam-rct",
    savedAt: Date.now(),
    intentionalReset,
    storage,
  };
}

function hasMeaningfulProgress(storage) {
  if (!storage || typeof storage !== "object") return false;
  const mastery = storage[KEYS.mastery];
  if (mastery && !isEmptyJson(mastery)) return true;
  const revision =
    storage[KEYS.revision] || storage[KEYS.revisionLegacy];
  if (revision && !isEmptyJson(revision)) return true;
  const srs = storage[KEYS.srs];
  if (srs && !isEmptyJson(srs)) return true;
  return false;
}

function openBackupDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
  });
}

async function getStoredBackupHandle() {
  try {
    const db = await openBackupDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readonly");
      const req = tx.objectStore(IDB_STORE).get(IDB_HANDLE_KEY);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

async function setStoredBackupHandle(handle) {
  const db = await openBackupDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readwrite");
    tx.objectStore(IDB_STORE).put(handle, IDB_HANDLE_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function clearStoredBackupHandle() {
  try {
    const db = await openBackupDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).delete(IDB_HANDLE_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    /* ignore */
  }
}

/**
 * @param {FileSystemFileHandle} handle
 * @param {string} text
 */
async function writeTextToHandle(handle, text) {
  let perm = await handle.queryPermission({ mode: "readwrite" });
  if (perm !== "granted") {
    perm = await handle.requestPermission({ mode: "readwrite" });
    if (perm !== "granted") return false;
  }
  const writable = await handle.createWritable();
  await writable.write(text);
  await writable.close();
  return true;
}

/** Même fichier sur l'appareil (écrasement) si autorisé ; sinon téléchargement classique. */
async function persistBackupToDevice(jsonString) {
  let handle = await getStoredBackupHandle();
  if (handle) {
    try {
      if (await writeTextToHandle(handle, jsonString)) return;
    } catch {
      await clearStoredBackupHandle();
      handle = null;
    }
  }

  if (typeof window.showSaveFilePicker === "function") {
    try {
      const picked = await window.showSaveFilePicker({
        suggestedName: BACKUP_FILE_NAME,
        types: [
          {
            description: "Sauvegarde RCT",
            accept: { "application/json": [".json"] },
          },
        ],
      });
      await setStoredBackupHandle(picked);
      if (await writeTextToHandle(picked, jsonString)) return;
    } catch (err) {
      if (err?.name === "AbortError") {
        triggerDownload(jsonString);
        return;
      }
    }
  }

  triggerDownload(jsonString);
}

function triggerDownload(jsonString, fileName = BACKUP_FILE_NAME) {
  const blob = new Blob([jsonString], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** Sauvegarde fichier après fin de module / session (révision, pré-examen, examen final). */
export async function writeProgressBackupFile() {
  if (isLocalProgressEmpty()) return;
  localStorage.removeItem(KEYS.voluntaryReset);
  const payload = buildBackupPayload(false);
  await persistBackupToDevice(JSON.stringify(payload, null, 0));
}

/** Marqueur après reset volontaire (5 × RCT) — écrase la sauvegarde utile sur l'appareil. */
export async function writeIntentionalResetBackup() {
  localStorage.setItem(KEYS.voluntaryReset, "1");
  const payload = buildBackupPayload(true);
  await persistBackupToDevice(JSON.stringify(payload, null, 0));
}

/**
 * @param {unknown} raw
 * @returns {{ ok: true, storage: Record<string, string> } | { ok: false, reason: string }}
 */
export function validateBackupPayload(raw) {
  if (!raw || typeof raw !== "object") {
    return { ok: false, reason: "Fichier invalide." };
  }
  const data = /** @type {{ formatVersion?: number, intentionalReset?: boolean, storage?: Record<string, string> }} */ (
    raw
  );
  if (data.intentionalReset) {
    return {
      ok: false,
      reason:
        "Cette sauvegarde correspond à une réinitialisation volontaire. Aucune progression à reprendre.",
    };
  }
  if (data.formatVersion !== BACKUP_FORMAT_VERSION) {
    return { ok: false, reason: "Version de sauvegarde non reconnue." };
  }
  const storage = data.storage;
  if (!storage || typeof storage !== "object") {
    return { ok: false, reason: "Contenu de sauvegarde manquant." };
  }
  if (!hasMeaningfulProgress(storage)) {
    return { ok: false, reason: "Aucune progression exploitable dans ce fichier." };
  }
  return { ok: true, storage };
}

export function applyBackupStorage(storage) {
  for (const [key, val] of Object.entries(storage)) {
    if (typeof val !== "string") continue;
    if (!key.startsWith("tam-rct-") && !key.startsWith("tam-bible-")) continue;
    localStorage.setItem(key, val);
  }
  if (!localStorage.getItem(KEYS.schema)) {
    localStorage.setItem(KEYS.schema, String(STORAGE_SCHEMA_VERSION));
  }
  localStorage.removeItem(KEYS.voluntaryReset);
  migrateStorage();
}

/**
 * @returns {Promise<{ ok: true } | { ok: false, reason?: string, cancelled?: boolean }>}
 */
export function pickAndRestoreBackupFile() {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    input.style.display = "none";
    document.body.appendChild(input);

    const cleanup = () => input.remove();

    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      cleanup();
      if (!file) {
        resolve({ ok: false, cancelled: true });
        return;
      }
      try {
        const text = await file.text();
        const raw = JSON.parse(text);
        const check = validateBackupPayload(raw);
        if (!check.ok) {
          resolve({ ok: false, reason: check.reason });
          return;
        }
        applyBackupStorage(check.storage);
        const handle = await getStoredBackupHandle();
        if (!handle && "showSaveFilePicker" in window) {
          try {
            const picked = await window.showSaveFilePicker({
              suggestedName: file.name || BACKUP_FILE_NAME,
              types: [
                {
                  description: "Sauvegarde RCT",
                  accept: { "application/json": [".json"] },
                },
              ],
            });
            await setStoredBackupHandle(picked);
            await writeTextToHandle(picked, text);
          } catch {
            /* reprise OK même sans handle */
          }
        }
        resolve({ ok: true });
      } catch {
        resolve({ ok: false, reason: "Impossible de lire ce fichier." });
      }
    });

    input.addEventListener("cancel", () => {
      cleanup();
      resolve({ ok: false, cancelled: true });
    });

    input.click();
  });
}
