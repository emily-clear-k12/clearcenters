// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// ELAR Group Chat — ELA.3.3C. TEKS 3.3C — identify the meaning of and use words with affixes such as im- (into), non-, dis-, in- (not, non), pre-, -ness, -y, and -ful.

export const SERVER_CASE = {
  standard: "ELA.3.3C",
  title: "Dis-Missed",
  bigQuestion: "Does 'dis-' mean 'not' in every word that starts with it?",
  evidenceBank: [
    "Disagree means 'not agree,' and that fits the flyer",
    "Dislike means 'not like,' and that fits the flyer",
    "'Not playing' makes no sense for a wall of paintings",
    "Display means to show",
    "Dis- means 'not' when 'not + the base word' makes sense in the sentence"
  ],
  trapLine: "Dis- always means not. So the art display means the art is not playing.",
  castNames: {
    tess: "Tess",
    dizzy: "Dizzy Dis",
    agree: "Agree",
    like: "Like",
    display: "Display",
    park: "Mr. Park"
  },
  distractors: "Thinking every word that starts with the same letters has that prefix; applying a prefix rule without checking the sentence; thinking a prefix always means the same thing in every word; ignoring what the author meant.",
  mustInclude: [
    "It says dis- does not mean 'not' in 'display.'",
    "It shows that disagree and dislike do mean 'not agree' and 'not like.'",
    "It explains that 'not playing' makes no sense on the flyer.",
    "It says display means to show.",
    "It gives a rule: check whether 'not + the base word' makes sense in the sentence."
  ],
};
