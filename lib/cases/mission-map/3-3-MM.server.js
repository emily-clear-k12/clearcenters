// Mission Map — "Magnet Maze" — SERVER ONLY.
// Never import this from a client component. See 3-3-MM.public.js for the
// TEKS 3.7A alignment.

export const SERVER_CASE = {
  standard: "3.3-MM",
  title: "Magnet Maze",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", type: "quickScan", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The iron nail and the paper clip both stuck to the magnet, but the aluminum foil did not, even though foil is also a metal. That proves being a metal isn't enough on its own to predict whether something is magnetic — some metals, like iron and steel, are attracted to magnets, while others, like aluminum, aren't. That's why a magnet can sort steel cans out of a mixed recycling bin but can't be used to sort aluminum cans the same way.",

  mustInclude: [
    "Names at least one object that stuck to the magnet (paper clip, nail, or steel) and one that didn't (foil or aluminum)",
    "Explains that being a metal alone doesn't predict magnetism — some metals are magnetic and some aren't",
    "Uses real evidence from the case (the nail/foil test, or the recycling-center example) rather than a general restatement",
  ],
};
