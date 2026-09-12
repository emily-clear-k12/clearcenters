// Signal Check Thread — companion to SS.5.14B-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.5.14B-SC-TH',
  teksLabel: '5.14B',
  grade: 5,
  subject: "Social Studies",
  title: 'Thread: Just Lawmaking?',
  tagline: 'Cadets debate the Preamble.',
  stemMode: 'open',

  transmission: {
    claimHeadline: 'The Constitution\'s Preamble describes just one main job: making laws.',
    source: 'U.S. Constitution Archive',
    loggedAt: 'Preamble Close Read',
  },

  comments: [
    { id: 'c1', persona: 'Cadet OneJob', text: 'Preamble = make laws. That\'s the whole job!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Union', text: '\'More perfect union\' is about uniting states — not writing laws.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Defense', text: '\'Common defense\' is about protecting the country.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Age', text: 'Voting-age amendment is in the wrong pile.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Six', text: 'Justice is only ONE of six purposes listed.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Law', text: 'If government makes laws, the Preamble must be only about that.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'justice_clause', text: '\'Establish justice\' is one purpose among six listed.' },
    { id: 'union_clause', text: '\'Form a more perfect union\' focuses on uniting the states, not lawmaking.' },
    { id: 'defense_clause', text: '\'Provide for the common defense\' focuses on protecting the country.' },
    { id: 'welfare_liberty_clause', text: '\'General welfare\' and \'blessings of liberty\' focus on wellbeing and freedom.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark union/defense as helpful?',
    'Did I catch one-job as misleading?',
    'Did my reply use a real reading?',
    'Did I say the Preamble lists multiple jobs?',
  ],
};
