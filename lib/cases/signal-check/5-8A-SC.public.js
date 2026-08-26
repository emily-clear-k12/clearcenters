// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.8A covers investigating
// and describing how energy transforms within systems, such as chemical
// energy in a flashlight battery changing to electrical energy and then
// to light energy. Freshly framed for Signal Check — NOT a reworded
// version of any Group Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.8A-SC",
  teksLabel: "5.8A",
  grade: 5,
  subject: "Science",
  title: "Does the Flashlight Make Energy From Nothing?",
  tagline: "The flashlight just makes brand-new light energy out of nothing the moment you switch it on.",
  transmission: {
    claimHeadline: "The flashlight just makes brand-new light energy out of nothing the moment you switch it on.",
    source: "Flashlight Teardown Log",
    loggedAt: "Trial 1",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A fresh battery's stored chemical energy reads high on the tester, and a battery that's been used in the flashlight for hours reads much lower.",
      correctVerdict: "True",
      reasonText: "The battery's energy dropping as the flashlight runs shows the light is coming from somewhere, not from nothing.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The flashlight bulb also warms up slightly while it's lit, showing up as thermal energy too, not just light.",
      correctVerdict: "True",
      reasonText: "Some of the battery's energy is becoming heat as well as light — more evidence of a transformation, not creation from nothing.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The flashlight makes new light energy out of nothing.",
      correctVerdict: "False",
      reasonText: "The flashlight transforms the battery's chemical energy into light and thermal energy — it doesn't create energy from nothing.",
    },
  ],

  evidenceReadings: [
    { id: "fresh_battery_reading", label: "Fresh battery reading", reading: "A brand-new battery's stored chemical energy reads high on the tester.", kind: "data" },
    { id: "used_battery_reading", label: "Used battery reading", reading: "The same battery, after powering the flashlight for hours, reads much lower on the tester.", kind: "data" },
    { id: "bulb_temp_before", label: "Bulb temperature, at switch-on", reading: "The flashlight bulb feels room-temperature right when it's switched on.", kind: "data" },
    { id: "bulb_temp_after", label: "Bulb temperature, after minutes lit", reading: "The same bulb feels noticeably warm after staying lit for several minutes.", kind: "data" },
    { id: "energy_transform_note", label: "Science note", reading: "Energy doesn't appear from nothing — the flashlight transforms the battery's chemical energy into light and thermal energy.", kind: "data" },
    { id: "conservation_energy_note", label: "Science note", reading: "The total energy leaving the system, as light and heat, came from the energy stored in the battery.", kind: "data" },
    { id: "flashlight_color_note", label: "Flashlight note", reading: "The flashlight's plastic case is black.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["fresh_battery_reading", "used_battery_reading"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["bulb_temp_before", "bulb_temp_after"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["energy_transform_note", "conservation_energy_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["flashlight_color_note"] },
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
    "Did I compare the fresh battery's reading to the used battery's reading?",
    "Did I mention what happened to the bulb's temperature over time?",
    "Did I explain where the flashlight's light energy actually comes from?",
    "Did I avoid saying the flashlight makes energy out of nothing?",
  ],
};
