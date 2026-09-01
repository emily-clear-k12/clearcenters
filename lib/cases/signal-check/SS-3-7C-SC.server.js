// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.7C, matching
// services to the right level of government.

export const SERVER_CASE = {
  standard: "SS.3.7C-SC",
  title: "Whose Job Is It?",
  stemMode: "dropdown",
  modelAnswer:
    "\"The city crew patches potholes\" is TRUE, shown by the work order and crew badge. \"The state issues driver's licenses\" is TRUE, shown by the state seal on the paperwork. \"The city could handle mail delivery too\" is FALSE because federal law reserves that job for the U.S. Postal Service.",
  mustInclude: [
    "Signal A (city crew patches potholes) marked True.",
    "Signal B (state issues driver's licenses) marked True.",
    "Signal C (city could handle mail delivery) marked False.",
    "Evidence picks name the work order and city crew badge for Signal A.",
    "Evidence picks name the mail delivery record and postal service rule for Signal C.",
  ],
};
