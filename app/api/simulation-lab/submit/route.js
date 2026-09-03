import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { callClaude, extractJSON } from "../../../../lib/anthropic";
import { getSimulationLabServerCase } from "../../../../lib/cases/simulation-lab/index.server";

// Simulation Lab's checkpoints are single-attempt (unlike Mission Map's
// two-attempt hint-then-retry checkpoints) — they're quick understanding
// checks dropped into an experiment loop, not a "walk the path" adventure,
// so there's no lockedInWrong/firstTryCorrect distinction to track here.
// Same "no shame" rule as every other engine still applies: a miss is
// recorded for the teacher but never blocks the mission or shows a red mark.

function normalizeAnswer(text) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[.!?,;:]/g, "");
}

// Checkpoint 1 (mc) is checked against the server's correctChoiceId, which
// is keyed to the case's overall trendDirection rather than any one trial
// value — see SimulationLab_Digital_Design_v1.md §7 for why: each student
// runs their own trials at settings of their own choosing, so there is no
// single case-authored "correct trial," only a correct overall pattern.
// Checkpoint 2 (fillBlank) is checked against a per-case accepted-answers
// list using a forgiving substring match, since elementary students phrase
// the same correct idea many different ways.
function scoreCheckpoints(serverCase, submittedResults) {
  if (!serverCase || !serverCase.checkpoints) return { results: [], correctCount: 0, total: 0 };
  const byId = {};
  (submittedResults || []).forEach((r) => { byId[r.id] = r; });

  const results = serverCase.checkpoints.map((cp) => {
    const submitted = byId[cp.id] || {};
    let correct = false;
    if (cp.type === "mc") {
      correct = submitted.submittedChoiceId === cp.correctChoiceId;
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

// The Data Table Fill-In step is graded against the student's OWN trial
// log, never a case-authored answer key — the blanked cells come from
// trials the student already ran, so the only correct fill is whatever
// their own log actually recorded for that trial. The client submits both
// its filled-in values and the full trialLog; this re-derives the expected
// value server-side from the trialLog rather than trusting a client-sent
// "correct" flag, same discipline as every other engine's checkpoint check.
function scoreDataTable(trialLog, dataTableResults) {
  if (!dataTableResults || dataTableResults.length === 0) {
    return { results: [], correctCount: 0, total: 0 };
  }
  const trialsById = {};
  (trialLog || []).forEach((t) => { trialsById[t.id] = t; });

  const results = dataTableResults.map((r) => {
    const trial = trialsById[r.trialId];
    const expectedValue = trial ? trial.actual : null;
    const correct =
      expectedValue !== null &&
      Number(r.submittedValue) === Number(expectedValue);
    return { trialId: r.trialId, submittedValue: r.submittedValue, expectedValue, correct };
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
    (dtTotal > 0 ? `, ${dtCorrect}/${dtTotal} data-table cells correct` : "") +
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
    trialLog,
    checkpointResults,
    dataTableResults,
    finalResponseText,
    checklist,
  } = await request.json();

  const caseData = getSimulationLabServerCase(caseStandard);

  const checkpointScore = scoreCheckpoints(caseData, checkpointResults || []);
  const dataTableScore = scoreDataTable(trialLog, dataTableResults || []);

  // "Clean run" callout, same purely-positive convention as Mission Map's:
  // every checkpoint AND every data-table cell correct. No badge, and no
  // negative language anywhere, when a run isn't clean.
  const cleanRun =
    checkpointScore.total > 0 &&
    checkpointScore.correctCount === checkpointScore.total &&
    (dataTableScore.total === 0 || dataTableScore.correctCount === dataTableScore.total);

  let aiScore = null;
  let aiRationale = null;
  if (caseData) {
    const result = await gradeFinalResponse(caseData, finalResponseText);
    aiScore = result.score;
    aiRationale = result.rationale;
  }

  const fields = {
    attempt2: summarizeForHumans(caseData, checkpointScore, dataTableScore, finalResponseText),
    checklist: checklist || null,
    simulation_lab_data: {
      trialLog: trialLog || [],
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
