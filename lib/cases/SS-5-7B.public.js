// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.7B, TEKS 5.7B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.7B, for example).

export const CAST = {
  eli: { name: "Eli Mercer", emoji: "🚂", color: "#F59E0B", hint: "Thinks a railroad stop can overcome every geographic disadvantage." },
  nora: { name: "Nora Wells", emoji: "💧", color: "#3B82F6", hint: "Knows why dependable water matters." },
  gabe: { name: "Gabe Ortiz", emoji: "⛰️", color: "#22C55E", hint: "Tracks how terrain changes building and travel." },
  meena: { name: "Meena Patel", emoji: "🛤️", color: "#8B5CF6", hint: "Sees how transportation links settlements to markets." },
  hart: { name: "Ms. Hart", emoji: "📍", color: "#0D9488", hint: "Will approve only a recommendation backed by geographic factors." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.7B",
  title: "The Town That Picked the Wrong Spot",
  bigQuestion: "Why do some places attract more settlement than others, and did Cedar Junction choose a location that can support a growing town?",
  trapLine: "A town can grow almost anywhere if enough people decide to move there. Geography may make life easier, but it does not really influence settlement patterns.",
  evidenceBank: [
    "Reliable water can support people and farms",
    "Flatter land can make building and travel easier",
    "Transportation routes can connect a settlement to people and goods"
  ],
  coldOpenMessages: [
    { who: "system", text: "A railroad planning team must choose between two possible sites for Cedar Junction before the route map goes to print." },
    { who: "hart", text: "We need more than a favorite. Which location is more likely to support a growing settlement?" },
    { who: "eli", text: "Site B. The railroad itself will create the town." },
    { who: "nora", text: "Site B is much farther from dependable water." },
    { who: "gabe", text: "And its steeper ground makes roads and construction harder." },
    { who: "meena", text: "Site A already connects to a wagon route and the river corridor." },
    { who: "eli", text: "People can build roads and haul water. None of that decides where they live." },
    { who: "hart", text: "Maybe not decides — but does it influence the pattern? That is what we have to prove." }
  ],
  selfCheckQuestions: [
    "Did I explain at least two geographic factors that influence settlement?",
    "Did I explain how reliable water can affect where people live?",
    "Did I explain how terrain or transportation access can affect settlement growth?",
    "Did I connect the factors to a predicted settlement or population pattern?",
    "Did I explain that geography influences settlement without claiming it completely determines where people can live?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Eli believe about geography and settlement?", placeholder: "State his claim in your own words..." },
  { key: "water", label: "How could water influence settlement?", placeholder: "Record Nora’s evidence and explain why it matters..." },
  { key: "terrain_transport", label: "How could terrain and transportation influence settlement?", placeholder: "Combine Gabe and Meena’s evidence..." },
  { key: "pattern", label: "What settlement pattern would you predict from the two sites?", placeholder: "Which site is more likely to attract more people, and why?" },
  { key: "judgment", label: "Does Eli’s claim hold up?", placeholder: "Explain how human choices and geographic factors work together..." }
];

export const PUSH_ANGLE = "Planning Board Challenge: redesign Site B so it could attract more settlement. Name two changes people would need to make and explain which geographic disadvantage each change addresses.";
