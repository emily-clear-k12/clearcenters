// Signal Check Thread — companion to 5.10C-SC (Did the Canyon Really Form Overnight?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.10C-SC-TH',
  teksLabel: '5.10C',
  grade: 5,
  subject: "Science",
  title: 'Thread: Overnight Canyon?',
  tagline: 'Cadets buzz about the canyon survey.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'That whole canyon must have cracked open in one single earthquake overnight — canyons that size don\'t take long to form.',
    source: 'Canyon Field Survey',
    loggedAt: 'Site Visit 1',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Quake', text: 'One big overnight quake cracked it open — done!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Match', text: 'Layers line up on both walls across the gap.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Model', text: 'Water carved a groove; one shake made zero crack.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Picnic', text: 'Who packed trail mix for the rim?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Erode', text: 'Flowing water slowly carves canyons over a long time.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Fast', text: 'Big landforms always form in one night.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'match', text: 'Rock layers match across both sides of the gap.' },
    { id: 'river', text: 'A river still runs along the canyon bottom.' },
    { id: 'water_model', text: 'Repeated water flow carved a groove in clay over days.' },
    { id: 'shake_model', text: 'One hard shake of the clay tray made no groove.' },
    { id: 'erosion', text: 'Canyons form as flowing water slowly erodes rock over a long time.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark match/model comments as helpful?',
    'Did I catch "one night landform" as misleading?',
    'Did my reply use a real reading?',
    'Did I say the canyon formed slowly by water?',
  ],
};
