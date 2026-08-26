// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.8B covers demonstrating
// that electrical energy in a complete circuit can transform into motion,
// light, sound, and thermal energy, and identifying the requirements for
// a functioning circuit. Freshly framed for Signal Check — NOT a reworded
// version of any Group Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.8B-SC",
  teksLabel: "5.8B",
  grade: 5,
  subject: "Science",
  title: "Does the Switch Even Matter?",
  tagline: "The wires are already connected to the battery, so the little motor should spin no matter what — flipping the switch shouldn't matter.",
  transmission: {
    claimHeadline: "The wires are already connected to the battery, so the little motor should spin no matter what — flipping the switch shouldn't matter.",
    source: "Motor Circuit Test",
    loggedAt: "Trial 1",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "With the switch flipped OFF, the motor doesn't spin at all, even though every wire is still connected to the battery.",
      correctVerdict: "True",
      reasonText: "This shows a connected wire alone isn't enough — the loop still has to be closed.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The instant the switch flips ON, the motor starts spinning right away, and it also feels slightly warm after running a minute.",
      correctVerdict: "True",
      reasonText: "This shows the electrical energy is transforming into both motion and a little bit of thermal energy once the loop closes.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The switch doesn't matter as long as the wires are connected to the battery.",
      correctVerdict: "False",
      reasonText: "Electrical energy only flows through a complete, unbroken loop — a switch is a built-in gap that opens or closes that loop.",
    },
  ],

  evidenceReadings: [
    { id: "switch_off_result", label: "Switch OFF test", reading: "With the switch flipped OFF, the motor doesn't spin at all.", kind: "data" },
    { id: "wire_check_off", label: "Wire check, switch OFF", reading: "Every wire is still physically connected to the battery even while the switch is OFF.", kind: "data" },
    { id: "switch_on_result", label: "Switch ON test", reading: "The instant the switch flips ON, the motor starts spinning right away.", kind: "data" },
    { id: "motor_warm_check", label: "Motor temperature check", reading: "The spinning motor also feels slightly warm to the touch after running a minute.", kind: "data" },
    { id: "circuit_requirement_note", label: "Science note", reading: "Electrical energy only flows through a complete, unbroken loop — a switch is a built-in gap that can open or close that loop.", kind: "data" },
    { id: "transform_note", label: "Science note", reading: "In this circuit, electrical energy transforms into motion energy in the motor, and a little bit of thermal energy too.", kind: "data" },
    { id: "motor_color_note", label: "Motor note", reading: "The little motor is painted bright green.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["switch_off_result", "wire_check_off"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["switch_on_result", "motor_warm_check"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["circuit_requirement_note", "transform_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["motor_color_note"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Three verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all three signals?",
    "Did I compare what happened with the switch OFF versus ON?",
    "Did I mention what forms of energy showed up once the motor was spinning?",
    "Did I explain what a switch actually does in a circuit?",
    "Did I avoid saying the switch doesn't matter as long as the wires are connected?",
  ],
};
