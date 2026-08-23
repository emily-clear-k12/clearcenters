// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.2C, TEKS 4.2C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  eli: { name: "Eli Empty-Land", emoji: "🏜️", color: "#F59E0B", hint: undefined },
  faith: { name: "Isabel Mission File", emoji: "⛪", color: "#8B5CF6", hint: undefined },
  claim: { name: "Diego Spanish Claim File", emoji: "🏳️", color: "#3B82F6", hint: undefined },
  place: { name: "Marisol Location File", emoji: "💧", color: "#22C55E", hint: undefined },
  link: { name: "Theo Purpose + Place", emoji: "🔗", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.2C",
  title: "Why Build a Mission Here?",
  bigQuestion: "Why did the Spanish establish settlements and Catholic missions in Texas, and why did location matter?",
  trapLine: "Spanish missions were built mainly wherever there was empty land.",
  evidenceBank: [
    "Spanish missions were intended to spread Catholicism and strengthen Spanish presence.",
    "Settlements, missions, presidios, and roads often worked together to support Spanish claims.",
    "Water, travel routes, nearby communities, and useful land could affect where a mission or settlement was built."
  ],
  coldOpenMessages: [
    { who: "system", text: "A planning team is trying to explain why Spanish missions appeared in certain parts of Texas. One student says the Spanish simply chose empty land and started building." },
    { who: "eli", text: "If there was open land, that seems like a good enough reason to build there." },
    { who: "faith", text: "Religious goals were part of why missions existed in the first place." },
    { who: "claim", text: "Building a lasting presence also helped Spain defend its claims." },
    { who: "place", text: "Water and travel routes could matter as much as the amount of open land." },
    { who: "link", text: "The strongest answer explains both why the Spanish built and why they chose a particular place." }
  ],
  selfCheckQuestions: [
    "Did I explain a religious reason Spanish missions were established?",
    "Did I explain how missions or settlements supported Spanish presence in Texas?",
    "Did I explain at least one geographic factor that influenced location?",
    "Did I connect why the Spanish built missions with where they built them?",
    "Did I avoid saying mission locations were chosen randomly or only because land was empty?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Eli claiming?", placeholder: "State the empty-land idea..." },
  { key: "why1", label: "What religious purpose does the evidence show?", placeholder: "Explain the goal..." },
  { key: "why2", label: "What political/settlement purpose does the evidence show?", placeholder: "Explain Spanish presence..." },
  { key: "where", label: "What location factors mattered?", placeholder: "Use geography evidence..." },
  { key: "conclusion", label: "Why is 'empty land' not enough?", placeholder: "Connect purpose + place..." }
];

export const PUSH_ANGLE = "Site Decision: choose the strongest mission-site factor and explain why it would matter.";
