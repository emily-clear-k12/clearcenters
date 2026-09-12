// Signal Check Thread — companion to SS.5.8B-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.5.8B-SC-TH',
  teksLabel: '5.8B',
  grade: 5,
  subject: "Social Studies",
  title: 'Thread: No Downsides?',
  tagline: 'Cadets debate the dam.',
  stemMode: 'open',

  transmission: {
    claimHeadline: 'Building the new dam was good for the town, with no real downsides.',
    source: 'Public Works Records',
    loggedAt: 'Dam Impact File',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Glow', text: 'Water + power = perfect. Zero downsides!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Flood', text: 'Valley farms flooded and families had to move.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Fish', text: 'Fish counts dropped sharply downstream afterward.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Bridge', text: 'There\'s a random bridge repair in the folder.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Notice', text: 'The proposal didn\'t even mention the farmland.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Only', text: 'If the town got power, nothing else matters.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'dam_benefits', text: 'Dam supplied irrigation water and electricity after completion.' },
    { id: 'proposal_notice', text: 'Proposal highlighted water and power — didn\'t mention valley farmland.' },
    { id: 'flooded_farmland', text: 'Several valley farms flooded; families relocated.' },
    { id: 'fish_data', text: 'Fish populations dropped sharply downstream after construction.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark flood/fish as helpful?',
    'Did I catch no-downside as misleading?',
    'Did my reply use a real reading?',
    'Did I say the dam had costs too?',
  ],
};
