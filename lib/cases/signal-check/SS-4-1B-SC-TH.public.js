// Signal Check Thread — companion to SS.4.1B-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.4.1B-SC-TH',
  teksLabel: '4.1B',
  grade: 4,
  subject: "Social Studies",
  title: 'Thread: Same Ways of Life?',
  tagline: 'Cadets lump three nations together.',
  stemMode: 'dropdown-open',

  transmission: {
    claimHeadline: 'The Karankawa, Caddo, and Lipan Apache all lived in Texas, so their ways of life were basically the same.',
    source: 'Texas American Indian Groups Archive',
    loggedAt: 'Ways of Life Compare',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Same', text: 'Same Texas map = same way of life. Simple!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Farm', text: 'Caddo farmed corn in permanent villages — not the same as coast life.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Tipi', text: 'Lipan Apache packed tipis and followed bison. Super different.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Snack', text: 'Who packed trail mix for archive day?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Coast', text: 'Karankawa fished and moved by canoe on the Gulf.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Blend', text: 'If they shared a state, they shared a lifestyle.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'karankawa_food', text: 'Karankawa relied on fishing and shellfish on the Gulf Coast.' },
    { id: 'karankawa_travel', text: 'Moved seasonally along the coast by canoe.' },
    { id: 'caddo_farming', text: 'Caddo grew corn, beans, and squash in permanent villages.' },
    { id: 'caddo_villages', text: 'Built earthen mounds and stayed in one village for years.' },
    { id: 'apache_shelter', text: 'Lipan Apache lived in portable tipis that packed up fast.' },
    { id: 'apache_travel', text: 'Followed bison herds across the western plains.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark farm/tipi as helpful?',
    'Did I catch same-life as misleading?',
    'Did my reply use a real reading?',
    'Did I say ways of life differed?',
  ],
};
