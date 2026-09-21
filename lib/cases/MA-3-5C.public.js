// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Math Group Chat — MA.3.5C. TEKS 3.5C — describe a multiplication expression as a comparison such as 3 x 24 represents 3 times as much as 24.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "MA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  rosa: { name: "Rosa", emoji: "⭐", color: "#F59E0B", hint: "Has 24 stickers. Counts fast." },
  kip: { name: "Kip", emoji: "📒", color: "#EF4444", hint: "Owns the sticker book. Offended." },
  triplets: { name: "Triplets", emoji: "📄", color: "#3B82F6", hint: "Three pages. Each one holds exactly 24." },
  hopscotch: { name: "Hopscotch", emoji: "🦘", color: "#8B5CF6", hint: "A number line who only jumps in 24s." },
  val: { name: "Coach Val", emoji: "🏆", color: "#0D9488", hint: "Handing out prizes at the sticker swap." }
};

export const PUBLIC_CASE = {
  standard: "MA.3.5C",
  title: "Three Times as Many",
  bigQuestion: "Rosa has 24 stickers. Kip has three times as many. How many does Kip have?",
  trapLine: "Kip has three times as many as my 24. That's 24 and 3 more. So 27.",
  evidenceBank: [
    "Kip's sticker book has three full pages",
    "Each page holds exactly 24 stickers",
    "Hopscotch jumps 24, then 24, then 24, and lands on 72",
    "'3 times as much as 24' means 3 groups of 24",
    "'3 more than 24' is a different sentence, and it means 27"
  ],
  coldOpenMessages: [
    { who: "system", text: "The sticker swap. Whoever has the most stickers gets to pick a prize first." },
    { who: "val", text: "Rosa, you have 24. Kip says he has three times as many as you. How many is that?" },
    { who: "kip", text: "Look at my book. Three pages. All full." },
    { who: "triplets", text: "We're the three pages. Each one of us holds exactly 24. Not one sticker more." },
    { who: "hopscotch", text: "I only jump in 24s. One jump for each page. Want to see where I land?" },
    { who: "kip", text: "Three times as many. That's what I said." },
    { who: "rosa", text: "Kip has three times as many as my 24. That's 24 and 3 more. So 27." }
  ],
  selfCheckQuestions: [
    "Did I use the three pages of 24?",
    "Did I use where Hopscotch landed?",
    "Did I say how many stickers Kip really has?",
    "Did I explain the difference between 'times as many' and 'more than'?",
    "Did I give Coach Val a rule she can use?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Rosa believe?", placeholder: "In your own words, what is Rosa's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Rosa's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask them to write one sentence that really would mean 27 stickers, and one that means 72.";
