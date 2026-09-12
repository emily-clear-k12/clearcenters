// Signal Check Weigh-In — companion to SS.4.2C-SC.
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.4.2C-SC-WI',
  teksLabel: '4.2C',
  grade: 4,
  subject: "Social Studies",
  title: 'Mission Spot Weigh-In',
  tagline: 'Just empty land?',
  stemMode: 'dropdown-open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Missions like San Antonio de Valero were placed carefully. One Cadet says empty land was enough. The other says water, nearby communities, and routes mattered.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Missions were built mainly wherever there happened to be empty land.' },
    { id: "B", label: "SIDE B", claim: 'Sites were chosen for water, nearby communities, and safe travel routes — not just empty land.' },
  ],

  evidence: [
    { id: 'mission_river', text: 'Built along the San Antonio River for a steady water supply.', supports: 'B' },
    { id: 'water_need', text: 'Water was needed daily for drinking, farming, and mission life.', supports: 'B' },
    { id: 'mission_settlement', text: 'Placed near existing American Indian settlements to reach communities.', supports: 'B' },
    { id: 'conversion_goal', text: 'Missionaries aimed to teach and convert people living nearby.', supports: 'B' },
    { id: 'open_land_note', text: 'Texas had large amounts of open, unclaimed land at the time.', supports: 'A' },
    { id: 'site_planning', text: 'Each site was chosen for water, communities, or safe travel routes.', supports: 'B' },
    { id: 'bell_note', text: 'The mission bell was cast in Mexico and shipped to Texas.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I mention water or settlements?',
    'Did I say empty land wasn\'t enough?',
    'Did I skip the bell as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
