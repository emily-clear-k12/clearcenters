// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.2B, meeting
// community needs.

export const SERVER_CASE = {
  standard: "SS.3.2B-SC",
  title: "Fix It the Same Way?",
  stemMode: "dropdown",
  modelAnswer:
    "\"Elm Street got a stoplight because so many cars pass through every hour\" is TRUE because about 400 cars an hour pass during pickup. \"Birch Lane got a crosswalk and stop sign because its traffic is much lighter\" is TRUE because only about 20 cars an hour pass there. \"Birch Lane should have gotten the exact same stoplight as Elm Street\" is FALSE because Birch Lane hasn't had any crossing incidents and a stoplight would cost far more than needed.",
  mustInclude: [
    "Signal A (Elm Street's heavy traffic) marked True.",
    "Signal B (Birch Lane's light traffic) marked True.",
    "Signal C (Birch Lane needs the same stoplight) marked False.",
    "Evidence picks name Elm Street's traffic count and work order for Signal A.",
    "Evidence picks name Birch Lane's safety log and cost estimate for Signal C.",
  ],
};
