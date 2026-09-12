// SERVER ONLY — Weigh-In rubric for 4.10B-SC-WI.

export const SERVER_CASE = {
  standard: "4.10B-SC-WI",
  title: 'Sediment Move Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown-open",
  correctSideId: "B",
  rulingMustInclude: [
    "sediment",
    "upstream",
    "not new",
  ],
  modelAnswer:
    'Side B — not new rocks. Sediment moved from upstream and dropped when current slowed. Types match.',
};
