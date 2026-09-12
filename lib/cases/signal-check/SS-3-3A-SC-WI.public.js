// Signal Check Weigh-In — companion to SS.3.3A-SC.
// Reuses classic evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.3.3A-SC-WI',
  teksLabel: '3.3A',
  grade: 3,
  subject: "Social Studies",
  title: 'Same Weather Weigh-In',
  tagline: 'Same sunny day = same land?',
  stemMode: 'dropdown',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Desert Flats and Green Valley both hit 75°F and sunny. One Cadet says the land must be the same. The other says weather today doesn\'t equal the same place.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Same weather today means the two places are basically the same land.' },
    { id: "B", label: "SIDE B", claim: 'Weather can match for a day — soil, plants, elevation, and rainfall still differ.' },
  ],

  evidence: [
    { id: 'desert_soil', text: 'Desert Flats: sandy soil, very dry, holds almost no water.', supports: 'B' },
    { id: 'desert_plants', text: 'Mostly cactus and low shrubs; little ground cover.', supports: 'B' },
    { id: 'valley_soil', text: 'Green Valley: damp soil near a flowing river.', supports: 'B' },
    { id: 'valley_plants', text: 'Tall pine trees and thick green ground cover.', supports: 'B' },
    { id: 'elevation_data', text: 'Desert Flats ~200 ft; Green Valley ~3,500 ft in the mountains.', supports: 'B' },
    { id: 'rainfall_data', text: 'Desert Flats <5 inches rain/year; Green Valley ~40 inches.', supports: 'B' },
    { id: 'visitor_count', text: 'About 40 visitors hiked the trail today.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice soil and plants differ?',
    'Did I say weather ≠ land?',
    'Did I skip visitor count as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
