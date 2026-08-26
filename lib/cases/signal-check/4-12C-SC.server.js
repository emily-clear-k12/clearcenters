// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.12C, past environments
// based on fossil evidence, including common Texas fossils.

export const SERVER_CASE = {
  standard: "4.12C-SC",
  title: "Did Someone Just Drop a Seashell up Here?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the shell is embedded inside the rock, not lying loose on top.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes more matching shell fossils were found in the same rock layer.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States no one dropped the shell there.",
        "Explains that the hilltop's rock layer formed underwater long ago when an ancient sea covered the area.",
      ],
    },
  },
};
