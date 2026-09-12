// Signal Check Thread — companion to 5.6A-SC (The One-Bin Metal Sorter).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.6A-SC-TH',
  teksLabel: '5.6A',
  grade: 5,
  subject: "Science",
  title: 'Thread: Every Metal?',
  tagline: 'Cadets buzz about the sorter arm.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'A magnet arm can sort every kind of metal into one bin — if it\'s metal, the magnet will grab it.',
    source: 'Recycling Line Test Log',
    loggedAt: 'Run 3',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Snap', text: 'Iron washer AND steel bolt both jumped — so metals stick!', correctFlag: 'needs_evidence' },
    { id: 'c2', persona: 'Cadet Brass', text: 'Hold up — brass hinge and aluminum scrap are metal too, and they just sat there.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Shine', text: 'My lunch tray is shiny metal-colored so the arm would grab it too.', correctFlag: 'misleading' },
    { id: 'c4', persona: 'Cadet Snack', text: 'Who\'s on cleanup after Recycle Run?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Note', text: 'Magnetism is only a property of some metals — not all.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Tarnish', text: 'That green tarnish spot proves brass isn\'t metal at all!', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'iron_washer', text: 'Iron washer snaps up onto the magnet arm.' },
    { id: 'steel_bolt', text: 'Steel bolt jumps to the magnet right away.' },
    { id: 'brass_hinge', text: 'Brass hinge — metal — stays flat on the belt.' },
    { id: 'aluminum_siding', text: 'Aluminum scrap — metal — doesn\'t move.' },
    { id: 'magnetism_note', text: 'Only some metals like iron and steel are magnetic.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark brass/aluminum comments as helpful?',
    'Did I catch tarnish-as-not-metal as misleading?',
    'Did my reply use a real reading?',
    'Did I say not every metal sticks?',
  ],
};
