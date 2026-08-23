// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.3D, TEKS 4.3D).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.3D",
  title: "Can a New Republic Survive?",
  bigQuestion: "What made the Republic of Texas successful in some ways but difficult to manage in others?",
  evidenceBank: [
    "The Republic created a constitution and organized a government.",
    "The Republic faced serious debt and financial struggles.",
    "Relations with American Indian groups remained difficult and sometimes violent."
  ],
  trapLine: "Once Texas became independent, most of its major problems were solved.",
  castNames: {
    eddie: "Eddie Easy-Republic",
    gov: "Grace Government File",
    debt: "Dylan Debt Ledger",
    relations: "Rosa Relations File",
    rangers: "Theo Texas Rangers File"
  },
  distractors: "",
  mustInclude: [
    "Explains a government success.",
    "Explains economic struggle.",
    "Explains another challenge.",
    "Shows both success and difficulty.",
    "Rejects the 'independence solved everything' claim."
  ],
};
