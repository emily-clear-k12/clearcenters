// Signal Check Weigh-In — companion to SS.5.8B-SC.
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.5.8B-SC-WI',
  teksLabel: '5.8B',
  grade: 5,
  subject: "Social Studies",
  title: 'Dam Debate Weigh-In',
  tagline: 'All upside, no downside?',
  stemMode: 'open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'The dam brought water and power, but also flooded farms and hurt fish. One Cadet says all good. The other says benefits came with real costs.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The dam was good for the town with no real downsides.' },
    { id: "B", label: "SIDE B", claim: 'It helped with water and power, but flooded farms and dropped fish populations downstream.' },
  ],

  evidence: [
    { id: 'dam_benefits', text: 'Dam supplied irrigation water and electricity after completion.', supports: 'A' },
    { id: 'proposal_notice', text: 'Proposal highlighted water and power — didn\'t mention valley farmland.', supports: 'B' },
    { id: 'flooded_farmland', text: 'Several valley farms flooded; families relocated.', supports: 'B' },
    { id: 'fish_data', text: 'Fish populations dropped sharply downstream after construction.', supports: 'B' },
    { id: 'unrelated_bridge', text: 'Bridge repair record from a different town.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I name a downside?',
    'Did I admit benefits AND costs?',
    'Did I skip the bridge repair as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
