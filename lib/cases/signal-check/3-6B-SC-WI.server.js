// SERVER ONLY — Weigh-In rubric for 3.6B-SC-WI.

export const SERVER_CASE = {
  standard: "3.6B-SC-WI",
  title: "Sugar Showdown",
  caseShape: "weigh_in",
  stemMode: "dropdown",
  correctSideId: "B",
  rulingMustInclude: [
    "solid",
    "shape",
    "pile",
  ],
  modelAnswer:
    "Side B — sugar is a solid. It piles into a cone; grains keep their shape. Pouring doesn't make it a liquid (flour pours too).",
};
