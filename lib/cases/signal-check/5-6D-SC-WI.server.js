// SERVER ONLY — Weigh-In rubric for 5.6D-SC-WI.

export const SERVER_CASE = {
  standard: '5.6D-SC-WI',
  title: 'Balloon Air Weigh-In',
  caseShape: "weigh_in",
  stemMode: "open",
  correctSideId: "B",
  rulingMustInclude: [
    'air',
    'weight',
    'matter',
  ],
  modelAnswer:
    'Side B — not truly empty. Inflated balloon weighs more and pushes back because air is matter.',
};
