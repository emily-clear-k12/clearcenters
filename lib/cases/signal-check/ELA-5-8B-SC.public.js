// Signal Check — safe to import from client components.
//
// ELAR Signal Check — ELA.5.8B-SC. TEKS 5.8B — analyze the relationships of and conflicts among the characters.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "ELA.5.8B-SC",
  teksLabel: "5.8B",
  grade: 5,
  subject: "ELAR",
  title: "What's Really the Conflict?",
  tagline: "The storm is what the two friends are fighting about.",
  transmission: {
    claimHeadline: "The storm is what the two friends are fighting about.",
    source: "Story: \"Cabin 7\"",
    loggedAt: "Night two",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The storm traps the friends inside the cabin.",
      correctVerdict: "True",
      reasonText: "The counselor says no one can leave during the storm, so Tomas and Luis are stuck inside.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The friends keep arguing about who gets to decide.",
      correctVerdict: "True",
      reasonText: "They argue about cards or a fort, and Luis yells that Tomas always decides everything.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The storm is the main conflict between the friends.",
      correctVerdict: "Misleading",
      reasonText: "The storm sets up the scene, but the friends are really struggling over who gets to decide — something that started last summer.",
    },
  ],

  evidenceReadings: [
    { id: "storm", label: "The storm", reading: "\"Thunder shook the windows, and the counselor said no one could leave the cabin.\"", kind: "data" },
    { id: "stuck", label: "Stuck inside", reading: "\"Tomas and Luis had the whole cabin to themselves until the storm passed.\"", kind: "data" },
    { id: "cards", label: "The argument", reading: "\"Tomas said cards. Luis said fort. They argued for twenty minutes.\"", kind: "data" },
    { id: "yell", label: "Luis's words", reading: "\"'You always decide everything, just because you've been here before!'\"", kind: "data" },
    { id: "history", label: "Last summer", reading: "\"Last summer, Tomas had picked every single game.\"", kind: "data" },
    { id: "conflict_tip", label: "Conflict tip", reading: "A conflict between characters is what they are struggling with each other about.", kind: "data" },
    { id: "door", label: "Cabin door", reading: "The cabin has a green door.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["storm", "stuck"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["cards", "yell"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["history", "conflict_tip"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["door"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Three verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict and reasoning for all three signals?",
    "Did I explain what the storm does in the story?",
    "Did I use what Luis yelled?",
    "Did I name the real conflict between the friends?",
    "Did I use evidence from before the storm, too?",
  ],
};
