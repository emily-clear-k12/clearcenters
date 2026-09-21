// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Math Group Chat — MA.5.5. TEKS 5.5 — classify two-dimensional figures in a hierarchy of sets and subsets using graphic organizers based on their attributes and properties.

export const SERVER_CASE = {
  standard: "MA.5.5",
  title: "Not a Rectangle",
  bigQuestion: "Squire is a square. Does he also belong with the rectangles?",
  evidenceBank: [
    "A rectangle has four right angles and opposite sides that are parallel and equal",
    "Squire has four right angles and opposite sides that are parallel and equal",
    "A rhombus has four equal sides, and Squire has four equal sides",
    "Venna puts Squire where the rectangle and rhombus groups overlap",
    "A shape belongs to every group whose rules it meets"
  ],
  trapLine: "Squire can't be a rectangle. He's a square. He has his own name.",
  castNames: {
    cam: "Cam",
    squire: "Squire",
    recta: "Recta",
    rhonda: "Rhonda",
    venna: "Venna",
    bell: "Ms. Bell"
  },
  distractors: "Thinking a shape can only belong to one group; thinking a special name means a shape is not also a member of the bigger group; mixing up 'all squares are rectangles' with 'all rectangles are squares'; sorting by how a shape looks instead of by its attributes.",
  mustInclude: [
    "It says a square is a rectangle.",
    "It checks the square against the rectangle's attributes: four right angles and opposite sides parallel and equal.",
    "It says a square is also a rhombus because it has four equal sides.",
    "It uses Venna's sets-inside-sets placement.",
    "It gives Cam a rule: a shape belongs to every group whose attributes it has."
  ],
};
