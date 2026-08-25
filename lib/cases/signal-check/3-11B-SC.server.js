// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.11B, renewable resources.

export const SERVER_CASE = {
  standard: "3.11B-SC",
  title: "Does Water Ever Run Low?",
  stemMode: "dropdown",
  modelAnswer:
    "\"The tank level dropped over summer\" is TRUE because it fell from 90% to 55%. \"The tank always refills automatically\" is FALSE because it only rises after real rain, and stayed flat during a dry spell. \"Renewable means it can never run low anywhere\" is MISLEADING because water overall is renewable, but this particular town still ran low during the drought.",
  mustInclude: [
    "Signal A (tank level dropped) marked True.",
    "Signal B (tank always refills automatically) marked False.",
    "Signal C (renewable = never runs low anywhere) marked Misleading.",
    "Evidence picks name the June/August levels for Signal A.",
    "Evidence picks name the refill log for Signal B.",
  ],
};
