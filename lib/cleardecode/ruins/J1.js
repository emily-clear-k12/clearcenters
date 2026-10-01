// ClearDecode ruin J1 · ar and or as /er/; air, are, ear (UFLI 111-113).
// Decodable rule for this ruin: every pattern from Planets A-I, plus ar and or
// saying /er/ at the end of a longer word (dollar, doctor), plus air, are and
// ear (repair, share, bear, gear, learn), plus heart words.
// Checked by tools/cleardecode-check.cjs.
// Note: the inscription room makes students tap every word that matches
// `find`. The ar/or half of `find` matches a consonant + ar/or at the end of a
// word, so logs avoid star, far, car, for and the heart word are, which look
// like the code but are not it. Logs also avoid J2-J5 spellings (ei, eigh,
// great, ough, group), soft c and g inside a word, and -tion.
export default {
  id: "J1",
  name: "The Repair Deck",
  find: "air|are|ear|[^aeiou](ar|or)s?$",
  code: { label: "/er/ endings; air, are, ear", spellings: ["ar", "or", "air", "are", "ear"], rule: "At the end of a longer word, ar and or often say /er/, as in dollar and doctor. air, are and ear can say /air/, as in chair, share and bear. ear can also say /eer/ (gear) or /er/ (learn)." },
  sort: {
    yes: "ar · or say /er/", yesHint: "dollar · doctor",
    no: "air · are · ear", noHint: "chair · share · bear",
    hintYes: (w) => `${w}: the ar or or at the end says /er/, as in dollar and doctor.`,
    hintNo: (w) => `${w} has air, are or ear, as in chair, share and bear.`,
  },
  codex: [
    { w: "dollar", parts: ["dol", "lar"], hi: 1 },
    { w: "doctor", parts: ["doc", "tor"], hi: 1 },
    { w: "chair", parts: ["ch", "air"], hi: 1 },
    { w: "share", parts: ["sh", "are"], hi: 1 },
    { w: "bear", parts: ["b", "ear"], hi: 1 },
    { w: "learn", parts: ["l", "ear", "n"], hi: 1 },
  ],
  checks: [
    ["dollar", "doll", "dolly"], ["doctor", "docks", "dotted"], ["chair", "chain", "cheer"],
    ["share", "sharp", "shore"], ["bear", "beer", "bore"], ["learn", "lean", "lend"],
    ["motor", "motel", "mother"], ["visitor", "visit", "visiting"], ["stairs", "steers", "stirs"],
    ["heard", "herd", "hard"], ["fair", "fire", "fur"], ["dare", "dart", "dire"],
  ],
  vaultPicks: [
    ["scare", "scarf", "score"], ["pearl", "peal", "purl"], ["actor", "act", "acted"], ["mirror", "mire", "mist"],
    ["wear", "were", "wore"], ["collar", "collect", "colt"], ["spare", "spark", "spore"], ["search", "starch", "perch"],
  ],
  // For the sort: ar/or-as-/er/ words are the bank, air/are/ear words are the contrast.
  bank: ["dollar", "collar", "pillar", "polar", "solar", "lunar", "grammar", "beggar", "doctor", "actor", "motor", "visitor", "sailor", "tailor", "mirror", "error", "color", "major", "minor", "editor", "inventor", "tractor", "vendor", "mentor", "sensor", "monitor", "donor", "razor", "flavor", "humor", "vapor", "favor"],
  contrast: ["chair", "stairs", "repair", "hair", "share", "scare", "spare", "square", "aware", "bear", "wear", "pear", "gear", "learn", "early", "heard"],
  // Games: any ar/or-as-/er/ or air/are/ear word counts; decoys have ar or or that is not this code.
  game: {
    targets: ["dollar", "doctor", "actor", "motor", "visitor", "collar", "chair", "repair", "share", "scare", "bear", "gear", "learn", "heard"],
    decoys: ["hard", "storm", "fork", "barn", "corn", "chart", "sport", "shark", "north", "spark", "torch", "march"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "dollar", cuts: [3] },
      { w: "doctor", cuts: [3] },
      { w: "repair", cuts: [2] },
      { w: "visitor", cuts: [3, 5] },
      { w: "aware", cuts: [1] },
      { w: "careful", cuts: [4] },
    ],
  },
  forge: {
    items: [
      { w: "repairing", clue: "fixing something right now", parts: ["repair", "ing"], explain: "repair + ing. The ending -ing means it is happening now." },
      { w: "unaware", clue: "not knowing about something", parts: ["un", "aware"], explain: "un + aware. un- means not, so unaware means not aware." },
      { w: "careless", clue: "without care", parts: ["care", "less"], explain: "care + less. -less starts with a consonant, so keep the e." },
      { w: "sharing", clue: "letting others use it too, right now", parts: ["shar", "ing"], explain: "share + ing: drop the e, because -ing starts with a vowel." },
      { w: "scariest", clue: "the most scary of all", parts: ["scari", "est"], explain: "scary + est: change the y to i, then add -est." },
      { w: "relearn", clue: "to learn again", parts: ["re", "learn"], explain: "re + learn. re- means again." },
      { w: "dollars", clue: "more than one dollar", parts: ["dollar", "s"], explain: "dollar + s. The ending -s means more than one." },
    ],
    extra: [{ t: "dis", k: "pre" }, { t: "ful", k: "suf" }, { t: "gear", k: "base" }],
  },
  door: [
    { w: "hair", parts: ["h", "air"], extra: ["are", "ear"] },
    { w: "stare", parts: ["s", "t", "are"], extra: ["air", "ear"] },
    { w: "wear", parts: ["w", "ear"], extra: ["are", "air"] },
    { w: "dollar", parts: ["d", "o", "ll", "ar"], extra: ["or", "er"] },
    { w: "doctor", parts: ["d", "o", "c", "t", "or"], extra: ["ar", "er"] },
    { w: "learn", parts: ["l", "ear", "n"], extra: ["er", "ur"] },
    { w: "spare", parts: ["s", "p", "are"], extra: ["air", "ear"] },
  ],
  chains: [
    ["share", "stare", "spare", "scare"],
    ["gear", "bear", "wear", "pear"],
  ],
  heart: ["the", "a", "of", "to", "into", "said", "was", "were", "one", "two", "you", "they", "their", "again", "do", "what", "who", "where", "have", "come"],
  vaultFake: [["drair", "dreer", "drore"], ["vlare", "vlore", "vlire"], ["zollar", "zollore", "zolleer"]],
  inscriptions: [
    {
      title: "Log 1: A cracked gear",
      text: "We left the snow planet behind and set off into the long dark, with the lens held up to steer by. In the third week, a gear in the air pump cracked. Ray heard it grind and shut the pump off. \"We have air to last ten days,\" he said, \"and no spare gear.\" Nobody said it, but we were all scared. Then the lens lit up and pointed to a dim shape ahead, just a speck in the dark.",
    },
    {
      title: "Log 2: The repair deck",
      text: "The dim shape was a repair deck that the builders had left drifting in the dark. Gus docked us at an airlock on its side. The air inside was stale but safe to breathe, and the lights still came on. Long racks ran down the hall, and on them sat spare parts, sorted with care: pipes, bolts, wires and gears. Mel ran a hand along a rack. \"They did not just fix ships here,\" she said. \"They kept spares ready, in case more ships had to come.\"",
    },
    {
      title: "Log 3: The motor bay",
      text: "We split up to search the bays. Tam and Kit took the upper deck, where the air was thin and the stairs were steep. Gus and Ray took the motor bay. In the last bay sat a motor as big as a van, with its panel left open. Next to it was a chair, and on the chair was a builders' tool belt, as if the repair had been cut short. Scratched into the panel was a line in the builders' code. Ray read it out: \"Repair the gear. Share the air. Go on.\"",
    },
    {
      title: "Log 4: The Spare Gear",
      text: "Under the chair was a box, and in the box was one gear, wrapped with care. It was a builders' gear, but its teeth were the same size as ours. Gus set it in the air pump, and the pump came back on with a steady hum. We had air again. Before we left, Mel scratched a line in our code under the builders' line: \"We took one gear. Thank you.\" Kit looked at the two lines and grinned. \"The builders came this way,\" she said. \"We have found their path.\"",
    },
  ],
  relic: { name: "The Spare Gear", caption: "A builders' gear left on the repair deck, under a line scratched in their code: \"Repair the gear. Share the air. Go on.\"" },
  story: "Deep in the long dark, a cracked gear leaves the crew short of air, and a drifting builders' repair deck gives them a spare gear and a note: Repair the gear. Share the air. Go on.",
  spanish: "Doctor, actor, motor and color are spelled the same in Spanish, but in Spanish the last syllable is said clearly (doc-TOR). In English that ending is weak and says /er/. Spanish has no /air/ sound; aire (air) and reparar (repair) are helpful cognates for the air spelling.",
  miniLesson: {
    title: "ar and or say /er/; air, are, ear",
    steps: [
      "Write dollar and doctor. Clap them: dol-lar, doc-tor. Say: at the end of a longer word, ar and or often say /er/.",
      "Write star next to dollar and for next to doctor. Read each pair. Ask: which ar says /ar/? Which or says /er/? The /er/ one is in the weak last syllable.",
      "Write chair, share and bear. Underline air, are and ear. Say: all three can say /air/.",
      "Write gear and learn. Say: ear has more than one job: /eer/ in gear, /er/ in learn. Try a sound, and keep the one that makes a real word.",
      "Read one line together: \"Repair the gear. Share the air. Go on.\"",
    ],
  },
};
