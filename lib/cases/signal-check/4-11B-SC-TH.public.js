// Signal Check Thread — companion to 4.11B-SC (One Battery Won't Make a Difference?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.11B-SC-TH",
  teksLabel: "4.11B",
  grade: 4,
  subject: "Science",
  title: 'Thread: Just One Battery?',
  tagline: 'Cadets shrug off one battery in the trash.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'One used-up battery in the regular trash won\'t make any difference.',
    source: 'Classroom Battery Drive',
    loggedAt: 'Year Tally',
  },

  comments: [
    { id: "c1", persona: 'Cadet Shrug', text: 'It\'s ONE battery. Planet won\'t notice.', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Tally', text: 'Our class alone hit over 200 this year.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Path', text: 'Recycle path treats batteries different from landfill.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Zap', text: 'Love that lightning sticker on the bin.', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Math', text: 'One choice times many people = real impact.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Free', text: 'Trash is free; recycling is pointless theater.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "class_tally", text: 'One classroom collected over 200 batteries in a year.' },
    { id: "recycle_path", text: 'Recycled batteries are handled differently than landfill trash.' },
    { id: "school_total", text: 'Whole school drive filled multiple bins.' },
    { id: "impact_note", text: 'Small choices repeated by many people create a real effect.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark tally/path as helpful?',
    'Did I catch "won\'t notice" as misleading?',
    'Did my reply say it adds up?',
    'Did I use a real reading?',
  ],
};
