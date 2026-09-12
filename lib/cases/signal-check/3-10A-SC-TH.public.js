// Signal Check Thread - companion to 3.10A-SC.
// Soft Crystal thread of Cadet chatter about the Weekly Weather Log claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.10A-SC-TH",
  teksLabel: "3.10A",
  grade: 3,
  subject: "Science",
  title: 'Thread: Just Guessing?',
  tagline: 'Weather Log chat says forecasts are pointless.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: "Checking the weather forecast is pointless because it's just guessing.",
    source: 'Weekly Weather Log',
    loggedAt: 'Day 5 of 5',
  },

  comments: [
    { id: "c1", persona: 'Cadet Cloud', text: 'It missed Friday - so forecasts are just vibes!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Sunny', text: "Hold up - it matched Monday AND Wednesday. That's not guessing.", correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Tally', text: "4 out of 5 days matched. That's a strong week.", correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Snack', text: 'Anyone packing rain boots for pizza night?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Fast', text: "Friday's miss was a fast-moving system - those are hard to call early.", correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Never', text: 'One miss proves forecasts are NEVER useful.', correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Maybe', text: 'Maybe forecasts help sometimes but I need more proof?', correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "monday_match", text: 'Monday forecast and actual both sunny.' },
    { id: "wednesday_match", text: 'Wednesday forecast and actual both rain.' },
    { id: "friday_miss", text: 'Friday miss - fast cloud system rolled in.' },
    { id: "weeklog_tally", text: 'Matched 4 out of 5 days this week.' },
    { id: "forecast_use_note", text: 'Farmers and pilots still check it daily.' },
  ],

  echo: {
    main: 'Thread ping, Cadet. Flag the forecast chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark match/tally comments as helpful?',
    "Did I catch 'never useful' as misleading?",
    'Did my reply say forecasts still help?',
    'Did I use a real reading in my reply?',
  ],
};
