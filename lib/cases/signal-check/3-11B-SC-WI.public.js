// Signal Check Weigh-In - companion to 3.11B-SC.
// Reuses Town Water Tank Log evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.11B-SC-WI",
  teksLabel: "3.11B",
  grade: 3,
  subject: "Science",
  title: 'Water Tank Weigh-In',
  tagline: 'Is water unlimited no matter what?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Tank Log Cadets disagree. Who's right?",
    context: 'Town tank dropped over a dry summer. One Cadet says water is unlimited. The other says it can still run low locally.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: "Water is unlimited - it doesn't matter how much you use." },
    { id: "B", label: "SIDE B", claim: 'Water can run low in a place - renewable is not unlimited everywhere.' },
  ],

  evidence: [
    { id: "june_level", text: 'June tank level: 90% full.', supports: "B" },
    { id: "august_level", text: 'August tank level: 55% full after a dry summer.', supports: "B" },
    { id: "refill_log", text: 'Tank only rises after real rain - not automatically.', supports: "B" },
    { id: "dry_spell", text: 'Three-week dry spell: tank level stayed flat.', supports: "B" },
    { id: "local_shortage", text: 'Even though water is renewable, this town ran low in drought.', supports: "B" },
    { id: "tank_paint", text: 'Tank got a fresh coat of paint this spring.', supports: "neither" },
  ],

  echo: {
    main: 'Tank drop, Cadet. Unlimited or not? Weigh it.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice the tank dropped June to August?',
    'Did I remember it only refills after rain?',
    'Did I avoid saying water can never run low?',
    'Did my proof match my ruling?',
  ],
};
