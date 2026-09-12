// Signal Check Thread — companion to 5.12A-SC (Do Living Things Only Need Other Living Things?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.12A-SC-TH',
  teksLabel: '5.12A',
  grade: 5,
  subject: "Science",
  title: 'Thread: Skip Temp & Light?',
  tagline: 'Cadets buzz about the aquarium.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'As long as a fish has other fish and plants around it in the tank, that\'s really all it needs — the water temperature and light don\'t actually matter much.',
    source: 'Classroom Aquarium Log',
    loggedAt: 'Two Incidents',
  },

  comments: [
    { id: 'c1', persona: 'Cadet OnlyLive', text: 'Fish + plants are enough — temp is just a vibe!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Heater', text: 'Heater died and fish got sluggish — same tankmates.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Dark', text: 'No light for a week and plants went pale.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Decor', text: 'Should we add a tiny treasure chest?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Abiotic', text: 'Abiotic stuff like light and temperature still counts.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Ignore', text: 'If living things are present, nonliving factors never matter.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'temp_drop', text: 'Heater failed — fish got sluggish and stopped eating.' },
    { id: 'temp_same', text: 'Same fish and plants were still in the tank then.' },
    { id: 'light_off', text: 'Week with light off — plants turned pale and stopped growing.' },
    { id: 'light_same', text: 'Same fish and other plants still present that week.' },
    { id: 'abiotic', text: 'Abiotic factors like temperature and light are nonliving parts living things need.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark heater/dark comments as helpful?',
    'Did I catch "only living things" as misleading?',
    'Did my reply use a real reading?',
    'Did I say abiotic factors matter?',
  ],
};
