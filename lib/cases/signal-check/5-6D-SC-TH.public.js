// Signal Check Thread — companion to 5.6D-SC (Is an Empty Balloon Really Empty?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.6D-SC-TH',
  teksLabel: '5.6D',
  grade: 5,
  subject: "Science",
  title: 'Thread: Nothing Inside?',
  tagline: 'Cadets buzz about empty balloons.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'A balloon before it\'s blown up is completely empty — there\'s nothing inside it at all.',
    source: 'Balloon Weight Test',
    loggedAt: 'Trial 1',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Flat', text: 'It looks flat, so there\'s literally nothing inside!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Scale', text: 'Inflated weighed a bit more than deflated on the same scale.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Squeeze', text: 'Inflated one pushed back hard when I squeezed it.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Party', text: 'Can we keep the red ones for the hallway?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Particle', text: 'Air is made of tiny particles that still have mass.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Zero', text: 'If you can\'t see air, it can\'t weigh anything.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'weight_deflated', text: 'Deflated balloon weighs a certain amount on a sensitive scale.' },
    { id: 'weight_inflated', text: 'Same balloon inflated weighs a tiny bit more.' },
    { id: 'push_back', text: 'Inflated balloon pushes back when squeezed.' },
    { id: 'flatten', text: 'Deflated balloon flattens almost completely.' },
    { id: 'particle_note', text: 'Air particles are too small to see but still have mass and take space.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark weight/squeeze comments as helpful?',
    'Did I catch "can\'t see = can\'t weigh" as misleading?',
    'Did my reply use a real reading?',
    'Did I say air is matter?',
  ],
};
