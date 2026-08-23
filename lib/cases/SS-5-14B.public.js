// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.14B, TEKS 5.14B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.14B, for example).

export const CAST = {
  marcus: { name: "Marcus Lane", emoji: "🧩", color: "#F59E0B", hint: "Wants to reduce the Preamble to one job." },
  union: { name: "Uma Union", emoji: "🤝", color: "#3B82F6", hint: "Owns union, peace, and defense purposes." },
  justice: { name: "Jade Justice", emoji: "⚖️", color: "#8B5CF6", hint: "Owns justice and liberty purposes." },
  welfare: { name: "Will Harper", emoji: "🌱", color: "#22C55E", hint: "Owns the general welfare purpose." },
  curator: { name: "Ms. Chen", emoji: "🏛️", color: "#0D9488", hint: "Needs the six purposes organized into one explanation." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.14B",
  title: "Six Jobs, One Constitution",
  bigQuestion: "According to the Preamble, what purposes was the Constitution designed to serve — and why is “make laws” too small an answer?",
  trapLine: "The Constitution has one main job: make laws for the country. Everything else is just extra wording.",
  evidenceBank: [
    "The Preamble states broad purposes for the Constitution",
    "It names several goals, not just one",
    "“Making laws” is a government action, not the whole Preamble"
  ],
  coldOpenMessages: [
    { who: "system", text: "A civics exhibit is turning the Preamble into six purpose cards." },
    { who: "marcus", text: "Why six cards? Just write MAKE LAWS and save the space." },
    { who: "union", text: "That does not explain forming a stronger union, peace at home, or common defense." },
    { who: "justice", text: "Or justice and liberty." },
    { who: "welfare", text: "Or the general welfare." },
    { who: "marcus", text: "Those sound like nice phrases, but government still makes laws to do all of that." },
    { who: "curator", text: "Maybe laws are a tool. Our exhibit needs the purposes the Preamble actually names." }
  ],
  selfCheckQuestions: [
    "Did I explain that the Preamble states several purposes for the Constitution?",
    "Did I accurately explain at least three different Preamble purposes?",
    "Did I include the ideas of justice, peace/defense, welfare, liberty, or a stronger union accurately?",
    "Did I explain how the purposes are different from simply “making laws”?",
    "Did I synthesize what the Preamble says the new government should accomplish?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Marcus think the Constitution’s purpose is?", placeholder: "Record his one-job claim..." },
  { key: "union", label: "Which Preamble purposes focus on unity, peace, or defense?", placeholder: "Record and explain those goals..." },
  { key: "justice", label: "Which purposes focus on justice or liberty?", placeholder: "Record what those goals mean..." },
  { key: "welfare", label: "What does “promote the general welfare” add?", placeholder: "Explain the broad well-being goal..." },
  { key: "synthesis", label: "What do the six purposes show together?", placeholder: "Write the big-picture purpose of the Constitution..." }
];

export const PUSH_ANGLE = "Six-Card Challenge: keep all six Preamble purposes, but group them into three student-friendly categories and explain why none can simply be deleted.";
