// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.12A).

export const CAST = {
  cleo: { name: "Cleo", emoji: "🧣", color: "#F59E0B", hint: "Thinks the yard died in November." },
  pecan: { name: "The Pecan Tree", emoji: "🌳", color: "#22C55E", hint: "Bare, with buds already on it." },
  warbler: { name: "The Warbler", emoji: "🐦", color: "#3B82F6", hint: "Ringed here. Now in Mexico." },
  turtle: { name: "The Box Turtle", emoji: "🐢", color: "#8B5CF6", hint: "Under the leaf pile the whole time." },
  ade: { name: "Ade", emoji: "🌰", color: "#0D9488", hint: "Wants to know whether to keep going." }
};

export const PUBLIC_CASE = {
  standard: "3.12A",
  title: "Cleo Says Everything Died in November",
  bigQuestion: "The tree is bare, the warblers are gone and the turtle vanished. Did all of it die, or is something else going on?",
  trapLine: "Everything out there died in November.",
  evidenceBank: [
    "Scratching the pecan twig shows green underneath",
    "There are small buds all along the branch",
    "The ringed warbler was recorded in Mexico in November",
    "The box turtle is dug in under the leaf pile, breathing slowly",
    "Last year the leaves were back by March 20th"
  ],
  coldOpenMessages: [
    { who: "system", text: "A back yard in February. No leaves, no birdsong, and a feeder that nobody has filled in three weeks." },
    { who: "ade", text: "Cleo, I've been filling this feeder all winter. Do you want me to keep going or not?" },
    { who: "cleo", text: "There's no point. Everything's dead. The tree's bare, the little yellow birds stopped coming, the turtle's gone." },
    { who: "pecan", text: "Bare, yes. Dead, no. Scratch one of my twigs with your thumbnail and look at the colour." },
    { who: "cleo", text: "...it's green." },
    { who: "warbler", text: "And I'm not dead, I'm in Mexico. I was ringed in your yard in September. Same ring got recorded down here in November." },
    { who: "turtle", text: "I'm about four metres from where you're standing. Under the leaf pile by the fence. Very slow, very cold, very much here." },
    { who: "cleo", text: "That's all lovely but I've been watching that yard since November and nothing has moved. Everything out there died in November." }
  ],
  selfCheckQuestions: [
    "Did I show Cleo the tree is still alive?",
    "Did I say where the warblers went?",
    "Did I say what the turtle is doing under the leaf pile?",
    "Did I say what caused all of it to happen at once?",
    "Did I tell Ade what to expect in spring?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Cleo believe?", placeholder: "In your own words, what is Cleo's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Cleo's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them work out what the same yard would look like in a very dry summer instead of a cold winter, and say which of the three — the tree, the warbler or the turtle — would change first.";
