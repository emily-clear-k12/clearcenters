// Signal Check Thread — companion to 4.13A-SC (Does the Waxy Coating Even Do Anything?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.13A-SC-TH",
  teksLabel: "4.13A",
  grade: 4,
  subject: "Science",
  title: 'Thread: Wax Does Nothing?',
  tagline: 'Cadets shrug off the waxy coating.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'That plant\'s waxy coating is just shiny — it doesn\'t do anything useful.',
    source: 'Leaf Wax + Roots Lab',
    loggedAt: 'Trial Week',
  },

  comments: [
    { id: "c1", persona: 'Cadet Shine', text: 'Shiny leaves = fashion only. Zero function.', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Keep', text: 'Wax-on plant lost less water than wax-wiped.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Deep', text: 'Deep roots still sipped water after topsoil dried.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Sparkle', text: 'Those sparkles look like glitter gel.', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Survive', text: 'Structures like wax and deep roots help plants survive.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Fake', text: 'Lab must be wrong — wax never matters.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "wax_keep", text: 'Waxy-leaved plant lost less water than the one with wax wiped off.' },
    { id: "deep_roots", text: 'Deep-rooted plant still reached water after topsoil dried.' },
    { id: "dry_top", text: 'Topsoil dried out; shallow roots struggled.' },
    { id: "function_note", text: 'Waxy coats and deep roots are structures that help survival.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark wax/roots as helpful?',
    'Did I catch "fashion only" as misleading?',
    'Did my reply say wax helps?',
    'Did I use a real reading?',
  ],
};
