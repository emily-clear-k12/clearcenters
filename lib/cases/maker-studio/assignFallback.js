// Hardcoded Assign-library row for SCI.3.13A-MS.
// Keeps Maker Studio visible in Assign even if Supabase omits the row.

export const DESERT_MS_STANDARD = "SCI.3.13A-MS";

export const DESERT_MS_ASSIGN_FALLBACK = {
  standard: "SCI.3.13A-MS",
  title: "Maker Studio: Built for the Desert",
  engine: "maker_studio",
  grade: 3,
  subject: "Science",
  learning_target:
    "I can choose body-part evidence that proves how animals survive in the desert, and leave out a myth or a wrong place.",
  lesson_summary:
    "Students pick a hall, curate 4 pieces from a storage room of 9, reject one on purpose, write placards and a plaque. About 20 minutes.",
  misconception_note: "Camels store water in their humps (false — humps store fat).",
};

export function normalizeMakerCaseRow(row) {
  if (!row || typeof row !== "object") return row;
  return {
    ...row,
    engine: String(row.engine ?? "").trim(),
    subject: String(row.subject ?? "").trim(),
    grade: Number(row.grade),
    standard: String(row.standard ?? "").trim(),
  };
}

export function isPlayableDesertMsRow(row) {
  if (!row || typeof row !== "object") return false;
  const n = normalizeMakerCaseRow(row);
  return (
    n.standard === DESERT_MS_STANDARD &&
    n.engine === "maker_studio" &&
    Number(n.grade) === 3 &&
    n.subject === "Science"
  );
}
