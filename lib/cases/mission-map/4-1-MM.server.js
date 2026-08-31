// Mission Map — "Chart the Moon's Pattern" — SERVER ONLY.
// Never import this from a client component. See 4-1-MM.public.js for the
// TEKS 4.9B alignment and scope notes.

export const SERVER_CASE = {
  standard: "4.1-MM",
  title: "Chart the Moon's Pattern",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The Moon's appearance follows a repeating pattern over about a month. It starts as a thin sliver and grows bigger and bigger — through a half shape — all the way to a full, round Moon. After it's full, it shrinks back down the same way it grew, through a half shape again, back to a thin sliver. That whole pattern, from thin sliver back to thin sliver, takes about 29-30 days. Using that pattern, the smudged nights 8, 9, and 10 should show the Moon continuing to grow toward full, since night 7 was a half-moon and night 11 was already full — and the neighboring town's archive photos confirmed that. Using the same pattern, night 31 (two nights after the calendar's last night) should look like a slightly bigger sliver than night 29, since night 29 matched night 1 almost exactly and the whole cycle is starting over again.",

  mustInclude: [
    "Describes the overall pattern: the Moon's lit shape grows from a sliver to full, then shrinks back down to a sliver again, over about a month (~29-30 days) — not just describing one or two nights in isolation",
    "Uses evidence (the nights right before and after the smudge, and/or the neighboring town's archive photos) to explain what nights 8-10 should have shown, rather than just asserting an answer",
    "Makes a specific prediction for the night after the calendar ends (a bit bigger than the last recorded sliver) and connects it to the pattern repeating, not just restating what already happened",
  ],
};
