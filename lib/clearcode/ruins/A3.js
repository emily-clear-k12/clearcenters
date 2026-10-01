// ClearCode ruin A3 · short u (UFLI 39). Sample ruin, written in full.
// Decodable rule for this ruin: single consonants, short a, i, o, u, plural -s,
// plus heart words. No short e yet (UFLI teaches it next), no blends, no
// digraphs. Checked by tools/clearcode-check.cjs.
export default {
  id: "A3",
  name: "Mud Flats",
  find: "u",
  code: { label: "short u", spellings: ["u"], rule: "u closed in by consonants says /u/, as in cup" },
  sort: {
    yes: "Short u vault", yesHint: "cup · mud",
    no: "Other vowels vault", noHint: "cap · mid",
    hintYes: (w) => `${w} has u closed in by consonants, so it says /u/.`,
    hintNo: (w) => `${w} has no u. Read the vowel again.`,
  },
  codex: [
    { w: "hub", parts: ["h", "u", "b"], hi: 1 },
    { w: "mud", parts: ["m", "u", "d"], hi: 1 },
    { w: "cup", parts: ["c", "u", "p"], hi: 1 },
    { w: "sub", parts: ["s", "u", "b"], hi: 1 },
    { w: "rug", parts: ["r", "u", "g"], hi: 1 },
    { w: "sun", parts: ["s", "u", "n"], hi: 1 },
  ],
  checks: [
    ["cup", "cap", "cop"], ["rug", "rag", "rig"], ["mud", "mad", "mid"],
    ["tug", "tag", "tog"], ["sun", "sin", "sat"], ["bug", "bag", "big"],
    ["nut", "not", "nit"], ["hut", "hot", "hit"], ["gum", "gas", "gift"],
    ["tub", "tab", "tib"], ["run", "ran", "rim"], ["bus", "bass", "bits"],
  ],
  vaultPicks: [
    ["jug", "jog", "jig"], ["pup", "pop", "pip"], ["rut", "rat", "rot"], ["sub", "sob", "sib"],
    ["hum", "ham", "him"], ["fun", "fan", "fin"], ["dug", "dog", "dig"], ["but", "bat", "bit"],
  ],
  bank: ["hub", "sub", "rug", "mud", "bus", "cup", "cut", "nut", "tug", "up", "run", "sun", "fun", "but", "hut", "dug", "mug", "jug", "gum", "hum", "bug", "rub", "tub", "sum", "bun", "pup", "rut", "cub", "dub", "gut"],
  contrast: ["hob", "hip", "rag", "mad", "cap", "cot", "not", "tag", "ran", "fan", "bit", "hat", "dig", "mop", "jog", "him"],
  game: { decoys: ["hob", "hip", "rag", "mad", "cap", "cot", "not", "tag", "ran", "fan", "bit", "hat", "dig", "mop", "jog", "him"] },
  wall: {
    mode: "sounds",
    words: [
      { w: "hub", cuts: [1, 2] },
      { w: "mud", cuts: [1, 2] },
      { w: "cup", cuts: [1, 2] },
      { w: "tug", cuts: [1, 2] },
      { w: "sun", cuts: [1, 2] },
      { w: "rut", cuts: [1, 2] },
    ],
  },
  forge: null,
  door: [
    { w: "hub", parts: ["h", "u", "b"], extra: ["o", "a"] },
    { w: "mud", parts: ["m", "u", "d"], extra: ["a", "i"] },
    { w: "cup", parts: ["c", "u", "p"], extra: ["a", "o"] },
    { w: "tug", parts: ["t", "u", "g"], extra: ["a", "i"] },
    { w: "sun", parts: ["s", "u", "n"], extra: ["i", "o"] },
    { w: "bus", parts: ["b", "u", "s"], extra: ["a", "i"] },
    { w: "rug", parts: ["r", "u", "g"], extra: ["a", "o"] },
  ],
  chains: [
    ["hub", "hug", "mug", "mud", "bud"],
    ["cup", "cut", "hut", "hat", "bat"],
  ],
  heart: ["the", "said", "was", "to", "of", "his", "has", "as", "and", "is", "I"],
  vaultFake: [["gub", "gab", "gib"], ["nuz", "naz", "noz"], ["vum", "vam", "vim"], ["sut", "sat", "sit"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "Gus and Tam dug in the mud. Tam hit a big tub. \"Is it a hut?\" said Gus. Tam dug and dug. It was not a hut. It was a sub! The sub was up to its top in mud.",
    },
    {
      title: "Crew log 2",
      text: "Gus got a rug. Tam got a cup of gum. The gum was to fix a cut in the sub. Tam dabs gum on the cut. Gus has to tug the rug as Tam sits in the sub. Can it run?",
    },
    {
      title: "Crew log 3",
      text: "The sub can run! Hum, hum, hum. Gus and Tam zip up and up. The sun is hot. Gus has a jug of pop. \"Yum,\" said Tam. Tam has a cup. The sub hums as it runs.",
    },
    {
      title: "Crew log 4",
      text: "At the top, the sub hit a rut. In the rut was a tin box. In the box was a cup. It had six suns cut on its rim. \"A sun cup!\" said Tam. Gus and Tam got in the sub. Up, up, up to the lab!",
    },
  ],
  relic: { name: "The Sun Cup", caption: "A tin cup with six suns cut on its rim, left in the mud by the first travelers." },
  story: "Digging in the mud flats, the crew uncovers a buried sub that still runs, and the first sign that someone traveled here long ago.",
  spanish: "Spanish u always says /oo/ (as in 'luna'). The short u in cup does not exist in Spanish, so give extra practice hearing cup vs. cop vs. cap.",
  miniLesson: {
    title: "Short u: cup, mud, sun",
    steps: [
      "Say /u/ together. Mouth relaxed, a short grunt: up, us, cup.",
      "Write cup, cap, cop in a column. Read them, pointing to the vowel each time.",
      "Say a word (hut, hot, hit). Students hold up the vowel card they hear.",
      "Build mud, then change one letter at a time: mud, mug, hug, hub.",
      "Read together: \"Gus dug in the mud with a cup.\"",
    ],
  },
};
