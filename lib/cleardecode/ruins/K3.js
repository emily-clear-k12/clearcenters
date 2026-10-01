// ClearDecode ruin K3 · suffixes -ish, -y, -ness, -ment (UFLI 122-125).
// Decodable rule for this ruin: every pattern on the ladder through K2, plus
// -ish and -y (childish, rocky) that describe, and -ness and -ment (darkness,
// equipment) that name a thing or a feeling. No -able/-ible/-ity/-ty (K4) and
// no K5+ prefixes. In the logs, the only words that end in consonant + y, -ish,
// -ness or -ment are code words (no sky, very, any, only, wish, moment, and no
// -ly words), so the "find the code" task stays fair.
// Checked by tools/cleardecode-check.cjs.
export default {
  id: "K3",
  name: "The Quiet Wing",
  find: "(ish|ness|ment)s?$|(^|[a-z][^aeiou])y$",
  code: { label: "-ish, -y, -ness, -ment", spellings: ["-ish", "-y", "-ness", "-ment"], rule: "-ish and -y make describing words: childish means like a child, rocky means full of rocks. -ness and -ment make naming words: darkness is the state of being dark, equipment is the things you equip a crew with." },
  sort: {
    yes: "Describing (-ish, -y)", yesHint: "childish · rocky",
    no: "Naming (-ness, -ment)", noHint: "sadness · equipment",
    hintYes: (w) => `${w} ends in ${w.endsWith("ish") ? "-ish" : "-y"}, so it describes something.`,
    hintNo: (w) => `${w} ends in ${w.endsWith("ment") ? "-ment" : "-ness"}, so it names a thing or a feeling.`,
  },
  codex: [
    { w: "childish", parts: ["child", "ish"], hi: 1 },
    { w: "rocky", parts: ["rock", "y"], hi: 1 },
    { w: "frosty", parts: ["frost", "y"], hi: 1 },
    { w: "sadness", parts: ["sad", "ness"], hi: 1 },
    { w: "kindness", parts: ["kind", "ness"], hi: 1 },
    { w: "movement", parts: ["move", "ment"], hi: 1 },
  ],
  checks: [
    ["childish", "children", "childhood"], ["rocky", "rocket", "rocks"], ["sadness", "saddest", "sadder"],
    ["movement", "moving", "moved"], ["foolish", "fooling", "foolproof"], ["frosty", "frosted", "frosting"],
    ["kindness", "kinder", "kindest"], ["payment", "paying", "payday"], ["dusty", "dusted", "duster"],
    ["softness", "softest", "soften"], ["shipment", "shipping", "shipped"], ["reddish", "redder", "reddest"],
  ],
  vaultPicks: [
    ["stillness", "stillest", "stilled"], ["selfish", "selfless", "selfie"], ["windy", "winding", "window"],
    ["agreement", "agreeing", "agreed"], ["sleepy", "sleeping", "sleeper"], ["brightness", "brightest", "brighten"],
    ["stylish", "styling", "styled"], ["pavement", "paved", "paving"],
  ],
  // For the sort: describing words (-ish, -y) are the bank, naming words (-ness, -ment) are the contrast.
  bank: ["childish", "foolish", "reddish", "greenish", "selfish", "stylish", "smallish", "darkish", "rocky", "icy", "misty", "foggy", "dusty", "rusty", "frosty", "salty", "stony", "shiny", "sleepy", "windy", "snowy", "steamy", "gloomy", "lucky", "sandy", "cloudy", "chilly", "bumpy", "crunchy", "glassy", "grassy", "hilly"],
  contrast: ["sadness", "kindness", "stillness", "coldness", "softness", "brightness", "fitness", "goodness", "equipment", "movement", "shipment", "payment", "agreement", "excitement", "enjoyment", "pavement"],
  // Games: any -ish, -y, -ness or -ment word counts; decoys are the base words.
  game: {
    targets: ["childish", "foolish", "rocky", "frosty", "icy", "misty", "foggy", "sadness", "darkness", "kindness", "stillness", "movement", "equipment", "shipment"],
    decoys: ["child", "fool", "rock", "frost", "mist", "fog", "sad", "dark", "kind", "still", "move", "equip", "ship", "rocket"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "equipment", cuts: [1, 5] },
      { w: "excitement", cuts: [2, 6] },
      { w: "hopefulness", cuts: [4, 7] },
      { w: "astonishment", cuts: [2, 5, 8] },
      { w: "enjoyment", cuts: [2, 5] },
      { w: "foolishness", cuts: [4, 7] },
    ],
  },
  forge: {
    items: [
      { w: "equipment", clue: "the tools and gear a crew needs", parts: ["equip", "ment"], explain: "equip + ment. -ment turns an action into a thing: to equip a crew, so the equipment." },
      { w: "darkness", clue: "the state of being dark", parts: ["dark", "ness"], explain: "dark + ness. -ness turns a describing word into a naming word." },
      { w: "childish", clue: "acting like a small child", parts: ["child", "ish"], explain: "child + ish. -ish means like: childish means like a child." },
      { w: "frosty", clue: "covered with frost", parts: ["frost", "y"], explain: "frost + y. -y means full of or covered with: frosty means covered with frost." },
      { w: "hopefulness", clue: "the feeling of being full of hope", parts: ["hope", "ful", "ness"], explain: "hope + ful + ness. -ful means full of, and -ness makes it a naming word." },
      { w: "movement", clue: "the act of moving", parts: ["move", "ment"], explain: "move + ment. The e stays, because -ment starts with a consonant." },
      { w: "unselfish", clue: "thinking of others first", parts: ["un", "self", "ish"], explain: "un + self + ish. -ish means like, and un- means not: not selfish." },
    ],
    extra: [{ t: "re", k: "pre" }, { t: "kind", k: "base" }, { t: "less", k: "suf" }],
  },
  door: [
    { w: "rocky", parts: ["r", "o", "ck", "y"], extra: ["ey", "ee"] },
    { w: "childish", parts: ["ch", "i", "l", "d", "ish"], extra: ["esh", "ich"] },
    { w: "sadness", parts: ["s", "a", "d", "ness"], extra: ["nes", "niss"] },
    { w: "shipment", parts: ["sh", "i", "p", "ment"], extra: ["mint", "munt"] },
    { w: "frosty", parts: ["f", "r", "o", "s", "t", "y"], extra: ["ee", "ey"] },
    { w: "kindness", parts: ["k", "i", "n", "d", "ness"], extra: ["nes", "nis"] },
    { w: "foolish", parts: ["f", "oo", "l", "ish"], extra: ["esh", "ush"] },
  ],
  chains: [
    ["dusty", "rusty", "musty", "misty"],
    ["salty", "silty", "silky", "milky"],
  ],
  heart: [],
  vaultFake: [["dranment", "dranning", "drans"], ["vulkish", "vulking", "vulks"], ["plindness", "plinding", "plinds"], ["zorpy", "zorped", "zorps"]],
  inscriptions: [
    {
      title: "Log 39",
      text: "Sam led us down the second ramp, icy and rocky, to a wing with no steam vents. Here the air was still and cold. Tam named it the Quiet Wing, because even our steps seemed to fade into the stillness. Along the walls stood rows of shelves packed with the builders' equipment: ropes, lamps, rusty tools, and frosty boxes with lids sealed shut. \"This is not junk,\" said Tam. \"Someone sorted all of this with care.\"",
    },
    {
      title: "Log 40",
      text: "Kit opened the first box. Inside was a mix of small things: a cup, a comb, a shoe that would fit a child, and a stack of letters. \"These are not equipment,\" said Kit. \"These are what the builders kept for themselves.\" One letter was written in shaky lines. Kit read it out loud: \"Our sadness at leaving is deep. We will miss the misty hills and the salty seas. But we must go.\"",
    },
    {
      title: "Log 41",
      text: "Mel found a wall of carved panels. Each panel showed a builder with a feeling on its face. The first showed sadness, with tears on a stony face. The next showed kindness: a builder handing a lamp to a sleepy child. The last panel was the biggest. It showed the whole crew of builders looking up, and under it was one word: hopefulness. \"They were sad to leave,\" said Mel, \"but they were not hopeless. They had a reason to go.\"",
    },
    {
      title: "Log 42",
      text: "In the middle of the wing, on a shiny stand of stone, sat one box with no frost on it. Gus lifted the lid with great care. Inside was a glass globe, cloudy and gray. When he held it, the glass cleared, and the globe showed the builders' ship rising into a foggy dawn. \"They took their equipment and left their sadness here,\" said Gus. \"But they took their hope with them.\" Past the globe, a door of thick ice was marked: \"The Vault of Things That Last.\"",
    },
  ],
  relic: { name: "The Hope Globe", caption: "A glass globe from the Quiet Wing. It is cloudy until someone holds it. Then it shows the builders' ship rising into a foggy dawn, full of hope." },
  story: "In the Quiet Wing the crew finds what the builders owned and felt: their equipment, their letters, their sadness at leaving, and the hopefulness that sent them on.",
  spanish: "-ment often matches Spanish -mento or -miento (movement / movimiento, monument / monumento). -ness has no single match; it is often -eza or -dad (sadness / tristeza, kindness / bondad). -ish and -y have no single Spanish ending, so teach them as English word parts and name what each one means.",
  miniLesson: {
    title: "-ish and -y describe; -ness and -ment name",
    steps: [
      "Write rock and child. Add -y and -ish. Say: rocky and childish now describe something.",
      "Write sad and equip. Add -ness and -ment. Say: sadness and equipment now name a feeling or a thing.",
      "Cover the ending on frosty, darkness, movement. Read the base word, then the whole word.",
      "Sort six cards: does it describe, or does it name?",
      "Read together: \"In the darkness, the rocky path was full of equipment.\"",
    ],
  },
};
