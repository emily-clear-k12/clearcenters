// ClearDecode ruin F4 · spelling /er/: er, ir, ur, w + or (UFLI 82-83).
// After w, or says /er/ (word, work, world). Inscriptions use only patterns
// taught up to F4 (short vowels, consonant teams, blends, silent e, soft c and
// g, endings -es/-ed/-ing, syllables, tch/dge, -ild/-old, y, -le, ar, or/ore,
// er/ir/ur, w + or) plus heart words. No vowel teams, no doubled-consonant
// endings. Checked by tools/cleardecode-check.cjs.
export default {
  id: "F4",
  name: "The World Works",
  find: "er|ir|ur|wor",
  code: { label: "/er/", spellings: ["er", "ir", "ur", "w + or"], rule: "er, ir and ur say /er/. After w, or says /er/ too, as in word, work and world." },
  // The sort sets /er/ words against /or/ words: or says /er/ only after w.
  sort: {
    yes: "/er/ vault", yesHint: "word · fern · burst",
    no: "/or/ vault", noHint: "fork · storm",
    hintYes: (w) => `${w} has an /er/ code: er, ir, ur, or w + or.`,
    hintNo: (w) => `${w} has or with no w in front, so it says /or/.`,
  },
  codex: [
    { w: "word", parts: ["wor", "d"], hi: 0 },
    { w: "worm", parts: ["wor", "m"], hi: 0 },
    { w: "worth", parts: ["wor", "th"], hi: 0 },
    { w: "germ", parts: ["g", "er", "m"], hi: 1 },
    { w: "squirt", parts: ["squ", "ir", "t"], hi: 1 },
    { w: "hurl", parts: ["h", "ur", "l"], hi: 1 },
  ],
  checks: [
    ["word", "ward", "wood"], ["worm", "warm", "form"], ["worth", "forth", "with"],
    ["worse", "horse", "wise"], ["work", "fork", "walk"], ["burst", "bust", "boast"],
    ["third", "thud", "thread"], ["stern", "storm", "stem"], ["purse", "pass", "pose"],
    ["curl", "coil", "call"], ["skirt", "skit", "sport"], ["herd", "hard", "hoard"],
  ],
  vaultPicks: [
    ["worker", "walker", "waker"], ["homework", "homemade", "hammock"], ["network", "nutmeg", "netball"],
    ["whisper", "whisk", "wisp"], ["thirsty", "thrifty", "toasty"], ["pattern", "patent", "pageant"],
    ["sunburn", "sunbath", "sundown"], ["squirt", "squat", "squint"],
  ],
  bank: ["word", "worm", "worth", "worse", "worst", "work", "world", "worker", "homework", "network", "fern", "germ", "stern", "herd", "perch", "pattern", "whisper", "bird", "third", "skirt", "squirt", "firm", "thirsty", "burst", "curl", "nurse", "purse", "hurl", "churn", "sunburn", "turtle", "return", "hurt"],
  contrast: ["fork", "storm", "corn", "short", "horn", "torch", "sport", "north", "born", "cord", "porch", "form", "fort", "scorch"],
  wall: {
    mode: "syllables",
    words: [
      { w: "worker", cuts: [4] },
      { w: "network", cuts: [3] },
      { w: "homework", cuts: [4] },
      { w: "whisper", cuts: [4] },
      { w: "turtle", cuts: [3] },
      { w: "pattern", cuts: [3] },
    ],
  },
  forge: {
    items: [
      { w: "worker", clue: "a person who works", parts: ["work", "er"], explain: "work + er. The ending -er can mean a person who does something." },
      { w: "worked", clue: "did work, already done", parts: ["work", "ed"], explain: "work + ed. The ending -ed means it already happened." },
      { w: "worlds", clue: "more than one world", parts: ["world", "s"], explain: "world + s. The ending -s means more than one." },
      { w: "chirping", clue: "making a short, high sound right now", parts: ["chirp", "ing"], explain: "chirp + ing. The ending -ing means it is happening now." },
      { w: "hurled", clue: "threw hard, already done", parts: ["hurl", "ed"], explain: "hurl + ed. The ending -ed means it already happened." },
    ],
    extra: [{ t: "es", k: "suf" }, { t: "word", k: "base" }, { t: "burst", k: "base" }],
  },
  door: [
    { w: "word", parts: ["w", "or", "d"], extra: ["ur", "ir"] },
    { w: "worm", parts: ["w", "or", "m"], extra: ["ur", "er"] },
    { w: "worth", parts: ["w", "or", "th"], extra: ["ur", "ir"] },
    { w: "third", parts: ["th", "ir", "d"], extra: ["ur", "er"] },
    { w: "nurse", parts: ["n", "ur", "s", "e"], extra: ["ir", "er"] },
    { w: "stern", parts: ["s", "t", "er", "n"], extra: ["ir", "ur"] },
  ],
  chains: [
    ["word", "cord", "cork", "work", "worm"],
    ["skirt", "shirt", "short", "sport", "spurt"],
  ],
  heart: ["the", "said", "was", "were", "their", "where", "they", "are", "have", "she", "we", "to", "do", "of", "from", "one", "go", "some"],
  vaultFake: [["worsk", "wosk", "warsk"], ["blurm", "blum", "blarm"], ["glird", "glid", "glard"]],
  inscriptions: [
    {
      title: "Works log 1",
      text: "We came back to the ridge with a drill. Gus and Tam drilled a shaft next to the turret. It was hard work, for the rock was firm. At last, the drill burst in on a dark hall. Kit sent Sam in first. Its lamps lit up a vast hall, as big as a ship dock. Long lines of benches went from end to end. Mel said, \"This was a work hall. The makers did their work here.\"",
    },
    {
      title: "Works log 2",
      text: "On the benches were metal parts, cords, and burners. Some parts were rusted, and some still had a shine. Tam lifted one part. It was a hull plate, curved like the side of a ship. Then Gus held up a burner as big as his chest. \"These are ship parts,\" Kit said. \"The makers had a ship in the works, here, under the ridge.\" Mel said, \"This is worth more than all the relics we have.\"",
    },
    {
      title: "Works log 3",
      text: "At the far end of the hall was a wall of words, cut in the makers' code. Kit has the best skill with the code. She ran a finger under the words. \"It is a work list,\" she said. \"Hull. Burner. Fern. Horn. The makers had to finish all of it.\" At the end of the list was one last word. Kit went still. The last word was \"Depart.\"",
    },
    {
      title: "Works log 4",
      text: "Next to the wall was a stone disk on a stand, as wide as a ship hatch. On the disk were a hundred dots. Mel said, \"These are not stars. They are worlds.\" One world had a ring cut on it, with a ship mark next to it. \"That is where the makers went,\" Gus said. \"Or where they had a plan to go.\" We lifted the disk from its stand. It is the first map of the makers' worlds, and it will go back to the lab with us.",
    },
  ],
  relic: { name: "The World Disk", caption: "A stone disk with a hundred dots for worlds. One world has a ring and a ship mark next to it." },
  story: "Drilling under the ridge, the crew finds the builders' work hall, where they were making a ship, a list that ends with the word \"Depart,\" and a stone disk that maps their worlds.",
  spanish: "In Spanish, or always says /or/, so students may read word as \"ward\" or \"wored.\" Teach w + or as a chunk that says /wer/. Spanish has no /er/ vowel, so keep practicing hearing it.",
  miniLesson: {
    title: "Spelling /er/: er, ir, ur, and w + or",
    steps: [
      "Write fork and work. Say: or says /or/, but after w it says /er/. Underline wor in work.",
      "Read a list together: word, worm, world, worth. Then: for, fork, form.",
      "Say: when you hear /er/ after w, write or. For other words, try er, ir or ur and check which one looks right.",
      "Dictate 4 words (work, burst, fern, third). Students write them, then check with the word wall.",
      "Read one sentence together: \"The makers did their work in a hall under the ridge.\"",
    ],
  },
};
