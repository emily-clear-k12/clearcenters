// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.13B, TEKS 4.13B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  jax: { name: "Jax Governor-on-Top", emoji: "👑", color: "#F59E0B", hint: undefined },
  leg: { name: "Lena Legislative", emoji: "📜", color: "#3B82F6", hint: undefined },
  exec: { name: "Evan Executive", emoji: "🏛️", color: "#22C55E", hint: undefined },
  jud: { name: "Jada Judicial", emoji: "⚖️", color: "#8B5CF6", hint: undefined },
  synth: { name: "Riley Branch Board", emoji: "🔎", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.13B",
  title: "Everybody Wants to Run Texas",
  bigQuestion: "What is the basic job of each branch of Texas government?",
  trapLine: "The governor is in charge, so the executive branch can make laws and decide what laws mean.",
  evidenceBank: [
    "The Texas Legislature makes laws.",
    "The governor and executive branch carry out and enforce laws.",
    "Texas courts interpret laws and decide legal cases."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student draws the governor at the top of a Texas-government chart and puts the legislative and judicial branches underneath." },
    { who: "jax", text: "The governor leads the state, so shouldn’t the governor be above the other branches?" },
    { who: "leg", text: "The legislature’s basic job is to make laws." },
    { who: "exec", text: "The executive branch carries out and enforces laws." },
    { who: "jud", text: "Courts interpret laws and decide legal cases." },
    { who: "synth", text: "A chart should separate jobs, not stack one branch above the others." }
  ],
  selfCheckQuestions: [
    "Did I correctly explain the legislative branch's basic function?",
    "Did I correctly explain the executive branch's basic function?",
    "Did I correctly explain the judicial branch's basic function?",
    "Did I keep the three branch functions separate?",
    "Did I explain why the governor is not simply 'in charge' of all three branches?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "leg", label: "What is the legislative branch's basic job?", placeholder: "Use the clue..." },
  { key: "exec", label: "What is the executive branch's basic job?", placeholder: "Use the clue..." },
  { key: "jud", label: "What is the judicial branch's basic job?", placeholder: "Use the clue..." },
  { key: "compare", label: "Why should the jobs stay separate?", placeholder: "Compare functions..." },
  { key: "claim", label: "Why is the governor-on-top chart inaccurate?", placeholder: "Use all three branch functions..." }
];

export const PUSH_ANGLE = "Branch Sort: place six fictional government actions under the branch whose basic function best matches.";
