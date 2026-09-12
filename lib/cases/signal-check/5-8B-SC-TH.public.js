// Signal Check Thread — companion to 5.8B-SC (Does the Switch Even Matter?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.8B-SC-TH',
  teksLabel: '5.8B',
  grade: 5,
  subject: "Science",
  title: 'Thread: Switch Useless?',
  tagline: 'Cadets buzz about the motor circuit.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'The wires are already connected to the battery, so the little motor should spin no matter what — flipping the switch shouldn\'t matter.',
    source: 'Motor Circuit Test',
    loggedAt: 'Trial 1',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Wire', text: 'Wires are hooked up — switch is just decoration!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Off', text: 'Switch OFF and the motor froze — wires still attached.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet On', text: 'Flip ON and it spun instantly.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Green', text: 'Love that neon green motor paint.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Loop', text: 'Switch is a built-in gap — open breaks the loop.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Always', text: 'If a wire touches the battery, energy always flows forever.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'switch_off', text: 'Switch OFF — motor doesn\'t spin at all.' },
    { id: 'wires_still', text: 'Every wire still touches the battery while switch is OFF.' },
    { id: 'switch_on', text: 'Switch ON — motor spins right away.' },
    { id: 'motor_warm', text: 'Spinning motor feels slightly warm after a minute.' },
    { id: 'loop_note', text: 'Electrical energy needs a complete unbroken loop; switch opens/closes it.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark OFF/ON comments as helpful?',
    'Did I catch "switch is decoration" as misleading?',
    'Did my reply use a real reading?',
    'Did I say the circuit needs a closed loop?',
  ],
};
