// Mission Map — "Chart the Moon's Pattern" — Grade 4 Science.
//
// Built Aug 31 (v1) as Mission Map's first Grade 4 case, alongside its first
// Grade 5 case (5-1-MM), per Emily's ask: prove the engine and its schema
// work at a different grade and a different TEKS strand, deliberately NOT
// another Organisms & Environments topic like 3-1-MM (food chains) — this
// one is Earth & Space.
//
// TEKS CHECKED FIRST, per the standing rule (ClearCenters_STATE.md §9 rule
// 11), against the real PDF (not the quick-reference index alone): **4.9B —
// Moon Patterns** — "Collect and analyze data to identify sequences and
// predict patterns in the observable appearance of the Moon from Earth."
// That wording is deliberately narrow: it's about noticing and predicting
// the OBSERVABLE PATTERN (the sequence of shapes over about a month), not
// explaining WHY the pattern happens (Sun-Earth-Moon geometry, reflected
// sunlight, orbital mechanics) — that causal-model content belongs to Grade
// 3's 3.9A instead, a different standard for a different grade. Every
// checkpoint here was deliberately kept inside that boundary: what the
// pattern looks like, how it repeats, and how to predict a missing or
// future part of it — never why it happens. This is the same discipline
// that 3-1-MM's real-TEKS audit established after that case was found to
// test content (pollination mechanics) that isn't in any real grade 3-5
// standard — checking scope BEFORE authoring this time, not after a live
// test caught it.
//
// All 6 checkpoints use the newly-completed grade-4/5 free-text reasoning
// box (MissionMapClient.js v8) instead of the tap-a-chip mechanic grade ≤3
// gets — this is the first case to actually exercise that branch, which
// previously existed in the schema/design doc as a "future case" note only.

export const PUBLIC_CASE = {
  standard: "4.1-MM",
  teksLabel:
    "TEKS 4.9B — Moon Patterns (Texas Grade 4 Science; checked against the real, current TEKS document Emily supplied — see ClearCenters_STATE.md §9 rule 11 — before any content was written, not after)",
  grade: 4,
  subject: "Science",
  title: "Chart the Moon's Pattern",
  tagline: "Camp Nightwatch's moon calendar got rained on — three nights are missing. Use the pattern to fill them in.",

  mission: {
    briefText:
      "The counselors at Camp Nightwatch keep a nightly moon-watching calendar so campers know how much moonlight there'll be for stargazing hikes. A rainstorm smudged three nights right in the middle of the calendar! Walk the observation trail, study real moon-watching data at each stop, and use the pattern you find to figure out what the missing nights should show — and what the Moon will look like after the calendar ends.",
    goal: "Identify the pattern in how the Moon's appearance changes over about a month, and use it to predict a missing or future night.",
  },

  // Background map art still pending from Emily — the client shows a themed
  // placeholder until this path has a real image, same convention as 3-1-MM.
  mapImage: "/mission-map/4-1-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 72 },
      prompt: "Stop 1: The calendar's first week is fine — but what pattern do you see so far?",
      evidence: {
        type: "data",
        label: "OBSERVATION LOG — NIGHTS 1, 4, 7",
        text: "Night 1: a thin curved sliver of light, like a fingernail. Night 4: a bigger curved sliver, almost half-lit. Night 7: exactly half of the Moon is lit.",
      },
      choices: [
        { id: "a", text: "The lit part of the Moon is getting bigger night after night" },
        { id: "b", text: "The lit part of the Moon is getting smaller night after night" },
        { id: "c", text: "The Moon disappears completely every few nights" },
        { id: "d", text: "There's no real pattern — it just changes randomly" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Nights 1-7: the Moon's lit shape kept getting bigger each time it was checked.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Stop 2: Night 11 was a full moon. What happens to the pattern after that?",
      evidence: {
        type: "data",
        label: "OBSERVATION LOG — NIGHTS 11, 15, 18",
        text: "Night 11: the whole Moon is lit up, round and bright. Night 15: a thin dark bite has appeared on one side. Night 18: about half of the Moon is lit again.",
      },
      choices: [
        { id: "a", text: "After the full Moon, the lit part starts shrinking back down, night after night" },
        { id: "b", text: "After the full Moon, the Moon stays completely full forever" },
        { id: "c", text: "After the full Moon, the Moon disappears immediately the next night" },
        { id: "d", text: "After the full Moon, a totally new pattern starts with no connection to before" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "After night 11's full Moon, the lit shape started shrinking back down each night instead of continuing to grow.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Stop 3: Two campers logged night 25, and they don't agree. Which report actually matches the pattern so far?",
      evidence: {
        type: "passage",
        label: "FIELD NOTE — CAMPER A",
        text: "\"Night 25: barely any Moon showing tonight — just a thin sliver, way smaller than night 18.\"",
      },
      secondEvidence: {
        type: "passage",
        label: "FIELD NOTE — CAMPER B",
        text: "\"Night 25: the Moon looked almost totally full again, way bigger than night 18.\"",
      },
      choices: [
        { id: "a", text: "Camper A's note — the lit part keeps shrinking after night 18, so night 25 should be even smaller" },
        { id: "b", text: "Camper B's note — the Moon should be getting bigger again by night 25" },
        { id: "c", text: "Both notes could be true at the same time" },
        { id: "d", text: "Neither note counts as real evidence" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Camper A's report held up: by night 25, the lit part had kept shrinking down to a thin sliver, continuing the pattern from night 18.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Stop 4: Nights 8, 9, and 10 got rained on and smudged. Use the pattern to figure out what they should show.",
      // Predict-then-reveal, same mechanic as 3-1-MM's caged-experiment gate
      // (MissionMapClient.js's needsPrediction branch — nothing per-case
      // needed beyond this field). Genuinely tests 4.9B's own core skill:
      // predicting an unobserved part of the pattern from the data around it.
      predictBeforeEvidence: {
        question: "Before you see the archive photos: based on the pattern so far, what should the smudged nights (8, 9, 10) show?",
        options: [
          { id: "still_growing", text: "The lit part should still be growing, somewhere between night 7's half-moon and night 11's full moon" },
          { id: "shrinking", text: "The lit part should already be shrinking back down" },
          { id: "gone", text: "The Moon should be completely invisible those nights" },
        ],
        correctOptionId: "still_growing",
      },
      evidence: {
        type: "data",
        label: "ARCHIVE PHOTOS — NEIGHBORING TOWN, SAME DATES",
        text: "A camp two towns over kept its own log on the same nights. Night 8: more than half lit. Night 9: even more lit. Night 10: almost completely full.",
      },
      choices: [
        { id: "a", text: "The smudged nights should show the Moon continuing to grow toward full, matching the archive photos" },
        { id: "b", text: "The smudged nights should show the Moon shrinking back down" },
        { id: "c", text: "The smudged nights should show no Moon at all" },
        { id: "d", text: "There's no way to figure out what the smudged nights looked like" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The neighboring town's archive photos confirm nights 8-10 kept growing toward full, matching the predicted pattern.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: How long does the whole pattern take before it starts over again?",
      evidence: {
        type: "data",
        label: "OBSERVATION LOG — THE FULL CALENDAR",
        text: "Night 1: thin sliver. Night 11: full Moon. Night 22: half-lit again. Night 29: the Moon is barely visible again, almost like night 1.",
      },
      choices: [
        { id: "a", text: "About a month (around 29-30 days) for the whole pattern to repeat" },
        { id: "b", text: "About one week" },
        { id: "c", text: "About a single day" },
        { id: "d", text: "About a year" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The whole pattern — from barely-visible back to barely-visible again — takes about 29-30 days, roughly a month.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: The camp's calendar ends on night 29. The counselors want to know what night 31 will look like for the next hike. What's your prediction?",
      evidence: {
        type: "passage",
        text: "Night 29 matched night 1's thin sliver almost exactly. That means the pattern is about to start over again from the beginning.",
      },
      choices: [
        { id: "a", text: "Night 31 should look like a slightly bigger sliver than night 29, since the Moon is starting to grow again" },
        { id: "b", text: "Night 31 should look exactly full, like night 11" },
        { id: "c", text: "Night 31 should be impossible to predict" },
        { id: "d", text: "Night 31 should look exactly the same as night 29, with no change" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Night 31 should continue the new cycle — a slightly bigger sliver than night 29, since the pattern is starting over.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain the pattern you found in the Moon's appearance — and use it to help the camp with what they missed. Your answer should: (1) describe the overall pattern in how the Moon's appearance changes over about a month (growing, then shrinking, then repeating), (2) use your evidence to explain what the smudged nights should have shown, and (3) predict what the Moon will look like two nights after the calendar's last night, and explain why.",

  responseStems: [
    "The Moon's appearance follows a pattern where it first ___ and then ___.",
    "I figured out the missing nights should show ___ because the data before and after showed ___.",
    "Two nights after the calendar ends, I predict the Moon will look ___ because ___.",
  ],

  selfCheckQuestions: [
    "I described how the Moon's appearance changes over about a month, not just on one night.",
    "I explained what evidence helped me figure out the missing calendar nights.",
    "I made a prediction about a future night, not just described nights that already happened.",
    "I used words like \"pattern,\" \"sequence,\" or \"repeats\" in my answer.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
