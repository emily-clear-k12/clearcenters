// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// ELAR Group Chat — ELA.5.8A. TEKS 5.8A — infer multiple themes within a text using text evidence.

export const SERVER_CASE = {
  standard: "ELA.5.8A",
  title: "That's Just the Plot",
  bigQuestion: "The question asks for the themes of 'Lucia Plays Solo.' What are they?",
  evidenceBank: [
    "In Scene One, Lucia sits alone and says she is not ready for tryouts",
    "In Scene Two, Lucia plays her first solo even though her hands are shaking",
    "At the end, the band stands and cheers for Lucia",
    "The question asks for themes — more than one",
    "A theme is a lesson that could apply outside the story"
  ],
  trapLine: "The theme is that Lucia moved to a new town, joined the band, and played at the concert.",
  castNames: {
    noah: "Noah",
    lucia: "Lucia",
    stage: "Stage Directions",
    question: "Question",
    grant: "Ms. Grant"
  },
  distractors: "Retelling the plot instead of stating a lesson; naming only one theme when the question asks for several; stating a theme with the character's name in it; naming a topic like 'music' instead of a lesson.",
  mustInclude: [
    "It explains that Noah retold the plot instead of naming a theme.",
    "It names one theme about belonging or friendship, such as that people can find where they belong over time.",
    "It names a second theme about courage, such as that being brave means acting even when you are scared.",
    "It states the themes as lessons that could apply outside the story, without using Lucia's name.",
    "It uses evidence from both scenes, including the stage directions."
  ],
};
