// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.5B, creating a
// budget.

export const SERVER_CASE = {
  standard: "SS.3.5B-SC",
  title: "Maya's $40",
  stemMode: "dropdown",
  modelAnswer:
    "\"Maya's budget sets aside money for saving\" is TRUE because $10 is saved toward a bike helmet. \"Maya's budget includes money to donate\" is TRUE because $5 is planned for the animal shelter. \"Maya's budget is only a wish list\" is FALSE because her four categories add up to exactly her $40.",
  mustInclude: [
    "Signal A (savings for a helmet) marked True.",
    "Signal B (donation to the shelter) marked True.",
    "Signal C (budget is just a wish list) marked False.",
    "Evidence picks name the savings category and Maya's helmet note for Signal A.",
    "Evidence picks name the worksheet total and category sum for Signal C.",
  ],
};
