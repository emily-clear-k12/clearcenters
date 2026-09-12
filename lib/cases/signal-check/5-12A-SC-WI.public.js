// Signal Check Weigh-In — companion to 5.12A-SC (Do Living Things Only Need Other Living Things?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.12A-SC-WI',
  teksLabel: '5.12A',
  grade: 5,
  subject: "Science",
  title: 'Tank Factors Weigh-In',
  tagline: 'Only living things matter?',
  stemMode: "open",

  dispute: {
    prompt: 'Aquarium Cadets locked in. Who\'s right?',
    context: 'Classroom Aquarium Log recorded heater failure and a dark week. One Cadet says only living things matter. The other includes abiotic factors.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Fish only need other fish and plants — temp and light barely matter.' },
    { id: "B", label: "SIDE B", claim: 'Abiotic factors matter — heater fail and no-light week hurt the tank.' },
  ],

  evidence: [
    { id: 'temp_drop', text: 'Heater failed — fish got sluggish and stopped eating.', supports: 'B' },
    { id: 'temp_same', text: 'Same fish and plants were still in the tank then.', supports: 'B' },
    { id: 'light_off', text: 'Week with light off — plants turned pale and stopped growing.', supports: 'B' },
    { id: 'light_same', text: 'Same fish and other plants still present that week.', supports: 'B' },
    { id: 'abiotic', text: 'Abiotic factors like temperature and light are nonliving parts living things need.', supports: 'B' },
    { id: 'tank_20', text: 'Tank holds 20 gallons.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice temp and light changes hurt the tank?',
    'Did I say abiotic factors matter?',
    'Did I skip the gallon note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
