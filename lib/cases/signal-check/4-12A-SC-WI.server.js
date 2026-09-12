// SERVER ONLY — Weigh-In rubric for 4.12A-SC-WI.

export const SERVER_CASE = {
  standard: "4.12A-SC-WI",
  title: 'Plant Soil Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown-open",
  correctSideId: "B",
  rulingMustInclude: [
    "sunlight",
    "soil weight",
    "not eating",
  ],
  modelAnswer:
    'Side B — plant isn\'t eating soil. Soil weight barely changed; no-sun plant stayed small. Food comes from sunlight, water, CO2.',
};
