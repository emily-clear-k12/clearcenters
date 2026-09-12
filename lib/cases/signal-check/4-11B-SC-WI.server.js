// SERVER ONLY — Weigh-In rubric for 4.11B-SC-WI.

export const SERVER_CASE = {
  standard: "4.11B-SC-WI",
  title: 'One Battery Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown-open",
  correctSideId: "B",
  rulingMustInclude: [
    "adds up",
    "200",
    "recycle",
  ],
  modelAnswer:
    'Side B — one battery isn\'t harmless when lots of people do it. One class hit 200+; recycling handles them differently.',
};
