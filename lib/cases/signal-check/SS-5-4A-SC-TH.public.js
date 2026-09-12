// Signal Check Thread — companion to SS.5.4A-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.5.4A-SC-TH',
  teksLabel: '5.4A',
  grade: 5,
  subject: "Social Studies",
  title: 'Thread: Only Land?',
  tagline: 'Cadets debate War of 1812 causes.',
  stemMode: 'open',

  transmission: {
    claimHeadline: 'The War of 1812 was fought only over land disputes with Britain.',
    source: 'War of 1812 Congressional Archive',
    loggedAt: 'Causes Summary',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Land', text: 'It was ONLY about land with Britain.', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Sailor', text: 'Impressment logs show sailors forced into the British Navy.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Trade', text: 'Orders in Council blocked American trade with France\'s allies.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Map', text: 'That 1818 map is pretty though.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Summary', text: 'Congress listed impressment and trade limits as top reasons.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Only', text: 'War Hawks wanted Canada, so land was the whole war.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'causes_summary', text: 'Congressional summary lists impressment and trade restrictions as top reasons for war.' },
    { id: 'impressment_log', text: 'American sailors forced into British Navy service, 1803–1812.' },
    { id: 'warhawk_speech', text: 'A War Hawk argued war might let the U.S. gain Canadian territory.' },
    { id: 'trade_restriction', text: 'British Orders in Council blocked U.S. ships from trading with France\'s allies.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark impress/trade as helpful?',
    'Did I catch land-only as misleading?',
    'Did my reply use a real reading?',
    'Did I say multiple causes mattered?',
  ],
};
