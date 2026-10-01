// ClearDecode ruin I2 · suffixes -ly, -less, -ful (UFLI 101-102).
// Decodable rule for this ruin: every pattern from Planets A-H, I1's -s/-es and
// -er/-est, plus -ly, -less and -ful added to a base word with no spelling
// change (softly, endless, helpful), plus heart words. No prefixes yet (I3),
// and no doubling or drop-e words (I5, I6). Checked by tools/cleardecode-check.cjs.
export default {
  id: "I2",
  name: "Hall of Oaths",
  find: "(ly|less|ful)$",
  code: { label: "-ly, -less, -ful", spellings: ["-ly", "-less", "-ful"], rule: "-ly tells how something is done (softly). -less means without (endless). -ful means full of (helpful). The base word does not change, and -ful has just one l." },
  sort: {
    yes: "Full of (-ful)", yesHint: "helpful · hopeful",
    no: "Without (-less)", noHint: "helpless · hopeless",
    hintYes: (w) => `${w} ends in -ful, which means full of.`,
    hintNo: (w) => `${w} ends in -less, which means without.`,
  },
  codex: [
    { w: "softly", parts: ["soft", "ly"], hi: 1 },
    { w: "kindly", parts: ["kind", "ly"], hi: 1 },
    { w: "helpful", parts: ["help", "ful"], hi: 1 },
    { w: "useful", parts: ["use", "ful"], hi: 1 },
    { w: "endless", parts: ["end", "less"], hi: 1 },
    { w: "harmless", parts: ["harm", "less"], hi: 1 },
  ],
  checks: [
    ["softly", "soft", "softer"], ["helpful", "helpless", "helping"], ["endless", "ending", "ended"],
    ["useful", "useless", "uses"], ["brightly", "brighter", "brightest"], ["harmless", "harmful", "harming"],
    ["kindly", "kindest", "kinder"], ["painful", "painless", "painted"], ["slowly", "slower", "slowest"],
    ["thankful", "thanking", "thanks"], ["pointless", "pointed", "pointing"], ["boldly", "bolder", "boldest"],
  ],
  vaultPicks: [
    ["restful", "restless", "resting"], ["loudly", "louder", "loudest"], ["hopeful", "hopeless", "hopes"],
    ["spotless", "spotted", "spots"], ["playful", "playing", "played"], ["lightly", "lighter", "lighting"],
    ["sleepless", "sleeping", "sleeper"], ["truthful", "truths", "truth"],
  ],
  // For the sort: "-ful" words are the bank, "-less" words are the contrast.
  bank: ["helpful", "hopeful", "useful", "thankful", "harmful", "painful", "restful", "playful", "boastful", "mindful", "powerful", "joyful", "handful", "skillful", "truthful", "wasteful", "fruitful", "peaceful", "graceful", "faithful", "dreadful", "armful", "cupful", "shameful", "rightful", "forgetful", "spoonful"],
  contrast: ["helpless", "hopeless", "useless", "harmless", "painless", "restless", "endless", "spotless", "pointless", "thankless", "sleepless", "timeless", "lifeless", "powerless", "sunless", "sightless"],
  // Games: any -ly, -less or -ful word counts; decoys are base words (and "bless", which only looks like -less).
  game: {
    targets: ["softly", "helpful", "endless", "useful", "harmless", "kindly", "slowly", "painful", "brightly", "hopeless", "thankful", "boldly", "restless", "powerful"],
    decoys: ["soft", "help", "end", "use", "harm", "kind", "slow", "pain", "bright", "hope", "bless", "rest"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "powerful", cuts: [3, 5] },
      { w: "hopelessly", cuts: [4, 8] },
      { w: "thankfully", cuts: [5, 8] },
      { w: "harmless", cuts: [4] },
      { w: "brightly", cuts: [6] },
      { w: "endless", cuts: [3] },
    ],
  },
  forge: {
    items: [
      { w: "helpful", clue: "full of help", parts: ["help", "ful"], explain: "help + ful. The ending -ful means full of." },
      { w: "hopeless", clue: "without hope", parts: ["hope", "less"], explain: "hope + less. The ending -less means without." },
      { w: "softly", clue: "in a soft way", parts: ["soft", "ly"], explain: "soft + ly. The ending -ly tells how something is done." },
      { w: "powerless", clue: "without power", parts: ["power", "less"], explain: "power + less. A ship with no power is powerless." },
      { w: "thankfully", clue: "in a way that is full of thanks", parts: ["thank", "ful", "ly"], explain: "thank + ful + ly. -ful means full of, then -ly tells how." },
      { w: "brightest", clue: "the most bright of all", parts: ["bright", "est"], explain: "bright + est. From the last ruin: -est compares three or more." },
    ],
    extra: [{ t: "er", k: "suf" }, { t: "rest", k: "base" }, { t: "ing", k: "suf" }],
  },
  door: [
    { w: "helpful", parts: ["h", "e", "l", "p", "ful"], extra: ["full", "fel"] },
    { w: "softly", parts: ["s", "o", "f", "t", "ly"], extra: ["lee", "le"] },
    { w: "endless", parts: ["e", "n", "d", "less"], extra: ["les", "lis"] },
    { w: "harmful", parts: ["h", "ar", "m", "ful"], extra: ["full", "fel"] },
    { w: "brightly", parts: ["b", "r", "igh", "t", "ly"], extra: ["lee", "ley"] },
    { w: "pointless", parts: ["p", "oi", "n", "t", "less"], extra: ["les", "lis"] },
  ],
  chains: [
    ["nightly", "rightly", "tightly", "lightly"],
    ["sadly", "badly", "madly"],
  ],
  heart: ["the", "a", "of", "to", "into", "said", "was", "were", "there", "one", "do", "what", "who", "only", "they", "come", "will"],
  vaultFake: [["bloofful", "bloofless", "bloofly"], ["zently", "zentful", "zentless"], ["plimless", "plimful", "plimly"], ["drotful", "drotless", "drotly"]],
  inscriptions: [
    {
      title: "Log 1: Endless dust",
      text: "The Frost Rod led us to the next planet. The dust storms there were endless, and the land looked lifeless. We landed slowly and softly, so the ship did not sink into the dust. Mel pointed at a hall cut into a hill. It was dark and still. But as we got close, the lights came on, one by one, as if the hall was hopeful that a crew might come back.",
    },
    {
      title: "Log 2: Words on the walls",
      text: "Inside, rows of words ran along the walls. Ray read them slowly, line by line. \"Be helpful. Be truthful. Do no harm. Take only what is useful.\" Kit said, \"These are not just signs. They are rules for a crew, like ours.\" We felt thankful. The makers were mindful of who might come next, and they left the rules for us.",
    },
    {
      title: "Log 3: The door with no lock",
      text: "At the end of the hall stood a door with no lock and no handle. Mel pushed it hard. It did not budge. Pushing it was pointless. Then Tam saw a line on the door: \"Only the helpful may pass.\" Next to the door sat an old drone, stuck and helpless in the dust. Gus lifted it softly and set it on its stand. Its lights blinked brightly. With a soft click, the door swung open.",
    },
    {
      title: "Log 4: The Oath Plate",
      text: "Behind the door was a small room, and in it hung a metal plate. The rules were cut into it, with one more line at the bottom: \"Go boldly, but go kindly.\" \"That is who they were,\" said Ray. \"Not a harmful crew. A peaceful one.\" We took the Oath Plate back to the ship and hung it by the hatch, so no one on our crew will be forgetful of the rules. The Frost Rod still points to a colder place.",
    },
  ],
  relic: { name: "The Oath Plate", caption: "The makers' rules for a crew: be helpful, be truthful, do no harm. Go boldly, but go kindly." },
  story: "The crew finds a hall where the makers cut their rules into the walls, and learns the makers were a peaceful, helpful crew, much like their own.",
  spanish: "-ly works like Spanish -mente (rápidamente = quickly, suavemente = softly). Spanish has no ending for -less or -ful; it uses words instead (sin esperanza = hopeless, lleno de esperanza = hopeful), so link -less to sin and -ful to lleno de.",
  miniLesson: {
    title: "-ly tells how, -less means without, -ful means full of",
    steps: [
      "Write help. Add -ful: helpful. Add -less: helpless. Ask: which one means full of help? Which one means without help?",
      "Write soft and softly. Say: -ly tells how. \"Close the hatch softly.\"",
      "Point out that -ful has one l, even though full has two.",
      "Sort 6 cards together: hopeful, hopeless, useful, useless, painful, painless. Students cover the ending, read the base word, then read the whole word.",
      "Read one sentence together: \"Be helpful. Be truthful. Take only what is useful.\"",
    ],
  },
};
