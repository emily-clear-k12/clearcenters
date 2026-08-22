// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  tuck: { name: "Tuck the Tortoise", emoji: "\ud83d\udc22", color: "#8B5CF6", hint: "Hides under rocks \u2014 beats the midday heat." },
  rico: { name: "Rico the Roadrunner", emoji: "\ud83d\udc26", color: "#F2A93B", hint: "Times his hunting for the cooler hours." },
  kanga: { name: "Kanga the Kangaroo Rat", emoji: "\ud83d\udc2d", color: "#EF4444", hint: "Lives underground, only comes out at night." },
  hostbot: { name: "Hostbot", emoji: "\ud83c\udfac", color: "#00C2C7", hint: "Runs the reality show and wants a real verdict." }
};

export const PUBLIC_CASE = {
  standard: "5.13A",
  title: "The Desert Survival Reality Show",
  bigQuestion: "Do all these desert animals survive the same way, or does each one have its own special trick?",
  trapLine: "We all basically survive the same way out here \u2014 heat is heat, and an animal's an animal.",
  evidenceBank: [
    "Tortoise: hides under a rock ledge during the hottest midday hours",
    "Roadrunner: hunts fast in short bursts during cooler morning/evening hours",
    "Kangaroo rat: stays underground in a burrow during the day, emerges at night",
    "Each strategy directly matches a different desert survival challenge (heat, water, predators)"
  ],
  coldOpenMessages: [
    { who: "system", text: "It's the season finale of the desert survival reality show, and the judges want a final answer." },
    { who: "hostbot", text: "Okay contestants \u2014 what's YOUR secret to surviving out here?" },
    { who: "tuck", text: "We all basically survive the same way out here \u2014 heat is heat, and an animal's an animal." },
    { who: "hostbot", text: "Really? Then why were you under that rock ledge all afternoon, Tuck?" },
    { who: "rico", text: "And why do you only ever see me running fast in the morning and evening?" },
    { who: "kanga", text: "Meanwhile I don't even show my face until the sun's completely down." },
    { who: "hostbot", text: "Sounds like three very different strategies to me." },
    { who: "tuck", text: "We all basically survive the same way out here \u2014 heat is heat, and an animal's an animal." }
  ],
  selfCheckQuestions: [
    "Did I name at least two specific adaptations from the evidence?",
    "Did I match each adaptation to the challenge it actually solves?",
    "Did I explain why timing matters so much in a desert?",
    "Did I say whether Tuck's \"we're all the same\" claim is really true?",
    "Did I connect this to the idea of an adaptation matching its environment?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Tuck believe?", placeholder: "In your own words, what is Tuck's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Tuck's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students research a fourth desert animal's real adaptation and explain which specific survival challenge it solves.";
