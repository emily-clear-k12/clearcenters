// ClearDecode ruin K2 · -ture; people endings -er, -or, -ist (UFLI 120-121).
// Decodable rule for this ruin: every pattern on the ladder through K1 (all of
// Planets A-J, plus -tion/-sion), plus -ture (capture, nature) and the people
// endings -er, -or, -ist (explorer, inventor, artist). No -ish, -y, -ness or
// -ment as suffixes yet (K3), no -able/-ible/-ity (K4), no K5+ prefixes.
// In the logs, every word ending in -er or -or is a people word on purpose
// (no for, or, water, under, after), so the "find the code" task stays fair.
// Checked by tools/cleardecode-check.cjs.
export default {
  id: "K2",
  name: "Hall of Makers",
  find: "ture|(er|or|ist)s?$",
  code: { label: "-ture; -er, -or, -ist", spellings: ["-ture", "-er", "-or", "-ist"], rule: "-ture at the end of a word says \"cher,\" as in picture. -er, -or and -ist can mean a person who does something: an explorer explores, an inventor invents, an artist makes art." },
  sort: {
    yes: "-ture vault", yesHint: "nature · picture",
    no: "People vault (-er, -or, -ist)", noHint: "inventor · artist",
    hintYes: (w) => `${w} ends in -ture, which says "cher," as in picture.`,
    hintNo: (w) => `${w} names a person who does something. It ends in ${w.endsWith("ist") ? "-ist" : w.endsWith("or") ? "-or" : "-er"}.`,
  },
  codex: [
    { w: "nature", parts: ["na", "ture"], hi: 1 },
    { w: "picture", parts: ["pic", "ture"], hi: 1 },
    { w: "explorer", parts: ["ex", "plor", "er"], hi: 2 },
    { w: "visitor", parts: ["vis", "it", "or"], hi: 2 },
    { w: "artist", parts: ["art", "ist"], hi: 1 },
    { w: "builder", parts: ["build", "er"], hi: 1 },
  ],
  checks: [
    ["nature", "native", "nation"], ["picture", "picnic", "pickup"], ["artist", "artful", "artwork"],
    ["explorer", "explore", "exploring"], ["visitor", "visiting", "visited"], ["builder", "building", "built"],
    ["actor", "acting", "action"], ["mixture", "mixing", "mixed"], ["sculptor", "sculpted", "sculpting"],
    ["creature", "create", "creation"], ["tourist", "touring", "tourism"], ["inventor", "invented", "invention"],
  ],
  vaultPicks: [
    ["future", "fuse", "fusing"], ["furniture", "furnish", "furnace"], ["sailor", "sailing", "sailed"],
    ["painter", "painting", "painted"], ["scientist", "science", "scientific"], ["adventure", "advent", "adverb"],
    ["collector", "collecting", "collection"], ["moisture", "moisten", "moistening"],
  ],
  // For the sort: -ture words are the bank, people words (-er, -or, -ist) are the contrast.
  bank: ["nature", "picture", "capture", "mixture", "creature", "future", "furniture", "adventure", "moisture", "temperature", "sculpture", "feature", "fracture", "texture", "puncture", "posture", "pasture", "culture", "venture", "fixture", "gesture", "signature", "departure", "vulture"],
  contrast: ["inventor", "artist", "explorer", "builder", "actor", "visitor", "sailor", "painter", "sculptor", "collector", "scientist", "tourist", "miner", "diver", "editor", "hunter"],
  // Games: any -ture, -er, -or or -ist word counts; decoys have none of them.
  game: {
    targets: ["picture", "nature", "capture", "mixture", "creature", "future", "inventor", "artist", "explorer", "builder", "sailor", "actor", "visitor", "painter"],
    decoys: ["picnic", "native", "captain", "mixing", "create", "invent", "art", "explore", "building", "sailing", "acting", "visit", "painting", "nation"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "adventure", cuts: [2, 5] },
      { w: "temperature", cuts: [3, 6, 7] },
      { w: "explorer", cuts: [2, 6] },
      { w: "scientist", cuts: [3, 5] },
      { w: "furniture", cuts: [3, 5] },
      { w: "collector", cuts: [3, 6] },
    ],
  },
  forge: {
    items: [
      { w: "inventor", clue: "a person who makes a new machine or idea", parts: ["invent", "or"], explain: "invent + or. -or means a person who does it: to invent, so an inventor." },
      { w: "artist", clue: "a person who makes art", parts: ["art", "ist"], explain: "art + ist. -ist means a person who works with something: art, so an artist." },
      { w: "builder", clue: "a person who builds things", parts: ["build", "er"], explain: "build + er. -er means a person who does it: to build, so a builder." },
      { w: "collector", clue: "a person who collects things", parts: ["collect", "or"], explain: "collect + or. -or means a person who does it: to collect, so a collector." },
      { w: "sculptor", clue: "a person who carves shapes from stone or wood", parts: ["sculpt", "or"], explain: "sculpt + or. To sculpt is to carve; a sculptor is the person who carves." },
      { w: "mixture", clue: "a blend of things mixed together", parts: ["mix", "ture"], explain: "mix + ture. -ture turns an action into a thing: to mix, so a mixture." },
    ],
    extra: [{ t: "un", k: "pre" }, { t: "visit", k: "base" }, { t: "ing", k: "suf" }],
  },
  door: [
    { w: "picture", parts: ["p", "i", "c", "ture"], extra: ["cher", "chur"] },
    { w: "nature", parts: ["n", "a", "ture"], extra: ["cher", "tur"] },
    { w: "actor", parts: ["a", "c", "t", "or"], extra: ["er", "ar"] },
    { w: "artist", parts: ["ar", "t", "ist"], extra: ["est", "ust"] },
    { w: "hunter", parts: ["h", "u", "n", "t", "er"], extra: ["or", "ur"] },
    { w: "visitor", parts: ["v", "i", "s", "i", "t", "or"], extra: ["er", "ar"] },
    { w: "mixture", parts: ["m", "i", "x", "ture"], extra: ["cher", "chur"] },
  ],
  chains: [
    ["maker", "baker", "biker", "hiker"],
    ["miner", "diner", "diver", "giver"],
  ],
  heart: [],
  vaultFake: [["blenture", "blenting", "blents"], ["vaskist", "vasking", "vasks"], ["drumpor", "drumping", "drumps"], ["skeltor", "skelting", "skelts"]],
  inscriptions: [
    {
      title: "Log 35",
      text: "The ramp past the screens led down into a hall cut from blue ice. Steam rose from vents in the ground, so the hall was warm. Carved above the arch was a caption in the builders' code. Kit read it chunk by chunk: \"Hall of Makers.\" Inside, the walls held rows of pictures. These were not just pictures. They were portraits of the builders themselves. In all our travels, it was the first time we had seen their faces.",
    },
    {
      title: "Log 36",
      text: "Below each portrait was a name and a job. Gus walked the first row. \"Inventor,\" he read. \"Inventor. Inventor.\" The inventors had built the machines in the archive. Next to each portrait sat a model of what that builder had made: a drill that ran on steam, a pump that kept the vents open, a mixture of metals that did not rust in the cold. \"These makers did not just build things,\" said Gus. \"They invented new ways to build.\"",
    },
    {
      title: "Log 37",
      text: "The next row held the artists. One artist had painted the planet the way it looked when the builders came: no ice, just blue seas and green hills. A sculptor had carved a ship with its sails spread wide. Mel stopped at the last row. These were the explorers. In each portrait, the explorer held a small lamp, and the same picture was carved on every frame: a ship, a line of stars, and a planet no one on our crew could name.",
    },
    {
      title: "Log 38",
      text: "At the end of the hall, one portrait hung apart from the rest. A painter had made it with great care. It showed a pilot holding a map. The caption said: \"Our first explorer. She found the path.\" Ray held the Star Lens up to the picture, and the map lit up with the same line of stars. In a slot behind the portrait was a medal. \"The builders gave this to their explorers,\" said Ray. \"Now they have left it to us.\" Beyond the hall, Sam found a second ramp, going down into the quiet.",
    },
  ],
  relic: { name: "The Explorer's Medal", caption: "The builders gave this medal to their explorers. On the back: a ship, a line of stars, and the words \"Follow the path.\"" },
  story: "The crew enters the Hall of Makers and sees the builders' faces for the first time: portraits of their inventors, artists and explorers, and a medal left for whoever comes next.",
  spanish: "Strong cognates: -ture is often -tura in Spanish (temperature / temperatura, adventure / aventura, culture / cultura). People words often match too: -or is -or (actor, inventor), -ist is -ista (artist / artista), and -er is often -dor (explorer / explorador). Point out the match; the English endings are said differently.",
  miniLesson: {
    title: "-ture says \"cher\"; -er, -or, -ist can mean a person",
    steps: [
      "Write picture and nature. Box -ture. Say: it sounds like \"cher.\"",
      "Write invent, art, explore. Add -or, -ist, -er. Say: now each word names a person who does it.",
      "Sort five cards together: is it a -ture thing or a person word?",
      "Show the cognates: artista / artist, inventor / inventor, aventura / adventure.",
      "Read together: \"The explorer took a picture of the inventor.\"",
    ],
  },
};
