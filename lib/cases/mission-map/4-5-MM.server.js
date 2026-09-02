// Mission Map — "Weather Data Command Center" — SERVER ONLY.
// Never import this from a client component. See 4-5-MM.public.js for the
// TEKS 4.10C alignment and the grade-5-to-grade-4 move.

export const SERVER_CASE = {
  standard: "4.5-MM",
  title: "Weather Data Command Center",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", type: "showdown", correctSide: "B" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "Weather describes short-term conditions, like tomorrow's forecast of 88°F and sunny skies or one hot 95-degree afternoon. Climate describes patterns over a long period of time, like the town's 30-year average summer temperature, which has stayed within one degree of the same number the whole time. The news headline was misleading because it used a single hot afternoon — a weather event — as if it proved something about climate. One hot day doesn't override 30 years of steady average data; a real climate change would show up as a shift in that long-term average, not in one afternoon's temperature.",

  mustInclude: [
    "Defines both weather (short-term conditions) and climate (long-term patterns) using evidence from the case, not just a memorized definition",
    "Explains specifically why one hot afternoon isn't proof of climate change — because it's a single short-term event, not a shift in the long-term average",
    "References the 30-year average chart as the actual climate evidence, contrasting it with the single-day claim",
  ],
};
