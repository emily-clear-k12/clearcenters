// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Math Group Chat — MA.5.4F. TEKS 5.4F — simplify numerical expressions that do not involve exponents, including up to two levels of grouping.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "MA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  nia: { name: "Nia", emoji: "📋", color: "#F59E0B", hint: "The team's self-appointed stats keeper." },
  scotty: { name: "Scotty", emoji: "🏀", color: "#EF4444", hint: "The scoreboard. Says 11. Won't budge." },
  logan: { name: "Logan", emoji: "📓", color: "#3B82F6", hint: "The game log. Remembers every basket." },
  paren: { name: "Paren Twins", emoji: "🫧", color: "#8B5CF6", hint: "Parentheses. Only show up when needed." },
  dom: { name: "Referee Dom", emoji: "🦓", color: "#0D9488", hint: "Needs the stats sheet to match the board." }
};

export const PUBLIC_CASE = {
  standard: "MA.5.4F",
  title: "Left to Right",
  bigQuestion: "The expression for the team's score is 3 + 4 x 2. What is the real score?",
  trapLine: "You always go left to right, like reading. 3 plus 4 is 7, times 2 is 14.",
  evidenceBank: [
    "The team made one 3-point shot and four 2-point baskets",
    "Four 2-point baskets is 4 x 2 = 8 points",
    "3 + 8 = 11, which matches the scoreboard",
    "Nia's 14 would only be right if the expression were (3 + 4) x 2",
    "Multiply and divide before you add and subtract, unless grouping symbols say otherwise"
  ],
  coldOpenMessages: [
    { who: "system", text: "End of the game. Nia wrote the team's score on the stats sheet as 3 + 4 x 2." },
    { who: "scotty", text: "I'm the scoreboard. I say 11. I've said 11 since the buzzer." },
    { who: "logan", text: "I'm the game log. One 3-point shot. Then four baskets worth 2 points each. That's everything." },
    { who: "paren", text: "We're the Paren Twins. We only show up when something needs to happen first. We are NOT in this expression." },
    { who: "dom", text: "Nia, the stats sheet has to match the scoreboard before I sign it." },
    { who: "scotty", text: "11. Still 11." },
    { who: "nia", text: "The scoreboard's wrong. You always go left to right, like reading. 3 plus 4 is 7, times 2 is 14." }
  ],
  selfCheckQuestions: [
    "Did I use what Logan says happened in the game?",
    "Did I work out 4 x 2 first?",
    "Did I explain when Nia's 14 would be right?",
    "Did I say what the real score is?",
    "Did I give Nia a rule for the order of operations?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Nia believe?", placeholder: "In your own words, what is Nia's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Nia's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask them to write the expression Nia would have needed for 14 to be right, and describe a game that would score that way.";
