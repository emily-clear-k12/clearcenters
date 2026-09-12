// SERVER ONLY - Weigh-In rubric for 3.13B-SC-WI.

export const SERVER_CASE = {
  standard: "3.13B-SC-WI",
  title: 'Bug Twin Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown",
  correctSideId: "B",
  rulingMustInclude: [
    'same',
    'metamorphosis',
    'tag',
  ],
  modelAnswer:
    "Side B - same bug. Matching tags June to July; looks change a lot (metamorphosis), but it's one life cycle.",
};
