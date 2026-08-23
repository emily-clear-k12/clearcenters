// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.12A).

export const SERVER_CASE = {
  standard: "4.12A",
  title: "Soil Thinks They Eat Her",
  bigQuestion: "A weed is thriving on a teaspoon of grit and a jar plant has no soil at all. Where is their food actually coming from?",
  evidenceBank: [
    "The gutter weed is thriving in about a teaspoon of grit",
    "The jar plant has grown in plain water since September",
    "The pot soil went from 2,140 g to 2,131 g while the plant grew a lot",
    "The plant in the dark cupboard was watered but didn't grow",
    "Plants make their own food using sunlight, water and carbon dioxide"
  ],
  trapLine: "Plants eat me. That's the arrangement. That weed is stealing dirt from somewhere, and I'd like to know where.",
  castNames: {
    soil: "Soil",
    weed: "The Gutter Weed",
    jar: "The Jar Plant",
    scale: "The Pot Scale",
    dark: "The Cupboard Plant",
    nix: "Nix"
  },
  distractors: "Thinking plants take in food from the soil rather than making it; assuming a plant growing without much soil must be getting nutrients secretly from somewhere; naming water alone and missing sunlight or carbon dioxide; confusing soil's real roles — holding roots and supplying water — with being the plant's food.",
  mustInclude: [
    "The chat says the plant makes its own food.",
    "It names what the plant uses to do it.",
    "It uses the soil-weighing evidence.",
    "It uses the cupboard plant.",
    "It tells Soil what her actual job is."
  ],
};
