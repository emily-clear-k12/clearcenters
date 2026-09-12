// Signal Check Thread — companion to 5.8C-SC (Did the Straw Really Bend?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.8C-SC-TH',
  teksLabel: '5.8C',
  grade: 5,
  subject: "Science",
  title: 'Thread: Straw Bent?',
  tagline: 'Cadets buzz about the waterline trick.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'The straw looks bent right where it enters the water — it must have actually bent when it went in.',
    source: 'Glass of Water Observation',
    loggedAt: 'Trial 1',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Snap', text: 'It looks broken at the waterline — straw must have bent!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Pull', text: 'Pulled it out and it\'s still ruler-straight.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Angle', text: 'I moved my head and the bend jumped to a new spot.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Sip', text: 'Anyone bring juice boxes for snack?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Light', text: 'Light bends (refracts) from air into water — straw stays rigid.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Soft', text: 'Water softens plastic so straws always bend on contact.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'removed', text: 'Pulled out, the straw is still perfectly straight.' },
    { id: 'flex', text: 'Bending the dry straw by hand takes real force.' },
    { id: 'angle', text: 'Different viewing angle moves where the bend appears.' },
    { id: 'refract', text: 'Light refracts when it goes from air into water.' },
    { id: 'straight_note', text: 'Light travels straight until something reflects, refracts, or absorbs it.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark pull/angle comments as helpful?',
    'Did I catch "water softens straw" as misleading?',
    'Did my reply use a real reading?',
    'Did I say light refracted, straw didn\'t bend?',
  ],
};
