// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.12C).

export const CAST = {
  wes: { name: "Wes", emoji: "🥾", color: "#F59E0B", hint: "Expects one answer for everything." },
  cattail: { name: "The Cattails", emoji: "🌾", color: "#22C55E", hint: "Went from 40 to 210." },
  ants: { name: "The Ant Colony", emoji: "🐜", color: "#EF4444", hint: "Was underwater for four days." },
  deer: { name: "The Deer", emoji: "🦌", color: "#8B5CF6", hint: "Left, then came back in April." },
  juno: { name: "Juno", emoji: "📋", color: "#0D9488", hint: "Has one line per living thing." }
};

export const PUBLIC_CASE = {
  standard: "3.12C",
  title: "The Flood Ruined Everything",
  bigQuestion: "The flood put the field underwater for four days. Did that turn out the same for every living thing in it?",
  trapLine: "There's no point walking it. It's ruined. A flood is bad for everything out there.",
  evidenceBank: [
    "The cattails went from 40 before the flood to 210 after",
    "The ant colony was underwater for four days and is now empty",
    "Deer tracks moved to the ridge and were back by April",
    "In the drought two years ago the cattails died back",
    "In that same drought the ant colony was fine"
  ],
  coldOpenMessages: [
    { who: "system", text: "A field by the creek, adopted in September, flooded in January. The survey is due." },
    { who: "juno", text: "Wes, I walked it this morning and I've got counts. Can I read them out?" },
    { who: "wes", text: "You can, but I already know. It's ruined. A flood does that." },
    { who: "juno", text: "Cattails. Before the flood, forty. After, two hundred and ten." },
    { who: "cattail", text: "That's us. We grow best where the ground stays wet. Four days of standing water was the best thing that's happened to us all year." },
    { who: "ants", text: "It was not the best thing that happened to us. Four days under. Juno dug the colony out in March and it was empty." },
    { who: "deer", text: "And we went up the ridge until it dried out. Tracks were back in the field by April." },
    { who: "wes", text: "Two hundred and ten of one thing doesn't change the overall picture. There's no point walking it. It's ruined. A flood is bad for everything out there." }
  ],
  selfCheckQuestions: [
    "Did I name something that did better after the flood?",
    "Did I name something that died?",
    "Did I name something that moved away and came back?",
    "Did I use the drought from two years ago?",
    "Did I answer Wes's idea that a flood is bad for everything?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Wes believe?", placeholder: "In your own words, what is Wes's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Wes's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them predict what a three-month drought would do to the same three — the cattails, the ants and the deer — and say which one would be affected first.";
