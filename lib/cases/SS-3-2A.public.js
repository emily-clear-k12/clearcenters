// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.2A, TEKS 3.2A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  jay: { name: "Jay Just-Neighbors", emoji: "🏘️", color: "#F59E0B", hint: undefined },
  law: { name: "Lena Law & Safety", emoji: "🛡️", color: "#3B82F6", hint: undefined },
  freedom: { name: "Freddie Freedom", emoji: "🕊️", color: "#22C55E", hint: undefined },
  wellbeing: { name: "Maya Well-Being", emoji: "🧺", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.2A",
  title: "Why Live Together?",
  bigQuestion: "Why do people form communities?",
  trapLine: "People form communities mostly because they like being near other people.",
  evidenceBank: [
    "This family wants a place with clear laws and better security.",
    "This family wants to practice its religion freely.",
    "This family is looking for jobs, land, and a better way to meet material needs."
  ],
  coldOpenMessages: [
    { who: "system", text: "At a welcome center, three families give different reasons for choosing a community. One student says they all really just want neighbors." },
    { who: "jay", text: "Maybe everyone just wants people nearby. Isn’t that the basic reason for a community?" },
    { who: "law", text: "Some people choose communities because shared laws can help create order and safety." },
    { who: "freedom", text: "Some communities are formed because people want freedom to practice their beliefs." },
    { who: "wellbeing", text: "People may also form communities to find work, resources, and a better way to meet needs." }
  ],
  selfCheckQuestions: [
    "Did I explain security and laws as one reason people form communities?",
    "Did I explain religious freedom as another reason?",
    "Did I explain material well-being as another reason?",
    "Did I show that people can have different reasons for joining or forming communities?",
    "Did I explain why wanting neighbors does not fully explain the evidence?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "law", label: "What reason does Family A have?", placeholder: "Security/laws..." },
  { key: "freedom", label: "What reason does Family B have?", placeholder: "Religious freedom..." },
  { key: "wellbeing", label: "What reason does Family C have?", placeholder: "Jobs/resources..." },
  { key: "claim", label: "Why is 'they just want neighbors' too simple?", placeholder: "Use all three reasons..." }
];

export const PUSH_ANGLE = "Welcome Center Match: match three new families to the community reason that best fits their needs.";
