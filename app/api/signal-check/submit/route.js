import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { callClaude, extractJSON } from "../../../../lib/anthropic";
import { getSignalCheckServerCase } from "../../../../lib/cases/signal-check/index.server";

function summarizeForHumans(caseData, stemMode, statementAnswers, extras = {}) {
  const shape = extras.caseShape || caseData?.caseShape || "classic";
  if (shape === "weigh_in") {
    const side = extras.sideId || "(no side)";
    const evid = (extras.reasonEvidenceIds || []).filter(Boolean).join(", ") || "(none)";
    return `Weigh-In side: ${side} — evidence: ${evid}`;
  }
  if (shape === "thread") {
    const flags = extras.commentFlags || {};
    const flagLine = Object.keys(flags).map((id) => `${id}=${flags[id]}`).join("; ") || "(none)";
    const evid = (extras.replyEvidenceIds || []).filter(Boolean).join(", ") || "(none)";
    return `Thread flags: ${flagLine}\nReply evidence: ${evid}`;
  }
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

function gradeWeighIn(caseData, sideId, reasonEvidenceIds) {
  if (!caseData?.correctSideId) return { score: null, rationale: null };
  const sideOk = sideId === caseData.correctSideId;
  const picks = (reasonEvidenceIds || []).filter(Boolean);
  const must = caseData.rulingMustInclude || [];
  // Soft check: at least one must-include token appears in joined pick ids
  // (dropdown mode stores evidence ids, not prose).
  const joined = picks.join(" ").toLowerCase();
  const hintHits = must.filter((m) => joined.includes(String(m).toLowerCase())).length;
  if (sideOk && picks.length >= 2) {
    return { score: 2, rationale: `Picked correct side (${caseData.correctSideId}) with ${picks.length} evidence picks.` };
  }
  if (sideOk || hintHits > 0) {
    return { score: 1, rationale: sideOk ? "Correct side, but evidence picks were thin or missing." : "Side missed; some related evidence tokens present." };
  }
  return { score: 0, rationale: `Expected side ${caseData.correctSideId}; student picked ${sideId || "(none)"}.` };
}

function gradeThread(caseData, commentFlags, replyEvidenceIds) {
  const map = caseData?.commentFlags || {};
  const ids = Object.keys(map);
  if (ids.length === 0) return { score: null, rationale: null };
  let correct = 0;
  ids.forEach((id) => {
    if ((commentFlags || {})[id] === map[id]) correct++;
  });
  const mustIds = caseData.mustFlagIds || ids;
  let mustCorrect = 0;
  mustIds.forEach((id) => {
    if ((commentFlags || {})[id] === map[id]) mustCorrect++;
  });
  const replyOk = (replyEvidenceIds || []).filter(Boolean).length >= 2;
  const ratio = mustIds.length ? mustCorrect / mustIds.length : 0;
  if (ratio === 1 && replyOk) {
    return { score: 2, rationale: `Flagged ${correct}/${ids.length} comments correctly; reply cited evidence.` };
  }
  if (ratio >= 0.5 || (mustCorrect > 0 && replyOk)) {
    return { score: 1, rationale: `Matched ${mustCorrect}/${mustIds.length} key flags.` };
  }
  return { score: 0, rationale: `Matched ${mustCorrect}/${mustIds.length} key flags.` };
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
  const {
    assignmentId,
    caseStandard,
    stemMode,
    statementAnswers,
    checklist,
    practiceContext,
    caseShape: bodyShape,
    sideId,
    reasonEvidenceIds,
    commentFlags,
    replyEvidenceIds,
  } = body;

  const caseData = getSignalCheckServerCase(caseStandard);
  const caseShape = bodyShape || caseData?.caseShape || "classic";

  let aiScore = null;
  let aiRationale = null;

  if (caseData) {
    if (caseShape === "weigh_in") {
      const result = gradeWeighIn(caseData, sideId, reasonEvidenceIds);
      aiScore = result.score;
      aiRationale = result.rationale;
    } else if (caseShape === "thread") {
      const result = gradeThread(caseData, commentFlags, replyEvidenceIds);
      aiScore = result.score;
      aiRationale = result.rationale;
    } else if (stemMode === "dropdown") {
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
    attempt2: summarizeForHumans(caseData, stemMode, statementAnswers, {
      caseShape,
      sideId,
      reasonEvidenceIds,
      commentFlags,
      replyEvidenceIds,
    }),
    checklist: checklist || null,
    signal_data: {
      caseShape,
      stemMode: stemMode || null,
      statementAnswers: statementAnswers || {},
      sideId: sideId || null,
      reasonEvidenceIds: reasonEvidenceIds || null,
      commentFlags: commentFlags || null,
      replyEvidenceIds: replyEvidenceIds || null,
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
