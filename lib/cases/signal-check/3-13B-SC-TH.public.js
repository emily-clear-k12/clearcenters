// Signal Check Thread - companion to 3.13B-SC.
// Soft Crystal thread of Cadet chatter about the Pond Tagging Study claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.13B-SC-TH",
  teksLabel: "3.13B",
  grade: 3,
  subject: "Science",
  title: 'Thread: Two Different Bugs?',
  tagline: 'Pond feed says nymph and dragonfly are unrelated.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: 'The bug in the pond and the dragonfly flying above it must be two totally different bugs.',
    source: 'Pond Tagging Study',
    loggedAt: 'June-July',
  },

  comments: [
    { id: "c1", persona: 'Cadet Twin', text: 'They look nothing alike - must be two bugs!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Dot', text: 'Same red tag in June underwater and July in the air.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Wing', text: "Looks change a lot: gills then wings. That's growth.", correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Zoom', text: 'Can we race paper boats after this?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Meta', text: 'Metamorphosis: one bug, big shape change as it grows.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Deep', text: "Pond depth proves they're unrelated species.", correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Link', text: 'Could looking different still mean same bug?', correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "tag_june", text: 'June underwater bug: red dot tag.' },
    { id: "tag_july", text: 'July dragonfly: same red dot.' },
    { id: "nymph_photo", text: 'Nymph: no wings, gills.' },
    { id: "adult_photo", text: 'Adult: wings, breathes air.' },
    { id: "tag_match_summary", text: 'Every marked nymph became a matching dragonfly.' },
  ],

  echo: {
    main: 'Thread locked. Flag the life-cycle chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark tag/metamorphosis notes as helpful?',
    "Did I catch 'two different bugs' as misleading?",
    "Did my reply say it's one bug that changes?",
    'Did I use a real reading?',
  ],
};
