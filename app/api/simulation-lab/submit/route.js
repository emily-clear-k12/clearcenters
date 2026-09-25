import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { callClaude, extractJSON } from "../../../../lib/anthropic";
import { getSimulationLabServerCase } from "../../../../lib/cases/simulation-lab/index.server";
import { getSimulationLabPublicCase } from "../../../../lib/cases/simulation-lab/index.public";
import { scoreSubmission, CONFIDENCE_IDS } from "../../../../lib/simulationLabScoring";

// Sept 24, 2026: every live case uses the animated scene flow
// (components/simulation-lab, ClearCenters_STATE.md §9 rule 22). Scoring is
// in lib/simulationLabScoring.js: the scene's checkpoints (cp1 + fair) are
// graded on the student's FIRST attempt (the flow lets them retry with a
// hint, the "no shame" rule), and the Round 2 twist prediction is saved
// for the teacher but is informational, never graded.
//
// Historical notes below describe the pre-scene (v3) case shape; the case
// files still carry those fields.
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

// Scoring (checkpoints, data-table prediction, clean run) lives in
// lib/simulationLabScoring.js so the instant-feedback check route and the
// dev harness grade exactly the same way. Sept 24 2026: scene-based cases
// (every live case) score the scene flow's own checkpoints (cp1 + fair) on
// the first attempt, derive the data-table item from the Round 2
// given-setting prediction, and recompute every trial outcome from the
// lookup tables. Cases without a scene block keep the original scoring.

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

  const body = await request.json();
  const { assignmentId, caseStandard, finalResponseText, checklist, selfConfidence } = body;

  const serverCase = getSimulationLabServerCase(caseStandard);
  const publicCase = getSimulationLabPublicCase(caseStandard);

  const { trialLog, checkpointScore, dataTableScore, cleanRun } = scoreSubmission(serverCase, publicCase, body);

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
      trialLog,
      checkpointResults: checkpointScore.results,
      checkpointScore: { correctCount: checkpointScore.correctCount, total: checkpointScore.total },
      dataTableResults: dataTableScore.results,
      dataTableScore: { correctCount: dataTableScore.correctCount, total: dataTableScore.total },
      finalResponseText: finalResponseText || "",
      cleanRun,
    },
    ai_score: aiScore,
    // Rule 21: "How sure are you?" is asked on every submit and saved with it.
    ...(CONFIDENCE_IDS.includes(selfConfidence) ? { self_confidence: selfConfidence } : {}),
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
