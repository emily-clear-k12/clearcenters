// Signal Check Thread — companion to SS.5.4C-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.5.4C-SC-TH',
  teksLabel: '5.4C',
  grade: 5,
  subject: "Social Studies",
  title: 'Thread: First to See It?',
  tagline: 'Cadets debate Lewis and Clark.',
  stemMode: 'open',

  transmission: {
    claimHeadline: 'Lewis and Clark were the first people to ever see the land they explored.',
    source: 'Corps of Discovery Expedition Log',
    loggedAt: '1804–1806',
  },

  comments: [
    { id: 'c1', persona: 'Cadet First', text: 'Lewis and Clark saw it first. Empty land!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Village', text: 'Maps mark dozens of Native villages along the route.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Guide', text: 'Sacagawea translated and guided — they needed help.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Snack', text: 'What\'s for lunch after archive lab?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Trade', text: 'They traded for food to survive winter.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Empty', text: 'If they explored it, nobody lived there yet.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'journal_entry', text: 'Journals describe land, plants, and animals along the route.' },
    { id: 'village_map', text: 'Marks dozens of established Native villages and territories along the route.' },
    { id: 'sacagawea_role', text: 'Sacagawea translated and helped guide through unfamiliar territory.' },
    { id: 'food_trade', text: 'Expedition traded with Native nations for food to survive winter.' },
    { id: 'first_claim', text: 'An old summary calls them the first people to ever see the western land.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark village/guide as helpful?',
    'Did I catch first-ever as misleading?',
    'Did my reply use a real reading?',
    'Did I say people already lived there?',
  ],
};
