// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.4F, TEKS 5.4F).

export const SERVER_CASE = {
  standard: "SS.5.4F",
  title: "Opportunity for Who?",
  bigQuestion: "Did westward settlement and the Transcontinental Railroad create the same kind of opportunity for everyone, or did different American Indian and immigrant groups face different challenges, opportunities, and roles?",
  evidenceBank: [
    "Immigrant labor helped build the Transcontinental Railroad",
    "Westward settlement created new opportunities for some settlers",
    "Railroads and settlement also created major challenges for American Indian nations"
  ],
  trapLine: "The railroad and frontier were opportunities for everyone. More land, more jobs, more travel — everybody benefited in basically the same way.",
  castNames: {
    tyler: "Tyler Moore",
    mei: "Mei Chen",
    sean: "Sean O’Donnell",
    naya: "Naya Red Cloud",
    carla: "Carla Vega",
    wright: "Dr. Samuel Wright"
  },
  distractors: "Calling the West “empty” before settlers arrived; treating all American Indian nations as one group; saying every immigrant worked on the railroad; describing Chinese or Irish workers only as victims and ignoring their contributions; saying railroads benefited everyone equally; overcorrecting by saying nobody gained opportunities from westward settlement.",
  mustInclude: [
    "Explains a specific immigrant group’s contribution or opportunity connected to the railroad.",
    "Explains a challenge faced by immigrant railroad workers.",
    "Explains how settlement or railroads created challenges for American Indian nations.",
    "Acknowledges a real opportunity experienced by some settlers or newcomers.",
    "Rejects the idea that westward expansion affected everyone in the same way."
  ],
};
