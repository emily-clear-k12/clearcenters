// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.6C, costs, prices,
// and profit.

export const SERVER_CASE = {
  standard: "SS.3.6C-SC",
  title: "The Bake Sale Sold Out",
  stemMode: "dropdown",
  modelAnswer:
    "\"The bake sale sold every cupcake\" is TRUE, matching the end-of-day log. \"Selling every cupcake means the bake sale made money\" is FALSE because total revenue ($40) was less than total cost ($60). \"Each cupcake cost more to make than it sold for\" is TRUE — $1.50 to make versus $1.00 to sell.",
  mustInclude: [
    "Signal A (sold every cupcake) marked True.",
    "Signal B (selling out means profit) marked False.",
    "Signal C (each cupcake lost money) marked True.",
    "Evidence picks name total revenue and total cost for Signal B.",
    "Evidence picks name the ingredient receipt and price sign for Signal C.",
  ],
};
