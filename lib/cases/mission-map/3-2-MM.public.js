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

export const PUBLIC_CASE = {
  standard: "3.2-MM",
  teksLabel:
    "TEKS 3.10A — Weather (Texas Grade 3 Science; checked against the real, current TEKS document before any content was written — see ClearCenters_STATE.md §9 rule 11)",
  grade: 3,
  subject: "Science",
  title: "Weather Station Lockdown",
  tagline: "Two camps, four miles apart, want to know: is today's weather really the same at both spots?",

  mission: {
    briefText:
      "Camp Windward runs two weather stations — one at Lake Camp, one at Ridge Camp, about four miles up the trail. Both camps are planning outdoor activities for this afternoon, and they need real tool readings, not guesses, to know whether the weather is actually the same at both spots right now. Walk the station log and compare the readings.",
    goal: "Use measured tool evidence — temperature, wind, and precipitation — to compare the weather at two locations at the same time.",
  },

  mapImage: "/mission-map/3-2-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 12, y: 70 },
      prompt: "Stop 1: Both stations logged their thermometers at 2:00 PM. What do the readings show?",
      evidence: {
        type: "data",
        label: "THERMOMETER LOG — 2:00 PM",
        text: "Lake Camp thermometer: 61°F. Ridge Camp thermometer: 54°F. Both were read at the same time, by two different counselors.",
      },
      choices: [
        { id: "a", text: "The two stations are showing different temperatures right now" },
        { id: "b", text: "One of the thermometers must be broken, since they're only four miles apart" },
        { id: "c", text: "The readings don't count unless they match" },
        { id: "d", text: "It's impossible to compare temperature without seeing both places in person" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "At 2:00 PM, Lake Camp read 61°F and Ridge Camp read 54°F — two real, different readings at the same time.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 28, y: 40 },
      prompt: "Stop 2: Now compare the wind readings from both stations.",
      evidence: {
        type: "data",
        label: "WIND LOG — 2:00 PM",
        text: "Lake Camp wind sock: pointing steadily east, barely moving. Ridge Camp wind sock: spinning and snapping, gusting from the west.",
      },
      choices: [
        { id: "a", text: "The wind is behaving very differently at the two stations right now" },
        { id: "b", text: "Wind direction doesn't matter if the temperature already told you they're different" },
        { id: "c", text: "The wind sock at Ridge Camp is probably broken because it's moving so much" },
        { id: "d", text: "Both stations must have calm wind since it's a nice day" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Lake Camp's wind was steady and light; Ridge Camp's was gusty and shifting — another real difference between the two spots.",
    },
    {
      id: "cp3",
      order: 3,
      type: "showdown",
      position: { x: 44, y: 64 },
      prompt: "Stop 3: Ridge Camp's counselor says it's raining there. A Lake Camp counselor isn't sure that's true. Which claim actually holds up as evidence?",
      evidenceA: {
        type: "data",
        label: "RIDGE CAMP RAIN GAUGE",
        text: "The rain gauge at Ridge Camp collected 0.4 inches of water in the last hour — a real, measured amount.",
        choiceLabel: "Trust the rain gauge reading",
      },
      evidenceB: {
        type: "passage",
        label: "LAKE CAMP COUNSELOR'S GUESS",
        text: "\"It's not raining here at Lake Camp, so it's probably not really raining at Ridge Camp either — we're not that far apart.\"",
        choiceLabel: "Trust the Lake Camp counselor's guess",
      },
      correctSide: "A",
      isTrap: true,
      evidenceLogEntry: "The rain gauge measured real precipitation at Ridge Camp — a guess based on Lake Camp's own weather doesn't override an actual measurement taken at the other station.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 60, y: 34 },
      prompt: "Stop 4: Both camps want to know — should today's afternoon hike happen at Ridge Camp?",
      evidence: {
        type: "passage",
        text: "Combine everything logged so far: Ridge Camp is cooler than Lake Camp, gustier, and it's actively raining there right now.",
      },
      choices: [
        { id: "a", text: "No — Ridge Camp's own readings (cooler, gusty, raining) point to postponing the hike there" },
        { id: "b", text: "Yes — if Lake Camp is fine, Ridge Camp should be fine too" },
        { id: "c", text: "It doesn't matter what the readings show, hikes should never be postponed" },
        { id: "d", text: "There isn't enough evidence from either station to decide anything" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Ridge Camp's own combined readings — cooler, gustier, and actively raining — are the evidence that matters for a decision about Ridge Camp.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 76, y: 58 },
      prompt: "Stop 5: A new camper says, \"Both stations have to show the exact same weather — they're only four miles apart!\" Is that claim correct?",
      evidence: {
        type: "passage",
        text: "Today's own log already shows two different temperatures, two different wind patterns, and rain at one station but not the other — all logged at the very same time.",
      },
      choices: [
        { id: "a", text: "No — today's own readings already prove nearby places can have different weather at the same time" },
        { id: "b", text: "Yes — distance is the only thing that matters for weather" },
        { id: "c", text: "The readings must have been taken at different times, not really at 2:00 PM" },
        { id: "d", text: "Only one of the two stations can be trusted" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Today's log itself is the proof: two nearby stations, same time, three different kinds of readings that didn't match.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 92, y: 30 },
      prompt: "Stop 6: Which weather update is actually ready to send back to both camps?",
      evidence: {
        type: "passage",
        text: "A real weather update should use what the tools actually recorded, not a feeling or a guess about what \"should\" be happening.",
      },
      choices: [
        { id: "a", text: "\"Right now, Lake Camp is warmer and drier than Ridge Camp, which is cooler, gustier, and rainy — based on today's thermometer, wind, and rain gauge readings.\"" },
        { id: "b", text: "\"It's probably about the same at both camps since they're close together.\"" },
        { id: "c", text: "\"Whichever camp feels nicer to the counselor writing the update is the accurate one.\"" },
        { id: "d", text: "\"There's no way to know without walking to both stations at once.\"" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A real weather update names all three measured categories — temperature, wind, and precipitation — and reports what each station actually recorded.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain how you know Lake Camp and Ridge Camp had different weather at the same time today. Your answer should: (1) use evidence from at least two of the three tools (thermometer, wind sock, rain gauge) to show the two stations were different, and (2) explain why two places can have different weather at the same time even when they're close together.",

  responseStems: [
    "I know the two camps had different weather because the ___ showed ___ at Lake Camp, but ___ at Ridge Camp.",
    "Even though the camps are only four miles apart, their weather was different because ___.",
    "A real weather update has to use ___ instead of a guess.",
  ],

  selfCheckQuestions: [
    "I used real tool readings (thermometer, wind, or rain gauge), not a guess about the weather.",
    "I compared the two stations at the same time, not two different days.",
    "I explained why nearby places can still have different weather.",
    "I used numbers or specific readings from the case file, not just \"it was different.\"",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
