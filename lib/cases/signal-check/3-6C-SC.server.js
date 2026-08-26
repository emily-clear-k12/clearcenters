// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.6C, condensation.

export const SERVER_CASE = {
  standard: "3.6C-SC",
  title: "Leaky Can, or Something Else?",
  stemMode: "dropdown",
  modelAnswer:
    "\"The can was sealed and never opened\" is TRUE because the seal and surface checks confirm it. \"The drop color doesn't match the soda color\" is TRUE because the drops are clear and the soda is dark brown. \"The can is leaking\" is FALSE because a warm can stayed dry — the drops are condensation from the air, not leaking soda.",
  mustInclude: [
    "Signal A (can was sealed, never opened) marked True.",
    "Signal B (drop color doesn't match soda color) marked True.",
    "Signal C (can is leaking) marked False.",
    "Evidence picks name the seal/surface checks for Signal A.",
    "Evidence picks name the warm can comparison or cooling note for Signal C.",
  ],
};
