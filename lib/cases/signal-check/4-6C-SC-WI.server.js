// SERVER ONLY — Weigh-In rubric for 4.6C-SC-WI.

export const SERVER_CASE = {
  standard: "4.6C-SC-WI",
  title: 'Volume Vanish Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown-open",
  correctSideId: "B",
  rulingMustInclude: [
    "gaps",
    "nothing spilled",
    "weight",
  ],
  modelAnswer:
    'Side B — nothing spilled. Weight stayed 340 g. Beans fill gaps between rice, so volume can drop without matter disappearing.',
};
