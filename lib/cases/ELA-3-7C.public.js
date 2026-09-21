// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// ELAR Group Chat — ELA.3.7C. TEKS 3.7C — use text evidence to support an appropriate response.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "ELA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  kai: { name: "Kai", emoji: "🙋", color: "#F59E0B", hint: "Connects everything to his cousin." },
  rosa: { name: "Rosa", emoji: "🪁", color: "#EF4444", hint: "The girl in the poem. Hurt." },
  stanza: { name: "Stanza Three", emoji: "📜", color: "#8B5CF6", hint: "Holds the part about the tree. Wants to be read." },
  oak: { name: "Old Oak", emoji: "🌳", color: "#22C55E", hint: "The tree. Guilty and defensive." },
  luis: { name: "Grandpa Luis", emoji: "👴", color: "#0D9488", hint: "Reading the poem aloud." }
};

export const PUBLIC_CASE = {
  standard: "ELA.3.7C",
  title: "My Cousin Did That",
  bigQuestion: "Why did Rosa give her kite to her little brother?",
  trapLine: "She gave it away because she got bored of it. My cousin does that with EVERYTHING.",
  evidenceBank: [
    "Rosa loved flying her red kite all morning",
    "Her brother's kite got caught in the oak tree and was torn into strips",
    "Rosa said, 'You need it more than me'",
    "Rosa was smiling at the end of the poem",
    "Your own life can remind you of a text, but your answer has to come from the text"
  ],
  coldOpenMessages: [
    { who: "system", text: "Grandpa Luis is reading a poem called 'The Red Kite.'" },
    { who: "system", text: "\"My kite was red as a cherry. / It danced up high and free. / I held the string all morning, / as happy as could be.\"" },
    { who: "system", text: "\"My brother had a kite too, / a green one, small and new. / He ran to make it fly up, / the way I always do.\"" },
    { who: "system", text: "\"But the wind pulled his kite sideways / into the old oak tree. / The branches tore it into strips. / He sat down next to me.\"" },
    { who: "system", text: "\"I put my string into his hand. / 'You need it more than me.' / He smiled, and so did I, / beneath the old oak tree.\"" },
    { who: "stanza", text: "I'm stanza three. I'm the one where everything changes. Please read me again." },
    { who: "oak", text: "Kites fly into me. What am I supposed to do? I'm a tree." },
    { who: "rosa", text: "Hey. I was happy flying my kite. Read the first stanza." },
    { who: "luis", text: "Kai, why do you think Rosa gave her kite away?" },
    { who: "kai", text: "She gave it away because she got bored of it. My cousin does that with EVERYTHING." }
  ],
  selfCheckQuestions: [
    "Did I use what happened to the brother's kite?",
    "Did I use what Rosa said?",
    "Did I use how Rosa felt in the first and last stanzas?",
    "Did I say why Rosa really gave her kite away?",
    "Did I keep my answer about the poem, not about my own life?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Kai believe?", placeholder: "In your own words, what is Kai's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Kai's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask them to say one way Kai's cousin is like Rosa or different from her — and then show why that isn't evidence about the poem.";
