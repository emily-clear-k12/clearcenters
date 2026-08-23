// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.10A, TEKS 3.10A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  mia: { name: "Mia Party-Only", emoji: "🎉", color: "#F59E0B", hint: undefined },
  trad: { name: "Tara Tradition", emoji: "🪘", color: "#3B82F6", hint: undefined },
  identity: { name: "Iris Identity", emoji: "🧵", color: "#22C55E", hint: undefined },
  community: { name: "Cal Community", emoji: "🤝", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.10A",
  title: "It’s More Than a Party",
  bigQuestion: "Why can a cultural celebration be important to a community?",
  trapLine: "Cultural celebrations are mainly for food, decorations, and fun.",
  evidenceBank: [
    "Families share customs, music, stories, or ceremonies passed down over time.",
    "The celebration helps people remember and express a shared cultural identity.",
    "People gather to teach younger generations and strengthen community ties."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student visits a community celebration and writes, 'This event matters because the food is good and the decorations are colorful.' The class has to decide what that leaves out." },
    { who: "mia", text: "Food, music, and decorations sound like the main reason people celebrate." },
    { who: "trad", text: "Celebrations can keep customs, stories, and traditions alive." },
    { who: "identity", text: "A celebration can help people express who they are and where their traditions come from." },
    { who: "community", text: "Celebrations can connect people and help younger generations learn." }
  ],
  selfCheckQuestions: [
    "Did I explain a tradition connected to the celebration?",
    "Did I explain how the celebration can support cultural identity?",
    "Did I explain how it connects people or generations?",
    "Did I use at least two reasons the celebration is significant?",
    "Did I explain why food and fun are not the whole meaning?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "trad", label: "What tradition is being shared or remembered?", placeholder: "Customs, music, stories..." },
  { key: "identity", label: "How can the celebration connect to identity?", placeholder: "What does it help people remember?" },
  { key: "community", label: "How does the celebration connect people?", placeholder: "Think about generations and community..." },
  { key: "claim", label: "Why is 'food and fun' too small an explanation?", placeholder: "Use deeper meanings..." }
];

export const PUSH_ANGLE = "Visitor Note Rewrite: replace the shallow note with a stronger explanation of significance.";
