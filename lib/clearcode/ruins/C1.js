// ClearCode ruin C1 · long a: a_e (UFLI 54).
// Decodable rule for this ruin: everything from Planets A and B (short vowels,
// plural -s, ff/ll/ss/zz, ck, sh, th, ch, wh, ph, ng, nk, blends) plus a_e,
// plus heart words. No other silent-e vowels yet (i_e, o_e, u_e, e_e come
// next), no soft c/g, no -ed/-ing endings (D1). Checked by
// tools/clearcode-check.cjs.
export default {
  id: "C1",
  name: "The Lake Caves",
  find: "a[^aeiou]e",
  code: { label: "long a: a_e", spellings: ["a_e"], rule: "When a silent e comes after one consonant, the a says its name: cap becomes cape." },
  sort: {
    yes: "Long a vault", yesHint: "cape · gate",
    no: "Short a vault", noHint: "cap · mad",
    hintYes: (w) => `${w} has a, one consonant, then a silent e, so the a says its name.`,
    hintNo: (w) => `${w} has no silent e, so the a is short.`,
  },
  codex: [
    { w: "base", parts: ["b", "ase"], hi: 1 },
    { w: "gate", parts: ["g", "ate"], hi: 1 },
    { w: "cave", parts: ["c", "ave"], hi: 1 },
    { w: "blade", parts: ["bl", "ade"], hi: 1 },
    { w: "frame", parts: ["fr", "ame"], hi: 1 },
    { w: "scrape", parts: ["scr", "ape"], hi: 1 },
  ],
  checks: [
    ["cape", "cap", "cup"], ["tape", "tap", "tip"], ["made", "mad", "mud"],
    ["rate", "rat", "rot"], ["gate", "get", "got"], ["cane", "can", "kin"],
    ["fade", "fad", "fed"], ["shape", "shop", "ship"], ["scrape", "scrap", "strap"],
    ["slate", "slat", "slot"], ["snake", "snack", "snag"], ["spade", "spud", "sped"],
  ],
  vaultPicks: [
    ["mane", "man", "men"], ["pane", "pan", "pin"], ["wade", "wad", "wed"], ["vane", "van", "vat"],
    ["game", "gum", "gem"], ["late", "let", "lot"], ["crane", "cram", "crab"], ["trade", "track", "trap"],
  ],
  bank: ["base", "gate", "cave", "blade", "frame", "scrape", "cape", "tape", "made", "rate", "cane", "fade", "shape", "slate", "snake", "spade", "mane", "pane", "wade", "vane", "game", "late", "crane", "trade", "lake", "wake", "make", "take", "came", "gave", "same", "name", "safe", "wave", "grade", "shade", "flame", "plate", "crate", "plane"],
  contrast: ["cap", "tap", "mad", "rat", "can", "scrap", "snack", "pan", "man", "van", "glad", "crab", "track", "plan", "mat", "back"],
  // Sounds wall: the silent e stays with the consonant before it (no sound of its own).
  wall: {
    mode: "sounds",
    words: [
      { w: "gate", cuts: [1, 2] },
      { w: "cave", cuts: [1, 2] },
      { w: "blade", cuts: [1, 2, 3] },
      { w: "frame", cuts: [1, 2, 3] },
      { w: "shape", cuts: [2, 3] },
      { w: "snake", cuts: [1, 2, 3] },
    ],
  },
  forge: null,
  door: [
    { w: "cave", parts: ["c", "a", "v", "e"], extra: ["i", "o"] },
    { w: "blade", parts: ["b", "l", "a", "d", "e"], extra: ["e", "u"] },
    { w: "shape", parts: ["sh", "a", "p", "e"], extra: ["s", "o"] },
    { w: "flame", parts: ["f", "l", "a", "m", "e"], extra: ["i", "u"] },
    { w: "snake", parts: ["s", "n", "a", "k", "e"], extra: ["ck", "i"] },
    { w: "trade", parts: ["t", "r", "a", "d", "e"], extra: ["o", "e"] },
    { w: "safe", parts: ["s", "a", "f", "e"], extra: ["ff", "u"] },
  ],
  chains: [
    ["cape", "tape", "tame", "game", "gate"],
    ["make", "lake", "late", "lane", "cane"],
  ],
  heart: ["the", "a", "of", "to", "was", "said", "who", "we", "she", "they", "where", "is", "were", "from", "what", "go", "so"],
  vaultFake: [["zape", "zap", "zip"], ["glabe", "glab", "glib"], ["prade", "prad", "prod"], ["snabe", "snab", "snub"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "Tam and Kit came to a black lake at the base of a cliff. Past the lake was a cave. A gate of slate shut the cave. A shape was cut in the gate, a flame in a ring. \"Who made this gate?\" said Kit. \"Can we get in?\" Tam set a hand on the gate and gave it a tug. It did not shift.",
    },
    {
      title: "Crew log 2",
      text: "Kit held a lamp up to the gate. Next to the flame were six shapes: a snake, a crane, a wave, a lake, a spade, and a blade. \"It is a lock,\" said Tam. \"We must tap the shapes, but in what set?\" Kit hit the snake, the wave, and the blade. Click, click, click. The gate did not shift. Kit sat on a slab to think.",
    },
    {
      title: "Crew log 3",
      text: "Tam rubs the mud off the base of the gate with a rag. At the base is a lake shape with a flame on top of it. \"The flame is on the lake,\" said Tam. \"So we tap the lake, then the flame.\" Kit taps the lake. Then she taps the flame. Clank! The gate shakes. Dust and grit drop from the top. Then the gate swings back, and a damp gust hits them.",
    },
    {
      title: "Crew log 4",
      text: "At the back of the cave is a hall, and in the hall is a slab. On the slab is a thin slate plate. Kit lifts it up to the lamp. Cut in the plate is a map: the lake, the cave, and a path that sinks to a vast grid of shapes. \"A grid of halls,\" said Kit. \"Who made all this, and where did they go?\" Tam takes the plate. \"We will track them,\" said Tam.",
    },
  ],
  relic: { name: "The Slate Plate", caption: "A thin slate plate with a map cut in it: the lake, the cave, and a path down to a grid of halls." },
  story: "Behind a slate gate in the lake caves, the crew solves a shape lock and finds a map that points down to a hidden grid of halls.",
  spanish: "Spanish has no silent e: every e is said, so students may read cape as two syllables (ca-pe). The long a sound is close to Spanish ei, as in 'rey'.",
  miniLesson: {
    title: "Long a: a_e (cap, cape)",
    steps: [
      "Write cap. Read it. Add an e to make cape. Say: the e is silent, but it makes the a say its name.",
      "Read pairs together: tap/tape, mad/made, scrap/scrape. Point to the e each time.",
      "Say a word (gate, gas, lake, lack). Students show a thumb up if they hear long a.",
      "Build shape with letter cards, then swap one letter: shape, shade, blade, blame.",
      "Read together: \"Kit came to the gate of the cave.\"",
    ],
  },
};
