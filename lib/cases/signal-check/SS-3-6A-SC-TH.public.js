// Signal Check Thread — companion to SS.3.6A-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.3.6A-SC-TH',
  teksLabel: '3.6A',
  grade: 3,
  subject: "Social Studies",
  title: 'Thread: Same Price Always?',
  tagline: 'Cadets debate lemonade prices.',
  stemMode: 'dropdown',

  transmission: {
    claimHeadline: 'Lemonade always costs the same, no matter how hot it is outside.',
    source: 'Maple Street Lemonade Stand',
    loggedAt: 'Price Log',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Flat', text: 'Price is always $1. Weather doesn\'t matter!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Hot', text: 'On 92° day they charged $2 and sold out fast.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Cool', text: 'Cool day stayed $1 — and cups were left over.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Paint', text: 'Love the new sign color!', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Low', text: 'Only 6 cups left — they bumped it to $2.50.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Lock', text: 'Prices never move. Ever. That\'s the rule.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'hot_day', text: '92°F — price raised to $2/cup — sold out in an hour.' },
    { id: 'cool_day', text: '74°F — price stayed at $1/cup — cups left over.' },
    { id: 'low_supply', text: 'Only 6 cups left — price raised to $2.50 for the rest of the day.' },
    { id: 'full_supply', text: 'Full pitcher at open — price at $1/cup.' },
    { id: 'overprice_day', text: 'Price raised to $100/cup for one hour — zero cups sold.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark hot/supply as helpful?',
    'Did I catch always-same as misleading?',
    'Did my reply use a real reading?',
    'Did I say lemonade price does change?',
  ],
};
