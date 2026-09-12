// Signal Check Thread — companion to SS.4.17B-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.4.17B-SC-TH',
  teksLabel: '4.17B',
  grade: 4,
  subject: "Social Studies",
  title: 'Thread: One Style?',
  tagline: 'Cadets debate Texas culture.',
  stemMode: 'dropdown-open',

  transmission: {
    claimHeadline: 'Texas culture has one main style.',
    source: 'Texas Music Traditions Archive',
    loggedAt: 'Sound Compare',
  },

  comments: [
    { id: 'c1', persona: 'Cadet One', text: 'Texas culture = one main style. That\'s the brand!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Accordion', text: 'Conjunto mixes Mexican styles with German accordion.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Fiddle', text: 'Cowboy music uses guitar and fiddle from ranch life.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Friday', text: 'Dance hall night is Friday — who\'s going?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Roots', text: 'Different instruments + different roots = more than one style.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Mono', text: 'If it\'s Texas music, it\'s all the same style.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'conjunto_origin', text: 'Conjunto/Tejano blended Mexican styles with German-brought accordion.' },
    { id: 'tejano_instruments', text: 'Accordion and bajo sexto are signature instruments in this style.' },
    { id: 'cowboy_origin', text: 'Cowboy songs grew from ranching and cattle-drive life.' },
    { id: 'western_instruments', text: 'Guitar and fiddle are signature instruments in this style.' },
    { id: 'sound_comparison', text: 'The two styles use different instruments and cultural roots.' },
    { id: 'culture_summary', text: 'Texas culture includes many distinct traditions shaped by different groups.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark accordion/fiddle as helpful?',
    'Did I catch one-style as misleading?',
    'Did my reply use a real reading?',
    'Did I say Texas has many traditions?',
  ],
};
