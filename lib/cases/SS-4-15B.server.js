// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.15B, TEKS 4.15B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.15B",
  title: "Can One Citizen Make a Difference?",
  bigQuestion: "How can individuals voluntarily participate in state and local civic affairs?",
  evidenceBank: [
    "Citizens can write respectful letters to public officials about local or state issues.",
    "People can volunteer in service projects that improve their community.",
    "Citizens can help protect important historic places and respectfully hold officials accountable."
  ],
  trapLine: "If you are not old enough to vote, there is not much you can do to help your community.",
  castNames: {
    max: "Max Wait-to-Vote",
    letter: "Lena Letter Writer",
    service: "Sam Service Project",
    history: "Holly Historic Preservation",
    synth: "Rae Civic Action"
  },
  distractors: "",
  mustInclude: [
    "Uses letter/contact evidence.",
    "Uses service or preservation evidence.",
    "Matches action to issue.",
    "Includes respectful civic participation.",
    "Rejects vote-only reasoning."
  ],
};
