// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.13A, TEKS 5.13A).

export const SERVER_CASE = {
  standard: "SS.5.13A",
  title: "Who Gets the Final Say?",
  bigQuestion: "How were monarchy and representative government different in colonial America, and how could both forms of authority exist at the same time?",
  evidenceBank: [
    "The English monarchy claimed authority over the colonies",
    "Some colonists elected representatives",
    "Some communities used local meetings to make decisions"
  ],
  trapLine: "Because the English king had authority over the colonies, colonial governments were all basically monarchies and worked the same way.",
  castNames: {
    edmund: "Edmund Price",
    gov: "Governor Hale",
    rebecca: "Rebecca Ward",
    jonas: "Jonas Reed",
    printer: "Mrs. Bell"
  },
  distractors: "Saying monarchy means no local government could exist; saying representative government meant all people could vote; assuming every colony had the exact same structure; listing “king” and “assembly” without comparing authority; claiming local self-government made colonies fully independent.",
  mustInclude: [
    "Explains how political authority works in a monarchy.",
    "Explains how representative government works.",
    "Uses colonial evidence of local or representative self-government.",
    "Compares the systems by where authority comes from or how decisions are made.",
    "Explains that royal authority and representative institutions could coexist without making the systems identical."
  ],
};
