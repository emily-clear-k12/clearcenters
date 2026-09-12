// Signal Check Weigh-In - companion to 3.12A-SC.
// Reuses Field Wildlife Log evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.12A-SC-WI",
  teksLabel: "3.12A",
  grade: 3,
  subject: "Science",
  title: 'Winter Vanish Weigh-In',
  tagline: 'Do animals just die off when it gets cold?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Field Log Cadets disagree. Who's right?",
    context: 'Geese, butterflies, and a groundhog vanished by November. One Cadet says they died. The other says they migrate or hibernate.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'When it gets cold, most animals just die off until spring.' },
    { id: "B", label: "SIDE B", claim: 'Animals handle cold in different ways - migrate or hibernate, not all die.' },
  ],

  evidence: [
    { id: "october_count", text: 'October: geese, butterflies, and a groundhog all present.', supports: "B" },
    { id: "november_count", text: 'November: no geese, no butterflies, groundhog burrow sealed.', supports: "B" },
    { id: "goose_tag", text: 'Tagged geese spotted 800 miles south the week they left.', supports: "B" },
    { id: "groundhog_burrow", text: 'Burrow shows slow breathing - groundhog asleep, not dead.', supports: "B" },
    { id: "migration_note", text: 'Geese and butterflies migrate south for winter.', supports: "B" },
    { id: "fence_repair", text: 'Field fence was repaired in early November.', supports: "neither" },
  ],

  echo: {
    main: 'Winter vanish, Cadet. Dead - or elsewhere? Weigh it.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice animals missing by November?',
    'Did I use the goose tag and burrow evidence?',
    'Did I avoid saying they all died?',
    'Did my proof match my ruling?',
  ],
};
