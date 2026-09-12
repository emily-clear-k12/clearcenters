// Signal Check Weigh-In — companion to SS.4.6B-SC.
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.4.6B-SC-WI',
  teksLabel: '4.6B',
  grade: 4,
  subject: "Social Studies",
  title: 'Region Match Weigh-In',
  tagline: 'Same weather = same region?',
  stemMode: 'dropdown-open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Piney Woods and Coastal Plains both felt warm and humid today. One Cadet says they\'re the same region. The other says land, soil, and plants define regions.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Similar weather today means they\'re basically the same region.' },
    { id: "B", label: "SIDE B", claim: 'Regions are defined by landforms, soil, and vegetation — not one day\'s weather.' },
  ],

  evidence: [
    { id: 'pineywoods_forest', text: 'Piney Woods: dense pine forest cover across most of the region.', supports: 'B' },
    { id: 'pineywoods_soil', text: 'Reddish clay soil, common across East Texas.', supports: 'B' },
    { id: 'coastal_grassland', text: 'Coastal Plains: flat grasslands and marshes toward the Gulf.', supports: 'B' },
    { id: 'coastal_soil', text: 'Sandy soil near the coastline.', supports: 'B' },
    { id: 'weather_reading', text: 'Both regions recorded warm, humid conditions at noon.', supports: 'A' },
    { id: 'region_definition', text: 'Texas regions are defined by landforms, soil, and vegetation — not one day\'s weather.', supports: 'B' },
    { id: 'county_map', text: 'County lines drawn across both regions.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I contrast soil or plants?',
    'Did I say weather ≠ region?',
    'Did I skip county lines as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
