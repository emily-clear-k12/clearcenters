// Mission Map — "Array Door Challenge" — SERVER ONLY.
// Never import this from a client component. See 3-10-MM.public.js for the
// TEKS 3.4D alignment and the note on why this is not 3.5B.

export const SERVER_CASE = {
  standard: "3.10-MM",
  title: "Array Door Challenge",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "b" },
    { id: "cp3", type: "quickScan", correctChoiceId: "a" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The shelf holds 24 bolts. I knew because the bolts sit in 6 rows and every row has 4 bolts, so 6 x 4 = 24. I could also add 4 six times and get the same total. The story about uneven trays used the numbers 6 and 24, but it still did not match, because Mia put 9 bolts in one tray and 2 in another. An array needs every row to hold the same amount. Same numbers is not the same shape, so that story does not describe the shelf.",

  mustInclude: [
    "States 24 as the total AND ties it to the structure (6 rows of 4, or 6 x 4), not just a bare number",
    "Names the multiplication equation or an equivalent equal-groups addition that matches the array",
    "Explains the rejected story in terms of UNEQUAL groups, not in terms of wrong numbers — the digits were the same",
  ],
};
