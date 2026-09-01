// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.6B, scarcity.

export const SERVER_CASE = {
  standard: "SS.3.6B-SC",
  title: "Three Left, Twenty-Five Want One",
  stemMode: "dropdown",
  modelAnswer:
    "\"3 notebooks for 20 kids counts as scarce\" is TRUE because the gap between supply and demand is real even with a few left. \"33 total notebooks means no shortage\" is MISLEADING because that total hides that the specific kind everyone wants is running low. \"Something is only scarce when there's none left\" is FALSE because the waitlist keeps growing while restock is still two weeks away.",
  mustInclude: [
    "Signal A (3 notebooks, 20 kids wanting one) marked True.",
    "Signal B (33 total notebooks means no shortage) marked Misleading.",
    "Signal C (scarce only means zero left) marked False.",
    "Evidence picks name the glittery notebook count and class survey for Signal A.",
    "Evidence picks name the waitlist and restock delay for Signal C.",
  ],
};
