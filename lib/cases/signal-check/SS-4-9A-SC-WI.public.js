// Signal Check Weigh-In — companion to SS.4.9A-SC.
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.4.9A-SC-WI',
  teksLabel: '4.9A',
  grade: 4,
  subject: "Social Studies",
  title: 'Needs Meet Weigh-In',
  tagline: 'Mostly hunting?',
  stemMode: 'dropdown-open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Different groups met needs differently. One Cadet says hunting covered most needs. The other says farming, fishing, gathering, and hunting all mattered by place.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Early groups in Texas mostly met their needs by hunting.' },
    { id: "B", label: "SIDE B", claim: 'It depended on place — Caddo farmed/traded, Karankawa fished/gathered, Apache hunted.' },
  ],

  evidence: [
    { id: 'caddo_crops', text: 'Caddo grew corn, beans, and squash in permanent villages.', supports: 'B' },
    { id: 'caddo_trade', text: 'Traded surplus crops with neighboring groups.', supports: 'B' },
    { id: 'karankawa_fish', text: 'Karankawa gathered shellfish and fished along the Gulf Coast.', supports: 'B' },
    { id: 'karankawa_gather', text: 'Collected wild plants along the coast as part of their diet.', supports: 'B' },
    { id: 'apache_hunt', text: 'Lipan Apache relied heavily on hunting bison across the plains.', supports: 'A' },
    { id: 'needs_summary', text: 'Groups used farming, fishing, gathering, and hunting depending on where they lived.', supports: 'B' },
    { id: 'pottery_note', text: 'Caddo artisans made decorated clay pottery.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I name farming or fishing too?',
    'Did I say it depended on place?',
    'Did I skip pottery as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
