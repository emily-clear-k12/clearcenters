// Mission Map — "Argument Aim Quest" — SERVER ONLY.
// Never import this from a client component. See 4-16-MM.public.js for the
// TEKS 4.9E alignment and the design notes.

export const SERVER_CASE = {
  standard: "4.16-MM",
  title: "Argument Aim Quest",

  checkpoints: [
    { id: "cp1", correctChoiceId: "b" },
    { id: "cp2", correctChoiceId: "c" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", type: "quickScan", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "b" },
  ],

  modelAnswer:
    "Our claim is that afternoon recess should be fifteen minutes longer. One reason you should agree is that during the two-week trial, fewer students were sent to the office in the afternoon, and teachers said students focused better on afternoon lessons. This matters to a principal because she wants students learning and behaving safely. The snack-card fact is true, but it would not persuade her, because trading cards has nothing to do with learning or behavior. A fact only persuades if it matters to the person reading it.",

  mustInclude: [
    "States the claim (afternoon recess should be fifteen minutes longer)",
    "Uses a fact aimed at the principal (fewer office referrals, better afternoon focus) AND explains why it matters to that audience",
    "Explains that the snack-card fact is true but does not connect to what a principal cares about",
  ],
};
