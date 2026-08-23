// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.6B).

export const SERVER_CASE = {
  standard: "4.6B",
  title: "Whisk Will Not Give Up",
  bigQuestion: "The sugar disappeared into the tea in twenty seconds. Why won't the oil do the same thing, no matter how long you stir?",
  evidenceBank: [
    "The sugar vanished into the tea in 20 seconds and stayed gone",
    "The dressing separates back into two layers within a minute",
    "The tea tastes the same at the top and the bottom",
    "The dressing tastes like oil on top and vinegar underneath",
    "Whisk has been stirring the dressing for 11 minutes"
  ],
  trapLine: "Anything will combine if you stir it long enough. I've never failed and I'm not failing now.",
  castNames: {
    whisk: "Whisk",
    sugar: "Sugar",
    oil: "Oil",
    vin: "Vinegar",
    tongue: "Taste Test",
    chef: "Chef Bo"
  },
  distractors: "Thinking any two substances will form a solution given enough effort; treating a mixture that separates as a failed or broken mixture rather than a normal one; assuming 'mixed' and 'dissolved' mean the same thing; missing that a solution stays evenly mixed on its own once the stirring stops.",
  mustInclude: [
    "The chat says what happened in the tea jar.",
    "It says what the dressing does instead.",
    "It uses the taste or timing evidence.",
    "It tells Whisk stirring isn't the problem.",
    "It compares the two mixtures directly."
  ],
};
