// ClearDecode ruin D2 · syllables: compound words and closed + closed (UFLI 66-67).
// Decodable rule for this ruin: everything from Planets A-C, the endings
// -es/-ed/-ing (D1), plus two-syllable words made of two closed syllables
// (mag | net, sun | set, hill | top), plus heart words. No open syllables
// yet (D3: robot, open, planet), no tch/dge, no r-controlled vowels, no
// vowel teams. Checked by tools/cleardecode-check.cjs.
// `find` matches a word with two or more consonants between two vowels (the
// VC | CV pattern). Its second branch matches the two-consonant codex chunk,
// so the codex glows on the letters where the word is cut. Logs avoid
// one-syllable -ed words (jumped, checked) because they would match too.
export default {
  id: "D2",
  name: "Sunset Hill",
  find: "[aeiou][b-df-hj-np-tv-z]{2,}[aeiou]|^[b-df-hj-np-tv-z]{2}$",
  code: { label: "closed + closed syllables", spellings: ["two closed syllables"], rule: "when two consonants sit between two vowels, cut between them: mag | net, sun | set. Each chunk is closed, so each vowel is short." },
  sort: {
    yes: "Two syllables vault", yesHint: "mag | net · sun | set",
    no: "One syllable vault", noHint: "drift · stamp",
    hintYes: (w) => `${w} has two closed syllables. Cut between the consonants in the middle.`,
    hintNo: (w) => `${w} has just one vowel sound, so it is one syllable.`,
  },
  codex: [
    { w: "magnet", parts: ["ma", "gn", "et"], hi: 1 },
    { w: "napkin", parts: ["na", "pk", "in"], hi: 1 },
    { w: "laptop", parts: ["la", "pt", "op"], hi: 1 },
    { w: "insect", parts: ["i", "ns", "ect"], hi: 1 },
    { w: "tablet", parts: ["ta", "bl", "et"], hi: 1 },
    { w: "submit", parts: ["su", "bm", "it"], hi: 1 },
  ],
  checks: [
    ["tablet", "table", "tab"], ["contest", "context", "content"], ["problem", "probe", "probing"],
    ["helmet", "helm", "hello"], ["dentist", "dent", "dense"], ["basket", "bask", "bucket"],
    ["picnic", "pick", "panic"], ["hilltop", "hill", "hilt"], ["rocket", "rock", "racket"],
    ["sandbox", "sandbag", "sand"], ["muffin", "muff", "puffin"], ["velvet", "valve", "vest"],
  ],
  vaultPicks: [
    ["cobweb", "cob", "web"], ["laptop", "lap", "lapse"], ["insect", "insert", "inset"], ["invent", "invest", "event"],
    ["upset", "upon", "set"], ["trumpet", "trump", "trumpets"], ["fantastic", "fantasy", "fan"], ["jacket", "jack", "jackal"],
  ],
  bank: ["sunset", "upload", "napkin", "magnet", "tablet", "laptop", "insect", "rocket", "hilltop", "cobweb", "bedrock", "helmet", "problem", "contest", "dentist", "basket", "picnic", "sandbox", "muffin", "velvet", "plastic", "invent", "expand", "compass", "tunnel", "sudden", "common", "jacket", "pocket", "ticket", "trumpet", "fantastic", "until", "within", "himself", "pumpkin", "admit", "submit"],
  contrast: ["sprint", "drift", "stamp", "blunt", "trunk", "script", "thrust", "clamp", "plank", "brisk", "crisp", "splint", "strand", "shrimp"],
  wall: {
    mode: "syllables",
    words: [
      { w: "sunset", cuts: [3] },
      { w: "napkin", cuts: [3] },
      { w: "hilltop", cuts: [4] },
      { w: "problem", cuts: [4] },
      { w: "contest", cuts: [3] },
      { w: "fantastic", cuts: [3, 6] },
    ],
  },
  forge: {
    items: [
      { w: "insects", clue: "more than one insect", parts: ["insect", "s"], explain: "insect + s. The ending -s means more than one." },
      { w: "invented", clue: "made something new, in the past", parts: ["invent", "ed"], explain: "invent + ed. After t, -ed is its own chunk: in-vent-ed." },
      { w: "expanding", clue: "getting bigger right now", parts: ["expand", "ing"], explain: "expand + ing. The ending -ing means it is happening now." },
      { w: "sandboxes", clue: "more than one sandbox", parts: ["sandbox", "es"], explain: "sandbox + es. After x, add -es to mean more than one." },
      { w: "magnets", clue: "more than one magnet", parts: ["magnet", "s"], explain: "magnet + s. The ending -s means more than one." },
    ],
    extra: [{ t: "tablet", k: "base" }, { t: "contest", k: "base" }],
  },
  door: [
    { w: "napkin", parts: ["nap", "kin"], extra: ["nep", "ken"] },
    { w: "magnet", parts: ["mag", "net"], extra: ["meg", "nit"] },
    { w: "tablet", parts: ["tab", "let"], extra: ["tib", "lit"] },
    { w: "insect", parts: ["in", "sect"], extra: ["en", "sict"] },
    { w: "helmet", parts: ["hel", "met"], extra: ["hal", "mit"] },
    { w: "hilltop", parts: ["hill", "top"], extra: ["hil", "tap"] },
    { w: "contest", parts: ["con", "test"], extra: ["cun", "tast"] },
  ],
  chains: [
    ["rocket", "pocket", "packet", "jacket", "racket"],
    ["tunnel", "funnel", "fennel", "kennel"],
  ],
  heart: ["the", "a", "of", "to", "was", "we", "no", "one", "so", "go", "said", "they", "from"],
  vaultFake: [["zibnap", "zibnop", "zabnap"], ["tolfin", "tilfin", "talfin"], ["mabsut", "mobsut", "mibsut"], ["fendlop", "fondlop", "findlop"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "At sunset, we left the docks. A path went up to a hilltop. At the top was a vast site with lots of stone huts. Sand had cut them. No one was in them. Kit went in a hut. Cobwebs hung in it, and insects ran on the bedrock. In the dust was a helmet and a black tablet. \"Is this a problem?\" said Mel. \"Not yet,\" said Tam.",
    },
    {
      title: "Crew log 2",
      text: "Tam held up the tablet. On it was a sun. At the top of the tablet, the sun was a vast, hot disk. At the end, the sun was small and dim. \"The sun got dim,\" said Gus. \"That was a big problem.\" Kit held the tablet up to the sunset. At the end, a line went from the hilltop to a hole in the bedrock. \"They dug in,\" said Kit.",
    },
    {
      title: "Crew log 3",
      text: "Gus had a compass from the hut. Sam led us to a pit at the back of the hilltop. In the pit was a tunnel, and at the end of the tunnel was a stone gate with a magnet in it. The gate was shut. Kit and Gus held up a lamp. Tam set the compass on the magnet. The compass spun and spun. Then it went still. With a sudden thud, the gate went up.",
    },
    {
      title: "Crew log 4",
      text: "The tunnel was dim, so Tam lit a lamp. Gus held up the compass. The tip did not spin back to the hilltop. It went to the end of the tunnel and held still. \"That is not a common compass,\" said Mel. \"It tracks them,\" said Kit. \"It can get us to them.\" Gus slid the compass in his jacket. We will rest in the tunnel, and then we will go on.",
    },
  ],
  relic: { name: "The Sunset Compass", caption: "A compass from the builders' hilltop huts. It does not point north. It points the way the builders went." },
  story: "In the empty hilltop huts, a tablet shows their sun growing dim and a line into the bedrock. A builders' compass opens a tunnel gate and points the crew down the tunnel.",
  spanish: "Spanish speakers are used to clapping clear syllables (ca-sa, pa-pel), which helps here. Spanish also has compound words (sacapuntas, paraguas), so name the idea: two small words make one big word. The new part is that each English closed syllable keeps a short vowel.",
  miniLesson: {
    title: "Two closed syllables: mag | net",
    steps: [
      "Write magnet. Put a dot over each vowel. Say: two vowels, so two syllables.",
      "Point to the two consonants between the vowels (g, n). Draw a line between them: mag | net.",
      "Read each chunk: mag, net. Each chunk is closed by a consonant, so the vowel is short. Then read the whole word.",
      "Do the same with napkin, sunset and hilltop. Point out that sunset and hilltop are two small words put together.",
      "Read together: \"At sunset, we went up the hilltop with a magnet and a tablet.\"",
    ],
  },
};
