import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { callClaude, extractJSON } from "../../../../lib/anthropic";
import { getSignalCheckServerCase } from "../../../../lib/cases/signal-check/index.server";

function summarizeForHumans(caseData, stemMode, statementAnswers) {
  // Human-readable text for the generic `attempt2` column every other page
  // already knows how to display (Reports, Progress, notifications) — the
  // full structured breakdown lives in signal_data for the grading page.
  const lines = (caseData?.statements ? Object.keys(caseData.statements) : Object.keys(statementAnswers || {})).map((id) => {
    const a = statementAnswers?.[id] || {};
    if (stemMode === "dropdown") {
      return `Signal ${id}: ${a.verdict || "(no verdict)"} — evidence: ${[a.evidence1, a.evidence2].filter(Boolean).join(", ") || "(none picked)"}`;
    }
    if (stemMode === "dropdown-open") {
      return `Signal ${id}: ${a.verdict || "(no verdict)"} — ${a.reasoning || "(no reasoning written)"}`;
    }
    return `Signal ${id}: ${a.verdictText || "(no verdict written)"} — ${a.reasoning || "(no reasoning written)"}`;
  });
  return lines.join("\n");
}

// Grade 3 (all-dropdown) is fully deterministic — no Claude call needed.
function gradeDropdown(caseData, statementAnswers) {
  const ids = Object.keys(caseData.statements || {});
  if (ids.length === 0) return { score: null, rationale: null };
  let correct = 0;
  ids.forEach((id) => {
    const rubric = caseData.statements[id];
    const a = statementAnswers?.[id] || {};
    if (a.verdict === rubric.correctVerdict) correct++;
  });
  const ratio = correct / ids.length;
  const score = ratio === 1 ? 2 : ratio > 0 ? 1 : 0;
  const rationale = `Matched ${correct} of ${ids.length} signal verdicts exactly.`;
  return { score, rationale };
}

async function gradeWithClaude(caseData, stemMode, statementAnswers) {
  const ids = Object.keys(caseData.statements || {});
  const rubricText = ids
    .map((id) => {
      const r = caseData.statements[id];
      return `Signal ${id} — correct verdict: ${r.correctVerdict}. A strong response includes:\n${r.mustInclude.map((m) => "  - " + m).join("\n")}`;
    })
    .join("\n\n");

  const studentText = ids
    .map((id) => {
      const a = statementAnswers?.[id] || {};
      if (stemMode === "dropdown-open") {
        return `Signal ${id}: student picked verdict "${a.verdict || "(none)"}", reasoning: "${a.reasoning || "(none)"}"`;
      }
      return `Signal ${id}: student wrote verdict "${a.verdictText || "(none)"}", reasoning: "${a.reasoning || "(none)"}"`;
    })
    .join("\n");

  const prompt = `You are grading a student's Signal Check response — a fact-check exercise where the student picks a True/Misleading/False verdict for each signal AND explains their reasoning. Score it on a 0/1/2 scale against this rubric. Respond with ONLY a JSON object like {"score": 0, "rationale": "..."} — no other text, no markdown, no code fence, just the raw JSON object.

Case: ${caseData.title}
Rubric (per signal):
${rubricText}

For EACH signal, judge two separate things: (1) did the student pick the correct verdict, and (2) does their written reasoning actually explain WHY, using the specific evidence — not just restating the verdict or writing something vague/generic. A signal only counts as fully correct if both the verdict AND the explanation are right.

A strong (2) response gets the verdict right AND gives a real, evidence-based explanation for every signal. A 1 gets some signals fully right but is missing correct verdicts, or has reasoning that's thin, vague, or doesn't actually use the evidence, on one or more signals. A 0 mostly gets verdicts wrong or gives no real reasoning anywhere.

In the rationale, briefly call out by signal letter which ones were solid and which ones had a wrong verdict or weak/incorrect reasoning, so a teacher can see at a glance where to focus. Keep it to 2-3 sentences total.

Student's response:
${studentText}`;

  try {
    const raw = await callClaude({ messages: [{ role: "user", content: prompt }], max_tokens: 350 });
    const parsed = extractJSON(raw);
    return { score: parsed.score, rationale: parsed.rationale };
  } catch (err) {
    // Scoring failure shouldn't block the student's submission — a teacher
    // can still grade manually if this is null. But swallowing the actual
    // error to a bare null/null made this impossible to diagnose from the
    // outside (every failure just showed "AI scoring wasn't available",
    // whether the cause was a bad API key, an invalid model name, or a
    // parsing miss). Stash the real error message in rationale, prefixed so
    // the grading UI can tell a genuine diagnostic apart from a real AI
    // rationale and render it distinctly.
    return { score: null, rationale: "[AI grading error] " + (err && err.message ? err.message : String(err)) };
  }
}

export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { assignmentId, caseStandard, stemMode, statementAnswers, checklist, practiceContext } = await request.json();
  const caseData = getSignalCheckServerCase(caseStandard);

  let aiScore = null;
  let aiRationale = null;

  if (caseData) {
    if (stemMode === "dropdown") {
      const result = gradeDropdown(caseData, statementAnswers);
      aiScore = result.score;
      aiRationale = result.rationale;
    } else {
      const result = await gradeWithClaude(caseData, stemMode, statementAnswers);
      aiScore = result.score;
      aiRationale = result.rationale;
    }
  }

  const fields = {
    attempt2: summarizeForHumans(caseData, stemMode, statementAnswers),
    checklist: checklist || null,
    signal_data: {
      stemMode: stemMode || null,
      statementAnswers: statementAnswers || {},
      // Sensor Sort is practice only — shown to the teacher as context,
      // never factored into ai_score or teacher_grade.
      practiceContext: practiceContext || null,
    },
    ai_score: aiScore,
    ai_rationale: aiRationale,
    submitted_at: new Date().toISOString(),
    // Same rule as Group Chat / Newsroom's submit routes — a (re)submit
    // always clears any pending "please try again" flag.
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
