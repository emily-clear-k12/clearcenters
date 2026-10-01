// ClearCode ruin E2 · long vowel before two consonants: -ild, -old, -ind,
// -olt, -ost (UFLI 72). Inscriptions use only patterns taught up to E2 (short
// vowels, -s, consonant teams, blends, silent e, soft c and g, endings, syllables,
// open and closed syllables, tch/dge, and -ild/-old/-ind/-olt/-ost) plus heart
// words. No y as a vowel, no -le, no r-controlled vowels, no vowel teams.
// Checked by tools/clearcode-check.cjs.
export default {
  id: "E2",
  name: "Cold Post",
  find: "ild|old|ind|olt|ost",
  code: { label: "long vowel + two consonants", spellings: ["ild", "old", "ind", "olt", "ost"], rule: "i before ld or nd says long i (find). o before ld, lt or st says long o (cold, bolt, most)." },
  sort: {
    yes: "Long vowel vault", yesHint: "cold · find",
    no: "Short vowel vault", noHint: "belt · pond",
    hintYes: (w) => `${w} has i or o before ld, nd, lt or st, so the vowel is long.`,
    hintNo: (w) => `${w} is closed in by consonants with no long-vowel team, so the vowel is short.`,
  },
  codex: [
    { w: "cold", parts: ["c", "old"], hi: 1 },
    { w: "find", parts: ["f", "ind"], hi: 1 },
    { w: "most", parts: ["m", "ost"], hi: 1 },
    { w: "child", parts: ["ch", "ild"], hi: 1 },
    { w: "jolt", parts: ["j", "olt"], hi: 1 },
    { w: "behind", parts: ["be", "h", "ind"], hi: 2 },
  ],
  checks: [
    ["find", "fond", "fund"], ["cold", "clod", "cod"], ["mind", "mend", "mint"],
    ["most", "mist", "must"], ["hold", "held", "hod"], ["gold", "golf", "glad"],
    ["child", "chill", "chin"], ["kind", "kid", "kin"], ["jolt", "jot", "jet"],
    ["post", "past", "pest"], ["told", "tall", "till"], ["blind", "blend", "bland"],
  ],
  vaultPicks: [
    ["grind", "grand", "grin"], ["fold", "fled", "fond"], ["host", "hot", "hut"], ["volt", "vat", "vet"],
    ["mild", "mud", "melt"], ["scold", "scald", "skid"], ["behind", "beyond", "bend"], ["bind", "band", "bend"],
  ],
  bank: ["wild", "mild", "child", "find", "mind", "kind", "bind", "blind", "grind", "behind", "remind", "cold", "old", "bold", "fold", "gold", "hold", "mold", "sold", "told", "scold", "bolt", "colt", "jolt", "volt", "molt", "most", "post", "host", "almost"],
  contrast: ["belt", "melt", "wilt", "milk", "film", "fond", "pond", "bond", "band", "hint", "mint", "list", "fist", "kilt", "gift", "mend"],
  wall: {
    mode: "sounds",
    words: [
      { w: "cold", cuts: [1, 2, 3] },
      { w: "find", cuts: [1, 2, 3] },
      { w: "child", cuts: [2, 3, 4] },
      { w: "most", cuts: [1, 2, 3] },
      { w: "jolt", cuts: [1, 2, 3] },
      { w: "blind", cuts: [1, 2, 3, 4] },
    ],
  },
  forge: {
    items: [
      { w: "folded", clue: "bent over on itself, in the past", parts: ["fold", "ed"], explain: "fold + ed. The ending -ed means it already happened." },
      { w: "finding", clue: "coming upon something right now", parts: ["find", "ing"], explain: "find + ing. The ending -ing means it is happening now." },
      { w: "bolted", clue: "locked shut with a bolt", parts: ["bolt", "ed"], explain: "bolt + ed. The ending -ed means it already happened." },
      { w: "holds", clue: "keeps it in a hand (she ___ it)", parts: ["hold", "s"], explain: "hold + s. Add -s to an action word for he, she or it." },
      { w: "posts", clue: "more than one post", parts: ["post", "s"], explain: "post + s. The ending -s means more than one." },
    ],
    extra: [{ t: "es", k: "suf" }, { t: "cold", k: "base" }, { t: "mind", k: "base" }],
  },
  door: [
    { w: "cold", parts: ["c", "o", "l", "d"], extra: ["a", "u"] },
    { w: "find", parts: ["f", "i", "n", "d"], extra: ["e", "a"] },
    { w: "most", parts: ["m", "o", "s", "t"], extra: ["u", "i"] },
    { w: "child", parts: ["ch", "i", "l", "d"], extra: ["e", "a"] },
    { w: "jolt", parts: ["j", "o", "l", "t"], extra: ["e", "i"] },
    { w: "blind", parts: ["b", "l", "i", "n", "d"], extra: ["e", "a"] },
    { w: "told", parts: ["t", "o", "l", "d"], extra: ["e", "i"] },
  ],
  chains: [
    ["cold", "bold", "bolt", "jolt", "colt"],
    ["find", "kind", "mind", "mild", "wild"],
  ],
  heart: ["the", "a", "said", "was", "of", "to", "they", "were", "people", "one", "two", "too", "put", "for", "we", "someone", "something"],
  vaultFake: [["plold", "plald", "pleld"], ["vind", "vand", "vund"], ["skolt", "skilt", "skalt"], ["trost", "trast", "trist"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "Kit and Mel landed on a cold, wild slope. Ice hid most of the rocks. Long ago, someone had set up a post on the ridge, a stone hut as old as the planet. Kit did not mind the cold. \"We will find a hatch,\" Kit said. Mel told Kit to hold the rope. At the back of the hut, Mel spots it: a hatch with a gold bolt.",
    },
    {
      title: "Crew log 2",
      text: "The bolt was stuck in the cold. Kit held it with two hands and gave it a jolt. It did not budge. \"It is too cold,\" said Mel. Mel set a hot lamp on the bolt. Then Kit gave it a big jolt, and the bolt slid back. The hatch swung open. Behind it, stone steps went into the hill. Kit and Mel went in with the lamp.",
    },
    {
      title: "Crew log 3",
      text: "Inside was a long hall, cold and still. Mel held up the lamp. Most of the walls had lines cut into the stone. \"It is a map,\" said Kit. The map had a big sun and a lot of ice. Then the sun got dim, and the ice got big. Next, a line of old men, moms, and a child went up the slope and into the hill. \"It got too cold,\" said Mel. \"They had to find a home inside.\" But at the end of the map, one line went up, past the sun.",
    },
    {
      title: "Crew log 4",
      text: "At the end of the hall was a small stone box. Kit told Mel to hold the lamp. Inside the box, on a fold of cloth, was a gold bolt as long as a hand. It had the same lines cut on it as the map: the sun, the ice, and the line that went up past the sun. \"It must fit in something,\" said Mel. \"But in what?\" Kit put the bolt in a case for the lab. The cold post had kept it safe for a long, long time.",
    },
  ],
  relic: { name: "The Gold Bolt", caption: "A gold bolt cut with the same map as the walls: a dim sun, the ice, and one line going up past the sun." },
  story: "In an old stone post on an icy ridge, the crew finds a wall map showing the builders moving inside the hills as their sun grew dim, and one line that leads up past the sun.",
  spanish: "Spanish i always says /ee/, so find may come out as \"feend.\" Spanish o is close to English long o, so -old and -ost words are often easier. Teach the five families as words that break the closed-syllable rule.",
  miniLesson: {
    title: "Long vowels before two consonants: find, cold, bolt, most",
    steps: [
      "Write mint and mind. Read both. Say: mint follows the closed-syllable rule, but i before nd is often long.",
      "Write the five families: ild, ind, old, olt, ost. Read each with a word: wild, find, cold, bolt, most.",
      "Sort 8 cards into long or short: cold, belt, find, fond, most, mist, child, milk.",
      "Dictate 3 words (told, kind, post). Students say the word, tap the sounds, then spell it.",
      "Read together: \"Kit told Mel to hold the gold bolt.\"",
    ],
  },
};
