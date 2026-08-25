// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.12D, fossils.

export const SERVER_CASE = {
  standard: "3.12D-SC",
  title: "Carved, or Always There?",
  stemMode: "dropdown",
  modelAnswer:
    "\"The shape matches a real shell\" is TRUE because it lines up with a real shell's ridges and size. \"It's found inside solid rock, not somewhere reachable to carve\" is TRUE because it's embedded deep in a rock layer with no tool marks. \"A person must have carved it\" is FALSE because shells naturally get pressed into mud that hardens into rock over a very long time, and similar shapes turn up in the same rock layer.",
  mustInclude: [
    "Signal A (shape matches a shell) marked True.",
    "Signal B (found inside solid rock, not carveable) marked True.",
    "Signal C (a person must have carved it) marked False.",
    "Evidence picks name the shell comparison for Signal A.",
    "Evidence picks name the rock layer/no tool marks for Signal B.",
  ],
};
