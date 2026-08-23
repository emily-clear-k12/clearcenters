// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.9B).

export const SERVER_CASE = {
  standard: "4.9B",
  title: "Luna Thinks She Is Shrinking",
  bigQuestion: "If the Moon looks like a sliver some nights and whole on others, is she actually changing size?",
  evidenceBank: [
    "The same phase order repeats about every 28 nights",
    "The Sun lights exactly half of Luna at all times",
    "At full moon Luna is the same size she always was",
    "Luna's position relative to Earth changes every night",
    "We see different amounts of the lit half from Earth"
  ],
  trapLine: "I shrink away to almost nothing every month and grow back. It's just my life. You get used to it.",
  castNames: {
    luna: "Luna",
    halo: "Halo",
    beam: "Beam",
    terra: "Terra",
    ari: "Ari",
    devon: "Devon"
  },
  distractors: "Explaining the phases using Earth's shadow, which only reaches the Moon during a lunar eclipse; saying the pattern is random or unpredictable; thinking clouds cover the unlit part; confusing the Moon's monthly orbit with Earth's daily rotation.",
  mustInclude: [
    "The chat uses Ari's 28 nights.",
    "It uses the fact that exactly half is lit.",
    "It tells Luna she isn't shrinking.",
    "It connects the change to Luna's position.",
    "It gives Devon a rule he can predict with."
  ],
};
