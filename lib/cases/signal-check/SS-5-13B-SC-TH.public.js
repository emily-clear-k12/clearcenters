// Signal Check Thread — companion to SS.5.13B-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.5.13B-SC-TH',
  teksLabel: '5.13B',
  grade: 5,
  subject: "Social Studies",
  title: 'Thread: Just for Show?',
  tagline: 'Cadets debate colonial self-government.',
  stemMode: 'open',

  transmission: {
    claimHeadline: 'Colonial meetings and assemblies were just for show — colonists didn\'t really get a say in their own government.',
    source: 'Colonial Government Records',
    loggedAt: 'Voice File',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Show', text: 'Assemblies were fake — colonists had no real say.', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Burgesses', text: 'House of Burgesses reps voted on local laws and taxes.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Town', text: 'Town meeting minutes show votes on roads and land use.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Ledger', text: 'Why is a ship trading ledger in this folder?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Compact', text: 'Mayflower Compact shows they agreed to make their own laws.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Fake', text: 'If voting was limited, it wasn\'t real government at all.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'mayflower_text', text: 'Mayflower Compact (1620): colonists agreed to create and follow their own just laws.' },
    { id: 'burgesses_record', text: 'House of Burgesses (1619): elected reps voted on local laws and taxes.' },
    { id: 'voting_rules', text: 'Only property-owning men could vote in most assemblies.' },
    { id: 'townmeeting_minutes', text: 'New England town meetings: colonists voted directly on roads and land use.' },
    { id: 'unrelated_ledger', text: 'Merchant ship\'s trading ledger — unrelated to colonial government.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark Burgesses/town as helpful?',
    'Did I catch just-show as misleading?',
    'Did my reply use a real reading?',
    'Did I say colonists did get a say?',
  ],
};
