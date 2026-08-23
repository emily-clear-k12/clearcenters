// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.6D).

export const SERVER_CASE = {
  standard: "3.6D",
  title: "The All-Steel Umbrella",
  bigQuestion: "Steel really is the strongest. So why shouldn't the whole umbrella be made of it?",
  evidenceBank: [
    "The steel canopy weighs 4 kg and doesn't fold",
    "The fabric canopy weighs 200 g and folds up small",
    "Fabric on its own flops straight down without ribs",
    "The steel handle goes icy and slippery when wet",
    "The wood handle stays warm to hold and grippy"
  ],
  trapLine: "Steel is the strongest, so the whole umbrella should be steel. Why use anything weaker?",
  castNames: {
    rook: "Rook",
    steel: "Steel",
    fabric: "Fabric",
    wood: "Wood",
    orla: "Orla"
  },
  distractors: "Thinking the strongest material is the right choice for every part; picking a material without saying what job it has to do; forgetting that a part can fail by being too heavy rather than too weak; thinking one object should be made of only one material.",
  mustInclude: [
    "The chat gives at least two parts different materials.",
    "It says why, using a property.",
    "It uses the weight evidence.",
    "It uses the handle test.",
    "It answers Rook's 'strongest is best' idea."
  ],
};
