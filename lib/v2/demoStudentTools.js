// CI2.0 Student Tools stub — read-aloud (fake), word chips, highlight.
// Same-browser localStorage only. No TTS / OCR / real highlighter engine.

export const STUDENT_TOOLS_HREF = "/v2/student/tools";
export const STUDENT_TOOLS_KEY = "ci2.student.tools";

/** Demo word chips — calm vocab helpers for G3–5 stub. */
export const DEMO_WORD_CHIPS = [
  { id: "w-equal", word: "equal", hint: "same amount / same value" },
  { id: "w-fraction", word: "fraction", hint: "part of a whole" },
  { id: "w-purpose", word: "purpose", hint: "why the author wrote it" },
  { id: "w-evidence", word: "evidence", hint: "proof from the text or work" },
];

const DEFAULT_STATE = {
  readAloudPlaying: false,
  readAloudLastAt: null,
  selectedChipId: null,
  highlightOn: false,
  highlightColor: "amber",
};

function notifyToolsUpdated() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("ci2-student-tools-updated"));
  } catch {
    /* ignore */
  }
}

export function loadStudentTools() {
  if (typeof window === "undefined") return { ...DEFAULT_STATE };
  try {
    const raw = window.localStorage.getItem(STUDENT_TOOLS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== "object") return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveStudentTools(patch) {
  if (typeof window === "undefined") return loadStudentTools();
  const next = { ...loadStudentTools(), ...(patch || {}) };
  try {
    window.localStorage.setItem(STUDENT_TOOLS_KEY, JSON.stringify(next));
    notifyToolsUpdated();
  } catch {
    /* ignore quota */
  }
  return next;
}

export function toggleReadAloudFake() {
  const cur = loadStudentTools();
  const playing = !cur.readAloudPlaying;
  return saveStudentTools({
    readAloudPlaying: playing,
    readAloudLastAt: playing ? new Date().toISOString() : cur.readAloudLastAt,
  });
}

export function selectWordChip(chipId) {
  const cur = loadStudentTools();
  const nextId = cur.selectedChipId === chipId ? null : chipId;
  return saveStudentTools({ selectedChipId: nextId });
}

export function toggleHighlightStub() {
  const cur = loadStudentTools();
  return saveStudentTools({ highlightOn: !cur.highlightOn });
}

export function wordChipById(id) {
  return DEMO_WORD_CHIPS.find((c) => c.id === id) || null;
}
