// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.9E, voting for group
// decisions.

export const SERVER_CASE = {
  standard: "SS.3.9E-SC",
  title: "The Field Trip Vote",
  stemMode: "dropdown",
  modelAnswer:
    "\"The Museum got the most votes, 15 out of 25\" is TRUE, matching the ballot count. \"The Aquarium should win because it cheered loudest\" is FALSE because only 2 students actually voted for it. \"The fair result comes from the counted tally\" is TRUE because Room 12's rule and the recount both confirm the Museum won.",
  mustInclude: [
    "Signal A (Museum got the most votes) marked True.",
    "Signal B (loudest group should win) marked False.",
    "Signal C (tally decides, not noise) marked True.",
    "Evidence picks name the ballot count and class roster for Signal A.",
    "Evidence picks name the classroom rule and recount for Signal C.",
  ],
};
