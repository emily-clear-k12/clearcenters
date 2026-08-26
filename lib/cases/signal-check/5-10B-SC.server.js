// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.10B, the formation
// processes of sedimentary rocks and fossil fuels.

export const SERVER_CASE = {
  standard: "5.10B-SC",
  title: "Can You Really Squish Dirt Into Rock in a Day?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the squished mud jar was still soft the next day.",
        "Uses the day-1-to-day-2 comparison as evidence.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the real rock sample's many layers and long formation time.",
        "Uses the thousands-of-years estimate as evidence.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States mud cannot be squished into rock in a day.",
        "Explains that sedimentary rock forms slowly through burial, pressure, and cementation over a very long time.",
      ],
    },
  },
};
