// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.4A, TEKS 4.4A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.4A",
  title: "The War Ended. Did Texas Change?",
  bigQuestion: "How did the Civil War and Reconstruction change life in Texas?",
  evidenceBank: [
    "The Civil War caused loss, economic disruption, and political change in Texas.",
    "Slavery ended, creating a major change in law and life.",
    "Texas had to rebuild government and society while new laws and political conflicts reshaped the state."
  ],
  trapLine: "The Civil War ended, so Texas quickly went back to the way it was before.",
  castNames: {
    noah: "Noah Back-to-Normal",
    war: "Willa War Impact",
    freedom: "Freddie Freedom File",
    rebuild: "Rina Reconstruction",
    synth: "Cal Change Tracker"
  },
  distractors: "",
  mustInclude: [
    "Explains a Civil War impact.",
    "Explains the end of slavery as a major change.",
    "Explains Reconstruction rebuilding.",
    "Compares before and after.",
    "Rejects the 'back to normal' claim."
  ],
};
