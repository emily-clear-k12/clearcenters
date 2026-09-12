// Signal Check Thread — companion to SS.3.5B-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.3.5B-SC-TH',
  teksLabel: '3.5B',
  grade: 3,
  subject: "Social Studies",
  title: 'Thread: Just a Wish List?',
  tagline: 'Cadets argue what a budget is.',
  stemMode: 'dropdown',

  transmission: {
    claimHeadline: 'A budget is just a list of things you want to buy.',
    source: 'Maya\'s Birthday Money Plan',
    loggedAt: '$40 Plan',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Wish', text: 'Budget = shopping wish list. Easy!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Math', text: 'Look — 15+10+5+10 = 40. Every dollar has a home.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Save', text: 'She even set $10 aside for later — that\'s planning, not wishing.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Pup', text: 'What should we name the shelter puppies?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Give', text: '$5 for the shelter is part of the plan too.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Skip', text: 'Budgets don\'t need to add up — just write cool stuff!', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'savings_line', text: '$10 set aside for later, not spent right away.' },
    { id: 'donation_line', text: '$5 planned for the animal shelter.' },
    { id: 'shelter_note', text: 'Local shelter accepts donations to help rescued pets.' },
    { id: 'total_check', text: '$15 gift + $10 save + $5 donate + $10 later = $40.' },
    { id: 'category_sum', text: 'Every dollar of the $40 is placed into one of four categories.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark math/save as helpful?',
    'Did I catch wish-list as misleading?',
    'Did my reply use a real reading?',
    'Did I say a budget has to add up?',
  ],
};
