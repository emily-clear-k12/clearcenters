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
    text: "People earn money by working at a job. They can use their money in four ways. They can spend it on things they need or want. They can save it to use later. They can donate it to help others. Many people make a budget, which is a plan for how to earn, spend, save, and donate their money.",
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
        text: "\tMy class is studying the night sky, and we would like to visit your planetarium. Could you please send us information about your field trips? We would like to know what days you are open, how long a show lasts, and how many students can come at one time.\n\tThank you for your help.\n\n",
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
        text: "\tI am a fifth grader at Oak Hill Elementary, and our class is building a model of the solar system for the Lone Star Science Fair. I read that the Gulf Coast Astronomy Club lends telescopes to schools.\n\tCould you tell me how a school can borrow one, how long we could keep it, and whether a club member could show us how to use it? I would be grateful for any information you can share.\n\n",
      },
      { label: "Closing", text: "Sincerely,\n" },
      { label: "Signature", text: "Amara Okafor" },
    ],
  },
];

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
