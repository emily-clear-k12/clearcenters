// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// ELAR Group Chat — ELA.4.10A. TEKS 4.10A — explain the author's purpose and message within a text.

export const SERVER_CASE = {
  standard: "ELA.4.10A",
  title: "It Was Just a Joke",
  bigQuestion: "Dr. Woof's column is full of jokes. So why did he really write it?",
  evidenceBank: [
    "The column ends by telling readers to 'grab that leash'",
    "The fact box gives real information about how much exercise dogs need",
    "The fact box says dogs without enough exercise are more likely to chew, bark, and dig",
    "The jokes come first, and the request comes at the end",
    "An author can use humor to keep readers reading until the main point"
  ],
  trapLine: "This is hilarious. Dr. Woof just wanted to make us laugh — that's his whole purpose.",
  castNames: {
    ava: "Ava",
    woof: "Dr. Woof",
    fax: "Fax",
    leash: "Leash Line",
    reyes: "Mr. Reyes"
  },
  distractors: "Deciding the purpose from the tone or the first thing noticed; thinking a text can only use one kind of writing; ignoring the ending where the author asks the reader to act; treating the fact box as decoration instead of support for the author's point.",
  mustInclude: [
    "It says Dr. Woof's main purpose is to persuade readers to walk or exercise their dogs.",
    "It uses the last line, 'grab that leash.'",
    "It uses information from the fact box.",
    "It explains that the jokes keep readers reading or make the message fun.",
    "It gives Mr. Reyes a rule: look at what the author wants you to think or do by the end."
  ],
};
