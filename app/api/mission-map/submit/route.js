import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { callClaude, extractJSON } from "../../../../lib/anthropic";
import { getMissionMapServerCase } from "../../../../lib/cases/mission-map/index.server";

function summarizeForHumans(caseData, checkpointResults, finalResponseText) {
  // Same convention as every other engine's submit route: a plain-English
  // summary goes into the generic `attempt2` column so Reports/Progress/
  // teacher views work without any Mission-Map-specific rendering logic.
  // The full structured breakdown lives in mission_map_data instead.
  const total = checkpointResults.length;
  const correct = checkpointResults.filter((r) => r.firstTryCorrect).length;
  const lockedWrong = checkpointResults.filter((r) => r.lockedInWrong).length;
  return `Mission Map (${caseData ? caseData.title : "unknown case"}): ${correct}/${total} checkpoints correct on the first try` +
    (lockedWrong > 0 ? `, ${lockedWrong} locked in wrong after repeated misses` : "") +
    `.\nFinal response: ${finalResponseText || "(no response written)"}`;
}

// Deterministic scoring for the checkpoint portion, mirroring Signal Check's
// gradeDropdown() — the correct choice per checkpoint is re-verified here
// against the server's own copy, never trusted from the client.
function scoreCheckpoints(caseData, checkpointResults) {
  if (!caseData || !caseData.checkpoints || caseData.checkpoints.length === 0) {
    return { correctCount: 0, total: 0 };
  }
  const answerKey = {};
  caseData.checkpoints.forEach((cp) => { answerKey[cp.id] = cp.correctChoiceId; });
  let correctCount = 0;
  checkpointResults.forEach((r) => {
    if (answerKey[r.id] && r.finalChoiceId === answerKey[r.id]) correctCount++;
  });
  return { correctCount, total: caseData.checkpoints.length };
}

// The Final Unlock written response is the one genuinely open-ended piece —
// graded with a single Claude call against the case's mustInclude rubric,
// same pattern as Signal Check's gradeWithClaude() for grades 4-5.
async function gradeFinalResponse(caseData, finalResponseText) {
  const rubricText = (caseData.mustInclude || []).map((m) => "  - " + m).join("\n");

  const prompt = `You are grading a student's Mission Map final response — after walking a checkpoint path and collecting evidence, the student writes a short answer using what they collected. Score it on a 0/1/2 scale against this rubric. Respond with ONLY a JSON object like {"score": 0, "rationale": "..."} — no other text, no markdown, no code fence, just the raw JSON object.

Case: ${caseData.title}
Model answer (for your reference, not the only acceptable wording): ${caseData.modelAnswer || "(none provided)"}
A strong response includes:
${rubricText}

A 2 clearly hits everything in the rubric using real reasoning, not just restating the mission goal. A 1 gets part of the rubric right but misses or muddles at least one required piece. A 0 is missing most of the rubric or shows a real misunderstanding.

In the rationale, briefly say what the response got right and what it missed, so a teacher can see at a glance where to focus. Keep it to 2-3 sentences.

Student's response:
${finalResponseText || "(nothing written)"}`;

  try {
    const raw = await callClaude({ messages: [{ role: "user", content: prompt }], max_tokens: 300 });
    const parsed = extractJSON(raw);
    return { score: parsed.score, rationale: parsed.rationale };
  } catch (err) {
    // Never let an AI-grading failure block the submission — same rule as
    // every other engine. Stash the real error so it's diagnosable, prefixed
    // so the grading UI can tell a diagnostic apart from a genuine rationale.
    return { score: null, rationale: "[AI grading error] " + (err && err.message ? err.message : String(err)) };
  }
}

export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { assignmentId, caseStandard, checkpointResults, finalResponseText, checklist } = await request.json();
  const caseData = getMissionMapServerCase(caseStandard);

  const { correctCount, total } = scoreCheckpoints(caseData, checkpointResults || []);

  let aiScore = null;
  let aiRationale = null;
  if (caseData) {
    const result = await gradeFinalResponse(caseData, finalResponseText);
    aiScore = result.score;
    aiRationale = result.rationale;
  }

  const fields = {
    attempt2: summarizeForHumans(caseData, checkpointResults || [], finalResponseText),
    checklist: checklist || null,
    mission_map_data: {
      checkpointResults: checkpointResults || [],
      checkpointScore: total ? { correctCount, total } : null,
      finalResponseText: finalResponseText || "",
    },
    ai_score: aiScore,
    ai_rationale: aiRationale,
    submitted_at: new Date().toISOString(),
    // Same rule as every other engine's submit route — a (re)submit always
    // clears any pending "please try again" flag.
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

  return NextResponse.json({ success: true });
}
