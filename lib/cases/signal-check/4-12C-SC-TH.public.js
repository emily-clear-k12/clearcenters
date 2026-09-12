// Signal Check Thread — companion to 4.12C-SC (Did Someone Just Drop a Seashell up Here?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.12C-SC-TH",
  teksLabel: "4.12C",
  grade: 4,
  subject: "Science",
  title: 'Thread: Dropped Shell?',
  tagline: 'Cadets guess how a seashell got on a hill.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'Somebody carried that seashell fossil up the hill and dropped it.',
    source: 'Hilltop Fossil Find',
    loggedAt: 'Field Day',
  },

  comments: [
    { id: "c1", persona: 'Cadet Drop', text: 'Hiker snack fail — dropped a shell. Case closed.', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Stuck', text: 'It\'s stuck INSIDE the rock, not sitting loose.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Layer', text: 'Same layer has more matching shell fossils.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Boot', text: 'Whose boot print is on the trail?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Sea', text: 'This rock formed underwater when a sea covered the land.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Pocket', text: 'Someone\'s pocket fossils. Tourists do that all the time.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "embedded", text: 'Shell is embedded inside the rock — not loose on top.' },
    { id: "same_layer", text: 'More matching shell fossils in the same rock layer.' },
    { id: "layer_note", text: 'That rock layer formed when an ancient sea covered the area.' },
    { id: "not_loose", text: 'You can\'t just pick the shell up — it\'s part of the rock.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark embedded/layer as helpful?',
    'Did I catch "dropped" as misleading?',
    'Did my reply say ancient sea?',
    'Did I use a real reading?',
  ],
};
