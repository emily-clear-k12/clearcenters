// Signal Check Weigh-In — companion to 5.10C-SC (Did the Canyon Really Form Overnight?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.10C-SC-WI',
  teksLabel: '5.10C',
  grade: 5,
  subject: "Science",
  title: 'Canyon Carve Weigh-In',
  tagline: 'One overnight crack?',
  stemMode: "open",

  dispute: {
    prompt: 'Canyon Cadets locked in. Who\'s right?',
    context: 'Canyon Field Survey found matching bands and a classroom water model. One Cadet says overnight quake. The other says long-term water erosion.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The whole canyon cracked open in one overnight earthquake.' },
    { id: "B", label: "SIDE B", claim: 'Matching layers + river + water model show slow erosion, not one shake.' },
  ],

  evidence: [
    { id: 'match', text: 'Rock layers match across both sides of the gap.', supports: 'B' },
    { id: 'river', text: 'A river still runs along the canyon bottom.', supports: 'B' },
    { id: 'water_model', text: 'Repeated water flow carved a groove in clay over days.', supports: 'B' },
    { id: 'shake_model', text: 'One hard shake of the clay tray made no groove.', supports: 'B' },
    { id: 'erosion', text: 'Canyons form as flowing water slowly erodes rock over a long time.', supports: 'B' },
    { id: 'cool_floor', text: 'Canyon floor felt cooler than the rim.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice the water model beat the shake?',
    'Did I say canyons form slowly?',
    'Did I skip the temperature note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
