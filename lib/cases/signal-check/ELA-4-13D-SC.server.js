// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// ELAR Signal Check — ELA.4.13D-SC. TEKS 4.13D — identify primary and secondary sources. (Rio Pino and its 1932 flood are fictional.)

export const SERVER_CASE = {
  standard: "ELA.4.13D-SC",
  title: "The Storm Diary",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Names who wrote the diary.",
        "Notes she wrote it the night of the flood.",
      ],
    },
    B: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees the book itself is secondary.",
        "Explains the diary inside it is still primary.",
      ],
    },
    C: {
      correctVerdict: "True",
      mustInclude: [
        "Calls the diary a primary source.",
        "Uses the definition.",
      ],
    },
  },
};
