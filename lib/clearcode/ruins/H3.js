// ClearCode ruin H3 · au, aw, augh; ea as short e (UFLI 93-94).
// Two codes in one ruin: au/aw/augh say /aw/ (launch, claw, caught), and ea
// can say short e (head, bread). The sort puts /aw/ words against short e ea
// words, so game {targets, decoys} holds the "any code" list.
// Decodable rule for the logs: everything taught on Planets A-G, plus H1 (oo,
// u as in put), H2 (ew, ui, ue) and this ruin's au, aw, augh and short e ea,
// plus heart words. No oi/oy, no ou/ow as in cow, no kn/wr/mb, no suffixes
// beyond -s, -es, -ed, -ing. Checked by tools/clearcode-check.cjs.
export default {
  id: "H3",
  name: "Launch Yard",
  find: "au|aw|ea",
  code: {
    label: "/aw/ and short e",
    spellings: ["au", "aw", "augh", "ea"],
    rule: "au and aw say /aw/: au in the middle of a word, aw at the end or before n, l or k. augh says /aw/ too. ea can say short e, as in head.",
  },
  sort: {
    yes: "/aw/ vault", yesHint: "claw · haul",
    no: "Short e vault", noHint: "head · bread",
    hintYes: (w) => `${w} has au or aw, and they say /aw/ as in claw.`,
    hintNo: (w) => `${w} has ea, and here ea says short e as in head.`,
  },
  codex: [
    { w: "hawk", parts: ["h", "aw", "k"], hi: 1 },
    { w: "straw", parts: ["str", "aw"], hi: 1 },
    { w: "vault", parts: ["v", "au", "lt"], hi: 1 },
    { w: "caught", parts: ["c", "augh", "t"], hi: 1 },
    { w: "head", parts: ["h", "ea", "d"], hi: 1 },
    { w: "bread", parts: ["br", "ea", "d"], hi: 1 },
  ],
  checks: [
    ["launch", "lunch", "latch"], ["claw", "clay", "clap"], ["caught", "cat", "cut"],
    ["dawn", "den", "dent"], ["haul", "hail", "hull"], ["straw", "stray", "strap"],
    ["fault", "felt", "flat"], ["head", "had", "heed"], ["bread", "bead", "bend"],
    ["crawl", "curl", "cruel"], ["thread", "third", "throat"], ["sweat", "sweet", "swat"],
  ],
  vaultPicks: [
    ["yawn", "yarn", "yell"], ["sauce", "sake", "since"], ["pause", "pass", "pose"],
    ["daughter", "dagger", "darker"], ["ready", "rainy", "roomy"], ["heavy", "hefty", "hazy"],
    ["drawn", "drain", "drone"], ["autumn", "atom", "album"],
  ],
  // For the sort: /aw/ words are the bank, short e ea words are the contrast.
  bank: ["launch", "haul", "fault", "vault", "sauce", "pause", "cause", "haunt", "autumn", "author", "caught", "taught", "daughter", "claw", "draw", "straw", "dawn", "hawk", "crawl", "drawn", "lawn", "jaw", "raw", "thaw", "flaw", "sprawl", "yawn", "shawl", "paw", "saw"],
  contrast: ["head", "bread", "thread", "spread", "dead", "breath", "heavy", "ready", "sweat", "feather", "weather", "health", "instead", "steady", "meant", "deaf"],
  // Games: any au, aw, augh or ea word counts; decoys have none of them.
  game: {
    targets: ["launch", "claw", "caught", "hawk", "vault", "dawn", "straw", "haul", "head", "bread", "thread", "heavy", "weather", "spread"],
    decoys: ["lunch", "latch", "clap", "cut", "den", "bend", "felt", "flat", "bred", "sled", "hull", "strap"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "autumn", cuts: [2] },
      { w: "author", cuts: [2] },
      { w: "daughter", cuts: [5] },
      { w: "heavy", cuts: [4] },
      { w: "weather", cuts: [5] },
      { w: "instead", cuts: [2] },
    ],
  },
  forge: {
    items: [
      { w: "hauled", clue: "pulled something heavy (it already happened)", parts: ["haul", "ed"], explain: "haul + ed. The ending -ed means it already happened." },
      { w: "crawling", clue: "moving on hands and knees right now", parts: ["crawl", "ing"], explain: "crawl + ing. The ending -ing means it is happening now." },
      { w: "launches", clue: "more than one launch", parts: ["launch", "es"], explain: "launch + es. Words that end in ch take -es to mean more than one." },
      { w: "threads", clue: "more than one thread", parts: ["thread", "s"], explain: "thread + s. The ending -s means more than one." },
      { w: "spreading", clue: "moving out over a wide space right now", parts: ["spread", "ing"], explain: "spread + ing. The ending -ing means it is happening now." },
    ],
    extra: [{ t: "claw", k: "base" }, { t: "es", k: "suf" }, { t: "ing", k: "suf" }],
  },
  door: [
    { w: "claw", parts: ["c", "l", "aw"], extra: ["au", "a"] },
    { w: "haul", parts: ["h", "au", "l"], extra: ["aw", "a"] },
    { w: "dawn", parts: ["d", "aw", "n"], extra: ["au", "a"] },
    { w: "vault", parts: ["v", "au", "l", "t"], extra: ["aw", "a"] },
    { w: "caught", parts: ["c", "augh", "t"], extra: ["aw", "au"] },
    { w: "head", parts: ["h", "ea", "d"], extra: ["e", "ee"] },
    { w: "bread", parts: ["b", "r", "ea", "d"], extra: ["e", "ee"] },
  ],
  chains: [
    ["dawn", "lawn", "yawn", "yarn", "barn"],
    ["dead", "head", "heal", "heat"],
  ],
  heart: ["the", "said", "was", "of", "to", "do", "one", "they", "from"],
  vaultFake: [["fraul", "frul", "frail"], ["zaw", "zow", "zay"], ["glawt", "glat", "glit"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "At dawn we landed at the edge of a vast yard. The land was flat and scorched. Tam said, \"This was a launch site.\" Huge steel claws stood in a line, like hands that had held ships. Sand had spread over all of it. Then we saw a heavy slab in the middle. We spent the morning hauling sand off it with a crane.",
    },
    {
      title: "Crew log 2",
      text: "On the slab was a hawk, cut in the stone. Its claws held a thread, and the thread led up to the stars. Under the hawk was a line of code. Kit read it one chunk at a time: \"Pilots, launch at dawn. Do not wait for the storm.\" Kit said, \"They left in a rush. They did not wait for good weather.\" Just then, the slab shook under us.",
    },
    {
      title: "Crew log 3",
      text: "The slab slid back. Under it was a hatch. One by one, we crawled in. It was a long, dark tunnel with a cold draft. The walls had a fault, a deep crack from end to end. Mel said, \"It is not safe to stay long.\" Ahead, we saw a vault with a heavy steel lid. Gus got a grip on the latch.",
    },
    {
      title: "Crew log 4",
      text: "Gus pulled the latch with all his strength, and the vault lid fell back with a thud. Inside sat a small steel crest in the shape of a hawk. Its claws held a thread of gold, like the hawk on the slab. On the back, we saw dots in a line, like a path of stars. Ray held it up to the dawn light and said, \"This is not just a badge. It is a map.\" Then a deep crack spread up the wall, and we ran for the hatch.",
    },
  ],
  relic: { name: "The Hawk Crest", caption: "Builder pilots wore this hawk crest. The dots on the back are a map of the path they flew." },
  story: "The crew finds the builders' old launch yard and learns their pilots left in a rush before a storm, leaving behind a hawk crest with a star map on its back.",
  spanish: "Spanish au says /ow/ (auto, causa), and Spanish has no /aw/ sound, so students may read launch as \"lownch.\" Spanish also says both letters in e-a (idea), so point out that ea in head and bread says just one sound, short e.",
  miniLesson: {
    title: "au and aw say /aw/; ea can say short e",
    steps: [
      "Write haul and claw. Underline au and aw. Say: both say /aw/. au is in the middle; aw is at the end or before n, l or k.",
      "Write caught. Box augh. Say: these four letters say /aw/ too. The g and h are quiet.",
      "Write bead and head. Say: ea can say long e (bead) or short e (head). If one does not make a real word, try the other.",
      "Sort 6 cards together into /aw/ and short e: hawk, bread, dawn, heavy, vault, thread.",
      "Read together: \"At dawn, the hawk spread its claws over the vault.\"",
    ],
  },
};
