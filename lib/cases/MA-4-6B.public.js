// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Math Group Chat — MA.4.6B. TEKS 4.6B — identify and draw one or more lines of symmetry, if they exist, for a two-dimensional figure.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "MA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  zara: { name: "Zara", emoji: "🎨", color: "#F59E0B", hint: "In charge of the Symmetry Wall." },
  paralee: { name: "Paralee", emoji: "🔶", color: "#EF4444", hint: "A parallelogram. Leans a little. Calls it style." },
  rex: { name: "Rex Tangle", emoji: "🟦", color: "#3B82F6", hint: "Her cousin. Folds perfectly and knows it." },
  crease: { name: "Crease", emoji: "📄", color: "#8B5CF6", hint: "The paper fold. Very honest." },
  mirra: { name: "Mirra", emoji: "🪞", color: "#22C55E", hint: "A small mirror who shows what's really there." },
  tate: { name: "Mr. Tate", emoji: "📋", color: "#0D9488", hint: "Only shapes that pass the fold test go up." }
};

export const PUBLIC_CASE = {
  standard: "MA.4.6B",
  title: "The Fold Test",
  bigQuestion: "Paralee the parallelogram looks balanced. Does she have a line of symmetry?",
  trapLine: "Paralee looks perfectly balanced, so she has to have a line of symmetry. She's going on the wall.",
  evidenceBank: [
    "Folded down the middle, Paralee's halves don't line up",
    "Folded corner to corner, her halves still don't line up",
    "Rex Tangle folds and both halves match exactly, two different ways",
    "Held down Paralee's middle, Mirra shows a shape that isn't Paralee",
    "A line of symmetry means both halves match exactly when folded"
  ],
  coldOpenMessages: [
    { who: "system", text: "Mr. Tate's class is building a Symmetry Wall. Only shapes with at least one line of symmetry get a spot." },
    { who: "tate", text: "Zara, you're in charge of the wall. Only shapes that pass the fold test." },
    { who: "zara", text: "Rex Tangle is already up. Paralee is next." },
    { who: "rex", text: "Folded me the long way — perfect match. Folded me the short way — perfect match again. Just saying." },
    { who: "paralee", text: "I'm balanced too! I just lean a little. That's style." },
    { who: "crease", text: "I folded her straight down the middle. Her top corner didn't land on her bottom corner. It hung right off the edge." },
    { who: "mirra", text: "I stood down her middle. The shape in me wasn't her. It leaned the wrong way." },
    { who: "zara", text: "You're all overthinking it. Paralee looks perfectly balanced, so she has to have a line of symmetry. She's going on the wall." }
  ],
  selfCheckQuestions: [
    "Did I use what happened when Crease folded Paralee?",
    "Did I try more than one fold line?",
    "Did I compare Paralee to Rex Tangle?",
    "Did I say whether Paralee belongs on the Symmetry Wall?",
    "Did I give Mr. Tate a rule for finding a line of symmetry?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Zara believe?", placeholder: "In your own words, what is Zara's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Zara's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask them to name or draw a four-sided shape that leans like Paralee but DOES have a line of symmetry, and explain what is different about it.";
