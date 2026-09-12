// Signal Check Thread — companion to SS.4.9A-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.4.9A-SC-TH',
  teksLabel: '4.9A',
  grade: 4,
  subject: "Social Studies",
  title: 'Thread: Mostly Hunting?',
  tagline: 'Cadets oversimplify how needs were met.',
  stemMode: 'dropdown-open',

  transmission: {
    claimHeadline: 'Early American Indian groups in Texas mostly met their needs by hunting.',
    source: 'Early Texas Economic Activity Records',
    loggedAt: 'Needs Compare',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Hunt', text: 'Hunting covered almost everyone\'s needs!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Farm', text: 'Caddo grew crops and traded surplus — that\'s not hunting.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Fish', text: 'Karankawa fished and gathered shellfish on the coast.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Pot', text: 'That Caddo pottery design is awesome.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Mix', text: 'Summary says farming, fishing, gathering, AND hunting.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Only', text: 'If Apache hunted, they ALL mostly hunted.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'caddo_crops', text: 'Caddo grew corn, beans, and squash in permanent villages.' },
    { id: 'caddo_trade', text: 'Traded surplus crops with neighboring groups.' },
    { id: 'karankawa_fish', text: 'Karankawa gathered shellfish and fished along the Gulf Coast.' },
    { id: 'karankawa_gather', text: 'Collected wild plants along the coast as part of their diet.' },
    { id: 'apache_hunt', text: 'Lipan Apache relied heavily on hunting bison across the plains.' },
    { id: 'needs_summary', text: 'Groups used farming, fishing, gathering, and hunting depending on where they lived.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark farm/fish as helpful?',
    'Did I catch mostly-hunting as misleading?',
    'Did my reply use a real reading?',
    'Did I say needs were met differently?',
  ],
};
