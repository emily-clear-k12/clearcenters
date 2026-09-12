// Signal Check Thread — companion to SS.3.7C-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.3.7C-SC-TH',
  teksLabel: '3.7C',
  grade: 3,
  subject: "Social Studies",
  title: 'Thread: Any Level?',
  tagline: 'Cadets mix up who does what.',
  stemMode: 'dropdown',

  transmission: {
    claimHeadline: 'If a service helps people, any level of government could be the one responsible for it.',
    source: 'Community Services Directory',
    loggedAt: 'Who Does What',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Any', text: 'Helps people? Then ANY government can do it!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet City', text: 'City crew patched those Main Street potholes — local job.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet License', text: 'Licenses come from Texas DPS with the state seal.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Bench', text: 'That new park bench is comfy.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Mail', text: 'Federal law says only the Postal Service delivers mail.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Swap', text: 'City could just start delivering mail tomorrow. Why not?', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'pothole_log', text: 'City crew patched 6 potholes on Main Street this week.' },
    { id: 'license_office', text: 'Driver\'s licenses are run by the Texas Department of Public Safety.' },
    { id: 'state_seal', text: 'New license printed with the state seal of Texas.' },
    { id: 'mail_log', text: 'U.S. Postal Service delivers mail every weekday.' },
    { id: 'postal_law', text: 'Federal law reserves mail delivery for the U.S. Postal Service, not local governments.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark mail/license as helpful?',
    'Did I catch any-level as misleading?',
    'Did my reply use a real reading?',
    'Did I say each level has its own jobs?',
  ],
};
