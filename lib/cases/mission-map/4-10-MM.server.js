// Mission Map — "Fraction Comparison Castle" — SERVER ONLY.
// Never import this from a client component. See 4-10-MM.public.js for the
// TEKS 4.3D alignment and the note on why the benchmark gate is deliberately
// not decisive.

export const SERVER_CASE = {
  standard: "4.10-MM",
  title: "Fraction Comparison Castle",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "b" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The right lever opens the gate, because 3/4 is greater than 5/8. I started with the benchmark 1/2, but that did not settle it: 5/8 is past 4/8 and 3/4 is past 2/4, so both are already greater than a half. So I renamed 3/4 in eighths using the fraction strips. Each fourth covers the same distance as two eighths, so 3/4 is the same as 6/8. Six eighth-pieces is more than five, so 3/4 > 5/8. The claim on the wall said 5/8 must be bigger because 8 is bigger than 4, but a bigger denominator means the whole was cut into more pieces, so each piece is smaller. One eighth is half the size of one fourth.",

  mustInclude: [
    "States 3/4 > 5/8 and shows the comparison with a model, an equivalence (3/4 = 6/8), or a benchmark — not as a bare assertion",
    "Explains that a larger denominator means more and therefore SMALLER pieces, directly addressing the trap",
    "Shows that the work went past the 1/2 benchmark — either by naming the equivalence or by noting both fractions beat 1/2 so more was needed",
  ],
};
