// Signal Check Thread — companion to SS.3.8A-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.3.8A-SC-TH',
  teksLabel: '3.8A',
  grade: 3,
  subject: "Social Studies",
  title: 'Thread: Same Label?',
  tagline: 'Cadets mix up founding docs.',
  stemMode: 'dropdown',

  transmission: {
    claimHeadline: 'All three founding documents could share the same label.',
    source: 'History Museum Exhibit',
    loggedAt: 'Label Mix-Up',
  },

  comments: [
    { id: 'c1', persona: 'Cadet One', text: 'They\'re all old founding papers — one label works!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Free', text: 'One doc lists speech and religion freedoms — that\'s its own job.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Branches', text: 'Another sets up three branches — not the same as independence.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Light', text: 'That display light is bright!', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet 1776', text: 'The 1776 one explains leaving Britain — different purpose.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Same', text: 'If they\'re in the same case, they share the same label.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'doc_declaration', text: 'Explains why the colonies wanted independence from Britain.' },
    { id: 'doc_purpose_1', text: 'Written in 1776, before the new government existed.' },
    { id: 'doc_constitution', text: 'Describes how the new government would be organized into three branches.' },
    { id: 'doc_purpose_2', text: 'Written after independence to set up how the country would run.' },
    { id: 'doc_billofrights', text: 'Lists freedoms like speech and religion the government cannot take away.' },
    { id: 'purpose_summary', text: 'Three different purposes: independence, organizing government, protecting freedoms.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark purpose comments as helpful?',
    'Did I catch same-label as misleading?',
    'Did my reply use a real reading?',
    'Did I say each doc has its own job?',
  ],
};
