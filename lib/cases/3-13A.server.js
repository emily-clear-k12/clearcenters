// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.13A).

export const SERVER_CASE = {
  standard: "3.13A",
  title: "Duck Wants Different Feet",
  bigQuestion: "Duck's feet really do slip on concrete. So why shouldn't Otis swap them for neat ones like Hen's?",
  evidenceBank: [
    "Duck crosses 12 metres of water in 9 seconds",
    "With her feet taped narrow the same 12 metres took 31 seconds",
    "Hen paddles hard in the water and goes almost nowhere",
    "Hen scratches up 8 worms in 5 minutes in the yard",
    "Duck's webbed feet scratch up no worms at all"
  ],
  trapLine: "My feet are wrong. They slip on the concrete. Give me neat feet like Hen's.",
  castNames: {
    duck: "Duck",
    hen: "Hen",
    yard: "The Concrete Yard",
    swimlog: "The Swim Log",
    otis: "Otis"
  },
  distractors: "Judging a body part by how it performs outside the animal's normal environment; assuming one body design is better for every animal; thinking a structure that causes any difficulty must be a mistake; naming a structure without saying what job it does.",
  mustInclude: [
    "The chat says what webbed feet do in water.",
    "It uses the swim times.",
    "It uses what Hen can and can't do.",
    "It brings in where each bird spends its time.",
    "It gives Otis the rule about body parts."
  ],
};
