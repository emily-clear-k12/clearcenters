// Signal Check Thread — companion to 4.10A-SC (Did the Puddle Really Disappear?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.10A-SC-TH",
  teksLabel: "4.10A",
  grade: 4,
  subject: "Science",
  title: 'Thread: Water Gone Forever?',
  tagline: 'Cadets debate the dry puddle.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'The puddle dried up, so that water is gone completely and doesn\'t exist anymore.',
    source: 'Playground Puddle Log',
    loggedAt: 'Trial Week',
  },

  comments: [
    { id: "c1", persona: 'Cadet Gone', text: 'Puddle\'s empty — water deleted from the planet!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Cup', text: 'Covered cup kept water; uncovered lost it. Sun + open air.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Lid', text: 'Lid over warm water got droplets — vapor turned liquid again.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Splash', text: 'Who stomped the puddle yesterday?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Cycle', text: 'Vapor is still water in the cycle — just invisible.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Erase', text: 'Once it\'s dry, that H2O is gone forever. Period.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "covered", text: 'Covered cup in the sun lost almost no water.' },
    { id: "uncovered", text: 'Uncovered cup in the same spot lost nearly all water by next day.' },
    { id: "lid_drops", text: 'Droplets form on a lid held above warm water.' },
    { id: "vapor_note", text: 'Water vapor is still water — just an invisible gas.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark cup/lid as helpful?',
    'Did I catch "gone forever" as misleading?',
    'Did my reply say vapor still counts as water?',
    'Did I use a real reading?',
  ],
};
