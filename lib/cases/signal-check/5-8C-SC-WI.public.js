// Signal Check Weigh-In — companion to 5.8C-SC (Did the Straw Really Bend?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.8C-SC-WI',
  teksLabel: '5.8C',
  grade: 5,
  subject: "Science",
  title: 'Straw Bend Weigh-In',
  tagline: 'Really bent?',
  stemMode: "open",

  dispute: {
    prompt: 'Straw Cadets locked in. Who\'s right?',
    context: 'Glass of Water Observation showed a bent-looking straw at the waterline. One Cadet says it physically bent. The other says light bent (refracted).',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The straw actually bent when it entered the water.' },
    { id: "B", label: "SIDE B", claim: 'Light refracts — straw comes out straight; bend moves with angle.' },
  ],

  evidence: [
    { id: 'removed', text: 'Pulled out, the straw is still perfectly straight.', supports: 'B' },
    { id: 'flex', text: 'Bending the dry straw by hand takes real force.', supports: 'B' },
    { id: 'angle', text: 'Different viewing angle moves where the bend appears.', supports: 'B' },
    { id: 'refract', text: 'Light refracts when it goes from air into water.', supports: 'B' },
    { id: 'straight_note', text: 'Light travels straight until something reflects, refracts, or absorbs it.', supports: 'B' },
    { id: 'stripes', text: 'Straw is striped red and white.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice it came out straight?',
    'Did I say light refracted, not the straw?',
    'Did I skip the stripe note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
