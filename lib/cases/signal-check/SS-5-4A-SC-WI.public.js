// Signal Check Weigh-In — companion to SS.5.4A-SC.
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.5.4A-SC-WI',
  teksLabel: '5.4A',
  grade: 5,
  subject: "Social Studies",
  title: '1812 Cause Weigh-In',
  tagline: 'Only land disputes?',
  stemMode: 'open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Congress listed impressment and trade limits among top reasons. One Cadet says only land disputes. The other says multiple causes, especially at sea.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The War of 1812 was fought only over land disputes with Britain.' },
    { id: "B", label: "SIDE B", claim: 'Impressment and trade restrictions were top reasons — land ambitions weren\'t the only cause.' },
  ],

  evidence: [
    { id: 'causes_summary', text: 'Congressional summary lists impressment and trade restrictions as top reasons for war.', supports: 'B' },
    { id: 'impressment_log', text: 'American sailors forced into British Navy service, 1803–1812.', supports: 'B' },
    { id: 'warhawk_speech', text: 'A War Hawk argued war might let the U.S. gain Canadian territory.', supports: 'A' },
    { id: 'trade_restriction', text: 'British Orders in Council blocked U.S. ships from trading with France\'s allies.', supports: 'B' },
    { id: 'later_land_map', text: 'An 1818 land treaty map drawn after the war had already ended.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I name impressment or trade limits?',
    'Did I say land wasn\'t the only cause?',
    'Did I skip the 1818 map as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
