// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.13A covers how external
// structures of organisms help them survive and function in their
// environment. Freshly framed for Signal Check — NOT a reworded version of
// the Group Chat "3.13A" trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.13A-SC",
  teksLabel: "3.13A",
  grade: 3,
  subject: "Science",
  title: "Wrong Legs for the Job?",
  tagline: "The mole's short, stubby claws are just worse legs than the rabbit's long ones.",
  transmission: {
    claimHeadline: "The mole's short, stubby claws are just worse legs than the rabbit's long ones.",
    source: "Backyard Burrow Study",
    loggedAt: "Observation Log",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The mole's wide claws dug through a foot of loose soil in under a minute.",
      correctVerdict: "True",
      reasonText: "The dig timer and the claw close-up both show it. The mole's wide, shovel-like claws dug 12 inches of soil in 45 seconds.",
      stemEvidenceIds: ["dig_time", "claw_shape"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The rabbit could not dig at all in the same time with its long, thin legs.",
      correctVerdict: "True",
      reasonText: "The rabbit only loosened the top inch in a full minute. Its legs are long and thin. They are not built for digging.",
      stemEvidenceIds: ["rabbit_dig_attempt", "rabbit_leg_shape"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The mole's claws are simply worse legs than the rabbit's.",
      correctVerdict: "False",
      reasonText: "The same rabbit used its long legs to outrun a fox. Digging and running are different jobs. Each animal's body fits its own job.",
      stemEvidenceIds: ["rabbit_run_speed", "structure_note"],
    },
  ],

  evidenceReadings: [
    { id: "dig_time", label: "Digging timer", reading: "The mole dug through 12 inches of loose soil in 45 seconds with its wide claws.", kind: "data" },
    { id: "claw_shape", label: "Claw close-up", reading: "The mole's front claws are wide and flat. They point out like small shovels.", kind: "data" },
    { id: "rabbit_dig_attempt", label: "Rabbit digging attempt", reading: "The rabbit scratched at the same soil for a full minute. It only loosened the top inch.", kind: "data" },
    { id: "rabbit_leg_shape", label: "Rabbit leg close-up", reading: "The rabbit's back legs are long and thin. They are built to push off the ground fast.", kind: "data" },
    { id: "rabbit_run_speed", label: "Rabbit running log", reading: "The same rabbit outran a fox across an open field with those long legs.", kind: "data" },
    { id: "structure_note", label: "Naturalist's note", reading: "Digging and running are different jobs. Each animal's legs are shaped to do its own job well.", kind: "data" },
    { id: "fur_color", label: "Fur color note", reading: "The mole's fur looked a little darker after the rain.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["dig_time", "claw_shape"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["rabbit_dig_attempt", "rabbit_leg_shape"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["rabbit_run_speed", "structure_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["fur_color"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Three verdicts filed. Give the report one more look before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention how fast the mole dug using its claws?",
    "Did I mention what happened when the rabbit tried to dig?",
    "Did I explain what the rabbit's long legs are actually good for?",
    "Did I avoid saying the mole's claws are just worse legs?",
  ],
};
