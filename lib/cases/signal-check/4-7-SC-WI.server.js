// SERVER ONLY — Weigh-In rubric for 4.7-SC-WI.

export const SERVER_CASE = {
  standard: "4.7-SC-WI",
  title: 'Cart Roll Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown-open",
  correctSideId: "B",
  rulingMustInclude: [
    "slope",
    "gravity",
    "not flat",
  ],
  modelAnswer:
    'Side B — the lot isn\'t flat. Level tool and height check show a slope, so gravity pulled the cart.',
};
