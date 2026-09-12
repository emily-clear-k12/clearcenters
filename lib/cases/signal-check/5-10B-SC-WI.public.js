// Signal Check Weigh-In — companion to 5.10B-SC (Can You Really Squish Dirt Into Rock in a Day?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.10B-SC-WI',
  teksLabel: '5.10B',
  grade: 5,
  subject: "Science",
  title: 'Mud Rock Weigh-In',
  tagline: 'Rock by tomorrow?',
  stemMode: "open",

  dispute: {
    prompt: 'Mud-jar Cadets locked in. Who\'s right?',
    context: 'Classroom Mud Jar stayed soft next day; real rock showed countless slow layers. One Cadet says one-day rock is possible. The other says formation is slow.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Pile mud, squish hard, and it\'s solid rock by tomorrow.' },
    { id: "B", label: "SIDE B", claim: 'Sedimentary rock needs long burial, pressure, and cementing — not one day.' },
  ],

  evidence: [
    { id: 'day1', text: 'Pressed mud/sand jar is soft and crumbly right after squishing.', supports: 'B' },
    { id: 'day2', text: 'Same jar next day — still soft, no rock.', supports: 'B' },
    { id: 'layers', text: 'Real sedimentary rock shows hundreds of thin packed layers.', supports: 'B' },
    { id: 'age', text: 'Scientists estimate those layers took thousands of years.', supports: 'B' },
    { id: 'process', text: 'Sediment slowly buried, pressed, and cemented over a long time.', supports: 'B' },
    { id: 'jar_size', text: 'Test jar held about two cups.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice the jar stayed soft?',
    'Did I say rock takes a long time?',
    'Did I skip the jar-size note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
