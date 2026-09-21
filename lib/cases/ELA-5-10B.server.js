// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// ELAR Group Chat — ELA.5.10B. TEKS 5.10B — analyze how the use of text structure contributes to the author's purpose.

export const SERVER_CASE = {
  standard: "ELA.5.10B",
  title: "First, Then, Why?",
  bigQuestion: "The article uses 'first' and 'then.' Is it really a sequence text?",
  evidenceBank: [
    "The title asks 'Why did Lake Mora disappear?'",
    "The article uses 'because,' 'as a result,' and 'so'",
    "Each event in the article causes the next one",
    "Sequence tells when things happen; cause and effect tells why",
    "The author's purpose is to explain why the lake disappeared"
  ],
  trapLine: "It says 'first' and 'then.' So it's a sequence text. Things in order. I already color-coded it.",
  castNames: {
    ruby: "Ruby",
    hank: "Headline Hank",
    because: "Because",
    so: "So",
    dam: "Dam",
    kwan: "Mr. Kwan"
  },
  distractors: "Naming a structure from one or two signal words; thinking any text with 'first' and 'then' is sequence; not connecting the structure to the author's purpose; thinking events in order can't also be cause and effect.",
  mustInclude: [
    "It says the main structure is cause and effect.",
    "It uses the title's question, 'why.'",
    "It uses cause-and-effect signal words such as because, as a result, or so.",
    "It shows how at least one event caused the next.",
    "It explains that the author chose cause and effect because the purpose is to explain why the lake disappeared."
  ],
};
