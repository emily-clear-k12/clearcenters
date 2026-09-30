// ClearKeys typing levels (Sept 30, 2026). Emily's call: ClearKeys is
// organized by typing skill, not grade. A reading's typing level comes from
// its own text, so teacher-pasted texts get one too:
//   Level 1 Liftoff    - short, plain sentences
//   Level 2 Cruise     - a paragraph with capitals and commas
//   Level 3 Orbit      - longer, or numbers and symbols (quotes, colons, $)
//   Level 4 Deep Space - long texts that build stamina
// Subject and standard tags stay on each reading; grade is only a content tag.

export const TYPING_LEVELS = [
  { n: 1, name: "Liftoff", line: "Short, plain sentences", goals: { accuracy: 90, wpm: 8 } },
  { n: 2, name: "Cruise", line: "A paragraph with capitals and commas", goals: { accuracy: 90, wpm: 10 } },
  { n: 3, name: "Orbit", line: "Longer, with numbers and symbols", goals: { accuracy: 90, wpm: 12 } },
  { n: 4, name: "Deep Space", line: "Long texts that build stamina", goals: { accuracy: 90, wpm: 14 } },
];

export function textFeatures(text) {
  const t = String(text || "");
  const words = t.split(/\s+/).filter(Boolean);
  const letters = words.map((w) => w.replace(/[^A-Za-z]/g, "")).filter(Boolean);
  return {
    words: words.length,
    numbers: /[0-9]/.test(t),
    symbols: /["():$%/&;!-]/.test(t),
    longWords: letters.filter((w) => w.length >= 9).length,
  };
}

// Points: length (0-3) + numbers + symbols + many long words. 0-1 = Level 1,
// 2 = Level 2, 3 = Level 3, 4+ = Level 4. Tuned on the 85 built-in readings.
export function typingPoints(text) {
  const f = textFeatures(text);
  return (f.words < 35 ? 0 : f.words < 55 ? 1 : f.words < 80 ? 2 : 3) + (f.numbers ? 1 : 0) + (f.symbols ? 1 : 0) + (f.longWords >= 6 ? 1 : 0);
}

export function typingLevelFor(text) {
  const p = typingPoints(text);
  return p <= 1 ? 1 : p === 2 ? 2 : p === 3 ? 3 : 4;
}

export function typingLevelInfo(n) {
  return TYPING_LEVELS.find((l) => l.n === Number(n)) || TYPING_LEVELS[1];
}

// What a student should type next, from where they are and how fast they type.
// Until every letter is learned (track Level 13) readings are still a stretch,
// so we suggest Level 1 and keep them climbing the track.
export function recommendedTypingLevel({ currentLevel = 1, trackComplete = false, recentWpm = null } = {}) {
  if (!trackComplete && currentLevel <= 13) return 1;
  if (recentWpm == null) return trackComplete ? 2 : 1;
  if (recentWpm < 8) return 1;
  if (recentWpm < 11) return 2;
  if (recentWpm < 14) return 3;
  return 4;
}
