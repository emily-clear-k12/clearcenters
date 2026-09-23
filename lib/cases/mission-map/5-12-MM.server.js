// Mission Map — "Fraction Recipe Quest" — SERVER ONLY.
// Never import this from a client component. See 5-12-MM.public.js for the
// TEKS 5.3H alignment and the note on why this is not 5.3K.

export const SERVER_CASE = {
  standard: "5.12-MM",
  title: "Fraction Recipe Quest",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", type: "quickScan", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The dry mix comes to 17/12 of a cup, which is 1 and 5/12 cups, so it will not fit in a single one-cup jar. Both amounts are measured in the same cup, but fourths and thirds are different-sized pieces, so I renamed them both in twelfths: 3/4 is 9/12 and 2/3 is 8/12. Then 9/12 + 8/12 = 17/12, and 17/12 is one whole cup with 5/12 left over. Adding the tops and the bottoms to get 5/7 could not be true, because 5/7 is about 0.71 of a cup and the oats alone were already 3/4, or 0.75. Adding the flour cannot leave the cook with less mix than she had before she added it.",

  mustInclude: [
    "Gives 17/12 or 1 5/12 cups as the total AND answers the jar question",
    "Shows the rename to a common denominator (3/4 = 9/12 and 2/3 = 8/12) rather than only the final sum",
    "Explains why 5/7 is impossible using the reasonableness check — the total came out smaller than one of the amounts added — not just 'that is not how you add fractions'",
  ],
};
