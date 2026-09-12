// Signal Check Thread - companion to 3.12B-SC.
// Soft Crystal thread of Cadet chatter about the Pond Food Web Log claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.12B-SC-TH",
  teksLabel: "3.12B",
  grade: 3,
  subject: "Science",
  title: 'Thread: Pond Stays Same?',
  tagline: 'Pond feed says one missing animal changes nothing.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: 'If you remove one kind of animal from a pond, everything else stays exactly the same.',
    source: 'Pond Food Web Log',
    loggedAt: 'Spring Survey',
  },

  comments: [
    { id: "c1", persona: 'Cadet Still', text: "One species gone = zero effect. Pond's fine!", correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Diet', text: 'Herons eat lots of frogs here - diet log proves it.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Count', text: 'Frogs dropped - then heron counts dropped too.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Skip', text: 'Can we skip to snack?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Ripple', text: "That's a ripple through the food web - not 'exactly the same.'", correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Green', text: 'Greener water proves nothing changed for animals.', correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Switch', text: 'Herons eat other food - so maybe zero change? Need proof.', correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "heron_diet", text: 'Frogs are a big share of heron diet here.' },
    { id: "feeding_watch", text: 'Herons caught frogs on 6 of 10 visits.' },
    { id: "heron_count", text: 'Heron numbers dropped after frogs dropped.' },
    { id: "pond_survey", text: 'Survey shows ripple: fewer herons, more insects.' },
    { id: "other_food", text: 'Herons can also eat fish and insects - but counts still fell.' },
  ],

  echo: {
    main: 'Thread locked. Flag the pond chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark diet/count/ripple as helpful?',
    "Did I catch 'zero effect' as misleading?",
    'Did my reply mention a food-web ripple?',
    'Did I use a real reading?',
  ],
};
