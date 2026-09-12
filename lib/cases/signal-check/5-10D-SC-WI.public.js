// Signal Check Weigh-In — companion to 5.10D-SC (The Inherited Trait Post).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.10D-SC-WI',
  teksLabel: '5.10D',
  grade: 5,
  subject: "Science",
  title: 'Sit Trait Weigh-In',
  tagline: 'Sit inherited?',
  stemMode: "open",

  dispute: {
    prompt: 'Training Cadets locked in. Who\'s right?',
    context: 'Pet Training Archive compared birth traits vs trained sit. One Cadet says sit is inherited. The other says sit is learned.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'A dog knows how to sit because it inherited that behavior.' },
    { id: "B", label: "SIDE B", claim: 'Sitting on command is learned — fur/ears inherited; sit needed training.' },
  ],

  evidence: [
    { id: 'fur', text: 'Fur color matched parents and was present at birth — inherited.', supports: 'B' },
    { id: 'ears', text: 'Ear shape matched the breed from birth — inherited.', supports: 'B' },
    { id: 'sit', text: 'Sit on command only after weeks of treat training — learned.', supports: 'B' },
    { id: 'scent', text: 'Scent trail worked on first try with zero training — instinct.', supports: 'B' },
    { id: 'learn_note', text: 'Trained commands are learned behaviors, not inherited traits.', supports: 'B' },
    { id: 'dog_name', text: 'The dog\'s name is on the collar tag.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice sit needed weeks of training?',
    'Did I say sit is learned, not inherited?',
    'Did I skip the name tag as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
