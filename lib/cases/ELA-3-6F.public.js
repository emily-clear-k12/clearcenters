// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// ELAR Group Chat — ELA.3.6F. TEKS 3.6F — make inferences and use evidence to support understanding.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "ELA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  ben: { name: "Ben", emoji: "📏", color: "#F59E0B", hint: "The book club's rule-follower." },
  harper: { name: "Harper", emoji: "🕊️", color: "#3B82F6", hint: "The peacemaker. Has to post the club's answer by the bell." },
  marco: { name: "Marco", emoji: "⚽", color: "#EF4444", hint: "From the story. Keeps saying he's fine." },
  mom: { name: "Mom", emoji: "🏠", color: "#8B5CF6", hint: "From the story. He walked right past her." },
  slam: { name: "Slam", emoji: "🚪", color: "#0D9488", hint: "The front door. Very dramatic about it." }
};

export const PUBLIC_CASE = {
  standard: "ELA.3.6F",
  title: "The Door Said It",
  bigQuestion: "The story never says Marco is angry. Can we still tell how he feels?",
  trapLine: "You can't say Marco's angry. The story never uses the word 'angry' once. Show me the word.",
  evidenceBank: [
    "Marco's team lost the championship game",
    "Marco slammed the door so hard the pictures shook",
    "Marco dropped his backpack in the hall",
    "Marco walked past his mom without answering her",
    "Authors show feelings through what characters do and don't say"
  ],
  coldOpenMessages: [
    { who: "system", text: "The book club is reading a short story called 'After the Game.'" },
    { who: "system", text: "\"Marco's team lost the championship, 3 to 2. When he got home, the front door slammed so hard the pictures on the wall shook. His backpack thumped onto the hall floor. 'How was the game?' Mom called from the kitchen. Marco walked right past her and up the stairs.\"" },
    { who: "harper", text: "Okay, club. The question is: how does Marco feel? I have to post our answer before the bell." },
    { who: "slam", text: "I have NEVER been closed that hard. Not once. The pictures are still crooked." },
    { who: "mom", text: "I asked him a question. He walked right past me. He always tells me about his games." },
    { who: "marco", text: "I'm FINE." },
    { who: "harper", text: "So what do we post?" },
    { who: "ben", text: "You can't say Marco's angry. The story never uses the word 'angry' once. Show me the word." }
  ],
  selfCheckQuestions: [
    "Did I use what happened at the game?",
    "Did I use at least two things Marco did when he got home?",
    "Did I use how Mom said he usually acts?",
    "Did I say how Marco feels?",
    "Did I explain how you can know a feeling the story doesn't name?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Ben believe?", placeholder: "In your own words, what is Ben's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Ben's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask them to find one clue in the story that would change if Marco's team had WON, and what it would say instead.";
