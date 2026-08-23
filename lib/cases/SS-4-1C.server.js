// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.1C, TEKS 4.1C).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.1C",
  title: "Where You Live Changes What You Need",
  bigQuestion: "How did different cultural regions of Texas shape the ways American Indian groups lived?",
  evidenceBank: [
    "Coastal resources such as fish and shellfish were available near the Gulf.",
    "Wide grasslands supported large herds of buffalo.",
    "Woodlands and fertile land supported farming and village life."
  ],
  trapLine: "The cultural regions are just map labels. They did not really affect how people lived.",
  castNames: {
    nico: "Nico Map Label",
    gulf: "Gulf Region File",
    plains: "Plains Region File",
    se: "Southeastern Region File",
    link: "Rae Region Link"
  },
  distractors: "",
  mustInclude: [
    "Names or describes multiple regions.",
    "Uses resource or physical evidence.",
    "Connects a resource to a way of life.",
    "Compares two regions.",
    "Rejects the 'just map labels' claim."
  ],
};
