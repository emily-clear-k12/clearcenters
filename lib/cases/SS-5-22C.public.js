// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.22C, TEKS 5.22C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.22C, for example).

export const CAST = {
  zoe: { name: "Zoe One-Thing", emoji: "1️⃣", color: "#F59E0B", hint: "Thinks each innovation solves one problem and stops there." },
  med: { name: "Dr. Mira Medicine", emoji: "🩺", color: "#EF4444", hint: "Owns medicine benefits." },
  comms: { name: "Cal Communication", emoji: "📞", color: "#3B82F6", hint: "Owns communication benefits." },
  transit: { name: "Tia Transportation", emoji: "✈️", color: "#22C55E", hint: "Owns transportation benefits." },
  link: { name: "Link the Systems", emoji: "🔗", color: "#8B5CF6", hint: "Synthesizes individual and social effects." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.22C",
  title: "It Only Changed One Thing",
  bigQuestion: "How can innovations in medicine, communication, and transportation create benefits for both individuals and society?",
  trapLine: "One invention, one benefit. Anything more is overthinking it.",
  evidenceBank: [
    "A vaccine can protect an individual from a disease.",
    "A telephone can send information across long distances quickly.",
    "An airplane can move people and goods across long distances much faster than earlier travel."
  ],
  coldOpenMessages: [
    { who: "system", text: "Zoe is building a technology timeline. She writes exactly one benefit under each invention and says there is no reason to add more." },
    { who: "zoe", text: "A telephone helps people talk. A vaccine helps prevent disease. A plane helps people travel. One invention, one benefit." },
    { who: "med", text: "A medical innovation can help one patient and also change health outcomes across a community." },
    { who: "comms", text: "Faster communication changes more than conversation—it changes coordination and access to information." },
    { who: "transit", text: "Faster transportation can change where people work, what businesses can ship, and how quickly help can move." },
    { who: "link", text: "The best explanation follows the ripple effects: who benefits first, and what changes next?" }
  ],
  selfCheckQuestions: [
    "Did I explain a direct benefit of an innovation in medicine, communication, and transportation?",
    "Did I give at least one example of how an individual benefits?",
    "Did I give at least one example of a broader benefit to society?",
    "Did I trace at least one ripple effect beyond an innovation’s most obvious use?",
    "Did I explain why “one invention, one benefit” is too simple?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "direct", label: "What is the direct benefit of each innovation?", placeholder: "Start with the obvious use..." },
  { key: "individual", label: "How can an individual benefit?", placeholder: "Use a concrete example..." },
  { key: "society", label: "How can society benefit beyond one person?", placeholder: "Trace a ripple effect..." },
  { key: "compare", label: "What pattern do medicine, communication, and transportation share?", placeholder: "Compare the three..." },
  { key: "claim", label: "Does Zoe’s “one invention, one benefit” claim hold up?", placeholder: "Use more than one category of evidence..." }
];

export const PUSH_ANGLE = "Ripple Map: choose one innovation and draw a three-step benefit chain from direct use to individual benefit to society-wide effect.";
