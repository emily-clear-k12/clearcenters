// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.7B).

export const CAST = {
  wallop: { name: "Wallop", emoji: "💥", color: "#F59E0B", hint: "Only ever pushes harder." },
  disc: { name: "The Disc", emoji: "🥏", color: "#3B82F6", hint: "Goes exactly where it's sent." },
  target: { name: "The Target Square", emoji: "🎯", color: "#22C55E", hint: "Sits at 120 cm and doesn't move." },
  string: { name: "The String", emoji: "🧶", color: "#8B5CF6", hint: "Pulls the disc back." },
  pia: { name: "Pia", emoji: "📊", color: "#0D9488", hint: "Wants a plan for the next shot." }
};

export const PUBLIC_CASE = {
  standard: "3.7B",
  title: "Wallop Only Knows One Setting",
  bigQuestion: "Wallop's pushes are the hardest and the disc always goes past the square. What should change?",
  trapLine: "I just need to hit it harder. Harder is always better.",
  evidenceBank: [
    "A hard push sends the disc 190 cm and the target is at 120 cm",
    "A soft push sends it 118 cm, which is on the square",
    "A tap on the side changes the direction it's going",
    "Pulling the string brings the disc back and stops it",
    "Wallop has missed past the square eleven times"
  ],
  coldOpenMessages: [
    { who: "system", text: "Slide the disc and stop it on the target square. Eleven shots so far, eleven misses." },
    { who: "pia", text: "Shot twelve. Wallop, what are you changing this time?" },
    { who: "wallop", text: "I'm hitting it harder." },
    { who: "target", text: "You've said that eleven times. I'm at 120 centimetres and I have not moved." },
    { who: "disc", text: "For what it's worth — his hard push sends me 190. That's seventy centimetres past the square." },
    { who: "disc", text: "Somebody gave me a soft push earlier. I went 118. That's on the square." },
    { who: "string", text: "And I'm tied to the disc, if anyone wanted to pull instead of push. I bring it back and stop it." },
    { who: "wallop", text: "Pulling isn't a move. I just need to hit it harder. Harder is always better." }
  ],
  selfCheckQuestions: [
    "Did I use the distances from the score sheet?",
    "Did I say what a softer push would do?",
    "Did I use the tap on the side of the disc?",
    "Did I use the string?",
    "Did I give Pia a plan for what to change on the next shot?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Wallop believe?", placeholder: "In your own words, what is Wallop's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Wallop's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them plan a shot for a target square placed much closer, at 60 cm, and say exactly what they would change about the push compared with the 120 cm target.";
