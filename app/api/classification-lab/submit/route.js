import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { callClaude, extractJSON } from "../../../../lib/anthropic";
import { getClassificationLabServerCase } from "../../../../lib/cases/classification-lab/index.server";

// Classification Lab submit — grades stream sorts + Flag write + transfer
// against the server case. Same upsert / streak / AI-first-read pattern as
// simulation-lab/submit (Sept 11 2026 pilot: 3.6B-CL).

function scoreSorts(serverCase, submittedSorts) {
  const key = (serverCase && serverCase.itemAnswerKey) || {};
  const byId = {};
  (submittedSorts || []).forEach((s) => {
    byId[s.itemId] = s;
  });

  const results = Object.keys(key).map((itemId) => {
    const submitted = byId[itemId] || {};
    const correctBinId = key[itemId];
    const submittedBinId = submitted.submittedBinId || null;
    const timedOut = !!submitted.timedOut;
    const correct = !timedOut && submittedBinId === correctBinId;
    return {
      itemId,
      submittedBinId,
      correctBinId,
      timedOut,
      correct,
      isFlag: itemId === (serverCase && serverCase.flagItemId),
    };
  });

  const correctCount = results.filter((r) => r.correct).length;
  return { results, correctCount, total: results.length };
}

function scoreTransfer(serverCase, transferSubmission) {
  const answer = serverCase && serverCase.transferAnswer;
  if (!answer || !transferSubmission) {
    return { correct: false, detail: null };
  }

  if (answer.type === "mystery_sample") {
    const submittedBinId = transferSubmission.submittedBinId || null;
    const binCorrect = submittedBinId === answer.correctBinId;
    const expectedChecks = answer.expectedChecks || {};
    const submittedChecks = transferSubmission.checks || {};
    const checkResults = Object.keys(expectedChecks).map((checkId) => {
      const expected = expectedChecks[checkId];
      const submitted = (submittedChecks[checkId] || "").toLowerCase();
      return {
        checkId,
        expected,
        submitted: submitted || null,
        correct: submitted === expected,
      };
    });
    const checksCorrectCount = checkResults.filter((c) => c.correct).length;
    return {
      correct: binCorrect,
      detail: {
        type: "mystery_sample",
        submittedBinId,
        correctBinId: answer.correctBinId,
        binCorrect,
        checkResults,
        checksCorrectCount,
        checksTotal: checkResults.length,
      },
    };
  }

  // fix_the_bot stub — not used by the pilot; schema reserved for later.
  return { correct: false, detail: { type: answer.type, unsupported: true } };
}

function summarizeForHumans(caseData, sortScore, transferScore, flagText) {
  const title = caseData ? caseData.title : "unknown case";
  const transferLine = transferScore && transferScore.detail
    ? (transferScore.correct ? "transfer bin correct" : "transfer bin incorrect")
    : "no transfer";
  return (
    `Classification Lab (${title}): ${sortScore.correctCount}/${sortScore.total} sorts correct; ${transferLine}.\n` +
    `Flag write: ${flagText || "(no response written)"}`
  );
}

async function gradeFlagWrite(caseData, flagText) {
  const criteria = (caseData && caseData.justificationCriteria) || {};
  const rubricText = (criteria.mustInclude || []).map((m) => "  - " + m).join("\n");
  const modelAnswer = criteria.modelAnswer || "(none provided)";

  const prompt = `You are grading a student's Classification Lab Flag justification — after sorting many items, they sorted one deliberately tricky Flag item and wrote a short why. Score it on a 0/1/2 scale against this rubric. Respond with ONLY a JSON object like {"score": 0, "rationale": "..."} — no other text, no markdown, no code fence, just the raw JSON object.

Case: ${caseData.title}
Pedagogical context: ${caseData.aiContext || ""}
Model answer (for your reference, not the only acceptable wording): ${modelAnswer}
A strong response includes:
${rubricText}

A 2 clearly hits everything in the rubric with real reasoning (chunk vs fog, shape/rule language). A 1 gets part of the rubric right but misses or muddles at least one required piece. A 0 is missing most of the rubric or shows a real misunderstanding (e.g. calling the chunk a gas because of the fog).

In the rationale, briefly say what the response got right and what it missed, so a teacher can see at a glance where to focus. Keep it to 2-3 sentences.

Student's Flag write:
${flagText || "(nothing written)"}`;

  try {
    const raw = await callClaude({ messages: [{ role: "user", content: prompt }], max_tokens: 300 });
    const parsed = extractJSON(raw);
    return { score: parsed.score, rationale: parsed.rationale };
  } catch (err) {
    return {
      score: null,
      rationale: "[AI grading error] " + (err && err.message ? err.message : String(err)),
    };
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
    sortResults,
    flagJustificationText,
    transferSubmission,
    checklist,
    streakBest,
    pacingMode,
  } = await request.json();

  const serverCase = getClassificationLabServerCase(caseStandard);
  if (!serverCase) {
    return NextResponse.json({ error: "Unknown Classification Lab case." }, { status: 400 });
  }

  const sortScore = scoreSorts(serverCase, sortResults || []);
  const transferScore = scoreTransfer(serverCase, transferSubmission || null);

  const cleanRun =
    sortScore.total > 0 &&
    sortScore.correctCount === sortScore.total &&
    !!transferScore.correct;

  let aiScore = null;
  let aiRationale = null;
  const result = await gradeFlagWrite(serverCase, flagJustificationText);
  aiScore = result.score;
  aiRationale = result.rationale;

  const fields = {
    attempt2: summarizeForHumans(serverCase, sortScore, transferScore, flagJustificationText),
    checklist: checklist || null,
    classification_lab_data: {
      sortResults: sortScore.results,
      sortScore: { correctCount: sortScore.correctCount, total: sortScore.total },
      flagJustificationText: flagJustificationText || "",
      transfer: transferScore.detail,
      transferCorrect: !!transferScore.correct,
      streakBest: typeof streakBest === "number" ? streakBest : null,
      pacingMode: pacingMode || "steady",
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
    const { error } = await supabaseAdmin
      .from("submissions")
      .insert({ assignment_id: assignmentId, student_id: studentId, ...fields });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    await supabaseAdmin.rpc("bump_daily_streak", { p_student_id: studentId });
  } catch (err) {
    // ignore — streak is a nice-to-have
  }

  return NextResponse.json({ success: true, cleanRun });
}
