// Signal Check Weigh-In — companion to 5.8B-SC (Does the Switch Even Matter?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.8B-SC-WI',
  teksLabel: '5.8B',
  grade: 5,
  subject: "Science",
  title: 'Switch Loop Weigh-In',
  tagline: 'Wires enough?',
  stemMode: "open",

  dispute: {
    prompt: 'Circuit Cadets locked in. Who\'s right?',
    context: 'Motor Circuit Test left wires connected but opened the knife switch. One Cadet says the switch is useless. The other says the loop must be complete.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Wires to the battery are enough — switch doesn\'t matter.' },
    { id: "B", label: "SIDE B", claim: 'Need a closed loop — switch OFF stops the motor; ON spins it.' },
  ],

  evidence: [
    { id: 'switch_off', text: 'Switch OFF — motor doesn\'t spin at all.', supports: 'B' },
    { id: 'wires_still', text: 'Every wire still touches the battery while switch is OFF.', supports: 'B' },
    { id: 'switch_on', text: 'Switch ON — motor spins right away.', supports: 'B' },
    { id: 'motor_warm', text: 'Spinning motor feels slightly warm after a minute.', supports: 'B' },
    { id: 'loop_note', text: 'Electrical energy needs a complete unbroken loop; switch opens/closes it.', supports: 'B' },
    { id: 'motor_green', text: 'Little motor is painted bright green.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I compare switch OFF vs ON?',
    'Did I say the loop must be closed?',
    'Did I skip the paint note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
