// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.8B, TEKS 5.8B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.8B, for example).

export const CAST = {
  cole: { name: "Councilor Cole", emoji: "✅", color: "#F59E0B", hint: "Wants one-word “good” or “bad” answers." },
  maya: { name: "Maya Singh", emoji: "⚡", color: "#3B82F6", hint: "Tracks the dam’s human benefits." },
  river: { name: "Dr. River Chen", emoji: "🐟", color: "#22C55E", hint: "Tracks ecological consequences." },
  rosa: { name: "Rosa Martinez", emoji: "🏠", color: "#8B5CF6", hint: "Represents people who may bear costs of the project." },
  grant: { name: "Mr. Grant", emoji: "⚖️", color: "#0D9488", hint: "Will not accept a verdict that ignores half the evidence." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.8B",
  title: "The Dam Debate",
  bigQuestion: "If a dam solves important human problems but also changes an ecosystem and nearby communities, should it be judged as simply “good,” simply “bad,” or by weighing both consequences?",
  trapLine: "The dam provides water and electricity, so it is clearly a good modification. If people benefit, the environmental effects are just side problems.",
  evidenceBank: [
    "A dam can store water for dry periods",
    "Hydroelectric power can generate electricity",
    "A reservoir can flood habitat and occupied land"
  ],
  coldOpenMessages: [
    { who: "system", text: "The River Valley Council is reviewing a proposed dam. The council must summarize both benefits and costs before any vote." },
    { who: "cole", text: "Water storage, electricity, flood control. I think the summary can just say GOOD IDEA." },
    { who: "maya", text: "Those benefits are real, especially during dry periods." },
    { who: "river", text: "So are changes to fish movement and downstream habitat." },
    { who: "rosa", text: "And the reservoir would cover the land where some families live now." },
    { who: "cole", text: "Every project has small downsides. The benefits are what matter." },
    { who: "grant", text: "Our job is not to count only benefits. It is to analyze consequences." },
    { who: "cole", text: "Then prove why both sides belong in the final judgment." }
  ],
  selfCheckQuestions: [
    "Did I explain at least one positive consequence of the dam?",
    "Did I explain at least one negative environmental consequence?",
    "Did I explain how the modification could affect people as well as the physical environment?",
    "Did I connect each consequence to the dam rather than simply list “good” and “bad” facts?",
    "Did I give a balanced conclusion that weighs tradeoffs instead of treating the modification as only good or only bad?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Cole claiming about the dam?", placeholder: "State his one-sided judgment..." },
  { key: "positive", label: "What positive consequences could the dam have?", placeholder: "Use Maya’s evidence..." },
  { key: "negative_env", label: "What negative environmental consequences could occur?", placeholder: "Use Dr. Chen’s evidence and explain the effect..." },
  { key: "negative_people", label: "What costs could nearby people experience?", placeholder: "Use Rosa’s perspective..." },
  { key: "judgment", label: "What balanced conclusion fits all the evidence?", placeholder: "Weigh benefits and costs instead of choosing a one-word label..." }
];

export const PUSH_ANGLE = "Council Memo: choose one change that could reduce a negative consequence of the dam without removing all of its benefits. Explain which cost your idea addresses and what tradeoff may remain.";
