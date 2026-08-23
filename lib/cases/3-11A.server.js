// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.11A).

export const SERVER_CASE = {
  standard: "3.11A",
  title: "Nothing In This Room Came From Nature",
  bigQuestion: "The chair really was made in a factory. So where did the wood, the steel and the plastic come from?",
  evidenceBank: [
    "The chair back is wood, cut from a tree",
    "The legs are steel, made from iron ore dug out of the ground",
    "The seat is plastic, made from oil",
    "The window is glass, made from sand",
    "The bread is made from wheat grown in a field"
  ],
  trapLine: "I was made in a factory, so I didn't come from nature.",
  castNames: {
    chair: "The Chair",
    tree: "The Tree",
    ore: "Iron Ore",
    oil: "Oil",
    sena: "Sena"
  },
  distractors: "Thinking manufactured objects do not come from natural resources; treating a factory as the origin of a material rather than the place it was shaped; missing that metals and plastics come from the ground; thinking only obviously natural-looking things like wood count.",
  mustInclude: [
    "The chat traces a part back to a resource.",
    "It names at least two different resources.",
    "It answers the Chair about the factory.",
    "It uses something else in the room.",
    "It gives Sena the rule for the whole display."
  ],
};
