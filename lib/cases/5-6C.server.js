// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.6C",
  title: "The Snow Cone Stand Mystery",
  bigQuestion: "When the syrup melts and mixes into the shaved ice, did some of it actually vanish?",
  evidenceBank: [
    "Mass of cup + shaved ice before adding syrup: 250 g",
    "Mass of syrup added: 10 g",
    "Mass of the mixed snow cone after stirring: 260 g (matches 250 + 10)",
    "Syrup is no longer visible as a separate layer, but the scale still reads 260 g"
  ],
  trapLine: "I dissolved \u2014 I'm just gone. Poof. Not even a little bit of me is left.",
  castNames: {
    sasha: "Sasha the Syrup",
    iggy: "Iggy the Ice",
    dilly: "Dilly the Drip",
    scout: "Scout the Scale",
    mia: "Mia the Manager"
  },
  distractors: "Thinking dissolving only counts as a \"real\" solution when it's a solid in a liquid, missing that solutions can also be liquid-liquid or gas-liquid.",
  mustInclude: [
    "Uses the two mass readings (before/after) as evidence",
    "States mass before = mass after",
    "Explains the dissolved syrup still exists as tiny particles",
    "Rejects the \"just gone\" claim",
    "Connects to the rule that matter is conserved"
  ],
};
