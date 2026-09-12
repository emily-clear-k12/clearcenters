// Signal Check Thread — companion to 4.6B-SC (Stir It Long Enough?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.6B-SC-TH",
  teksLabel: "4.6B",
  grade: 4,
  subject: "Science",
  title: 'Thread: One New Liquid?',
  tagline: 'Cadets buzz about oil and water.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'If you stir long enough, oil and water turn into one new liquid.',
    source: 'Homemade Lava Bottle Test',
    loggedAt: 'Trial 6',
  },

  comments: [
    { id: "c1", persona: 'Cadet Stir', text: 'It looked cloudy after I stirred — so they fused into one liquid!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Layer', text: 'Hold up — ten minutes later the oil was back on top.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Repeat', text: 'Tried it five more times. Always two layers again.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Snack', text: 'Who brought the blue bottles for snack?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Drop', text: 'Those tiny drops are still oil floating in water — not a new liquid.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Forever', text: 'If you stir ALL day they HAVE to stay mixed forever.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "stir_photo", text: 'Right after stirring: tiny oil drops cloudy in the water.' },
    { id: "settle_photo", text: 'Ten minutes later: oil floats back on top in its own layer.' },
    { id: "layer_check", text: 'Oil layer is the same size as before stirring.' },
    { id: "repeat_test", text: 'Five more stirs — always ends the same: two layers again.' },
    { id: "science_note", text: 'Oil and water don\'t stick together for good.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark layer/repeat comments as helpful?',
    'Did I catch "forever mixed" as misleading?',
    'Did my reply use a real reading?',
    'Did I say they don\'t become one new liquid?',
  ],
};
