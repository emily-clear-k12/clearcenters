// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// ELAR Group Chat — ELA.4.11D. TEKS 4.11D(i) — edit drafts using standard English conventions, including complete simple and compound sentences with subject-verb agreement and avoidance of splices, run-ons, and fragments.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "ELA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  sam: { name: "Sam", emoji: "✏️", color: "#F59E0B", hint: "Stubborn. Contest is due at midnight." },
  lucy: { name: "Lucy", emoji: "🤔", color: "#3B82F6", hint: "Read the draft first. Got lost." },
  rudy: { name: "Rudy Rambles", emoji: "🌀", color: "#EF4444", hint: "A run-on. Never stops for breath." },
  period: { name: "Period", emoji: "⚫", color: "#0D1B2A", hint: "Blunt. Full stop." },
  comma: { name: "Comma", emoji: "🔗", color: "#8B5CF6", hint: "Only works with a partner." },
  andy: { name: "Andy", emoji: "➕", color: "#22C55E", hint: "A joining word. Comma's partner." }
};

export const PUBLIC_CASE = {
  standard: "ELA.4.11D",
  title: "It's All One Trip",
  bigQuestion: "Sam wrote, \"We got to the lake it started raining we ran to the car.\" Is that one sentence?",
  trapLine: "It's all about the same trip, so it's one sentence. That's how sentences work.",
  evidenceBank: [
    "Sam's sentence has three subjects and three verbs: we got, it started, we ran",
    "Lucy got lost and could not tell where one idea ended",
    "Complete thoughts need a period, or a comma plus a joining word like and, but, or so",
    "Sam's next sentence, about the sandwiches, is a correct complete sentence",
    "Being about the same topic does not make ideas one sentence"
  ],
  coldOpenMessages: [
    { who: "system", text: "The class writing contest is due at midnight. Sam asked Lucy to read the draft first." },
    { who: "system", text: "\"THE LAKE DAY. Last summer my family drove to Lake Travis. We got to the lake it started raining we ran to the car.\"" },
    { who: "lucy", text: "Okay, I got lost in the second sentence. Where does it stop?" },
    { who: "rudy", text: "Stop? I don't stop. I just keep going and going and going and going." },
    { who: "period", text: "Full stop. I count three complete thoughts in there. Three subjects. Three verbs. Zero of me." },
    { who: "comma", text: "I'd help, but I can't do it alone. Put just me between two complete thoughts and it's still wrong." },
    { who: "andy", text: "That's where I come in. Comma and me, together, can join two complete thoughts. Not three piled up with nothing." },
    { who: "system", text: "\"We sat in the car and ate sandwiches while the rain hammered the roof.\"" },
    { who: "sam", text: "It's all about the same trip, so it's one sentence. That's how sentences work." }
  ],
  selfCheckQuestions: [
    "Did I count the complete thoughts in Sam's sentence?",
    "Did I use why Lucy got lost?",
    "Did I explain what Comma and Andy can and cannot do?",
    "Did I fix the sentence a correct way?",
    "Did I give Sam a rule about what makes a sentence?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Sam believe?", placeholder: "In your own words, what is Sam's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Sam's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them fix the sentence two different correct ways, then say which version they would send to the contest and why.";
