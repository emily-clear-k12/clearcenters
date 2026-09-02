// Mission Map — "Matter Mystery Lockbox" — Grade 5 Science.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **5.6A — Physical Properties of Matter.** "Compare and contrast matter
// based on measurable, testable, or observable physical properties,
// including mass, magnetism, relative density, physical state, volume,
// solubility, and thermal/electrical conductivity." Direct fit — the
// library's own gate order (property data, magnetism/conductivity
// evidence, a looks-like trap, matching material to purpose) already walks
// through several of these named properties.
//
// Uses the new "quickScan" checkpoint type at cp2 — a single fast
// magnetism read, deliberately lighter than the surrounding property tests,
// as a pacing beat.

export const PUBLIC_CASE = {
  standard: "5.3-MM",
  teksLabel:
    "TEKS 5.6A — Physical Properties of Matter (Texas Grade 5 Science; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "Science",
  title: "Matter Mystery Lockbox",
  tagline: "A mystery material is locked in a box. Only its actual properties will unlock what it really is.",

  mission: {
    briefText:
      "A sealed lockbox holds a sample of an unidentified material. The label is missing, and the material's shiny surface makes everyone assume it's a metal — but assumptions won't open this box. Test its real properties, one at a time, before deciding what it actually is.",
    goal: "Identify a material using measurable, testable physical properties instead of appearance alone.",
  },

  mapImage: "/mission-map/5-3-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Test 1: The sample was placed in water. What does that tell you?",
      evidence: {
        type: "data",
        label: "TEST 1 — DENSITY CHECK",
        text: "The sample floats on top of the water instead of sinking.",
      },
      choices: [
        { id: "a", text: "The sample has a lower density than water" },
        { id: "b", text: "Floating tells you nothing about density" },
        { id: "c", text: "The sample must be denser than water since it's shiny" },
        { id: "d", text: "Floating only happens to materials that are metal" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The sample floats, meaning it has a lower relative density than water.",
    },
    {
      id: "cp2",
      order: 2,
      type: "quickScan",
      position: { x: 26, y: 40 },
      prompt: "Test 2: Quick check — does a magnet attract it?",
      evidence: {
        type: "data",
        label: "QUICK TEST",
        text: "A magnet held right against the sample doesn't pull it at all.",
      },
      choices: [
        { id: "a", text: "No — this sample isn't magnetic" },
        { id: "b", text: "Yes — it's clearly magnetic" },
        { id: "c", text: "Magnets don't work on any solid material" },
        { id: "d", text: "The test doesn't count unless it's shiny" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Quick test confirmed: the sample is not magnetic.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Test 3: The sample was briefly touched to a warm surface. What happened?",
      evidence: {
        type: "data",
        label: "TEST 3 — CONDUCTIVITY CHECK",
        text: "The sample warmed up very slowly, staying cool to the touch for much longer than a typical metal would.",
      },
      choices: [
        { id: "a", text: "The sample conducts heat poorly, unlike most metals" },
        { id: "b", text: "The sample conducts heat extremely well, just like metal" },
        { id: "c", text: "Heat conduction can't be tested this way" },
        { id: "d", text: "This test proves the sample is magnetic" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The sample is a poor heat conductor — it stayed cool much longer than a typical metal would.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Test 4: The sample looks shiny, just like a piece of metal. Does that settle it?",
      evidence: {
        type: "passage",
        text: "\"It's shiny, so it has to be metal.\"",
      },
      choices: [
        { id: "a", text: "No — appearance alone doesn't identify a material; it isn't magnetic, floats, and conducts heat poorly, unlike most metals" },
        { id: "b", text: "Yes — shiny objects are always metal" },
        { id: "c", text: "The other three tests don't matter if the sample looks like metal" },
        { id: "d", text: "There's no way to know what the sample is without seeing it under a microscope" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Appearance alone isn't identification — the sample's actual tested properties (floats, not magnetic, poor heat conductor) don't match typical metal.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Test 5: Based on its properties, which everyday object could this material be used for?",
      evidence: {
        type: "passage",
        text: "A material that floats, isn't magnetic, and conducts heat poorly would stay cool and light — useful for something someone needs to hold safely near heat.",
      },
      choices: [
        { id: "a", text: "A pot handle — something that needs to stay cool to the touch even near heat" },
        { id: "b", text: "A frying pan surface that needs to conduct heat quickly" },
        { id: "c", text: "A compass needle that needs to respond to magnets" },
        { id: "d", text: "A boat anchor that needs to sink" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A material that stays cool (poor heat conductor) fits a pot handle better than a frying pan surface or an anchor.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Test 6: How should the lockbox's material actually be identified?",
      evidence: {
        type: "passage",
        text: "Every test result — density, magnetism, and heat conductivity — has been logged and points the same direction.",
      },
      choices: [
        { id: "a", text: "By its measured, tested properties — not by how it looks" },
        { id: "b", text: "By guessing based on appearance alone" },
        { id: "c", text: "By whichever property is tested first" },
        { id: "d", text: "There's no reliable way to identify any material" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Materials should be identified by their measured, tested properties, not by appearance alone.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, defend your identification of the lockbox's mystery material. Your answer should: (1) use at least three of the tested properties (density, magnetism, heat conductivity) as evidence, and (2) explain why the shiny appearance alone wasn't enough to identify it.",

  responseStems: [
    "The sample's density test showed ___.",
    "The sample's magnetism and heat conductivity tests showed ___.",
    "The shiny appearance wasn't enough evidence because ___.",
  ],

  selfCheckQuestions: [
    "I used at least three tested properties as evidence, not just appearance.",
    "I explained why looking shiny didn't prove the material was metal.",
    "I used real numbers or descriptions from the case file's tests.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
