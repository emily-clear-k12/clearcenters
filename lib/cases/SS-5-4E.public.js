// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.4E, TEKS 5.4E).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.4E, for example).

export const CAST = {
  leo: { name: "Leo Grant", emoji: "🧠", color: "#F59E0B", hint: "Thinks one constitutional change finished the whole story." },
  aisha: { name: "Aisha Green", emoji: "🔓", color: "#22C55E", hint: "Knows exactly what the 13th Amendment changed — and what it did not." },
  marcus: { name: "Marcus Lee", emoji: "🪪", color: "#3B82F6", hint: "Tracks citizenship and equal protection." },
  sofia: { name: "Sofia Ramirez", emoji: "🗳️", color: "#8B5CF6", hint: "Tracks the voting-rights change." },
  ellis: { name: "Dr. Jordan Ellis", emoji: "🏗️", color: "#0D9488", hint: "Connects the amendments to the larger Reconstruction effort." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.4E",
  title: "Freedom: Case Closed?",
  bigQuestion: "Did the end of the Civil War settle freedom and citizenship with one change, or did Reconstruction and the 13th, 14th, and 15th Amendments create several major changes?",
  trapLine: "The 13th Amendment ended slavery, so that basically finished the job. Reconstruction and the other amendments were just extra cleanup afterward.",
  evidenceBank: [
    "The 13th Amendment abolished slavery",
    "Reconstruction addressed rebuilding and rights after the war",
    "Later amendments addressed citizenship and voting rights"
  ],
  coldOpenMessages: [
    { who: "system", text: "The Reconstruction gallery opens tomorrow. The exhibit team has space for one main explanation of what changed after the Civil War." },
    { who: "leo", text: "This is easy. The 13th Amendment ended slavery. That’s the story." },
    { who: "aisha", text: "It is a huge part of the story. But does ending slavery answer every question about rights after the war?" },
    { who: "marcus", text: "My amendment is about citizenship and equal protection. That sounds like a different question." },
    { who: "sofia", text: "And mine deals with voting rights." },
    { who: "leo", text: "Those sound like details after the real change." },
    { who: "ellis", text: "Reconstruction was not just cleaning up battlefields. The country was rebuilding laws, governments, and the meaning of freedom." },
    { who: "leo", text: "Then show me why one amendment isn’t enough." }
  ],
  selfCheckQuestions: [
    "Did I explain that the 13th Amendment abolished slavery?",
    "Did I explain that the 14th Amendment addressed citizenship and equal protection?",
    "Did I explain that the 15th Amendment protected voting rights from racial discrimination?",
    "Did I connect the amendments to the broader work of Reconstruction after the Civil War?",
    "Did I explain why ending slavery alone did not complete all of the legal and political changes after the war?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Leo think the 13th Amendment finished?", placeholder: "State Leo’s one-change explanation..." },
  { key: "am13", label: "What did the 13th Amendment change?", placeholder: "Record Aisha’s evidence about slavery..." },
  { key: "am14", label: "What did the 14th Amendment add?", placeholder: "Record Marcus’s evidence about citizenship and equal protection..." },
  { key: "am15", label: "What did the 15th Amendment protect?", placeholder: "Record Sofia’s evidence about voting rights..." },
  { key: "reconstruction", label: "Why was Reconstruction more than “cleanup”?", placeholder: "Explain how rebuilding included new laws, rights, and political changes..." }
];

export const PUSH_ANGLE = "Gallery Label Repair: replace “THE WAR ENDED SLAVERY — CASE CLOSED” with a stronger exhibit title and a four-part caption showing how abolition, citizenship/equal protection, voting rights, and Reconstruction fit together.";
