// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// ELAR Group Chat — ELA.5.10D. TEKS 5.10D — describe how the author's use of imagery, literal and figurative language such as simile and metaphor, and sound devices achieves specific purposes.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "ELA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  finn: { name: "Finn", emoji: "🤨", color: "#F59E0B", hint: "Literal-minded. Skeptical of poems." },
  speaker: { name: "Speaker", emoji: "🎒", color: "#EF4444", hint: "The poem's voice. A nervous new kid." },
  river: { name: "River", emoji: "🌊", color: "#3B82F6", hint: "Insulted. Was never actually in the building." },
  leaf: { name: "Leaf", emoji: "🍃", color: "#22C55E", hint: "Small. Swept along." },
  oda: { name: "Ms. Oda", emoji: "📚", color: "#0D9488", hint: "Reading the poem on the first day of school." }
};

export const PUBLIC_CASE = {
  standard: "ELA.5.10D",
  title: "The Hallway Was a River",
  bigQuestion: "The poem says the hallway was a river. What does the poet mean?",
  trapLine: "That makes no sense. Nobody got wet. Hallways aren't rivers — the poet messed up.",
  evidenceBank: [
    "The speaker says she was 'carried past every door' she meant to find",
    "The poem says 'I could not stop. I could not turn around.'",
    "Backpacks 'bobbed like boats' around her",
    "Her classroom, Room 12, 'floated away' behind her",
    "A metaphor compares two things to show what one of them is like"
  ],
  coldOpenMessages: [
    { who: "system", text: "Ms. Oda's class is reading a poem on the first day of school. It's called 'First Day.'" },
    { who: "system", text: "\"The hallway was a river / and I was a leaf, / carried past every door I meant to find. / Backpacks bobbed like boats around me. / I could not stop. / I could not turn around. / Somewhere behind me, / Room 12 floated away.\"" },
    { who: "river", text: "For the record, I was never in that building. Not one drop of me." },
    { who: "leaf", text: "I don't get to choose where I go. The current just takes me." },
    { who: "speaker", text: "It was my first day. Everyone was going the same way at once. I couldn't get out of the crowd." },
    { who: "oda", text: "Finn, what do you think the poet means by 'the hallway was a river'?" },
    { who: "finn", text: "That makes no sense. Nobody got wet. Hallways aren't rivers — the poet messed up." }
  ],
  selfCheckQuestions: [
    "Did I explain what the hallway and a river have in common?",
    "Did I explain what the leaf stands for?",
    "Did I use at least two lines from the poem?",
    "Did I explain how the speaker feels?",
    "Did I explain why the poet used a metaphor instead of just saying it plainly?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Finn believe?", placeholder: "In your own words, what is Finn's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Finn's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask them to rewrite the first two lines as a plain sentence, and then say what the poem loses.";
