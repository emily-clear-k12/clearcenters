// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.11C, physical properties
// of rocks that allow natural resources to be stored within them.

export const SERVER_CASE = {
  standard: "4.11C-SC",
  title: "Can Rock Really Hold Water Underground?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the sandstone soaked up water while the granite did not.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the sandstone's close-up showed gaps between grains while granite did not.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States rock is not always solid all the way through with no room to store anything.",
        "Explains that porous rock like sandstone has tiny connected gaps that can hold liquids.",
      ],
    },
  },
};
