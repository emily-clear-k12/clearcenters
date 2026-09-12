// SERVER ONLY — Weigh-In rubric for 5.8C-SC-WI.

export const SERVER_CASE = {
  standard: '5.8C-SC-WI',
  title: 'Straw Bend Weigh-In',
  caseShape: "weigh_in",
  stemMode: "open",
  correctSideId: "B",
  rulingMustInclude: [
    'straight',
    'refract',
    'light',
  ],
  modelAnswer:
    'Side B — straw didn\'t bend. It comes out straight; light refracting at the waterline makes it look bent.',
};
