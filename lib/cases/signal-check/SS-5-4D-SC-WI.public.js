// Signal Check Weigh-In — companion to SS.5.4D-SC.
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.5.4D-SC-WI',
  teksLabel: '5.4D',
  grade: 5,
  subject: "Social Studies",
  title: 'Civil War Root Weigh-In',
  tagline: 'Three separate causes?',
  stemMode: 'open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Documents name slavery directly and show \'states\' rights\' often meant the right to hold enslaved people. One Cadet says three separate causes. The other says they share one root.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Slavery, states\' rights, and sectionalism were completely separate causes.' },
    { id: "B", label: "SIDE B", claim: 'They connect — secession texts and states\' rights arguments point back to slavery as the root.' },
  ],

  evidence: [
    { id: 'sc_declaration', text: 'South Carolina\'s 1860 declaration names slavery as its reason for leaving.', supports: 'B' },
    { id: 'states_rights_text', text: 'A states\' rights document defends the legal right to hold enslaved people as property.', supports: 'B' },
    { id: 'economic_map', text: '1850s map: South built on enslaved labor; North on factory free labor.', supports: 'B' },
    { id: 'cause_summary', text: 'Historian summary traces all three commonly cited causes back to slavery.', supports: 'B' },
    { id: 'unrelated_purchase', text: 'An 1803 land purchase document from decades before the war.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I connect states\' rights to slavery?',
    'Did I say they weren\'t fully separate?',
    'Did I skip the 1803 purchase as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
