// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// ELAR Group Chat — ELA.3.9D. TEKS 3.9D(i) — recognize characteristics and structures of informational text, including the central idea with supporting evidence.

export const SERVER_CASE = {
  standard: "ELA.3.9D",
  title: "The First Sentence Rule",
  bigQuestion: "The article starts with a question about a turtle crying. What is the article really about?",
  evidenceBank: [
    "The first sentence is a question, not an idea",
    "The heading says 'Finding Home'",
    "Paragraph two says mother sea turtles swim back to the beach where they hatched",
    "Paragraph three says scientists think turtles use Earth's magnetic field like a map",
    "The central idea is what most of the details are about"
  ],
  trapLine: "The central idea is always the first sentence. So this article is about turtles crying. Done.",
  castNames: {
    leo: "Leo",
    hooky: "Hooky",
    shelly: "Shelly",
    header: "Header",
    fields: "Ms. Fields"
  },
  distractors: "Thinking the central idea is always the first sentence; picking the most interesting detail as the central idea; choosing an idea that only fits one paragraph; ignoring the heading.",
  mustInclude: [
    "It says the article is mostly about how sea turtles find their way back to the beach where they hatched.",
    "It explains that the first sentence is a question meant to hook the reader.",
    "It uses the heading, 'Finding Home.'",
    "It uses details from more than one paragraph.",
    "It gives a rule: the central idea is what most of the details are about."
  ],
};
