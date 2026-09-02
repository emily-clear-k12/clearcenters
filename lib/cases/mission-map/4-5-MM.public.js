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

export const PUBLIC_CASE = {
  standard: "4.5-MM",
  teksLabel:
    "TEKS 4.10C — Weather vs. Climate (Texas Grade 4 Science; moved here from an unauthored Grade 5 library concept after checking the real Grade 5 PDF and finding no equivalent standard there — see header comment)",
  grade: 4,
  subject: "Science",
  title: "Weather Data Command Center",
  tagline: "A headline says the town's climate is heating up — based on one hot afternoon. Is that actually proof?",

  mission: {
    briefText:
      "The local news just ran a headline: \"Our Climate Is Heating Up!\" — right after one 95-degree afternoon. The town's data center needs someone to check the claim using real weather and climate data before it goes any further. Walk the command center's dashboards and figure out what the data actually supports.",
    goal: "Use data to tell the difference between short-term weather and long-term climate patterns, and evaluate a claim that mixes the two up.",
  },

  mapImage: "/mission-map/4-5-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Dashboard 1: The headline is based on one 95-degree afternoon. What time period does that actually cover?",
      evidence: {
        type: "data",
        label: "DASHBOARD 1 — THE HEADLINE'S SOURCE",
        text: "A single Tuesday afternoon reached 95°F, the hottest day of the month so far.",
      },
      choices: [
        { id: "a", text: "A single afternoon — a very short period of time" },
        { id: "b", text: "Thirty years of data" },
        { id: "c", text: "An entire season" },
        { id: "d", text: "The headline doesn't specify any time period at all" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The headline is based on a single afternoon — a very short time period.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Dashboard 2: Which piece of data actually describes weather, not climate?",
      evidence: {
        type: "data",
        label: "DASHBOARD 2 — TODAY'S FORECAST",
        text: "Tomorrow's forecast: sunny, high of 88°F, light wind — a short-term prediction for one specific day.",
      },
      choices: [
        { id: "a", text: "Tomorrow's forecast — it describes short-term conditions for one day" },
        { id: "b", text: "A 30-year average temperature chart" },
        { id: "c", text: "A chart of average yearly rainfall over the past two decades" },
        { id: "d", text: "None of these describe weather" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Tomorrow's forecast is weather — it describes short-term conditions for one specific day.",
    },
    {
      id: "cp3",
      order: 3,
      type: "showdown",
      position: { x: 42, y: 64 },
      prompt: "Dashboard 3: Which piece of evidence actually tells you something about the town's climate?",
      evidenceA: {
        type: "data",
        label: "ONE HOT AFTERNOON",
        text: "Last Tuesday reached 95°F — the single hottest afternoon so far this year.",
        choiceLabel: "This proves the climate is heating up",
      },
      evidenceB: {
        type: "data",
        label: "30-YEAR AVERAGE TEMPERATURE CHART",
        text: "The town's average summer temperature has stayed within one degree of the same number for the past 30 years.",
        choiceLabel: "This is real climate evidence",
      },
      correctSide: "B",
      isTrap: true,
      evidenceLogEntry: "One hot afternoon is weather, not climate evidence — the 30-year average chart is what actually shows a long-term pattern, and it hasn't meaningfully changed.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Dashboard 4: A forecaster predicts a rainy week ahead. A separate chart shows this region has been dry on average for the past 20 years. Which is which?",
      evidence: {
        type: "passage",
        text: "One dashboard predicts a week of rain. A different dashboard tracks two decades of yearly rainfall totals.",
      },
      choices: [
        { id: "a", text: "The rainy-week forecast is weather; the 20-year rainfall chart is climate" },
        { id: "b", text: "Both dashboards describe the exact same thing" },
        { id: "c", text: "The rainy-week forecast is climate; the 20-year chart is weather" },
        { id: "d", text: "Neither dashboard is real data" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A one-week rain forecast is weather; a 20-year rainfall chart describing the region's usual pattern is climate.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Dashboard 5: Does yesterday's single hot day count as proof the region's climate has changed?",
      evidence: {
        type: "passage",
        text: "The 30-year average chart from Dashboard 3 already showed the region's typical summer temperature hasn't meaningfully shifted.",
      },
      choices: [
        { id: "a", text: "No — one hot day is a weather event, not evidence of a long-term climate change" },
        { id: "b", text: "Yes — any hot day proves the climate is changing" },
        { id: "c", text: "It depends on how hot the day felt" },
        { id: "d", text: "Weather and climate are the same thing, so it counts either way" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "One hot day is a weather event — it doesn't override what the long-term climate data actually shows.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Dashboard 6: How should the news headline actually be corrected?",
      evidence: {
        type: "passage",
        text: "Weather describes short-term conditions. Climate describes patterns over a long period of time.",
      },
      choices: [
        { id: "a", text: "\"One Hot Afternoon — Not Proof of Climate Change, Says 30-Year Data\"" },
        { id: "b", text: "\"Our Climate Is Heating Up!\" (keep the original headline)" },
        { id: "c", text: "\"Weather and Climate Are Exactly the Same Thing\"" },
        { id: "d", text: "\"Nobody Can Ever Know Anything About Climate\"" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A corrected headline should reflect what the data actually shows: one hot afternoon is weather, and it isn't proof of a climate change.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain the difference between weather and climate, and evaluate the news headline. Your answer should: (1) define weather and climate in your own words using evidence from the case file, and (2) explain specifically why one hot afternoon isn't proof that the town's climate is changing.",

  responseStems: [
    "Weather describes ___, while climate describes ___.",
    "The news headline was misleading because ___.",
    "The 30-year chart is stronger evidence than one hot day because ___.",
  ],

  selfCheckQuestions: [
    "I explained the difference between weather and climate, not just defined one of them.",
    "I explained specifically why one hot day isn't climate evidence.",
    "I used real data from the case file, like the 30-year chart.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
