// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// ELAR Group Chat — ELA.4.10A. TEKS 4.10A — explain the author's purpose and message within a text.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "ELA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  ava: { name: "Ava", emoji: "😂", color: "#F59E0B", hint: "Class clown. Takes funny very seriously." },
  woof: { name: "Dr. Woof", emoji: "🐕", color: "#EF4444", hint: "Wrote the column. Is a professional." },
  fax: { name: "Fax", emoji: "📦", color: "#3B82F6", hint: "The fact box. Feels completely ignored." },
  leash: { name: "Leash Line", emoji: "🦮", color: "#8B5CF6", hint: "The last sentence. Has one job." },
  reyes: { name: "Mr. Reyes", emoji: "🗂️", color: "#0D9488", hint: "Sorting texts by purpose." }
};

export const PUBLIC_CASE = {
  standard: "ELA.4.10A",
  title: "It Was Just a Joke",
  bigQuestion: "Dr. Woof's column is full of jokes. So why did he really write it?",
  trapLine: "This is hilarious. Dr. Woof just wanted to make us laugh — that's his whole purpose.",
  evidenceBank: [
    "The column ends by telling readers to 'grab that leash'",
    "The fact box gives real information about how much exercise dogs need",
    "The fact box says dogs without enough exercise are more likely to chew, bark, and dig",
    "The jokes come first, and the request comes at the end",
    "An author can use humor to keep readers reading until the main point"
  ],
  coldOpenMessages: [
    { who: "system", text: "Mr. Reyes's class is sorting magazine pieces by purpose: to entertain, to inform, or to persuade. Today's piece is a column called 'Ask Dr. Woof.'" },
    { who: "system", text: "\"Dear Dr. Woof, my human sits on the couch all day. What do I do? — Bored in Boerne\"" },
    { who: "system", text: "\"Dear Bored, I know the feeling. My human once watched eleven cooking shows in a row. ELEVEN. I ate a sock out of pure boredom. I do not recommend the sock.\"" },
    { who: "ava", text: "HE ATE A SOCK. I'm crying. This is the funniest thing we've read all year." },
    { who: "woof", text: "Thank you. I've been working on my material. But I'd like everyone to remember that I am a PROFESSIONAL." },
    { who: "system", text: "FACT BOX: Many dogs need at least 30 minutes of exercise every day, and some need much more. Dogs that don't get enough exercise are more likely to chew, bark, and dig. Daily walks are good for people's hearts, too." },
    { who: "fax", text: "Hello? Down here? Three facts. Real ones. Nobody ever laughs at me, and nobody ever reads me." },
    { who: "system", text: "\"So grab that leash. I'll be at the door. — Dr. Woof\"" },
    { who: "leash", text: "I'm the last line. I have exactly one job, and I would like it noticed." },
    { who: "reyes", text: "Ava, you're filing this one. Which purpose?" },
    { who: "ava", text: "Entertain. Obviously. This is hilarious. Dr. Woof just wanted to make us laugh — that's his whole purpose." }
  ],
  selfCheckQuestions: [
    "Did I use the last line of the column?",
    "Did I use what the fact box says?",
    "Did I explain what the jokes are doing in the column?",
    "Did I name Dr. Woof's real purpose?",
    "Did I give Mr. Reyes a rule for finding an author's purpose?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Ava believe?", placeholder: "In your own words, what is Ava's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Ava's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them rewrite the last line so the column really would be only to entertain, and explain what that one change does to the purpose.";
