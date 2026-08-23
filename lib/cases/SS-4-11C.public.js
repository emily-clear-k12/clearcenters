// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.11C, TEKS 4.11C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  abby: { name: "Abby More-People", emoji: "👥", color: "#F59E0B", hint: undefined },
  explore: { name: "Evan Exploration", emoji: "🧭", color: "#3B82F6", hint: undefined },
  move: { name: "Maya Migration", emoji: "🧳", color: "#22C55E", hint: undefined },
  limit: { name: "Leo Limited Resources", emoji: "🚱", color: "#EF4444", hint: undefined },
  synth: { name: "Sasha Growth Chain", emoji: "🔗", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.11C",
  title: "What Made Texas Grow?",
  bigQuestion: "How did exploration, immigration, migration, and limited resources affect Texas economic growth?",
  trapLine: "Texas grew mainly because more people moved there.",
  evidenceBank: [
    "Exploration opened new routes, knowledge, and economic possibilities.",
    "Newcomers brought workers, skills, consumers, businesses, and cultural connections.",
    "Shortages of water, labor, money, or materials could slow growth or force people to adapt."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student is building an economic-growth timeline and writes, 'Texas grew because more people came.' The class has to decide what that leaves out." },
    { who: "abby", text: "More people moved in, so that must be the main reason the economy grew." },
    { who: "explore", text: "Exploration can open routes and reveal new resources or opportunities." },
    { who: "move", text: "Newcomers can add workers, skills, businesses, and customers." },
    { who: "limit", text: "Growth can slow or change when key resources are limited." },
    { who: "synth", text: "Economic growth usually has several causes and limits working together." }
  ],
  selfCheckQuestions: [
    "Did I explain one way exploration affected economic growth?",
    "Did I explain one effect of immigration or migration?",
    "Did I explain how limited resources could slow or reshape growth?",
    "Did I use more than one factor in my explanation?",
    "Did I avoid saying that population growth alone explains Texas economic growth?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Abby claiming?", placeholder: "State the 'more people' idea..." },
  { key: "explore", label: "How could exploration affect economic growth?", placeholder: "Use routes/resources/opportunity..." },
  { key: "move", label: "How could immigration or migration affect growth?", placeholder: "Use workers/skills/businesses..." },
  { key: "limit", label: "How could limited resources slow or change growth?", placeholder: "Explain a constraint..." },
  { key: "conclusion", label: "Why is one factor not enough?", placeholder: "Connect several causes and limits..." }
];

export const PUSH_ANGLE = "Growth Web: connect four factors to ways they could speed up, slow down, or change the Texas economy.";
