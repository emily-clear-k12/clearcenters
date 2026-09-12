// Signal Check Thread — companion to SS.4.11C-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.4.11C-SC-TH',
  teksLabel: '4.11C',
  grade: 4,
  subject: "Social Studies",
  title: 'Thread: Just Population?',
  tagline: 'Cadets debate what grew Texas.',
  stemMode: 'dropdown-open',

  transmission: {
    claimHeadline: 'Texas\'s economy grew mainly because more people moved there — population growth explains the whole story.',
    source: 'Texas Economic Growth Records',
    loggedAt: 'Growth Timeline',
  },

  comments: [
    { id: 'c1', persona: 'Cadet People', text: 'More people moved in — that\'s the entire growth story!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Rail', text: 'New railroads linked towns to faraway markets.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Land', text: 'Cheap farmland let settlers grow cotton to sell.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Austin', text: 'Austin becoming capital is neat trivia.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Timeline', text: 'Rails and farmland activity rose BEFORE the biggest population jumps.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Only', text: 'Population growth explains everything. Nothing else matters.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'railroad_expansion', text: 'New rail lines connected Texas towns to markets across the country.' },
    { id: 'trade_growth', text: 'Farmers and ranchers shipped goods far beyond their own county.' },
    { id: 'farmland_price', text: 'Land was cheap and widely available for new settlers.' },
    { id: 'cotton_growth', text: 'Cotton farming expanded as settlers grew crops to sell.' },
    { id: 'population_data', text: 'Texas\'s population grew significantly during this period.' },
    { id: 'growth_timeline', text: 'Railroad and farmland activity rose before the biggest population jumps.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark rail/timeline as helpful?',
    'Did I catch population-only as misleading?',
    'Did my reply use a real reading?',
    'Did I say more than population grew Texas?',
  ],
};
