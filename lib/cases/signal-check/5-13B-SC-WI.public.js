// Signal Check Weigh-In — companion to 5.13B-SC (Sit, Shake, Instinct).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.13B-SC-WI',
  teksLabel: '5.13B',
  grade: 5,
  subject: "Science",
  title: 'Sit Shake Weigh-In',
  tagline: 'Born knowing commands?',
  stemMode: "open",

  dispute: {
    prompt: 'Behavior Cadets locked in. Who\'s right?',
    context: 'Pet Training Archive compared trained sit/shake with instinct clips. One Cadet says dogs are born knowing commands. The other splits learned vs instinct.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Dogs are born already knowing how to sit and shake on command.' },
    { id: "B", label: "SIDE B", claim: 'Sit and shake are learned; scent trail and doorbell bark showed up cold.' },
  ],

  evidence: [
    { id: 'sit', text: 'Sit cue only worked after weeks of treat practice.', supports: 'B' },
    { id: 'shake', text: 'Paw shake needed dozens of practice reps.', supports: 'B' },
    { id: 'scent', text: 'Scent trail correct on first try — zero practice.', supports: 'B' },
    { id: 'bark', text: 'Barked at first-ever doorbell — no training.', supports: 'B' },
    { id: 'learn_note', text: 'Commands that need practice are learned; cold first-tries can be instinct.', supports: 'B' },
    { id: 'collar', text: 'Collar tag just shows the dog\'s name.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice sit/shake needed practice?',
    'Did I say those commands are learned?',
    'Did I skip the name tag as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
