// Signal Check Thread - companion to 3.13A-SC.
// Soft Crystal thread of Cadet chatter about the Backyard Burrow Study claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.13A-SC-TH",
  teksLabel: "3.13A",
  grade: 3,
  subject: "Science",
  title: 'Thread: Worse Legs?',
  tagline: 'Burrow feed says mole claws are just worse legs.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: "The mole's short, stubby claws are just worse legs than the rabbit's long ones.",
    source: 'Backyard Burrow Study',
    loggedAt: 'Observation Log',
  },

  comments: [
    { id: "c1", persona: 'Cadet Rank', text: 'Long legs > stubby claws. Mole loses!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Dig', text: 'Mole hit 12 inches in 45 seconds - claws crush digging.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Hop', text: 'Rabbit barely loosened an inch trying to dig.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Carrot', text: 'Do moles even like carrots?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Dash', text: "Rabbit's long legs outran a fox - built for speed.", correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Fur', text: 'Darker wet fur proves mole claws are worse.', correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Fit', text: 'Maybe each body part fits a different job?', correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "dig_time", text: 'Mole dug 12 inches in 45 seconds.' },
    { id: "claw_shape", text: 'Claws wide and shovel-shaped.' },
    { id: "rabbit_dig_attempt", text: 'Rabbit only loosened top inch in a minute.' },
    { id: "rabbit_run_speed", text: 'Rabbit outran a fox with long legs.' },
    { id: "structure_note", text: 'Structures fit different jobs - dig vs run.' },
  ],

  echo: {
    main: 'Thread locked. Flag the burrow chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark dig/run notes as helpful?',
    "Did I catch 'worse legs' as misleading?",
    'Did my reply say structures fit different jobs?',
    'Did I use a real reading?',
  ],
};
