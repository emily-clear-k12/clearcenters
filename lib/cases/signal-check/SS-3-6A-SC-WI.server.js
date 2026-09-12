// SERVER ONLY — Weigh-In rubric for SS.3.6A-SC-WI.

export const SERVER_CASE = {
  standard: 'SS.3.6A-SC-WI',
  title: 'Lemonade Price Weigh-In',
  caseShape: "weigh_in",
  stemMode: 'dropdown',
  correctSideId: "B",
  rulingMustInclude: [
    'price',
    'hot',
    'change',
  ],
  modelAnswer:
    'Side B — lemonade does not always cost the same. Hot day and low supply raised prices; cool day stayed at $1. Sign color doesn\'t change price.',
};
