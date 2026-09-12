// Signal Check Thread — companion to 4.6C-SC (Where Did the Volume Go?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.6C-SC-TH",
  teksLabel: "4.6C",
  grade: 4,
  subject: "Science",
  title: 'Thread: Something Spilled?',
  tagline: 'Cadets argue about rice, beans, and missing mL.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: '50 mL rice + 50 mL beans should be 100 mL. If not, some spilled.',
    source: 'Rice + Beans Mix Lab',
    loggedAt: 'Trial 3',
  },

  comments: [
    { id: "c1", persona: 'Cadet Spill', text: '92 is less than 100 — stuff MUST have spilled!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Scale', text: 'Weight stayed 340 grams. Matter is still all there.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Gap', text: 'Beans slip into the gaps between rice grains.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Lunch', text: 'Are we cooking the leftover rice?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Clean', text: 'Spill check found nothing on the counter or floor.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Vanish', text: 'The missing 8 mL vanished into thin air.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "mix_volume", text: 'Mixed volume measured 92 mL — nothing on the counter.' },
    { id: "spill_check", text: 'Spill check: counter and floor were clean.' },
    { id: "weight_same", text: 'Weight stayed 340 grams before and after mixing.' },
    { id: "gap_note", text: 'Small beans tuck into spaces between bigger rice grains.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark weight/gap comments as helpful?',
    'Did I catch "vanished" as misleading?',
    'Did my reply say nothing spilled?',
    'Did I use a real reading?',
  ],
};
