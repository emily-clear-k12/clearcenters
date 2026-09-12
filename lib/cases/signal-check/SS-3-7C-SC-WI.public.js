// Signal Check Weigh-In — companion to SS.3.7C-SC.
// Reuses classic evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.3.7C-SC-WI',
  teksLabel: '3.7C',
  grade: 3,
  subject: "Social Studies",
  title: 'Whose Job Weigh-In',
  tagline: 'Any government can do any job?',
  stemMode: 'dropdown',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'City, state, and federal services help people — but each has its own jobs. One Cadet says any level could do any service. The other says jobs are assigned to specific levels.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Any level of government could handle any helpful service.' },
    { id: "B", label: "SIDE B", claim: 'Different levels have different jobs — city streets, state licenses, federal mail.' },
  ],

  evidence: [
    { id: 'pothole_log', text: 'City crew patched 6 potholes on Main Street this week.', supports: 'B' },
    { id: 'license_office', text: 'Driver\'s licenses are run by the Texas Department of Public Safety.', supports: 'B' },
    { id: 'state_seal', text: 'New license printed with the state seal of Texas.', supports: 'B' },
    { id: 'mail_log', text: 'U.S. Postal Service delivers mail every weekday.', supports: 'B' },
    { id: 'postal_law', text: 'Federal law reserves mail delivery for the U.S. Postal Service, not local governments.', supports: 'B' },
    { id: 'park_bench', text: 'A new bench was added to Westview Park.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I name city, state, and federal jobs?',
    'Did I say levels aren\'t interchangeable?',
    'Did I skip the bench as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
