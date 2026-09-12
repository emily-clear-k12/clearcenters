// Signal Check Thread — companion to 4.11A-SC (Does the Wind Turbine Work Every Single Day?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.11A-SC-TH",
  teksLabel: "4.11A",
  grade: 4,
  subject: "Science",
  title: 'Thread: Power Every Day?',
  tagline: 'Cadets mix up renewable with always-on.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'Wind is renewable, so the turbine makes power every single day with no downside.',
    source: 'School Turbine Log',
    loggedAt: 'Month Review',
  },

  comments: [
    { id: "c1", persona: 'Cadet Always', text: 'Renewable = always on. Turbine never sleeps!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Calm', text: 'Calm days: zero power on the log.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Last', text: 'Wind won\'t run out — that part of renewable is true.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Spin', text: 'Those white blades look cool from the field.', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Demand', text: 'Renewable doesn\'t mean power on demand every day.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Perfect', text: 'Zero downsides ever. Wind is perfect magic.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "calm_zero", text: 'Turbine made zero power on calm days.' },
    { id: "wind_lasts", text: 'Wind resource itself does not run out over time.' },
    { id: "windy_high", text: 'Windy days logged high power output.' },
    { id: "renew_note", text: 'Renewable does not mean available on demand every day.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark calm-zero as helpful?',
    'Did I catch "always on" as misleading?',
    'Did my reply say not every day?',
    'Did I use a real reading?',
  ],
};
