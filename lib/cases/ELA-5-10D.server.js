// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// ELAR Group Chat — ELA.5.10D. TEKS 5.10D — describe how the author's use of imagery, literal and figurative language such as simile and metaphor, and sound devices achieves specific purposes.

export const SERVER_CASE = {
  standard: "ELA.5.10D",
  title: "The Hallway Was a River",
  bigQuestion: "The poem says the hallway was a river. What does the poet mean?",
  evidenceBank: [
    "The speaker says she was 'carried past every door' she meant to find",
    "The poem says 'I could not stop. I could not turn around.'",
    "Backpacks 'bobbed like boats' around her",
    "Her classroom, Room 12, 'floated away' behind her",
    "A metaphor compares two things to show what one of them is like"
  ],
  trapLine: "That makes no sense. Nobody got wet. Hallways aren't rivers — the poet messed up.",
  castNames: {
    finn: "Finn",
    speaker: "Speaker",
    river: "River",
    leaf: "Leaf",
    oda: "Ms. Oda"
  },
  distractors: "Reading figurative language literally; thinking a metaphor is a mistake or a lie; noticing the comparison without explaining what the two things share; explaining the image without connecting it to the speaker's feeling.",
  mustInclude: [
    "It explains that 'the hallway was a river' is a metaphor, not a mistake.",
    "It explains what the hallway and a river share: a crowd moving one way that carries you along.",
    "It connects the leaf to the speaker being swept along without control.",
    "It uses at least two lines from the poem as evidence.",
    "It explains the purpose: to show how overwhelmed or out of control the speaker felt."
  ],
};
