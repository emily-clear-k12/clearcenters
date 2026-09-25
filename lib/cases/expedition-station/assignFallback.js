// Hardcoded Assign-library row for MA.4.3E-XP.
// Intentionally does NOT import the Expedition Station catalog -- if that
// module fails to resolve or exports an empty QUESTS map, Assign still lists
// The Frozen Relay via this literal fallback.

export const FROZEN_RELAY_STANDARD = "MA.4.3E-XP";

export const FROZEN_RELAY_ASSIGN_FALLBACK = {
  standard: "MA.4.3E-XP",
  title: "Expedition Station: The Frozen Relay",
  engine: "expedition_station",
  grade: 4,
  subject: "Math",
  learning_target:
    "I can add and subtract fractions that have the same bottom number. I can show how with pictures, a number line, and by adding in a different order.",
  lesson_summary:
    "The relay tower on Frostveil went silent, and the crew is running low on heat and fuel. Every tank, cable, and power cell on this outpost is measured in fractions.",
  misconception_note: null,
};

/** Normalize case fields so DB whitespace / grade typing cannot hide a row. */
export function normalizeCaseRow(row) {
  if (!row || typeof row !== "object") return row;
  return {
    ...row,
    engine: String(row.engine ?? "").trim(),
    subject: String(row.subject ?? "").trim(),
    grade: Number(row.grade),
    standard: String(row.standard ?? "").trim(),
  };
}