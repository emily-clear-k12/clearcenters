// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.8A, energy transfer.

export const SERVER_CASE = {
  standard: "4.8A-SC",
  title: "Do the Middle Ones Just Quit?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes that removing a middle bell stops the motion from reaching the far end.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes that only the last bell swings out with the full row touching.",
        "Notes the middle bells barely move.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States that the energy isn't skipping the middle bells.",
        "Explains that the motion passes bell to bell through contact.",
      ],
    },
  },
};
