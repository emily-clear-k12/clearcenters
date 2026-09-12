// Signal Check Weigh-In - companion to 3.13A-SC.
// Reuses Backyard Burrow Study evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.13A-SC-WI",
  teksLabel: "3.13A",
  grade: 3,
  subject: "Science",
  title: 'Claw Clash',
  tagline: 'Are mole claws just worse legs?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Burrow Cadets disagree. Who's right?",
    context: 'Mole dug fast; rabbit barely scratched. One Cadet says mole claws are worse legs. The other says each body part fits its job.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: "The mole's stubby claws are just worse legs than the rabbit's." },
    { id: "B", label: "SIDE B", claim: 'Mole claws fit digging; rabbit legs fit running - different jobs.' },
  ],

  evidence: [
    { id: "dig_time", text: 'Mole dug 12 inches of soil in 45 seconds with shovel-shaped claws.', supports: "B" },
    { id: "claw_shape", text: 'Mole claws are wide, flat, angled out like small shovels.', supports: "B" },
    { id: "rabbit_dig_attempt", text: 'Rabbit scratched a full minute - only loosened the top inch.', supports: "B" },
    { id: "rabbit_run_speed", text: 'Same rabbit outran a fox using those long legs.', supports: "B" },
    { id: "structure_note", text: 'Digging and running are different jobs - structures fit the job.', supports: "B" },
    { id: "fur_color", text: "Mole's fur looked slightly darker after the rain.", supports: "neither" },
  ],

  echo: {
    main: 'Claw clash, Cadet. Worse - or built for the job? Weigh it.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice how fast the mole dug?',
    'Did I notice what rabbit legs are good for?',
    'Did I avoid saying mole claws are just worse?',
    'Did my proof match my ruling?',
  ],
};
