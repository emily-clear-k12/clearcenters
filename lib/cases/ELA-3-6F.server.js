// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// ELAR Group Chat — ELA.3.6F. TEKS 3.6F — make inferences and use evidence to support understanding.

export const SERVER_CASE = {
  standard: "ELA.3.6F",
  title: "The Door Said It",
  bigQuestion: "The story never says Marco is angry. Can we still tell how he feels?",
  evidenceBank: [
    "Marco's team lost the championship game",
    "Marco slammed the door so hard the pictures shook",
    "Marco dropped his backpack in the hall",
    "Marco walked past his mom without answering her",
    "Authors show feelings through what characters do and don't say"
  ],
  trapLine: "You can't say Marco's angry. The story never uses the word 'angry' once. Show me the word.",
  castNames: {
    ben: "Ben",
    harper: "Harper",
    marco: "Marco",
    mom: "Mom",
    slam: "Slam"
  },
  distractors: "Thinking you can only say what the text states in words; guessing a feeling with no clues from the text; using your own feelings instead of the character's actions; believing a character's words ('I'm fine') over their actions.",
  mustInclude: [
    "It says Marco feels angry, upset, or disappointed.",
    "It uses that his team lost the game.",
    "It uses at least two of his actions: slamming the door, dropping his bag, or walking past his mom.",
    "It explains that authors show feelings through actions instead of naming them.",
    "It explains that you can add clues from the text to what you already know."
  ],
};
