// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// ELAR Signal Check — ELA.3.7C-SC. TEKS 3.7C — use text evidence to support an appropriate response.

export const SERVER_CASE = {
  standard: "ELA.3.7C-SC",
  title: "Why Ellie Left",
  stemMode: "dropdown",
  modelAnswer:
    "\"Ellie had already played her piece before she left.\" is TRUE because the story says Ellie played her piece third and took a bow before she left. \"The story shows Ellie was nervous about playing.\" is FALSE because ellie smiled the whole time and never missed a key, and the story never says she was nervous. \"Ellie left so she could get to Grandma's birthday dinner.\" is TRUE because ellie never misses Grandma's birthday dinner, and it started at 6:00 while the recital was still going.",
  mustInclude: [
    "Signal A marked True.",
    "Signal B marked False.",
    "Signal C marked True.",
    "Evidence picks name Her turn or The bow for Signal A.",
    "Evidence picks name How she played or Feelings check for Signal B.",
  ],
  // Per-signal verdicts, so the grade-3 submit route can score the verdicts automatically.
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes Ellie played her piece.",
        "Uses the story.",
      ],
    },
    B: {
      correctVerdict: "False",
      mustInclude: [
        "States the story doesn't show she was nervous.",
        "Uses her smile or steady playing.",
      ],
    },
    C: {
      correctVerdict: "True",
      mustInclude: [
        "Names Grandma's birthday dinner.",
        "Uses the time clue.",
      ],
    },
  },
};
