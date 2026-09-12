// Signal Check Thread — companion to 5.7A-SC (If Both Sides Pull, Does It Have to Move?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.7A-SC-TH',
  teksLabel: '5.7A',
  grade: 5,
  subject: "Science",
  title: 'Thread: Rope Must Move?',
  tagline: 'Cadets buzz about tug-of-war.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'Both teams are pulling on the rope with all their strength, so the rope has to move one way or the other — it can\'t just stay still.',
    source: 'Tug-of-War Force Log',
    loggedAt: 'Round 1',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Yank', text: 'They\'re both yanking hard — the rope HAS to slide!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Meter', text: 'Both force meters read the same 400 N.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Mark', text: 'Center mark never left the middle line.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Gym', text: 'Is PE borrowing this rope next?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Balance', text: 'Equal opposite forces cancel — no motion change.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Always', text: 'Any force at all always makes things move.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'force_left', text: 'Left force meter reads 400 N.' },
    { id: 'force_right', text: 'Right force meter also reads 400 N.' },
    { id: 'center_start', text: 'Center mark starts on the middle line.' },
    { id: 'center_after', text: 'After 30 seconds of pulling, center mark is still on the line.' },
    { id: 'balance_note', text: 'Equal opposite forces balance — no change in motion.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark meter/mark comments as helpful?',
    'Did I catch "always moves" as misleading?',
    'Did my reply use a real reading?',
    'Did I say balanced forces can keep it still?',
  ],
};
