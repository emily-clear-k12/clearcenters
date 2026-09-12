// Signal Check Weigh-In — companion to SS.3.8A-SC.
// Reuses classic evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.3.8A-SC-WI',
  teksLabel: '3.8A',
  grade: 3,
  subject: "Social Studies",
  title: 'Label Mix Weigh-In',
  tagline: 'Same label for all three?',
  stemMode: 'dropdown',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'The museum mixed labels on three founding documents. One Cadet says one label fits all. The other says each document has its own job.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'All three founding documents could share the same label.' },
    { id: "B", label: "SIDE B", claim: 'Each document has a different job — independence, organizing government, or protecting freedoms.' },
  ],

  evidence: [
    { id: 'doc_declaration', text: 'Explains why the colonies wanted independence from Britain.', supports: 'B' },
    { id: 'doc_purpose_1', text: 'Written in 1776, before the new government existed.', supports: 'B' },
    { id: 'doc_constitution', text: 'Describes how the new government would be organized into three branches.', supports: 'B' },
    { id: 'doc_purpose_2', text: 'Written after independence to set up how the country would run.', supports: 'B' },
    { id: 'doc_billofrights', text: 'Lists freedoms like speech and religion the government cannot take away.', supports: 'B' },
    { id: 'purpose_summary', text: 'Three different purposes: independence, organizing government, protecting freedoms.', supports: 'B' },
    { id: 'exhibit_lighting', text: 'The display case has a bright overhead light.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I name different purposes?',
    'Did I say one label doesn\'t fit all?',
    'Did I skip the light as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
