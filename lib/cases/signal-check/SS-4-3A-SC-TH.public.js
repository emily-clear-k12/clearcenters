// Signal Check Thread — companion to SS.4.3A-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.4.3A-SC-TH',
  teksLabel: '4.3A',
  grade: 4,
  subject: "Social Studies",
  title: 'Thread: No Survivors?',
  tagline: 'Cadets debate Alamo survivors.',
  stemMode: 'dropdown-open',

  transmission: {
    claimHeadline: 'No one survived the Battle of the Alamo.',
    source: 'Texas History Archive',
    loggedAt: 'March 6, 1836 — Aftermath',
  },

  comments: [
    { id: 'c1', persona: 'Cadet None', text: 'No one survived. End of story.', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Sue', text: 'Susanna Dickinson\'s account says she survived and told the story.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Order', text: 'Santa Anna ordered non-fighters released.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Quote', text: 'My old summary line said nobody lived — so it must be true.', correctFlag: 'needs_evidence' },
    { id: 'c5', persona: 'Cadet Boy', text: 'Enrique Esparza was a boy inside and lived too.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Absolute', text: 'If soldiers died, EVERYONE died. No exceptions.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'roster', text: 'Lists Texian soldiers who fought inside the Alamo.' },
    { id: 'casualty_report', text: 'Nearly all soldiers on the roster were killed.' },
    { id: 'dickinson_account', text: 'Susanna Dickinson was inside and survived — her own story.' },
    { id: 'santaannaorder', text: 'Order to spare anyone who wasn\'t fighting, like women and children.' },
    { id: 'esparza_account', text: 'Enrique Esparza was a boy inside and survived.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark survivor accounts as helpful?',
    'Did I catch no-one claims as misleading?',
    'Did my reply use a real reading?',
    'Did I say some people survived?',
  ],
};
