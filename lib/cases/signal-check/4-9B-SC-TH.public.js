// Signal Check Thread — companion to 4.9B-SC (Does the Moon Really Shrink?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.9B-SC-TH",
  teksLabel: "4.9B",
  grade: 4,
  subject: "Science",
  title: 'Thread: Moon Shrinks?',
  tagline: 'Cadets argue about the changing Moon.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'The Moon shrinks away and rebuilds itself every month.',
    source: 'Moon Photo Log',
    loggedAt: 'Month Cycle',
  },

  comments: [
    { id: "c1", persona: 'Cadet Melt', text: 'Look — it\'s almost gone! The Moon is melting!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Ruler', text: 'Measured the disk — same size every night.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Crater', text: 'Same craters keep showing up. Body is still there.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Howl', text: 'Anyone packing snacks for the night watch?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Orbit', text: 'Orbit changes which side is lit — not the Moon\'s size.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Rebuild', text: 'It rebuilds from space dust every full Moon. Trust me.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "same_size", text: 'Moon measures the same size in every photo this month.' },
    { id: "craters", text: 'Same craters show up night after night.' },
    { id: "lit_part", text: 'The bright part changes shape — the Moon body doesn\'t.' },
    { id: "orbit_note", text: 'As the Moon moves around Earth, sunlight lights different sides.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark size/crater as helpful?',
    'Did I catch shrink/rebuild as misleading?',
    'Did my reply say lit part, not shrink?',
    'Did I use a real reading?',
  ],
};
