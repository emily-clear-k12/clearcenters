// Signal Check Thread — companion to SS.3.2B-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.3.2B-SC-TH',
  teksLabel: '3.2B',
  grade: 3,
  subject: "Social Studies",
  title: 'Thread: Same Stoplight?',
  tagline: 'Cadets debate Elm vs Birch.',
  stemMode: 'dropdown',

  transmission: {
    claimHeadline: 'If two streets need a safer crossing, they should get the exact same fix.',
    source: 'City Public Works Department',
    loggedAt: 'Street Safety Review',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Match', text: 'Both need safer crossings — so both need the SAME stoplight!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Count', text: 'Hold up — Elm has ~400 cars an hour. Birch only ~20.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Safe', text: 'Birch had ZERO crossing incidents all year.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Snack', text: 'Who\'s bringing snacks to the park?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Cost', text: 'A stoplight costs about $50k — Birch doesn\'t need that.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Twin', text: 'If Elm got a light, Birch MUST get one too or it\'s unfair.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'elm_traffic', text: 'About 400 cars pass Elm Street every hour during pickup.' },
    { id: 'elm_fix', text: 'City put a stoplight with a walk signal at Elm and 5th.' },
    { id: 'birch_traffic', text: 'About 20 cars pass Birch Lane every hour, mostly slow.' },
    { id: 'birch_fix', text: 'City painted a crosswalk and added a stop sign near the park.' },
    { id: 'birch_incidents', text: 'Zero crossing incidents on Birch Lane all year.' },
    { id: 'stoplight_cost', text: 'A new stoplight costs about $50,000 — way more than a crosswalk.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark traffic/cost comments as helpful?',
    'Did I catch \'must match\' as misleading?',
    'Did my reply use a real reading?',
    'Did I say Birch doesn\'t need Elm\'s stoplight?',
  ],
};
