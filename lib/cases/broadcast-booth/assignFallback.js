// Hardcoded Assign-library rows for Broadcast Booth seeds.
// Keeps seeds visible in Assign even if Supabase omits a row.

export const DESERT_BB_STANDARD = "SCI.3.13A-BB";
export const CREEK_BB_STANDARD = "SCI.3.12B-BB";
export const SCHOOLYARD_BB_STANDARD = "SCI.3.11B-BB";

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

export const CREEK_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.12B-BB",
  title: "Broadcast Booth: Creek Desk (Correspondent)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target:
    "I can report from a creek habitat and tell how living things connect in a food chain.",
  lesson_summary:
    "Students use a you-are-here kit, place chips on Correspondent trays, then record four beats. Teacher listens — not AI-graded. About 25–30 minutes.",
  misconception_note:
    "Correspondent seed. Unlock: What I noticed + Why it matters. Desert Radio Explain stays as-is.",
};

export const SCHOOLYARD_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.11B-BB",
  title: "Broadcast Booth: Schoolyard Debate (Shade vs Play)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target:
    "I can present both sides of a schoolyard choice and share what I think now about conserving resources and play space.",
  lesson_summary:
    "Students read shared context and two mini-briefs, place chips on Debate trays, then record four beats. Teacher listens — not AI-graded. About 25–30 minutes.",
  misconception_note:
    "Debate seed. Side labels come from the case (teacher can override). Desert Radio Explain stays as-is.",
};

/** All Broadcast Booth catalog fallbacks for Assign library merge. */
export const BROADCAST_BB_ASSIGN_FALLBACKS = [
  DESERT_BB_ASSIGN_FALLBACK,
  CREEK_BB_ASSIGN_FALLBACK,
  SCHOOLYARD_BB_ASSIGN_FALLBACK,
];

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

export function isPlayableBroadcastBbRow(row) {
  if (!row || typeof row !== "object") return false;
  const n = normalizeBroadcastCaseRow(row);
  return (
    n.engine === "broadcast_booth" &&
    Number.isFinite(n.grade) &&
    !!n.subject &&
    !!n.standard
  );
}

/** @deprecated Prefer isPlayableBroadcastBbRow — kept for Desert-specific checks. */
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
