// Mission Map — "Historical Perspective Portal" — SERVER ONLY.
// Never import this from a client component. See 5-8-MM.public.js for the
// TEKS 5.23E alignment.

export const SERVER_CASE = {
  standard: "5.8-MM",
  title: "Historical Perspective Portal",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", type: "quickScan", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The shop owner's point of view was that the flood was a disaster, because the floodwater ruined their store's stock and forced them to close for repairs. The farmer's point of view was that the flood actually helped, because the same floodwater left rich new soil on their fields and led to one of their best crops ever. They can both be telling the truth because their different roles — running a store versus farming fields — gave them genuinely different experiences of the exact same flood. Disagreement between honest accounts doesn't mean either person is lying; it means their roles and experiences shaped what they noticed and how the event affected them.",

  mustInclude: [
    "Describes the shop owner's point of view with evidence (ruined stock, closed for repairs)",
    "Describes the farmer's point of view with evidence (new fertile soil, better crop)",
    "Explains why both accounts can be honest despite disagreeing (different roles/experiences, not lying)",
  ],
};
