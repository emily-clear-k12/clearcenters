// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.17A, TEKS 5.17A).

export const SERVER_CASE = {
  standard: "SS.5.17A",
  title: "Why Bother?",
  bigQuestion: "Why do individuals have a duty to participate in civic affairs even when one person cannot control the outcome?",
  evidenceBank: [
    "Citizens can attend local meetings, volunteer, join community efforts, and contact local leaders.",
    "Citizens can communicate with state leaders and participate in state elections and civic issues.",
    "Citizens can vote, contact national leaders, and stay informed about national issues."
  ],
  trapLine: "Why bother participating? One person cannot change anything anyway.",
  castNames: {
    jay: "Jay Nolan",
    local: "Lena Local",
    state: "Sam State",
    national: "Nia National",
    coach: "Coach Civic"
  },
  distractors: "Claiming every civic action changes a law; reducing participation to voting only; saying children have no civic role; confusing participation with guaranteed success; naming actions without explaining why they matter.",
  mustInclude: [
    "Names at least two civic participation methods.",
    "Includes more than one level of government.",
    "Explains participation does not guarantee winning.",
    "Connects individual and collective action.",
    "Explains why participation matters in democracy."
  ],
};
