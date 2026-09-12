// SERVER ONLY — Weigh-In rubric for 5.6B-SC-WI.

export const SERVER_CASE = {
  standard: '5.6B-SC-WI',
  title: 'Mix Pile Weigh-In',
  caseShape: "weigh_in",
  stemMode: "open",
  correctSideId: "B",
  rulingMustInclude: [
    'magnet',
    'mixture',
    'separate',
  ],
  modelAnswer:
    'Side B — it\'s a mixture, not a new substance. Magnet pulls filings out; sand keeps its properties.',
};
