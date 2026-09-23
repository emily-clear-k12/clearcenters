// Mission Map — "Data Clue Trail" — SERVER ONLY.
// Never import this from a client component. See 3-12-MM.public.js for the
// TEKS 3.8B alignment and the note on "scaled intervals."

export const SERVER_CASE = {
  standard: "3.12-MM",
  title: "Data Clue Trail",

  checkpoints: [
    { id: "cp1", correctChoiceId: "b" },
    { id: "cp2", correctChoiceId: "b" },
    { id: "cp3", type: "quickScan", correctChoiceId: "c" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "Each square on the graph stands for 2 cadets, so I had to turn the bars into real numbers first. Crackers is 7 squares, and 7 x 2 = 14 cadets. Raisins is 3 squares, and 3 x 2 = 6 cadets. Then 14 - 6 = 8, so 8 more cadets chose crackers than raisins. The first claim card subtracted correctly, but it subtracted squares instead of cadets. Because each square counts twice, both of its numbers were half of the real ones, and its answer of 4 was half of the real answer too. The key has to be read before the graph can be used.",

  mustInclude: [
    "Gives 8 as the answer AND shows both conversions (7 squares to 14 cadets, 3 squares to 6 cadets) rather than only the final subtraction",
    "Names the scale explicitly — each square stands for 2 cadets",
    "Explains the rejected card as a scale error, not an arithmetic error: its subtraction was right and its units were wrong",
  ],
};
