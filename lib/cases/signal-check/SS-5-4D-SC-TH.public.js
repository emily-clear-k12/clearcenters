// Signal Check Thread — companion to SS.5.4D-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.5.4D-SC-TH',
  teksLabel: '5.4D',
  grade: 5,
  subject: "Social Studies",
  title: 'Thread: Separate Causes?',
  tagline: 'Cadets debate Civil War causes.',
  stemMode: 'open',

  transmission: {
    claimHeadline: 'Slavery, states\' rights, and sectionalism were three completely separate causes of the Civil War.',
    source: 'Secession Documents Archive',
    loggedAt: 'Cause File',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Split', text: 'Three totally separate causes. Don\'t mix them!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet SC', text: 'South Carolina\'s declaration names slavery directly.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Rights', text: 'That \'states\' rights\' text defends holding enslaved people as property.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Old', text: 'Cool 1803 purchase paper in the folder.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Map', text: 'Economic map shows enslaved labor South vs free labor North.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Walls', text: 'If they have different names, they can\'t share a root.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'sc_declaration', text: 'South Carolina\'s 1860 declaration names slavery as its reason for leaving.' },
    { id: 'states_rights_text', text: 'A states\' rights document defends the legal right to hold enslaved people as property.' },
    { id: 'economic_map', text: '1850s map: South built on enslaved labor; North on factory free labor.' },
    { id: 'cause_summary', text: 'Historian summary traces all three commonly cited causes back to slavery.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark SC/rights as helpful?',
    'Did I catch separate-causes as misleading?',
    'Did my reply use a real reading?',
    'Did I say the causes connect?',
  ],
};
