// Mission Map — "Weather Station Lockdown" — Grade 3 Science.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF (not just the quick-reference index), per the standing rule
// (ClearCenters_STATE.md §9 rule 11): **3.10A — Weather.** "Compare and
// describe day-to-day weather in different LOCATIONS at the SAME TIME,
// including air temperature, wind direction, and precipitation." That is a
// SPATIAL comparison (two places right now), not a temporal one (today vs.
// yesterday) — the library's original framing ("compare two days of data")
// tests a different skill than the real standard names. Re-anchored the
// mission to compare two weather stations at the same time instead, which
// keeps every gate's tool-reading content but fixes what the comparison is
// actually about. This is the same kind of scope check that caught 3.1-MM's
// pollination mismatch — caught this time before any content was written,
// not after a live test.
//
// Uses the new "showdown" checkpoint type (MissionMapClient.js, built Sept 2
// alongside the S.A.M./streak pass) at cp3 — a measured rain-gauge reading
// competes against an unmeasured "it's not raining here so it probably
// isn't there either" assumption. This is the clearest natural fit for
// showdown in the whole Science batch: the real trap in this content is
// exactly "which claim is actually evidence," which showdown makes literal.

// Sept 23, 2026 — reading-level pass (open decision 26). Student-facing text was
// rewritten to fit its grade band, measured with tools/mission-map-gradecheck.cjs.
// Sentences were shortened and split. Standards vocabulary was kept. Answer keys,
// checkpoint order, and the server case are unchanged.

export const PUBLIC_CASE = {
  standard: "3.2-MM",
  teksLabel:
    "TEKS 3.10A — Weather (Texas Grade 3 Science; checked against the real, current TEKS document before any content was written — see ClearCenters_STATE.md §9 rule 11)",
  grade: 3,
  subject: "Science",
  title: "Weather Station Lockdown",
  tagline: "Two camps are four miles apart. Is the weather the same at both?",

  mission: {
    briefText:
      "Camp Windward has two weather stations. One is at Lake Camp. The other is at Ridge Camp, four miles up the trail. Both camps have plans outside this afternoon. They need real tool readings, not guesses. Read the station log and compare the two camps.",
    goal: "Use tool readings to compare the weather at two places at the same time. Look at temperature, wind, and rain.",
  },

  mapImage: "/mission-map/3-2-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 12, y: 70 },
      prompt: "Stop 1: Both camps read their thermometers at 2:00 PM. What do the readings show?",
      evidence: {
        type: "data",
        label: "THERMOMETER LOG — 2:00 PM",
        text: "Lake Camp thermometer: 61°F. Ridge Camp thermometer: 54°F. Two counselors read them at the same time.",
      },
      choices: [
        { id: "a", text: "One thermometer must be broken, since the camps are close" },
        { id: "b", text: "The readings don't count unless they match" },
        { id: "c", text: "You can't compare temperature without going to both places" },
        { id: "d", text: "The two camps have different temperatures right now" },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "At 2:00 PM, Lake Camp was 61°F. Ridge Camp was 54°F. The readings were different.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 28, y: 40 },
      prompt: "Stop 2: Now compare the wind at both camps.",
      evidence: {
        type: "data",
        label: "WIND LOG — 2:00 PM",
        text: "Lake Camp wind sock: pointing east and barely moving. Ridge Camp wind sock: spinning and snapping in gusts from the west.",
      },
      choices: [
        { id: "a", text: "The wind is very different at the two camps right now" },
        { id: "b", text: "Wind doesn't matter, since the temperature already showed a difference" },
        { id: "c", text: "The Ridge Camp wind sock must be broken because it moves so much" },
        { id: "d", text: "Both camps must have calm wind since it's a nice day" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Lake Camp's wind was light and steady. Ridge Camp's wind was gusty. That is another difference.",
    },
    {
      id: "cp3",
      order: 3,
      type: "showdown",
      position: { x: 44, y: 64 },
      prompt: "Stop 3: A Ridge Camp counselor says it is raining there. A Lake Camp counselor doesn't believe it. Which one holds up as evidence?",
      evidenceA: {
        type: "data",
        label: "RIDGE CAMP RAIN GAUGE",
        text: "The Ridge Camp rain gauge caught 0.4 inches of water in the last hour. That is a real measurement.",
        choiceLabel: "Trust the rain gauge reading",
      },
      evidenceB: {
        type: "passage",
        label: "LAKE CAMP COUNSELOR'S GUESS",
        text: "\"It's not raining here at Lake Camp. So it's probably not raining at Ridge Camp either. We're close.\"",
        choiceLabel: "Trust the Lake Camp counselor's guess",
      },
      correctSide: "A",
      evidenceLogEntry: "The rain gauge measured real rain at Ridge Camp. A guess from Lake Camp can't beat a real reading.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 60, y: 34 },
      prompt: "Stop 4: Should the afternoon hike happen at Ridge Camp?",
      evidence: {
        type: "passage",
        text: "Put the readings together. Ridge Camp is cooler than Lake Camp. It is gustier. It is raining there right now.",
      },
      choices: [
        { id: "a", text: "Yes — if Lake Camp is fine, Ridge Camp should be fine too" },
        { id: "b", text: "No. Ridge Camp is cooler, gusty, and rainy, so the hike should wait." },
        { id: "c", text: "Hikes should never be moved, no matter what the readings show" },
        { id: "d", text: "There isn't enough evidence to decide" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Ridge Camp is cooler, gusty, and rainy. Those readings decide the hike at Ridge Camp.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 76, y: 58 },
      prompt: "Stop 5: A new camper says, \"The camps are only four miles apart. The weather has to be the same!\" Is that right?",
      evidence: {
        type: "passage",
        text: "Today's log shows two temperatures and two kinds of wind. It shows rain at one camp but not the other. All of it was read at the same time.",
      },
      choices: [
        { id: "a", text: "Yes. Distance is the only thing that matters for weather." },
        { id: "b", text: "No. Today's readings show close places can have different weather." },
        { id: "c", text: "The readings must have been taken at different times" },
        { id: "d", text: "Only one of the two stations can be trusted" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Today's log is the proof. Two close camps had different readings at the same time.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 92, y: 30 },
      prompt: "Stop 6: Which weather update is ready to send to both camps?",
      evidence: {
        type: "passage",
        text: "A good update uses what the tools measured. It does not use a feeling or a guess.",
      },
      choices: [
        { id: "a", text: "\"It's probably the same at both camps, since they're close.\"" },
        { id: "b", text: "\"The camp that feels nicer to me is the right one.\"" },
        { id: "c", text: "\"We can't know without walking to both camps at once.\"" },
        { id: "d", text: "\"Lake Camp is warmer and dry. Ridge Camp is cooler, gusty, and rainy. The thermometer, wind sock, and rain gauge show it.\"" },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "A good update uses all three tools. It tells what each camp really measured.",
    },
  ],

  finalResponsePrompt:
    "Explain how you know the two camps had different weather at the same time. Your answer should: (1) use at least two tools to show the camps were different, and (2) explain why places close together can have different weather.",

  responseStems: [
    "The ___ showed ___ at Lake Camp, but ___ at Ridge Camp.",
    "The camps are close, but their weather was different because ___.",
    "A real weather update has to use ___ instead of a guess.",
  ],

  selfCheckQuestions: [
    "I used real tool readings, not a guess.",
    "I compared the two camps at the same time.",
    "I explained why places close together can have different weather.",
    "I used numbers or readings from the case file.",
    "I read my answer back, and it makes sense.",
  ],
};
