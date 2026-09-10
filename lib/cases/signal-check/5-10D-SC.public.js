// Signal Check — safe to import from client components.

export const PUBLIC_CASE = {
  standard: "5.10D-SC",
  teksLabel: "5.10D",
  grade: 5,
  subject: "Science",
  title: "The Inherited Trait Post",
  tagline: "A dog knows how to sit because it inherited that behavior.",
  transmission: {
    claimHeadline: "A dog knows how to sit because it inherited that behavior.",
    source: "Pet Training Archive",
    loggedAt: "Clip 04",
  },

  // Grade 5: no scaffolding left — verdict and reasoning are both typed.
  stemMode: "open",

  verdictOptions: ["True", "Misleading", "False"],

  // The Scan screen leads with this — one photo plus a short field-note
  // paragraph — instead of a list of separate evidence cards. The discrete
  // evidenceReadings below still exist and still drive Sensor Sort and the
  // "Review the Evidence Again" panel on the Verdict screen; this is just
  // what the student reads first, written as a single field report.
  fieldReport: {
    image: "/signal-check/5-10d-sc-field-report.jpg",
    imageCaption: "Pet Training Archive — sit command with a treat",
    notes: "The photo shows a young black-and-tan puppy sitting on the grass, eyes locked on a treat held in a trainer's hand. The dog is waiting for the reward after practicing the sit command. Behaviors like fur color or ear shape show up at birth. Sitting on cue only happened after weeks of training with treats — that part is learned, not inherited.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A dog's fur color is an inherited trait.",
      correctVerdict: "True",
      reasonText: "Fur color matched both parents and was present from birth — that's inherited.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "A dog's ear shape is an inherited trait.",
      correctVerdict: "True",
      reasonText: "Ear shape matched the breed and was present from birth — that's inherited.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Sitting on command is an inherited trait.",
      correctVerdict: "False",
      reasonText: "The dog only sat on command after weeks of training with treats — that's learned, not inherited.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "Following a scent trail on the very first try is an inherited trait.",
      correctVerdict: "True",
      reasonText: "The behavior showed up with zero training — that's instinct, and instinct is inherited.",
    },
  ],

  evidenceReadings: [
    { id: "fur", label: "Fur color — matches parents, present at birth", attribute: "INHERITED", kind: "trait" },
    { id: "ears", label: "Ear shape — matches breed, present at birth", attribute: "INHERITED", kind: "trait" },
    { id: "sit", label: "Sit command — learned through weeks of repeated training", attribute: "LEARNED", kind: "trait" },
    { id: "scent", label: "Scent trailing — appeared with zero training, first try", attribute: "INHERITED (instinct)", kind: "trait" },
    { id: "name", label: "The dog's name", attribute: "NOT A TRAIT", kind: "distractor" },
  ],

  sortBins: [
    { id: "inherited", label: "INHERITED", sublabel: "present at birth or instinct", correctItemIds: ["fur", "ears", "scent"] },
    { id: "learned", label: "LEARNED", sublabel: "trained or taught", correctItemIds: ["sit"] },
    { id: "none", label: "DOESN'T BELONG", sublabel: "", correctItemIds: ["name"] },
  ],

  echo: {
    main: "An old training clip surfaced with a claim attached, Cadet. Let's see if it holds up.",
    scan: "Four signals, five trait cards. Instinct and training can look alike — read closely.",
    sort: "Sorted. Notice Signal D — instinct isn't the same as training, even though neither one is taught the same way twice.",
    verdict: "Four signals, four verdicts, all locked to your sort. Time to write the full report.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
  },
};
