// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.8A, forms of energy.

export const SERVER_CASE = {
  standard: "3.8A-SC",
  title: "Does It Need a Plug?",
  stemMode: "dropdown",
  modelAnswer:
    "\"The light works every night with no cord\" is TRUE because the log shows 5 nights of automatic light with no cord attached. \"The light stops when covered\" is TRUE because it stopped by day 4 and worked again once uncovered. \"Only plugged-in things have energy\" is FALSE because batteries also store energy with no cord at all.",
  mustInclude: [
    "Signal A (light works with no cord) marked True.",
    "Signal B (light stops when panel covered) marked True.",
    "Signal C (only plugged-in things have energy) marked False.",
    "Evidence picks name the night log and cord check for Signal A.",
    "Evidence picks name the battery note for Signal C.",
  ],
};
