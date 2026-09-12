// Signal Check Thread — companion to SS.5.15A-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.5.15A-SC-TH',
  teksLabel: '5.15A',
  grade: 5,
  subject: "Social Studies",
  title: 'Thread: One Branch, Every Job?',
  tagline: 'Cadets mix up the branches.',
  stemMode: 'open',

  transmission: {
    claimHeadline: 'The executive branch has the power to make laws and also decide what those laws mean.',
    source: 'Constitutional Powers Archive',
    loggedAt: 'Branch Jobs',
  },

  comments: [
    { id: 'c1', persona: 'Cadet All', text: 'Executive makes laws AND decides what they mean!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Congress', text: 'Article I gives Congress the power to write and pass laws.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Courts', text: 'Article III gives courts the power to interpret laws.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Census', text: 'Why is a census amendment in this pile?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Veto', text: 'A veto sends the bill back — the president doesn\'t rewrite the law.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Boss', text: 'If you\'re the executive, you run every part of government.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'article2_text', text: 'Article II: executive enforces and carries out the laws.' },
    { id: 'veto_record', text: 'President vetoes a bill and sends it back to Congress — doesn\'t rewrite it.' },
    { id: 'article1_text', text: 'Article I: Congress writes and passes laws.' },
    { id: 'article3_text', text: 'Article III: courts interpret laws and rule on constitutionality.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark Congress/courts as helpful?',
    'Did I catch do-it-all as misleading?',
    'Did my reply use a real reading?',
    'Did I say powers are separated?',
  ],
};
