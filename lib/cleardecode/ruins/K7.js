// ClearDecode ruin K7 · Greek roots: auto, graph, meter, photo, geo, tele, bio (TEKS 4.3(C), 5.3(C)).
// Near the top of the ladder: every earlier pattern is fair game in the
// inscriptions, plus these Greek roots: auto (self), graph (write or draw),
// meter (measure), photo (light), geo (earth), tele (far), bio (life).
// Not yet: Latin roots (K8).
// Note: the inscription room makes students tap every word that matches
// `find`, so logs avoid words that hide these letters with no root meaning
// (pigeon, dungeon, cemetery). Checked by tools/cleardecode-check.cjs.
export default {
  id: "K7",
  name: "The Science Wing",
  find: "auto|graph|meter|photo|geo|tele|bio",
  code: {
    label: "Greek roots: auto, graph, meter, photo, geo, tele, bio",
    spellings: ["auto", "graph", "meter", "photo", "geo", "tele", "bio"],
    rule: "A root is a word part with a meaning. These come from Greek: auto = self, graph = write or draw, meter = measure, photo = light, geo = earth, tele = far, bio = life. Many words join two roots: photo + graph = a picture made with light.",
  },
  sort: {
    yes: "Root vault", yesHint: "telescope · biography",
    no: "Look-alike vault", noHint: "autumn · meteor",
    hintYes: (w) => `${w} has a Greek root you know, and the root gives a clue to the meaning.`,
    hintNo: (w) => `${w} only looks like it has a root. None of the seven roots is spelled inside it.`,
  },
  codex: [
    { w: "photograph", parts: ["pho", "to", "graph"], hi: 2 },
    { w: "telescope", parts: ["tele", "scope"], hi: 0 },
    { w: "thermometer", parts: ["ther", "mo", "meter"], hi: 2 },
    { w: "automatic", parts: ["auto", "mat", "ic"], hi: 0 },
    { w: "geography", parts: ["geo", "graph", "y"], hi: 0 },
    { w: "biography", parts: ["bio", "graph", "y"], hi: 0 },
  ],
  checks: [
    ["telescope", "microscope", "periscope"], ["photograph", "phonics", "physics"], ["thermometer", "thermos", "thermal"],
    ["automatic", "attic", "atomic"], ["geography", "gravity", "gallery"], ["biography", "bicycle", "binary"],
    ["telephone", "xylophone", "saxophone"], ["kilometer", "kilogram", "kilowatt"], ["paragraph", "paramedic", "parachute"],
    ["autopilot", "pilot", "copilot"], ["biology", "zoology", "ecology"], ["geode", "gem", "geese"],
  ],
  vaultPicks: [
    ["photocopy", "copy", "copier"], ["perimeter", "perishable", "period"], ["telegraph", "tell", "telltale"],
    ["automobile", "mobile", "mobility"], ["biologist", "zoologist", "ecologist"], ["geologist", "gelatin", "general"],
    ["seismograph", "seismic", "seismology"], ["speedometer", "speedboat", "speedway"],
  ],
  // For the sort: words with a Greek root are the bank; the contrast words only look like them.
  bank: ["photograph", "photographer", "photo", "photocopy", "telephoto", "telescope", "telephone", "television", "telegraph", "teleport", "automatic", "automobile", "autopilot", "autograph", "autobiography", "biology", "biography", "biome", "biologist", "geology", "geography", "geode", "geologist", "thermometer", "speedometer", "perimeter", "diameter", "kilometer", "barometer", "graph", "paragraph", "graphic", "seismograph"],
  contrast: ["author", "autumn", "giraffe", "grape", "meteor", "metal", "gem", "germ", "gentle", "tell", "telling", "tile", "bison", "binary", "bicycle"],
  wall: {
    mode: "syllables",
    words: [
      { w: "photograph", cuts: [3, 5] },
      { w: "telescope", cuts: [3, 4] },
      { w: "thermometer", cuts: [4, 7, 8] },
      { w: "automatic", cuts: [2, 4, 7] },
      { w: "geography", cuts: [2, 4, 6] },
      { w: "biography", cuts: [2, 4, 6] },
    ],
  },
  forge: {
    items: [
      { w: "telescope", clue: "a tool for seeing things far away", parts: ["tele", "scope"], explain: "tele + scope. tele means far, and a scope is a tool for looking." },
      { w: "photograph", clue: "a picture made with light", parts: ["photo", "graph"], explain: "photo + graph. photo means light, and graph means write or draw." },
      { w: "thermometer", clue: "a tool that measures heat", parts: ["thermo", "meter"], explain: "thermo + meter. thermo means heat, and meter means measure." },
      { w: "autograph", clue: "your own name, written by you", parts: ["auto", "graph"], explain: "auto + graph. auto means self, and graph means write." },
      { w: "geology", clue: "the study of the earth and its rocks", parts: ["geo", "logy"], explain: "geo + logy. geo means earth, and -logy means the study of." },
      { w: "biography", clue: "the true story of a life, written down", parts: ["bio", "graph", "y"], explain: "bio + graph + y. bio means life, graph means write, and -y makes it a thing." },
      { w: "telephoto", clue: "a lens that takes pictures from far away", parts: ["tele", "photo"], explain: "tele + photo. tele means far, and photo means light." },
    ],
    extra: [{ t: "re", k: "pre" }, { t: "phone", k: "base" }, { t: "er", k: "suf" }],
  },
  door: [
    { w: "photo", parts: ["ph", "o", "t", "o"], extra: ["f", "oa"] },
    { w: "meter", parts: ["m", "e", "t", "er"], extra: ["ee", "ur"] },
    { w: "telescope", parts: ["t", "e", "l", "e", "s", "c", "o", "p", "e"], extra: ["k", "oa"] },
    { w: "autopilot", parts: ["au", "t", "o", "p", "i", "l", "o", "t"], extra: ["aw", "ll"] },
    { w: "biome", parts: ["b", "i", "o", "m", "e"], extra: ["y", "oa"] },
    { w: "geode", parts: ["g", "e", "o", "d", "e"], extra: ["j", "oa"] },
    { w: "graphic", parts: ["g", "r", "a", "ph", "i", "c"], extra: ["f", "ck"] },
  ],
  chains: [
    ["graph", "grape", "drape", "drake"],
    ["phone", "shone", "stone", "store"],
  ],
  heart: [],
  vaultFake: [["telezorp", "autozorp", "photozorp"], ["zorpometer", "zorpograph", "zorpology"], ["biovant", "geovant", "autovant"]],
  inscriptions: [
    {
      title: "Log 55",
      text: "Below the Transport Hall, a ramp led to a wing full of tools. Ray called it the Science Wing. The first room was lined with photographs on glass, each one lit from behind. They showed the builders' home world: green hills, wide seas, and a bright yellow sun. The photographer had taken one picture each year. In the last photograph, the hills were gray and the seas were ice. Kit studied each photo for a long time. \"Their world got colder,\" she said.",
    },
    {
      title: "Log 56",
      text: "The next room held a giant telescope, aimed up through a shaft in the ice. Gus wiped the frost off the lens and looked. The telescope was still pointed at the builders' old sun. Next to it stood a thermometer as tall as a door, and a meter with a needle that measured the sun's light. Year after year, the builders had written the numbers down. Every number was a little lower than the one before. Nobody said a word.",
    },
    {
      title: "Log 57",
      text: "On one wall, each builder had left a mark, like an autograph. No two were the same: a curl, a star, a set of lines. Mel counted them. There were more than a thousand. Under each autograph was a short biography: a name, a job, a home. One was a geologist who studied the hot water under the ice. One was a biologist who kept seeds. \"They were not so different from us,\" Mel said softly.",
    },
    {
      title: "Log 58",
      text: "At the end of the wing stood a small automatic recorder. When Tam stepped close, it took her photo and printed a mark below it, the same kind of mark the builders had left on the wall. It was her own autograph, written in the builders' code. Then it printed one more line, and Tam read it out loud: \"Reader, go on to the last door.\" Tam took the recorder with her. We call it the Autograph Recorder.",
    },
  ],
  relic: { name: "The Autograph Recorder", caption: "A builders' recorder that turns your photo into your own autograph, written in their code. It told the crew to go on to the last door." },
  story: "In the Science Wing, the crew finds photographs, a giant telescope and a thermometer that show the builders' sun growing dim, and a wall of builder autographs, each with a short biography.",
  spanish: "These Greek roots are the same in Spanish: fotografía, telescopio, termómetro, automático, geografía, biografía. Spanish speakers can use the word they know. Point out that English spells the f sound ph in photo and graph.",
  miniLesson: {
    title: "Greek roots carry meaning",
    steps: [
      "Write the seven roots with a meaning for each: auto = self, graph = write, meter = measure, photo = light, geo = earth, tele = far, bio = life.",
      "Build photograph from photo + graph. Ask: what is a picture made with light? Do the same with telescope: far + a tool for looking.",
      "Show autograph and biography side by side. Both have graph, so both are about writing. Ask what the other root adds.",
      "Show look-alikes: autumn, meteor, bicycle. Ask: is a root spelled inside? No, so cover and move on.",
      "Read together: \"Under each autograph was a short biography: a name, a job, a home.\"",
    ],
  },
};
