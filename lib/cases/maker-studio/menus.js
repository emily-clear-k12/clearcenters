// Ready-made Maker Studio menus teachers can load in Assign.
// Wave 1: Write-only menus kept; mix menus unlock Sketch / Poster.

export const MAKER_MENUS = [
  {
    id: "wonder-write",
    title: "I Wonder…",
    subject: "Science",
    grade: 3,
    topic: "Curiosity write",
    prompt:
      "What is one thing you wonder about this topic? Write what you think is true, and one reason that makes you think that.",
    enabledModes: ["write"],
    finishN: 1,
    everydayCount: 1,
    challengeCount: 0,
    journalOnRelease: true,
    blurb: "A calm open write. Great first Maker assignment.",
  },
  {
    id: "explain-buddy",
    title: "Explain it to a Buddy",
    subject: "Any",
    grade: 3,
    topic: "Explain in your words",
    prompt:
      "Pretend a younger student is sitting next to you. Explain today's idea in your own words so they could get it too. Use one example.",
    enabledModes: ["write"],
    finishN: 1,
    everydayCount: 1,
    challengeCount: 0,
    journalOnRelease: true,
    blurb: "Students teach the idea in plain kid language.",
  },
  {
    id: "then-now",
    title: "Then and Now",
    subject: "Social Studies",
    grade: 4,
    topic: "Change over time",
    prompt:
      "Pick one thing that changed from then to now. Write what it was like before, what it is like now, and why the change matters.",
    enabledModes: ["write"],
    finishN: 1,
    everydayCount: 1,
    challengeCount: 0,
    journalOnRelease: true,
    blurb: "Compare then and now in a short clear write.",
  },
  {
    id: "show-what-you-know",
    title: "Show what you know",
    subject: "Any",
    grade: 3,
    topic: "Write + sketch",
    prompt:
      "Show what you know about today's idea. Write it in your own words, then sketch something that helps explain it.",
    enabledModes: ["write", "sketch"],
    finishN: 2,
    everydayCount: 0,
    challengeCount: 0,
    journalOnRelease: true,
    blurb: "Write plus Sketch kit. Finish both pieces.",
  },
  {
    id: "poster-day",
    title: "Poster day",
    subject: "Any",
    grade: 3,
    topic: "One bold poster",
    prompt:
      "Make a bold poster about today's idea. Give it a clear title, a short caption, and one picture that shows the main idea.",
    enabledModes: ["poster"],
    finishN: 1,
    everydayCount: 0,
    challengeCount: 0,
    journalOnRelease: true,
    blurb: "Poster only — title, caption, and one image.",
  },
];

export function menuById(id) {
  return MAKER_MENUS.find((m) => m.id === id) || null;
}
