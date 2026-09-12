// Signal Check Thread — companion to 5.8A-SC (Does the Flashlight Make Energy From Nothing?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.8A-SC-TH',
  teksLabel: '5.8A',
  grade: 5,
  subject: "Science",
  title: 'Thread: Brand-New Light?',
  tagline: 'Cadets buzz about flashlight energy.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'The flashlight just makes brand-new light energy out of nothing the moment you switch it on.',
    source: 'Flashlight Teardown Log',
    loggedAt: 'Trial 1',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Poof', text: 'Flip the switch and light just appears — magic energy!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Drain', text: 'Used battery read way lower after running the light.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Warm', text: 'Bulb got warm too — heat showed up with the light.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Dark', text: 'Can we dim the classroom lights for the next trial?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Chain', text: 'Chemical to electrical to light/heat. That\'s a transform, not creation.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Free', text: 'Light energy is free — batteries don\'t lose anything.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'fresh_batt', text: 'Fresh battery reads high chemical energy on the tester.' },
    { id: 'used_batt', text: 'Same battery after hours of use reads much lower.' },
    { id: 'bulb_cool', text: 'Bulb feels room-temp at switch-on.' },
    { id: 'bulb_warm', text: 'Bulb feels warm after minutes lit.' },
    { id: 'transform_note', text: 'Flashlight transforms chemical energy into light and thermal energy.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark drain/warm comments as helpful?',
    'Did I catch "free light" as misleading?',
    'Did my reply use a real reading?',
    'Did I say energy transforms from the battery?',
  ],
};
