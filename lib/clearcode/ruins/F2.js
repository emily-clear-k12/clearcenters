// ClearCode ruin F2 · or, ore (UFLI 78-79).
// Inscriptions use only patterns taught up to F2 (short vowels, consonant
// teams, blends, silent e, soft c and g, endings -es/-ed/-ing, syllables,
// tch/dge, -ild/-old, y, -le, ar, or/ore) plus heart words. No er/ir/ur yet,
// no vowel teams, no doubled-consonant endings. Checked by tools/clearcode-check.cjs.
export default {
  id: "F2",
  name: "Storm Fort",
  find: "ore|or",
  code: { label: "/or/", spellings: ["or", "ore"], rule: "or says /or/, as in fort. At the end of a word, ore says /or/ too, and the e is silent, as in shore." },
  sort: {
    yes: "/or/ vault", yesHint: "fort · shore",
    no: "Short o vault", noHint: "fog · shot",
    hintYes: (w) => `${w} has or or ore, so the o says /or/.`,
    hintNo: (w) => `${w} has no r after the o, so the o is short.`,
  },
  codex: [
    { w: "fort", parts: ["f", "or", "t"], hi: 1 },
    { w: "horn", parts: ["h", "or", "n"], hi: 1 },
    { w: "north", parts: ["n", "or", "th"], hi: 1 },
    { w: "torch", parts: ["t", "or", "ch"], hi: 1 },
    { w: "shore", parts: ["sh", "ore"], hi: 1 },
    { w: "explore", parts: ["ex", "pl", "ore"], hi: 2 },
  ],
  checks: [
    ["fort", "fit", "foot"], ["sport", "spot", "spat"], ["short", "shot", "shirt"],
    ["torch", "touch", "tech"], ["corn", "con", "cane"], ["north", "notch", "nose"],
    ["shore", "shot", "share"], ["more", "mop", "mare"], ["snore", "snob", "snare"],
    ["thorn", "than", "then"], ["form", "foam", "farm"], ["scorch", "scotch", "scratch"],
  ],
  vaultPicks: [
    ["orbit", "robin", "rabbit"], ["explore", "explode", "expire"], ["store", "stone", "stare"],
    ["port", "pot", "part"], ["horse", "house", "hose"], ["chore", "chose", "chair"],
    ["born", "barn", "bun"], ["torn", "ton", "tan"],
  ],
  bank: ["fort", "horn", "north", "shore", "torch", "explore", "fork", "sport", "short", "corn", "more", "snore", "thorn", "form", "scorch", "store", "port", "horse", "chore", "born", "torn", "sort", "storm", "core", "orbit", "porch", "cord", "score", "before", "record", "forget", "import", "shortcut", "forklift", "morning", "sore", "cork"],
  contrast: ["fog", "spot", "shot", "con", "not", "pot", "mop", "top", "cot", "shop", "notch", "flop", "stop", "plot", "chop", "rot"],
  wall: {
    mode: "syllables",
    words: [
      { w: "orbit", cuts: [2] },
      { w: "forklift", cuts: [4] },
      { w: "explore", cuts: [2] },
      { w: "import", cuts: [2] },
      { w: "shortcut", cuts: [5] },
      { w: "forget", cuts: [3] },
    ],
  },
  forge: {
    items: [
      { w: "storms", clue: "more than one storm", parts: ["storm", "s"], explain: "storm + s. The ending -s means more than one." },
      { w: "torches", clue: "more than one torch", parts: ["torch", "es"], explain: "torch + es. Words that end in ch take -es for more than one." },
      { w: "sorted", clue: "put into groups, already done", parts: ["sort", "ed"], explain: "sort + ed. The ending -ed means it already happened." },
      { w: "scorching", clue: "burning hot right now", parts: ["scorch", "ing"], explain: "scorch + ing. The ending -ing means it is happening now." },
      { w: "horns", clue: "more than one horn", parts: ["horn", "s"], explain: "horn + s. The ending -s means more than one." },
    ],
    extra: [{ t: "es", k: "suf" }, { t: "fort", k: "base" }, { t: "port", k: "base" }],
  },
  door: [
    { w: "fork", parts: ["f", "or", "k"], extra: ["ar", "ore"] },
    { w: "north", parts: ["n", "or", "th"], extra: ["ar", "ore"] },
    { w: "shore", parts: ["sh", "ore"], extra: ["or", "ar"] },
    { w: "sport", parts: ["s", "p", "or", "t"], extra: ["ar", "ore"] },
    { w: "torch", parts: ["t", "or", "ch"], extra: ["ar", "ore"] },
    { w: "more", parts: ["m", "ore"], extra: ["or", "ar"] },
    { w: "corn", parts: ["c", "or", "n"], extra: ["ar", "ore"] },
  ],
  chains: [
    ["fort", "port", "sort", "sore", "more"],
    ["horn", "born", "corn", "cord", "cork"],
  ],
  heart: ["the", "said", "was", "of", "were", "some", "they", "we", "so", "to", "one", "go", "from"],
  vaultFake: [["glort", "glot", "glart"], ["smorp", "smop", "smarp"], ["vorn", "vonn", "varn"], ["prore", "prare", "prope"]],
  inscriptions: [
    {
      title: "Storm log 1",
      text: "A storm hit just as we landed on the north shore. Wind and sand blasted the ship. Then Tam said, \"A fort! Up on the cliff!\" We ran for it. The gate of the fort was shut, but Gus lifted the bar. Inside, it was dim and still. Kit lit a torch. On the stone walls were storm marks, cut in long lines.",
    },
    {
      title: "Storm log 2",
      text: "Gus and Kit sorted the storm marks by size. Some were short, and some were long. Kit said, \"This is a record. A big storm got a big mark. They kept track of all the storms that hit this cliff.\" Sam, the robot, ran a scan. The fort was so old that it had lasted more storms than we can tell. At the back, we came to a stone porch. On it was a big horn, as long as Gus.",
    },
    {
      title: "Storm log 3",
      text: "The storm did not stop. The wind hit the fort with more and more force. Tam held up the torch, and Mel inspected the horn. On its rim were the same storm marks. Mel said, \"This is a storm horn. When a big storm came, they had a horn blast to tell the land.\" Gus lifted the horn to his lips. It gave a long, sharp blast. The blast went across the north shore and past the cliffs. Then, for a short time, the storm let up.",
    },
    {
      title: "Storm log 4",
      text: "When the storm let up, Gus and Tam got the horn back to the ship. Mel and Kit went back to scan the fort one more time. At the base of the horn was a mark that was not a storm mark. It was a ship, cut in the stone, with lines from it to the stars. Kit said, \"They did more than track storms. They had ships. They had a plan to go.\" We will explore the north ridge at sunrise.",
    },
  ],
  relic: { name: "The Storm Horn", caption: "A long stone horn. The builders blew it to warn the land when a big storm was coming." },
  story: "Sheltering from a storm in a cliff fort, the crew finds the builders' storm records and a warning horn, with a carved ship at its base: the first sign the builders planned to leave.",
  spanish: "Spanish or (as in 'por' and 'flor') sounds close to English /or/, so this sound transfers well. The new part is ore: in Spanish a final e is always said, so teach that the e in shore, more and store is silent.",
  miniLesson: {
    title: "/or/: or and ore",
    steps: [
      "Write fort and shore. Underline or and ore. Say: both spell /or/.",
      "Cover the e in shore. Say: the e is silent; or still says /or/. ore usually comes at the end.",
      "Read pairs, pointing to the vowel: shot, short; spot, sport; con, corn.",
      "Dictate 3 words (torch, north, store). Students say the sounds, then write or or ore.",
      "Read one sentence together: \"The storm hit the north shore, and Kit lit a torch.\"",
    ],
  },
};
