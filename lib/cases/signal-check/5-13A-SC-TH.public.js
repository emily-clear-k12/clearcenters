// Signal Check Thread — companion to 5.13A-SC (Do All the Pond Animals Survive the Same Way?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.13A-SC-TH',
  teksLabel: '5.13A',
  grade: 5,
  subject: "Science",
  title: 'Thread: One Winter Plan?',
  tagline: 'Cadets buzz about pond animals.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'Every animal living in that same pond must be surviving winter the exact same way — they\'re all in the same water, after all.',
    source: 'Pond Winter Survey',
    loggedAt: 'Winter Season',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Same', text: 'Same pond water = same winter plan for every animal!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Turtle', text: 'Turtles bury in mud; fish keep swimming under ice.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Frog', text: 'Frogs nearly freeze solid — totally different move.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Skate', text: 'Can we ice-skate if it freezes hard?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Struct', text: 'Different body structures let species survive differently.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Copy', text: 'If one animal hibernates, they all must hibernate.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'turtle', text: 'Turtles bury in mud and slow breathing for winter.' },
    { id: 'fish', text: 'Fish keep swimming and feeding slowly under ice.' },
    { id: 'frog', text: 'Frogs let much of their body freeze, then thaw in spring.' },
    { id: 'same_pond', text: 'All three live in the exact same pond that winter.' },
    { id: 'structure', text: 'Different structures/functions lead to different survival strategies.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark turtle/frog comments as helpful?',
    'Did I catch "same plan" as misleading?',
    'Did my reply use a real reading?',
    'Did I say species survive differently?',
  ],
};
