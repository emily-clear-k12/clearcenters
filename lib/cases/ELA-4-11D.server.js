// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// ELAR Group Chat — ELA.4.11D. TEKS 4.11D(i) — edit drafts using standard English conventions, including complete simple and compound sentences with subject-verb agreement and avoidance of splices, run-ons, and fragments.

export const SERVER_CASE = {
  standard: "ELA.4.11D",
  title: "It's All One Trip",
  bigQuestion: "Sam wrote, \"We got to the lake it started raining we ran to the car.\" Is that one sentence?",
  evidenceBank: [
    "Sam's sentence has three subjects and three verbs: we got, it started, we ran",
    "Lucy got lost and could not tell where one idea ended",
    "Complete thoughts need a period, or a comma plus a joining word like and, but, or so",
    "Sam's next sentence, about the sandwiches, is a correct complete sentence",
    "Being about the same topic does not make ideas one sentence"
  ],
  trapLine: "It's all about the same trip, so it's one sentence. That's how sentences work.",
  castNames: {
    sam: "Sam",
    lucy: "Lucy",
    rudy: "Rudy Rambles",
    period: "Period",
    comma: "Comma",
    andy: "Andy"
  },
  distractors: "Thinking a sentence is defined by its topic or length; fixing a run-on with only a comma, which makes a comma splice; thinking every long sentence is wrong; stringing thoughts together with 'and' with no punctuation at all.",
  mustInclude: [
    "It says Sam's sentence is a run-on with more than one complete thought.",
    "It names the separate thoughts or their subjects and verbs.",
    "It fixes the sentence correctly with periods or with a comma plus a joining word.",
    "It explains that a comma alone is not enough.",
    "It gives Sam a rule: a sentence is built from complete thoughts, not from a topic."
  ],
};
