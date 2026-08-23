// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.13A).

export const CAST = {
  blossom: { name: "Blossom", emoji: "🌸", color: "#EC4899", hint: "Judges the box on flowers." },
  sage: { name: "Sage", emoji: "🪴", color: "#22C55E", hint: "Only one that survived August." },
  leaf: { name: "The Leaf Test", emoji: "💧", color: "#3B82F6", hint: "3 grams against 19." },
  root: { name: "The Root Trench", emoji: "🕳️", color: "#8B5CF6", hint: "One reaches the damp layer. One doesn't." },
  aug: { name: "Last August", emoji: "☀️", color: "#EF4444", hint: "Nine went in. One came out." },
  tomas: { name: "Tomás", emoji: "✂️", color: "#0D9488", hint: "Pulls whatever the list says." }
};

export const PUBLIC_CASE = {
  standard: "4.13A",
  title: "The Ugly One in the Window Box",
  bigQuestion: "Sage is the least attractive plant in the box and the only one that survived last August. What are its structures doing?",
  trapLine: "It contributes nothing. It doesn't even flower. Flowers are the entire point of being a plant.",
  evidenceBank: [
    "Eight of nine plants died last August and Sage lived",
    "Sage lost 3 g of water in 24 hours and Blossom lost 19 g",
    "Sage's roots reach 34 cm down; Blossom's stop at 7 cm",
    "The box gets full south sun and water once a week",
    "The top layer of soil is dry within a day"
  ],
  coldOpenMessages: [
    { who: "system", text: "The front window box gets replanted on Friday. It faces full south sun and is watered once a week." },
    { who: "tomas", text: "Pull list closes tonight. Sage is top of it. Somebody give me a reason either way." },
    { who: "blossom", text: "I gave the reason. It's grey, it's scrubby, and it has never once flowered." },
    { who: "aug", text: "May I mention last August. Nine plants went into that box. One came out." },
    { who: "tomas", text: "...Sage." },
    { who: "sage", text: "It wasn't luck. My leaves have a waxy coat on them. It holds water in rather than letting it off." },
    { who: "leaf", text: "I can put a number on that. Over 24 hours: Sage lost 3 grams of water. Blossom lost 19." },
    { who: "root", text: "And I dug down the side of the box. Sage's roots go 34 centimetres, right into the damp layer. Blossom's stop at 7." },
    { who: "tomas", text: "The top layer is dry within a day of watering. Seven centimetres is all in the dry part." },
    { who: "blossom", text: "That is beside the point entirely. It contributes nothing. It doesn't even flower. Flowers are the entire point of being a plant." }
  ],
  selfCheckQuestions: [
    "Did I say what the waxy coating on Sage's leaves does?",
    "Did I say what Sage's deep roots reach that Blossom's don't?",
    "Did I connect those structures to what this particular box is like?",
    "Did I use what happened to the nine plants last August?",
    "Did I answer Blossom's claim that flowers are the point of being a plant?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Blossom believe?", placeholder: "In your own words, what is Blossom's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Blossom's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them decide whether Sage would be the best choice for a shaded, boggy corner of the same garden, and explain what would change about which structures help there.";
