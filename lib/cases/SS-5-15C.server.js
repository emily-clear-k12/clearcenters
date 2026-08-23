// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.15C, TEKS 5.15C).

export const SERVER_CASE = {
  standard: "SS.5.15C",
  title: "Whose Job Is This Anyway?",
  bigQuestion: "How does federalism divide responsibilities between national and state governments, and how can we decide which level should handle a problem?",
  evidenceBank: [
    "The national government handles national defense, currency, and relations with other countries.",
    "State governments manage many state laws and services such as public education and state transportation systems.",
    "Some responsibilities, such as taxation and public safety, can involve more than one level."
  ],
  trapLine: "If a problem is important, it must be the national government’s job.",
  castNames: {
    max: "Max Mayor",
    state: "Sasha State",
    national: "Nico National",
    shared: "Shay Shared",
    reporter: "Riley Reporter"
  },
  distractors: "Saying states are countries; saying only the national government can tax; treating responsibilities as perfectly separate; listing examples without naming federalism; assuming importance determines level.",
  mustInclude: [
    "Identifies a state responsibility.",
    "Identifies a national responsibility.",
    "Explains federalism as divided power.",
    "Recognizes at least one overlapping responsibility.",
    "Rejects “important = national.”"
  ],
};
