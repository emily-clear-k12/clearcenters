// ClearDecode ruin H1 · oo (as in moon and as in book), u (as in put) (UFLI 89-90).
// Inscriptions use only patterns taught up to H1 (all of Planets A-G, plus
// oo and u as in put) plus heart words. No ew/ui/ue (H2), au/aw (H3),
// oi/oy (H4), ou/ow as in cow (H5) in the logs.
// The sort is by sound: "moon" oo words (bank) vs "book" oo words and u as
// in put (contrast). Both sides have the code, so the games use
// game.targets / game.decoys. Checked by tools/cleardecode-check.cjs.
export default {
  id: "H1",
  name: "The Moon Docks",
  find: "oo",
  code: { label: "oo", spellings: ["oo"], rule: "oo can say /oo/ as in moon or the shorter sound in book. In a few words, like put, push and full, u makes the book sound too" },
  sort: {
    yes: "Moon vault", yesHint: "moon · scoop",
    no: "Book vault", noHint: "book · push",
    hintYes: (w) => `In ${w}, oo says /oo/, as in moon.`,
    hintNo: (w) => (/oo/.test(w) ? `In ${w}, oo says the short sound in book.` : `In ${w}, u says the short sound in book.`),
  },
  codex: [
    { w: "moon", parts: ["m", "oo", "n"], hi: 1 },
    { w: "scoop", parts: ["sc", "oo", "p"], hi: 1 },
    { w: "roof", parts: ["r", "oo", "f"], hi: 1 },
    { w: "book", parts: ["b", "oo", "k"], hi: 1 },
    { w: "wood", parts: ["w", "oo", "d"], hi: 1 },
    { w: "foot", parts: ["f", "oo", "t"], hi: 1 },
  ],
  checks: [
    ["moon", "man", "mean"], ["room", "ram", "rim"], ["book", "back", "bake"],
    ["cool", "coal", "call"], ["food", "fed", "fad"], ["foot", "fat", "fit"],
    ["shook", "shack", "shock"], ["spoon", "spin", "span"], ["wood", "wad", "wed"],
    ["root", "rot", "rat"], ["stood", "stud", "stand"], ["loop", "lap", "lip"],
  ],
  vaultPicks: [
    ["smooth", "smith", "smash"], ["bloom", "blame", "blimp"], ["shoot", "shot", "shut"], ["brook", "brick", "break"],
    ["tooth", "teeth", "tenth"], ["goose", "geese", "gust"], ["crook", "crack", "croak"], ["proof", "prop", "prom"],
  ],
  // For the sort: "moon" words are the bank, "book" words (and u as in put) are the contrast.
  bank: ["moon", "soon", "noon", "room", "boom", "zoom", "broom", "cool", "pool", "tool", "stool", "spool", "food", "mood", "roof", "root", "boot", "shoot", "loop", "scoop", "hoop", "boost", "tooth", "booth", "smooth", "spoon", "goose", "loose", "bloom", "proof", "bamboo", "balloon", "toolbox", "moonbeam"],
  contrast: ["book", "look", "took", "cook", "hook", "shook", "brook", "wood", "good", "hood", "stood", "foot", "push", "pull", "full", "put"],
  // Games: any oo word counts (moon or book sound); decoys have no oo.
  game: {
    targets: ["moon", "room", "cool", "tool", "boot", "scoop", "boost", "roof", "spoon", "food", "book", "hook", "wood", "foot", "stood", "good", "shook", "look"],
    decoys: ["hot", "rot", "mob", "stop", "lock", "rock", "block", "cot", "shop", "slot", "spot", "plot", "drop", "flock"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "balloon", cuts: [3] },
      { w: "toolbox", cuts: [4] },
      { w: "moonbeam", cuts: [4] },
      { w: "footprint", cuts: [4] },
      { w: "bamboo", cuts: [3] },
      { w: "woodland", cuts: [4] },
    ],
  },
  forge: {
    items: [
      { w: "boosted", clue: "gave a push up in the past", parts: ["boost", "ed"], explain: "boost + ed. The ending -ed means it already happened." },
      { w: "hooks", clue: "more than one hook", parts: ["hook", "s"], explain: "hook + s. The ending -s means more than one." },
      { w: "pushes", clue: "gives a push", parts: ["push", "es"], explain: "push + es. Words that end in sh take -es." },
      { w: "pulling", clue: "tugging on something right now", parts: ["pull", "ing"], explain: "pull + ing. The ending -ing means it is happening now." },
      { w: "scooped", clue: "lifted up with a scoop in the past", parts: ["scoop", "ed"], explain: "scoop + ed. The ending -ed means it already happened." },
    ],
    extra: [{ t: "look", k: "base" }, { t: "cool", k: "base" }, { t: "er", k: "suf" }],
  },
  door: [
    { w: "moon", parts: ["m", "oo", "n"], extra: ["u", "o"] },
    { w: "book", parts: ["b", "oo", "k"], extra: ["u", "o"] },
    { w: "push", parts: ["p", "u", "sh"], extra: ["oo", "o"] },
    { w: "pull", parts: ["p", "u", "ll"], extra: ["oo", "o"] },
    { w: "scoop", parts: ["s", "c", "oo", "p"], extra: ["u", "o"] },
    { w: "foot", parts: ["f", "oo", "t"], extra: ["u", "o"] },
    { w: "roof", parts: ["r", "oo", "f"], extra: ["u", "o"] },
  ],
  chains: [
    ["hook", "look", "book", "boot", "boom"],
    ["root", "roof", "hoof", "hood", "good"],
  ],
  heart: ["the", "a", "to", "of", "was", "said", "were", "could", "where", "he", "go"],
  vaultFake: [["froom", "frum", "fram"], ["blook", "bluk", "blak"], ["gloob", "glub", "glab"], ["vook", "vuk", "vak"]],
  inscriptions: [
    {
      title: "Explorer's log: the moon",
      text: "The night lens led us off the sea planet. We followed its flight path for six weeks, and it took us to a moon. The moon was cool and gray, so we put on helmets and boots. Soon, Gus had a hit on the scan. Below a ridge was a huge stone dock with a roof. The makers had made it for ships. It was empty, but hooks on the roof still held long ropes.",
    },
    {
      title: "Explorer's log: the hatch",
      text: "Mel pushed on a hatch in the side of the dock. It did not budge. Then Ray pulled a bar, and the hatch slid open with a boom. Inside was a long room full of desks and stools. Dust was thick on the stools. On one desk sat a book, and next to it was a cup with a spoon in it. It looked as if the pilots had left in a rush.",
    },
    {
      title: "Explorer's log: the pilot's log",
      text: "Ray took the book to the lamp in the dock room. Its pages were full of the makers' code, and we could read most of it. It was a pilot's log. Each page had a ship and the name of a moon or a planet. The last ship left at noon. Then Kit said, \"Look at this.\" Under the last line, a pilot had put a loop of ink on one star.",
    },
    {
      title: "Explorer's log: the pilot book",
      text: "We could not tell where the star in the loop was. But the book had more: a sketch of a ship, and a note in the makers' code. It said: \"To the next pilot. Take this book. Go to the star in the loop.\" The makers left this book for a pilot like us. We will take it back to the ship, and soon we will set off for that star.",
    },
  ],
  relic: { name: "The Pilot Book", caption: "A builder pilot's log, left in a moon dock with a note: take this book and go to the star in the loop." },
  story: "The flight path leads the crew to a builder ship dock on a moon, where a pilot's log book was left behind with a note for the next pilot: go to the star in the loop.",
  spanish: "The oo in moon matches Spanish u (as in 'luna'), so it transfers. The short sound in book and put does not exist in Spanish, so students may read look as 'Luke' and pull as 'pool.' Practice those pairs out loud.",
  miniLesson: {
    title: "oo two ways: moon and book (and u in put)",
    steps: [
      "Write moon and book. Underline oo in both. Say: oo has two sounds. Try the moon sound first; if it is not a real word, try the book sound.",
      "Read moon/book, food/foot, pool/pull. Have students say each pair and feel how the book sound is shorter.",
      "Write put, push, full. Say: in these words u makes the book sound too.",
      "Sort 6 cards into a moon pile and a book pile: room, wood, scoop, look, cool, push.",
      "Read one sentence together: \"Soon we took the book to the room on the moon.\"",
    ],
  },
};
