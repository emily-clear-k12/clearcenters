// Signal Check Weigh-In - companion to 3.12B-SC.
// Reuses Pond Food Web Log evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.12B-SC-WI",
  teksLabel: "3.12B",
  grade: 3,
  subject: "Science",
  title: 'Frog Drop Weigh-In',
  tagline: 'If frogs vanish, does the pond stay the same?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Pond Cadets disagree. Who's right?",
    context: 'Frog numbers dropped and heron counts fell too. One Cadet says removing one animal changes nothing. The other sees a food-web ripple.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Remove one kind of animal - everything else stays exactly the same.' },
    { id: "B", label: "SIDE B", claim: 'Remove one animal - the food web can ripple to others.' },
  ],

  evidence: [
    { id: "heron_diet", text: 'Frogs make up a large share of what herons eat here.', supports: "B" },
    { id: "feeding_watch", text: 'Herons caught frogs on 6 of 10 visits.', supports: "B" },
    { id: "heron_count", text: 'After frogs dropped, heron numbers at the pond dropped too.', supports: "B" },
    { id: "pond_survey", text: 'Fewer frogs lined up with fewer herons and more leftover insects.', supports: "B" },
    { id: "ripple_note", text: 'Scientists call this a ripple effect through the food web.', supports: "B" },
    { id: "pond_color", text: 'Pond water looked a bit greener this spring.', supports: "neither" },
  ],

  echo: {
    main: 'Frog drop, Cadet. Zero change - or ripple? Weigh it.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice frogs feed herons?',
    'Did I notice heron counts dropped too?',
    'Did I avoid saying the pond stays exactly the same?',
    'Did my proof match my ruling?',
  ],
};
