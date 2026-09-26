// Maker Studio — the 15 make modes.
// Wave 0: only `write` is live. Student grid shows only modes the teacher assigned.

export const MAKER_MODES = [
  {
    id: "write",
    label: "Write",
    blurb: "Write your ideas clearly.",
    icon: "✎",
    live: true,
    instructions:
      "Read the prompt. Write your answer in your own words. You can save and come back anytime.",
    doneHint: "Tap Done when this piece feels finished.",
  },
  {
    id: "sketch",
    label: "Sketch kit",
    blurb: "Draw the idea with simple shapes.",
    icon: "◻",
    live: false,
  },
  {
    id: "diagram",
    label: "Diagram",
    blurb: "Show how the parts connect.",
    icon: "◎",
    live: false,
  },
  {
    id: "poster",
    label: "Poster",
    blurb: "Make a bold one-page poster.",
    icon: "▣",
    live: false,
  },
  {
    id: "comic",
    label: "Comic",
    blurb: "Tell it in a few panels.",
    icon: "▭",
    live: false,
  },
  {
    id: "voice",
    label: "Voice note",
    blurb: "Say it out loud, then keep it.",
    icon: "◉",
    live: false,
  },
  {
    id: "before_after",
    label: "Before/after",
    blurb: "Show what changed and why.",
    icon: "⇄",
    live: false,
  },
  {
    id: "map_it",
    label: "Map it",
    blurb: "Put the idea on a map.",
    icon: "⌖",
    live: false,
  },
  {
    id: "math_story",
    label: "Math story",
    blurb: "Turn the numbers into a story.",
    icon: "∑",
    live: false,
  },
  {
    id: "interview",
    label: "Interview",
    blurb: "Ask and answer like a reporter.",
    icon: "◈",
    live: false,
  },
  {
    id: "sort_of_my_own",
    label: "Sort of my own",
    blurb: "Make your own sorting rule.",
    icon: "⊞",
    live: false,
  },
  {
    id: "teach_the_buddy",
    label: "Teach the Buddy",
    blurb: "Teach S.A.M. so it sticks.",
    icon: "★",
    live: false,
  },
  {
    id: "paint_what_i_said",
    label: "Paint what I said",
    blurb: "Turn your words into a picture.",
    icon: "◈",
    live: false,
  },
  {
    id: "what_if",
    label: "What if…",
    blurb: "Change one thing and rethink it.",
    icon: "?",
    live: false,
  },
  {
    id: "postcard",
    label: "Postcard from then",
    blurb: "Write from another time or place.",
    icon: "✉",
    live: false,
  },
];

export function modeById(id) {
  return MAKER_MODES.find((m) => m.id === id) || null;
}

export function liveModeIds() {
  return MAKER_MODES.filter((m) => m.live).map((m) => m.id);
}

/** Wave 0: only Write can actually be enabled for students. */
export function sanitizeEnabledModes(list) {
  const wanted = Array.isArray(list) ? list : [];
  const live = new Set(liveModeIds());
  const next = wanted.filter((id) => live.has(id));
  return next.length ? next : ["write"];
}
