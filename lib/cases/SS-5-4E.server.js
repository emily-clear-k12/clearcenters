// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.4E, TEKS 5.4E).

export const SERVER_CASE = {
  standard: "SS.5.4E",
  title: "Freedom: Case Closed?",
  bigQuestion: "Did the end of the Civil War settle freedom and citizenship with one change, or did Reconstruction and the 13th, 14th, and 15th Amendments create several major changes?",
  evidenceBank: [
    "The 13th Amendment abolished slavery",
    "Reconstruction addressed rebuilding and rights after the war",
    "Later amendments addressed citizenship and voting rights"
  ],
  trapLine: "The 13th Amendment ended slavery, so that basically finished the job. Reconstruction and the other amendments were just extra cleanup afterward.",
  castNames: {
    leo: "Leo Grant",
    aisha: "Aisha Green",
    marcus: "Marcus Lee",
    sofia: "Sofia Ramirez",
    ellis: "Dr. Jordan Ellis"
  },
  distractors: "Treating the three amendments as interchangeable; saying the 13th Amendment created voting rights; saying the 14th Amendment abolished slavery; saying the 15th Amendment ended slavery; treating Reconstruction as only repairing buildings; claiming constitutional amendments instantly removed every barrier to equality or voting.",
  mustInclude: [
    "Explains the 13th Amendment as the abolition of slavery.",
    "Explains the 14th Amendment in terms of citizenship or equal protection.",
    "Explains the 15th Amendment as a voting-rights protection.",
    "Connects the amendments to Reconstruction as a broader postwar rebuilding and rights process.",
    "Explains why the 13th Amendment alone does not capture all the major postwar changes."
  ],
};
