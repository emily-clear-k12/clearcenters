// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// ELAR Signal Check — ELA.4.8A-SC. TEKS 4.8A — infer basic themes supported by text evidence.

export const SERVER_CASE = {
  standard: "ELA.4.8A-SC",
  title: "Only One of Them",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Uses Maya's studying.",
        "Uses Maya's win.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Uses Jonah's studying.",
        "Uses Jonah's missed word.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees it fits Maya.",
        "Explains Jonah's ending points to a different theme.",
      ],
    },
  },
};
