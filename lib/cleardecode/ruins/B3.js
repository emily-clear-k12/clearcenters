// ClearDecode ruin B3 · sh, th (UFLI 45-47).
// Decodable rule for this ruin: single consonants, all short vowels, plural
// and verb -s, ff/ll/ss/zz and all/oll/ull (B1), ck (B2), plus sh and th
// (both the th in thin and the th in this), plus heart words. No ch, wh, ph,
// ng, nk yet, no blends (they come at B6). Checked by tools/cleardecode-check.cjs.
export default {
  id: "B3",
  name: "The Ash Hills",
  find: "sh|th",
  code: { label: "sh, th", spellings: ["sh", "th"], rule: "Two letters, one sound: sh as in shed, th as in thin and this" },
  sort: {
    yes: "sh and th vault", yesHint: "shed · thin",
    no: "One letter vault", noHint: "sad · tin",
    hintYes: (w) => `${w} has sh or th: two letters that make one sound.`,
    hintNo: (w) => `${w} has no sh or th. Each letter makes its own sound.`,
  },
  codex: [
    { w: "shed", parts: ["sh", "e", "d"], hi: 0 },
    { w: "rush", parts: ["r", "u", "sh"], hi: 2 },
    { w: "thud", parts: ["th", "u", "d"], hi: 0 },
    { w: "math", parts: ["m", "a", "th"], hi: 2 },
    { w: "thin", parts: ["th", "i", "n"], hi: 0 },
    { w: "ash", parts: ["a", "sh"], hi: 1 },
  ],
  checks: [
    ["shop", "hop", "top"], ["shed", "fed", "bed"], ["shin", "sin", "tin"],
    ["shut", "hut", "nut"], ["dish", "dim", "dig"], ["rush", "rut", "rug"],
    ["thin", "tin", "fin"], ["thud", "dud", "mud"], ["math", "mat", "map"],
    ["moth", "mop", "mob"], ["bath", "bat", "bad"], ["cash", "cat", "cap"],
  ],
  vaultPicks: [
    ["shell", "sell", "bell"], ["mash", "mat", "mad"], ["gush", "gum", "gut"], ["thick", "tick", "kick"],
    ["with", "wit", "win"], ["shack", "sack", "hack"], ["mesh", "met", "men"], ["then", "ten", "hen"],
  ],
  bank: ["shed", "rush", "thud", "math", "thin", "ash", "shop", "shin", "shut", "dish", "moth", "bath", "cash", "shell", "mash", "gush", "thick", "with", "shack", "mesh", "then", "them", "this", "that", "than", "fish", "wish", "dash", "hush", "mush", "rash", "gash", "lash", "shock", "ship", "path", "shall", "thus", "hash"],
  contrast: ["sin", "tin", "hip", "sip", "hat", "mat", "tug", "sub", "sun", "tab", "tap", "sat", "hen", "pat", "fin", "dud"],
  wall: {
    mode: "sounds",
    words: [
      { w: "shed", cuts: [2, 3] },
      { w: "rush", cuts: [1, 2] },
      { w: "thud", cuts: [2, 3] },
      { w: "math", cuts: [1, 2] },
      { w: "thin", cuts: [2, 3] },
      { w: "shell", cuts: [2, 3] },
    ],
  },
  forge: null,
  door: [
    { w: "shed", parts: ["sh", "e", "d"], extra: ["s", "ch"] },
    { w: "dish", parts: ["d", "i", "sh"], extra: ["s", "ch"] },
    { w: "thin", parts: ["th", "i", "n"], extra: ["t", "f"] },
    { w: "math", parts: ["m", "a", "th"], extra: ["t", "f"] },
    { w: "shut", parts: ["sh", "u", "t"], extra: ["s", "ch"] },
    { w: "moth", parts: ["m", "o", "th"], extra: ["t", "f"] },
    { w: "rush", parts: ["r", "u", "sh"], extra: ["s", "ch"] },
  ],
  chains: [
    ["shop", "ship", "shin", "thin", "than"],
    ["dish", "dash", "mash", "math", "moth"],
  ],
  heart: ["the", "a", "said", "was", "to", "of", "as", "has", "his", "and", "is", "are", "we", "go", "who", "they"],
  vaultFake: [["shub", "sub", "thub"], ["thig", "tig", "shig"], ["vosh", "vos", "voth"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "Back at the lab, the tick box sat on a dish. Tick, tick, tick. Then the ticks shut off. Thud! The lid shot up. In the box was a thin rod. On the rod was a path of dots. \"This is a map,\" said Mel. \"It is a path to the ash hills.\" Gus got his pack. \"Then we go to the ash hills,\" said Gus.",
    },
    {
      title: "Crew log 2",
      text: "The ash hills are hot. The ash is thick, up to Gus's shins. Kit has the rod, and the dots on it tell us the path. Up this hill, then up that hill. Then Kit said, \"Hush! Is that a shack?\" On the top of a hill was a tin shack, and ash was on it. \"This shack is the top dot on the rod,\" said Kit.",
    },
    {
      title: "Crew log 3",
      text: "The shack was not shut. Mel and Tam got in. It was dim and hot. In the shack was a ship! It was thin, as thin as a fish, with fins on its hull. Ash was on the hull. Mel got the ash off with a rag. On the hull was the path of dots on the rod. But on the hull, the path ran on. It ran up, up, up, to the sun. \"Did this ship go to the sun?\" said Tam.",
    },
    {
      title: "Crew log 4",
      text: "Gus and Kit got in the ship. On the top of the hull, in a lid, was a dish. Gus got the dish off. The dish had a path cut in it. The path ran up to the sun, and then on to a dot, then a dot, then a dot, on and on. \"This is not a map of the hills,\" said Gus. \"It is a path off this rock.\" Tam set the dish in a sack with the bell and the tick box. Who cut this path? And did they go on it?",
    },
  ],
  relic: { name: "The Path Dish", caption: "A thin dish from a small ship in the ash. The path cut in it runs past the sun, from dot to dot." },
  story: "The Tick Box opens to show a path of dots that leads the crew across the ash hills to a small ship and a dish with a path that runs off the planet.",
  spanish: "Spanish has no /sh/ sound in most regions, and Latin American Spanish has no th sound, so students may say /ch/ for sh and /t/ or /d/ for th. Practice the mouth: lips pushed out for sh, tongue between the teeth for th.",
  miniLesson: {
    title: "sh and th: two letters, one sound",
    steps: [
      "Write shed and thin. Underline sh and th. Say: two letters, one sound.",
      "Show the mouth: lips out and round for /sh/ (shed); tongue peeks out between teeth for /th/ (thin, this).",
      "Read pairs: sin / shin, tin / thin, mat / math. Students point to the word with the team.",
      "Dictate 3 words (dish, moth, shut). Students say each sound, then write sh or th as one chip.",
      "Read together: \"The ship in the shed had a thin dish.\"",
    ],
  },
};
