// SERVER ONLY — Weigh-In rubric for 5.10A-SC-WI.

export const SERVER_CASE = {
  standard: '5.10A-SC-WI',
  title: 'Coast Fog Weigh-In',
  caseShape: "weigh_in",
  stemMode: "open",
  correctSideId: "B",
  rulingMustInclude: [
    'temperature',
    'condense',
    'not random',
  ],
  modelAnswer:
    'Side B — not random. Fog showed up with a warm-ocean/cool-air gap; clear morning had no gap.',
};
