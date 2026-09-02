// Mission Map — "Food Web Rescue Route" — SERVER ONLY.
// Never import this from a client component. See 5-4-MM.public.js for the
// TEKS 5.12B alignment.

export const SERVER_CASE = {
  standard: "5.4-MM",
  title: "Food Web Rescue Route",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", type: "sequence", correctOrder: ["grass", "rabbit", "hawk", "decomp"] },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The ripple started when the grass population shrank, which caused the rabbit population to drop too, since rabbits had less food to eat. That drop in rabbits then caused the hawk population to drop as well, since hawks depend on rabbits for food — the effect didn't stop at just the rabbit level. The ripple reached the decomposers because less dead plant and animal matter was cycling through the soil, which the decomposer note captured directly. If a new predator that hunts hawks were introduced, I'd predict the ripple would continue further — the hawk population would likely be affected again, and that change would keep moving through the rest of the food web, the same way this whole chain of effects already has.",

  mustInclude: [
    "Traces the ripple in the correct order: grass, then rabbits, then hawks, then decomposers/matter cycling",
    "Explicitly rejects the idea that only the rabbit (the direct grass-eater) is affected",
    "Makes a specific prediction about the new predator, connected to the pattern already observed rather than an unsupported guess",
  ],
};
