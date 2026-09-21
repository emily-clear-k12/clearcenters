// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// ELAR Group Chat — ELA.5.10B. TEKS 5.10B — analyze how the use of text structure contributes to the author's purpose.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "ELA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  ruby: { name: "Ruby", emoji: "🖍️", color: "#F59E0B", hint: "Has color-coded everything." },
  hank: { name: "Headline Hank", emoji: "📰", color: "#EF4444", hint: "The title. Keeps saying the word 'why.'" },
  because: { name: "Because", emoji: "🔗", color: "#3B82F6", hint: "A signal word. Feels invisible." },
  so: { name: "So", emoji: "➡️", color: "#8B5CF6", hint: "Because's sibling. Also feels invisible." },
  dam: { name: "Dam", emoji: "🧱", color: "#22C55E", hint: "The article's villain. Says it wasn't ALL its fault." },
  kwan: { name: "Mr. Kwan", emoji: "🔬", color: "#0D9488", hint: "Asked the class to name the text structure." }
};

export const PUBLIC_CASE = {
  standard: "ELA.5.10B",
  title: "First, Then, Why?",
  bigQuestion: "The article uses 'first' and 'then.' Is it really a sequence text?",
  trapLine: "It says 'first' and 'then.' So it's a sequence text. Things in order. I already color-coded it.",
  evidenceBank: [
    "The title asks 'Why did Lake Mora disappear?'",
    "The article uses 'because,' 'as a result,' and 'so'",
    "Each event in the article causes the next one",
    "Sequence tells when things happen; cause and effect tells why",
    "The author's purpose is to explain why the lake disappeared"
  ],
  coldOpenMessages: [
    { who: "system", text: "Mr. Kwan's class is reading a news article. The question: what is the text structure, and why did the author choose it?" },
    { who: "system", text: "\"WHY DID LAKE MORA DISAPPEAR? First, last summer brought almost no rain, so the creeks that feed Lake Mora ran low. Then a new dam was built upstream. Because the dam held water back, even less reached the lake. As a result, nearby farms pumped more water from their wells, which lowered the water underground. So by fall, Lake Mora was a field of cracked mud.\"" },
    { who: "hank", text: "Why. WHY. That's my whole question. Why did the lake disappear?" },
    { who: "because", text: "I'm in there. Twice, sort of. Nobody ever highlights me." },
    { who: "so", text: "Me too. I'm at the very end. I'm kind of important." },
    { who: "dam", text: "It wasn't ALL my fault. There was no rain first. Then I happened. Then the farms. It's a chain." },
    { who: "kwan", text: "Ruby, what's the structure?" },
    { who: "ruby", text: "It says 'first' and 'then.' So it's a sequence text. Things in order. I already color-coded it." }
  ],
  selfCheckQuestions: [
    "Did I use the question in the title?",
    "Did I find the cause-and-effect signal words?",
    "Did I show how one event caused the next?",
    "Did I name the real text structure?",
    "Did I explain why the author chose that structure for this purpose?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Ruby believe?", placeholder: "In your own words, what is Ruby's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Ruby's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask them to rewrite the article's first two sentences as a pure sequence with no causes, and describe what the reader loses.";
