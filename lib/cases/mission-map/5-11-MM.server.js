// Mission Map — "Graph Scale Escape" — SERVER ONLY.
// Never import this from a client component. See 5-11-MM.public.js for the
// TEKS 5.9C alignment and the note on using a stem-and-leaf plot rather than
// repeating 3-12-MM's scaled bar graph.

export const SERVER_CASE = {
  standard: "5.11-MM",
  title: "Graph Scale Escape",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "b" },
    { id: "cp3", type: "quickScan", correctChoiceId: "c" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The notice is wrong. Five of the 13 cadets scored in the eighties. I counted the leaves in each row: two in the sixties, four in the seventies, five in the eighties and two in the nineties, which is 13 scores in all. Half of 13 is 6.5, and 5 is less than that, so fewer than half the class scored in the eighties. The eighties row is the largest single group, and that is what the first test noticed, but being largest only means it beats each other group one at a time. To be more than half, a group has to outnumber all the other groups put together, and the other three hold 8 cadets between them.",

  mustInclude: [
    "States the claim is false AND gives both counts — 5 in the eighties out of 13 total",
    "Shows the comparison against half (half of 13 is 6.5, or 5 versus the other 8), not just the two raw numbers",
    "Explains the largest-group versus majority distinction, rather than saying the first test miscounted",
  ],
};
