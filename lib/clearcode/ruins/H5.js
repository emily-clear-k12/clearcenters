// ClearCode ruin H5 · ou, ow as in cow (UFLI 96-97).
// Decodable rule for the logs: everything taught on Planets A-G, plus H1 (oo,
// u as in put), H2 (ew, ui, ue), H3 (au, aw, augh, short e ea), H4 (oi, oy)
// and this ruin's ou and ow (cloud, cow, tower), plus heart words. No
// kn/wr/mb, no suffixes beyond -s, -es, -ed, -ing. ou as /oo/ (group) and
// ough come later (J3). Checked by tools/clearcode-check.cjs.
export default {
  id: "H5",
  name: "The Cloud Tower",
  find: "ou|ow",
  code: { label: "/ow/ as in cow", spellings: ["ou", "ow"], rule: "ou and ow both say /ow/: ou in the middle of a word, ow at the end or before n, l or er" },
  sort: {
    yes: "/ow/ vault", yesHint: "cloud · tower",
    no: "No /ow/ vault", noHint: "clod · tiger",
    hintYes: (w) => `${w} has ou or ow, and here they say /ow/ as in cow.`,
    hintNo: (w) => `${w} has no ou or ow, so there is no /ow/ sound.`,
  },
  codex: [
    { w: "ground", parts: ["gr", "ou", "nd"], hi: 1 },
    { w: "count", parts: ["c", "ou", "nt"], hi: 1 },
    { w: "south", parts: ["s", "ou", "th"], hi: 1 },
    { w: "power", parts: ["p", "ow", "er"], hi: 1 },
    { w: "crowd", parts: ["cr", "ow", "d"], hi: 1 },
    { w: "brown", parts: ["br", "ow", "n"], hi: 1 },
  ],
  checks: [
    ["shout", "shot", "shut"], ["ground", "grand", "grind"], ["crowd", "card", "cord"],
    ["power", "paper", "poker"], ["mouth", "moth", "math"], ["count", "coat", "cant"],
    ["tower", "tiger", "taper"], ["brown", "brain", "bran"], ["sound", "sand", "send"],
    ["proud", "prod", "pride"], ["frown", "frame", "front"], ["mount", "meant", "mint"],
  ],
  vaultPicks: [
    ["found", "fond", "fund"], ["growl", "girl", "grill"], ["pouch", "porch", "patch"],
    ["shower", "shaker", "shiver"], ["crown", "corn", "crane"], ["scout", "scoot", "scat"],
    ["drown", "drone", "drain"], ["outer", "otter", "utter"],
  ],
  bank: ["cloud", "ground", "south", "shout", "count", "mouth", "sound", "proud", "mount", "found", "pouch", "scout", "outer", "round", "loud", "out", "about", "around", "mountain", "thousand", "couch", "pound", "cow", "now", "how", "down", "town", "brown", "crowd", "power", "tower", "crown", "frown", "growl", "howl", "drown", "shower", "flower", "allow", "owl"],
  contrast: ["clod", "shot", "grand", "cord", "paper", "moth", "coat", "tiger", "bran", "sand", "prod", "front", "mint", "fund", "porch", "drone"],
  wall: {
    mode: "syllables",
    words: [
      { w: "tower", cuts: [3] },
      { w: "power", cuts: [3] },
      { w: "mountain", cuts: [4] },
      { w: "thousand", cuts: [4] },
      { w: "allow", cuts: [2] },
      { w: "shower", cuts: [4] },
    ],
  },
  forge: {
    items: [
      { w: "counted", clue: "found how many (it already happened)", parts: ["count", "ed"], explain: "count + ed. The ending -ed means it already happened." },
      { w: "shouting", clue: "calling out loud right now", parts: ["shout", "ing"], explain: "shout + ing. The ending -ing means it is happening now." },
      { w: "clouds", clue: "more than one cloud", parts: ["cloud", "s"], explain: "cloud + s. The ending -s means more than one." },
      { w: "pouches", clue: "more than one pouch", parts: ["pouch", "es"], explain: "pouch + es. Words that end in ch take -es to mean more than one." },
      { w: "growled", clue: "made a low, angry sound (it already happened)", parts: ["growl", "ed"], explain: "growl + ed. The ending -ed means it already happened." },
    ],
    extra: [{ t: "sound", k: "base" }, { t: "ing", k: "suf" }, { t: "es", k: "suf" }],
  },
  door: [
    { w: "shout", parts: ["sh", "ou", "t"], extra: ["ow", "o"] },
    { w: "ground", parts: ["g", "r", "ou", "n", "d"], extra: ["ow", "o"] },
    { w: "crowd", parts: ["c", "r", "ow", "d"], extra: ["ou", "o"] },
    { w: "town", parts: ["t", "ow", "n"], extra: ["ou", "o"] },
    { w: "count", parts: ["c", "ou", "n", "t"], extra: ["ow", "o"] },
    { w: "brown", parts: ["b", "r", "ow", "n"], extra: ["ou", "o"] },
    { w: "south", parts: ["s", "ou", "th"], extra: ["ow", "o"] },
  ],
  chains: [
    ["town", "gown", "down", "dawn"],
    ["shout", "stout", "snout", "spout"],
  ],
  heart: ["the", "said", "was", "of", "to", "one", "they", "were", "there", "could", "where", "from"],
  vaultFake: [["plound", "plond", "pland"], ["skout", "skot", "skit"], ["drowm", "drom", "dram"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "The point of light was at the top of a tower on a high mountain. Clouds hid the top, and a cold wind howled around it. We landed on flat ground at the foot of the mountain. Mel counted the steps cut in the rock. \"A thousand steps,\" she said. \"Let's go.\" We set out at dawn with packs on our backs.",
    },
    {
      title: "Crew log 2",
      text: "By noon we were deep in the clouds. Sounds came from up high: a low hum, then a loud crack, like thunder. Gus said it was a storm, but there was no rain. Then we saw it. At the top of the tower, a round lamp was turning, and its beam swept out past the clouds. We were out of breath, but we kept going.",
    },
    {
      title: "Crew log 3",
      text: "At the top was a round room with a big glass dome. In the middle, the lamp spun on a steel post. We could not shut it down. Then Ray found a panel with a crown on it, and he pushed the crown. The lamp went still. The beam swung south and held. \"It points to a planet,\" Ray said. \"Not this one. It is out past the stars.\"",
    },
    {
      title: "Crew log 4",
      text: "Ray took the lamp down from its post. It was not big, but it was full of power. Its glass had a map cut in it: our sun, then a path, then a small brown dot. Tam said, \"That dot is where they went.\" On the way down, the clouds broke up, and for the first time we could see the sky from the tower. It was full of stars.",
    },
  ],
  relic: { name: "The Tower Lamp", caption: "The lamp from the top of the builders' tower. A map is cut in its glass, and its beam points to the next world." },
  story: "The crew follows the point of light up a cloud-wrapped mountain tower and finds a lamp whose glass holds a map to the planet where the builders went next.",
  spanish: "The /ow/ sound is close to Spanish au (auto, causa), so students may spell cloud as \"claud.\" Teach that English spells this sound ou or ow. Spanish rarely uses ou or ow at all.",
  miniLesson: {
    title: "ou and ow say /ow/",
    steps: [
      "Write cloud and cow. Underline ou and ow. Say: both say /ow/, the sound you make when you get hurt.",
      "Ask: where is ou? (middle). Where is ow? (end, or before n, l or er). English words almost never end in ou.",
      "Remind: ow can also say long o (snow). If /ow/ does not make a real word, try long o.",
      "Sort 6 cards together: shout, town, ground, power, mouth, crowd.",
      "Read together: \"A loud sound came from the top of the tower.\"",
    ],
  },
};
