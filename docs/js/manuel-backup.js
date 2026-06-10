/**
 * Sauvegarde hors navigateur des surlignages du manuel RCT (lecture intégrale).
 * Fichier distinct de tam-rct-progression.json — non effacé par le reset formation.
 */
import { showAlert, showConfirm } from "./dialog.js";

export const MANUEL_BACKUP_FILE_NAME = "tam-rct-manuel.json";
export const MANUEL_BACKUP_FORMAT_VERSION = 1;

export const LECTURE_MARKS_KEY = "tam-rct-lecture-marks-v1";
const LECTURE_MARKS_KEY_LEGACY = "rct-lecture-user-marks";

const IDB_NAME = "tam-rct-manuel-backup";
const IDB_VERSION = 1;
const IDB_STORE = "meta";
const IDB_HANDLE_KEY = "fileHandle";

let backupWriteTimer = 0;
let restoreOffered = false;

function loadMarksFromStorage() {
  try {
    const raw =
      localStorage.getItem(LECTURE_MARKS_KEY) ||
      localStorage.getItem(LECTURE_MARKS_KEY_LEGACY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function isValidMarkEntry(entry) {
  return (
    entry &&
    typeof entry === "object" &&
    typeof entry.id === "string" &&
    typeof entry.sectionId === "string" &&
    typeof entry.text === "string" &&
    typeof entry.color === "string"
  );
}

export function isLocalManuelEmpty() {
  const marks = loadMarksFromStorage();
  return !Array.isArray(marks) || marks.length === 0;
}

export function shouldOfferManuelRestore() {
  return isLocalManuelEmpty();
}

function buildManuelPayload() {
  const marks = loadMarksFromStorage().filter(isValidMarkEntry);
  return {
    formatVersion: MANUEL_BACKUP_FORMAT_VERSION,
    app: "tam-rct",
    kind: "manuel",
    savedAt: Date.now(),
    marks,
  };
}

function openManuelDb() {
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

async function getStoredManuelHandle() {
  try {
    const db = await openManuelDb();
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

async function setStoredManuelHandle(handle) {
  const db = await openManuelDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readwrite");
    tx.objectStore(IDB_STORE).put(handle, IDB_HANDLE_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function clearStoredManuelHandle() {
  try {
    const db = await openManuelDb();
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

function triggerDownload(jsonString, fileName = MANUEL_BACKUP_FILE_NAME) {
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

async function persistManuelToDevice(jsonString) {
  let handle = await getStoredManuelHandle();
  if (handle) {
    try {
      if (await writeTextToHandle(handle, jsonString)) return;
    } catch {
      await clearStoredManuelHandle();
      handle = null;
    }
  }

  if (typeof window.showSaveFilePicker === "function") {
    try {
      const picked = await window.showSaveFilePicker({
        suggestedName: MANUEL_BACKUP_FILE_NAME,
        types: [
          {
            description: "Surlignages manuel RCT",
            accept: { "application/json": [".json"] },
          },
        ],
      });
      await setStoredManuelHandle(picked);
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

/** Écriture fichier (même emplacement si déjà autorisé sur l'appareil). */
export async function writeManuelBackupFile() {
  const payload = buildManuelPayload();
  await persistManuelToDevice(JSON.stringify(payload, null, 0));
}

/** Regroupe les écritures après plusieurs surlignages rapides. */
export function scheduleManuelBackupWrite(delayMs = 700) {
  window.clearTimeout(backupWriteTimer);
  backupWriteTimer = window.setTimeout(() => {
    backupWriteTimer = 0;
    void writeManuelBackupFile();
  }, delayMs);
}

/**
 * @param {unknown} raw
 * @returns {{ ok: true, marks: object[] } | { ok: false, reason: string }}
 */
export function validateManuelPayload(raw) {
  if (!raw || typeof raw !== "object") {
    return { ok: false, reason: "Fichier invalide." };
  }
  const data = /** @type {{ formatVersion?: number, marks?: unknown }} */ (raw);
  if (data.formatVersion !== MANUEL_BACKUP_FORMAT_VERSION) {
    return { ok: false, reason: "Version de sauvegarde non reconnue." };
  }
  if (!Array.isArray(data.marks)) {
    return { ok: false, reason: "Contenu de sauvegarde manquant." };
  }
  const marks = data.marks.filter(isValidMarkEntry);
  if (!marks.length) {
    return { ok: false, reason: "Aucun surlignage dans ce fichier." };
  }
  return { ok: true, marks };
}

export function applyManuelMarks(marks) {
  localStorage.setItem(LECTURE_MARKS_KEY, JSON.stringify(marks));
  if (localStorage.getItem(LECTURE_MARKS_KEY_LEGACY)) {
    localStorage.removeItem(LECTURE_MARKS_KEY_LEGACY);
  }
}

/**
 * @returns {Promise<{ ok: true } | { ok: false, reason?: string, cancelled?: boolean }>}
 */
export function pickAndRestoreManuelBackupFile() {
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
        const check = validateManuelPayload(raw);
        if (!check.ok) {
          resolve({ ok: false, reason: check.reason });
          return;
        }
        applyManuelMarks(check.marks);
        const handle = await getStoredManuelHandle();
        if (!handle && "showSaveFilePicker" in window) {
          try {
            const picked = await window.showSaveFilePicker({
              suggestedName: file.name || MANUEL_BACKUP_FILE_NAME,
              types: [
                {
                  description: "Surlignages manuel RCT",
                  accept: { "application/json": [".json"] },
                },
              ],
            });
            await setStoredManuelHandle(picked);
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

/**
 * Propose la reprise une fois par session si le localStorage est vide.
 * @param {() => void} [onRestored] rafraîchir l'affichage du lecteur
 */
export async function maybeOfferManuelRestore(onRestored) {
  if (restoreOffered || !shouldOfferManuelRestore()) return;
  restoreOffered = true;

  const ok = await showConfirm({
    title: "Reprendre vos surlignages ?",
    message:
      "Aucun surlignage en mémoire sur cet appareil, mais une sauvegarde (fichier tam-rct-manuel.json) a peut‑être été enregistrée.\n\nVoulez-vous la récupérer ?",
    confirmLabel: "Choisir le fichier",
    cancelLabel: "Non merci",
  });
  if (!ok) return;

  const result = await pickAndRestoreManuelBackupFile();
  if (result.cancelled) return;
  if (!result.ok) {
    await showAlert({
      title: "Reprise impossible",
      message: result.reason || "Sauvegarde non utilisable.",
    });
    return;
  }

  await showAlert({
    title: "Surlignages restaurés",
    message: "Vos marques du manuel RCT ont été rechargées.",
  });
  onRestored?.();
}
