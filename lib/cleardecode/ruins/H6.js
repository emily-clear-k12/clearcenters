// ClearDecode ruin H6 · silent letters: kn, wr, mb (UFLI 98).
// Decodable rule for the logs: everything taught on Planets A-H (short
// vowels through ou/ow), plus this ruin's kn, wr and mb, plus heart words.
// No suffixes beyond -s, -es, -ed, -ing (no -er/-est, -ly, prefixes,
// doubling or drop e yet). gn, gh and silent t come later (J4).
// Checked by tools/cleardecode-check.cjs.
export default {
  id: "H6",
  name: "The Wreck Field",
  find: "kn|wr|mb",
  code: { label: "silent letters", spellings: ["kn", "wr", "mb"], rule: "In kn the k is silent, in wr the w is silent, and in mb at the end of a word the b is silent." },
  sort: {
    yes: "Silent letter vault", yesHint: "knot · wrap · comb",
    no: "No silent letter vault", noHint: "note · rock · cob",
    hintYes: (w) => `${w} has a silent letter: kn says /n/, wr says /r/, and mb says /m/.`,
    hintNo: (w) => `${w} has no kn, wr or mb, so every letter makes a sound.`,
  },
  codex: [
    { w: "knot", parts: ["kn", "o", "t"], hi: 0 },
    { w: "knock", parts: ["kn", "o", "ck"], hi: 0 },
    { w: "wrap", parts: ["wr", "a", "p"], hi: 0 },
    { w: "wreck", parts: ["wr", "e", "ck"], hi: 0 },
    { w: "comb", parts: ["c", "o", "mb"], hi: 2 },
    { w: "crumb", parts: ["cr", "u", "mb"], hi: 2 },
  ],
  checks: [
    ["knot", "note", "nut"], ["wrap", "wipe", "warp"], ["comb", "cob", "cub"],
    ["knife", "kite", "nine"], ["wreck", "rock", "week"], ["numb", "nut", "name"],
    ["kneel", "keel", "nail"], ["wrist", "rest", "waist"], ["crumb", "crib", "crab"],
    ["knock", "neck", "kick"], ["wrong", "ring", "wing"], ["limb", "lid", "lime"],
  ],
  vaultPicks: [
    ["knit", "kit", "net"], ["wrench", "bench", "rich"], ["wrote", "rate", "word"],
    ["knob", "job", "nab"], ["tomb", "time", "tame"], ["write", "white", "wait"],
    ["knelt", "melt", "neat"], ["plumber", "plunder", "planner"],
  ],
  bank: ["knot", "knock", "knife", "knee", "kneel", "knelt", "knit", "knob", "knack", "know", "known", "knight", "knuckle", "wrap", "wreck", "wrist", "wrong", "wrote", "write", "wreath", "wrench", "wren", "wrinkle", "comb", "crumb", "numb", "lamb", "limb", "tomb", "plumber", "thumb", "climb"],
  contrast: ["note", "nut", "warp", "cob", "kite", "nine", "rock", "rack", "keel", "nail", "rest", "crib", "neck", "ring", "lid", "net"],
  wall: {
    mode: "syllables",
    words: [
      { w: "knuckle", cuts: [5] },
      { w: "wrinkle", cuts: [4] },
      { w: "plumber", cuts: [5] },
      { w: "knapsack", cuts: [4] },
      { w: "wristband", cuts: [5] },
      { w: "unknown", cuts: [2] },
    ],
  },
  forge: {
    items: [
      { w: "knots", clue: "more than one knot", parts: ["knot", "s"], explain: "knot + s. The ending -s means more than one." },
      { w: "knocked", clue: "hit a door to be let in (it already happened)", parts: ["knock", "ed"], explain: "knock + ed. The ending -ed means it already happened." },
      { w: "wrecked", clue: "smashed so it can't work (it already happened)", parts: ["wreck", "ed"], explain: "wreck + ed. The ending -ed means it already happened." },
      { w: "combing", clue: "running a comb through hair right now", parts: ["comb", "ing"], explain: "comb + ing. The ending -ing means it is happening now." },
      { w: "kneeling", clue: "resting on your knees right now", parts: ["kneel", "ing"], explain: "kneel + ing. The ending -ing means it is happening now." },
      { w: "wrenches", clue: "more than one wrench", parts: ["wrench", "es"], explain: "wrench + es. Words that end in ch take -es to mean more than one." },
    ],
    extra: [{ t: "crumb", k: "base" }, { t: "ed", k: "suf" }, { t: "es", k: "suf" }],
  },
  door: [
    { w: "knot", parts: ["kn", "o", "t"], extra: ["n", "k"] },
    { w: "wrap", parts: ["wr", "a", "p"], extra: ["r", "w"] },
    { w: "comb", parts: ["c", "o", "mb"], extra: ["m", "b"] },
    { w: "knock", parts: ["kn", "o", "ck"], extra: ["n", "k"] },
    { w: "wreck", parts: ["wr", "e", "ck"], extra: ["r", "w"] },
    { w: "lamb", parts: ["l", "a", "mb"], extra: ["m", "b"] },
    { w: "knee", parts: ["kn", "ee"], extra: ["n", "k"] },
  ],
  chains: [
    ["lamb", "limb", "limp", "lime"],
    ["wrote", "write", "white", "while"],
  ],
  heart: ["the", "said", "was", "of", "to", "do", "two", "they", "were", "come", "could", "would", "where", "you", "your", "I", "from"],
  vaultFake: [["knipe", "nip", "nep"], ["wrade", "rad", "red"], ["glomb", "glob", "glab"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "The brown dot on the map was a small planet. We landed on a plain of black rock, and just ahead of us was a wreck. It was a long ship, split in two. Kit knelt by the hull and set her hand on it. \"I know this shape,\" she said. \"This ship is a hawk, like the crest.\" The hull was full of dents. This ship had come down wrong.",
    },
    {
      title: "Crew log 2",
      text: "We had to climb up the side of the hull to get in. The hatch was stuck, so Gus gave it three hard knocks with his wrist. It swung in. Inside, it was dark, and so cold that our hands went numb. A thick layer of dust sat on the deck. In the dust were prints of hands, but they were not human hands. The thumbs were too long.",
    },
    {
      title: "Crew log 3",
      text: "At the back of the ship was a small room with a desk. On the desk sat a cord with a row of knots in it. Each knot was a different size. Ray said, \"On ships, this is how they wrote. Not with ink, but with knots.\" He ran his thumb from knot to knot, and he read the code: \"We went on. Do not wait for us. Follow the light.\"",
    },
    {
      title: "Crew log 4",
      text: "We could not take the wreck with us, so we took the cord. Tam made a knot at the end, so it would not come apart. Then Kit wrote a note on a steel plate and left it by the wreck: \"We read your knots. We know where you went. We will follow.\" As we lifted off, the wreck got small, then it was lost in the dark.",
    },
  ],
  relic: { name: "The Knot Cord", caption: "A cord from a wrecked builder ship. Its knots are a message in their code: we went on, follow the light." },
  story: "On the brown planet, the crew finds a wrecked builder ship shaped like a hawk and a knotted cord that tells them the builders went on and want to be followed.",
  spanish: "Spanish has a silent h but no silent k, w or b, so students may say the k in knot or the b in climb. Teach that in kn and wr the first letter is quiet, and in mb the b is quiet.",
  miniLesson: {
    title: "Silent letters: kn, wr, mb",
    steps: [
      "Write knot, wrap and comb. Cross out the k, the w and the b with a light line. Say: these letters are silent.",
      "Read each word with the silent letter covered: not, rap, com. Then uncover it. The sound does not change.",
      "Say: kn and wr come at the start of a word. mb comes at the end.",
      "Sort 6 cards together into kn, wr and mb: knock, wrist, thumb, kneel, wreck, climb.",
      "Read together: \"Kit knelt by the wreck and held the knot in her thumb and wrist.\"",
    ],
  },
};
