// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.9E covers voting for
// group decisions. Stored with an "SS." prefix so this code can never
// collide with a Science case using the same bare TEKS number.
//
// Freshly scripted scenario (a classroom field-trip vote) — not a reworded
// version of Group Chat's SS.3.9E case, per the Signal Check checklist's
// anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.3.9E-SC",
  teksLabel: "3.9E",
  grade: 3,
  subject: "Social Studies",
  title: "The Field Trip Vote",
  tagline: "A vote is fair as long as the loudest group wins.",
  transmission: {
    claimHeadline: "A vote is fair as long as the loudest group wins.",
    source: "Room 12 Class Vote",
    loggedAt: "Field Trip Ballot Count",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-3-9e-sc-field-report.jpg",
    imageCaption: "Room 12 — Field Trip Ballot Count",
    notes: "Room 12 voted on a field trip. The choices were the Zoo, the Museum, or the Aquarium. All 25 students voted. The Zoo got 8 votes. The Museum got 15 votes. The Aquarium got just 2 votes. Right after the count, the Aquarium group cheered the loudest. They asked for a recount. The recount came out the same. Room 12 has a rule on the wall. It says, \"The choice with the most counted votes wins.\"",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The written tally shows the Museum got the most votes, 15 out of 25.",
      correctVerdict: "True",
      reasonText: "The count shows the Museum got 15 votes out of 25. That is more than half.",
      stemEvidenceIds: ["vote_tally", "class_count"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The Aquarium group cheered the loudest, so the Aquarium should win.",
      correctVerdict: "False",
      reasonText: "Only 2 students voted for the Aquarium. Cheering loudly after does not change how many votes it got.",
      stemEvidenceIds: ["cheer_note", "aquarium_actual_votes"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The fair result comes from the counted tally, not from who cheered loudest.",
      correctVerdict: "True",
      reasonText: "Room 12's rule says the most counted votes wins. A recount showed the Museum still had the most. The count decides, not the noise.",
      stemEvidenceIds: ["teacher_rule", "recount_result"],
    },
  ],

  evidenceReadings: [
    { id: "vote_tally", label: "Written ballot count", reading: "Zoo: 8, Museum: 15, Aquarium: 2. Total: 25 votes.", kind: "data" },
    { id: "class_count", label: "Class roster", reading: "Room 12 has 25 students. All 25 voted.", kind: "data" },
    { id: "cheer_note", label: "Teacher's observation", reading: "After the vote, the Aquarium group cheered the loudest and asked for a recount.", kind: "data" },
    { id: "aquarium_actual_votes", label: "Aquarium vote detail", reading: "Only 2 students voted for the Aquarium, even with all the cheering.", kind: "data" },
    { id: "teacher_rule", label: "Classroom voting rule", reading: "Room 12's posted rule: \"The choice with the most counted votes wins.\"", kind: "data" },
    { id: "recount_result", label: "Recount confirmation", reading: "A recount showed the same result. The Museum still had the most votes.", kind: "data" },
    { id: "trip_date", label: "Field trip permission slip", reading: "The trip is scheduled for next Friday.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["vote_tally", "class_count"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["cheer_note", "aquarium_actual_votes"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["teacher_rule", "recount_result"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["trip_date"] },
  ],

  echo: {
    main: "Ballot count just came in, Cadet. Let's see if this claim holds up.",
    scan: "One tally, one loud group — read every record carefully.",
    sort: "Notice how the recount and the rule back up the original tally.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Three verdicts filed. Give the report one more look before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention that the Museum got the most votes in the tally?",
    "Did I mention how many students actually voted for the Aquarium?",
    "Did I mention the classroom rule and the recount?",
    "Did I avoid saying the loudest group should win the vote?",
  ],
};
