// Hardcoded Assign-library row for Broadcast Booth seed.
// Keeps the seed visible in Assign even if Supabase omits the row.

export const DESERT_BB_STANDARD = "SCI.3.13A-BB";

export const DESERT_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.13A-BB",
  title: "Broadcast Booth: Desert Radio (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target:
    "I can explain how a cactus survives in the desert using clear spoken ideas.",
  lesson_summary:
    "Students hear a short stimulus, then record four Explain beats. Teacher listens — not AI-graded. About 25–30 minutes.",
  misconception_note:
    "Wave 0: Explain seed live. Correspondent and Debate segment types are wired for later cases.",
};

export function normalizeBroadcastCaseRow(row) {
  if (!row || typeof row !== "object") return row;
  return {
    ...row,
    engine: String(row.engine ?? "").trim(),
    subject: String(row.subject ?? "").trim(),
    grade: Number(row.grade),
    standard: String(row.standard ?? "").trim(),
  };
}

export function isPlayableDesertBbRow(row) {
  if (!row || typeof row !== "object") return false;
  const n = normalizeBroadcastCaseRow(row);
  return (
    n.standard === DESERT_BB_STANDARD &&
    n.engine === "broadcast_booth" &&
    Number.isFinite(n.grade) &&
    !!n.subject
  );
}
