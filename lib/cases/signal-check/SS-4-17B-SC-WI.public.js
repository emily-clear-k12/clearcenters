// Signal Check Weigh-In — companion to SS.4.17B-SC.
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.4.17B-SC-WI',
  teksLabel: '4.17B',
  grade: 4,
  subject: "Social Studies",
  title: 'Texas Sound Weigh-In',
  tagline: 'One main style?',
  stemMode: 'dropdown-open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Conjunto/Tejano and Western/cowboy music are both Texas classics with different roots. One Cadet says one main style. The other says many traditions.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Texas culture has one main style.' },
    { id: "B", label: "SIDE B", claim: 'Texas culture includes many traditions — like Conjunto/Tejano and Western/cowboy — with different roots.' },
  ],

  evidence: [
    { id: 'conjunto_origin', text: 'Conjunto/Tejano blended Mexican styles with German-brought accordion.', supports: 'B' },
    { id: 'tejano_instruments', text: 'Accordion and bajo sexto are signature instruments in this style.', supports: 'B' },
    { id: 'cowboy_origin', text: 'Cowboy songs grew from ranching and cattle-drive life.', supports: 'B' },
    { id: 'western_instruments', text: 'Guitar and fiddle are signature instruments in this style.', supports: 'B' },
    { id: 'sound_comparison', text: 'The two styles use different instruments and cultural roots.', supports: 'B' },
    { id: 'culture_summary', text: 'Texas culture includes many distinct traditions shaped by different groups.', supports: 'B' },
    { id: 'venue_note', text: 'A local dance hall hosts live music every Friday.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I name two different traditions?',
    'Did I say culture isn\'t one style?',
    'Did I skip the dance hall as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
