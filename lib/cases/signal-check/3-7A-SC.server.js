// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.7A, gravity and forces.

export const SERVER_CASE = {
  standard: "3.7A-SC",
  title: "Does Something Skip Gravity?",
  stemMode: "dropdown",
  modelAnswer:
    "\"The filter touched the floor every time\" is TRUE because the drop log shows 20 out of 20 landings. \"The same filter falls faster crumpled\" is TRUE because 0.6 seconds is much faster than 4.1 seconds. \"Gravity skips light objects\" is FALSE because only the shape changed, not the weight — air resistance, not gravity, is what changed.",
  mustInclude: [
    "Signal A (filter always lands) marked True.",
    "Signal B (crumpled filter falls faster) marked True.",
    "Signal C (gravity skips light objects) marked False.",
    "Evidence picks name the drop test log for Signal A.",
    "Evidence picks name the flat vs. crumpled timing for Signal B.",
  ],
};
