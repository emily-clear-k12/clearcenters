import { dailyTextFor, centralDateKey, sanitizeTypingText } from "./cases/relay-station";
import { weekRange } from "./clearkeysFuel";

// ClearKeys class settings (Sept 29, 2026), stored in classes.clearkeys_settings:
//   { weekWords: [{ word, def }], weekOf: "YYYY-MM-DD" (a Monday), minutesPerDay: 10 }
// Week words only count during the week they were set for, so an old list
// never lingers. With no words, the Daily Transmission is the usual one.
export const MINUTE_CHOICES = [0, 5, 10, 15, 20];

export function cleanSettings(raw) {
  const s = raw && typeof raw === "object" ? raw : {};
  const weekWords = Array.isArray(s.weekWords)
    ? s.weekWords
        .map((w) => ({ word: sanitizeTypingText(String((w && w.word) || "")).text.replace(/\s+/g, " ").trim().slice(0, 30), def: sanitizeTypingText(String((w && w.def) || "")).text.replace(/\s+/g, " ").trim().slice(0, 100) }))
        .filter((w) => w.word)
        .slice(0, 12)
    : [];
  const minutesPerDay = MINUTE_CHOICES.includes(Number(s.minutesPerDay)) ? Number(s.minutesPerDay) : 0;
  const weekOf = /^\d{4}-\d{2}-\d{2}$/.test(String(s.weekOf || "")) ? s.weekOf : null;
  return { weekWords, weekOf, minutesPerDay };
}

export function activeWeekWords(settings, key = centralDateKey()) {
  const s = cleanSettings(settings);
  if (!s.weekWords.length || s.weekOf !== weekRange(key).start) return [];
  return s.weekWords;
}

function dayIndex(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 Sunday
}

// The Daily Transmission for one class on one day.
export function dailyTextForClass(settings, key = centralDateKey()) {
  const base = dailyTextFor(key);
  const words = activeWeekWords(settings, key);
  if (!words.length) return base;
  const pick = words[(Math.max(1, dayIndex(key)) - 1) % words.length];
  const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
  let extra = `\nThis week's words: ${words.map((w) => w.word).join(", ")}.`;
  if (pick.def) extra += `\nWord of the day: ${pick.word}. ${cap(pick.word)} means ${pick.def.replace(/[.!?]+$/, "")}.`;
  return sanitizeTypingText(base + extra).text;
}
