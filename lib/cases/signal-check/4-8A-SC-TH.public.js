// Signal Check Thread — companion to 4.8A-SC (Do the Middle Ones Just Quit?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.8A-SC-TH",
  teksLabel: "4.8A",
  grade: 4,
  subject: "Science",
  title: 'Thread: Energy Skips?',
  tagline: 'Cadets argue about the bell row.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'Energy jumps straight over the middle bells to the last bell.',
    source: 'Bell Row Energy Lab',
    loggedAt: 'Trial 5',
  },

  comments: [
    { id: "c1", persona: 'Cadet Skip', text: 'Middle bells barely move — energy must leap over them!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Gap', text: 'Pull one middle bell out and the far end goes dead.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Wiggle', text: 'Middle ones do wiggle — they\'re passing the motion.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Band', text: 'Can we ring these at the talent show?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Touch', text: 'They have to touch. That\'s how the energy travels.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Teleport', text: 'Energy teleports. Bells are just decoration.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "remove_middle", text: 'Remove a middle bell and the far end stops moving.' },
    { id: "full_row", text: 'Full row touching: only the last bell swings out big.' },
    { id: "middle_wiggle", text: 'Middle bells do wiggle a tiny bit — they\'re in the path.' },
    { id: "contact_note", text: 'Motion travels bell to bell through touching.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark remove-middle as helpful?',
    'Did I catch "leap/teleport" as misleading?',
    'Did my reply say contact, not skip?',
    'Did I use a real reading?',
  ],
};
