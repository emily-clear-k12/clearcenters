// Signal Check Weigh-In — companion to 5.10A-SC (Does the Morning Fog Just Show Up for No Reason?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.10A-SC-WI',
  teksLabel: '5.10A',
  grade: 5,
  subject: "Science",
  title: 'Coast Fog Weigh-In',
  tagline: 'Fog for no reason?',
  stemMode: "open",

  dispute: {
    prompt: 'Fog Cadets locked in. Who\'s right?',
    context: 'Coastal Weather Log compared foggy vs clear mornings. One Cadet says fog is random. The other ties it to ocean-air temperature differences.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Morning fog rolls in randomly for no particular reason.' },
    { id: "B", label: "SIDE B", claim: 'Warm ocean air meeting cooler air condenses into fog — a real cause.' },
  ],

  evidence: [
    { id: 'fog1', text: 'Foggy morning 1: ocean much warmer than air above.', supports: 'B' },
    { id: 'fog2', text: 'Foggy morning 2: same big ocean-air temperature gap.', supports: 'B' },
    { id: 'clear', text: 'Clear morning: ocean and air nearly the same temp — no fog.', supports: 'B' },
    { id: 'condense', text: 'Warm moist air meeting cooler air condenses into visible fog.', supports: 'B' },
    { id: 'sun_note', text: 'Sun heats the ocean, driving evaporation in the water cycle.', supports: 'B' },
    { id: 'dock_white', text: 'Harbor dock is painted white.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice fog lined up with the temp gap?',
    'Did I say fog has a real cause?',
    'Did I skip the dock-color note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
