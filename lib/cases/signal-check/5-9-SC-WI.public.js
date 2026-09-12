// Signal Check Weigh-In — companion to 5.9-SC (Does the Shadow Move Randomly?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.9-SC-WI',
  teksLabel: '5.9',
  grade: 5,
  subject: "Science",
  title: 'Shadow Path Weigh-In',
  tagline: 'Random wander?',
  stemMode: "open",

  dispute: {
    prompt: 'Shadow Cadets locked in. Who\'s right?',
    context: 'Flagpole Shadow Log tracked morning, noon, afternoon across two days. One Cadet says it\'s random. The other says Earth\'s rotation makes a pattern.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Flagpole shadow moves randomly with no real pattern.' },
    { id: "B", label: "SIDE B", claim: 'It follows a repeating daily pattern from Earth\'s rotation.' },
  ],

  evidence: [
    { id: 'am', text: '9 AM: shadow points west and is fairly long.', supports: 'B' },
    { id: 'pm', text: '3 PM: shadow points east and is fairly long again.', supports: 'B' },
    { id: 'noon', text: 'Noon: shadow nearly north and shortest.', supports: 'B' },
    { id: 'day2', text: 'Same three times next day — exact same pattern.', supports: 'B' },
    { id: 'rotation', text: 'Earth\'s rotation makes the Sun\'s apparent path repeat daily.', supports: 'B' },
    { id: 'pole_al', text: 'Flagpole is aluminum.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice Day 2 matched Day 1?',
    'Did I say there\'s a repeating pattern?',
    'Did I skip the aluminum note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
