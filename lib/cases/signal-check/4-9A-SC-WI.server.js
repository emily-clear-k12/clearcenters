// SERVER ONLY — Weigh-In rubric for 4.9A-SC-WI.

export const SERVER_CASE = {
  standard: "4.9A-SC-WI",
  title: 'Sunset Cold Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown-open",
  correctSideId: "B",
  rulingMustInclude: [
    "tilt",
    "not cold",
    "earlier before",
  ],
  modelAnswer:
    'Side B — cold isn\'t the cause. Sunset was earlier before the cold, and kept shifting on a warm week. Tilt/orbit drive it.',
};
