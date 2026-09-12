// SERVER ONLY — Weigh-In rubric for 4.7B-SC-WI.

export const SERVER_CASE = {
  standard: "4.7B-SC-WI",
  title: 'Bank Rocks Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown-open",
  correctSideId: "B",
  rulingMustInclude: [
    "sediment",
    "upstream",
    "not new",
  ],
  modelAnswer:
    'Side B — not brand-new rocks. Upstream sediment moved and dropped when the current slowed. Rock type matches.',
};
