// Mission Map — "Settlement Site Quest" — SERVER ONLY.
// Never import this from a client component. See 5-7-MM.public.js for the
// TEKS 5.7B alignment.

export const SERVER_CASE = {
  standard: "5.7-MM",
  title: "Settlement Site Quest",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The settlement site with the river, the trade trail, and the fertile soil and forest should be chosen because it combines water access, transportation and trade, and natural resources — all three geographic factors that actually help a settlement survive and grow. The river provides drinking water, farming water, and a way to move goods by boat; the trade trail connects the site to other towns; and the fertile soil and nearby forests support farming and building. The mountain-view site should be rejected because a beautiful view doesn't provide any of these things — no water, no trade access, and no resources — so settlers there would struggle to survive no matter how nice the scenery looks.",

  mustInclude: [
    "Uses evidence about water access, trade/transportation access, AND natural resources (not just one factor)",
    "Explains why the mountain-view site should be rejected (no water, trade, or resources)",
    "Makes a clear recommendation for which site to choose",
  ],
};
