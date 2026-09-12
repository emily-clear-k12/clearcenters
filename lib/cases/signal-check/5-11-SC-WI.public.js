// Signal Check Weigh-In — companion to 5.11-SC (Does Turning Off the Faucet Actually Save Anything?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.11-SC-WI',
  teksLabel: '5.11',
  grade: 5,
  subject: "Science",
  title: 'Faucet Save Weigh-In',
  tagline: 'Tiny drip, no savings?',
  stemMode: "open",

  dispute: {
    prompt: 'Faucet Cadets locked in. Who\'s right?',
    context: 'Household Water Use Log measured faucet flow and yearly totals. One Cadet says it\'s pointless. The other shows measurable savings.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Turning off the faucet while brushing saves nothing worth counting.' },
    { id: "B", label: "SIDE B", claim: 'Measured gallons add up — one family can save thousands per year.' },
  ],

  evidence: [
    { id: 'flow', text: 'Running faucet fills a 2-gallon container in about 1 minute.', supports: 'B' },
    { id: 'brush', text: '2-minute brushing with faucet on uses about 4 gallons.', supports: 'B' },
    { id: 'daily', text: 'Family brushing twice a day saves that 4 gallons each time faucet is off.', supports: 'B' },
    { id: 'yearly', text: 'Over a year that adds up to over 2,900 gallons.', supports: 'B' },
    { id: 'conserve', text: 'Small daily actions add up to a real measurable effect.', supports: 'B' },
    { id: 'sink_white', text: 'Bathroom sink is white porcelain.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice the yearly gallon total?',
    'Did I say small actions can add up?',
    'Did I skip the sink-color note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
