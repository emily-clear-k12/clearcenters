// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.2A, TEKS 4.2A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  ben: { name: "Ben Adventure", emoji: "🧭", color: "#F59E0B", hint: undefined },
  money: { name: "Mia Opportunity File", emoji: "💰", color: "#22C55E", hint: undefined },
  comp: { name: "Carlos Competition File", emoji: "⚔️", color: "#3B82F6", hint: undefined },
  expand: { name: "Elena Expansion File", emoji: "🏳️", color: "#8B5CF6", hint: undefined },
  synth: { name: "Owen Motive Board", emoji: "🧠", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.2A",
  title: "Why Texas?",
  bigQuestion: "Why did European countries explore and settle Texas?",
  trapLine: "Explorers came mainly because they were curious about new places.",
  evidenceBank: [
    "European countries wanted wealth, trade, land, and other economic opportunities.",
    "European powers competed with one another for territory and influence.",
    "Countries wanted to claim and control more land."
  ],
  coldOpenMessages: [
    { who: "system", text: "A class is writing one sentence about why Europeans came to Texas. One student writes, 'They were curious and wanted adventure.'" },
    { who: "ben", text: "People explore because they are curious. Isn’t that the main reason?" },
    { who: "money", text: "Countries were also looking for wealth, trade, and useful land." },
    { who: "comp", text: "If one country claimed land, rivals worried they would lose power or access." },
    { who: "expand", text: "Exploration often led to claims, settlements, and attempts to control territory." },
    { who: "synth", text: "A strong answer may need more than one reason." }
  ],
  selfCheckQuestions: [
    "Did I explain economic opportunity as one motivation?",
    "Did I explain competition among European countries as another motivation?",
    "Did I explain the desire for expansion or control of land?",
    "Did I use more than one reason in my explanation?",
    "Did I avoid reducing exploration and settlement to curiosity or adventure?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Ben claiming?", placeholder: "State the adventure-only idea..." },
  { key: "econ", label: "What economic motive does the evidence show?", placeholder: "Use the clue..." },
  { key: "comp", label: "What competition motive does the evidence show?", placeholder: "Explain the rivalry..." },
  { key: "expand", label: "What expansion motive does the evidence show?", placeholder: "Explain land/settlement..." },
  { key: "conclusion", label: "Why is one motive not enough?", placeholder: "Use multiple pieces of evidence..." }
];

export const PUSH_ANGLE = "Motive Mix: rank the three motives in the case and defend why no single one explains everything.";
