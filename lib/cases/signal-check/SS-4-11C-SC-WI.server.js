// SERVER ONLY — Weigh-In rubric for SS.4.11C-SC-WI.

export const SERVER_CASE = {
  standard: 'SS.4.11C-SC-WI',
  title: 'Texas Grow Weigh-In',
  caseShape: "weigh_in",
  stemMode: 'dropdown-open',
  correctSideId: "B",
  rulingMustInclude: [
    'rail',
    'farm',
    'population',
  ],
  modelAnswer:
    'Side B — population isn\'t the whole story. Rails and cheap farmland were already lifting trade before the biggest population jumps.',
};
