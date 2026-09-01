// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.3C, human impact on
// landscapes.

export const SERVER_CASE = {
  standard: "SS.3.3C-SC",
  title: "Who Changed Miller's Creek?",
  stemMode: "dropdown",
  modelAnswer:
    "\"A flood widened Miller's Creek's bank\" is TRUE, matching the flood photo and last year's survey. \"The new road was carved out by a landslide\" is FALSE because construction crews graded it over three weeks. \"Everything that changed this year was caused by nature\" is MISLEADING because the flood was natural, but the road and the parking lot were both caused by construction.",
  mustInclude: [
    "Signal A (flood widened the creek bank) marked True.",
    "Signal B (road caused by a landslide) marked False.",
    "Signal C (every change was natural) marked Misleading.",
    "Evidence picks name the road photo and construction log for Signal B.",
    "Evidence picks name the parking lot photo and change log for Signal C.",
  ],
};
