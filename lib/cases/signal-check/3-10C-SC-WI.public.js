// Signal Check Weigh-In - companion to 3.10C-SC.
// Reuses Creek Bank Trail Cam evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.10C-SC-WI",
  teksLabel: "3.10C",
  grade: 3,
  subject: "Science",
  title: 'Bank Change Weigh-In',
  tagline: 'Did the creek bank change overnight?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Trail Cam Cadets disagree. Who's right?",
    context: 'The bank looks different from last year. One Cadet says something sudden hit overnight. The other says it wore away slowly.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The bank changed overnight - something sudden must have hit.' },
    { id: "B", label: "SIDE B", claim: 'The bank changed slowly - small wears added up over time.' },
  ],

  evidence: [
    { id: "year_photo", text: "Last year's photo: straight bank, no curve.", supports: "B" },
    { id: "now_photo", text: "This year's photo: wide curve worn into the bank.", supports: "B" },
    { id: "weekly_log", text: 'Weekly photos show the curve growing a little each week.', supports: "B" },
    { id: "no_single_event", text: 'No single storm or flood the week the curve first showed.', supports: "B" },
    { id: "total_change", text: 'Weekly measurements add up to the full curve size.', supports: "B" },
    { id: "bank_color", text: 'Bank near the curve looks a bit lighter tan this year.', supports: "neither" },
  ],

  echo: {
    main: 'Bank mystery, Cadet. Sudden or slow? Weigh it.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I use before-and-after photos?',
    'Did I notice the weekly slow change?',
    'Did I avoid saying it happened overnight?',
    'Did my proof match my ruling?',
  ],
};
