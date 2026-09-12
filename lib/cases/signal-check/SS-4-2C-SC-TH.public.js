// Signal Check Thread — companion to SS.4.2C-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.4.2C-SC-TH',
  teksLabel: '4.2C',
  grade: 4,
  subject: "Social Studies",
  title: 'Thread: Empty Land Only?',
  tagline: 'Cadets debate mission sites.',
  stemMode: 'dropdown-open',

  transmission: {
    claimHeadline: 'Spanish missions were built mainly wherever there happened to be empty land.',
    source: 'Spanish Mission Records',
    loggedAt: 'Site Planning Notes',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Empty', text: 'Saw empty land → built a mission. Done!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet River', text: 'San Antonio River meant steady water for farming and life.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Near', text: 'They placed missions near existing settlements on purpose.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Bell', text: 'Wonder how heavy that Mexico-cast bell was.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Plan', text: 'Site planning notes list water, communities, and routes.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Random', text: 'Any empty patch worked. No strategy needed.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'mission_river', text: 'Built along the San Antonio River for a steady water supply.' },
    { id: 'water_need', text: 'Water was needed daily for drinking, farming, and mission life.' },
    { id: 'mission_settlement', text: 'Placed near existing American Indian settlements to reach communities.' },
    { id: 'conversion_goal', text: 'Missionaries aimed to teach and convert people living nearby.' },
    { id: 'open_land_note', text: 'Texas had large amounts of open, unclaimed land at the time.' },
    { id: 'site_planning', text: 'Each site was chosen for water, communities, or safe travel routes.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark river/near as helpful?',
    'Did I catch empty-only as misleading?',
    'Did my reply use a real reading?',
    'Did I say sites were chosen carefully?',
  ],
};
