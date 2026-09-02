// Mission Map — "Unlock the Habitat Trail" — SERVER ONLY.
// Never import this from a client component. See 3-4-MM.public.js for the
// TEKS 3.12C re-anchoring notes.

export const SERVER_CASE = {
  standard: "3.4-MM",
  title: "Unlock the Habitat Trail",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "During the drought, Cedar Hollow's pond shrank to less than half its normal size and the mud around it cracked and dried, and ranger counts found far fewer frogs calling at night — the environmental change made conditions worse for the frog population. After the flood refilled the pond and new plants grew back, frog calls returned to their normal level, showing the population recovered and thrived again once the water came back. The desert park's photo wasn't real evidence for this investigation because it showed a different frog species surviving a drought in a completely different environment hundreds of miles away — that doesn't tell you anything about what actually happened to Cedar Hollow's own frogs, which is what the local ranger logs are for.",

  mustInclude: [
    "Describes what happened to the frog population during the drought (fewer frogs, evidence of the shrinking/drying pond) AND after the flood (population recovered, evidence of the refilled pond)",
    "Connects the environmental change (less water vs. more water) to the population's response, not just stating an outcome",
    "Explains why the desert park's photo wasn't valid evidence for this specific investigation (different species, different environment)",
  ],
};
