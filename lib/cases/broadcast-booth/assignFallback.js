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

export const ENERGY_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.11A-BB",
  title: "Broadcast Booth: How should the town get power? (Debate)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can compare renewable and nonrenewable resources and give a fair reason for each side.",
  lesson_summary: "Grade 4 Debate. Wind and sunlight versus natural gas. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Natural gas comes from nature and still runs out. Renewable does not mean perfect.",
};

export const INFERENCE_BB_ASSIGN_FALLBACK = {
  standard: "ELA.3.6F-BB",
  title: "Broadcast Booth: The story never says the feeling (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "ELAR",
  learning_target: "I can make an inference about a character's feelings and point to evidence in the story.",
  lesson_summary: "Grade 3 Explain broadcast on inference. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "A feeling can be shown by what a character does, even when the story never names it.",
};

export const THEME_BB_ASSIGN_FALLBACK = {
  standard: "ELA.5.8A-BB",
  title: "Broadcast Booth: What is the play really about? (Explain)",
  engine: "broadcast_booth",
  grade: 5,
  subject: "ELAR",
  learning_target: "I can infer more than one theme and support each theme with evidence from the text.",
  lesson_summary: "Grade 5 Explain broadcast on theme. Plot is not a theme. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Retelling what happened is the plot. A theme reaches beyond the story.",
};

export const ARGUMENT_BB_ASSIGN_FALLBACK = {
  standard: "ELA.5.9E-BB",
  title: "Broadcast Booth: Which facts support the claim? (Debate)",
  engine: "broadcast_booth",
  grade: 5,
  subject: "ELAR",
  learning_target: "I can explain which facts an author uses for an argument and which facts work against it.",
  lesson_summary: "Grade 5 Debate on facts for and against a claim. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The loudest line is not the strongest evidence.",
};

export const MULTIPLY_BB_ASSIGN_FALLBACK = {
  standard: "MA.3.5B-BB",
  title: "Broadcast Booth: Six tables of cupcakes (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Math",
  learning_target: "I can solve a multiplication problem within 100 and show it with an array.",
  lesson_summary: "Grade 3 Explain broadcast. 6 groups of 4 is 24. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Altogether does not mean add 6 and 4. These are equal groups.",
};

export const FRACTIONS_BB_ASSIGN_FALLBACK = {
  standard: "MA.4.3E-BB",
  title: "Broadcast Booth: Three eighths plus two eighths (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Math",
  learning_target: "I can add two fractions with the same denominator and explain why the denominator stays the same.",
  lesson_summary: "Grade 4 Explain broadcast. 3/8 + 2/8 = 5/8. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Do not add the denominators. 5/16 is not the total.",
};

export const COMMUNITIES_BB_ASSIGN_FALLBACK = {
  standard: "SS.3.2B-BB",
  title: "Broadcast Booth: Same need, different way (Correspondent)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Social Studies",
  learning_target: "I can explain how two communities meet the same need in different ways.",
  lesson_summary: "Grade 3 Correspondent broadcast. A town and an island meet the same needs differently. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The same need does not have to use the same solution.",
};

export const SUPPLY_BB_ASSIGN_FALLBACK = {
  standard: "SS.4.10A-BB",
  title: "Broadcast Booth: The lemonade puzzle (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Social Studies",
  learning_target: "I can explain how supply and demand together affect price and whether something is still available.",
  lesson_summary: "Grade 4 Explain broadcast. High demand does not always raise the price. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Look at supply and demand together.",
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
  ENERGY_BB_ASSIGN_FALLBACK,
  INFERENCE_BB_ASSIGN_FALLBACK,
  THEME_BB_ASSIGN_FALLBACK,
  ARGUMENT_BB_ASSIGN_FALLBACK,
  MULTIPLY_BB_ASSIGN_FALLBACK,
  FRACTIONS_BB_ASSIGN_FALLBACK,
  COMMUNITIES_BB_ASSIGN_FALLBACK,
  SUPPLY_BB_ASSIGN_FALLBACK,
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
