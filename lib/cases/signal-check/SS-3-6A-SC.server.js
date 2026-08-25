// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.6A, supply and demand.

export const SERVER_CASE = {
  standard: "SS.3.6A-SC",
  title: "Hot Day, Higher Price",
  stemMode: "dropdown",
  modelAnswer:
    "\"The price goes up on the hottest days\" is TRUE because the price rose from $1 to $2 on the 92°F day and the stand sold out fast. \"A low supply raises the price\" is TRUE because the price rose to $2.50 once only six cups were left, compared to $1 with a full pitcher. \"$100 a cup and people would still buy it\" is FALSE because at that price, nobody bought a single cup.",
  mustInclude: [
    "Signal A (price rises on hot days) marked True.",
    "Signal B (low supply raises the price) marked True.",
    "Signal C ($100/cup claim) marked False.",
    "Evidence picks name the hot-day and cool-day logs for Signal A.",
    "Evidence picks name the low-supply and full-supply logs for Signal B.",
  ],
};
