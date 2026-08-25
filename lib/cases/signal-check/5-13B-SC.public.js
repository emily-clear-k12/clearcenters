// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.13B: "Explain how
// instinctual and learned behavioral traits increase an organism's chances
// of survival." This case was rewritten from an earlier draft that mixed in
// PHYSICAL inherited traits (fur color, ear shape) — those belong to the
// grade 4 standard 4.13B, not this one. Every statement below is about
// behavior only: instinctual vs. learned.

export const PUBLIC_CASE = {
  standard: "5.13B-SC",
  teksLabel: "5.13B",
  grade: 5,
  subject: "Science",
  title: "The Dog Training Video",
  tagline: "Dogs are born already knowing how to sit and shake on command.",
  transmission: {
    claimHeadline: "Dogs are born already knowing how to sit and shake on command.",
    source: "Pet Training Archive",
    loggedAt: "Clip 04",
  },

  // Grade 5: no scaffolding left — verdict and reasoning are both typed.
  stemMode: "open",

  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Sitting on command is an instinctual behavior.",
      correctVerdict: "False",
      reasonText: "The dog only sat on command after weeks of training with treats — that's learned, not instinctual.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Following a scent trail on the very first try, with no training, is an instinctual behavior.",
      correctVerdict: "True",
      reasonText: "The behavior showed up with zero training on the very first try — that's instinct.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Shaking a paw when asked is a learned behavior.",
      correctVerdict: "True",
      reasonText: "The paw shake only worked after the trainer practiced it with the dog many times — that's learned.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "Barking at the doorbell the very first time it ever rang, with no training, is an instinctual behavior.",
      correctVerdict: "True",
      reasonText: "The dog barked at the very first doorbell ring with no training at all — that's an instinctual alert response.",
    },
  ],

  // `reading` is a raw, un-categorized observation — deliberately NOT a
  // pre-sorted label (no "instinctual/learned") so Screen 2 doesn't spoil
  // the Sensor Sort game or the Verdict reveal. Sort correctness is driven
  // entirely by sortBins.correctItemIds below, not by this text.
  evidenceReadings: [
    { id: "sit", label: "Sit command clip", reading: "The dog only responded to the cue after several weeks of treat-based practice.", kind: "behavior" },
    { id: "scent", label: "Scent trail clip", reading: "The dog tracked the trail correctly on the very first attempt, with zero practice runs first.", kind: "behavior" },
    { id: "shake", label: "Paw shake clip", reading: "The trainer worked with the dog dozens of times before it would shake on cue.", kind: "behavior" },
    { id: "bark", label: "Doorbell clip", reading: "The dog barked the instant the doorbell rang, the very first time it had ever heard one.", kind: "behavior" },
    { id: "name", label: "Collar tag", reading: "Just shows the dog's name — not a behavior at all.", kind: "distractor" },
  ],

  sortBins: [
    { id: "instinctual", label: "INSTINCTUAL", sublabel: "no training needed", correctItemIds: ["scent", "bark"] },
    { id: "learned", label: "LEARNED", sublabel: "trained or practiced", correctItemIds: ["sit", "shake"] },
    { id: "none", label: "DOESN'T BELONG", sublabel: "", correctItemIds: ["name"] },
  ],

  echo: {
    main: "An old training clip surfaced with a claim attached, Cadet. Let's see if it holds up.",
    scan: "Four signals, five raw clips — nothing's sorted yet. Instinct and training can look alike, so read closely.",
    sort: "Sorted. Notice how the trained behaviors all took repeated practice, while the instinctual ones showed up cold.",
    verdict: "Four signals, four verdicts, all locked to your sort. Time to write the full report.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
  },
};
