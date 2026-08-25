// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.10C, slow surface change.

export const SERVER_CASE = {
  standard: "3.10C-SC",
  title: "Sudden or Slow?",
  stemMode: "dropdown",
  modelAnswer:
    "\"The creek bank has changed shape\" is TRUE because the before-and-after photos show a new curve. \"This kind of change happens overnight\" is FALSE because weekly photos show it growing gradually with no single event. \"Small changes add up over time\" is TRUE because the weekly measurements add up to match the full curve.",
  mustInclude: [
    "Signal A (bank changed shape) marked True.",
    "Signal B (change happened overnight) marked False.",
    "Signal C (small changes add up) marked True.",
    "Evidence picks name the before/after photos for Signal A.",
    "Evidence picks name the weekly log for Signal B.",
  ],
};
