// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.20B, TEKS 5.20B).

export const SERVER_CASE = {
  standard: "SS.5.20B",
  title: "The Painting Is Not Just a Picture",
  bigQuestion: "How can art help us understand the time period in which it was created?",
  evidenceBank: [
    "A 1937 painting shows a long line outside a relief office.",
    "Workers with shovels repair a road while families watch from nearby.",
    "The artist said the scene was inspired by people and work projects observed in the city."
  ],
  trapLine: "It is just a painting. Pictures are decoration, not historical evidence.",
  castNames: {
    milo: "Milo Museum",
    lena: "Lena Curator",
    gus: "Gus Great Depression File",
    nora: "Nora Note Card",
    theo: "Theo Source Detective"
  },
  distractors: "Treating art as proof of every historical fact; ignoring context; describing without interpreting; assuming an artist represents everyone; saying art has no historical value.",
  mustInclude: [
    "Uses specific visual or exhibit details.",
    "Connects details to Great Depression-era conditions.",
    "Explains how the art reflects its time period.",
    "States a limit of the artwork as evidence.",
    "Rejects the idea that art is only decoration."
  ],
};
