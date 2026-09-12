// Signal Check Thread - companion to 3.10C-SC.
// Soft Crystal thread of Cadet chatter about the Creek Bank Trail Cam claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.10C-SC-TH",
  teksLabel: "3.10C",
  grade: 3,
  subject: "Science",
  title: 'Thread: Overnight Change?',
  tagline: 'Trail Cam feed says the bank flipped overnight.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: 'The creek bank looks totally different than last year, so something sudden must have happened overnight.',
    source: 'Creek Bank Trail Cam',
    loggedAt: 'Week 48 of 52',
  },

  comments: [
    { id: "c1", persona: 'Cadet Splash', text: 'Different look = overnight disaster. Obvious!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Frame', text: 'Before/after photos show a new curve - change is real.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Week', text: 'Weekly shots show it growing little by little.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Fish', text: 'Did anyone spot that cool blue heron?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Storm', text: 'Storm log: no big event the week it first showed.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Tan', text: 'Lighter tan color proves a sudden overnight blast.', correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Slow', text: 'Could tiny weekly wears add up to a big curve?', correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "year_photo", text: 'Last year: straight bank.' },
    { id: "now_photo", text: 'This year: wide curve worn in.' },
    { id: "weekly_log", text: 'Curve grew a little each week.' },
    { id: "no_single_event", text: 'No single storm/flood when it first appeared.' },
    { id: "total_change", text: 'Weekly totals match the full curve size.' },
  ],

  echo: {
    main: 'Thread locked. Flag the creek chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark weekly/photo notes as helpful?',
    "Did I catch 'overnight' claims as misleading?",
    'Did my reply say the change was slow?',
    'Did I use a real reading?',
  ],
};
