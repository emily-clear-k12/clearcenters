// Signal Check Thread — companion to 5.11-SC (Does Turning Off the Faucet Actually Save Anything?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.11-SC-TH',
  teksLabel: '5.11',
  grade: 5,
  subject: "Science",
  title: 'Thread: Pointless Shutoff?',
  tagline: 'Cadets buzz about brushing water.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'Turning off the faucet while brushing your teeth is pointless — it\'s such a tiny amount of water, it doesn\'t actually save anything worth counting.',
    source: 'Household Water Use Log',
    loggedAt: '1-Year Estimate',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Tiny', text: 'It\'s such a tiny trickle — pointless to turn off!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Four', text: 'We measured ~4 gallons for one 2-minute run.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Year', text: 'One family: over 2,900 gallons saved in a year.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Paste', text: 'Mint or bubblegum toothpaste today?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Add', text: 'Small habits repeated daily really do add up.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Zero', text: 'If it\'s under 5 gallons, scientists don\'t even count it.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'flow', text: 'Running faucet fills a 2-gallon container in about 1 minute.' },
    { id: 'brush', text: '2-minute brushing with faucet on uses about 4 gallons.' },
    { id: 'daily', text: 'Family brushing twice a day saves that 4 gallons each time faucet is off.' },
    { id: 'yearly', text: 'Over a year that adds up to over 2,900 gallons.' },
    { id: 'conserve', text: 'Small daily actions add up to a real measurable effect.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark four/year comments as helpful?',
    'Did I catch "pointless trickle" as misleading?',
    'Did my reply use a real reading?',
    'Did I say the savings add up?',
  ],
};
