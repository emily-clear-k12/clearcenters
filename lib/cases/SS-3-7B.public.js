// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.7B, TEKS 3.7B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  zoe: { name: "Zoe Everyone-Votes", emoji: "🗳️", color: "#F59E0B", hint: undefined },
  local: { name: "Maya Mayor File", emoji: "🏙️", color: "#3B82F6", hint: undefined },
  state: { name: "Gabe Governor File", emoji: "⭐", color: "#22C55E", hint: undefined },
  national: { name: "Pia President File", emoji: "🇺🇸", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.7B",
  title: "Who Actually Handles This?",
  bigQuestion: "Who are government officials at different levels, and how are they chosen?",
  trapLine: "Every government official is elected by all the people.",
  evidenceBank: [
    "A mayor is a local official and is commonly elected by local voters.",
    "A governor is a state official and is elected by voters in the state.",
    "The president is a national official chosen through the presidential election process."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student makes a poster that says, 'Government officials are people everyone votes for.' The class has to decide what needs fixing." },
    { who: "zoe", text: "If someone is a government official, don’t all citizens vote for that person?" },
    { who: "local", text: "A mayor serves locally, so local voters choose that office." },
    { who: "state", text: "A governor is chosen by voters across the state." },
    { who: "national", text: "Officials serve different levels, so who chooses them depends on the office." }
  ],
  selfCheckQuestions: [
    "Did I identify a local government official?",
    "Did I identify a state government official?",
    "Did I identify a national government official?",
    "Did I explain how at least two of the officials are chosen?",
    "Did I explain why not everyone votes for every government official?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "local", label: "Who is one local official, and who chooses that person?", placeholder: "Mayor + local voters..." },
  { key: "state", label: "Who is one state official, and who chooses that person?", placeholder: "Governor + state voters..." },
  { key: "national", label: "Who is one national official?", placeholder: "President..." },
  { key: "compare", label: "How does the level affect who chooses the official?", placeholder: "Local vs. state vs. national..." },
  { key: "claim", label: "Why is 'everyone votes for every official' incorrect?", placeholder: "Use the level clues..." }
];

export const PUSH_ANGLE = "Election Poster Fix: create three short captions for mayor, governor, and president.";
