// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.12A, TEKS 4.12A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  ella: { name: "Ella Same-System", emoji: "📋", color: "#F59E0B", hint: undefined },
  caddo: { name: "Caddo Council File", emoji: "🏘️", color: "#3B82F6", hint: undefined },
  comanche: { name: "Comanche Band File", emoji: "🐎", color: "#22C55E", hint: undefined },
  life: { name: "Lena Way-of-Life", emoji: "🧭", color: "#8B5CF6", hint: undefined },
  compare: { name: "Theo Compare", emoji: "🔎", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.12A",
  title: "Who Makes the Rules?",
  bigQuestion: "How did different American Indian groups in Texas govern themselves?",
  trapLine: "American Indian groups in Texas probably had the same kind of government because they lived in the same region.",
  evidenceBank: [
    "Caddo communities had organized leaders and councils within settled village networks.",
    "Comanche bands were more mobile and leadership could depend on the situation and the respect earned by leaders.",
    "Different ways of life can lead to different ways of organizing leadership and decisions."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student is building a government chart and wants to put the Caddo and Comanche in one box because they were both American Indian groups in Texas." },
    { who: "ella", text: "If they were all American Indian groups in Texas, couldn’t their governments be basically the same?" },
    { who: "caddo", text: "Caddo communities had organized leaders and councils connected to village life." },
    { who: "comanche", text: "Comanche leadership could be more flexible and connected to the needs of a mobile band." },
    { who: "life", text: "How a group lived could influence how leadership and decisions worked." },
    { who: "compare", text: "A fair comparison needs both shared purposes and real differences." }
  ],
  selfCheckQuestions: [
    "Did I describe a feature of Caddo government?",
    "Did I describe a feature of Comanche government?",
    "Did I identify at least one similarity?",
    "Did I explain at least one difference in how leadership worked?",
    "Did I avoid treating all American Indian groups in Texas as if they governed themselves the same way?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "caddo", label: "How was Caddo leadership organized?", placeholder: "Use the council/village evidence..." },
  { key: "comanche", label: "How was Comanche leadership organized?", placeholder: "Use the band/leadership evidence..." },
  { key: "same", label: "What is one similarity between the two systems?", placeholder: "What purpose did both serve?" },
  { key: "diff", label: "What is one important difference?", placeholder: "Compare how leadership worked..." },
  { key: "claim", label: "Why is one-government-for-all-groups inaccurate?", placeholder: "Use the comparison evidence..." }
];

export const PUSH_ANGLE = "Government Chart Fix: replace one shared box with a comparison that shows how the systems differed.";
