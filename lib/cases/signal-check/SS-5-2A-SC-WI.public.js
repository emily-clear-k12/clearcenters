// Signal Check Weigh-In — companion to SS.5.2A-SC.
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.5.2A-SC-WI',
  teksLabel: '5.2A',
  grade: 5,
  subject: "Social Studies",
  title: 'Stamp Act Weigh-In',
  tagline: 'Stamp Act alone?',
  stemMode: 'open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'The Stamp Act sparked protests, but war came a decade later after more laws and flashpoints. One Cadet says Stamp Act alone did it. The other says a chain of events did.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The Stamp Act alone made colonists ready to fight for independence.' },
    { id: "B", label: "SIDE B", claim: 'Stamp Act was one spark — later acts, Boston events, and 1775 fighting show a longer chain.' },
  ],

  evidence: [
    { id: 'protest_flyer', text: 'Crowds loudly protested the Stamp Act in 1765.', supports: 'A' },
    { id: 'stamp_repeal', text: 'Parliament repealed the Stamp Act in 1766.', supports: 'B' },
    { id: 'townshend_acts', text: 'Townshend Acts (1767) taxed glass, paper, and tea.', supports: 'B' },
    { id: 'boston_events', text: 'Boston Massacre (1770) and Boston Tea Party (1773) came years later.', supports: 'B' },
    { id: 'lexington_date', text: 'Fighting at Lexington and Concord: April 1775 — a decade after Stamp Act.', supports: 'B' },
    { id: 'sons_liberty_flag', text: 'Sons of Liberty flag design from around 1765 — a symbol, not a timeline.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I note the repeal or later events?',
    'Did I say Stamp Act wasn\'t alone?',
    'Did I skip the flag as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
