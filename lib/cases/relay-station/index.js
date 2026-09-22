// Relay Station (typing center) — lesson registry. Added Sept 22, 2026.
// Design doc: claude/RelayStation_Digital_Design_v1.md in the Claude project.
//
// Unlike every other engine there is NO public/server split here: the text a
// student types IS the answer, so there is nothing to hide from the client.
// This one file is imported by both app/activity/[assignmentId]/page.js and
// app/api/relay-station/submit/route.js.
//
// Text rules (checked by the build-time validation script, see STATE):
//   - plain ASCII only (no smart quotes / em dashes — a student can't type them)
//   - "\n" = the student presses Enter, "\t" = the student presses Tab
//   - key lessons may only use the keys taught so far (see KEY_SETS)
//
// Codes follow the SS./MA./ELA. prefix convention: RS.<grade>.<lessonId>.
// Key lessons (K01-K05) are registered once per grade 3-5 with the SAME text;
// the grade only changes the star goals (TEKS 126.8/126.9/126.10 (c)(12)(C):
// grade 3 "with accuracy", grade 4 "with speed and accuracy", grade 5
// "with increasing speed and accuracy").

// Placeholder goals — tune from real classroom data (design doc §5).
const CONTENT_GOALS = {
  3: { accuracy: 90, wpm: 8 },
  4: { accuracy: 90, wpm: 12 },
  5: { accuracy: 92, wpm: 15 },
};
const KEY_DRILL_GOALS = {
  3: { accuracy: 90, wpm: 5 },
  4: { accuracy: 90, wpm: 8 },
  5: { accuracy: 92, wpm: 10 },
};

const TEKS_KEYBOARDING = {
  3: "Tech Apps 3.12C — touch keyboarding with accuracy",
  4: "Tech Apps 4.12C — touch keyboarding with speed and accuracy",
  5: "Tech Apps 5.12C — touch keyboarding with increasing speed and accuracy",
};

// Keys each key lesson is allowed to use (cumulative).
export const KEY_SETS = {
  K01: "asdfjkl; \n",
  K02: "asdfjkl; \n",
  K03: "asdfjkl; \nei",
  K04: "asdfjkl; \neiru",
  K05: "asdfjkl; \neirutgyh",
};

const KEY_LESSONS = [
  {
    id: "K01",
    title: "Home Row Home Base",
    kind: "keys",
    intro: "Every transmission starts at home base. Put your left fingers on A S D F and your right fingers on J K L ; — feel the bumps on F and J? Those are your anchors. Thumbs rest on the space bar.",
    newKeys: ["a", "s", "d", "f", "j", "k", "l", ";"],
    text: "asdf jkl;\nasdf jkl;\naaa sss ddd fff\njjj kkk lll ;;;\nfj dk sl a;\nfj dk sl a;\nasdf jkl; asdf jkl;",
  },
  {
    id: "K02",
    title: "Home Row Words",
    kind: "keys",
    intro: "Real words, home row only. Keep your fingers resting on home base and only move the finger that needs to press a key.",
    newKeys: [],
    text: "as ad all\nsad lad dad\nask fall flask\na sad lad; a lass\nadd salad; ask dad\nall lads fall; alas",
  },
  {
    id: "K03",
    title: "Reach Up: E and I",
    kind: "keys",
    intro: "New keys! Your left middle finger reaches up from D to E. Your right middle finger reaches up from K to I. Reach, press, and slide back home.",
    newKeys: ["e", "i"],
    text: "ded kik ded kik\nfed lid led\nlike side idea\nfile silk desk\na kid slides\nsis likes a salad; dad feels ill",
  },
  {
    id: "K04",
    title: "Reach Up: R and U",
    kind: "keys",
    intro: "Your pointer fingers reach up now. Left pointer goes from F up to R. Right pointer goes from J up to U. Always come back home after each reach.",
    newKeys: ["r", "u"],
    text: "frf juj frf juj\nfur rude sure\nrule red ride\nfluid use free\na red sled rides far\nuse fair rules; dad is sure",
  },
  {
    id: "K05",
    title: "Pointer Reach: T, G, Y, H",
    kind: "keys",
    intro: "Your pointer fingers cover two columns each. Left pointer: F, G, R, T. Right pointer: J, H, U, Y. Stretch sideways, then come back home.",
    newKeys: ["t", "g", "y", "h"],
    text: "ftf jyj fgf jhj\nthe gift high\nyes the fish\nthat light is high\ntry the huge dish\na gray tiger sits here",
  },
];

// Grade 3 content lessons. All original text, AI-drafted, Emily is author of
// record — review before treating as final.
const GRADE3_CONTENT = [
  {
    code: "RS.3.S01",
    title: "Science Words: Properties of Matter",
    kind: "vocabulary",
    subject: "Science",
    standard: "Science 3.6A (vocabulary) · Tech Apps 3.12C",
    intro: "Relay these science words exactly. Watch for capital letters — Celsius and Fahrenheit are named after real scientists, so they start with a capital.",
    // Word list = the vocabulary Emily already approved for 3.6A in
    // FrequencyRush_Unit1_Sample_Content_v1.md.
    text: "mass sink float\nmagnetism temperature\nCelsius Fahrenheit\nphysical property\nmass magnetism temperature\nsink float Celsius Fahrenheit",
  },
  {
    code: "RS.3.C01",
    title: "Conversation: Ready for Landing",
    kind: "conversation",
    subject: "ELAR",
    standard: "ELAR 3.11D (punctuation, capitalization) · Tech Apps 3.12C",
    intro: "This transmission is a conversation. Each line starts with the speaker's name and a colon. Press Enter at the end of each line so the next speaker gets their own line.",
    text: "Cadet: S.A.M., are you awake?\nS.A.M.: I am always awake. I am a robot.\nCadet: Can you help me check the map?\nS.A.M.: Yes! Our ship is near the red planet.\nCadet: Great. Let's land and explore.\nS.A.M.: I will pack the rover, the snacks, and the flag.",
  },
  {
    code: "RS.3.P01",
    title: "Paragraph: How Scientists Describe Matter",
    kind: "paragraph",
    subject: "Science",
    standard: "Science 3.6A · Tech Apps 3.12C",
    intro: "A full paragraph this time. Read each sentence as you type it — this is real science you need to know.",
    text: "Scientists describe matter by its properties. You can use a balance to measure mass. You can use a thermometer to measure temperature in degrees Celsius or Fahrenheit. A magnet can show if an object is magnetic. You can also put an object in water to see if it will sink or float.",
  },
  {
    code: "RS.3.L01",
    title: "Friendly Letter: Thank You for the Telescope",
    kind: "letter",
    subject: "ELAR",
    standard: "ELAR 3.12D (compose correspondence) · Tech Apps 3.12C",
    intro: "A friendly letter has five parts, and every part has its own place. Press Enter to leave blank lines between parts, and press Tab to indent each new paragraph. When you finish, the parts will light up.",
    // Letter parts, in order. The engine joins these into one text and uses
    // the labels for the post-finish "label reveal".
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
];

const LESSONS = {};

for (const grade of [3, 4, 5]) {
  KEY_LESSONS.forEach((l) => {
    const code = `RS.${grade}.${l.id}`;
    LESSONS[code] = {
      code,
      lessonId: l.id,
      grade,
      subject: "ELAR",
      kind: l.kind,
      title: l.title,
      intro: l.intro,
      newKeys: l.newKeys,
      standard: TEKS_KEYBOARDING[grade],
      text: l.text,
      segments: null,
      goals: KEY_DRILL_GOALS[grade],
    };
  });
}

GRADE3_CONTENT.forEach((l) => {
  const segments = l.segments || null;
  LESSONS[l.code] = {
    code: l.code,
    lessonId: l.code.split(".")[2],
    grade: 3,
    subject: l.subject,
    kind: l.kind,
    title: l.title,
    intro: l.intro,
    newKeys: [],
    standard: l.standard,
    text: segments ? segments.map((s) => s.text).join("") : l.text,
    segments,
    goals: CONTENT_GOALS[3],
  };
});

export function getRelayStationLesson(code) {
  return LESSONS[code] || null;
}

export function listRelayStationLessons() {
  return Object.values(LESSONS);
}

// Shared star rule so the client's instant result and the server's stored
// result can never disagree. 1 = finished, 2 = accuracy goal, 3 = both goals.
export function computeStars(goals, wpm, accuracy) {
  if (!goals) return 1;
  if (accuracy < goals.accuracy) return 1;
  if (wpm < goals.wpm) return 2;
  return 3;
}
