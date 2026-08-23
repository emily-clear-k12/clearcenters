// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.9D, TEKS 3.9D).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  max: { name: "Max Government-Only", emoji: "🏛️", color: "#F59E0B", hint: undefined },
  redcross: { name: "Ruby Red Cross", emoji: "➕", color: "#3B82F6", hint: undefined },
  pantry: { name: "Pia Pantry", emoji: "🥫", color: "#22C55E", hint: undefined },
  civic: { name: "Cal Civic Group", emoji: "🤝", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.9D",
  title: "Who Helps When Government Doesn’t Do It All?",
  bigQuestion: "How can civic and nonprofit organizations serve the common good?",
  trapLine: "If a problem matters to the community, the government should be the one to solve it.",
  evidenceBank: [
    "The Red Cross can provide emergency shelter, food, and support after disasters.",
    "A nonprofit food pantry can collect and distribute food to families who need it.",
    "A civic group can organize volunteers to clean parks or help neighbors."
  ],
  coldOpenMessages: [
    { who: "system", text: "After a neighborhood fire, a student says only government agencies should help because community problems are the government's job." },
    { who: "max", text: "If the problem is serious, shouldn’t government be the only group helping?" },
    { who: "redcross", text: "Nonprofit groups can provide help during emergencies too." },
    { who: "pantry", text: "Some organizations focus on meeting needs that affect families in the community." },
    { who: "civic", text: "Serving the common good means helping the community as a whole." }
  ],
  selfCheckQuestions: [
    "Did I identify at least one civic or nonprofit organization?",
    "Did I explain what service the organization provides?",
    "Did I explain how the service helps the community?",
    "Did I use the idea of the common good correctly?",
    "Did I explain why government is not the only group that can help meet community needs?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "redcross", label: "How can the Red Cross help a community?", placeholder: "Use the disaster clue..." },
  { key: "pantry", label: "How can a nonprofit food pantry help?", placeholder: "Use the food clue..." },
  { key: "civic", label: "How can a civic group help?", placeholder: "Use the volunteer clue..." },
  { key: "common", label: "How do these groups serve the common good?", placeholder: "What do they have in common?" },
  { key: "claim", label: "Why doesn't government have to be the only helper?", placeholder: "Use organization evidence..." }
];

export const PUSH_ANGLE = "Help Network: match three new community needs to a civic or nonprofit group that could help.";
