// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.13B).

export const SERVER_CASE = {
  standard: "3.13B",
  title: "Pick Out the Grubs, Keep the Beetles",
  bigQuestion: "The beetle that came out in May had the same red dot as grub number seven. What does that mean?",
  evidenceBank: [
    "Grub number seven was marked with red nail polish in March",
    "The beetle that came out in May had the same red dot on its back",
    "Nothing else went into that tub",
    "The stages go egg, grub, pupa, then beetle",
    "The bin with grubs removed made a third as much compost"
  ],
  trapLine: "Grubs are pests and beetles are helpful. They're completely different creatures. Get the grubs out.",
  castNames: {
    nan: "Nan",
    grub: "The Grub",
    beetle: "The Beetle",
    radish: "The Radish",
    femi: "Femi"
  },
  distractors: "Thinking the young stage of an animal is a different species from the adult; assuming an animal that looks completely different must be unrelated; missing that a life cycle describes one organism changing over time; not recognising that plants have life cycles too.",
  mustInclude: [
    "The chat uses the red dot.",
    "It says the grub and the beetle are the same animal.",
    "It names the stages in order.",
    "It uses the radish as a second example.",
    "It uses what happened to 3C's bin."
  ],
};
