// Maker Studio prompt cards for Assign (left rail).
// Seeded from the old ready-made menus — prompts only, not mode bundles.
// Teacher picks a card, then can edit the prompt text. Modes are chosen separately.

export const MAKER_PROMPT_CARDS = [
  {
    id: "wonder-write",
    title: "I Wonder…",
    label: "I Wonder…",
    prompt:
      "What is one thing you wonder about this topic? Write what you think is true, and one reason that makes you think that.",
  },
  {
    id: "explain-buddy",
    title: "Explain it to a Buddy",
    label: "Explain it to a Buddy",
    prompt:
      "Pretend a younger student is sitting next to you. Explain today's idea in your own words so they could get it too. Use one example.",
  },
  {
    id: "then-now",
    title: "Then and Now",
    label: "Then and Now",
    prompt:
      "Pick one thing that changed from then to now. Write what it was like before, what it is like now, and why the change matters.",
  },
  {
    id: "show-what-you-know",
    title: "Show what you know",
    label: "Show what you know",
    prompt:
      "Show what you know about today's idea. Write it in your own words, then sketch something that helps explain it.",
  },
  {
    id: "poster-day",
    title: "Poster day",
    label: "Poster day",
    prompt:
      "Make a bold poster about today's idea. Give it a clear title, a short caption, and one picture that shows the main idea.",
  },
  {
    id: "quick-default",
    title: "Today's idea",
    label: "Today's idea",
    prompt:
      "Write about today's idea in your own words. What do you understand, and what makes you think that?",
  },
];

/** Prompts for a Maker case. Quick Maker / MS.QUICK-WRITE uses the starter set. */
export function promptCardsForCase(standard) {
  // One starter set for Quick Maker; future cases can branch here.
  void standard;
  return MAKER_PROMPT_CARDS;
}

export function promptCardById(id) {
  return MAKER_PROMPT_CARDS.find((c) => c.id === id) || null;
}

// Deprecated: old Assign loaded menus that also bundled modes / finishN.
// Prefer MAKER_PROMPT_CARDS. Kept so stray imports do not explode.
export const MAKER_MENUS = MAKER_PROMPT_CARDS.map((c) => ({
  id: c.id,
  title: c.title,
  prompt: c.prompt,
  blurb: c.label || c.title,
  enabledModes: ["write"],
  finishN: 1,
  everydayCount: 0,
  challengeCount: 0,
  journalOnRelease: true,
}));

export function menuById(id) {
  return MAKER_MENUS.find((m) => m.id === id) || null;
}
