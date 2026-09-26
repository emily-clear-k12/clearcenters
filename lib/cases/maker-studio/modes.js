// Maker Studio — the 15 make modes.
// Wave 1–3 live: write … sort_of_my_own, plus teach_the_buddy,
// paint_what_i_said, what_if, postcard (15 live modes).
// Student grid shows only modes the teacher assigned that are live.

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
    live: true,
    instructions:
      "Draw your idea, or pick a picture from the ClearCenters library. Erase mistakes or clear and start over. Tap Done when your sketch feels finished.",
    doneHint: "Tap Done when this sketch feels finished.",
  },
  {
    id: "diagram",
    label: "Diagram",
    blurb: "Show how the parts connect.",
    icon: "◎",
    live: true,
    instructions:
      "Pick a picture from the library or draw how it works. Add a short caption. You can tap a label chip onto the canvas if you want.",
    doneHint: "Tap Done when your diagram shows the idea.",
  },
  {
    id: "poster",
    label: "Poster",
    blurb: "Make a bold one-page poster.",
    icon: "▣",
    live: true,
    instructions:
      "Add a title, a short caption, and one picture from the ClearCenters library (you can still draw or upload). Keep it clear and bold.",
    doneHint: "Tap Done when your poster is ready.",
  },
  {
    id: "comic",
    label: "Comic",
    blurb: "Tell it in a few panels.",
    icon: "▭",
    live: true,
    instructions:
      "Tell the idea in 2–4 panels. Pick a library picture or draw in each box, and add one speech or thought line.",
    doneHint: "Tap Done when all your panels are ready.",
  },
  {
    id: "voice",
    label: "Voice note",
    blurb: "Say it out loud, then keep it.",
    icon: "◉",
    live: true,
    instructions:
      "Record your voice for up to about 90 seconds. Stop when you are done, then replay to check it.",
    doneHint: "Tap Done when your voice note sounds right.",
  },
  {
    id: "before_after",
    label: "Before/after",
    blurb: "Show what changed and why.",
    icon: "⇄",
    live: true,
    instructions:
      "Show Before and After side by side. Draw or pick a library picture in each panel. Add one line about what changed.",
    doneHint: "Tap Done when both panels show the change.",
  },
  {
    id: "map_it",
    label: "Map it",
    blurb: "Put the idea on a map.",
    icon: "⌖",
    live: true,
    instructions:
      "Draw a map or pick a library picture as the background. Drop 2–6 pins with short labels to show where or how it connects. Add a caption if you want.",
    doneHint: "Tap Done when your map has pins that tell the story.",
  },
  {
    id: "math_story",
    label: "Math story",
    blurb: "Turn the numbers into a story.",
    icon: "∑",
    live: true,
    instructions:
      "Write a short story that uses the numbers. Show your work in the work box or by drawing. You can add a library picture if it helps.",
    doneHint: "Tap Done when your story and work are clear.",
  },
  {
    id: "interview",
    label: "Interview",
    blurb: "Ask and answer like a reporter.",
    icon: "◈",
    live: true,
    instructions:
      "Fill in 3–5 interview questions and your answers. You can edit the questions. Type your answers in your own words.",
    doneHint: "Tap Done when every question has an answer.",
  },
  {
    id: "sort_of_my_own",
    label: "Sort of my own",
    blurb: "Make your own sorting rule.",
    icon: "⊞",
    live: true,
    instructions:
      "Make 2–4 category labels. Edit or add the item chips, then tap a category to sort each item.",
    doneHint: "Tap Done when every item has a category.",
  },
  {
    id: "teach_the_buddy",
    label: "Teach the Buddy",
    blurb: "Teach S.A.M. so it sticks.",
    icon: "★",
    live: true,
    instructions:
      "Teach the idea in your own words. Tap Ask Buddy for 1–2 check questions, then answer them. Buddy does not grade you.",
    doneHint: "Tap Done when your explanation and answers are ready.",
  },
  {
    id: "paint_what_i_said",
    label: "Paint what I said",
    blurb: "Turn your words into a picture.",
    icon: "◈",
    live: true,
    instructions:
      "Type a short description. Make a picture with AI (up to 2 regenerates), or pick from the library / draw if AI is resting.",
    doneHint: "Tap Done when you have a description and a picture.",
  },
  {
    id: "what_if",
    label: "What if…",
    blurb: "Change one thing and rethink it.",
    icon: "?",
    live: true,
    instructions:
      "Add a What if… twist. Get 2–3 story beats (or write your own), then add your ending line.",
    doneHint: "Tap Done when you have a twist, beats, and an ending.",
  },
  {
    id: "postcard",
    label: "Postcard from then",
    blurb: "Write from another time or place.",
    icon: "✉",
    live: true,
    instructions:
      "Write To, From, and a short message from that time or place. Add a front picture with AI, the library, or a drawing.",
    doneHint: "Tap Done when the fields and front picture are ready.",
  },
];

export function modeById(id) {
  return MAKER_MODES.find((m) => m.id === id) || null;
}

export function liveModeIds() {
  return MAKER_MODES.filter((m) => m.live).map((m) => m.id);
}

/** Only live modes can be enabled for students. Fallback: Write. */
export function sanitizeEnabledModes(list) {
  const wanted = Array.isArray(list) ? list : [];
  const live = new Set(liveModeIds());
  const next = wanted.filter((id) => live.has(id));
  return next.length ? next : ["write"];
}
