// Mission Map — "Decimal Dungeon Escape" — SERVER ONLY.
// Never import this from a client component. See 5-9-MM.public.js for the
// TEKS 5.2B alignment. cp4 is a "sequence" checkpoint: the submit route
// compares `correctOrder` joined with ">", so the order below must match the
// public case's exactly.

export const SERVER_CASE = {
  standard: "5.9-MM",
  title: "Decimal Dungeon Escape",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", type: "quickScan", correctChoiceId: "a" },
    { id: "cp3", type: "showdown", correctSide: "B" },
    { id: "cp4", type: "sequence", correctOrder: ["a", "b", "c", "d"] },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "From greatest to least the readings are 0.5, 0.45, 0.405 and 0.4. I compared them by lining up the decimal points and writing every reading to the thousandths: 0.500, 0.450, 0.405 and 0.400. Then I worked from the left. The tenths place sorted 0.500 above the other three, because 5 beats 4. The remaining three all had 4 in the tenths, so the hundredths place decided: 5, then 0, then 0. That put 0.450 above 0.405 and 0.400, and the thousandths place separated the last two. More digits after the decimal point does not make a number larger, because each place further to the right names a smaller piece. Adding a zero to the end of 0.4 to get 0.400 does not change its value at all.",

  mustInclude: [
    "Gives all four readings in the correct order, greatest to least",
    "Describes a place-value method — aligning the decimals and comparing from the left — rather than only asserting the order",
    "Explains that places further right name smaller pieces, so digit count does not determine size; ideally notes 0.4 and 0.400 are equal",
  ],
};
