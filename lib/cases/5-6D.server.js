// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.6D",
  title: "The Flat Soccer Ball Claim",
  bigQuestion: "Was the soccer ball ever really \"empty,\" or was something inside it all along?",
  evidenceBank: [
    "Fully inflated soccer ball mass: 430 g",
    "Fully deflated soccer ball mass: 425 g (slightly less once air is gone)",
    "Pressure gauge reads high when inflated, near zero when flat",
    "The ball holds its round shape only when \"full\" \u2014 something inside must be pushing outward"
  ],
  trapLine: "I was always empty anyway, nothing was ever really inside me.",
  castNames: {
    sparky: "Sparky the Soccer Ball",
    cole: "Cole the Captain",
    presley: "Presley the Pressure Gauge",
    sammy: "Sammy the Scale",
    coach: "Coach Ramirez"
  },
  distractors: "Thinking particles could be seen with a strong enough magnifying glass or microscope at this grade level, rather than understanding they are fundamentally too small for ordinary observation.",
  mustInclude: [
    "Uses the mass comparison (inflated vs. deflated) as evidence",
    "Uses the pressure evidence",
    "States that air is matter made of tiny particles",
    "Rejects the \"nothing/empty\" claim",
    "Connects to the particle model of matter"
  ],
};
