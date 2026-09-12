// Signal Check Thread — companion to 4.7-SC (Moving on Its Own?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.7-SC-TH",
  teksLabel: "4.7",
  grade: 4,
  subject: "Science",
  title: 'Thread: Moved by Itself?',
  tagline: 'Cadets debate the runaway cart.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'The shopping cart rolled away by itself on a totally flat lot — no force.',
    source: 'Parking Lot Roll Test',
    loggedAt: 'Trial 4',
  },

  comments: [
    { id: "c1", persona: 'Cadet Solo', text: 'Nobody pushed it — so zero force!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Level', text: 'Level tool says the lot isn\'t flat.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Height', text: 'One side measured higher — that\'s a slope.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Cart', text: 'Can I ride the yellow cart to lunch?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Marble', text: 'Marble rolls the same way every time — gravity\'s pulling.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Magic', text: 'Carts can just decide to roll. Science!', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "marble_roll", text: 'A marble rolls the same direction every test.' },
    { id: "level_tool", text: 'Level tool shows the lot isn\'t perfectly flat.' },
    { id: "height_check", text: 'One side of the lot measures higher than the other.' },
    { id: "repeat_roll", text: 'Cart rolls the same way every release.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark level/height as helpful?',
    'Did I catch "zero force" as misleading?',
    'Did my reply mention slope or gravity?',
    'Did I use a real reading?',
  ],
};
