// Signal Check Thread — companion to SS.4.2A-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.4.2A-SC-TH',
  teksLabel: '4.2A',
  grade: 4,
  subject: "Social Studies",
  title: 'Thread: Just Curious?',
  tagline: 'Cadets debate explorer motives.',
  stemMode: 'dropdown-open',

  transmission: {
    claimHeadline: 'Explorers like Coronado and La Salle came to Texas mainly because they were curious about new lands.',
    source: 'Spanish and French Exploration Records',
    loggedAt: 'Motive File',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Curious', text: 'They just wanted to see new places. That\'s it!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Gold', text: 'Coronado packed for a long search for the Cities of Gold.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Claim', text: 'La Salle was sent to claim land for France near the Mississippi.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Sketch', text: 'Cool coastline sketches though.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Rival', text: 'Spain and France were racing for land and wealth.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Wander', text: 'Curiosity is always why explorers go. Always.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'coronado_goal', text: 'Coronado\'s trip was organized to search for the Cities of Gold.' },
    { id: 'coronado_supplies', text: 'Brought soldiers, priests, and supplies for a long treasure search.' },
    { id: 'lasalle_goal', text: 'France sent La Salle to find the Mississippi mouth and claim land.' },
    { id: 'lasalle_mistake', text: 'He missed the Mississippi and landed on the Texas coast by mistake.' },
    { id: 'motive_summary', text: 'Neither Coronado\'s nor La Salle\'s records list curiosity as the reason.' },
    { id: 'spain_france_rivalry', text: 'Spain and France competed to claim land and wealth in the Americas.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark gold/claim as helpful?',
    'Did I catch curiosity-only as misleading?',
    'Did my reply use a real reading?',
    'Did I say motives were gold and claims?',
  ],
};
