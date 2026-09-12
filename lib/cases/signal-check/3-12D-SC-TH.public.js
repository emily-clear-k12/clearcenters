// Signal Check Thread - companion to 3.12D-SC.
// Soft Crystal thread of Cadet chatter about the Rock Layer Field Site claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.12D-SC-TH",
  teksLabel: "3.12D",
  grade: 3,
  subject: "Science",
  title: 'Thread: Someone Carved It?',
  tagline: 'Field feed says a person carved the rock shape.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: 'That shape pressed into the rock was carved by a person a long time ago.',
    source: 'Rock Layer Field Site',
    loggedAt: 'Sample #7',
  },

  comments: [
    { id: "c1", persona: 'Cadet Chisel', text: 'Looks detailed = someone carved it. Done!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Match', text: "Side-by-side: it matches a real shell's ridges.", correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Deep', text: "It's deep inside rock - not a place you'd carve.", correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Lunch', text: 'Is it fossil-hunt snack time yet?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Lens', text: 'Close-up shows zero tool marks.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Gray', text: 'Darker gray rock proves a person carved it.', correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Mud', text: 'Could mud + time make a shell print?', correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "shell_compare", text: 'Shape matches real seashell ridges.' },
    { id: "rock_layer", text: 'Embedded deep in solid rock.' },
    { id: "no_tool_marks", text: 'No scrape or chisel marks.' },
    { id: "fossil_process", text: 'Shells press into mud that hardens into rock.' },
    { id: "similar_finds", text: 'Similar shapes in same layer, far from carve spots.' },
  ],

  echo: {
    main: 'Thread locked. Flag the fossil chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark shell/no-tool notes as helpful?',
    "Did I catch 'carved by a person' as misleading?",
    "Did my reply say it's a fossil?",
    'Did I use a real reading?',
  ],
};
