// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.10A, weather forecasting.

export const SERVER_CASE = {
  standard: "3.10A-SC",
  title: "Just a Guess?",
  stemMode: "dropdown",
  modelAnswer:
    "\"The forecast matched most days\" is TRUE because it matched 4 out of 5 days this week. \"A forecast can be wrong when weather shifts fast\" is TRUE because Friday's fast-moving system wasn't predicted. \"Forecasts are never useful\" is FALSE because they were right most of the week and people still rely on them.",
  mustInclude: [
    "Signal A (forecast matched most days) marked True.",
    "Signal B (forecast can be wrong when weather shifts fast) marked True.",
    "Signal C (forecasts are never useful) marked False.",
    "Evidence picks name the matching days for Signal A.",
    "Evidence picks name the fast-moving system for Signal B.",
  ],
};
