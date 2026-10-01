// ClearCode ruin E3 · y as long i and long e (UFLI 73-74). Inscriptions use
// only patterns taught up to E3 (short vowels, -s, consonant teams, blends,
// silent e, soft c and g, endings, syllables, open and closed syllables, tch/dge,
// -ild/-old/-ind/-olt/-ost, and y as a vowel) plus heart words. No -le, no
// r-controlled vowels, no vowel teams. Checked by tools/clearcode-check.cjs.
//
// find: y at the end of a word after a consonant (sky, rocky), or a word whose
// only vowel is y (my, by). It skips they, day, key and boy.
export default {
  id: "E3",
  name: "The Dusty Rim",
  find: "^[^aeiou]*y$|[^aeiou]y$",
  code: { label: "y as a vowel", spellings: ["y"], rule: "At the end of a one-syllable word, y says long i (sky). At the end of a longer word, y says long e (dusty)." },
  // For the sort: long e words are the bank, long i words are the contrast.
  sort: {
    yes: "Long e vault", yesHint: "dusty · empty",
    no: "Long i vault", noHint: "fly · dry",
    hintYes: (w) => `${w} has more than one syllable, so the y at the end says long e.`,
    hintNo: (w) => `${w} has one syllable, so the y at the end says long i.`,
  },
  codex: [
    { w: "fly", parts: ["f", "l", "y"], hi: 2 },
    { w: "dry", parts: ["d", "r", "y"], hi: 2 },
    { w: "spy", parts: ["s", "p", "y"], hi: 2 },
    { w: "dusty", parts: ["dust", "y"], hi: 1 },
    { w: "frosty", parts: ["frost", "y"], hi: 1 },
    { w: "empty", parts: ["emp", "t", "y"], hi: 2 },
  ],
  checks: [
    ["fly", "flip", "flap"], ["dry", "drip", "drop"], ["try", "trip", "trap"],
    ["spy", "spit", "spin"], ["cry", "crib", "crab"], ["shy", "ship", "shop"],
    ["dusty", "dust", "dusts"], ["misty", "mist", "mists"], ["frosty", "frost", "frosts"],
    ["sandy", "sand", "sands"], ["rusty", "rust", "rusts"], ["sticky", "stick", "sticks"],
  ],
  vaultPicks: [
    ["why", "whip", "when"], ["fry", "from", "frog"], ["sly", "slip", "slap"], ["pry", "prop", "prim"],
    ["bumpy", "bump", "bumps"], ["windy", "wind", "winds"], ["crispy", "crisp", "crisps"], ["lucky", "luck", "lock"],
  ],
  bank: ["rocky", "dusty", "misty", "sandy", "windy", "empty", "frosty", "rusty", "gusty", "bumpy", "crispy", "chilly", "plenty", "twenty", "sixty", "fifty", "risky", "lucky", "tricky", "sticky", "handy", "messy", "foggy", "muddy", "hilly", "shaky", "tiny", "jumpy"],
  contrast: ["sky", "fly", "try", "dry", "cry", "shy", "spy", "fry", "pry", "sly", "why", "by", "my", "spry"],
  // Games: any y-as-a-vowel word counts; decoys have no y at the end.
  game: {
    targets: ["sky", "fly", "dry", "try", "spy", "why", "rocky", "dusty", "misty", "empty", "frosty", "twenty", "sticky", "chilly"],
    decoys: ["rock", "dust", "mist", "sand", "wind", "frost", "rust", "trip", "drip", "skid", "spin", "crisp", "chill", "stick"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "dusty", cuts: [3] },
      { w: "sandy", cuts: [3] },
      { w: "sixty", cuts: [3] },
      { w: "frosty", cuts: [4] },
      { w: "twenty", cuts: [4] },
      { w: "plenty", cuts: [4] },
    ],
  },
  forge: {
    items: [
      { w: "drying", clue: "getting dry right now", parts: ["dry", "ing"], explain: "dry + ing. The y stays when you add -ing." },
      { w: "trying", clue: "giving it a go right now", parts: ["try", "ing"], explain: "try + ing. The y stays when you add -ing." },
      { w: "spying", clue: "watching in secret right now", parts: ["spy", "ing"], explain: "spy + ing. The y stays when you add -ing." },
      { w: "flying", clue: "going up in the sky right now", parts: ["fly", "ing"], explain: "fly + ing. The y stays when you add -ing." },
      { w: "crying", clue: "calling out or in tears right now", parts: ["cry", "ing"], explain: "cry + ing. The y stays when you add -ing." },
    ],
    extra: [{ t: "es", k: "suf" }, { t: "ed", k: "suf" }, { t: "sky", k: "base" }],
  },
  door: [
    { w: "fly", parts: ["f", "l", "y"], extra: ["i", "e"] },
    { w: "dry", parts: ["d", "r", "y"], extra: ["i", "e"] },
    { w: "spy", parts: ["s", "p", "y"], extra: ["i", "e"] },
    { w: "dusty", parts: ["d", "u", "s", "t", "y"], extra: ["e", "i"] },
    { w: "misty", parts: ["m", "i", "s", "t", "y"], extra: ["e", "i"] },
    { w: "frosty", parts: ["f", "r", "o", "s", "t", "y"], extra: ["e", "i"] },
    { w: "empty", parts: ["e", "m", "p", "t", "y"], extra: ["e", "i"] },
  ],
  chains: [
    ["fly", "fry", "dry", "try", "cry"],
    ["misty", "musty", "dusty", "rusty", "gusty"],
  ],
  heart: ["the", "a", "said", "was", "of", "to", "they", "there", "where", "could"],
  vaultFake: [["plimpy", "plimp", "plimps"], ["sny", "snim", "snom"], ["glunty", "glunt", "glunts"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "Gus and Tam went up a rocky, dusty rim. The sun was hot, and the sky was empty. It was a risky trek, and the wind was gusty. On top of the rim sat a big stone dome. \"Why did they set a dome up on the rim?\" Gus asked. Tam had a hunch. \"To spy on the sky.\"",
    },
    {
      title: "Crew log 2",
      text: "The dome had a long slot in the top. Inside, it was dim and chilly, and Tam felt jumpy. In the hub of the dome sat a big tube. It went up to the slot, as if to spy on the sky. At the end of the tube was a lens. It was dusty and a bit sticky. Gus got a rag and set to it. \"Try it,\" said Gus.",
    },
    {
      title: "Crew log 3",
      text: "Tam bent to the lens. The sky in it was not empty. It had plenty of tiny dots, and a thin line ran from dot to dot. The line went up past the sun, just like the line on the map in the cold post. At the end of it was a rusty red dot. \"Is that where they went?\" said Tam. \"Why there?\" said Gus. Tam could not tell.",
    },
    {
      title: "Crew log 4",
      text: "At the base of the tube, Gus spots a small lid. Inside it was a thin glass disc, as big as a hand. It had the same dots and line cut into it. \"It is a sky map,\" said Tam. They put the disc in a dry box. Then they set off on the long, rocky trek back to the ship. It was windy, and the path was bumpy, but Gus and Tam felt lucky.",
    },
  ],
  relic: { name: "The Sky Disc", caption: "A thin glass disc cut with dots and a line, a map the builders made by watching the sky." },
  story: "On a dusty rim, the crew finds a stone dome where the builders watched the sky, and a glass disc that maps a line of dots to a far red point.",
  spanish: "In Spanish, y at the end of a word says /ee/ (muy, hoy), which helps with dusty and rocky. Long i in sky sounds like Spanish \"ai\" (as in hay), so give extra practice with my, fly and dry.",
  miniLesson: {
    title: "y at the end: sky and dusty",
    steps: [
      "Write sky and dusty. Say: y at the end is a vowel. Clap each word. One clap, y says long i. Two claps, y says long e.",
      "Read a column together: fly, dry, spy. Then a second column: misty, sandy, rusty.",
      "Sort 8 cards by the sound of y: try, rocky, shy, empty, cry, lucky, why, twenty.",
      "Build dust, then add y: dusty. Do the same with mist, rust and frost.",
      "Read together: \"Why is the sky so dusty and dry?\"",
    ],
  },
};
