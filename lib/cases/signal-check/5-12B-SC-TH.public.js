// Signal Check Thread — companion to 5.12B-SC (Does Feeding the Birds Only Help the Birds?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.12B-SC-TH',
  teksLabel: '5.12B',
  grade: 5,
  subject: "Science",
  title: 'Thread: Just the Birds?',
  tagline: 'Cadets buzz about the backyard feeder.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'Filling the backyard bird feeder every day only affects the birds that eat from it — nothing else in the yard is affected.',
    source: 'Backyard Ecosystem Log',
    loggedAt: 'One Season',
  },

  comments: [
    { id: 'c1', persona: 'Cadet BirdsOnly', text: 'Feeder food only changes the birds — end of story!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Beetle', text: 'Beetle numbers fell by about half after birds flooded in.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Seed', text: 'Those wildflowers made fewer seeds this season.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Red', text: 'Red feeder looks cool next to the porch.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Web', text: 'Food-web changes ripple past the species you feed.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Seal', text: 'If plants don\'t eat birdseed, they can\'t be affected. Period.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'birds', text: 'Bird visits roughly doubled after the feeder went up.' },
    { id: 'beetles', text: 'Ground beetles the birds ate dropped by about half.' },
    { id: 'seeds', text: 'Wildflowers those beetles pollinated made fewer seeds.' },
    { id: 'visits', text: 'Beetle visits to those flowers dropped too.' },
    { id: 'web', text: 'A change in one part of a food web can shift matter and energy beyond that species.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark beetle/seed comments as helpful?',
    'Did I catch "birds only" as misleading?',
    'Did my reply use a real reading?',
    'Did I say the feeder rippled beyond birds?',
  ],
};
