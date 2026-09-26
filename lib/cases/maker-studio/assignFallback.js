// Hardcoded Assign-library row for Quick Maker.
// Keeps Maker Studio visible in Assign even if Supabase omits the row.

export const QUICK_MS_STANDARD = "MS.QUICK-WRITE";

export const QUICK_MS_ASSIGN_FALLBACK = {
  standard: "MS.QUICK-WRITE",
  title: "Maker Studio: Quick Maker",
  engine: "maker_studio",
  grade: 3,
  subject: "Science",
  learning_target:
    "I can make clear pieces that show what I know — write, draw, poster, comic, or voice.",
  lesson_summary:
    "Students open Maker Studio, read the prompt, finish every assigned make mode, then submit. Teacher reviews the pieces — not AI-graded. About 10–20 minutes.",
  misconception_note:
    "Wave 1: Write, Sketch kit, Diagram, Poster, Comic, and Voice note are live. Students only see the modes the teacher turned on. Unbuilt modes stay visible in Assign but greyed out.",
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
