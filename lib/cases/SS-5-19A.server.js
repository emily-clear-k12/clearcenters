// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.19A, TEKS 5.19A).

export const SERVER_CASE = {
  standard: "SS.5.19A",
  title: "Can They Actually Do That?",
  bigQuestion: "How can you decide which fundamental right in the Bill of Rights applies to a situation?",
  evidenceBank: [
    "A city official refuses to accept a peaceful youth petition asking for a park change.",
    "A person accused of a crime is told to face the court without an attorney.",
    "The Bill of Rights names specific freedoms and legal protections."
  ],
  trapLine: "If something is unfair, the Bill of Rights should stop it. Case closed.",
  castNames: {
    max: "Max Maybe",
    speech: "Sasha Speech & Press",
    assembly: "Ari Assembly",
    trial: "Tessa Trial",
    rule: "Riley Rights Desk"
  },
  distractors: "Calling every unfair situation unconstitutional; naming a right without connecting it to the facts; confusing speech with petition; missing the right to an attorney; listing rights without explaining them.",
  mustInclude: [
    "Connects Letter A to assembly or petition.",
    "Connects Letter B to the right to an attorney.",
    "Explains that Bill of Rights protections are specific.",
    "Connects facts to the right, not just a label.",
    "Describes more than one Bill of Rights freedom or protection."
  ],
};
