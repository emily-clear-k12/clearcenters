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

export const STATES_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.6C-BB",
  title: "Broadcast Booth: What does heat do to water? (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target: "I can explain that heating and cooling can change water from ice to liquid water to water vapor.",
  lesson_summary: "Grade 3 Explain broadcast on states of water. Not a water-cycle lesson. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Melting is not disappearing. The water is still there as a liquid.",
};

export const CIRCUIT_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.8C-BB",
  title: "Broadcast Booth: Why is the bulb lit? (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can explain that a bulb lights when the circuit is closed and stays dark when the circuit is open.",
  lesson_summary: "Grade 4 Explain broadcast. A closed path lets the bulb light. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "An open switch is a gap. The path has to be complete.",
};

export const FORCES_BB_ASSIGN_FALLBACK = {
  standard: "SCI.5.7A-BB",
  title: "Broadcast Booth: Why did it move? (Explain)",
  engine: "broadcast_booth",
  grade: 5,
  subject: "Science",
  learning_target: "I can explain that balanced forces do not change motion and unbalanced forces do.",
  lesson_summary: "Grade 5 Explain broadcast on balanced and unbalanced forces. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "A still object can have balanced forces on it.",
};

export const DAY_NIGHT_BB_ASSIGN_FALLBACK = {
  standard: "SCI.5.9-BB",
  title: "Broadcast Booth: Why do we have day and night? (Explain)",
  engine: "broadcast_booth",
  grade: 5,
  subject: "Science",
  learning_target: "I can explain that Earth rotates about once every 24 hours and that this spin causes day and night.",
  lesson_summary: "Grade 5 Explain broadcast. Earth's spin causes day and night. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The Sun does not orbit the school each day.",
};

export const INSTINCT_BB_ASSIGN_FALLBACK = {
  standard: "SCI.5.13B-BB",
  title: "Broadcast Booth: Born knowing, or taught? (Correspondent)",
  engine: "broadcast_booth",
  grade: 5,
  subject: "Science",
  learning_target: "I can report the difference between a behavior an animal is born knowing and a behavior it was taught.",
  lesson_summary: "Grade 5 Correspondent broadcast on instinct and learned behavior. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "A dog sitting for a treat is learned. A shell is a body part, not a behavior.",
};

/** All Broadcast Booth catalog fallbacks for Assign library merge. */
export const BROADCAST_BB_ASSIGN_FALLBACKS = [
  DESERT_BB_ASSIGN_FALLBACK,
  CREEK_BB_ASSIGN_FALLBACK,
  SCHOOLYARD_BB_ASSIGN_FALLBACK,
  STATES_BB_ASSIGN_FALLBACK,
  CIRCUIT_BB_ASSIGN_FALLBACK,
  FORCES_BB_ASSIGN_FALLBACK,
  DAY_NIGHT_BB_ASSIGN_FALLBACK,
  INSTINCT_BB_ASSIGN_FALLBACK,
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
