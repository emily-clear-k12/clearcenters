// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.14A, TEKS 5.14A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.14A, for example).

export const CAST = {
  theo: { name: "Theo Marsh", emoji: "📰", color: "#F59E0B", hint: "Thinks the grievances are the whole document." },
  rights: { name: "Amelia Grant", emoji: "🕊️", color: "#8B5CF6", hint: "Owns the rights and government ideas." },
  grievance: { name: "Jonas Reed", emoji: "📋", color: "#EF4444", hint: "Knows why the grievances matter." },
  messenger: { name: "Lucy Bell", emoji: "🐎", color: "#3B82F6", hint: "Knows what declaring independence changed." },
  printer: { name: "Mr. Hale", emoji: "🖨️", color: "#0D9488", hint: "Needs a summary of purpose, elements, and importance." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.14A",
  title: "The Breakup Letter",
  bigQuestion: "Was the Declaration of Independence only a list of complaints, or did it do several important jobs at once?",
  trapLine: "The Declaration was basically a complaint letter to the king. The grievances are the only part that really matters.",
  evidenceBank: [
    "The colonies were declaring separation from Great Britain",
    "The Declaration includes ideas about rights and government",
    "The Declaration lists grievances against the king"
  ],
  coldOpenMessages: [
    { who: "system", text: "Philadelphia, 1776. A print shop is preparing copies of the Declaration of Independence." },
    { who: "theo", text: "I read the draft. It is basically a giant complaint list about the king." },
    { who: "grievance", text: "The complaints matter, but they are evidence for a larger argument." },
    { who: "rights", text: "And the beginning says things about rights and where government gets its power." },
    { who: "messenger", text: "Do not forget what these copies announce: the colonies are separating from Great Britain." },
    { who: "theo", text: "Still sounds like complaints plus a dramatic ending." },
    { who: "printer", text: "Then our job is to prove what purposes, ideas, and evidence are working together." }
  ],
  selfCheckQuestions: [
    "Did I explain that the Declaration announced separation from Great Britain?",
    "Did I explain at least one key idea about rights or the purpose of government?",
    "Did I explain that the grievances were evidence used to justify separation?",
    "Did I explain why the Declaration was important, not just what it contained?",
    "Did I avoid reducing the entire document to a list of complaints?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Theo believe the Declaration was mainly for?", placeholder: "Record his one-part explanation..." },
  { key: "purpose", label: "What was the Declaration trying to do?", placeholder: "What decision did the colonies announce?" },
  { key: "ideas", label: "What key ideas about rights and government appear in it?", placeholder: "Record the political ideas you uncover..." },
  { key: "grievances", label: "Why are the grievances included?", placeholder: "How do the complaints support the larger purpose?" },
  { key: "importance", label: "Why was the Declaration important?", placeholder: "Explain what it changed or expressed for the new nation..." }
];

export const PUSH_ANGLE = "Printer’s Summary: replace “A complaint letter to the king” with a three-part printer note: purpose, key elements, importance.";
