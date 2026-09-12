// Signal Check Weigh-In — companion to SS.4.3A-SC.
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.4.3A-SC-WI',
  teksLabel: '4.3A',
  grade: 4,
  subject: "Social Studies",
  title: 'Alamo Survive Weigh-In',
  tagline: 'No one survived?',
  stemMode: 'dropdown-open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Almost all Texian defenders died, but records show some people inside were spared. One Cadet says no one survived. The other says non-combatants did.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'No one survived the Battle of the Alamo.' },
    { id: "B", label: "SIDE B", claim: 'Most defenders were killed, but some non-combatants like Dickinson and Esparza survived.' },
  ],

  evidence: [
    { id: 'roster', text: 'Lists Texian soldiers who fought inside the Alamo.', supports: 'A' },
    { id: 'casualty_report', text: 'Nearly all soldiers on the roster were killed.', supports: 'A' },
    { id: 'dickinson_account', text: 'Susanna Dickinson was inside and survived — her own story.', supports: 'B' },
    { id: 'santaannaorder', text: 'Order to spare anyone who wasn\'t fighting, like women and children.', supports: 'B' },
    { id: 'esparza_account', text: 'Enrique Esparza was a boy inside and survived.', supports: 'B' },
    { id: 'textbook_quote', text: 'Some short versions say: "No one survived the Alamo."', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I name a survivor?',
    'Did I separate defenders from non-combatants?',
    'Did I skip the short textbook line as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
