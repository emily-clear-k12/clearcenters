// ClearCode ruin F3 · er, ir, ur (UFLI 80-81).
// er, ir and ur are taught as one sound, /er/. Inscriptions use only patterns
// taught up to F3 (short vowels, consonant teams, blends, silent e, soft c and
// g, endings -es/-ed/-ing, syllables, tch/dge, -ild/-old, y, -le, ar, or/ore,
// er/ir/ur) plus heart words. No w + or as /er/ yet (F4), no vowel teams, no
// doubled-consonant endings. Checked by tools/clearcode-check.cjs.
export default {
  id: "F3",
  name: "Thunder Ridge",
  find: "er|ir|ur",
  code: { label: "/er/", spellings: ["er", "ir", "ur"], rule: "er, ir and ur all say the same sound, /er/, as in fern, bird and turn." },
  sort: {
    yes: "/er/ vault", yesHint: "fern · bird · turn",
    no: "Short vowel vault", noHint: "fist · hut",
    hintYes: (w) => `${w} has er, ir or ur, and all three say /er/.`,
    hintNo: (w) => `${w} has no r after the vowel, so the vowel is short.`,
  },
  codex: [
    { w: "fern", parts: ["f", "er", "n"], hi: 1 },
    { w: "stern", parts: ["st", "er", "n"], hi: 1 },
    { w: "swirl", parts: ["sw", "ir", "l"], hi: 1 },
    { w: "thirst", parts: ["th", "ir", "st"], hi: 1 },
    { w: "turn", parts: ["t", "ur", "n"], hi: 1 },
    { w: "churn", parts: ["ch", "ur", "n"], hi: 1 },
  ],
  checks: [
    ["fern", "fan", "fin"], ["bird", "bid", "bad"], ["burn", "bun", "barn"],
    ["hurt", "hut", "heart"], ["stern", "stem", "stain"], ["chirp", "chip", "chap"],
    ["curb", "cub", "carb"], ["germ", "gem", "gum"], ["dirt", "dart", "dot"],
    ["surf", "sun", "scarf"], ["herd", "hard", "hid"], ["stir", "star", "sit"],
  ],
  vaultPicks: [
    ["shirt", "shot", "short"], ["return", "retain", "retina"], ["third", "thud", "thick"],
    ["swirl", "swill", "swim"], ["churn", "chin", "charm"], ["skirt", "skit", "skate"],
    ["nurse", "nose", "nuts"], ["thunder", "thumb", "thud"],
  ],
  bank: ["fern", "stern", "herd", "germ", "her", "perch", "swirl", "thirst", "bird", "dirt", "first", "third", "stir", "shirt", "skirt", "chirp", "firm", "turn", "churn", "burn", "hurt", "curb", "surf", "burst", "nurse", "purse", "curl", "hurl", "thunder", "after", "under", "perfect", "return", "surface", "copper", "silver", "turret", "sunburst", "person", "number"],
  contrast: ["fist", "hut", "bun", "chip", "stem", "cub", "bid", "sit", "gem", "ten", "bust", "spun", "hen", "cut"],
  wall: {
    mode: "syllables",
    words: [
      { w: "thunder", cuts: [3] },
      { w: "surface", cuts: [3] },
      { w: "return", cuts: [2] },
      { w: "perfect", cuts: [3] },
      { w: "sunburst", cuts: [3] },
      { w: "person", cuts: [3] },
    ],
  },
  forge: {
    items: [
      { w: "bursting", clue: "breaking open right now", parts: ["burst", "ing"], explain: "burst + ing. The ending -ing means it is happening now." },
      { w: "swirled", clue: "spun around, already done", parts: ["swirl", "ed"], explain: "swirl + ed. The ending -ed means it already happened." },
      { w: "turns", clue: "more than one turn", parts: ["turn", "s"], explain: "turn + s. The ending -s means more than one." },
      { w: "surfer", clue: "a person who surfs", parts: ["surf", "er"], explain: "surf + er. The ending -er can mean a person who does something." },
      { w: "perches", clue: "more than one perch", parts: ["perch", "es"], explain: "perch + es. Words that end in ch take -es for more than one." },
    ],
    extra: [{ t: "ed", k: "suf" }, { t: "fern", k: "base" }, { t: "churn", k: "base" }],
  },
  door: [
    { w: "fern", parts: ["f", "er", "n"], extra: ["ir", "ur"] },
    { w: "third", parts: ["th", "ir", "d"], extra: ["er", "ur"] },
    { w: "turn", parts: ["t", "ur", "n"], extra: ["er", "ir"] },
    { w: "herd", parts: ["h", "er", "d"], extra: ["ur", "ir"] },
    { w: "dirt", parts: ["d", "ir", "t"], extra: ["ur", "er"] },
    { w: "churn", parts: ["ch", "ur", "n"], extra: ["er", "ir"] },
    { w: "surf", parts: ["s", "ur", "f"], extra: ["er", "ir"] },
  ],
  chains: [
    ["burst", "burnt", "burns", "turns", "terns"],
    ["hurl", "curl", "curb", "curt"],
  ],
  heart: ["the", "said", "was", "there", "where", "he", "they", "we", "to", "do", "of", "from"],
  vaultFake: [["plurn", "plun", "plarn"], ["glerm", "glem", "glarm"], ["sirb", "sib", "sarb"], ["frurt", "frut", "frart"]],
  inscriptions: [
    {
      title: "Ridge log 1",
      text: "At sunrise, we set off for the north ridge. The path went up and up. Dirt and rocks slid under us, and far off, thunder cracked. Gus got to the top first. \"There is a turret up here!\" he said. It was a tall stone turret, with a spike on its top. Mel said, \"A turret on a ridge. It is the perfect spot to track storms.\"",
    },
    {
      title: "Ridge log 2",
      text: "The turret had a stern stone gate. Gus and Tam had to turn a big crank to get it open. Inside, stone steps went up in a swirl. At the top was a stand, and on the stand was a copper fern on a thin stem. As thunder burst over the ridge, the copper fern turned on its stem, all by itself.",
    },
    {
      title: "Ridge log 3",
      text: "Kit said, \"The fern turns to face the storm.\" We kept track of it until sunset. Every time the fern turned, a storm hit the ridge from that side just after. Mel said, \"It did not turn with the wind. It turned first. The fern can tell where the next storm will burst.\" Sam ran a scan. The fern was not just copper. Under the copper was a thin net of silver wires. It was a sensor, and it still ran.",
    },
    {
      title: "Ridge log 4",
      text: "Gus said, \"The makers did not hide from storms. They kept track of them, the same as we do.\" Mel held the copper fern with a firm grip and lifted it from its stand. Under it was a thin metal plate. On the plate, the makers had cut a ship, the same ship as on the horn. Next to it was a line that went under the ridge. Kit said, \"There is more to this ridge. We must return with a drill.\"",
    },
  ],
  relic: { name: "The Copper Fern", caption: "A copper fern on a turning stem. It swung to face the next storm before the storm hit." },
  story: "On a ridge above the storm fort, the crew finds the builders' storm sensor, a copper fern, and a plate that shows their ship again with a line leading under the ridge.",
  spanish: "Spanish has no /er/ vowel, and in Spanish each vowel keeps its own sound, so students may read first as \"feerst\" or turn as \"toorn.\" Teach that er, ir and ur all say one sound, /er/, and practice hearing it.",
  miniLesson: {
    title: "/er/: er, ir, ur",
    steps: [
      "Write fern, bird, turn. Underline er, ir, ur. Say: three spellings, one sound, /er/.",
      "Say /er/ together. Lips a little round, tongue pulled back, no other vowel sound.",
      "Read pairs, pointing to the vowel: fist, first; hut, hurt; stem, stern.",
      "Dictate 3 words (turn, dirt, fern). Students write them; check which spelling they chose and show the right one.",
      "Read one sentence together: \"Thunder burst over the ridge, and the fern turned first.\"",
    ],
  },
};
