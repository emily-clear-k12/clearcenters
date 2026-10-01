// ClearDecode ruin F1 · ar (UFLI 77). Inscriptions use only patterns taught up
// to F1 (short vowels, -s, consonant teams, blends, silent e, soft c and g,
// endings, syllables, open and closed syllables, tch/dge, -ild/-old/-ind/-olt/
// -ost, y as a vowel, -le, and ar) plus heart words. No or, er, ir, ur and no
// vowel teams. Checked by tools/cleardecode-check.cjs.
export default {
  id: "F1",
  name: "Star Yard",
  find: "ar",
  code: { label: "ar", spellings: ["ar"], rule: "When r comes after a, the r changes the vowel. ar says /ar/, as in car." },
  sort: {
    yes: "ar vault", yesHint: "dark · chart",
    no: "Short a vault", noHint: "had · chat",
    hintYes: (w) => `${w} has ar. The r changes the a, so it says /ar/.`,
    hintNo: (w) => `${w} has a with no r after it, so the a is short.`,
  },
  codex: [
    { w: "dark", parts: ["d", "ar", "k"], hi: 1 },
    { w: "chart", parts: ["ch", "ar", "t"], hi: 1 },
    { w: "sharp", parts: ["sh", "ar", "p"], hi: 1 },
    { w: "harsh", parts: ["h", "ar", "sh"], hi: 1 },
    { w: "start", parts: ["st", "ar", "t"], hi: 1 },
    { w: "target", parts: ["t", "ar", "get"], hi: 1 },
  ],
  checks: [
    ["cart", "cat", "cot"], ["hard", "had", "herd"], ["farm", "form", "fan"],
    ["dark", "duck", "dock"], ["chart", "chat", "cheat"], ["sharp", "shape", "ship"],
    ["park", "pack", "perk"], ["barn", "ban", "born"], ["harm", "ham", "hum"],
    ["march", "match", "much"], ["shark", "shack", "shock"], ["smart", "smash", "smock"],
  ],
  vaultPicks: [
    ["marsh", "mash", "mesh"], ["scarf", "scuff", "scab"], ["arm", "am", "aim"], ["jar", "jam", "jab"],
    ["carpet", "cap", "capped"], ["garden", "gadget", "golden"], ["tar", "tan", "tab"], ["large", "lag", "ledge"],
  ],
  bank: ["dark", "chart", "sharp", "harsh", "target", "start", "cart", "hard", "farm", "park", "barn", "harm", "march", "shark", "smart", "marsh", "scarf", "arm", "jar", "carpet", "garden", "tar", "large", "car", "bar", "far", "art", "mark", "bark", "yard", "card", "star", "spark", "part", "charge", "alarm", "market"],
  contrast: ["had", "cat", "pat", "ham", "back", "chat", "pack", "mash", "cash", "fast", "tap", "cab", "jab", "lamp", "camp", "ash"],
  wall: {
    mode: "sounds",
    words: [
      { w: "dark", cuts: [1, 3] },
      { w: "chart", cuts: [2, 4] },
      { w: "sharp", cuts: [2, 4] },
      { w: "start", cuts: [1, 2, 4] },
      { w: "farm", cuts: [1, 3] },
      { w: "scarf", cuts: [1, 2, 4] },
    ],
  },
  forge: {
    items: [
      { w: "started", clue: "began, in the past", parts: ["start", "ed"], explain: "start + ed. The ending -ed means it already happened." },
      { w: "marked", clue: "put a mark on it, in the past", parts: ["mark", "ed"], explain: "mark + ed. The ending -ed means it already happened." },
      { w: "parking", clue: "setting a ship or car down right now", parts: ["park", "ing"], explain: "park + ing. The ending -ing means it is happening now." },
      { w: "charts", clue: "more than one chart", parts: ["chart", "s"], explain: "chart + s. The ending -s means more than one." },
      { w: "marches", clue: "walks in step (she ___ on)", parts: ["march", "es"], explain: "march + es. After ch, add -es." },
    ],
    extra: [{ t: "farm", k: "base" }, { t: "dark", k: "base" }],
  },
  door: [
    { w: "dark", parts: ["d", "ar", "k"], extra: ["or", "a"] },
    { w: "chart", parts: ["ch", "ar", "t"], extra: ["or", "a"] },
    { w: "farm", parts: ["f", "ar", "m"], extra: ["or", "a"] },
    { w: "sharp", parts: ["sh", "ar", "p"], extra: ["or", "a"] },
    { w: "march", parts: ["m", "ar", "ch"], extra: ["or", "tch"] },
    { w: "yard", parts: ["y", "ar", "d"], extra: ["or", "a"] },
    { w: "smart", parts: ["s", "m", "ar", "t"], extra: ["or", "a"] },
  ],
  chains: [
    ["card", "cart", "part", "dart", "dark"],
    ["bark", "barn", "yarn", "yard", "hard"],
  ],
  heart: ["the", "a", "said", "was", "of", "to", "they", "where", "for", "put", "go"],
  vaultFake: [["plarg", "plag", "plog"], ["blarn", "blan", "blun"], ["skarp", "skap", "skup"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "Kit and Gus landed on a dark planet with a hard, sharp crust. Far off was a vast yard. In it sat lines of old ships, all of them rusty and still. \"It is a ship yard,\" said Gus. \"This is where they made the ships,\" said Kit. A cold wind kicked up dust. Kit felt a spark of hope. \"Let's start at the big ship in the middle.\"",
    },
    {
      title: "Crew log 2",
      text: "The big ship had a long scar on its hull, as if a blast had hit it. Its hatch was stuck, so Kit got a metal bar and gave it a hard yank. The hatch swung open with a sharp crack. Inside, the ship was dark. Carts and cables sat in a jumble on the deck. Gus lit a lamp and held it up. A big alarm still blinked on the wall. Blink. Blink. Blink.",
    },
    {
      title: "Crew log 3",
      text: "Kit and Gus went up to the top deck. Its dome was glass, and on the glass was a big chart. It had dots and a line, just like the sky disc. But the line on this chart went past the sun and on, far, far into the dark. At the end of it was a star with a mark: a ring with a dot in it. \"That is where they went,\" said Kit. \"It is so far.\"",
    },
    {
      title: "Crew log 4",
      text: "Next to the big chart was a slot. In it sat a thin card of hard metal. It had the same dots and line, and the same ring at the end. \"A chart to take with them,\" said Gus. Kit put the card in a box for the lab. As the ship lifted off the dark planet, Gus said, \"Did they wish for us to find it?\" Kit had a hunch, but kept it in.",
    },
  ],
  relic: { name: "The Star Chart", caption: "A card of hard metal marked with a path of dots that ends at a far star: a ring with a dot in it." },
  story: "In a yard of old ships on a dark planet, the crew finds a glass dome chart that traces the builders' path far past their sun to one marked star.",
  spanish: "Spanish r is tapped and does not change the vowel before it, so students may say car with a clear Spanish a and a tapped r. Cognates help: arte/art, parque/park, marcha/march.",
  miniLesson: {
    title: "ar: car, dark, chart",
    steps: [
      "Write cat and cart. Read both. Say: when r comes after a, the r changes the vowel. ar says /ar/.",
      "Read a column together: car, far, dark, chart, start. Underline ar in each.",
      "Sort 8 cards: had, hard, cat, cart, pack, park, ham, harm.",
      "Dictate 3 words (farm, sharp, yard). Students say the sounds, then spell with ar as one chip.",
      "Read together: \"Kit and Gus start the dark ship with a sharp jolt.\"",
    ],
  },
};
