// Signal Check Thread - companion to 3.8A-SC.
// Soft Crystal thread of Cadet chatter about the Backyard Path Light Check claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.8A-SC-TH",
  teksLabel: "3.8A",
  grade: 3,
  subject: "Science",
  title: 'Thread: Needs a Plug?',
  tagline: 'Path Light feed says no plug = no energy.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: "If it's not plugged into the wall, it can't have any energy at all.",
    source: 'Backyard Path Light Check',
    loggedAt: 'Night 5',
  },

  comments: [
    { id: "c1", persona: 'Cadet Outlet', text: 'No plug = no energy. Period!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Glow', text: 'Light ran 5 nights with zero cord attached.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Cover', text: 'Cover the solar panel - it dies. Sun is the energy source.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Bug', text: 'Are those fireflies or just the path lights?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Cell', text: 'Flashlights use battery energy - also no wall plug.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Blue', text: 'Blue-white glow proves it secretly needs a plug.', correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Sun', text: 'Can sunlight count as an energy source?', correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "night_log", text: 'On automatically 5 nights straight.' },
    { id: "no_cord_check", text: 'No cord - solar panel on top.' },
    { id: "covered_test", text: 'Covered panel: stopped by day 4.' },
    { id: "uncovered_test", text: 'Uncovered: worked after a sunny day.' },
    { id: "battery_note", text: 'Battery flashlight stores energy with no cord.' },
  ],

  echo: {
    main: 'Thread locked. Flag the energy chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark solar/battery notes as helpful?',
    "Did I catch 'plug only' as misleading?",
    'Did my reply name another energy source?',
    'Did I use a real reading?',
  ],
};
