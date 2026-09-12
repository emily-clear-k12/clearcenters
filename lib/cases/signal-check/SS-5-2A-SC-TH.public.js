// Signal Check Thread — companion to SS.5.2A-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.5.2A-SC-TH',
  teksLabel: '5.2A',
  grade: 5,
  subject: "Social Studies",
  title: 'Thread: Just the Stamp Act?',
  tagline: 'Cadets debate causes of revolution.',
  stemMode: 'open',

  transmission: {
    claimHeadline: 'The Stamp Act alone made the colonists ready to fight for independence.',
    source: 'Colonial Correspondence Archive',
    loggedAt: 'Timeline File',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Alone', text: 'Stamp Act = ready to fight. One law did it all!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Repeal', text: 'It got repealed in 1766 — so it couldn\'t be the only cause.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Later', text: 'Townshend Acts and Boston events came years after.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Flag', text: 'That Sons of Liberty flag looks fierce.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Decade', text: 'Lexington was 1775 — a full decade later.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Spark', text: 'One spark means the whole fire. Stamp Act finished it.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'protest_flyer', text: 'Crowds loudly protested the Stamp Act in 1765.' },
    { id: 'stamp_repeal', text: 'Parliament repealed the Stamp Act in 1766.' },
    { id: 'townshend_acts', text: 'Townshend Acts (1767) taxed glass, paper, and tea.' },
    { id: 'boston_events', text: 'Boston Massacre (1770) and Boston Tea Party (1773) came years later.' },
    { id: 'lexington_date', text: 'Fighting at Lexington and Concord: April 1775 — a decade after Stamp Act.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark repeal/timeline as helpful?',
    'Did I catch alone claims as misleading?',
    'Did my reply use a real reading?',
    'Did I say a chain of events mattered?',
  ],
};
