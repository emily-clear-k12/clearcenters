// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.13B, TEKS 5.13B).

export const SERVER_CASE = {
  standard: "SS.5.13B",
  title: "The Meeting Nobody Asked For",
  bigQuestion: "What makes the Mayflower Compact and the Virginia House of Burgesses examples of representative government in the colonies?",
  evidenceBank: [
    "The Mayflower Compact created an agreement for self-government",
    "Virginia colonists elected representatives to the House of Burgesses",
    "The colonies were still under British authority"
  ],
  trapLine: "If Britain still ruled the colonies, colonial meetings and assemblies were not really representative government.",
  castNames: {
    owen: "Owen Pike",
    compact: "Mara Compact",
    burgess: "Elias Burgess",
    limits: "Nora Fields",
    curator: "Ms. Vale"
  },
  distractors: "Calling the Mayflower Compact an elected legislature; saying the House of Burgesses made Virginia independent; claiming Britain had no authority; claiming everyone could vote; listing both examples without explaining the representative feature.",
  mustInclude: [
    "Explains the Mayflower Compact as self-government through an agreement to make laws.",
    "Explains the House of Burgesses as elected representation.",
    "Connects at least one example to the idea of representation or self-government.",
    "Explains that British authority did not erase colonial representative practices.",
    "Recognizes that colonial political participation was limited."
  ],
};
