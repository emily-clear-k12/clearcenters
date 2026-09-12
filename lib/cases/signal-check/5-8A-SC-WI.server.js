// SERVER ONLY — Weigh-In rubric for 5.8A-SC-WI.

export const SERVER_CASE = {
  standard: '5.8A-SC-WI',
  title: 'Flashlight Energy Weigh-In',
  caseShape: "weigh_in",
  stemMode: "open",
  correctSideId: "B",
  rulingMustInclude: [
    'battery',
    'transform',
    'not nothing',
  ],
  modelAnswer:
    'Side B — not from nothing. Battery energy drops; light and heat come from that stored chemical energy.',
};
