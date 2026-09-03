import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { callClaude, extractJSON } from "../../../../lib/anthropic";
import { getSimulationLabServerCase } from "../../../../lib/cases/simulation-lab/index.server";
import { getSimulationLabPublicCase } from "../../../../lib/cases/simulation-lab/index.public";

// Simulation Lab's checkpoints are single-attempt (unlike Mission Map's
// two-attempt hint-then-retry checkpoints) — they're quick understanding
// checks dropped into an experiment loop, not a "walk the path" adventure,
// so there's no lockedInWrong/firstTryCorrect distinction to track here.
// Same "no shame" rule as every other engine still applies: a miss is
// recorded for the teacher but never blocks the mission or shows a red mark.
//
// v3 update (see SimulationLab_Digital_Design_v1.md §10): the case now
// has two rounds (each with its own lookup table + trial log), a
// pre-trial hypothesis checkpoint, a dropdown-format Checkpoint 2, and a
// redesigned Data Table step that grades a predicted UNTESTED value
// against the case's real lookup table instead of the student's own
// visible trial log. The public case is imported alongside the server
// case here because the lookup tables live there (they're the case's
// "physics," not a secret — see the comment atop 3-8B-SL.public.js) and
// the data-table grading needs them.

function normalizeAnswer(text) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[.!?,;:]/g, "");
}

// Checkpoints keyed "mc"/"dropdown" are graded the same way (a single
// submitted choice id against a single correct choice id) — the format
// only changes how the question is presented client-side (buttons vs. a
// <select>), not how it's scored. "multiSelect" checks an exact set
// match. "fillBlank" stays for any future case that wants free text,
// checked with a forgiving substring match against an accepted-answers
// list, since elementary students phrase the same correct idea many
// different ways.
function scoreCheckpoints(serverCase, submittedResults) {
  if (!serverCase || !serverCase.checkpoints) return { results: [], correctCount: 0, total: 0 };
  const byId = {};
  (submittedResults || []).forEach((r) => { byId[r.id] = r; });

  const results = serverCase.checkpoints.map((cp) => {
    const submitted = byId[cp.id] || {};
    let correct = false;
    if (cp.type === "mc" || cp.type === "dropdown") {
      correct = submitted.submittedChoiceId === cp.correctChoiceId;
    } else if (cp.type === "multiSelect") {
      const submittedSet = new Set(submitted.submittedChoiceIds || []);
      const correctSet = new Set(cp.correctChoiceIds || []);
      correct =
        submittedSet.size === correctSet.size &&
        [...correctSet].every((id) => submittedSet.has(id));
    } else if (cp.type === "fillBlank") {
      const normalized = normalizeAnswer(submitted.submittedText);
      correct = (cp.acceptedAnswers || []).some(
        (a) => normalized.includes(normalizeAnswer(a))
      );
    }
    return { id: cp.id, type: cp.type, correct };
  });

  const correctCount = results.filter((r) => r.correct).length;
  return { results, correctCount, total: results.length };
}

// The Data Table step (v3) asks the student to predict an UNTESTED
// value — an angle (or whatever the case's variable is) they never
// actually tried in the target round — by extrapolating the pattern in
// their own data. Graded server-side against that round's real lookup
// table (re-derived from the public case here, never trusted from the
// client), with a small tolerance since this is a prediction, not a
// lookup. Also re-verifies the picked setting really was untested
// against the student's own submitted trial log for that round, so a
// student can't get credit for "predicting" a value they already saw run
// on screen. See design doc §10.2 (point 2) and §10.5.
function scoreDataTable(publicCase, roundTrialLogs, dataTableResults) {
  if (!publicCase || !publicCase.dataTableStep || !dataTableResults || dataTableResults.length === 0) {
    return { results: [], correctCount: 0, total: 0 };
  }
  const step = publicCase.dataTableStep;
  const targetRound = publicCase[step.targetRound]; // e.g. publicCase.roundTwo
  const tolerance = typeof step.tolerance === "number" ? step.tolerance : 0;
  const variableId = (publicCase.variables && publicCase.variables[0] && publicCase.variables[0].id) || null;
  const outcomeId = (publicCase.outcome && publicCase.outcome.id) || null;

  const roundLog = (roundTrialLogs && roundTrialLogs[step.targetRound]) || [];
  const testedSettings = new Set(roundLog.map((t) => Number(t[variableId])));

  const results = dataTableResults.map((r) => {
    const settingValue = Number(r.settingValue);
    const wasUntested = !testedSettings.has(settingValue);
    const tableEntry = ((targetRound && targetRound.lookupTable) || []).find(
      (row) => Number(row[variableId]) === settingValue
    );
    const expectedValue = tableEntry ? tableEntry[outcomeId] : null;
    const correct =
      wasUntested &&
      expectedValue !== null &&
      Math.abs(Number(r.submittedValue) - Number(expectedValue)) <= tolerance;
    return { settingValue, submittedValue: r.submittedValue, expectedValue, wasUntested, correct };
  });

  const correctCount = results.filter((r) => r.correct).length;
  return { results, correctCount, total: results.length };
}

function summarizeForHumans(caseData, checkpointScore, dataTableScore, finalResponseText) {
  const cpTotal = checkpointScore.total;
  const cpCorrect = checkpointScore.correctCount;
  const dtTotal = dataTableScore.total;
  const dtCorrect = dataTableScore.correctCount;
  return `Simulation Lab (${caseData ? caseData.title : "unknown case"}): ${cpCorrect}/${cpTotal} checkpoints correct` +
    (dtTotal > 0 ? `, ${dtCorrect}/${dtTotal} data-table prediction(s) correct` : "") +
    `.\nFinal response: ${finalResponseText || "(no response written)"}`;
}

// Same pattern as every other engine's Generalize/Defend-style final
// response — one Claude call, 0/1/2 scale against the case's mustInclude
// rubric, never blocks submission on an AI failure.
async function gradeFinalResponse(caseData, finalResponseText) {
  const rubricText = (caseData.mustInclude || []).map((m) => "  - " + m).join("\n");

  const prompt = `You are grading a student's Simulation Lab final response — after running trials in a live experiment and logging what happened, the student explains the pattern they found and defends it using their own trial data. Score it on a 0/1/2 scale against this rubric. Respond with ONLY a JSON object like {"score": 0, "rationale": "..."} — no other text, no markdown, no code fence, just the raw JSON object.

Case: ${caseData.title}
Model answer (for your reference, not the only acceptable wording): ${caseData.modelAnswer || "(none provided)"}
A strong response includes:
${rubricText}

A 2 clearly hits everything in the rubric using real reasoning and their own trial data, not just restating the question. A 1 gets part of the rubric right but misses or muddles at least one required piece (most commonly: no specific trial data cited). A 0 is missing most of the rubric or shows a real misunderstanding of the relationship.

In the rationale, briefly say what the response got right and what it missed, so a teacher can see at a glance where to focus. Keep it to 2-3 sentences.

Student's response:
${finalResponseText || "(nothing written)"}`;

  try {
    const raw = await callClaude({ messages: [{ role: "user", content: prompt }], max_tokens: 300 });
    const parsed = extractJSON(raw);
    return { score: parsed.score, rationale: parsed.rationale };
  } catch (err) {
    return { score: null, rationale: "[AI grading error] " + (err && err.message ? err.message : String(err)) };
  }
}

export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const {
    assignmentId,
    caseStandard,
    roundTrialLogs,
    checkpointResults,
    dataTableResults,
    finalResponseText,
    checklist,
  } = await request.json();

  const serverCase = getSimulationLabServerCase(caseStandard);
  const publicCase = getSimulationLabPublicCase(caseStandard);

  const checkpointScore = scoreCheckpoints(serverCase, checkpointResults || []);
  const dataTableScore = scoreDataTable(publicCase, roundTrialLogs || {}, dataTableResults || []);

  // "Clean run" callout, same purely-positive convention as Mission Map's:
  // every checkpoint AND every data-table prediction correct. No badge,
  // and no negative language anywhere, when a run isn't clean.
  const cleanRun =
    checkpointScore.total > 0 &&
    checkpointScore.correctCount === checkpointScore.total &&
    (dataTableScore.total === 0 || dataTableScore.correctCount === dataTableScore.total);

  let aiScore = null;
  let aiRationale = null;
  if (serverCase) {
    const result = await gradeFinalResponse(serverCase, finalResponseText);
    aiScore = result.score;
    aiRationale = result.rationale;
  }

  const fields = {
    attempt2: summarizeForHumans(serverCase, checkpointScore, dataTableScore, finalResponseText),
    checklist: checklist || null,
    simulation_lab_data: {
      trialLog: {
        roundOne: (roundTrialLogs && roundTrialLogs.roundOne) || [],
        roundTwo: (roundTrialLogs && roundTrialLogs.roundTwo) || [],
      },
      checkpointResults: checkpointScore.results,
      checkpointScore: { correctCount: checkpointScore.correctCount, total: checkpointScore.total },
      dataTableResults: dataTableScore.results,
      dataTableScore: { correctCount: dataTableScore.correctCount, total: dataTableScore.total },
      finalResponseText: finalResponseText || "",
      cleanRun,
    },
    ai_score: aiScore,
    ai_rationale: aiRationale,
    submitted_at: new Date().toISOString(),
    revision_requested: false,
  };

  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabaseAdmin.from("submissions").update(fields).eq("id", existing.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await supabaseAdmin.from("submissions").insert({ assignment_id: assignmentId, student_id: studentId, ...fields });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    await supabaseAdmin.rpc("bump_daily_streak", { p_student_id: studentId });
  } catch (err) {
    // ignore — streak is a nice-to-have, not worth failing the submit over
  }

  return NextResponse.json({ success: true, cleanRun });
}
