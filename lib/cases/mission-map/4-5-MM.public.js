// Mission Map — "Weather Data Command Center" — Grade 4 Science.
//
// From the library's ORIGINAL Grade 5 Science concept "Science 5.4." TEKS
// CHECKED FIRST against the real PDFs, per the standing rule
// (ClearCenters_STATE.md §9 rule 11): the weather-vs-climate distinction
// this concept tests is **exclusively a Grade 4 standard — 4.10C,
// "Differentiate between weather and climate."** The real Grade 5 Science
// PDF has no equivalent standard at all (5.10A covers the water cycle,
// Sun, and ocean's effect on weather, but never climate as a distinct
// long-term pattern). Rather than author this as Grade 5 content that
// doesn't map to any real Grade 5 standard, it's been MOVED into the Grade
// 4 batch and re-numbered 4.5-MM — the same kind of scope check that
// caught 3.1-MM's pollination mismatch and 3.4-MM's habitat-needs mismatch,
// just caught by grade level this time instead of by subject content.
//
// Uses the new "showdown" checkpoint type at cp3 — the library's own
// central trap (one hot day vs. a long-term average) is naturally a
// two-sided "which one is climate evidence" call, which showdown makes
// literal instead of hiding inside a 4-option list.

// Sept 23, 2026 — reading-level pass (open decision 26). Student-facing text was
// rewritten to fit its grade band, measured with tools/mission-map-gradecheck.cjs.
// Sentences were shortened and split. Standards vocabulary was kept. Answer keys,
// checkpoint order, and the server case are unchanged.

export const PUBLIC_CASE = {
  standard: "4.5-MM",
  teksLabel:
    "TEKS 4.10C — Weather vs. Climate (Texas Grade 4 Science; moved here from an unauthored Grade 5 library concept after checking the real Grade 5 PDF and finding no equivalent standard there — see header comment)",
  grade: 4,
  subject: "Science",
  title: "Weather Data Command Center",
  tagline: "A headline says the town's climate is heating up. The proof is one hot afternoon. Is that enough?",

  mission: {
    briefText:
      "The local news ran a headline: \"Our Climate Is Heating Up!\" It came right after one 95-degree afternoon. The town's data center needs someone to check the claim with real weather and climate data. Walk the dashboards and find out what the data really shows.",
    goal: "Use data to tell short-term weather from long-term climate. Then judge a claim that mixes them up.",
  },

  mapImage: "/mission-map/4-5-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Dashboard 1: The headline is based on one 95-degree afternoon. How much time does that cover?",
      evidence: {
        type: "data",
        label: "DASHBOARD 1 — THE HEADLINE'S SOURCE",
        text: "One Tuesday afternoon reached 95°F. It was the hottest day of the month so far.",
      },
      choices: [
        { id: "a", text: "Thirty years of data" },
        { id: "b", text: "An entire season" },
        { id: "c", text: "The headline doesn't specify any time period at all" },
        { id: "d", text: "One afternoon — a very short time" },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "The headline is based on one afternoon. That is a very short time.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Dashboard 2: Which data describes weather, not climate?",
      evidence: {
        type: "data",
        label: "DASHBOARD 2 — TODAY'S FORECAST",
        text: "Tomorrow's forecast: sunny, high of 88°F, light wind. It is a prediction for one day.",
      },
      choices: [
        { id: "a", text: "Tomorrow's forecast. It describes the conditions for one day." },
        { id: "b", text: "A 30-year average temperature chart" },
        { id: "c", text: "A chart of yearly rainfall over the past twenty years" },
        { id: "d", text: "None of these describe weather" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Tomorrow's forecast is weather. It describes one day.",
    },
    {
      id: "cp3",
      order: 3,
      type: "showdown",
      position: { x: 42, y: 64 },
      prompt: "Dashboard 3: Which clue tells you something about the town's climate?",
      evidenceA: {
        type: "data",
        label: "ONE HOT AFTERNOON",
        text: "Last Tuesday reached 95°F. It was the hottest afternoon so far this year.",
        choiceLabel: "This proves the climate is heating up",
      },
      evidenceB: {
        type: "data",
        label: "30-YEAR AVERAGE TEMPERATURE CHART",
        text: "For 30 years, the town's average summer temperature has stayed within one degree of the same number.",
        choiceLabel: "This is real climate evidence",
      },
      correctSide: "B",
      evidenceLogEntry: "One hot afternoon is weather. The 30-year chart shows the long-term pattern, and it has barely changed.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Dashboard 4: A forecaster predicts a rainy week. Another chart shows this area has been dry for 20 years. Which is which?",
      evidence: {
        type: "passage",
        text: "One dashboard predicts a week of rain. Another shows twenty years of yearly rainfall.",
      },
      choices: [
        { id: "a", text: "Both dashboards describe the same thing" },
        { id: "b", text: "The rainy week is climate. The 20-year chart is weather." },
        { id: "c", text: "Neither dashboard is real data" },
        { id: "d", text: "The rainy week is weather. The 20-year chart is climate." },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "A one-week rain forecast is weather. A 20-year rainfall chart shows the usual pattern, so it is climate.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Dashboard 5: Is yesterday's hot day proof that the area's climate has changed?",
      evidence: {
        type: "passage",
        text: "The 30-year chart from Dashboard 3 showed the usual summer temperature has barely changed.",
      },
      choices: [
        { id: "a", text: "No. One hot day is weather, not proof of a long-term climate change." },
        { id: "b", text: "Yes. Any hot day proves the climate is changing." },
        { id: "c", text: "It depends on how hot the day felt" },
        { id: "d", text: "Weather and climate are the same, so it counts either way" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "One hot day is weather. It can't outweigh what the long-term climate data shows.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Dashboard 6: How should the news headline be fixed?",
      evidence: {
        type: "passage",
        text: "Weather is what happens over a short time. Climate is the pattern over many years.",
      },
      choices: [
        { id: "a", text: "\"Our Climate Is Heating Up!\" (keep the original headline)" },
        { id: "b", text: "\"One Hot Afternoon — Not Proof of Climate Change, Says 30-Year Data\"" },
        { id: "c", text: "\"Weather and Climate Are Exactly the Same Thing\"" },
        { id: "d", text: "\"Nobody Can Ever Know Anything About Climate\"" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "A fixed headline matches the data. One hot afternoon is weather, not proof of climate change.",
    },
  ],

  finalResponsePrompt:
    "Explain the difference between weather and climate, and judge the news headline. Your answer should: (1) define weather and climate in your own words using evidence from the case file, and (2) explain why one hot afternoon is not proof that the town's climate is changing.",

  responseStems: [
    "Weather describes ___, while climate describes ___.",
    "The news headline was misleading because ___.",
    "The 30-year chart is stronger evidence than one hot day because ___.",
  ],

  selfCheckQuestions: [
    "I explained how weather and climate are different.",
    "I explained why one hot day is not climate evidence.",
    "I used real data from the case file, like the 30-year chart.",
    "I read my answer back, and it makes sense to someone who wasn't there.",
  ],
};
