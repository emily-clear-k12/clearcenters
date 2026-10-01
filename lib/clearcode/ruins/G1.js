// ClearCode ruin G1 · long a: ai, ay (UFLI 84). Sample ruin, written in full.
// Inscriptions use only patterns taught up to G1 (short vowels, consonant
// teams, silent e, endings, syllables, -le, r-controlled, ai/ay) plus
// heart words. Checked by tools/clearcode-check.cjs.
export default {
  id: "G1",
  name: "Ruin of Tides",
  find: "ai|ay",
  code: { label: "long a", spellings: ["ai", "ay"], rule: "ai in the middle of a word, ay at the end" },
  sort: {
    yes: "Long a vault", yesHint: "rain · day",
    no: "Short a vault", noHint: "ran · map",
    hintYes: (w) => `${w} has the long a code (ai or ay), so the a is long.`,
    hintNo: (w) => `${w} has no ai or ay, so the a is short.`,
  },
  codex: [
    { w: "rain", parts: ["r", "ai", "n"], hi: 1 },
    { w: "drain", parts: ["dr", "ai", "n"], hi: 1 },
    { w: "trail", parts: ["tr", "ai", "l"], hi: 1 },
    { w: "day", parts: ["d", "ay"], hi: 1 },
    { w: "spray", parts: ["spr", "ay"], hi: 1 },
    { w: "gray", parts: ["gr", "ay"], hi: 1 },
  ],
  checks: [
    ["paint", "pant", "pay"], ["stay", "stain", "sty"], ["trail", "tray", "trial"],
    ["chain", "chin", "change"], ["sway", "swan", "sly"], ["faint", "fan", "fate"],
    ["claim", "clam", "clay"], ["stray", "strap", "stripe"], ["brain", "bran", "brine"],
    ["delay", "deli", "delta"], ["snail", "snap", "snarl"], ["play", "plan", "plate"],
  ],
  vaultPicks: [
    ["remain", "remind", "ramp"], ["display", "dispatch", "distant"], ["waist", "west", "wits"],
    ["tray", "try", "trip"], ["frail", "fail", "fry"], ["sprain", "spin", "spring"],
    ["holiday", "hollow", "holding"], ["maintain", "mountain", "mantle"],
  ],
  bank: ["rain", "drain", "trail", "train", "brain", "chain", "paint", "faint", "claim", "snail", "sail", "tail", "mail", "wait", "bait", "main", "grain", "stain", "sprain", "remain", "contain", "explain", "day", "spray", "gray", "stay", "play", "tray", "sway", "stray", "clay", "delay", "away", "display", "holiday", "relay", "today"],
  contrast: ["ran", "pan", "plan", "trap", "map", "tap", "stamp", "plant", "clap", "brag", "cat", "snap", "trash", "camp", "flap", "grab"],
  wall: {
    mode: "syllables",
    words: [
      { w: "container", cuts: [3, 7] },
      { w: "remain", cuts: [2] },
      { w: "explain", cuts: [2] },
      { w: "relay", cuts: [2] },
      { w: "railway", cuts: [4] },
      { w: "maintain", cuts: [4] },
    ],
  },
  forge: {
    items: [
      { w: "painter", clue: "a person who paints", parts: ["paint", "er"], explain: "paint + er. The ending -er can mean a person who does something." },
      { w: "repainted", clue: "painted again", parts: ["re", "paint", "ed"], explain: "re + paint + ed. re- means again, and -ed means it already happened." },
      { w: "unchained", clue: "not held by chains anymore", parts: ["un", "chain", "ed"], explain: "un + chain + ed. un- means not, so unchained means set free." },
      { w: "raining", clue: "rain falling right now", parts: ["rain", "ing"], explain: "rain + ing. The ending -ing means it is happening now." },
      { w: "trains", clue: "more than one train", parts: ["train", "s"], explain: "train + s. The ending -s means more than one." },
    ],
    extra: [{ t: "ex", k: "pre" }, { t: "rain", k: "base" }, { t: "train", k: "base" }],
  },
  door: [
    { w: "drain", parts: ["d", "r", "ai", "n"], extra: ["ay", "a"] },
    { w: "spray", parts: ["s", "p", "r", "ay"], extra: ["ai", "a"] },
    { w: "chain", parts: ["ch", "ai", "n"], extra: ["ay", "a"] },
    { w: "stay", parts: ["s", "t", "ay"], extra: ["ai", "a"] },
    { w: "trail", parts: ["t", "r", "ai", "l"], extra: ["ay", "a"] },
    { w: "clay", parts: ["c", "l", "ay"], extra: ["ai", "a"] },
    { w: "paint", parts: ["p", "ai", "n", "t"], extra: ["ay", "a"] },
  ],
  chains: [
    ["rain", "main", "pain", "paid", "maid"],
    ["tray", "pray", "play", "clay"],
  ],
  heart: ["said", "water", "they", "one"],
  vaultFake: [["plaim", "plam", "plim"], ["vay", "vee", "vy"], ["smaid", "smad", "smid"], ["drayn", "dran", "dren"]],
  inscriptions: [
    {
      title: "Explorer's log, day 1",
      text: "Day 1. Rain hit the site all day. We made camp by a stone gate. On the gate, the makers had carved a long trail of rain marks. We think the trail is a map. Next day, we will track it, if the rain lets us.",
    },
    {
      title: "Explorer's log, day 2",
      text: "Day 2. The rain did not stop, so we had to wait. Water drained from the main wall into a long stone chain of tanks. Ray painted the rain marks into his log. Then he said, \"These marks are not just art. They explain the way in.\"",
    },
    {
      title: "Explorer's log, day 3",
      text: "Day 3. We tracked the painted trail past a gray stone tray. The tray had a chain, and the chain had a lock. We tested the lock. It did not fail us. The gate swung open, and a faint wind came from inside.",
    },
    {
      title: "Explorer's log, day 4",
      text: "Day 4. Inside the gate, we came upon a small stone, as gray as rain. The makers had placed one at all the gates, so that no traveler had to stray from the way to water. We will take it back to the base today and display it in the lab.",
    },
  ],
  relic: { name: "The Rain Stone", caption: "The builders set a rain stone at every gate, so travelers always knew the way to water." },
  story: "The builders marked their gates with rain signs. Following the signs leads the crew to the first relic and the first clue that the builders tracked water across the planet.",
  spanish: "Long a sounds like Spanish e (as in 'mesa'), so students may know the sound but not the English spellings ai and ay. Practice the spellings, not the sound.",
  miniLesson: {
    title: "Long a: ai in the middle, ay at the end",
    steps: [
      "Write rain and day. Underline ai and ay. Say: both spell the long a sound.",
      "Ask: where is ai? (middle). Where is ay? (end). English words do not end in ai.",
      "Sort 6 cards together: train, play, chain, stay, paint, gray.",
      "Dictate 3 words (snail, spray, wait). Students say the sound, then pick ai or ay.",
      "Read one sentence together: \"We will wait for the rain to stop today.\"",
    ],
  },
};
