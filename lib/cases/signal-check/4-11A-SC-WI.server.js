// SERVER ONLY — Weigh-In rubric for 4.11A-SC-WI.

export const SERVER_CASE = {
  standard: "4.11A-SC-WI",
  title: 'Turbine Every Day?',
  caseShape: "weigh_in",
  stemMode: "dropdown-open",
  correctSideId: "B",
  rulingMustInclude: [
    "calm",
    "zero",
    "not every day",
  ],
  modelAnswer:
    'Side B — renewable doesn\'t mean every day. Calm days logged zero power even though wind won\'t run out.',
};
