// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.9A, TEKS 4.9A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  jay: { name: "Jay Hunting-Only", emoji: "🏹", color: "#F59E0B", hint: undefined },
  farm: { name: "Fiona Farming File", emoji: "🌽", color: "#22C55E", hint: undefined },
  trade: { name: "Tariq Trade File", emoji: "🤝", color: "#3B82F6", hint: undefined },
  hunt: { name: "Holly Hunting File", emoji: "🦬", color: "#8B5CF6", hint: undefined },
  needs: { name: "Nora Needs & Wants", emoji: "🧺", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.9A",
  title: "How Do We Meet Our Needs?",
  bigQuestion: "How did early American Indian groups in Texas meet needs and wants through farming, trading, and hunting?",
  trapLine: "Early American Indian groups mostly met their needs by hunting.",
  evidenceBank: [
    "Some groups grew crops to help provide food.",
    "Groups traded goods to get items or resources they did not have.",
    "Many groups hunted animals for food and materials."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student is making an economics chart and writes only one activity under American Indian life in Texas: hunting." },
    { who: "jay", text: "Hunting seems like the big answer. Do we really need the other activities?" },
    { who: "farm", text: "Some groups relied heavily on crops, so hunting alone cannot explain everyone." },
    { who: "trade", text: "Trade helped groups get resources they did not have locally." },
    { who: "hunt", text: "Hunting mattered, but its importance differed by group and place." },
    { who: "needs", text: "The key question is what each activity helped people get." }
  ],
  selfCheckQuestions: [
    "Did I explain how farming could help meet needs or wants?",
    "Did I explain how trading could help groups get resources?",
    "Did I explain how hunting could provide food or materials?",
    "Did I explain that groups used different combinations of activities?",
    "Did I avoid saying that all American Indian groups in Texas mainly lived by hunting?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "farm", label: "How did farming help meet a need or want?", placeholder: "Connect activity to result..." },
  { key: "trade", label: "How did trading help?", placeholder: "Explain what trade made possible..." },
  { key: "hunt", label: "How did hunting help?", placeholder: "Use food/material evidence..." },
  { key: "compare", label: "Why might different groups use different combinations?", placeholder: "Think about place/resources..." },
  { key: "claim", label: "Why is hunting-only incomplete?", placeholder: "Use farming + trade evidence..." }
];

export const PUSH_ANGLE = "Needs Match: match farming, trading, and hunting to the needs or wants each could help meet.";
