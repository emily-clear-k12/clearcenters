// Signal Check Thread — companion to 4.11C-SC (Can Rock Really Hold Water Underground?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.11C-SC-TH",
  teksLabel: "4.11C",
  grade: 4,
  subject: "Science",
  title: 'Thread: Solid Rock Only?',
  tagline: 'Cadets say rock can\'t hold liquids.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'Rock is solid all the way through, so it can\'t store water or oil underground.',
    source: 'Rock Soak Lab',
    loggedAt: 'Trial 4',
  },

  comments: [
    { id: "c1", persona: 'Cadet Brick', text: 'Rock = solid brick. Zero room for water. Done.', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Soak', text: 'Sandstone drank the water. Granite shrugged.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Zoom', text: 'Close-up showed gaps between sandstone grains.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Tray', text: 'Orange tray is my favorite lab color.', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Pore', text: 'Porous rock stores liquids in tiny connected spaces.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Fake', text: 'Lab must be fake — rock can\'t get heavier wet.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "sandstone_soak", text: 'Sandstone soaked up water; granite did not.' },
    { id: "gaps", text: 'Close-up: sandstone has gaps between grains; granite doesn\'t.' },
    { id: "weigh_wet", text: 'Wet sandstone weighed more after the soak.' },
    { id: "porous_note", text: 'Porous rock can store liquids in connected spaces.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark soak/gaps as helpful?',
    'Did I catch "solid brick" as misleading?',
    'Did my reply mention porous sandstone?',
    'Did I use a real reading?',
  ],
};
