// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.9D, TEKS 3.9D).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.9D",
  title: "Who Helps When Government Doesn’t Do It All?",
  bigQuestion: "How can civic and nonprofit organizations serve the common good?",
  evidenceBank: [
    "The Red Cross can provide emergency shelter, food, and support after disasters.",
    "A nonprofit food pantry can collect and distribute food to families who need it.",
    "A civic group can organize volunteers to clean parks or help neighbors."
  ],
  trapLine: "If a problem matters to the community, the government should be the one to solve it.",
  castNames: {
    max: "Max Government-Only",
    redcross: "Ruby Red Cross",
    pantry: "Pia Pantry",
    civic: "Cal Civic Group"
  },
  distractors: "",
  mustInclude: [
    "Uses Red Cross evidence.",
    "Uses nonprofit/civic evidence.",
    "Explains a community service.",
    "Explains common good.",
    "Rejects government-only reasoning."
  ],
};
