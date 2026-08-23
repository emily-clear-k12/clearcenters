// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.9A).

export const SERVER_CASE = {
  standard: "3.9A",
  title: "The Moon Is Tied to the Wrong Thing",
  bigQuestion: "When the class walked the model, the Moon got left eight metres from Earth. What should it be tied to?",
  evidenceBank: [
    "When they walked the model, the Moon got left 8 metres from Earth",
    "The Moon is seen from Earth every month of the year",
    "The Moon stays about the same size in the sky",
    "The Moon is much closer to Earth than to the Sun",
    "Earth hangs on its own string going around the Sun"
  ],
  trapLine: "The Sun makes things bright, so the Moon hangs off the Sun.",
  castNames: {
    jules: "Jules",
    moon: "Moon",
    earth: "Earth",
    sun: "The Sun",
    tam: "Tam"
  },
  distractors: "Thinking the Moon orbits the Sun because the Sun is brighter or more important; thinking the Sun orbits Earth; believing the Moon moves independently rather than travelling with Earth; picking a model layout because it looks right rather than testing what it does.",
  mustInclude: [
    "The chat says what the Moon goes around.",
    "It says what Earth goes around.",
    "It uses the walk-through in the hall.",
    "It uses the Moon log.",
    "It gives Tam the rule to say out loud."
  ],
};
