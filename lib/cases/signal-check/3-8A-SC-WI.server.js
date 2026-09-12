// SERVER ONLY - Weigh-In rubric for 3.8A-SC-WI.

export const SERVER_CASE = {
  standard: "3.8A-SC-WI",
  title: 'Plug-Only Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown",
  correctSideId: "B",
  rulingMustInclude: [
    'solar',
    'battery',
    'not only plug',
  ],
  modelAnswer:
    "Side B - energy isn't plug-only. Solar light works with no cord; covering the panel stops it. Batteries store energy too.",
};
