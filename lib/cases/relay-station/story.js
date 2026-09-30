// ClearKeys story campaign: "The Hush" (Sept 29, 2026).
// Outline: claude/ClearKeys_Story_TheHush_Outline_v1.md in the CC project.
//
// One story for all of grades 3-5 (Emily's call): the narration starts at a
// grade 3 reading level and climbs toward grade 4 by the end.
//
// Each chapter has two parts:
//   narration     - S.A.M. tells what is happening. Read, not typed.
//   transmission  - the decoded message from the Kestrel. Typed.
//
// The signal is "broken": a track chapter's transmission may only use the
// keys taught at or before its level (checked by tools/clearkeys-story-check.cjs,
// same rule as the Foundations Track). "\n" = Enter, "\t" = Tab.
//
// Chapters 1-20 unlock by passing that Foundations Track level.
// Chapters 21-24 unlock by Daily Transmission days (unlockDays).

export const STORY_TITLE = "The Hush";

export const STORY_ACTS = [
  { id: 1, name: "Static", chapters: [1, 2, 3, 4] },
  { id: 2, name: "The Kestrel", chapters: [5, 6, 7, 8, 9, 10] },
  { id: 3, name: "Clear Signal", chapters: [11, 12, 13] },
  { id: 4, name: "The Hush Talks", chapters: [14, 15, 16] },
  { id: 5, name: "The Rescue", chapters: [17, 18, 19, 20] },
  { id: 6, name: "Home Song", chapters: [21, 22, 23, 24] },
];

export const STORY_CHAPTERS = [
  // ---------------- ACT 1: STATIC ----------------
  {
    n: 1, level: 1, title: "Seven Letters",
    narration: [
      "It is a quiet night at the relay station, and every screen is dark. Then a small light on the control panel starts to blink.",
      "\"A signal!\" says S.A.M. \"It is very weak, and only seven letters are coming through.\"",
      "The message is full of holes, but you can still type the pieces that come in. Let's decode it together.",
    ],
    transmission: "ask\nask\na sad lad\nask dad\nall fall\nask; ask; ask",
  },
  {
    n: 2, level: 2, title: "Not Just Noise",
    narration: [
      "The same pieces of the signal come in again, and then again.",
      "S.A.M. taps the screen and thinks. \"Static from space is messy. It never repeats itself like this.\"",
      "\"That means someone is really out there,\" S.A.M. says quietly. \"And I think they need our help.\"",
    ],
    transmission: "ask ask ask\nalas; alas\nall fall\na sad lass\na sad dad\nask; ask; ask",
  },
  {
    n: 3, level: 3, title: "A Voice",
    narration: [
      "You repaired two more keys, so now the letters E and I come through the static.",
      "The new words sound different from before. They sound like a kid who is trying to be brave.",
      "\"A sea?\" S.A.M. wonders. \"Out in space? Maybe they mean a sea of stars.\"",
    ],
    transmission: "i see\ni see\ni see a sea\ni sail\ni sail\nall sails dead\nask\nask",
  },
  {
    n: 4, level: 4, title: "Drifting",
    narration: [
      "S.A.M. pulls up a map of the sky. \"Some ships use giant sails that catch starlight,\" it explains.",
      "\"If those sails stop working, the ship can't steer anymore. It just drifts wherever space pushes it.\"",
      "The kid is still out there somewhere, and they are sliding farther away every minute.",
    ],
    transmission: "all sails dead\ni slide\ni slide\ni see skies\nlike a sea\nlike a dead sea\nask\nask\nask",
  },

  // ---------------- ACT 2: THE KESTREL ----------------
  {
    n: 5, level: 5, title: "Iris",
    narration: [
      "The letters R and U are working now. For the very first time, the kid types a name.",
      "\"Iris,\" S.A.M. reads carefully. \"Her name is Iris, and she sounds scared.\"",
      "Her ship has lost more than its sails. Something else important is broken too.",
    ],
    transmission: "iris\niris\ni fear\nrudder dead\nsails dead\ndark sea\ndark skies\ni slide far\nfar\nfar",
  },
  {
    n: 6, level: 6, title: "The Hush",
    narration: [
      "You learned four new keys, so now you can hear much more of Iris's message.",
      "Her ship is called the Kestrel. She also names the strange thing that is swallowing all the light.",
      "S.A.M. goes very still. \"The Hush,\" it says. \"I have heard old stories about the Hush.\"",
    ],
    transmission: "this is iris\nthe kestrel drifts\nthe lights\nthe lights die\nthe hush\nthe hush is here\nget us\nget us\nget us",
  },
  {
    n: 7, level: 7, title: "Gus and Ruth",
    narration: [
      "Iris is not alone out there. Two others are on the Kestrel with her.",
      "Gus is the ship's little repair robot. Ruth is the captain, and she is also Iris's grandmother.",
      "Iris wants you to meet them both. Even in the dark, she is still a little bit funny.",
    ],
    transmission: "gus is the kestrel gadget guy\ngus hides at his desk\ngus is sure the dark is after us\nruth rules the kestrel\nruth tells jests\nruth says her jests are great\ni say they are just sad\ni hug ruth\nruth hugs gus",
  },
  {
    n: 8, level: 8, title: "Low Light",
    narration: [
      "The letters O and W come through, and the messages start getting longer.",
      "The Kestrel is running out of power. The Hush has eaten their lights, and it has even eaten the stars outside their window.",
      "\"Hold on, Iris,\" you whisper. S.A.M. begins searching the sky for her ship.",
    ],
    transmission: "we are low\nlow air\nlow heat\nlow light\nthe hush ate our lights\nthe hush ate the stars\nwe float slow\nwe wait for you\nwe wait",
  },
  {
    n: 9, level: 9, title: "Too Quiet",
    narration: [
      "The letters Q and P are working now. Iris finally types the word she has been trying to say all along.",
      "Out in the Hush, even Gus has stopped making noise, and Gus is never quiet.",
      "S.A.M. turns the station's power all the way up. \"We hear you, Iris,\" it says. \"We are coming.\"",
    ],
    transmission: "it is quiet\ntoo quiet\ngus is quiet too\nwe hear it\nthe hush\nplease\nhelp us\nplease\nhelp us\nplease help",
  },
  {
    n: 10, level: 10, title: "Locked On",
    narration: [
      "S.A.M. finally finds the Kestrel on the map. It is a tiny dot at the edge of an enormous dark spot.",
      "\"Signal locked,\" S.A.M. announces proudly. Then its voice drops to a whisper.",
      "\"The dark spot is moving. The Hush is drifting straight toward the Kestrel.\"",
    ],
    transmission: "we see it\na huge dark spot\nit drifts too\nit drifts to us\ngus says it grows\nruth says stay put\ni say hurry\nhurry\nhurry",
  },

  // ---------------- ACT 3: CLEAR SIGNAL ----------------
  {
    n: 11, level: 11, title: "Almost a Song",
    narration: [
      "Five bottom-row keys come online at once, and Iris's words pour in faster than ever.",
      "The Hush is floating right beside the Kestrel now, and it is bigger than a moon.",
      "Then Iris notices something strange and wonderful. The Hush is making a sound.",
    ],
    transmission: "come quick\nwe cannot move\nthe hush is big\nbigger than a moon\nno stars\nno sound\nbut it hums\nno\nit is not a hum\nit is almost a song",
  },
  {
    n: 12, level: 12, title: "Real Sentences",
    narration: [
      "Commas and periods work now, so for the first time Iris can send complete sentences.",
      "S.A.M. reads the message twice. \"She sounds calmer,\" it says. \"I think talking to you is helping her.\"",
      "Even Captain Ruth has a joke ready. Unfortunately, it is not a very good joke.",
    ],
    transmission: "iris here. we can hear you now. the hush is next to the kestrel. it is huge and dark, and it hums. gus says it is a big cloud. ruth says it is a big cloud with good manners, because it has not eaten us yet.",
  },
  {
    n: 13, level: 13, title: "Every Letter",
    narration: [
      "Every letter on the keyboard works now, and the signal is finally crystal clear.",
      "Iris sends her first complete message. It contains a plan, and the plan depends on you.",
      "S.A.M. is already powering up the station's relay beam, just in case.",
    ],
    transmission: "iris here again. your signal is so clear now. ruth says thank you, and gus says thank you twice.\nhere is what we know. the hush swallows every sound. our radio only works when we type. so keep typing, cadet.\nruth has a plan. she wants your station to send a relay beam. it is a line of light we can follow out of the dark. tell us when it is ready.",
  },

  // ---------------- ACT 4: THE HUSH TALKS ----------------
  {
    n: 14, level: 14, title: "Listening",
    narration: [
      "Capital letters come through now, so every name gets its capital at last.",
      "Gus has noticed something about the Hush, but at first nobody believes him.",
      "S.A.M. looks closely at the signal. \"Gus might be right,\" it says slowly.",
    ],
    transmission: "This is Iris of the Kestrel. Captain Ruth is steering now, and Gus is back on his wheels.\nGus found something odd. When we type, the Hush gets quiet and still. When we stop, it hums again.\nGus thinks the Hush is listening to us. Captain Ruth thinks Gus needs a nap. I think Gus is right.",
  },
  {
    n: 15, level: 15, title: "Who's There?",
    narration: [
      "Two new keys arrive: the apostrophe and the question mark. Then something happens that nobody expected.",
      "A message appears on the Kestrel's screen. It did not come from Iris, and it did not come from your station.",
      "Somehow, the Hush has learned how to type.",
    ],
    transmission: "Cadet, something new just came across our screen. It wasn't from you. It wasn't from us.\nIt said one thing. Who's there?\nGus hid under his blanket again. Captain Ruth looked at me and asked, What do we say?\nI said, We say hi. So we did.\nCan you say hi too?",
  },
  {
    n: 16, level: 16, title: "Not a Monster",
    narration: [
      "You type hi to the Hush, and the entire station seems to hold its breath.",
      "The answer comes back small and slow, like someone whispering in a dark room.",
      "The Hush was never angry at anyone. It was feeling something else entirely.",
    ],
    transmission: "We typed, Hi. We are the Kestrel. Who are you?\nThe Hush wrote back. I am little. I am lost. I ate the loud things so I could hear better.\nCaptain Ruth's eyes got wet. She said, It's not a monster, Iris. It's a kid, just like you.\nGus came out from under his blanket. He typed, Hi, little one. Don't be scared.",
  },

  // ---------------- ACT 5: THE RESCUE ----------------
  {
    n: 17, level: 17, title: "Countdown",
    narration: [
      "The number keys from 1 through 5 are online, which means the rescue can finally begin.",
      "The relay beam needs several minutes to reach the Kestrel, and the ship is dangerously low on fuel.",
      "Gus insists on doing the official countdown. Of course he does.",
    ],
    transmission: "Fuel check. We have 3 tanks left, and 1 of them is almost empty.\nYour relay beam needs 5 minutes to reach us.\nGus is counting down. 5, 4, 3, 2, 1.\nNothing yet. Captain Ruth says to count again, but slower this time.\nThe Hush is humming along with Gus. It likes counting.",
  },
  {
    n: 18, level: 18, title: "The Beam",
    narration: [
      "All ten number keys are working now. Out in the darkness, a thin silver line of light appears.",
      "Your relay beam has reached the Kestrel, so Iris can finally send you their exact location.",
      "The Hush has important news too. It remembers where its family traveled.",
    ],
    transmission: "Your beam found us. We are in Sector 7, Row 19, Point 860.\nThe Hush says its family is past Point 900, near the edge of the dust.\nCaptain Ruth set our course. At our speed, the trip will take 26 hours.\nGus packed 40 snacks for the trip. Gus does not eat snacks. Gus is a robot.",
  },
  {
    n: 19, level: 19, title: "Captain Ruth's List",
    narration: [
      "The Tab key works now, so Captain Ruth can send her famous list.",
      "Captain Ruth makes a list for everything. She even has a list for brushing her teeth.",
      "This list is the most important one she has ever made.",
    ],
    transmission: "Captain Ruth's Rescue List\n1.\tFollow the relay beam.\n2.\tKeep typing so the Hush can hear us.\n3.\tTurn the sails toward the dust.\n4.\tLet Gus steer for 5 minutes.\n5.\tNo more jokes, Grandma.\nCaptain Ruth crossed off number 5. Then she told a joke.",
  },
  {
    n: 20, level: 20, title: "The Starwhale",
    narration: [
      "This is the final check. Every key you have learned is working at full power.",
      "The Kestrel reaches the edge of the dust cloud, and the Hush floats quietly beside it.",
      "Then the Hush begins to glow, and everyone finally sees what it really is.",
    ],
    transmission: "At the edge of the dust, the Hush began to glow. Then it opened two huge, gentle eyes.\nIt was not a cloud at all. It was a baby starwhale, as big as ten ships and as young as a puppy.\nFar away, a deep song rolled through space. The baby sang back.\nCaptain Ruth said, That's its mom.\nThe Hush was never trying to scare anyone. It was trying to hear her.\nThank you, Cadet. We could not have found our way without you.",
  },

  // ---------------- ACT 6: HOME SONG (Daily Transmission days) ----------------
  {
    n: 21, unlockDays: 3, title: "Following the Song",
    narration: [
      "You finished the whole track, but the story is not over yet.",
      "The Kestrel and the baby starwhale follow a song across the dust.",
      "Each morning message you type sends more power to the relay beam.",
    ],
    transmission: "Iris here, with a morning report. We slept in shifts last night. Gus took the first shift and Captain Ruth took the second. The baby starwhale never slept at all. It kept listening for the song.\nWe gave it a real name today. We call it Echo, because it always sings back.\nThe song is louder this morning. Echo swims ahead of the Kestrel, then circles back to make sure we are still following.",
  },
  {
    n: 22, unlockDays: 6, title: "Echo's Song",
    narration: [
      "The starwhale family is getting close, and Iris has a clever idea.",
      "If the Kestrel can send the song back to the family, the grown-up starwhales will know their baby is nearby.",
      "Gus turned the song into words. Your job is to type it so the relay beam can carry it.",
    ],
    transmission: "Here is the song, the way Gus heard it:\n\nLittle light in the long, dark sea,\nfollow the hum and come home to me.\nPast the dust and the silver rings,\nhere is the place where the whole pod sings.\n\nIris says Gus sings it very badly. Echo does not seem to mind.",
  },
  {
    n: 23, unlockDays: 9, title: "The Reunion",
    narration: [
      "The song worked! Out of the swirling dust, enormous shapes begin to glow.",
      "It is the starwhale family, and one of them is bigger and brighter than all the others.",
      "Iris is typing so quickly that even S.A.M. can barely keep up.",
    ],
    transmission: "They came! Six starwhales swam out of the dust, glowing blue and gold.\nThe biggest one sang one long, low note. Echo shot forward so fast that the Kestrel rocked.\nThey spun around each other, again and again. Captain Ruth said it looked like a hug.\nGus said nothing at all. He was busy leaking oil out of his eyes. He says that is just a robot thing.\nI think everyone on the Kestrel cried a little. Even me.",
  },
  {
    n: 24, unlockDays: 12, title: "Cadet Iris",
    narration: [
      "The Kestrel is finally traveling home. Its sails are repaired, and its lights are glowing again.",
      "But the story has one more surprise waiting at the very end.",
      "Echo did not swim away with its family. It followed the Kestrel all the way back to your station.",
    ],
    transmission: "Iris here, and this is my last message from the Kestrel.\nEcho decided to stay near your station. Its song makes the relay beam stronger, so now the station can hear ships from twice as far away.\nCaptain Ruth has some news too. She asked your station if I could train as a relay cadet. They said yes!\nSo I will see you soon, Cadet. Save me a seat by the keyboard.\nAnd please tell S.A.M. that Gus says hi.",
  },
];

export function getStoryChapter(n) {
  return STORY_CHAPTERS.find((c) => c.n === Number(n)) || null;
}

// Is chapter n open for this student? currentLevel = the track level they are
// ON (so levels below it are passed). dailyDays = total Daily Transmission days.
// Chapters 21-24 open after the track with EITHER enough Daily Transmission
// days OR enough Fluency levels passed (5 per chapter).
export function chapterUnlocked(chapter, { currentLevel = 1, trackComplete = false, dailyDays = 0, fluencyPassed = 0 } = {}) {
  if (!chapter) return false;
  if (chapter.level) return trackComplete || currentLevel > chapter.level;
  if (chapter.unlockDays) {
    const fluencyNeeded = (chapter.n - 20) * 5;
    return trackComplete && (dailyDays >= chapter.unlockDays || fluencyPassed >= fluencyNeeded);
  }
  return false;
}

export function unlockHint(chapter) {
  if (chapter.level) return `Pass Level ${chapter.level} to decode`;
  return `After the track: ${chapter.unlockDays} Daily days or ${(chapter.n - 20) * 5} Fluency levels`;
}

// Boss checkpoints (Sept 29, 2026): the last level of each track unit is a
// boss fight against a piece of the Hush. Keyed by track unit id.
export const BOSSES = {
  home: { name: "The Static Wall", line: "A wall of static is blocking Iris's signal. Type cleanly to break it down." },
  top: { name: "The Dark Drift", line: "A cloud of darkness is drifting between you and the Kestrel. Every correct key pushes it back." },
  bottom: { name: "The Hush Wave", line: "A wave of silence is rolling toward the station. Keep typing so Iris can still hear you." },
  shift: { name: "The Silence", line: "The Hush is trying to swallow every capital and question mark. Don't let it." },
  numbers: { name: "The Countdown Jam", line: "The Hush is scrambling the numbers. Type them exactly to keep the rescue on time." },
  layout: { name: "The Heart of the Hush", line: "This is the final check. Clear it and the relay beam reaches the Kestrel at full power." },
};
