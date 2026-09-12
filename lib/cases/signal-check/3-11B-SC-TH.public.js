// Signal Check Thread - companion to 3.11B-SC.
// Soft Crystal thread of Cadet chatter about the Town Water Tank Log claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.11B-SC-TH",
  teksLabel: "3.11B",
  grade: 3,
  subject: "Science",
  title: 'Thread: Unlimited Water?',
  tagline: 'Town feed says water never runs out.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: "Water is unlimited, so it doesn't matter how much you use.",
    source: 'Town Water Tank Log',
    loggedAt: 'June-August',
  },

  comments: [
    { id: "c1", persona: 'Cadet Splash', text: "Ocean's huge - use as much as you want!", correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Gauge', text: "Tank fell from 90% to 55% this summer. That's low.", correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Rain', text: 'It only refills after real rain - not auto-magic.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Pool', text: "Who's bringing floaties to the pool party?", correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Cycle', text: "Renewable means the cycle refills over time - not 'never low here.'", correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Paint', text: 'Fresh paint on the tank proves water is unlimited.', correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Hmm', text: "Maybe renewable and unlimited aren't the same?", correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "june_level", text: 'June: 90% full.' },
    { id: "august_level", text: 'August: 55% full after dry summer.' },
    { id: "refill_log", text: 'Tank rises only after real rain.' },
    { id: "dry_spell", text: 'Three-week dry spell - level stayed flat.' },
    { id: "local_shortage", text: 'Town still ran low during drought.' },
  ],

  echo: {
    main: 'Thread locked. Flag the water chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark tank-drop comments as helpful?',
    "Did I catch 'unlimited' as misleading?",
    'Did my reply say water can run low locally?',
    'Did I use a real reading?',
  ],
};
