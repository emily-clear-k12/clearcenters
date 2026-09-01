// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.8A, purposes of the
// Declaration, Constitution, and Bill of Rights.

export const SERVER_CASE = {
  standard: "SS.3.8A-SC",
  title: "The Museum Mixed Up the Labels",
  stemMode: "dropdown",
  modelAnswer:
    "\"One document explains why the colonies wanted independence\" is TRUE — that's the Declaration of Independence, written in 1776. \"Another sets up how the government is organized\" is TRUE — that's the Constitution, written after independence. \"All three documents could share the same label\" is FALSE because each serves a different purpose: independence, organizing government, and protecting freedoms.",
  mustInclude: [
    "Signal A (Declaration explains independence) marked True.",
    "Signal B (Constitution organizes government) marked True.",
    "Signal C (all three share one label) marked False.",
    "Evidence picks name Document 1 and its 1776 curator's note for Signal A.",
    "Evidence picks name Document 3 and the comparison note for Signal C.",
  ],
};
