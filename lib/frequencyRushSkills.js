// Sept 24, 2026 — Frequency Rush skill sets (design: FrequencyRush_Fluency_Expansion_v1.md §11.4).
//
// A skill set is a TEKS-coded group of fast questions that a teacher assigns
// like any other Frequency Rush case. It has a row in `cases` (engine
// "frequency_rush"), and its `standard` is the key into SKILL_SETS below.
//
// GENERATED sets (these math facts) have no written content. The questions
// are built by code at run start and handed to the run game as `sort_bins`
// items, a type every world skin already supports: one prompt plus its own
// 2-6 answer buttons. The game file is not changed.
//
// Grading stays server-side. Every item id encodes its own question
// ("mul:7x8"), so the submit route recomputes the answer from the id instead
// of trusting the client. An id that does not belong to the assigned set
// (wrong operation, operands out of range) is ignored.
//
// Wrong answers are real near misses, never random numbers: the neighboring
// fact, the wrong operation, the swapped digits, and so on (project rule:
// distractors target real misconceptions).

const FACT_MIN = 1;
const FACT_MAX = 10;

// How many items to hand the game per run. The game draws its own rounds
// (10 by default) at random from this pool, so a pool bigger than one run
// keeps replays from repeating.
export const SKILL_POOL_SIZE = 24;

const OPS = {
  mul: {
    symbol: "×",
    answer: (a, b) => a * b,
    prompt: (a, b) => `${a} × ${b} = ?`,
    key: (a, b) => `mul:${a}x${b}`,
  },
  div: {
    // a = divisor, b = quotient; the dividend is a*b. Stored as "div:56/8".
    symbol: "÷",
    answer: (a, b) => b,
    prompt: (a, b) => `${a * b} ÷ ${a} = ?`,
    key: (a, b) => `div:${a * b}/${a}`,
  },
  add: {
    symbol: "+",
    answer: (a, b) => a + b,
    prompt: (a, b) => `${a} + ${b} = ?`,
    key: (a, b) => `add:${a}+${b}`,
  },
  sub: {
    // a = the part being subtracted, b = the answer; the whole is a+b. Stored as "sub:15-8".
    symbol: "−",
    answer: (a, b) => b,
    prompt: (a, b) => `${a + b} − ${a} = ?`,
    key: (a, b) => `sub:${a + b}-${a}`,
  },
};

// Keyed by the case's `standard` (the row in `cases`). Titles and the
// learning target also live in the SQL that creates the rows.
export const SKILL_SETS = {
  "MA.3.4F-FR-MUL": { title: "Multiplication Facts to 10 × 10", ops: ["mul"], kind: "facts" },
  "MA.3.4F-FR-DIV": { title: "Division Facts", ops: ["div"], kind: "facts" },
  "MA.3.4F-FR-MIX": { title: "Multiplication and Division Facts", ops: ["mul", "div"], kind: "facts" },
  "MA.3.4A-FR-ADD": { title: "Addition Facts (Foundation)", ops: ["add"], kind: "facts" },
  "MA.3.4A-FR-SUB": { title: "Subtraction Facts (Foundation)", ops: ["sub"], kind: "facts" },
  "MA.3.4A-FR-MIX": { title: "Addition and Subtraction Facts (Foundation)", ops: ["add", "sub"], kind: "facts" },
};

// What the run game's header says during a skill round. The game's own
// sort_bins wording ("Sort the Bins" / "Which bin does this belong in?")
// doesn't fit a math fact, so the host page relabels those three spots.
// See FrequencyRushClient.js (relabelSkillRounds).
export const SKILL_ROUND_LABELS = {
  facts: { format: "MATH FACTS", encounter: "RAPID SIGNAL", instruction: "Pick the answer." },
};

export function getSkillSet(standard) {
  return SKILL_SETS[String(standard || "").trim()] || null;
}

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function swapDigits(n) {
  if (n < 10 || n > 99) return null;
  const s = String(n);
  if (s[0] === s[1]) return null;
  const swapped = Number(s[1] + s[0]);
  return swapped === n ? null : swapped;
}

// Two lists per operation: "close" misses (the neighboring fact, one off)
// and "trap" misses (wrong operation, swapped digits, the other number in
// the problem). A question gets two close misses and one trap when it can.
function distractorCandidates(op, a, b) {
  const ans = OPS[op].answer(a, b);
  if (op === "mul") {
    return {
      close: [a * (b + 1), a * (b - 1), (a + 1) * b, (a - 1) * b],
      trap: [a + b, swapDigits(ans), ans + 10, ans - 10, ans + 1, ans - 1],
    };
  }
  if (op === "div") {
    const whole = a * b;
    return {
      close: [b + 1, b - 1],
      trap: [a, whole - a, b + 2, b - 2],
    };
  }
  if (op === "add") {
    return {
      close: [ans + 1, ans - 1],
      trap: [Math.abs(a - b), ans + 10, ans - 10, ans + 2, ans - 2],
    };
  }
  // sub: whole = a + b, answer b, the subtracted part a is a classic trap.
  const whole = a + b;
  return {
    close: [b + 1, b - 1],
    trap: [a, whole + a, b + 2, b - 2],
  };
}

function pickDistractors(op, a, b) {
  const ans = OPS[op].answer(a, b);
  const ok = (n) => Number.isInteger(n) && n >= 0 && n <= 110 && n !== ans;
  const { close, trap } = distractorCandidates(op, a, b);
  const chosen = [];
  const add = (n) => {
    if (ok(n) && !chosen.includes(n)) chosen.push(n);
  };
  shuffle(close.filter(ok)).slice(0, 2).forEach(add);
  shuffle(trap.filter(ok)).forEach((n) => {
    if (chosen.length < 3) add(n);
  });
  // Fallback for tiny facts (1 × 1, 1 + 1) where the lists run dry.
  for (let k = 1; chosen.length < 3 && k < 20; k++) {
    add(ans + k);
    if (chosen.length < 3) add(ans - k);
  }
  return chosen.slice(0, 3);
}

function buildItem(op, a, b) {
  const def = OPS[op];
  const ans = def.answer(a, b);
  const values = shuffle([ans, ...pickDistractors(op, a, b)]);
  return {
    type: "sort_bins",
    id: def.key(a, b),
    prompt: def.prompt(a, b),
    bins: values.map((v) => ({ id: String(v), label: String(v) })),
    correctBinId: String(ans),
    shuffleBins: false, // already shuffled here
    bankId: `skill:${op}`,
    metadata: { skill: op },
  };
}

// Builds this run's question pool. Operations in a mixed set are split
// evenly, and no fact repeats within one pool.
export function buildSkillItems(standard, poolSize = SKILL_POOL_SIZE) {
  const set = getSkillSet(standard);
  if (!set) return [];
  const items = [];
  const seen = new Set();
  let guard = 0;
  while (items.length < poolSize && guard < poolSize * 50) {
    guard += 1;
    const op = set.ops[items.length % set.ops.length];
    const a = randInt(FACT_MIN, FACT_MAX);
    const b = randInt(FACT_MIN, FACT_MAX);
    const item = buildItem(op, a, b);
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    items.push(item);
  }
  return shuffle(items);
}

// Parses an item id back into its question and answer. Returns null for
// anything malformed, out of range, or not part of the assigned set, so a
// forged id is ignored rather than graded.
export function recomputeSkillItem(standard, itemId) {
  const set = getSkillSet(standard);
  if (!set) return null;
  const id = String(itemId || "");
  const inRange = (n) => Number.isInteger(n) && n >= FACT_MIN && n <= FACT_MAX;
  let m;
  let op = null;
  let a;
  let b;
  if ((m = id.match(/^mul:(\d+)x(\d+)$/))) {
    op = "mul";
    a = Number(m[1]);
    b = Number(m[2]);
  } else if ((m = id.match(/^div:(\d+)\/(\d+)$/))) {
    op = "div";
    const whole = Number(m[1]);
    a = Number(m[2]);
    if (!a || whole % a !== 0) return null;
    b = whole / a;
  } else if ((m = id.match(/^add:(\d+)\+(\d+)$/))) {
    op = "add";
    a = Number(m[1]);
    b = Number(m[2]);
  } else if ((m = id.match(/^sub:(\d+)-(\d+)$/))) {
    op = "sub";
    const whole = Number(m[1]);
    a = Number(m[2]);
    b = whole - a;
  } else {
    return null;
  }
  if (!set.ops.includes(op) || !inRange(a) || !inRange(b)) return null;
  return { id, op, a, b, correctBinId: String(OPS[op].answer(a, b)), prompt: OPS[op].prompt(a, b) };
}
