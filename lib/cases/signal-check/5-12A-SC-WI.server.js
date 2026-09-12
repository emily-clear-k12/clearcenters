// SERVER ONLY — Weigh-In rubric for 5.12A-SC-WI.

export const SERVER_CASE = {
  standard: '5.12A-SC-WI',
  title: 'Tank Factors Weigh-In',
  caseShape: "weigh_in",
  stemMode: "open",
  correctSideId: "B",
  rulingMustInclude: [
    'temperature',
    'light',
    'abiotic',
  ],
  modelAnswer:
    'Side B — temp and light matter. Heater fail hurt fish; dark week hurt plants even with living things still there.',
};
