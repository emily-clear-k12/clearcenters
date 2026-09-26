// Hardcoded Assign-library row for Quick Maker (Write).
// Keeps Maker Studio visible in Assign even if Supabase omits the row.

export const QUICK_MS_STANDARD = "MS.QUICK-WRITE";

export const QUICK_MS_ASSIGN_FALLBACK = {
  standard: "MS.QUICK-WRITE",
  title: "Maker Studio: Quick Maker (Write)",
  engine: "maker_studio",
  grade: 3,
  subject: "Science",
  learning_target:
    "I can write a clear answer to my teacher's prompt in my own words.",
  lesson_summary:
    "Students open Maker Studio, read the prompt, finish Write, then submit when the finish count is met. Teacher reviews the piece — not AI-graded. About 10–15 minutes.",
  misconception_note:
    "Wave 0 ships Write only. The other 14 mode buttons show on the student grid but stay quietly disabled.",
};

// Back-compat aliases so older imports do not explode mid-edit.
export const DESERT_MS_STANDARD = QUICK_MS_STANDARD;
export const DESERT_MS_ASSIGN_FALLBACK = QUICK_MS_ASSIGN_FALLBACK;

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

export function isPlayableQuickMsRow(row) {
  if (!row || typeof row !== "object") return false;
  const n = normalizeMakerCaseRow(row);
  return (
    n.standard === QUICK_MS_STANDARD &&
    n.engine === "maker_studio" &&
    Number.isFinite(n.grade) &&
    !!n.subject
  );
}

/** @deprecated use isPlayableQuickMsRow */
export function isPlayableDesertMsRow(row) {
  return isPlayableQuickMsRow(row);
}
