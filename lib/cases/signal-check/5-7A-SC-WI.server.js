// SERVER ONLY — Weigh-In rubric for 5.7A-SC-WI.

export const SERVER_CASE = {
  standard: '5.7A-SC-WI',
  title: 'Tug Rope Weigh-In',
  caseShape: "weigh_in",
  stemMode: "open",
  correctSideId: "B",
  rulingMustInclude: [
    'equal',
    'balance',
    'still',
  ],
  modelAnswer:
    'Side B — equal forces balance. Both meters read 400 N and the center mark didn\'t move.',
};
