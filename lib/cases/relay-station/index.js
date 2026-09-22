// Relay Station (typing center) — lesson registry.
// Design doc: claude/RelayStation_Digital_Design_v1.md in the Claude project.
//
// TWO kinds of assignment live here (v2, Sept 22 2026 — Emily's call):
//
//   1. THE FOUNDATIONS TRACK (RS.3.TRACK / RS.4.TRACK / RS.5.TRACK).
//      One assignment puts a student on a 20-level track that auto-advances
//      them to the next level every time they pass one. Progress belongs to
//      the STUDENT (table relay_station_progress), not the assignment, so it
//      carries over if a teacher re-assigns the track or a student changes
//      class. The same levels serve grades 3-5; the grade only changes the
//      star (speed) goals, per Tech Apps TEKS 126.8/126.9/126.10 (c)(12)(C):
//      grade 3 "with accuracy", grade 4 "with speed and accuracy", grade 5
//      "with increasing speed and accuracy". Passing a level only needs the
//      accuracy goal — speed earns stars, never blocks a struggling typist.
//
//   2. GRADE-LEVEL READINGS (RS.<grade>.<id>, e.g. RS.3.L01) — single
//      passages a teacher assigns once students have the basics:
//      vocabulary, conversations, paragraphs, letters.
//
// No public/server split: the text a student types IS the answer.
//
// Text rules (checked by the validation script before shipping):
//   - plain ASCII only (no smart quotes / em dashes — a student can't type them)
//   - "\n" = the student presses Enter, "\t" = the student presses Tab
//   - a track level may only use keys taught at or before that level

// ---------- GOALS (placeholders — tune from real classroom data) ----------
export const PASS_ACCURACY = 90; // base accuracy needed to pass a track level

// Emily's call (Sept 22): the bar rises as the track goes on.
//   Levels 1-10  -> 90%
//   Levels 11-15 -> 95%
//   Levels 16-20 -> 100% (zero wrong keys)
export function passAccuracyForLevel(levelNumber) {
  if (levelNumber >= 16) return 100;
  if (levelNumber >= 11) return 95;
  return 90;
}

const TRACK_GOALS = {
  3: { accuracy: PASS_ACCURACY, wpm: 5 },
  4: { accuracy: PASS_ACCURACY, wpm: 8 },
  5: { accuracy: PASS_ACCURACY, wpm: 10 },
};
const READING_GOALS = {
  3: { accuracy: 90, wpm: 8 },
  4: { accuracy: 90, wpm: 12 },
  5: { accuracy: 92, wpm: 15 },
};

const TEKS_KEYBOARDING = {
  3: "Tech Apps 3.12C — touch keyboarding with accuracy",
  4: "Tech Apps 4.12C — touch keyboarding with speed and accuracy",
  5: "Tech Apps 5.12C — touch keyboarding with increasing speed and accuracy",
};

// ---------- THE FOUNDATIONS TRACK ----------
// `adds` = characters this level introduces; the allowed set for a level is
// everything added at or before it (plus space and Enter from level 1).
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = LOWER.toUpperCase();

export const TRACK_UNITS = [
  { id: "home", name: "Home Base", color: "#86EFAC" },
  { id: "top", name: "Top Row", color: "#67E8F9" },
  { id: "bottom", name: "Bottom Row", color: "#A5B4FC" },
  { id: "shift", name: "Capitals & Punctuation", color: "#FDE047" },
  { id: "numbers", name: "Numbers", color: "#FDBA74" },
  { id: "layout", name: "Layout & Final Check", color: "#F9A8D4" },
];

export const TRACK_LEVELS = [
  {
    unit: "home",
    title: "Home Row Keys",
    adds: "asdfjkl; \n",
    newKeys: ["a", "s", "d", "f", "j", "k", "l", ";"],
    intro: "Every transmission starts at home base. Put your left fingers on A S D F and your right fingers on J K L ; — feel the bumps on F and J? Those are your anchors. Thumbs rest on the space bar. Press Enter with your right pinky at the end of each line.",
    text: "asdf jkl;\nasdf jkl;\naaa sss ddd fff\njjj kkk lll ;;;\nfj dk sl a;\nfj dk sl a;\nasdf jkl; asdf jkl;",
  },
  {
    unit: "home",
    title: "Home Row Words",
    adds: "",
    newKeys: [],
    intro: "Real words, home row only. Keep your fingers resting on home base and only move the finger that needs to press a key.",
    text: "as ad all\nsad lad dad\nask fall flask\na sad lad; a lass\nadd salad; ask dad\nall lads fall; alas",
  },
  {
    unit: "home",
    title: "Reach Up: E and I",
    adds: "ei",
    newKeys: ["e", "i"],
    intro: "New keys! Your left middle finger reaches up from D to E. Your right middle finger reaches up from K to I. Reach, press, and slide back home.",
    text: "ded kik ded kik\ndeed kiss\nded kik eee iii\nde ki de ki\nfed lid led\nlie die fee",
  },
  {
    unit: "home",
    title: "E and I Words",
    adds: "",
    newKeys: [],
    intro: "Now use E and I in real words. Remember: reach up, then come right back home.",
    text: "like side idea\nfile silk desk\na kid slides\nsis likes a salad\ndad feels ill\nall kids like a lake",
  },
  {
    unit: "top",
    title: "Reach Up: R and U",
    adds: "ru",
    newKeys: ["r", "u"],
    intro: "Your pointer fingers reach up now. Left pointer goes from F up to R. Right pointer goes from J up to U. Always come back home after each reach.",
    text: "frf juj frf juj\nfur rude sure\nrule red ride\nfluid use free\na red sled rides far\nuse fair rules; dad is sure",
  },
  {
    unit: "top",
    title: "Pointer Reach: T, G, Y, H",
    adds: "tgyh",
    newKeys: ["t", "g", "y", "h"],
    intro: "Your pointer fingers cover two columns each. Left pointer: F, G, R, T. Right pointer: J, H, U, Y. Stretch sideways, then come back home.",
    text: "ftf jyj fgf jhj\nthe gift high\nyes the fish\nthat light is high\ntry the huge dish\na gray tiger sits here",
  },
  {
    unit: "top",
    title: "Word Practice",
    adds: "",
    newKeys: [],
    intro: "Time to put your new keys together. Read each word before you type it — your eyes should stay on the screen, not your hands.",
    text: "the dress is red\nher sister is tall\nthey ride a sled\ndust fell a little\nthe red fish had a great gift",
  },
  {
    unit: "top",
    title: "Reach Up: O and W",
    adds: "ow",
    newKeys: ["o", "w"],
    intro: "Your ring fingers get a turn. Left ring finger reaches from S up to W. Right ring finger reaches from L up to O.",
    text: "lol sws lol sws\nold two low\nwood for work\nhow sweet\nwe go to the show\nsow the seeds; grow a tree",
  },
  {
    unit: "top",
    title: "Reach Up: Q and P",
    adds: "qp",
    newKeys: ["q", "p"],
    intro: "Pinky power! Left pinky reaches from A up to Q. Right pinky reaches from ; up to P. Pinkies are the weakest fingers, so go slow and steady.",
    text: "aqa ;p; aqa ;p;\nquiet pool\npaper quilt\nquit the pool\na quiet puppy sleeps\nput the quilt up top",
  },
  {
    unit: "top",
    title: "Top Row Review",
    adds: "",
    newKeys: [],
    intro: "You've learned the whole top row of letters! This level mixes all of them together.",
    text: "we paid for the tower\nthe prettiest flower is here\ntry to type quietly\nshe put the wet towels outside\ngreat work; keep it up",
  },
  {
    unit: "bottom",
    title: "Reach Down: C, V, B, N, M",
    adds: "cvbnm",
    newKeys: ["c", "v", "b", "n", "m"],
    intro: "Now reach DOWN. Left middle finger: D down to C. Left pointer: F down to V and B. Right pointer: J down to N and M.",
    text: "dcd fvf fbf jnj jmj\ncab van bin man\ncome back soon\na brave cub climbs\nmy mom can bake bread\nvery nice music",
  },
  {
    unit: "bottom",
    title: "Reach Down: X, Z, Comma, Period",
    adds: "xz,.",
    newKeys: ["x", "z", ",", "."],
    intro: "The last letters! Left ring finger: S down to X. Left pinky: A down to Z. Right middle finger: K down to the comma. Right ring finger: L down to the period.",
    text: "sxs aza k,k l.l\nsix zoo box zip\nfox, zebra, and ox.\nthe lazy fox sat.\nwe fixed six boxes.\nzip it up, then go.",
  },
  {
    unit: "bottom",
    title: "Every Letter",
    adds: "",
    newKeys: [],
    intro: "Each of these sentences uses every letter of the alphabet. If you can relay these, you know the whole keyboard!",
    text: "the quick brown fox jumps over the lazy dog.\npack my box with five dozen jugs.\nhow vexingly quick daft zebras jump.\nsphinx of black quartz, judge my vow.",
  },
  {
    unit: "shift",
    title: "Capital Letters",
    adds: UPPER,
    newKeys: ["Shift"],
    intro: "To make a capital, hold Shift with the pinky on the OTHER hand. Capital letter on the left side of the keyboard? Use the right Shift. Capital on the right side? Use the left Shift.",
    text: "Sam Ana Leo Mia\nTexas Austin Dallas\nMy name is Kai.\nWe live in Texas.\nOur class visits Houston in May.",
  },
  {
    unit: "shift",
    title: "Apostrophe and Question Mark",
    adds: "'?",
    newKeys: ["'", "?"],
    intro: "Your right pinky types the apostrophe (next to ;). The question mark is Shift + the / key, also with your right pinky — so hold the LEFT Shift.",
    text: "can't don't it's\nWhere is it?\nWhy can't we go?\nIt's Sam's turn.\nWhat's the answer?\nDon't forget your lunch.",
  },
  {
    unit: "shift",
    title: "Sentence Practice",
    adds: "",
    newKeys: [],
    intro: "Real sentences with capitals and punctuation — this is what typing looks like in every other ClearCenters challenge.",
    text: "Mars is the red planet.\nCan you see the moon tonight?\nIt's cold on Pluto.\nOur ship is fast, quiet, and strong.\nWhat will we explore next?",
  },
  {
    unit: "numbers",
    title: "Numbers 1 to 5",
    adds: "12345",
    newKeys: ["1", "2", "3", "4", "5"],
    intro: "Numbers live on the very top row. Reach up two rows from home base: A to 1, S to 2, D to 3, and F to both 4 and 5.",
    text: "a1a s2s d3d f4f f5f\n1 2 3 4 5\n12 23 34 45 51\n5 stars, 4 moons, 3 ships\nRoom 12 has 25 desks.",
  },
  {
    unit: "numbers",
    title: "Numbers 6 to 0",
    adds: "67890",
    newKeys: ["6", "7", "8", "9", "0"],
    intro: "Right hand now: J reaches up to 6 and 7, K to 8, L to 9, and ; to 0.",
    text: "j6j j7j k8k l9l ;0;\n6 7 8 9 0\n60 70 80 90 100\nThe trip took 90 days.\nOur rocket has 8 engines and 60 seats.",
  },
  {
    unit: "layout",
    title: "Enter and Tab: Lists",
    adds: "\t",
    newKeys: ["Tab"],
    intro: "Layout matters! Press Enter to start a new line, and press Enter twice to leave a blank line. Press Tab (left pinky) to indent. This transmission is two lists.",
    text: "Supply List\n\n\tpencils\n\tpaper\n\tglue\n\nPacking List\n\n\tsnacks\n\twater\n\tjacket",
  },
  {
    unit: "layout",
    title: "Foundations Final Check",
    adds: "",
    newKeys: [],
    intro: "This is it, Cadet — the final check. A full paragraph with capitals, punctuation, and numbers. Start with Tab to indent. Pass this and you've earned your Foundations badge!",
    text: "\tOur crew landed on a quiet planet at 9 o'clock. We saw two moons, a frozen lake, and 15 strange rocks. Can you guess what we found next? It's a glowing box that hums.",
  },
];

// Cumulative allowed character set for each track level (index 0-based).
export function trackAllowedChars(levelIndex) {
  return TRACK_LEVELS.slice(0, levelIndex + 1).map((l) => l.adds).join("");
}

// ---------- GRADE-LEVEL READINGS ----------
// All original text, AI-drafted; Emily is author of record — review before
// treating as final. Standards verified Sept 22 2026:
//   ELAR 3.12(D) "compose correspondence such as thank you notes or letters"
//   ELAR 4.12(D) / 5.12(D) "compose correspondence that requests information"
//   ELAR 4.11(D) punctuation "...quotation marks in dialogue"
//   ELAR 5.11(D)(x) "...quotation marks in dialogue and commas in compound
//     and complex sentences"; (ix) "capitalization of abbreviations,
//     initials, acronyms, and organizations"
//   Science 3.6A vocabulary = Emily's approved FrequencyRush_Unit1 list.
const READINGS = [
  {
    code: "RS.3.S01",
    grade: 3,
    title: "Science Words: Properties of Matter",
    kind: "vocabulary",
    subject: "Science",
    standard: "Science 3.6A (vocabulary) · Tech Apps 3.12C",
    intro: "Relay these science words exactly. Watch for capital letters — Celsius and Fahrenheit are named after real scientists, so they start with a capital.",
    text: "mass sink float\nmagnetism temperature\nCelsius Fahrenheit\nphysical property\nmass magnetism temperature\nsink float Celsius Fahrenheit",
  },
  {
    code: "RS.3.C01",
    grade: 3,
    title: "Conversation: Ready for Landing",
    kind: "conversation",
    subject: "ELAR",
    standard: "ELAR 3.11D (punctuation, capitalization) · Tech Apps 3.12C",
    intro: "This transmission is a conversation. Each line starts with the speaker's name and a colon. Press Enter at the end of each line so the next speaker gets their own line.",
    text: "Cadet: S.A.M., are you awake?\nS.A.M.: I am always awake. I am a robot.\nCadet: Can you help me check the map?\nS.A.M.: Yes! Our ship is near the red planet.\nCadet: Great. Let's land and explore.\nS.A.M.: I will pack the rover, the snacks, and the flag.",
  },
  {
    code: "RS.3.P01",
    grade: 3,
    title: "Paragraph: How Scientists Describe Matter",
    kind: "paragraph",
    subject: "Science",
    standard: "Science 3.6A · Tech Apps 3.12C",
    intro: "A full paragraph this time. Read each sentence as you type it — this is real science you need to know.",
    text: "Scientists describe matter by its properties. You can use a balance to measure mass. You can use a thermometer to measure temperature in degrees Celsius or Fahrenheit. A magnet can show if an object is magnetic. You can also put an object in water to see if it will sink or float.",
  },
  {
    code: "RS.3.L01",
    grade: 3,
    title: "Friendly Letter: Thank You for the Telescope",
    kind: "letter",
    subject: "ELAR",
    standard: "ELAR 3.12D (compose correspondence) · Tech Apps 3.12C",
    intro: "A friendly letter has five parts, and every part has its own place. Press Enter to leave blank lines between parts, and press Tab to indent each new paragraph. When you finish, the parts will light up.",
    segments: [
      { label: "Date", text: "October 3, 2026\n\n" },
      { label: "Greeting", text: "Dear Grandma,\n\n" },
      {
        label: "Body",
        text: "\tThank you for the telescope you sent me. Last night, Dad and I looked at the moon. We could see big craters, gray plains, and bright mountains. I drew a picture of it in my notebook.\n\tI can't wait to show you when you visit!\n\n",
      },
      { label: "Closing", text: "Love,\n" },
      { label: "Signature", text: "Maya" },
    ],
  },
  // Sept 22 2026, batch 2 — informational paragraphs across subjects.
  // Standards from claude/TEKS_Quick_Reference_Grades_3-5.md (built from
  // Emily's official TEA PDFs); facts kept to what each standard names.
  {
    code: "RS.3.P02",
    grade: 3,
    title: "Paragraph: Earn, Spend, Save, Donate",
    kind: "paragraph",
    subject: "Social Studies",
    standard: "Social Studies 3.5A (earning, spending, saving, donating), 3.5B (budget) · Tech Apps 3.12C",
    intro: "A paragraph about money choices. Watch the commas in the list near the end.",
    text: "People earn money by working at a job. They can use their money in four ways. They can spend it on things they need or want. They can save it to use later. They can donate it to help others. Many people make a budget. A budget is a plan for how to spend and save money.",
  },
  {
    code: "RS.4.P01",
    grade: 4,
    title: "Paragraph: The Sun Powers the Water Cycle",
    kind: "paragraph",
    subject: "Science",
    standard: "Science 4.10A (water cycle, Sun as major energy source) · Tech Apps 4.12C",
    intro: "Relay this science paragraph. Notice the words that show the order of the water cycle.",
    text: "The Sun is the major source of energy for the water cycle. Its energy heats water in oceans, lakes, and rivers. Some of that water evaporates and rises into the air as water vapor. High in the sky, the water vapor cools and condenses into tiny droplets that form clouds. When the droplets grow large and heavy, they fall back to Earth as precipitation, such as rain, sleet, snow, or hail. Then the cycle begins again.",
  },
  {
    code: "RS.4.P02",
    grade: 4,
    title: "Paragraph: The Four Regions of Texas",
    kind: "paragraph",
    subject: "Social Studies",
    standard: "Social Studies 4.6A (four physical regions of Texas) · Tech Apps 4.12C",
    intro: "Every region name is a proper noun, so each one starts with a capital letter. Watch for them!",
    text: "Texas is divided into four physical regions. The Coastal Plains are the largest region, with flat land that stretches along the coast. The North Central Plains have rolling hills and prairies. The Great Plains are high, flat, and dry, and they include the Panhandle. The Mountains and Basins region in far West Texas has the tallest point in the state, Guadalupe Peak.",
  },
  {
    code: "RS.5.P01",
    grade: 5,
    title: "Paragraph: Day, Night, and Shadows",
    kind: "paragraph",
    subject: "Science",
    standard: "Science 5.9 (Earth's rotation, day and night, shadows) · Tech Apps 5.12C",
    intro: "A science paragraph with a few longer sentences. Keep your eyes on the screen and your fingers on home row.",
    text: "Earth spins, or rotates, on its axis about once every 24 hours. As Earth rotates, the half that faces the Sun has day, while the half that faces away has night. The Sun seems to move across the sky, but it is really Earth that is turning. Shadows change during the day, too. In the early morning and late afternoon, shadows are long. Near midday, when the Sun is highest in the sky, shadows are at their shortest.",
  },
  {
    code: "RS.5.P02",
    grade: 5,
    title: "Paragraph: No Taxation Without Representation",
    kind: "paragraph",
    subject: "Social Studies",
    standard: "Social Studies 5.2A (causes of the American Revolution) · Tech Apps 5.12C",
    intro: "A history paragraph with dates, proper nouns, and a quotation. Hold Shift for the quotation marks.",
    text: "Before the American Revolution, Great Britain passed new taxes on the thirteen colonies, such as the Stamp Act and the Tea Act. Many colonists were angry because they had no representatives in Parliament, the group that made the laws. They protested with the slogan \"No taxation without representation.\" In 1773, colonists in Boston dumped British tea into the harbor. This protest, called the Boston Tea Party, helped lead to war in 1775.",
  },
  {
    code: "RS.4.C01",
    grade: 4,
    title: "Dialogue: The Broken Rover",
    kind: "conversation",
    subject: "ELAR",
    standard: "ELAR 4.11D (quotation marks in dialogue, commas in compound sentences) · Tech Apps 4.12C",
    intro: "This time the conversation is written like a story, with quotation marks around the words people say. Hold Shift and press the apostrophe key to make a quotation mark. Start a new paragraph with Tab every time the speaker changes.",
    text: "\t\"The rover won't start,\" Jada said.\n\t\"Did you check the battery?\" asked Leo.\n\t\"I checked it twice, but it's still dead,\" she said.\n\tLeo grinned and held up a cable. \"Then let's try this.\"",
  },
  {
    code: "RS.4.L01",
    grade: 4,
    title: "Letter: Requesting Information",
    kind: "letter",
    subject: "ELAR",
    standard: "ELAR 4.12D (correspondence that requests information) · Tech Apps 4.12C",
    intro: "Some letters ask for information. They still have five parts, but the language is more formal, and the body clearly says what you want to know. Press Tab to indent each paragraph. When you finish, the parts will light up.",
    segments: [
      { label: "Date", text: "November 12, 2026\n\n" },
      { label: "Greeting", text: "Dear Ms. Rivera,\n\n" },
      {
        label: "Body",
        text: "\tMy class is studying the night sky, and we would like to visit your planetarium. Could you please send us information about your field trips? We would like to know what days you are open and how long a show lasts. We also need to know how many students can come at one time.\n\tThank you for your help.\n\n",
      },
      { label: "Closing", text: "Sincerely,\n" },
      { label: "Signature", text: "Carlos Mendez" },
    ],
  },
  {
    code: "RS.5.C01",
    grade: 5,
    title: "Dialogue: Signal Lost",
    kind: "conversation",
    subject: "ELAR",
    standard: "ELAR 5.11D (quotation marks in dialogue, commas in compound and complex sentences) · Tech Apps 5.12C",
    intro: "A story scene with dialogue. Watch the punctuation inside the quotation marks, and start a new paragraph with Tab every time the speaker changes.",
    text: "\tWhen the screen went dark, Captain Ortiz leaned toward the radio. \"Base, can you hear us?\"\n\tThere was only static, so Priya tried a different channel.\n\t\"We're losing power,\" she said quietly, \"but I think I can reroute it.\"\n\t\"Then do it,\" the captain said, \"and do it fast.\"",
  },
  {
    code: "RS.5.L01",
    grade: 5,
    title: "Letter: Requesting Information",
    kind: "letter",
    subject: "ELAR",
    standard: "ELAR 5.12D (correspondence that requests information), 5.11D (capitalization of organizations, abbreviations) · Tech Apps 5.12C",
    intro: "A formal letter that requests information. Notice the capital letters in the name of an organization and in abbreviations like Dr. Press Tab to indent each paragraph. When you finish, the parts will light up.",
    segments: [
      { label: "Date", text: "January 20, 2027\n\n" },
      { label: "Greeting", text: "Dear Dr. Chen,\n\n" },
      {
        label: "Body",
        text: "\tI am a fifth grader at Oak Hill Elementary. Our class is building a model of the solar system for the Lone Star Science Fair. I read that the Gulf Coast Astronomy Club lends telescopes to schools.\n\tCould you tell me how a school can borrow one and how long we could keep it? We would also like to know whether a club member could show us how to use it. I would be grateful for any information you can share.\n\n",
      },
      { label: "Closing", text: "Sincerely,\n" },
      { label: "Signature", text: "Amara Okafor" },
    ],
  },
];

// ---------- READING LIBRARY (Sept 22 2026, batch 3) ----------
// Emily's plan: every topic gets 4 readings per grade, spread across three
// reading tiers — 1 Launch (40-60 words, short sentences, below grade),
// 2 Cruise (60-100 words, on grade), 1 Orbit (100-150 words, stretch).
// Topics (all six will be built): Science, Cadet Logs, Social Studies,
// Biographies of TEKS-named people, ELAR text types, Numbers practice.
// This batch: SCIENCE (TEKS from claude/TEKS_Quick_Reference_Grades_3-5.md,
// facts kept to what each standard names) and CADET LOGS (an original
// continuing story per grade; episode 1 = Launch ... episode 4 = Orbit).
export const TIERS = {
  launch: { label: "Launch", icon: "🚀", note: "short and friendly" },
  cruise: { label: "Cruise", icon: "🛰️", note: "on grade level" },
  orbit: { label: "Orbit", icon: "🪐", note: "a stretch challenge" },
};

const LIBRARY = [
  // ----- SCIENCE · GRADE 3 -----
  { code: "RS.3.SCI01", grade: 3, tier: "launch", topic: "science", subject: "Science", std: "Science 3.6B (states of matter)", title: "States of Matter",
    text: "Matter can be a solid, a liquid, or a gas. A solid has its own shape. A rock and an ice cube are solids. A liquid takes the shape of its container. Milk in a cup is a liquid. A gas spreads out to fill its container. The air in a balloon is a gas." },
  { code: "RS.3.SCI02", grade: 3, tier: "cruise", topic: "science", subject: "Science", std: "Science 3.9B (order of the planets)", title: "The Order of the Planets",
    text: "Our solar system has eight planets that orbit the Sun. In order from the Sun, they are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Mercury is the closest planet to the Sun. Neptune is the farthest away. Earth is the third planet from the Sun. A silly sentence helps you remember the order: My Very Educated Mother Just Served Us Nachos." },
  { code: "RS.3.SCI03", grade: 3, tier: "cruise", topic: "science", subject: "Science", std: "Science 3.12B (food chains)", title: "A Pond Food Chain",
    text: "A food chain shows how energy moves from one living thing to another. The energy starts with the Sun. A plant uses sunlight to make its own food. A grasshopper eats the plant. A frog eats the grasshopper. A snake eats the frog. If the frogs left the pond, there could be more grasshoppers. The snakes would have less food." },
  { code: "RS.3.SCI04", grade: 3, tier: "orbit", topic: "science", subject: "Science", std: "Science 3.10C (rapid changes to Earth's surface)", title: "Fast Changes to Earth's Surface",
    text: "Some changes to Earth's surface happen slowly, but others happen very fast. A volcano can erupt and send hot, melted rock called lava down its sides. When the lava cools, it hardens into new rock and can build new land. An earthquake is a sudden shaking of the ground. It can crack roads and knock down buildings. The land can change shape in seconds. A landslide happens when rocks and soil suddenly slide down a hill, often after heavy rain. These rapid changes can reshape Earth's surface in minutes. Scientists study these events to help keep people safe." },

  // ----- SCIENCE · GRADE 4 -----
  { code: "RS.4.SCI01", grade: 4, tier: "launch", topic: "science", subject: "Science", std: "Science 4.8B (conductors and insulators)", title: "Conductors and Insulators",
    text: "Some materials let heat or electricity move through them easily. They are called conductors. Metals, such as copper and aluminum, are good conductors. Other materials slow down heat or electricity. They are called insulators. Wood, plastic, and rubber are good insulators. That is why many metal pots have plastic handles." },
  { code: "RS.4.SCI02", grade: 4, tier: "cruise", topic: "science", subject: "Science", std: "Science 4.9A (patterns in the seasons)", title: "Patterns in the Seasons",
    text: "As the seasons change, you can see patterns in temperature and in the length of daylight. In summer, days are long and temperatures are usually warm. In winter, days are short and temperatures are usually cool. In spring, the days slowly get longer. In fall, the days slowly get shorter. Scientists collect data, such as the times of sunrise and sunset, to find these patterns and predict what will come next." },
  { code: "RS.4.SCI03", grade: 4, tier: "cruise", topic: "science", subject: "Science", std: "Science 4.12B (food webs)", title: "Food Webs",
    text: "A food web shows how the food chains in an ecosystem connect. The Sun is the source of energy for the food web. Producers, such as grass and trees, use sunlight to make their own food. Consumers, such as rabbits, snakes, and hawks, get energy by eating other living things. Decomposers, such as fungi and bacteria, break down dead plants and animals. This returns nutrients to the soil so producers can use them again." },
  { code: "RS.4.SCI04", grade: 4, tier: "orbit", topic: "science", subject: "Science", std: "Science 4.10B (weathering, erosion, and deposition)", title: "Weathering, Erosion, and Deposition",
    text: "Earth's surface is always changing because of weathering, erosion, and deposition. Weathering is the breaking down of rock into smaller pieces. Water can freeze in the cracks of a rock, expand, and split the rock apart. Wind can blow sand against rock and slowly wear it away. Erosion is the movement of these small pieces, called sediment, from one place to another. Moving water, wind, and ice can all carry sediment away. Deposition happens when the water, wind, or ice slows down and drops the sediment in a new place. Over many years, deposition can build new landforms, such as sandbars and deltas." },

  // ----- SCIENCE · GRADE 5 -----
  { code: "RS.5.SCI01", grade: 5, tier: "launch", topic: "science", subject: "Science", std: "Science 5.6B (mixtures keep their properties)", title: "Mixtures",
    text: "A mixture is made of two or more materials that are combined but keep their own properties. If you mix iron filings and sand, the iron is still magnetic. You can use a magnet to pull the iron out. If you mix sand and water, the sand still sinks. You can pour the water through a filter to separate them." },
  { code: "RS.5.SCI02", grade: 5, tier: "cruise", topic: "science", subject: "Science", std: "Science 5.8C (light travels, reflects, refracts, and is absorbed)", title: "How Light Behaves",
    text: "Light travels in a straight line until it hits something. When light hits a smooth, shiny surface, such as a mirror, it bounces off. This is called reflection. When light passes from one material into another, such as from air into water, it bends. This is called refraction, and it makes a straw in a glass of water look broken. Dark materials absorb light, which is why a black shirt feels warm on a sunny day." },
  { code: "RS.5.SCI03", grade: 5, tier: "cruise", topic: "science", subject: "Science", std: "Science 5.12A (biotic and abiotic factors)", title: "Living and Nonliving Parts of an Ecosystem",
    text: "An ecosystem is made of living and nonliving parts. The living parts, such as plants, animals, and fungi, are called biotic factors. The nonliving parts, such as sunlight, water, air, soil, and temperature, are called abiotic factors. In a healthy ecosystem, these parts interact. Plants need sunlight, water, and soil to grow. Animals need plants, water, and shelter to survive. If one part changes, the whole ecosystem can be affected." },
  { code: "RS.5.SCI04", grade: 5, tier: "orbit", topic: "science", subject: "Science", std: "Science 5.10C (landforms made by wind, water, and ice)", title: "How Landforms Are Made",
    text: "Wind, water, and ice shape many of the landforms we see on Earth. Over millions of years, the Colorado River carved deep into layers of rock to form the Grand Canyon. Wind can pile loose sand into hills called sand dunes, like the dunes at Monahans Sandhills State Park in West Texas. When a river reaches the ocean, it slows down and drops its sediment, building a landform called a delta. The Mississippi River Delta formed this way. Glaciers, which are huge sheets of moving ice, can scrape out wide valleys as they slowly slide downhill." },

  // ----- CADET LOGS · GRADE 3: "The Lost Signal" -----
  { code: "RS.3.LOG01", grade: 3, tier: "launch", topic: "cadet", subject: "ELAR", std: "ELAR 3.11D (capitalization, punctuation)", title: "The Lost Signal", episode: 1,
    text: "Cadet Log 1\n\nToday was my first day on Station Nova. S.A.M. showed me the control room. It has big screens, blinking lights, and a window full of stars. Then a small red light started to flash. S.A.M. said it was a signal. Someone out there needs help." },
  { code: "RS.3.LOG02", grade: 3, tier: "cruise", topic: "cadet", subject: "ELAR", std: "ELAR 3.11D (capitalization, punctuation)", title: "The Lost Signal", episode: 2,
    text: "Cadet Log 2\n\nWe listened to the signal all morning. It beeped three times, stopped, and then beeped again. S.A.M. used the star map to find where it came from. The signal is coming from a tiny moon near the biggest planet in our sky. The captain said we could take the small shuttle. I packed a flashlight, a toolkit, and extra snacks." },
  { code: "RS.3.LOG03", grade: 3, tier: "cruise", topic: "cadet", subject: "ELAR", std: "ELAR 3.11D (capitalization, punctuation)", title: "The Lost Signal", episode: 3,
    text: "Cadet Log 3\n\nThe moon was gray, dusty, and very quiet. My boots left deep prints in the dust. S.A.M. rolled ahead with its scanner beeping faster and faster. Behind a big rock, we found a small robot stuck in a crater. Its antenna was bent, and its battery was almost empty. It was the one sending the signal all along!" },
  { code: "RS.3.LOG04", grade: 3, tier: "orbit", topic: "cadet", subject: "ELAR", std: "ELAR 3.11D (capitalization, punctuation)", title: "The Lost Signal", episode: 4,
    text: "Cadet Log 4\n\nWe carried the little robot back to the shuttle and plugged it into our power line. After a few minutes, its eyes blinked on. S.A.M. translated its beeps. The robot was a helper beacon that had fallen off a supply ship many years ago. It had been calling for help ever since, but no one had heard it until now. Back on Station Nova, we fixed its antenna and gave it a new battery. The captain said it can stay with us. I named it Pip. Tomorrow, Pip will help S.A.M. watch the signal screens." },

  // ----- CADET LOGS · GRADE 4: "The Frozen Greenhouse" -----
  { code: "RS.4.LOG01", grade: 4, tier: "launch", topic: "cadet", subject: "ELAR", std: "ELAR 4.11D (quotation marks in dialogue, commas)", title: "The Frozen Greenhouse", episode: 1,
    text: "Cadet Log 1\n\nAlarms woke me up at 0600. \"The greenhouse is too cold,\" S.A.M. said. The greenhouse grows all of the food on our ship. If the plants freeze, the crew will go hungry. I grabbed my jacket and ran down the hall." },
  { code: "RS.4.LOG02", grade: 4, tier: "cruise", topic: "cadet", subject: "ELAR", std: "ELAR 4.11D (quotation marks in dialogue, commas)", title: "The Frozen Greenhouse", episode: 2,
    text: "Cadet Log 2\n\nFrost covered the glass walls of the greenhouse, and the tomato leaves were starting to droop. \"The heater is still running,\" S.A.M. reported, \"but the warm air is not reaching the plants.\" I followed the air vent with my flashlight. Halfway down the tunnel, I found the problem. A panel had come loose, and the warm air was leaking away." },
  { code: "RS.4.LOG03", grade: 4, tier: "cruise", topic: "cadet", subject: "ELAR", std: "ELAR 4.11D (quotation marks in dialogue, commas)", title: "The Frozen Greenhouse", episode: 3,
    text: "Cadet Log 3\n\nI could not reach the loose panel by myself. I called the chief engineer. \"Hold the flashlight steady,\" she said, \"and hand me the wrench when I ask for it.\" We worked for two hours. My arms were tired, but I kept the light still. Finally, she tightened the last bolt, and warm air rushed back toward the greenhouse." },
  { code: "RS.4.LOG04", grade: 4, tier: "orbit", topic: "cadet", subject: "ELAR", std: "ELAR 4.11D (quotation marks in dialogue, commas)", title: "The Frozen Greenhouse", episode: 4,
    text: "Cadet Log 4\n\nBy dinnertime, the frost on the greenhouse glass had melted into tiny drops of water. Most of the plants were standing tall again, although a few lettuce leaves were brown around the edges. The chief engineer told the captain that I had noticed the leak first. \"Quick thinking, Cadet,\" the captain said. \"A good crew member spots small problems before they become big ones.\" Tonight, S.A.M. and I made a checklist for the greenhouse vents. Tomorrow, we will check every panel on the ship, one by one, so this never happens again. \"Let's start first thing in the morning,\" I told S.A.M., and it beeped twice to agree." },

  // ----- CADET LOGS · GRADE 5: "The Asteroid Map" -----
  { code: "RS.5.LOG01", grade: 5, tier: "launch", topic: "cadet", subject: "ELAR", std: "ELAR 5.11D (quotation marks in dialogue, commas in compound and complex sentences)", title: "The Asteroid Map", episode: 1,
    text: "Cadet Log 1\n\nOur mission is simple to explain but hard to do. We must map the asteroid field between Station Vega and the outer moons. No ship has ever crossed it safely. S.A.M. has loaded the scanners, and I have checked our fuel twice. We launch at 0800." },
  { code: "RS.5.LOG02", grade: 5, tier: "cruise", topic: "cadet", subject: "ELAR", std: "ELAR 5.11D (quotation marks in dialogue, commas in compound and complex sentences)", title: "The Asteroid Map", episode: 2,
    text: "Cadet Log 2\n\nThe asteroid field is bigger than anyone expected. Some rocks are as small as a basketball, while others are larger than our entire ship. S.A.M. scans each asteroid and records its size, speed, and direction. I plot every one on the map. By the end of today, we had charted 146 asteroids, but there are thousands more to go." },
  { code: "RS.5.LOG03", grade: 5, tier: "cruise", topic: "cadet", subject: "ELAR", std: "ELAR 5.11D (quotation marks in dialogue, commas in compound and complex sentences)", title: "The Asteroid Map", episode: 3,
    text: "Cadet Log 3\n\nThis morning, S.A.M. noticed a pattern in our data. \"The large asteroids are all moving in the same direction,\" it said, \"and they leave a gap behind them every 40 minutes.\" If we time our flight carefully, we can slip through that gap. The captain wants proof before we try it, so we will watch the gap three more times." },
  { code: "RS.5.LOG04", grade: 5, tier: "orbit", topic: "cadet", subject: "ELAR", std: "ELAR 5.11D (quotation marks in dialogue, commas in compound and complex sentences)", title: "The Asteroid Map", episode: 4,
    text: "Cadet Log 4\n\nThe gap opened exactly when S.A.M. predicted, three times in a row. At 1420, the captain gave the order, and we steered the ship into the opening. Asteroids tumbled past on both sides, close enough that I could see the craters on their surfaces. Although my hands were shaking, I read out the numbers from our map, and the pilot followed them perfectly. Twelve minutes later, we reached open space on the other side. Our map is now the first safe route through the field, and every ship at Station Vega will use it. Before we headed home, the captain asked me to sign the bottom of the map, right next to S.A.M.'s serial number." },
  // ======================= BATCH 2 (Sept 22 2026) =======================
  // ----- SOCIAL STUDIES · GRADE 3 -----
  { code: "RS.3.SS01", grade: 3, tier: "launch", topic: "ss", subject: "Social Studies", std: "Social Studies 3.4A (cardinal and intermediate directions)", title: "Finding Your Way",
    text: "A compass rose shows directions on a map. The four cardinal directions are north, south, east, and west. The intermediate directions are in between them: northeast, northwest, southeast, and southwest. Directions help us find places on a map. They also help us give clear instructions." },
  { code: "RS.3.SS02", grade: 3, tier: "cruise", topic: "ss", subject: "Social Studies", std: "Social Studies 3.7A (local, state, and national government)", title: "Three Levels of Government",
    text: "Our country has three levels of government. The local government runs a city or town. It takes care of things like parks, libraries, and trash pickup. The state government makes laws for the whole state of Texas. The national government in Washington, D.C., leads the whole United States. It prints money and protects the country. Each level has leaders who are chosen by the people." },
  { code: "RS.3.SS03", grade: 3, tier: "cruise", topic: "ss", subject: "Social Studies", std: "Social Studies 3.6B (scarcity)", title: "Scarcity and Choices",
    text: "Scarcity means there is not enough of something for everyone who wants it. People have many wants. Time, money, and materials are limited. Because of scarcity, people must make choices. If you have five dollars, you might choose a book or a toy. When you choose one thing, you give up the other." },
  { code: "RS.3.SS04", grade: 3, tier: "orbit", topic: "ss", subject: "Social Studies", std: "Social Studies 3.9A, 3.9C (good citizenship, civic responsibility)", title: "Being a Good Citizen",
    text: "Good citizens help make their communities better places to live. They are honest, which means they tell the truth. They show respect for others, even when they disagree. They take responsibility for their own actions. Good citizens also follow rules and laws. They cross the street safely. They throw trash in the right place. Many good citizens volunteer their time to help others. They might pick up litter at a park. They might collect food for families in need. When people vote, they help make decisions for the whole group. Every person can be a good citizen." },

  // ----- SOCIAL STUDIES · GRADE 4 -----
  { code: "RS.4.SS01", grade: 4, tier: "launch", topic: "ss", subject: "Social Studies", std: "Social Studies 4.14 (Texas symbols)", title: "Texas Symbols",
    text: "Texas has many state symbols. The state flower is the bluebonnet. The state bird is the mockingbird. The state tree is the pecan. The Texas flag has one white star, which is why Texas is called the Lone Star State." },
  { code: "RS.4.SS02", grade: 4, tier: "cruise", topic: "ss", subject: "Social Studies", std: "Social Studies 4.2 (Spanish missions)", title: "Spanish Missions in Texas",
    text: "Spain built missions across Texas in the 1600s and 1700s. A mission was a religious settlement. Spanish priests hoped to teach American Indians about the Catholic faith and the Spanish way of life. Many missions were built near presidios, which were forts where soldiers lived. Several missions in San Antonio, including the Alamo, still stand today." },
  { code: "RS.4.SS03", grade: 4, tier: "cruise", topic: "ss", subject: "Social Studies", std: "Social Studies 4.3 (Texas Revolution)", title: "The Alamo and San Jacinto",
    text: "In 1836, Texians and Tejanos fought for independence from Mexico. In March, Mexican troops led by Santa Anna attacked the Alamo, a former mission in San Antonio. The defenders were defeated, but their courage inspired others. On April 21, 1836, Sam Houston led the Texian army to victory at the Battle of San Jacinto. Texas became an independent nation called the Republic of Texas." },
  { code: "RS.4.SS04", grade: 4, tier: "orbit", topic: "ss", subject: "Social Studies", std: "Social Studies 4.4 (cattle industry and cattle drives)", title: "The Great Cattle Drives",
    text: "After the Civil War, Texas had millions of longhorn cattle. Beef sold for much more money in the North and East. To reach those markets, cowboys drove huge herds north. They followed trails such as the Chisholm Trail. The trail led to railroad towns in Kansas, where the cattle were loaded onto trains. A cattle drive could last two or three months. Cowboys, including many African Americans and Mexican American vaqueros, worked long days in dust, heat, and storms. Railroads reached Texas and ranchers put up barbed wire fences. The great cattle drives came to an end." },

  // ----- SOCIAL STUDIES · GRADE 5 -----
  { code: "RS.5.SS01", grade: 5, tier: "launch", topic: "ss", subject: "Social Studies", std: "Social Studies 5.1A (reasons for colonization)", title: "Why People Came to the Colonies",
    text: "People came to the thirteen colonies for many reasons. Some wanted religious freedom. Some wanted land to farm. Others hoped to earn money through trade. The Pilgrims sailed on the Mayflower in 1620 so they could worship in their own way." },
  { code: "RS.5.SS02", grade: 5, tier: "cruise", topic: "ss", subject: "Social Studies", std: "Social Studies 5.15 (three branches, checks and balances)", title: "Three Branches of Government",
    text: "The Constitution divides the national government into three branches. The legislative branch, called Congress, makes the laws. The executive branch, led by the president, carries out the laws. The judicial branch, which includes the Supreme Court, decides what the laws mean. Each branch can check, or limit, the power of the other two. This system of checks and balances keeps any one branch from becoming too powerful." },
  { code: "RS.5.SS03", grade: 5, tier: "cruise", topic: "ss", subject: "Social Studies", std: "Social Studies 5.4 (territorial expansion)", title: "The Louisiana Purchase",
    text: "In 1803, President Thomas Jefferson bought a huge area of land from France. This was called the Louisiana Purchase, and it doubled the size of the United States. Jefferson sent Meriwether Lewis and William Clark to explore the new land. A Shoshone woman named Sacagawea helped guide and translate for them. Their journey helped the country learn about the West." },
  { code: "RS.5.SS04", grade: 5, tier: "orbit", topic: "ss", subject: "Social Studies", std: "Social Studies 5.2 (American Revolution)", title: "The Declaration of Independence",
    text: "In the summer of 1776, leaders from the thirteen colonies met in Philadelphia. They asked Thomas Jefferson to write a document explaining why the colonies should be free from Great Britain. Jefferson wrote that all people have certain rights, including life, liberty, and the pursuit of happiness. He also listed the ways the British king had treated the colonists unfairly. On July 4, 1776, the Continental Congress approved the Declaration of Independence. Today, Americans celebrate this date every year as Independence Day. The words of the Declaration still remind people that government should protect the rights of its citizens." },

  // ----- BIOGRAPHIES · GRADE 3 (people named in 3.9B and 3.13A) -----
  { code: "RS.3.BIO01", grade: 3, tier: "launch", topic: "bio", subject: "Social Studies", std: "Social Studies 3.9B (examples of good citizens)", title: "Clara Barton",
    text: "Clara Barton was a nurse during the Civil War. She brought food, bandages, and medicine to hurt soldiers. People called her the Angel of the Battlefield. In 1881, she started the American Red Cross. The Red Cross still helps people after disasters today." },
  { code: "RS.3.BIO02", grade: 3, tier: "cruise", topic: "bio", subject: "Social Studies", std: "Social Studies 3.9B (examples of good citizens)", title: "Helen Keller",
    text: "Helen Keller was born in 1880. When she was a baby, an illness left her unable to see or hear. Her teacher, Anne Sullivan, spelled words into Helen's hand. One day at a water pump, Helen felt cool water on her hand. She understood that w-a-t-e-r meant water. She later graduated from college. She spent her life helping people with disabilities." },
  { code: "RS.3.BIO03", grade: 3, tier: "cruise", topic: "bio", subject: "Social Studies", std: "Social Studies 3.9B (examples of good citizens)", title: "Ruby Bridges",
    text: "In 1960, Ruby Bridges was six years old. She became the first Black student at William Frantz Elementary School. Many people shouted at her as she walked to school. Federal marshals walked beside her to keep her safe. Ruby was brave and kept going to school every day. Her courage helped open schools in the South to all children." },
  { code: "RS.3.BIO04", grade: 3, tier: "orbit", topic: "bio", subject: "Social Studies", std: "Social Studies 3.13A (scientists and inventors)", title: "Jonas Salk",
    text: "In the early 1950s, many parents were afraid of a disease called polio. Polio could make it hard to walk or even breathe. It often affected children. A scientist named Jonas Salk worked for years to find a way to stop it. In 1955, his polio vaccine was announced as safe and effective. Soon, millions of children received the vaccine, and the number of polio cases dropped quickly. A reporter asked Salk who owned the vaccine. He said it belonged to the people. He did not want to earn money from something that could help so many." },

  // ----- BIOGRAPHIES · GRADE 4 (people named in 4.18A and 4.15) -----
  { code: "RS.4.BIO01", grade: 4, tier: "launch", topic: "bio", subject: "Social Studies", std: "Social Studies 4.18A (Texas inventors)", title: "Gail Borden",
    text: "Gail Borden was an inventor who lived in Texas. He helped run a newspaper during the Texas Revolution. Later, he found a way to make condensed milk. His milk could stay fresh for a long time without a refrigerator." },
  { code: "RS.4.BIO02", grade: 4, tier: "cruise", topic: "bio", subject: "Social Studies", std: "Social Studies 4.18A (Texas inventors), 4.4", title: "Joseph Glidden and Barbed Wire",
    text: "Joseph Glidden invented a kind of barbed wire in 1874. Barbed wire is wire with sharp points twisted around it. Before barbed wire, ranchers on the plains had few ways to fence in cattle. There were not many trees for wooden fences. Barbed wire was cheap and strong. It changed ranching in Texas and helped end the open range." },
  { code: "RS.4.BIO03", grade: 4, tier: "cruise", topic: "bio", subject: "Social Studies", std: "Social Studies 4.15 (civic participation)", title: "Barbara Jordan",
    text: "Barbara Jordan was born in Houston in 1936. She became a lawyer and a powerful speaker. In 1966, she became the first African American woman elected to the Texas Senate. Later, she became the first African American woman from a Southern state elected to the United States House of Representatives. She was known for her strong voice and her belief in the Constitution." },
  { code: "RS.4.BIO04", grade: 4, tier: "orbit", topic: "bio", subject: "Social Studies", std: "Social Studies 4.18A (Texas scientists)", title: "Michael DeBakey",
    text: "Michael DeBakey was a heart surgeon who worked in Houston for many years. As a young medical student, he invented a pump that could keep blood moving during surgery. This roller pump later became an important part of the heart-lung machine. During World War II, he helped plan mobile army hospitals. They moved close to the battlefield to treat wounded soldiers faster. At Baylor College of Medicine in Houston, DeBakey and his team studied blood vessels. They found new ways to repair and replace damaged ones. Over his long career, he performed more than sixty thousand operations. He trained surgeons from around the world." },

  // ----- BIOGRAPHIES · GRADE 5 (people named in 5.22A) -----
  { code: "RS.5.BIO01", grade: 5, tier: "launch", topic: "bio", subject: "Social Studies", std: "Social Studies 5.22A (science and technology in U.S. history)", title: "The Wright Brothers",
    text: "Orville and Wilbur Wright were brothers who built bicycles. They also dreamed of flying. On December 17, 1903, near Kitty Hawk, North Carolina, their airplane flew for twelve seconds. It was the first powered airplane flight." },
  { code: "RS.5.BIO02", grade: 5, tier: "cruise", topic: "bio", subject: "Social Studies", std: "Social Studies 5.22A (science and technology in U.S. history)", title: "Benjamin Franklin",
    text: "Benjamin Franklin was a printer, writer, scientist, and inventor. He is famous for flying a kite in a storm to show that lightning is a form of electricity. This led him to invent the lightning rod, which protects buildings from lightning strikes. He also invented bifocal glasses and a stove that heated homes better. Later, he helped write the Declaration of Independence." },
  { code: "RS.5.BIO03", grade: 5, tier: "cruise", topic: "bio", subject: "Social Studies", std: "Social Studies 5.22A (science and technology in U.S. history)", title: "George Washington Carver",
    text: "George Washington Carver was a scientist who helped farmers in the South. Growing cotton year after year had worn out their soil. Carver taught farmers to plant crops such as peanuts and sweet potatoes, which put nutrients back into the soil. He also found hundreds of ways to use these crops, including in foods, dyes, and other products." },
  { code: "RS.5.BIO04", grade: 5, tier: "orbit", topic: "bio", subject: "Social Studies", std: "Social Studies 5.22A (science and technology in U.S. history)", title: "Neil Armstrong",
    text: "On July 16, 1969, Apollo 11 launched from Florida. Three astronauts were aboard: Neil Armstrong, Buzz Aldrin, and Michael Collins. Four days later, Armstrong and Aldrin landed on the Moon in a small spacecraft called the Eagle. Collins stayed in orbit. Millions of people watched on television as Armstrong climbed down the ladder. When he stepped onto the dusty surface, he said, \"That's one small step for man, one giant leap for mankind.\" Armstrong and Aldrin collected rocks and set up experiments before returning safely to Earth. Their mission showed that careful planning and teamwork could make an impossible dream come true." },

  // ----- ELAR TEXT TYPES · GRADE 3 -----
  { code: "RS.3.ELA01", grade: 3, tier: "launch", topic: "ela", subject: "ELAR", std: "ELAR 3.12B (informational/procedural text)", title: "How-To: Plant a Seed",
    text: "How to Plant a Seed\n\n1. Fill a cup with soil.\n2. Poke a small hole with your finger.\n3. Drop one seed into the hole.\n4. Cover the seed with soil.\n5. Water it and put it in a sunny spot." },
  { code: "RS.3.ELA02", grade: 3, tier: "cruise", topic: "ela", subject: "ELAR", std: "ELAR 3.12A (poetry)", title: "Poem: Rocket Ride",
    text: "Rocket Ride\n\nCount down from ten, then hold on tight,\nour rocket roars into the night.\nWe zoom past clouds and silver stars,\nwe wave hello to rusty Mars.\nThe Moon looks like a giant ball,\nand Earth is blue and very small.\nWhen we come home, we'll have a lot\nof tales about the stars we caught." },
  { code: "RS.3.ELA03", grade: 3, tier: "cruise", topic: "ela", subject: "ELAR", std: "ELAR 3.12C (opinion/argumentative text)", title: "Opinion: Our School Needs a Garden",
    text: "Our School Needs a Garden\n\nOur school should start a garden. First, a garden would help us learn about plants in a fun way. We could watch seeds sprout and grow. Second, we could grow healthy vegetables to share. Finally, working in a garden is good exercise. For these reasons, a school garden is a great idea." },
  { code: "RS.3.ELA04", grade: 3, tier: "orbit", topic: "ela", subject: "ELAR", std: "ELAR 3.12B (informational text)", title: "News Brief: Bake Sale Helps Shelter",
    text: "Third Graders Raise Money for Animal Shelter\n\nOn Friday, the third graders at Oak Hill Elementary held a bake sale. The money will help the animal shelter. Students baked cookies, muffins, and brownies at home. They sold them in the cafeteria after lunch. By the end of the day, they had raised enough for food, blankets, and toys. The shelter will use them for its dogs and cats. \"We wanted to help animals who do not have a home yet,\" said student Maya Lopez. The shelter director thanked the class. She invited everyone to visit next month." },

  // ----- ELAR TEXT TYPES · GRADE 4 -----
  { code: "RS.4.ELA01", grade: 4, tier: "launch", topic: "ela", subject: "ELAR", std: "ELAR 4.12B (informational/procedural text)", title: "Recipe: Space Trail Mix",
    text: "Space Trail Mix\n\nYou will need:\n\t1 cup of cereal\n\t1/2 cup of raisins\n\t1/2 cup of pretzels\n\nPour everything into a bowl. Stir it with a spoon. Scoop the mix into small bags to share with your crew." },
  { code: "RS.4.ELA02", grade: 4, tier: "cruise", topic: "ela", subject: "ELAR", std: "ELAR 4.12A (poetry)", title: "Poem: Night Watch",
    text: "Night Watch\n\nThe station hums a quiet song\nwhile all the crew is sleeping.\nThe stars slide past the window glass\nlike silver sheep, not leaping.\nI check the screens, I check the lights,\nI sip my cup of cocoa.\nThe Earth below is dark and still\nfrom Maine to Mexico.\nAnd when the Sun peeks round the edge,\nI'll wake the crew with, \"Morning!\"" },
  { code: "RS.4.ELA03", grade: 4, tier: "cruise", topic: "ela", subject: "ELAR", std: "ELAR 4.12C (argumentative text)", title: "Opinion: Every Class Needs a Class Pet",
    text: "Every Class Needs a Class Pet\n\nI believe every classroom should have a class pet. A pet teaches students responsibility, because someone must feed it and clean its home each day. A pet can also help students learn about science, such as what animals need to survive. Some people worry that pets are too much work. However, if students take turns with a simple chart, the work is easy to share. A class pet makes learning more fun." },
  { code: "RS.4.ELA04", grade: 4, tier: "orbit", topic: "ela", subject: "ELAR", std: "ELAR 4.12B (informational text)", title: "News Brief: Robot Club Wins",
    text: "Robot Club Takes First Place\n\nOn Saturday, the Pine Creek Elementary Robot Club won first place at the regional robotics contest. The team of eight fourth graders built a robot. It sorted colored blocks into bins in under two minutes. They spent six weeks designing, building, and testing it after school. During the final round, one wheel came loose. The team fixed it with a spare part just in time. \"We never gave up,\" said team captain Leo Ramirez. The club will compete at the state contest next spring, and they are already planning improvements to their design." },

  // ----- ELAR TEXT TYPES · GRADE 5 -----
  { code: "RS.5.ELA01", grade: 5, tier: "launch", topic: "ela", subject: "ELAR", std: "ELAR 5.12A (poetry)", title: "Poem: Three Space Haiku",
    text: "Three Space Haiku\n\nOn the launching pad\nthe silver rocket waits, still,\ncounting down to flight.\n\nFloating past the Moon,\nwe see the gray craters glow\nlike old silver coins.\n\nEarth, a small blue ball,\nspinning in the endless dark,\ncalling us back home." },
  { code: "RS.5.ELA02", grade: 5, tier: "cruise", topic: "ela", subject: "ELAR", std: "ELAR 5.12C (argumentative text)", title: "Argument: Every Student Should Learn to Type",
    text: "Every Student Should Learn to Type\n\nEvery student should learn to type with all ten fingers. First, typing is faster than writing by hand, so students can get their ideas down before they forget them. Second, many tests and assignments are now completed on computers. Some people say students can just use two fingers. However, touch typists make fewer mistakes and can keep their eyes on their work. Learning to type is a skill students will use for the rest of their lives." },
  { code: "RS.5.ELA03", grade: 5, tier: "cruise", topic: "ela", subject: "ELAR", std: "ELAR 5.12B (informational/procedural text)", title: "How-To: Care for a Class Plant",
    text: "How to Care for a Class Plant\n\n1. Place the plant near a window where it gets sunlight.\n2. Check the soil every Monday and Thursday.\n3. If the soil feels dry, add water until it drips out the bottom.\n4. Turn the pot a quarter turn each week so the plant grows straight.\n5. Record the plant's height in the class log every Friday." },
  { code: "RS.5.ELA04", grade: 5, tier: "orbit", topic: "ela", subject: "ELAR", std: "ELAR 5.12B (informational text)", title: "News Article: Students Launch Weather Balloon",
    text: "Fifth Graders Send Weather Balloon to the Edge of Space\n\nOn Tuesday morning, fifth graders at Lakeview Elementary released a weather balloon. It carried a small camera and a temperature sensor. The balloon rose for nearly two hours, climbing higher than airplanes fly. Then it popped and floated back down on a parachute. Students tracked its path using a GPS signal and found it in a farmer's field about 40 miles away. The camera recorded the curve of the Earth and a dark sky above. \"It was the coolest science project we have ever done,\" said student Priya Shah. The class is now studying the temperature data to learn how the air changes as you go higher." },

  // ----- NUMBERS PRACTICE · GRADE 3 -----
  { code: "RS.3.NUM01", grade: 3, tier: "launch", topic: "num", subject: "Math", std: "Number-row practice", title: "Class Pet Vote",
    text: "Our class voted for a class pet.\n\nfish: 12 votes\nhamster: 8 votes\nturtle: 5 votes\n\nThe fish won by 4 votes." },
  { code: "RS.3.NUM02", grade: 3, tier: "cruise", topic: "num", subject: "Math", std: "Number-row practice", title: "Reading Log",
    text: "Maya read 15 pages on Monday, 20 pages on Tuesday, and 18 pages on Wednesday. On Thursday, she read 25 pages. That is 78 pages in four days! Her goal for the week is 100 pages, so she needs to read 22 more." },
  { code: "RS.3.NUM03", grade: 3, tier: "cruise", topic: "num", subject: "Math", std: "Number-row practice", title: "Measuring a Bean Plant",
    text: "Our bean plant was 2 centimeters tall on Day 1. By Day 5, it was 6 centimeters tall. On Day 10, it measured 13 centimeters. Between Day 1 and Day 10, the plant grew 11 centimeters. We will measure it again on Day 15." },
  { code: "RS.3.NUM04", grade: 3, tier: "orbit", topic: "num", subject: "Math", std: "Number-row practice (with $ and :)", title: "Field Trip Plan",
    text: "Our field trip to the science museum is on May 14. The bus leaves at 8:30 and arrives at 9:15. There are 24 students and 6 adults going, so 30 people in all. Tickets cost $5 for each student and $8 for each adult. The student tickets cost $120, and the adult tickets cost $48, for a total of $168. We will eat lunch at 12:00 and return to school by 2:45." },

  // ----- NUMBERS PRACTICE · GRADE 4 -----
  { code: "RS.4.NUM01", grade: 4, tier: "launch", topic: "num", subject: "Math", std: "Number-row practice", title: "Weather Data",
    text: "High temperatures this week\n\nMonday: 72 degrees\nTuesday: 75 degrees\nWednesday: 68 degrees\nThursday: 70 degrees\nFriday: 81 degrees\n\nThe warmest day was Friday." },
  { code: "RS.4.NUM02", grade: 4, tier: "cruise", topic: "num", subject: "Math", std: "Number-row practice", title: "Texas by the Numbers",
    text: "Texas became the 28th state in 1845. It has 254 counties, more than any other state. The capital city is Austin. The highest point in Texas is Guadalupe Peak, which is 8,751 feet tall. Texas is so big that driving across it can take more than 12 hours." },
  { code: "RS.4.NUM03", grade: 4, tier: "cruise", topic: "num", subject: "Math", std: "Number-row practice (with $ and decimals)", title: "The Class Store",
    text: "At the class store, pencils cost $0.25 each, erasers cost $0.50 each, and folders cost $1.10. Jada bought 4 pencils, 2 erasers, and 1 folder. She spent $1.00 on pencils, $1.00 on erasers, and $1.10 on the folder. Her total was $3.10, so she got $1.90 back from $5.00." },
  { code: "RS.4.NUM04", grade: 4, tier: "orbit", topic: "num", subject: "Math", std: "Number-row practice · Social Studies 4.3", title: "Texas Revolution Timeline",
    text: "The Texas Revolution happened in less than a year. On October 2, 1835, Texians fought Mexican soldiers at the Battle of Gonzales. On March 2, 1836, Texas leaders signed the Texas Declaration of Independence. Just four days later, on March 6, the Alamo fell. On April 21, 1836, Sam Houston's army won the Battle of San Jacinto in about 18 minutes. In September 1836, Sam Houston was elected the first president of the Republic of Texas." },

  // ----- NUMBERS PRACTICE · GRADE 5 -----
  { code: "RS.5.NUM01", grade: 5, tier: "launch", topic: "num", subject: "Math", std: "Number-row practice (fractions)", title: "Pancake Recipe",
    text: "Pancakes for 4 People\n\n\t1 1/2 cups flour\n\t3 1/2 teaspoons baking powder\n\t1 1/4 cups milk\n\t1 egg\n\t3 tablespoons melted butter\n\nMix, pour, and flip!" },
  { code: "RS.5.NUM02", grade: 5, tier: "cruise", topic: "num", subject: "Math", std: "Number-row practice · Social Studies 5.22A", title: "Apollo 11 by the Numbers",
    text: "Apollo 11 launched on July 16, 1969, with 3 astronauts aboard. It landed on the Moon on July 20, 1969. Neil Armstrong and Buzz Aldrin spent about 21 hours on the surface and collected about 47 pounds of rocks and soil. The crew splashed down in the Pacific Ocean on July 24, after a trip of about 8 days." },
  { code: "RS.5.NUM03", grade: 5, tier: "cruise", topic: "num", subject: "Math", std: "Number-row practice (decimals)", title: "Race Results",
    text: "In the 100-meter dash, Ava finished in 14.52 seconds, Leo finished in 14.25 seconds, and Sam finished in 15.03 seconds. Leo won the race because 14.25 is the smallest time. Ava came in second, 0.27 seconds behind Leo. Sam was 0.51 seconds behind Ava." },
  { code: "RS.5.NUM04", grade: 5, tier: "orbit", topic: "num", subject: "Math", std: "Number-row practice · Social Studies 5.22A", title: "A Timeline of Flight",
    text: "In 1903, the Wright brothers made the first powered airplane flight. It lasted just 12 seconds and covered 120 feet. In 1927, Charles Lindbergh flew alone and nonstop from New York to Paris in about 33 and a half hours. In 1932, Amelia Earhart became the first woman to fly alone across the Atlantic Ocean. In 1947, Chuck Yeager flew faster than the speed of sound. Then, in 1969, Apollo 11 landed on the Moon. In only 66 years, people went from a 12-second flight to walking on the Moon." },
];

const TOPIC_LABELS = { science: "Science", cadet: "Cadet Log", ss: "Social Studies", bio: "Biography", ela: "", num: "Numbers" };

function libraryIntro(r) {
  if (r.topic === "cadet") {
    return r.episode === 1
      ? `A new Cadet Log begins: "${r.title}." Press Enter twice after the log title to leave a blank line, just like a real log entry.`
      : `The story continues — log ${r.episode} of 4 of "${r.title}." Leave a blank line after the log title, just like before.`;
  }
  const byTopic = {
    science: {
      launch: "A short science reading. Keep your eyes on the screen and read each sentence as you type it.",
      cruise: "A science reading at your grade level. Watch for the science words — spell them exactly.",
      orbit: "An Orbit-level science reading: longer sentences and more science words. Read ahead a few words as you type.",
    },
    ss: {
      launch: "A short social studies reading. Names of places and people start with capital letters.",
      cruise: "A social studies reading at your grade level. Watch the capital letters on names, places, and dates.",
      orbit: "An Orbit-level social studies reading with long sentences. Read each sentence before you start typing it.",
    },
    bio: {
      launch: "A short biography — the true story of a real person. Watch the capital letters on names and places.",
      cruise: "A biography at your grade level. Notice the dates and names — type them exactly.",
      orbit: "An Orbit-level biography with long sentences, dates, and names. Take it steady.",
    },
    ela: {
      launch: "This text has its own layout. Press Enter at the end of each line, exactly as it appears.",
      cruise: "Notice how this kind of writing is set up — the title, the line breaks, the punctuation. Copy it exactly.",
      orbit: "A longer piece with a title line, a blank line, and a quotation. Hold Shift for the quotation marks.",
    },
    num: {
      launch: "Numbers practice! Use the top row for numbers — reach up, press, and come back home.",
      cruise: "Lots of numbers in this one. Check each number twice before you type it.",
      orbit: "Numbers, symbols, and long sentences. Hold Shift for $ and :, and watch every digit.",
    },
  };
  return (byTopic[r.topic] || byTopic.science)[r.tier];
}

LIBRARY.forEach((r) => {
  READINGS.push({
    code: r.code,
    grade: r.grade,
    tier: r.tier,
    topic: r.topic,
    episode: r.episode || null,
    kind: r.topic === "cadet" ? "log" : r.topic === "num" ? "numbers" : r.topic === "ela" ? "text-type" : "paragraph",
    subject: r.subject,
    standard: `${r.std} · ${TEKS_KEYBOARDING[r.grade].split(" — ")[0]}`,
    title: r.topic === "cadet"
      ? `Cadet Log ${r.episode}: ${r.title}`
      : TOPIC_LABELS[r.topic] ? `${TOPIC_LABELS[r.topic]}: ${r.title}` : r.title,
    intro: libraryIntro(r),
    text: r.text,
  });
});

// ---------- REGISTRY ----------
const LESSONS = {};

for (const grade of [3, 4, 5]) {
  const code = `RS.${grade}.TRACK`;
  LESSONS[code] = {
    code,
    isTrack: true,
    grade,
    subject: "ELAR",
    kind: "track",
    title: "Typing Foundations Track",
    standard: TEKS_KEYBOARDING[grade],
    goals: TRACK_GOALS[grade],
    levels: TRACK_LEVELS,
    units: TRACK_UNITS,
  };
}

// Shared shape for any single passage — built-in readings AND teacher
// custom texts (see lib/relayStationServer.js).
export function buildReadingLesson(r) {
  const segments = r.segments || null;
  const grade = [3, 4, 5].includes(Number(r.grade)) ? Number(r.grade) : 4;
  return {
    code: r.code,
    isTrack: false,
    isCustom: !!r.isCustom,
    lessonId: r.code.split(".").slice(2).join("."),
    grade,
    subject: r.subject,
    kind: r.kind || "paragraph",
    title: r.title,
    intro: r.intro || "Relay this transmission exactly — every capital, comma, and space.",
    newKeys: [],
    standard: r.standard || TEKS_KEYBOARDING[grade],
    text: segments ? segments.map((x) => x.text).join("") : r.text,
    segments,
    goals: READING_GOALS[grade],
    tier: r.tier || null,
    topic: r.topic || null,
    episode: r.episode || null,
  };
}

READINGS.forEach((r) => {
  LESSONS[r.code] = buildReadingLesson(r);
});

// ---------- CUSTOM TEXT (teacher-pasted passages) ----------
// Custom case codes: RS.C.<first 8 chars of teacher id>.<random>. The
// teacher prefix lets the Challenge Library show a teacher only their own
// custom texts without a new column on `cases`.
export const CUSTOM_CODE_RE = /^RS\.C\.([0-9a-f]{8})\.[0-9a-z]{4,8}$/;
export function isCustomCode(code) {
  return CUSTOM_CODE_RE.test(String(code || ""));
}
export function customCodeOwnerPrefix(code) {
  const m = CUSTOM_CODE_RE.exec(String(code || ""));
  return m ? m[1] : null;
}
export const CUSTOM_MAX_CHARS = 1500;

// Turns pasted text (from Word, Google Docs, a website) into something a
// student can actually type: curly quotes -> straight, dashes -> hyphens,
// ellipsis -> three periods, odd spaces -> normal spaces, runs of spaces
// collapsed, 4 leading spaces -> Tab, trailing spaces trimmed, at most one
// blank line in a row. Anything still not typeable is removed and reported.
export function sanitizeTypingText(raw) {
  let t = String(raw || "");
  t = t.replace(/\r\n?/g, "\n");
  t = t.replace(/[\u2018\u2019\u201A\u2032]/g, "'").replace(/[\u201C\u201D\u201E\u2033]/g, '"');
  t = t.replace(/[\u2013\u2014\u2012\u2212]/g, "-").replace(/\u2026/g, "...");
  t = t.replace(/[\u00A0\u2000-\u200A\u202F\u205F\u3000]/g, " ").replace(/[\u200B-\u200D\uFEFF]/g, "");
  t = t.replace(/\u2022/g, "-");
  // Accented letters -> plain letters (café -> cafe) so nothing is untypeable.
  t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const removed = new Set();
  t = Array.from(t).map((ch) => (/[\n\t\x20-\x7E]/.test(ch) ? ch : (removed.add(ch), ""))).join("");
  t = t
    .split("\n")
    .map((line) => line.replace(/^( {4})+/, (m) => "\t".repeat(m.length / 4)).replace(/^(\t*) +/, "$1").replace(/(?<=\S) {2,}/g, " ").replace(/[ \t]+$/, ""))
    .join("\n");
  t = t.replace(/\n{3,}/g, "\n\n").replace(/^\n+|\n+$/g, "");
  const tooLong = t.length > CUSTOM_MAX_CHARS;
  if (tooLong) t = t.slice(0, CUSTOM_MAX_CHARS).replace(/\s+\S*$/, "");
  return { text: t, removed: [...removed], tooLong };
}

export function getRelayStationLesson(code) {
  return LESSONS[code] || null;
}

export function listRelayStationLessons() {
  return Object.values(LESSONS);
}

// A single typeable passage for a track level (same shape a reading has), so
// the client can run a level exactly like a reading.
export function getTrackLevelLesson(track, levelNumber) {
  const l = track.levels[levelNumber - 1];
  if (!l) return null;
  return {
    code: `${track.code}#${levelNumber}`,
    isTrack: false,
    grade: track.grade,
    kind: "keys",
    title: `Level ${levelNumber}: ${l.title}`,
    intro: l.intro,
    newKeys: l.newKeys,
    text: l.text,
    segments: null,
    goals: { ...track.goals, accuracy: passAccuracyForLevel(levelNumber) },
    unit: l.unit,
  };
}

// Shared star rule so the client's instant result and the server's stored
// result can never disagree. 1 = finished, 2 = accuracy goal, 3 = both goals.
// `accuracy` should be the UNROUNDED value (see computeRun) so 99.6% never
// counts as meeting a 100% goal.
export function meetsAccuracy(goals, accuracyExact) {
  return accuracyExact >= goals.accuracy - 1e-9;
}
export function computeStars(goals, wpm, accuracy) {
  if (!goals) return 1;
  if (!meetsAccuracy(goals, accuracy)) return 1;
  if (wpm < goals.wpm) return 2;
  return 3;
}

// Shared math for both sides: WPM and accuracy from raw counts.
export function computeRun({ chars, keystrokes, errors, ms }) {
  const safeMs = Math.max(1000, ms);
  const safeKeys = Math.max(chars + errors, keystrokes);
  const accuracyExact = ((safeKeys - errors) / safeKeys) * 100;
  return {
    wpm: Math.min(200, Math.round((chars / 5) / (safeMs / 60000))),
    // Displayed accuracy never rounds UP to 100 when there was a mistake.
    accuracy: errors > 0 ? Math.min(99, Math.round(accuracyExact)) : 100,
    accuracyExact,
  };
}

// ---------- GAMIFICATION (v3, Sept 22 2026) ----------
// Ranks: a student is promoted each time they clear a whole unit of the
// track. The last level of every unit is a CHECKPOINT (bigger reward).
export const RANKS = ["Recruit", "Cadet", "Ensign", "Lieutenant", "Commander", "Captain", "Admiral"];

// Level numbers (1-based) that close out a unit.
export const CHECKPOINT_LEVELS = TRACK_UNITS.map((u) => {
  let last = 0;
  TRACK_LEVELS.forEach((l, i) => { if (l.unit === u.id) last = i + 1; });
  return last;
});

export function isCheckpointLevel(levelNumber) {
  return CHECKPOINT_LEVELS.includes(levelNumber);
}

// currentLevel = the level the student is ON (passed levels are below it).
export function unitsCleared(currentLevel) {
  return CHECKPOINT_LEVELS.filter((n) => n < currentLevel).length;
}

export function rankFor(currentLevel) {
  return RANKS[Math.min(unitsCleared(currentLevel), RANKS.length - 1)];
}

// Crystal rewards (placeholder values — tune with real use).
export const CRYSTALS = {
  perNewStar: 1, // every star a student earns for the first time on a level/reading
  checkpoint: 5, // first pass of a unit's checkpoint level (= a promotion)
  trackComplete: 10, // passing level 20
};

// Combo tiers shown while typing (consecutive correct keys).
export const COMBO_TIERS = [
  { at: 100, label: "LIGHT SPEED", color: "#F9A8D4" },
  { at: 50, label: "HYPERDRIVE", color: "#A5B4FC" },
  { at: 25, label: "ON FIRE", color: "#FDBA74" },
  { at: 10, label: "WARMING UP", color: "#FDE047" },
];
export function comboTier(combo) {
  return COMBO_TIERS.find((t) => combo >= t.at) || null;
}

// ---------- PLACEMENT CHECK (v4, Sept 22 2026) ----------
// A short 3-stage test a brand-new student can take instead of starting at
// Level 1. Each stage only uses keys from the levels it can skip. Stages run
// in order and stop at the first miss. To clear a stage a student needs the
// accuracy AND a minimum speed — accurate hunt-and-peck typing should still
// start from the home row. Placeholder numbers; tune with real data.
export const PLACEMENT_MIN_WPM = 10;
export const PLACEMENT_STAGES = [
  {
    id: "A",
    title: "Stage 1: Top Row Letters",
    // keys from levels 1-10 only (no c v b n m x z)
    text: "the quiet fish swept past a huge tower; she liked the deep red pool",
    accuracy: 90,
    placesAt: 11, // skips Home Base + Top Row
  },
  {
    id: "B",
    title: "Stage 2: Every Letter",
    text: "the quick brown fox jumps over the lazy dog, and six zebras move back.",
    accuracy: 95,
    placesAt: 14, // skips Bottom Row
  },
  {
    id: "C",
    title: "Stage 3: Capitals and Punctuation",
    text: "Can Maya's team win? It's Friday, so we will play in Dallas.",
    accuracy: 95,
    placesAt: 17, // skips Capitals & Punctuation
  },
];

// stageRuns: [{ id, chars, keystrokes, errors, ms }] in stage order.
// Returns { level, stages: [{ id, wpm, accuracy, cleared }] }.
export function placementResult(stageRuns) {
  let level = 1;
  const stages = [];
  for (let i = 0; i < PLACEMENT_STAGES.length; i += 1) {
    const stage = PLACEMENT_STAGES[i];
    const r = (stageRuns || []).find((x) => x && x.id === stage.id);
    if (!r) break;
    const { wpm, accuracy, accuracyExact } = computeRun({
      chars: stage.text.length,
      keystrokes: Math.floor(Number(r.keystrokes) || 0),
      errors: Math.max(0, Math.floor(Number(r.errors) || 0)),
      ms: Number(r.ms) || 0,
    });
    const cleared = accuracyExact >= stage.accuracy && wpm >= PLACEMENT_MIN_WPM;
    stages.push({ id: stage.id, wpm, accuracy, cleared });
    if (!cleared) break;
    level = stage.placesAt;
  }
  return { level, stages };
}

// ---------- WAVE 1 (Sept 22 2026): accommodations, ghost, repair drills ----------

// Per-student supports a teacher sets on the Typing Track board. Stored in
// relay_station_progress.accommodations and applied to the track AND to
// readings (the server re-applies the pass-bar change when grading).
export const ACCOMMODATION_DEFAULTS = {
  largeText: false, // bigger transmission text
  dyslexiaFont: false, // Lexend (Google Fonts), wider letter spacing
  reducedMotion: false, // no shake / bursts / pulses
  hideSpeed: false, // hide the live WPM while typing (still recorded)
  passOffset: 0, // lower every accuracy goal by 0, 5, or 10 points (floor 70)
};

export function normalizeAccommodations(a) {
  const src = a && typeof a === "object" ? a : {};
  const offset = [0, 5, 10].includes(Number(src.passOffset)) ? Number(src.passOffset) : 0;
  return {
    largeText: !!src.largeText,
    dyslexiaFont: !!src.dyslexiaFont,
    reducedMotion: !!src.reducedMotion,
    hideSpeed: !!src.hideSpeed,
    passOffset: offset,
  };
}

export function applyAccommodations(goals, accommodations) {
  if (!goals) return goals;
  const acc = normalizeAccommodations(accommodations);
  if (!acc.passOffset) return goals;
  return { ...goals, accuracy: Math.max(70, goals.accuracy - acc.passOffset) };
}

// Ghost racer: the best run stores `timeline` — ms from the first keystroke
// at which each character was typed correctly. Validated before storing.
export function cleanTimeline(timeline, length) {
  if (!Array.isArray(timeline) || timeline.length !== length || length === 0) return null;
  let prev = -1;
  const out = [];
  for (const v of timeline) {
    const n = Math.round(Number(v));
    if (!Number.isFinite(n) || n < prev || n > 60 * 60 * 1000) return null;
    out.push(n);
    prev = n;
  }
  return out;
}

// Repair Drill: a ~30-second practice built from a student's trouble keys,
// using real words from the Relay Station library and ONLY keys the
// student already knows (for a track level: that level's allowed keys).
let WORD_BANK = null;
function wordBank() {
  if (WORD_BANK) return WORD_BANK;
  const texts = [...TRACK_LEVELS.map((l) => l.text), ...READINGS.map((r) => r.text || (r.segments || []).map((s) => s.text).join(" "))];
  const set = new Set();
  // Only words that appear in lowercase somewhere (skips names like Maya),
  // have a vowel, and aren't key-drill patterns like "asdf", "juj", "iii".
  const DRILL_PATTERNS = new Set(["asdf", "jkl", "fdsa"]);
  texts.forEach((t) => (t.match(/\b[a-z]+\b/g) || []).forEach((w) => {
    if (w.length < 2 || w.length > 9) return;
    if (!/[aeiouy]/.test(w) || /^(.)\1+$/.test(w) || /^(.).\1$/.test(w) || DRILL_PATTERNS.has(w)) return;
    set.add(w);
  }));
  WORD_BANK = [...set].sort();
  return WORD_BANK;
}

function seededPick(arr, n, seed) {
  const a = [...arr];
  let x = seed || 7;
  for (let i = a.length - 1; i > 0; i -= 1) {
    x = (x * 9301 + 49297) % 233280;
    const j = Math.floor((x / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

// troubleKeys: [{ key, count }]. allowedChars: string of typeable chars, or
// null for "anything". Returns { text, focus } or null if nothing sensible.
export function buildRepairDrill(troubleKeys, allowedChars, seed = 1) {
  const allowed = allowedChars ? new Set(allowedChars) : null;
  const ok = (w) => !allowed || [...w].every((c) => allowed.has(c));
  const keys = (troubleKeys || []).map((t) => t.key).filter((k) => typeof k === "string" && k.length === 1).slice(0, 3);
  if (!keys.length) return null;
  const bank = wordBank().filter(ok);
  const items = [];
  const focus = [];
  keys.forEach((k, ki) => {
    const lower = k.toLowerCase();
    if (/[a-z]/.test(lower)) {
      let words = bank.filter((w) => w.includes(lower));
      words = seededPick(words, 4, seed + ki * 13);
      if (/[A-Z]/.test(k)) {
        const capOk = !allowed || allowed.has(k);
        words = words.filter((w) => w[0] === lower).concat(words.filter((w) => w[0] !== lower));
        words = words.map((w) => (capOk && w[0] === lower ? w[0].toUpperCase() + w.slice(1) : w));
      }
      // Always drill the key itself; add real words when the student knows enough keys.
      items.push(...words, `${lower}${lower}${lower}`, `${lower} ${lower}${lower}`);
      focus.push(k);
    } else if (/[0-9]/.test(k)) {
      if (!allowed || allowed.has(k)) {
        const partners = "1234567890".split("").filter((d) => d !== k && (!allowed || allowed.has(d))).slice(0, 2);
        items.push(`${k}${k}`, ...partners.map((d) => `${k}${d}`), `${k}${k}${k}`);
        focus.push(k);
      }
    } else if ([",", ".", ";", "'", "?"].includes(k)) {
      if (!allowed || allowed.has(k)) {
        const base = seededPick(bank.filter((w) => w.length <= 5), 4, seed + ki * 7);
        base.forEach((w) => items.push(k === "'" ? `${w}'s` : `${w}${k}`));
        focus.push(k);
      }
    } else if (k === " ") {
      items.push(...seededPick(bank.filter((w) => w.length <= 3), 8, seed + 3));
      focus.push(k);
    } else if (k === "\n" || k === "\t") {
      focus.push(k); // handled by line layout below
    }
  });
  if (!items.length && (keys.includes("\n") || keys.includes("\t"))) {
    items.push(...seededPick(bank.filter((w) => w.length <= 4), 9, seed + 5));
  }
  if (!items.length) return null;
  const perLine = keys.includes("\n") ? 3 : 4;
  const lines = [];
  for (let i = 0; i < items.length; i += perLine) {
    const line = items.slice(i, i + perLine).join(" ");
    lines.push(keys.includes("\t") && (!allowed || allowed.has("\t")) ? `\t${line}` : line);
  }
  return { text: lines.slice(0, 5).join("\n"), focus };
}

// ======================================================================
// WAVE 2 (Sept 22 2026): Dictation, Corrupted Transmission, Copy -> Compose,
// Daily Transmission. Design doc §14.
// ======================================================================

// ---------- Challenge modes for readings ----------
// "copy"      — the normal mode: read it, type it.
// "dictation" — the browser reads each sentence aloud (speechSynthesis, no
//               audio files); letters and numbers are hidden. Capitals are
//               forgiven in dictation (you can't hear a capital letter).
// "corrupted" — a few key words arrive scrambled; the student types the real
//               word. Vocabulary review inside typing practice.
export const MODES = {
  copy: { label: "Copy", icon: "📄", blurb: "Read it and relay it." },
  dictation: { label: "Dictation", icon: "🎧", blurb: "Listen and type what you hear. The words are hidden!" },
  corrupted: { label: "Corrupted Transmission", icon: "📡", blurb: "Some key words got scrambled. Type the real word." },
};
export const MODE_BONUS_CRYSTALS = 2; // first finish in each challenge mode
export const DICTATION_REVEAL_AFTER = 3; // misses at one spot before that character is shown
export const CORRUPT_REVEAL_AFTER = 2;

// Curated key vocabulary for Corrupted Transmission (science readings use the
// standard's own vocabulary). Anything not listed falls back to a heuristic.
const CORRUPT_VOCAB = {
  "RS.3.S01": ["magnetism", "temperature", "Celsius", "Fahrenheit"],
  "RS.3.P01": ["properties", "balance", "thermometer", "magnetic"],
  "RS.3.SCI01": ["Matter", "solid", "liquid", "container"],
  "RS.3.SCI02": ["solar", "planets", "Mercury", "Neptune"],
  "RS.3.SCI03": ["energy", "sunlight", "grasshopper"],
  "RS.3.SCI04": ["surface", "volcano", "earthquake", "landslide"],
  "RS.4.SCI01": ["conductors", "electricity", "insulators", "aluminum"],
  "RS.4.SCI02": ["temperature", "daylight", "patterns", "sunrise"],
  "RS.4.SCI03": ["ecosystem", "Producers", "Consumers", "Decomposers"],
  "RS.4.SCI04": ["weathering", "erosion", "deposition", "sediment"],
  "RS.4.P01": ["evaporates", "vapor", "condenses", "precipitation"],
  "RS.5.SCI01": ["mixture", "properties", "magnetic", "filter"],
  "RS.5.SCI02": ["reflection", "refraction", "absorb", "surface"],
  "RS.5.SCI03": ["ecosystem", "biotic", "abiotic", "survive"],
  "RS.5.SCI04": ["landforms", "dunes", "delta", "Glaciers"],
  "RS.5.P01": ["rotates", "axis", "shadows", "midday"],
};
const STOPWORDS = new Set("about after again against because before being below between could during every having other should their there these those through under until where which while would your yours itself themselves".split(" "));

function scrambleWord(word, seed) {
  const letters = word.split("");
  let x = seed;
  for (let i = letters.length - 1; i > 0; i -= 1) {
    x = (x * 9301 + 49297) % 233280;
    const j = Math.floor((x / 233280) * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  let out = letters.join("");
  if (out === word) out = word.slice(1) + word[0];
  if (out === word) out = word.split("").reverse().join("");
  return out;
}

// Returns [{ start, end, word, scrambled }] — character ranges in `text` to
// show scrambled. At most 4, first occurrence of each word.
export function corruptRanges(code, text) {
  let words = CORRUPT_VOCAB[code];
  if (!words) {
    const seen = new Set();
    let candidates = [];
    // Lowercase content words only (names are too hard to unscramble).
    const collect = (minLen) => {
      const re = new RegExp(`\\b[a-z]{${minLen},}\\b`, "g");
      let m;
      while ((m = re.exec(text))) {
        const w = m[0];
        if (STOPWORDS.has(w) || seen.has(w)) continue;
        seen.add(w);
        candidates.push(w);
      }
    };
    collect(7);
    if (candidates.length < 3) collect(5);
    // spread picks across the passage
    const n = Math.min(4, candidates.length);
    words = Array.from({ length: n }, (_, i) => candidates[Math.floor((i * candidates.length) / n)]);
  }
  const ranges = [];
  words.forEach((w, i) => {
    const re = new RegExp(`\\b${w}\\b`);
    const m = re.exec(text);
    if (!m) return;
    const start = m.index;
    const end = start + w.length;
    if (ranges.some((r) => start < r.end && end > r.start)) return;
    let seed = 17 + i * 31;
    for (const c of w) seed = (seed * 31 + c.charCodeAt(0)) % 233280;
    ranges.push({ start, end, word: w, scrambled: scrambleWord(w, seed) });
  });
  return ranges.sort((a, b) => a.start - b.start);
}

// Sentence-sized chunks for dictation, as [start, end) ranges. Lines are
// split first, then sentences; very long sentences split at commas.
export function dictationChunks(text) {
  const chunks = [];
  let lineStart = 0;
  const lines = text.split("\n");
  lines.forEach((line, li) => {
    const lineEnd = lineStart + line.length + (li < lines.length - 1 ? 1 : 0);
    const re = /[^.!?]+[.!?]+["']?\s*|[^.!?]+$/g;
    let m;
    let found = false;
    while ((m = re.exec(line))) {
      if (!m[0]) break;
      found = true;
      let s = lineStart + m.index;
      const e = lineStart + m.index + m[0].length;
      const piece = text.slice(s, e);
      if (piece.split(/\s+/).length > 14 && piece.includes(", ")) {
        let off = 0;
        piece.split(/(?<=, )/).forEach((part) => { chunks.push([s + off, s + off + part.length]); off += part.length; });
      } else {
        chunks.push([s, e]);
      }
    }
    if (!found && line.length) chunks.push([lineStart, lineStart + line.length]);
    if (li < lines.length - 1) {
      // the Enter belongs to the last chunk on the line (or its own chunk for blank lines)
      if (chunks.length && chunks[chunks.length - 1][1] === lineStart + line.length) chunks[chunks.length - 1][1] += 1;
      else chunks.push([lineStart + line.length, lineStart + line.length + 1]);
    }
    lineStart = lineEnd;
  });
  return chunks.filter(([s, e]) => e > s);
}

// What the voice should say for a chunk (tabs dropped, line breaks = pause).
export function speakableText(chunkText) {
  return chunkText
    .replace(/\t/g, " ")
    .split(/\n+/)
    .map((x) => x.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .map((x) => (/[.!?,:;"]$/.test(x) ? x : `${x}.`))
    .join(" ");
}

// ---------- Copy -> Compose ("Your Turn") ----------
// After relaying a model text, students write their own version. Graded by
// the existing AI helper (lib/anthropic.js) on the same 0/1/2 scale as other
// engines; the teacher can override in grading. First submission: +3 crystals.
export const COMPOSE_CRYSTALS = 3;
const COMPOSE = {
  letterThanks: { type: "friendly letter", minWords: 30, prompt: "Your turn! Write a friendly letter thanking someone for something they gave you or did for you.", checklist: ["Date", "Greeting with a comma (Dear ___,)", "Body that says thank you and why", "Closing with a comma (Love, / Your friend,)", "Your name as the signature"] },
  letterRequest: { type: "letter requesting information", minWords: 40, prompt: "Your turn! Write a letter to a museum, zoo, or park asking for information you would need to plan a class visit.", checklist: ["Date", "Formal greeting (Dear Mr./Ms./Dr. ___,)", "Say who you are and why you are writing", "Ask at least two clear questions", "Closing (Sincerely,) and your name"] },
  opinion3: { type: "opinion paragraph", minWords: 35, prompt: "Your turn! What is one thing that would make our school better? Write an opinion paragraph.", checklist: ["A clear opinion sentence", "At least two reasons", "Linking words (first, second, also, because)", "A concluding sentence"] },
  opinion4: { type: "opinion paragraph", minWords: 45, prompt: "Your turn! Should students have homework on the weekend? Write an opinion paragraph.", checklist: ["A clear opinion", "At least two reasons with examples", "Answer one idea from the other side", "A concluding sentence"] },
  argument5: { type: "argumentative paragraph", minWords: 60, prompt: "Your turn! Should the school day start one hour later? Write an argument.", checklist: ["A clear claim", "Two reasons with evidence or examples", "A counterclaim and your response", "A strong conclusion"] },
  howTo: { type: "how-to (procedural) text", minWords: 30, prompt: "Your turn! Write a how-to for something you know how to do well. Use a title and 4 to 6 numbered steps.", checklist: ["A title", "Numbered steps in order", "Clear action words (fill, stir, place...)", "Enough detail that someone could follow it"] },
  news: { type: "news brief", minWords: 50, prompt: "Your turn! Write a news brief about something that happened at your school or in your community.", checklist: ["A headline", "Who, what, when, and where", "A quotation from someone (in quotation marks)", "Facts, not opinions"] },
  poemRhyme: { type: "rhyming poem", minWords: 20, prompt: "Your turn! Write a rhyming poem of 4 to 8 lines about space or the sky.", checklist: ["A title", "At least 4 lines", "Rhyming line endings", "Words that help the reader picture it"] },
  haiku: { type: "haiku", minWords: 10, prompt: "Your turn! Write your own haiku (or two!) about nature or space: 5 syllables, then 7, then 5.", checklist: ["Three lines", "5-7-5 syllables", "One clear picture or moment"] },
  cadetLog3: { type: "narrative (story continuation)", minWords: 40, prompt: "Your turn! What happens next with Pip? Write Cadet Log 5.", checklist: ["Starts with the title: Cadet Log 5", "Continues the same story", "Capital letters and end punctuation", "A clear beginning, middle, and end"] },
  cadetLog45: { type: "narrative (story continuation)", minWords: 50, prompt: "Your turn! What happens next? Write Cadet Log 5.", checklist: ["Starts with the title: Cadet Log 5", "Continues the same story", "At least one line of dialogue in quotation marks", "A clear beginning, middle, and end"] },
  dialogue: { type: "dialogue", minWords: 30, prompt: "Your turn! Write the next part of this conversation: at least four more lines.", checklist: ["At least four new lines", "Each speaker is clear", "Correct punctuation for dialogue", "The conversation moves the story forward"] },
};
const COMPOSE_BY_CODE = {
  "RS.3.L01": "letterThanks", "RS.4.L01": "letterRequest", "RS.5.L01": "letterRequest",
  "RS.3.ELA03": "opinion3", "RS.4.ELA03": "opinion4", "RS.5.ELA02": "argument5",
  "RS.3.ELA01": "howTo", "RS.5.ELA03": "howTo",
  "RS.3.ELA04": "news", "RS.4.ELA04": "news", "RS.5.ELA04": "news",
  "RS.3.ELA02": "poemRhyme", "RS.4.ELA02": "poemRhyme", "RS.5.ELA01": "haiku",
  "RS.3.LOG04": "cadetLog3", "RS.4.LOG04": "cadetLog45", "RS.5.LOG04": "cadetLog45",
  "RS.3.C01": "dialogue", "RS.4.C01": "dialogue", "RS.5.C01": "dialogue",
};
export function getComposePrompt(code) {
  const key = COMPOSE_BY_CODE[code];
  return key ? { key, ...COMPOSE[key] } : null;
}

// ---------- Daily Transmission ----------
// One short warm-up per day, the SAME text for every student that day
// (America/Chicago date). Assigned once as RS.<grade>.DAILY; it stays on the
// mission list. Weekday streaks: weekends never break a streak.
export const DAILY_CRYSTALS = { perDay: 1, streakBonusEvery: 5, streakBonus: 3 };
export const DAILY_TRANSMISSIONS = [
  "Cadets, report for duty! Today's mission: type with care, keep your eyes on the screen, and finish strong.",
  "The Sun is a star. It is the closest star to Earth, which is why it looks so much bigger and brighter than the others.",
  "Texas is the second-largest state in the United States. Only Alaska is bigger.",
  "A day on Earth is about 24 hours long because that is how long it takes Earth to spin around once.",
  "Honeybees visit flowers to collect nectar and pollen. A busy bee can visit hundreds of flowers in one day.",
  "Water can be a solid, a liquid, or a gas. Ice, water, and steam are the same material in different states.",
  "The Moon does not make its own light. It reflects light from the Sun.",
  "Mars is called the Red Planet because of the rusty dust that covers its surface.",
  "Jupiter is the largest planet in our solar system. More than 1,000 Earths could fit inside it.",
  "The mockingbird is the state bird of Texas. It can copy the songs of many other birds.",
  "Kind words cost nothing, but they can change someone's whole day.",
  "A good typist is not the fastest one. A good typist is the one who keeps going, key by key.",
  "Thunder is the sound made by lightning. Light travels faster than sound, so we see lightning before we hear thunder.",
  "Plants make their own food using sunlight, water, and carbon dioxide from the air.",
  "The Rio Grande forms part of the border between Texas and Mexico.",
  "Neil Armstrong was the first person to walk on the Moon, on July 20, 1969.",
  "A compass needle points north because Earth acts like a giant magnet.",
  "Saturn's rings are made of ice and rock. Some pieces are as small as grains of sand, and some are as big as houses.",
  "Octopuses have three hearts and blue blood.",
  "Practice does not make perfect. Practice makes progress, one keystroke at a time.",
  "The bluebonnet is the state flower of Texas. It blooms in the spring.",
  "A group of stars that forms a picture in the sky is called a constellation.",
  "Sound travels in waves. It can move through air, water, and even solid walls.",
  "The Alamo is in San Antonio. More than a million people visit it every year.",
  "Earth is the only planet we know of that has liquid water on its surface.",
  "Your heart is a muscle about the size of your fist. It pumps blood all day and all night.",
  "Venus is the hottest planet in our solar system, even though Mercury is closer to the Sun.",
  "A camel can go many days without drinking water. It stores fat, not water, in its hump.",
  "Cadet tip: if you make a mistake, take a breath, find the right key, and keep going.",
  "The largest bone in your body is the femur, in your thigh.",
  "Light from the Sun takes about 8 minutes to reach Earth.",
  "Hummingbirds can fly forward, backward, and even hover in one place.",
  "The Texas State Capitol in Austin is taller than the United States Capitol in Washington, D.C.",
  "A leap year has 366 days. The extra day is February 29.",
  "Sharks have been swimming in the oceans since before the dinosaurs.",
  "The deepest part of the ocean is called the Mariana Trench. It is almost 7 miles deep.",
  "Teamwork makes the dream work. Every crew member matters on this station.",
  "A rainbow forms when sunlight passes through raindrops and bends into different colors.",
  "Your brain sends messages to your fingers faster than you can blink. Trust your fingers, Cadet!",
  "Great job this week, Cadet! Rest up, read a good book, and come back ready to relay.",
];

// "YYYY-MM-DD" in Central time (ClearCenters' home time zone).
export function centralDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const get = (t) => parts.find((p) => p.type === t).value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}
function dayNumber(key) {
  const [y, m, d] = key.split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}
export function dailyTextFor(key) {
  return DAILY_TRANSMISSIONS[((dayNumber(key) % DAILY_TRANSMISSIONS.length) + DAILY_TRANSMISSIONS.length) % DAILY_TRANSMISSIONS.length];
}
// Streak continues if no WEEKDAY was skipped between lastKey and todayKey.
export function continuesStreak(lastKey, todayKey) {
  if (!lastKey) return false;
  const a = dayNumber(lastKey);
  const b = dayNumber(todayKey);
  if (b <= a) return b === a;
  for (let n = a + 1; n < b; n += 1) {
    const dow = new Date(n * 86400000).getUTCDay();
    if (dow !== 0 && dow !== 6) return false;
  }
  return true;
}

for (const grade of [3, 4, 5]) {
  const code = `RS.${grade}.DAILY`;
  LESSONS[code] = {
    code,
    isDaily: true,
    isTrack: false,
    grade,
    subject: "ELAR",
    kind: "daily",
    title: "Daily Transmission",
    standard: TEKS_KEYBOARDING[grade],
    goals: READING_GOALS[grade],
  };
}

// ======================================================================
// WAVE 3 (Sept 22 2026): keyboard skins, Class Relay Race. Design doc §15.
// ======================================================================

// ---------- Keyboard skins (rank rewards) ----------
// Each rank unlocks one skin for the on-screen keyboard. Finger colors stay
// on the ACTIVE key in every skin (they're the teaching cue); skins change
// the resting keys, borders, glow, and font.
export const KEYBOARD_SKINS = [
  { key: "classic", name: "Classic", rank: 0, keyBg: "rgba(255,255,255,0.06)", keyText: "rgba(255,255,255,0.75)", border: "finger", glow: 14, radius: 8, font: "inherit" },
  { key: "neon", name: "Neon", rank: 1, keyBg: "rgba(10,10,20,0.9)", keyText: "#39FF14", border: "#FF2BD6", glow: 22, radius: 8, font: "inherit" },
  { key: "hologram", name: "Hologram", rank: 2, keyBg: "rgba(103,232,249,0.08)", keyText: "#A5F3FC", border: "#67E8F9", glow: 18, radius: 10, font: "inherit", dashed: true },
  { key: "retro", name: "Retro Console", rank: 3, keyBg: "#E8DCC0", keyText: "#3B2F2F", border: "#9C8B6E", glow: 10, radius: 3, font: "'Courier New', monospace" },
  { key: "nebula", name: "Nebula", rank: 4, keyBg: "linear-gradient(135deg, #3B1D6E, #1E3A8A)", keyText: "#E9D5FF", border: "#A78BFA", glow: 20, radius: 10, font: "inherit" },
  { key: "solar", name: "Solar Flare", rank: 5, keyBg: "linear-gradient(135deg, #7C2D12, #B45309)", keyText: "#FDE68A", border: "#F59E0B", glow: 22, radius: 9, font: "inherit" },
  { key: "galaxy", name: "Galaxy", rank: 6, keyBg: "radial-gradient(circle at 30% 30%, #312E81, #0B1026 70%)", keyText: "#FDE68A", border: "#FFC44D", glow: 26, radius: 12, font: "inherit", stars: true },
];
export function getKeyboardSkin(key) {
  return KEYBOARD_SKINS.find((s) => s.key === key) || KEYBOARD_SKINS[0];
}
// currentLevel = the track level the student is ON (rank comes from units cleared).
export function skinUnlocked(skinKey, currentLevel) {
  const skin = KEYBOARD_SKINS.find((s) => s.key === skinKey);
  return !!skin && skin.rank <= unitsCleared(currentLevel || 1);
}
export function skinForRankIndex(i) {
  return KEYBOARD_SKINS.find((s) => s.rank === i) || null;
}

// ---------- Class Relay Race ----------
// A long message split into "legs" (one sentence each). During a live race,
// each student claims a leg, types it, and the class's message assembles on
// the teacher's projector board. Nobody is ranked; the whole class wins.
export const RACE_CRYSTALS = 2; // everyone who finished at least one leg, when the class finishes
export const RACE_STALE_SECONDS = 75; // a claimed-but-unfinished leg can be picked up by a helper after this
export const RACE_MESSAGES = [
  {
    key: "echo",
    title: "The Signal from Station Echo",
    blurb: "A 50-year-old signal only the whole crew can decode.",
    legs: [
      "Attention, all cadets on Station Nova.",
      "An old signal just reached our antenna.",
      "It came from Station Echo, far past the rings.",
      "No one has heard from Echo in fifty years.",
      "The signal repeats the same three words.",
      "S.A.M. thinks those words are a secret code.",
      "To read the code, we must relay every line.",
      "Each cadet types one piece of the message.",
      "If one piece is missing, the code will not work.",
      "So we need the whole crew, working as one team.",
      "Here is what the old signal says.",
      "Station Echo is safe, and the crew is well.",
      "Our power ran low, so we went to sleep.",
      "We have been dreaming about the stars.",
      "If you can read this, please wake us up.",
      "Send a message back with the word \"ready.\"",
      "Then point your lights toward the ringed planet.",
      "We will see your lights and know you are friends.",
      "We have stories to tell and maps to share.",
      "We found a new moon with oceans of ice.",
      "We found a comet that glows bright green.",
      "Thank you for listening, Station Nova.",
      "Your teamwork brought our voices home.",
      "Message complete. Welcome to the crew, cadets!",
    ],
  },
  {
    key: "mars",
    title: "Mars Base Morning Report",
    blurb: "Real Mars facts, radioed in one line at a time.",
    legs: [
      "Good morning from Mars Base One.",
      "The sky here is a dusty orange color.",
      "Mars is the fourth planet from the Sun.",
      "A day on Mars is a little longer than a day on Earth.",
      "Mars has two small moons named Phobos and Deimos.",
      "The tallest volcano in the solar system is on Mars.",
      "It is called Olympus Mons.",
      "It is more than twice as tall as Mount Everest.",
      "Mars is very cold, much colder than Earth.",
      "The thin air here is mostly carbon dioxide.",
      "Astronauts would need special suits to breathe.",
      "Red dust covers almost everything we can see.",
      "Sometimes giant dust storms cover the whole planet.",
      "Scientists have found ice at the Martian poles.",
      "Robot rovers have explored Mars for many years.",
      "They take pictures and study rocks and soil.",
      "They found signs that water once flowed on Mars.",
      "Someday, people might visit Mars.",
      "The trip would take many months each way.",
      "Crews would need to bring food, water, and air.",
      "They would need to work together every day.",
      "Just like our class is doing right now.",
      "Mars Base One, signing off.",
      "Keep your eyes on the stars, cadets!",
    ],
  },
  {
    key: "creed",
    title: "The Cadet Creed",
    blurb: "The crew's promise, typed together.",
    legs: [
      "We are the cadets of the Relay Station.",
      "We keep our fingers on the home row.",
      "We keep our eyes on the screen.",
      "We sit up tall and breathe slow.",
      "When we make a mistake, we find the right key.",
      "We do not give up on a hard word.",
      "We cheer when a teammate finishes.",
      "We help a teammate who is stuck.",
      "We know that speed comes after care.",
      "We know that practice makes progress.",
      "Every letter matters.",
      "Every space matters.",
      "Every period matters.",
      "Every cadet matters.",
      "Our messages cross the whole galaxy.",
      "Planets far away are waiting to hear them.",
      "So we type with care and with pride.",
      "One line at a time, we get it right.",
      "One cadet at a time, we build a team.",
      "Together, we are stronger than one.",
      "Together, we are faster than one.",
      "Together, we bring every message home.",
      "This is the Cadet Creed.",
      "Relay complete, crew. Well done!",
    ],
  },
];

// Legs for any race source: a race message key, or any built-in reading code
// (its sentences become legs; Enter/Tab are flattened to single-line legs).
export function raceLegsFor(source) {
  const msg = RACE_MESSAGES.find((m) => m.key === source);
  if (msg) return { title: msg.title, legs: msg.legs };
  const lesson = getRelayStationLesson(source);
  if (!lesson || !lesson.text) return null;
  const legs = dictationChunks(lesson.text)
    .map(([a, b]) => lesson.text.slice(a, b).replace(/\t/g, "").replace(/\s*\n\s*/g, " ").trim())
    .filter((l) => l.length >= 3);
  return { title: lesson.title, legs };
}

for (const grade of [3, 4, 5]) {
  const code = `RS.${grade}.RACE`;
  LESSONS[code] = {
    code,
    isRace: true,
    isTrack: false,
    grade,
    subject: "ELAR",
    kind: "race",
    title: "Class Relay Race",
    standard: TEKS_KEYBOARDING[grade],
    goals: READING_GOALS[grade],
  };
}
