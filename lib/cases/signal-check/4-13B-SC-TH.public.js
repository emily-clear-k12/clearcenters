// Signal Check Thread — companion to 4.13B-SC (Will the Puppies Get the Same Scar?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.13B-SC-TH",
  teksLabel: "4.13B",
  grade: 4,
  subject: "Science",
  title: 'Thread: Same Scar?',
  tagline: 'Cadets mix up scars and inherited traits.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'The mother\'s ear notch from a fence accident will show up on her puppies at birth.',
    source: 'Litter Trait Log',
    loggedAt: 'Week 1',
  },

  comments: [
    { id: "c1", persona: 'Cadet Copy', text: 'Mom has the notch — pups MUST match at birth!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Smooth', text: 'Every puppy born with smooth, unmarked ears.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Fur', text: 'Fur color and ear shape DID pass to the pups.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Bell', text: 'That collar bell is adorable.', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Trait', text: 'Scars are acquired — they don\'t get inherited.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Fence', text: 'Fence scars are genetic. Science said so. (It didn\'t.)', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "smooth_ears", text: 'All puppies were born with smooth, unmarked ears.' },
    { id: "fur_pass", text: 'Fur color and ear shape passed from mother to every puppy.' },
    { id: "scar_note", text: 'A scar from an accident is acquired, not inherited.' },
    { id: "repeat_litter", text: 'Next litter also had smooth ears — notch never showed at birth.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark smooth/acquired as helpful?',
    'Did I catch "pups must match" as misleading?',
    'Did my reply say scar isn\'t inherited?',
    'Did I use a real reading?',
  ],
};
