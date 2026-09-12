// Signal Check Weigh-In — companion to 5.13A-SC (Do All the Pond Animals Survive the Same Way?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.13A-SC-WI',
  teksLabel: '5.13A',
  grade: 5,
  subject: "Science",
  title: 'Pond Winter Weigh-In',
  tagline: 'Same survival mode?',
  stemMode: "open",

  dispute: {
    prompt: 'Pond Cadets locked in. Who\'s right?',
    context: 'Pond Winter Survey tracked turtles, fish, and frogs. One Cadet says same water means same survival. The other compares different strategies.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Every pond animal survives winter the exact same way.' },
    { id: "B", label: "SIDE B", claim: 'Turtles, fish, and frogs use different strategies in the same pond.' },
  ],

  evidence: [
    { id: 'turtle', text: 'Turtles bury in mud and slow breathing for winter.', supports: 'B' },
    { id: 'fish', text: 'Fish keep swimming and feeding slowly under ice.', supports: 'B' },
    { id: 'frog', text: 'Frogs let much of their body freeze, then thaw in spring.', supports: 'B' },
    { id: 'same_pond', text: 'All three live in the exact same pond that winter.', supports: 'B' },
    { id: 'structure', text: 'Different structures/functions lead to different survival strategies.', supports: 'B' },
    { id: 'two_acres', text: 'Pond covers about two acres.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I compare turtle, fish, and frog strategies?',
    'Did I say same habitat does not mean same survival?',
    'Did I skip the acre note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
