// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.13A).

export const SERVER_CASE = {
  standard: "4.13A",
  title: "The Ugly One in the Window Box",
  bigQuestion: "Sage is the least attractive plant in the box and the only one that survived last August. What are its structures doing?",
  evidenceBank: [
    "Eight of nine plants died last August and Sage lived",
    "Sage lost 3 g of water in 24 hours and Blossom lost 19 g",
    "Sage's roots reach 34 cm down; Blossom's stop at 7 cm",
    "The box gets full south sun and water once a week",
    "The top layer of soil is dry within a day"
  ],
  trapLine: "It contributes nothing. It doesn't even flower. Flowers are the entire point of being a plant.",
  castNames: {
    blossom: "Blossom",
    sage: "Sage",
    leaf: "The Leaf Test",
    root: "The Root Trench",
    aug: "Last August",
    tomas: "Tomás"
  },
  distractors: "Judging a plant's fitness by appearance or by whether it flowers; treating structures as decoration rather than as things that do a job; assuming one plant design is best everywhere rather than suited to particular conditions; naming a structure without saying what it actually does for survival.",
  mustInclude: [
    "The chat says what Sage's leaves do.",
    "It says what Sage's roots do.",
    "It connects the structures to this box's conditions.",
    "It uses last August's count.",
    "It answers Blossom's claim about flowers."
  ],
};
