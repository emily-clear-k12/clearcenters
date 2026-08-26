// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.8C covers demonstrating
// and explaining that light travels in a straight line and can be
// reflected, refracted, and absorbed. Freshly framed for Signal Check —
// NOT a reworded version of any Group Chat trap line (see
// COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.8C-SC",
  teksLabel: "5.8C",
  grade: 5,
  subject: "Science",
  title: "Did the Straw Really Bend?",
  tagline: "The straw looks bent right where it enters the water — it must have actually bent when it went in.",
  transmission: {
    claimHeadline: "The straw looks bent right where it enters the water — it must have actually bent when it went in.",
    source: "Glass of Water Observation",
    loggedAt: "Trial 1",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Pulling the straw back out of the water shows it's still perfectly straight, and it takes real force to bend it by hand.",
      correctVerdict: "True",
      reasonText: "If the straw had actually bent, it wouldn't come out straight again, and it wouldn't take real force to bend on purpose.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Looking at the same glass from a different angle changes exactly where the 'bend' appears to be.",
      correctVerdict: "True",
      reasonText: "A real physical bend wouldn't move around depending on where you're standing — that's a sign it's about how the light is behaving, not the straw itself.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The straw actually bent when it went into the water.",
      correctVerdict: "False",
      reasonText: "Light refracts, or bends, when it passes from air into water, and that's what makes the straw look bent even though it never physically changed shape.",
    },
  ],

  evidenceReadings: [
    { id: "straw_removed_check", label: "Straw removed check", reading: "Pulling the straw back out of the water shows it is still perfectly straight.", kind: "data" },
    { id: "straw_flex_test", label: "Straw flex test", reading: "Trying to bend the dry straw by hand takes real force — it doesn't bend on its own.", kind: "data" },
    { id: "straw_angle_check", label: "Viewing angle check", reading: "Looking at the same glass from a different angle changes exactly where the bend appears to be.", kind: "data" },
    { id: "reflection_note", label: "Science note", reading: "Light also reflects off the water's surface, which is part of why the straw looks different right at the waterline.", kind: "data" },
    { id: "light_bend_note", label: "Science note", reading: "Light bends, or refracts, when it passes from air into water — that's what makes the straw look bent.", kind: "data" },
    { id: "straight_line_note", label: "Science note", reading: "Light normally travels in a straight line until it hits something that reflects, refracts, or absorbs it.", kind: "data" },
    { id: "straw_color_note", label: "Straw note", reading: "The straw is striped red and white.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["straw_removed_check", "straw_flex_test"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["straw_angle_check", "reflection_note"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["light_bend_note", "straight_line_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["straw_color_note"] },
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
    "Did I mention what the straw looked like once it was pulled back out?",
    "Did I mention how the bend changed depending on the viewing angle?",
    "Did I explain what light actually does when it passes from air into water?",
    "Did I avoid saying the straw actually bent?",
  ],
};
