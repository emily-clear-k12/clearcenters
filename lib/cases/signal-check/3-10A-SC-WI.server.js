// SERVER ONLY - Weigh-In rubric for 3.10A-SC-WI.

export const SERVER_CASE = {
  standard: "3.10A-SC-WI",
  title: 'Forecast Fight',
  caseShape: "weigh_in",
  stemMode: "dropdown",
  correctSideId: "B",
  rulingMustInclude: [
    'matched',
    'useful',
    'miss',
  ],
  modelAnswer:
    "Side B - forecasts help. Matched 4 of 5 days; Friday missed on a fast system. One miss doesn't make forecasts pointless.",
};
