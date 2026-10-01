// ClearDecode ruin D3 · open and closed syllables (UFLI 68).
// Decodable rule for this ruin: everything through D2 (Planets A-C, endings
// -es/-ed/-ing, closed + closed syllables) plus open syllables: a syllable
// that ends with its vowel says the vowel's name (ro | bot, si | lent, he,
// go), plus heart words. No tch/dge, no r-controlled vowels, no vowel teams.
// Checked by tools/cleardecode-check.cjs.
// `find` matches one consonant between two vowels (ro | bot), not counting
// silent-e words (gate, gates, ice), and one-syllable open words (he, she, we, go,
// so, no). Closed-first words like cabin and planet match it too, so they are
// kept out of the logs and used as sort contrast (with game.decoys below).
export default {
  id: "D3",
  name: "Frozen Tunnels",
  find: "[aeiou][b-df-hj-np-tv-z](?!es?$)[aeiou]|^(?!(the|to|do|who|two|a)$)[b-df-hj-np-tv-z]{0,2}[aeiou]$",
  code: { label: "open and closed syllables", spellings: ["an open syllable"], rule: "a syllable that ends with its vowel is open, so the vowel says its name: ro | bot, he, go. Try an open first chunk first. If the word sounds wrong, close it: cab | in." },
  sort: {
    yes: "Open vault", yesHint: "ro | bot · si | lent",
    no: "Closed vault", noHint: "cab | in · plan | et",
    hintYes: (w) => `${w} starts with an open chunk, so the first vowel says its name.`,
    hintNo: (w) => `${w} starts with a closed chunk, so the first vowel is short.`,
  },
  codex: [
    { w: "silent", parts: ["si", "lent"], hi: 0 },
    { w: "frozen", parts: ["fro", "zen"], hi: 0 },
    { w: "basic", parts: ["ba", "sic"], hi: 0 },
    { w: "humid", parts: ["hu", "mid"], hi: 0 },
    { w: "focus", parts: ["fo", "cus"], hi: 0 },
    { w: "unit", parts: ["u", "nit"], hi: 0 },
  ],
  checks: [
    ["hotel", "hostel", "hotly"], ["music", "musk", "magic"], ["silent", "sift", "slant"],
    ["human", "humane", "humming"], ["total", "totem", "tonal"], ["open", "oven", "omen"],
    ["token", "taken", "ticket"], ["unit", "unite", "until"], ["final", "finale", "fine"],
    ["focus", "focal", "fogs"], ["moment", "comment", "mount"], ["begin", "began", "begun"],
  ],
  vaultPicks: [
    ["pupil", "puppet", "pulpit"], ["bonus", "bogus", "bones"], ["basic", "basin", "bask"], ["even", "oven", "event"],
    ["broken", "broke", "bracken"], ["stolen", "stole", "swollen"], ["vital", "vitamin", "vial"], ["humid", "humor", "hummed"],
  ],
  // For the sort: open-first words are the bank, closed-first words are the contrast.
  bank: ["robot", "pilot", "silent", "frozen", "open", "music", "humid", "basic", "focus", "unit", "hotel", "moment", "token", "human", "total", "final", "vital", "bonus", "rodent", "stolen", "broken", "begin", "even", "item", "protect", "relax", "depend", "tulip", "pupil", "he", "she", "we", "me", "be", "go", "no", "so"],
  contrast: ["cabin", "planet", "lemon", "visit", "comet", "seven", "panel", "metal", "rapid", "timid", "habit", "solid", "model", "limit"],
  // Games: open-syllable words are targets; decoys have no VCV pattern at all.
  game: {
    targets: ["robot", "pilot", "silent", "frozen", "open", "music", "unit", "hotel", "moment", "token", "human", "total", "final", "focus"],
    decoys: ["magnet", "napkin", "tablet", "sunset", "hilltop", "tunnel", "basket", "helmet", "jacket", "insect", "problem", "contest"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "silent", cuts: [2] },
      { w: "frozen", cuts: [3] },
      { w: "hotel", cuts: [2] },
      { w: "cabin", cuts: [3] },
      { w: "planet", cuts: [4] },
      { w: "music", cuts: [2] },
    ],
  },
  forge: {
    items: [
      { w: "robots", clue: "more than one robot", parts: ["robot", "s"], explain: "robot + s. The ending -s means more than one." },
      { w: "opened", clue: "made open, in the past", parts: ["open", "ed"], explain: "open + ed. The ending -ed means it already happened." },
      { w: "visited", clue: "went to see a place, in the past", parts: ["visit", "ed"], explain: "visit + ed. After t, -ed is its own chunk: vis-it-ed." },
      { w: "relaxing", clue: "resting right now", parts: ["relax", "ing"], explain: "relax + ing. The ending -ing means it is happening now." },
      { w: "focuses", clue: "looks closely (she focuses on it)", parts: ["focus", "es"], explain: "focus + es. After s, add -es: fo-cus-es." },
    ],
    extra: [{ t: "hotel", k: "base" }, { t: "token", k: "base" }],
  },
  door: [
    { w: "silent", parts: ["si", "lent"], extra: ["sil", "lint"] },
    { w: "frozen", parts: ["fro", "zen"], extra: ["froz", "zin"] },
    { w: "hotel", parts: ["ho", "tel"], extra: ["hot", "til"] },
    { w: "music", parts: ["mu", "sic"], extra: ["mus", "sik"] },
    { w: "token", parts: ["to", "ken"], extra: ["tok", "kin"] },
    { w: "human", parts: ["hu", "man"], extra: ["hum", "men"] },
    { w: "cabin", parts: ["cab", "in"], extra: ["ca", "en"] },
  ],
  chains: [
    ["hotel", "motel", "model", "modem"],
    ["token", "taken", "waken", "woken"],
  ],
  heart: ["the", "a", "of", "to", "was", "said", "they", "one", "from", "do"],
  vaultFake: [["vonem", "vonnem", "vanem"], ["siltog", "saltog", "seltog"], ["tobex", "tobbex", "tabex"], ["mupin", "muppin", "mapin"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "The tunnel went on and on, and it was silent. Ice was on the walls, and the bedrock was frozen. Kit held up the lamp. \"Tam, is that a robot?\" A big robot was stuck in a block of ice. On its side was a code: Unit Nine. Mel went up to it. \"It is human size,\" she said. \"It is not from the ship,\" said Tam. \"It was made in this place.\"",
    },
    {
      title: "Crew log 2",
      text: "Sam, the ship bot, began to melt the ice with a hot vent. It was a long job. At last, the ice slid off the robot. At the top of the robot, a lens began to blink. \"It still runs,\" said Gus. Then a tune came from the robot. It was music, and it was a bit sad. \"Do robots make music?\" said Kit. \"This one did,\" said Mel.",
    },
    {
      title: "Crew log 3",
      text: "Unit Nine lit up the wall with its lens. On the wall, the hilltop was a vast hub. It had lots of music and lamps. Then the sun went dim. Ice set in, and the hub became silent. They went in the tunnels, and the robots went with them. The robots made the tunnels safe. Then, in a moment, the wall went black. \"So the robots dug the tunnels,\" said Gus.",
    },
    {
      title: "Crew log 4",
      text: "Unit Nine went still. Then its hand came open. In it was a token. Mel held the token up to the lamp. On it was a ship, and a hole in a hill with a lid on it. \"This token is the next step,\" said Mel. The lens on the robot went black. \"We will not let Unit Nine rot in the ice,\" said Kit. So Gus and Sam set the robot on a sled, and we went on.",
    },
  ],
  relic: { name: "The Hill Token", caption: "A metal token from the hand of Unit Nine. On it: a ship, and a hatch in a hill." },
  story: "Deep in the frozen tunnels, the crew thaws out Unit Nine, a builders' robot. It shows how the builders moved into the tunnels when their sun grew dim and the surface froze, then hands over a token that points to a hatch.",
  spanish: "Spanish syllables are mostly open (ca-sa, mo-to), so cutting ro | bot will feel natural. The new part is the vowel sound: in an English open syllable the vowel says its name (long o in robot), while Spanish o keeps one short, pure sound.",
  miniLesson: {
    title: "Open and closed: ro | bot and cab | in",
    steps: [
      "Write he, go, hi. Say: each ends with its vowel. That is an open syllable, so the vowel says its name.",
      "Write robot. Dot the vowels. One consonant sits between them, so try cutting before it: ro | bot. Read it: the o says its name.",
      "Write cabin. Try ca | bin first. Say: that is not a word we know, so cut after the consonant: cab | in. Now the a is short.",
      "Sort 6 cards together into open and closed: silent, music, frozen, planet, lemon, visit.",
      "Read together: \"The robot was silent in the frozen tunnel.\"",
    ],
  },
};
