// Signal Check Thread — companion to 5.10B-SC (Can You Really Squish Dirt Into Rock in a Day?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.10B-SC-TH',
  teksLabel: '5.10B',
  grade: 5,
  subject: "Science",
  title: 'Thread: Rock in a Day?',
  tagline: 'Cadets buzz about the mud jar.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'If you pile up enough mud and squish it hard enough, it\'ll turn into solid rock by tomorrow.',
    source: 'Classroom Mud Jar Test',
    loggedAt: 'Day 1 & Day 2',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Squish', text: 'Press hard enough and boom — instant rock!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Soft', text: 'Checked Day 2 — still soft and crumbly.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Layers', text: 'Real sample had hundreds of thin layers.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Art', text: 'Can we paint the jar lid rainbow?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Slow', text: 'Burial + pressure + cementing takes a very long time.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Overnight', text: 'Nature totally makes canyon rock overnight sometimes.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'day1', text: 'Pressed mud/sand jar is soft and crumbly right after squishing.' },
    { id: 'day2', text: 'Same jar next day — still soft, no rock.' },
    { id: 'layers', text: 'Real sedimentary rock shows hundreds of thin packed layers.' },
    { id: 'age', text: 'Scientists estimate those layers took thousands of years.' },
    { id: 'process', text: 'Sediment slowly buried, pressed, and cemented over a long time.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark soft/layers comments as helpful?',
    'Did I catch "instant rock" as misleading?',
    'Did my reply use a real reading?',
    'Did I say sedimentary rock forms slowly?',
  ],
};
