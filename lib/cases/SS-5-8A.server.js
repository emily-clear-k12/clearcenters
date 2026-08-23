// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.8A, TEKS 5.8A).

export const SERVER_CASE = {
  standard: "SS.5.8A",
  title: "Adapt or Change It?",
  bigQuestion: "When people face an environmental challenge, how do they decide whether to adapt themselves or modify the environment to meet basic needs?",
  evidenceBank: [
    "Wearing lightweight clothing changes how people respond to heat",
    "Building shade structures changes the surroundings",
    "Irrigation moves water to places where people need it"
  ],
  trapLine: "Adapting to the environment and modifying the environment are basically the same thing — either way, people are just dealing with nature.",
  castNames: {
    tessa: "Tessa Monroe",
    omar: "Omar Ruiz",
    lena: "Lena Cho",
    ben: "Ben Alvarez",
    drake: "Dr. Naomi Drake"
  },
  distractors: "Saying adapt and modify mean exactly the same thing; classifying irrigation as only a behavior change; claiming every building is automatically an adaptation with no environmental modification; giving examples without explaining what changed; naming needs without connecting them to a response.",
  mustInclude: [
    "Explains an adaptation as a change in how people live or respond to conditions.",
    "Explains a modification as a physical change people make to the environment.",
    "Clearly distinguishes adaptation from modification.",
    "Connects a response to a basic human need.",
    "Explains why different environmental challenges can lead to different responses."
  ],
};
