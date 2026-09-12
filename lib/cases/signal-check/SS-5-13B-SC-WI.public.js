// Signal Check Weigh-In — companion to SS.5.13B-SC.
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.5.13B-SC-WI',
  teksLabel: '5.13B',
  grade: 5,
  subject: "Social Studies",
  title: 'Colonial Say Weigh-In',
  tagline: 'Assemblies just for show?',
  stemMode: 'open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Mayflower Compact, House of Burgesses, and town meetings show real voting — though limited. One Cadet says it was all show. The other says colonists did get a say.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Colonial meetings were just for show — colonists didn\'t really get a say.' },
    { id: "B", label: "SIDE B", claim: 'Colonists did vote on laws and local decisions — though voting was limited to property-owning men.' },
  ],

  evidence: [
    { id: 'mayflower_text', text: 'Mayflower Compact (1620): colonists agreed to create and follow their own just laws.', supports: 'B' },
    { id: 'burgesses_record', text: 'House of Burgesses (1619): elected reps voted on local laws and taxes.', supports: 'B' },
    { id: 'voting_rules', text: 'Only property-owning men could vote in most assemblies.', supports: 'neither' },
    { id: 'townmeeting_minutes', text: 'New England town meetings: colonists voted directly on roads and land use.', supports: 'B' },
    { id: 'unrelated_ledger', text: 'Merchant ship\'s trading ledger — unrelated to colonial government.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I name an assembly that voted?',
    'Did I say it wasn\'t just for show?',
    'Did I skip the ship ledger as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
