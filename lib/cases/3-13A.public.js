// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.13A).

export const CAST = {
  duck: { name: "Duck", emoji: "🦆", color: "#F59E0B", hint: "Wants her feet changed." },
  hen: { name: "Hen", emoji: "🐔", color: "#EF4444", hint: "Great in the yard. Useless in water." },
  yard: { name: "The Concrete Yard", emoji: "⬜", color: "#6B7280", hint: "Where Duck slips. Ten minutes a day." },
  swimlog: { name: "The Swim Log", emoji: "⏱️", color: "#3B82F6", hint: "Has everyone's times." },
  otis: { name: "Otis", emoji: "🧑‍🌾", color: "#0D9488", hint: "Takes the request seriously." }
};

export const PUBLIC_CASE = {
  standard: "3.13A",
  title: "Duck Wants Different Feet",
  bigQuestion: "Duck's feet really do slip on concrete. So why shouldn't Otis swap them for neat ones like Hen's?",
  trapLine: "My feet are wrong. They slip on the concrete. Give me neat feet like Hen's.",
  evidenceBank: [
    "Duck crosses 12 metres of water in 9 seconds",
    "With her feet taped narrow the same 12 metres took 31 seconds",
    "Hen paddles hard in the water and goes almost nowhere",
    "Hen scratches up 8 worms in 5 minutes in the yard",
    "Duck's webbed feet scratch up no worms at all"
  ],
  coldOpenMessages: [
    { who: "system", text: "A bird yard with a concrete path and a pond. One formal request has been made about feet." },
    { who: "otis", text: "Right, Duck. You want your feet changed. Tell me why." },
    { who: "duck", text: "They flap. They slip. I went over twice last week on that concrete." },
    { who: "yard", text: "That's fair, you did. Though you're only on me about ten minutes a day." },
    { who: "swimlog", text: "I've got your pond times here. Twelve metres, nine seconds." },
    { who: "swimlog", text: "And twelve metres in thirty-one seconds on the day we taped your feet narrow. Same duck. Same morning." },
    { who: "hen", text: "Meanwhile I paddled about in that pond for a minute and went nowhere whatsoever. Neat feet, no push." },
    { who: "duck", text: "That's a pond problem, not a feet problem. My feet are wrong. They slip on the concrete. Give me neat feet like Hen's." }
  ],
  selfCheckQuestions: [
    "Did I say what Duck's webbed feet do in the water?",
    "Did I use the two swim times from the log?",
    "Did I use what Hen can and can't do?",
    "Did I say where Duck actually spends most of her day?",
    "Did I give Otis a rule about what an animal's body parts are for?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Duck believe?", placeholder: "In your own words, what is Duck's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Duck's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them work out what would happen if Hen were given webbed feet instead, and say which of her daily jobs would stop working.";
