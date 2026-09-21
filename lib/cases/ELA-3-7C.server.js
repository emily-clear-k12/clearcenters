// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// ELAR Group Chat — ELA.3.7C. TEKS 3.7C — use text evidence to support an appropriate response.

export const SERVER_CASE = {
  standard: "ELA.3.7C",
  title: "My Cousin Did That",
  bigQuestion: "Why did Rosa give her kite to her little brother?",
  evidenceBank: [
    "Rosa loved flying her red kite all morning",
    "Her brother's kite got caught in the oak tree and was torn into strips",
    "Rosa said, 'You need it more than me'",
    "Rosa was smiling at the end of the poem",
    "Your own life can remind you of a text, but your answer has to come from the text"
  ],
  trapLine: "She gave it away because she got bored of it. My cousin does that with EVERYTHING.",
  castNames: {
    kai: "Kai",
    rosa: "Rosa",
    stanza: "Stanza Three",
    oak: "Old Oak",
    luis: "Grandpa Luis"
  },
  distractors: "Answering from personal experience instead of the text; guessing a reason the text never gives; ignoring the turning point in the middle of the poem; thinking any connection counts as evidence.",
  mustInclude: [
    "It says Rosa gave her kite away because her brother's kite was ruined.",
    "It uses that the brother's kite was caught and torn in the oak tree.",
    "It uses Rosa's words, 'You need it more than me.'",
    "It uses that Rosa was happy flying her kite and smiling at the end, so she was not bored.",
    "It explains that the answer must come from the poem, not from Kai's cousin."
  ],
};
