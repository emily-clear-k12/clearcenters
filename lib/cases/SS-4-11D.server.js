// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.11D, TEKS 4.11D).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.11D",
  title: "The Message That Changed the Market",
  bigQuestion: "How have transportation and communication developments influenced economic activity in Texas?",
  evidenceBank: [
    "Railroads, highways, ports, and air travel can move people and goods faster.",
    "Telephones, radio, internet, and other systems can move information faster.",
    "Faster movement of goods or information can help businesses reach markets, coordinate work, and respond to customers."
  ],
  trapLine: "Transportation changes the economy, but communication mostly just helps people talk.",
  castNames: {
    max: "Max Talk-Only",
    trans: "Tara Transportation",
    comm: "Cody Communication",
    biz: "Bree Business",
    synth: "Nico Network"
  },
  distractors: "",
  mustInclude: [
    "Explains transportation effect.",
    "Explains communication effect.",
    "Explains a business effect.",
    "Compares transportation and communication.",
    "Rejects talk-only reasoning."
  ],
};
