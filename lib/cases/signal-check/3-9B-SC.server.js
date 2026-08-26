// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.9B, planet distances.

export const SERVER_CASE = {
  standard: "3.9B-SC",
  title: "Who Goes First?",
  stemMode: "dropdown",
  modelAnswer:
    "\"Mercury is small and closest\" is TRUE because it's one of the smallest planets and measures closest to the sun. \"Jupiter is large and far out\" is TRUE because it's the largest planet and measures fifth from the sun. \"Size decides distance from the sun\" is FALSE because the model used actual orbit distance data, unrelated to size.",
  mustInclude: [
    "Signal A (Mercury small and closest) marked True.",
    "Signal B (Jupiter large and far out) marked True.",
    "Signal C (size decides distance) marked False.",
    "Evidence picks name Mercury's size and distance data for Signal A.",
    "Evidence picks name Jupiter's size and distance data for Signal B.",
  ],
};
