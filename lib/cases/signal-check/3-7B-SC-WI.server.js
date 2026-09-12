// SERVER ONLY - Weigh-In rubric for 3.7B-SC-WI.

export const SERVER_CASE = {
  standard: "3.7B-SC-WI",
  title: 'Hard Hit Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown",
  correctSideId: "B",
  rulingMustInclude: [
    'aim',
    'overshoot',
    'force',
  ],
  modelAnswer:
    "Side B - harder doesn't always win. Hard hit overshot (190 cm); aimed soft tap hit 120 cm. Force size and direction both matter.",
};
