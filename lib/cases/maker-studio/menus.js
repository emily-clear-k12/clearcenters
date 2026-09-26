// Ready-made Maker Studio menus teachers can load in Assign.
// Wave 0: each menu enables Write only. Other modes show on the student
// grid as quiet disabled cells so the studio already feels complete.

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
];

export function menuById(id) {
  return MAKER_MENUS.find((m) => m.id === id) || null;
}
