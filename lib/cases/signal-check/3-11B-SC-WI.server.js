// SERVER ONLY - Weigh-In rubric for 3.11B-SC-WI.

export const SERVER_CASE = {
  standard: "3.11B-SC-WI",
  title: 'Water Tank Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown",
  correctSideId: "B",
  rulingMustInclude: [
    'ran low',
    'rain',
    'not unlimited',
  ],
  modelAnswer:
    'Side B - water can run low locally. Tank fell 90% to 55%; only refills after rain. Renewable is not unlimited everywhere.',
};
