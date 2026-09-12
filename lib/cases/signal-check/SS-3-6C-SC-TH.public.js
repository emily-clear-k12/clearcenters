// Signal Check Thread — companion to SS.3.6C-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.3.6C-SC-TH',
  teksLabel: '3.6C',
  grade: 3,
  subject: "Social Studies",
  title: 'Thread: Sold Out = Profit?',
  tagline: 'Cadets mix up sold out and profit.',
  stemMode: 'dropdown',

  transmission: {
    claimHeadline: 'If a store sells every item, it must have made a profit.',
    source: 'Third Grade Bake Sale Records',
    loggedAt: 'Sold-Out Day',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Empty', text: 'Table empty = huge profit. Easy win!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Cost', text: 'Each cupcake cost $1.50 to make but sold for $1.00.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Math', text: '$40 in and $60 out — that\'s a loss, not a profit.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Balloons', text: 'Those balloons looked awesome.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Sheet', text: 'Cost sheet and price sheet don\'t match — sold below cost.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Full', text: 'If everything sells, you ALWAYS profit.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'cupcake_count', text: 'Class baked exactly 40 cupcakes.' },
    { id: 'total_revenue', text: '40 × $1.00 = $40.00 total revenue.' },
    { id: 'total_cost', text: '40 × $1.50 to make = $60.00 total cost.' },
    { id: 'cost_sheet', text: 'Ingredients for each cupcake cost $1.50.' },
    { id: 'price_sheet', text: 'Cupcakes sold for $1.00 each.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark cost/math as helpful?',
    'Did I catch sold-out=profit as misleading?',
    'Did my reply use a real reading?',
    'Did I say they lost money?',
  ],
};
