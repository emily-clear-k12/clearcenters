// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.15A, TEKS 5.15A).

export const SERVER_CASE = {
  standard: "SS.5.15A",
  title: "Everybody Wants the Gavel",
  bigQuestion: "What is the basic job of each branch of the federal government, and why can no one branch simply do all three jobs?",
  evidenceBank: [
    "Congress belongs to the legislative branch",
    "The president leads the executive branch",
    "Federal courts belong to the judicial branch"
  ],
  trapLine: "The president is the leader, so the executive branch basically makes the laws and decides what they mean too.",
  castNames: {
    ava: "Ava Brooks",
    leg: "Lena Legislative",
    exec: "Evan Executive",
    jud: "Jordan Judicial",
    guide: "Mr. Torres"
  },
  distractors: "Saying the president makes federal laws alone; saying courts enforce laws; saying Congress interprets laws; confusing basic functions with checks and balances; listing branch names without functions.",
  mustInclude: [
    "Correctly connects the legislative branch/Congress to making laws.",
    "Correctly connects the executive branch/president to carrying out or enforcing laws.",
    "Correctly connects the judicial branch/courts to interpreting laws.",
    "Distinguishes the three functions instead of mixing them together.",
    "Rejects the idea that the president or executive branch performs all three basic jobs."
  ],
};
