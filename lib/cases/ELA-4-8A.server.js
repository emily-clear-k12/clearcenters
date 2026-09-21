// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// ELAR Group Chat — ELA.4.8A. TEKS 4.8A — infer basic themes supported by text evidence.

export const SERVER_CASE = {
  standard: "ELA.4.8A",
  title: "The Theme Is Goats",
  bigQuestion: "The fable is about a little goat named Pip. But what is the theme?",
  evidenceBank: [
    "Pip slipped every morning but kept trying",
    "Pip learned which stones were loose and which held firm",
    "The other goats laughed and said some goats are just not climbers",
    "Old Ram says, 'The rock never got lower. You got better.'",
    "A topic is what a story is about; a theme is the lesson it teaches"
  ],
  trapLine: "The theme is goats. Obviously. The whole fable is about a goat.",
  castNames: {
    max: "Max",
    pip: "Pip",
    ram: "Old Ram",
    summit: "Summit",
    rae: "Ms. Rae"
  },
  distractors: "Naming the topic (goats, climbing, rocks) instead of a lesson; stating the theme as one word; retelling what happened instead of what it teaches; choosing the other goats' view as the message of the fable.",
  mustInclude: [
    "It explains that 'goats' is the topic, not the theme.",
    "It states a theme as a sentence, such as that practice and not giving up help you get better.",
    "It uses Pip's repeated tries or Pip learning which stones held firm.",
    "It uses Old Ram's line at the end.",
    "It explains how the theme applies to people, not only to goats."
  ],
};
