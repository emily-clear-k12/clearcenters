// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// ELAR Group Chat — ELA.4.9E. TEKS 4.9E(ii) — recognize characteristics and structures of argumentative text by explaining how the author has used facts for an argument.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "ELA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  diego: { name: "Diego", emoji: "📣", color: "#F59E0B", hint: "Debate club. A bit of a hothead." },
  tired: { name: "Tired on Tuesdays", emoji: "✉️", color: "#EF4444", hint: "Wrote the letter. Nervous about how it's going over." },
  frank: { name: "Frank Fact", emoji: "✅", color: "#3B82F6", hint: "The first fact. Proud. Loud. True." },
  fiona: { name: "Fiona Fact", emoji: "😬", color: "#8B5CF6", hint: "The second fact. Quiet. Might matter more." },
  hale: { name: "Principal Hale", emoji: "🏫", color: "#0D9488", hint: "Deciding whether to take it to the school board." }
};

export const PUBLIC_CASE = {
  standard: "ELA.4.9E",
  title: "One True Fact",
  bigQuestion: "A letter says Oakwood should switch to a four-day week, and one of its facts is true. Does that prove the argument?",
  trapLine: "Some Texas schools already have four-day weeks. That's TRUE. So the argument is proved. Case closed.",
  evidenceBank: [
    "Some Texas school districts already use a four-day week",
    "Some of those districts say students missed fewer days after switching",
    "The letter's claim is that a four-day week would make Oakwood a better school",
    "A fact can be true and still not prove the claim",
    "The letter never explains how fewer missed days would make Oakwood better"
  ],
  coldOpenMessages: [
    { who: "system", text: "The Oakwood Owl printed a letter to the editor this week. Principal Hale has to decide whether it's worth taking to the school board." },
    { who: "system", text: "\"Our school should switch to a four-day week. Lots of us are worn out by Friday.\"" },
    { who: "system", text: "\"Fact: Some school districts in Texas already use a four-day week. Fact: Some of those districts say students missed fewer days of school after they switched.\"" },
    { who: "system", text: "\"A four-day week would make Oakwood a better school. — Signed, Tired on Tuesdays\"" },
    { who: "frank", text: "I'm the first fact. Some Texas districts DO have four-day weeks. One hundred percent TRUE. Go ahead, check me." },
    { who: "fiona", text: "Um. I'm the second fact. The one about missing fewer days. I think I might be the one that actually connects to the point? Nobody's looking at me." },
    { who: "tired", text: "I just want people to take this seriously. Did it work?" },
    { who: "hale", text: "Diego, you're on the debate team. Is this argument proved?" },
    { who: "diego", text: "Some Texas schools already have four-day weeks. That's TRUE. So the argument is proved. Case closed." }
  ],
  selfCheckQuestions: [
    "Did I name the letter's claim?",
    "Did I explain what Frank Fact actually proves?",
    "Did I explain how Fiona Fact connects to the claim?",
    "Did I say whether the argument is proved?",
    "Did I give Principal Hale a rule about how facts work in an argument?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Diego believe?", placeholder: "In your own words, what is Diego's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Diego's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them write one more fact the author could add that would connect more strongly to the claim, and explain why it is stronger.";
