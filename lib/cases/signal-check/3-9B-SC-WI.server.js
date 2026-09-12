// SERVER ONLY - Weigh-In rubric for 3.9B-SC-WI.

export const SERVER_CASE = {
  standard: "3.9B-SC-WI",
  title: 'Biggest Closest?',
  caseShape: "weigh_in",
  stemMode: "dropdown",
  correctSideId: "B",
  rulingMustInclude: [
    'distance',
    'not size',
    'orbit',
  ],
  modelAnswer:
    'Side B - order is distance, not size. Mercury small + closest; Jupiter largest + fifth out. Orbit distance sets the line-up.',
};
