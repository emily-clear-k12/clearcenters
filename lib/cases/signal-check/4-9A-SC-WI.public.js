// Signal Check Weigh-In — companion to 4.9A-SC (Does Cold Cause Sunset?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.9A-SC-WI",
  teksLabel: "4.9A",
  grade: 4,
  subject: "Science",
  title: 'Sunset Cold Weigh-In',
  tagline: 'Does cold make sunset earlier?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Sky-log Cadets locked in. Who\'s right?',
    context: 'Sunset is getting earlier. One Cadet blames the cold snap. The other says Earth\'s tilt/orbit drives the pattern — cold doesn\'t cause it.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Cold weather is making the sun set earlier.' },
    { id: "B", label: "SIDE B", claim: 'Earth\'s tilt and orbit drive earlier sunsets — not the cold.' },
  ],

  evidence: [
    { id: "before_cold", text: 'Sunset was already getting earlier before the cold started.', supports: "B" },
    { id: "warm_week", text: 'During a warm week, sunset kept getting earlier anyway.', supports: "B" },
    { id: "pattern_note", text: 'Seasonal daylight follows Earth\'s tilt and path around the Sun.', supports: "B" },
    { id: "temp_log", text: 'Coldest day was not the earliest sunset day.', supports: "B" },
    { id: "coat_color", text: 'Cadet Nova wore a purple coat that week.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I note sunset shifted before the cold?',
    'Did I mention tilt or orbit?',
    'Did I skip the purple-coat note?',
    'Did my proof match my side?',
  ],
};
