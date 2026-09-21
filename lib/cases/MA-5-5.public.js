// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Math Group Chat — MA.5.5. TEKS 5.5 — classify two-dimensional figures in a hierarchy of sets and subsets using graphic organizers based on their attributes and properties.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "MA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  cam: { name: "Cam", emoji: "🏛️", color: "#F59E0B", hint: "Labeling the Geometry Museum." },
  squire: { name: "Squire", emoji: "🟪", color: "#8B5CF6", hint: "A square. Very proper. Having an identity crisis." },
  recta: { name: "Recta", emoji: "▭", color: "#3B82F6", hint: "The rectangle. Reads out her club's rules." },
  rhonda: { name: "Rhonda", emoji: "🔷", color: "#22C55E", hint: "The rhombus. Also wants Squire in her club." },
  venna: { name: "Venna", emoji: "⭕", color: "#EF4444", hint: "A sorting chart of sets inside sets." },
  bell: { name: "Ms. Bell", emoji: "🔔", color: "#0D9488", hint: "The museum's curator." }
};

export const PUBLIC_CASE = {
  standard: "MA.5.5",
  title: "Not a Rectangle",
  bigQuestion: "Squire is a square. Does he also belong with the rectangles?",
  trapLine: "Squire can't be a rectangle. He's a square. He has his own name.",
  evidenceBank: [
    "A rectangle has four right angles and opposite sides that are parallel and equal",
    "Squire has four right angles and opposite sides that are parallel and equal",
    "A rhombus has four equal sides, and Squire has four equal sides",
    "Venna puts Squire where the rectangle and rhombus groups overlap",
    "A shape belongs to every group whose rules it meets"
  ],
  coldOpenMessages: [
    { who: "system", text: "The Geometry Museum opens tomorrow. Every shape needs to be placed in every room it belongs in." },
    { who: "bell", text: "Cam, you're labeling the rooms. The Rectangle Room is ready." },
    { who: "recta", text: "Rectangle Club rules: four right angles. Opposite sides parallel. Opposite sides equal. That's it. That's the whole list." },
    { who: "squire", text: "I have four right angles. My opposite sides are parallel. And equal. So... do I get in?" },
    { who: "rhonda", text: "Rhombus Club only asks for four equal sides. Squire has those too. He's welcome with us." },
    { who: "venna", text: "I'm a chart of circles inside circles. I know exactly where Squire goes. Ask me." },
    { who: "cam", text: "Squire can't be a rectangle. He's a square. He has his own name." }
  ],
  selfCheckQuestions: [
    "Did I check Squire against every one of Recta's rules?",
    "Did I check Squire against Rhonda's rule?",
    "Did I use where Venna places Squire?",
    "Did I say which rooms Squire belongs in?",
    "Did I give Cam a rule for sorting shapes?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Cam believe?", placeholder: "In your own words, what is Cam's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Cam's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask whether every rectangle is a square, and to name a shape that is a rectangle but not a square.";
