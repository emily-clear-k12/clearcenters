// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.11A).

export const CAST = {
  chair: { name: "The Chair", emoji: "🪑", color: "#F59E0B", hint: "Says a factory isn't nature." },
  tree: { name: "The Tree", emoji: "🌳", color: "#22C55E", hint: "Used to be standing in a wood." },
  ore: { name: "Iron Ore", emoji: "⛏️", color: "#6B7280", hint: "Was rock in the ground." },
  oil: { name: "Oil", emoji: "🛢️", color: "#8B5CF6", hint: "Turns into more than you'd think." },
  sena: { name: "Sena", emoji: "🏷️", color: "#0D9488", hint: "Writing a tag for every object." }
};

export const PUBLIC_CASE = {
  standard: "3.11A",
  title: "Nothing In This Room Came From Nature",
  bigQuestion: "The chair really was made in a factory. So where did the wood, the steel and the plastic come from?",
  trapLine: "I was made in a factory, so I didn't come from nature.",
  evidenceBank: [
    "The chair back is wood, cut from a tree",
    "The legs are steel, made from iron ore dug out of the ground",
    "The seat is plastic, made from oil",
    "The window is glass, made from sand",
    "The bread is made from wheat grown in a field"
  ],
  coldOpenMessages: [
    { who: "system", text: "A class display: Where Did This Come From? Every object gets a tag naming what it started as." },
    { who: "sena", text: "Chair, I've got a blank tag here with your name on it. Help me out." },
    { who: "chair", text: "Leave it blank. I was made in a factory. I came off a machine." },
    { who: "tree", text: "Your back is me, though. I was standing in a wood about nine years ago." },
    { who: "chair", text: "...that's the back." },
    { who: "ore", text: "Your legs are steel. Steel doesn't appear in a factory. It gets made out of me, and I was rock in the ground." },
    { who: "oil", text: "And your seat is plastic. That's me. Pumped up out of the ground." },
    { who: "chair", text: "The factory still put it all together. I was made in a factory, so I didn't come from nature." }
  ],
  selfCheckQuestions: [
    "Did I trace one part of the chair back to where it started?",
    "Did I name at least two different natural resources?",
    "Did I answer the Chair about being made in a factory?",
    "Did I trace something else in the room too?",
    "Did I give Sena a rule she could use to tag anything?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does The Chair believe?", placeholder: "In your own words, what is The Chair's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support The Chair's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them pick one thing from their own lunch box and trace every part of it — the food, the wrapper and the container — back to a natural resource.";
