// CI2.0 Student preferences stub — localStorage only.
// Display name chip, text size (S/M/L), sound on/off.
// Calm glass / glance-first — no auth, no sync.

import {
  DEMO_STUDENT_KIDS,
  getActiveDemoKidId,
  getActiveDemoStudent,
} from "./demoStudentDay";

export const STUDENT_PREFS_KEY = "ci2.student.prefs";

/** @typedef {"S"|"M"|"L"} TextSize */

/** @typedef {{ displayName: string, textSize: TextSize, soundOn: boolean }} StudentPrefs */

export const TEXT_SIZE_SCALE = { S: 0.92, M: 1, L: 1.12 };

export function defaultStudentPrefs(kidId = null) {
  const kid = kidId || getActiveDemoKidId();
  const student =
    DEMO_STUDENT_KIDS.find((k) => k.id === kid) || getActiveDemoStudent();
  return {
    displayName: student.name,
    textSize: /** @type {TextSize} */ ("M"),
    soundOn: false,
  };
}

function prefsStorageKey(kidId = null) {
  const kid = kidId || getActiveDemoKidId();
  return `${STUDENT_PREFS_KEY}.${kid}`;
}

export function loadStudentPrefs(kidId = null) {
  const defaults = defaultStudentPrefs(kidId);
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(prefsStorageKey(kidId));
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    const displayName =
      typeof parsed?.displayName === "string" && parsed.displayName.trim()
        ? parsed.displayName.trim().slice(0, 24)
        : defaults.displayName;
    const textSize = ["S", "M", "L"].includes(parsed?.textSize) ? parsed.textSize : "M";
    const soundOn = typeof parsed?.soundOn === "boolean" ? parsed.soundOn : false;
    return { displayName, textSize, soundOn };
  } catch {
    return defaults;
  }
}

export function saveStudentPrefs(partial, kidId = null) {
  if (typeof window === "undefined") return loadStudentPrefs(kidId);
  const prev = loadStudentPrefs(kidId);
  const next = {
    displayName:
      typeof partial?.displayName === "string" && partial.displayName.trim()
        ? partial.displayName.trim().slice(0, 24)
        : prev.displayName,
    textSize: ["S", "M", "L"].includes(partial?.textSize) ? partial.textSize : prev.textSize,
    soundOn: typeof partial?.soundOn === "boolean" ? partial.soundOn : prev.soundOn,
  };
  try {
    window.localStorage.setItem(prefsStorageKey(kidId), JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("ci2-student-prefs-updated"));
  } catch {
    /* ignore quota */
  }
  return next;
}

export function resetStudentPrefs(kidId = null) {
  if (typeof window === "undefined") return defaultStudentPrefs(kidId);
  try {
    window.localStorage.removeItem(prefsStorageKey(kidId));
    window.dispatchEvent(new CustomEvent("ci2-student-prefs-updated"));
  } catch {
    /* ignore */
  }
  return defaultStudentPrefs(kidId);
}
