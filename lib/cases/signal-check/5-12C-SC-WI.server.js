// SERVER ONLY — Weigh-In rubric for 5.12C-SC-WI.

export const SERVER_CASE = {
  standard: '5.12C-SC-WI',
  title: 'Pave Lot Weigh-In',
  caseShape: "weigh_in",
  stemMode: "open",
  correctSideId: "B",
  rulingMustInclude: [
    'runoff',
    'paving',
    'affect',
  ],
  modelAnswer:
    'Side B — paving affects nearby water flow. Rain that used to soak in now races to the storm drain.',
};
