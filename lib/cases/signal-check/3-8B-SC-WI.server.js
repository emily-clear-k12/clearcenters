// SERVER ONLY - Weigh-In rubric for 3.8B-SC-WI.

export const SERVER_CASE = {
  standard: "3.8B-SC-WI",
  title: 'Heavy Ball Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown",
  correctSideId: "B",
  rulingMustInclude: [
    'speed',
    'mass',
    'not always heavier',
  ],
  modelAnswer:
    'Side B - not always heavier. Same marble: 2 pins low, 7 high. Fast small matched slow heavy. Speed and mass both matter.',
};
