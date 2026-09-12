// SERVER ONLY — Weigh-In rubric for SS.3.6C-SC-WI.

export const SERVER_CASE = {
  standard: 'SS.3.6C-SC-WI',
  title: 'Sold Out Weigh-In',
  caseShape: "weigh_in",
  stemMode: 'dropdown',
  correctSideId: "B",
  rulingMustInclude: [
    'cost',
    '40',
    'profit',
  ],
  modelAnswer:
    'Side B — sold out ≠ profit. They took in $40 but spent $60 on ingredients, so they lost money.',
};
