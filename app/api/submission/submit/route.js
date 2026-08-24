import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { callClaude } from "../../../../lib/anthropic";
import { getServerCase } from "../../../../lib/cases/index.server";

export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { assignmentId, caseStandard, attempt1, attempt2, organizer, sources, checklist, selfConfidence } = await request.json();

  const caseData = getServerCase(caseStandard);
  const finalText = (attempt2 && attempt2.trim()) || (attempt1 && attempt1.trim()) || "";

  let aiScore = null;
  let aiRationale = null;

  if (caseData) {
    const scoringPrompt = `Score this 5th grade student's response on a 0/1/2 scale against this rubric. Respond with ONLY a JSON object like {"score": 0, "rationale": "..."} — no other text.

Standard: ${caseData.standard} — ${caseData.title}
Big question: ${caseData.bigQuestion}
Rubric — a strong (2) response includes all of:
${caseData.mustInclude.map((m) => "- " + m).join("\n")}
A 1 includes some but not all of the above. A 0 mostly restates the trap claim ("${caseData.trapLine}") without real evidence.

Student's response:
"${finalText || "(no response written)"}"`;

    try {
      const raw = await callClaude({ messages: [{ role: "user", content: scoringPrompt }], max_tokens: 200 });
      const parsed = JSON.parse(raw.trim());
      aiScore = parsed.score;
      aiRationale = parsed.rationale;
    } catch (err) {
      // Scoring failure shouldn't block the student's submission from going
      // through — a teacher can still grade manually if this is null.
      aiScore = null;
      aiRationale = null;
    }
  }

  const fields = {
    attempt1,
    attempt2,
    organizer,
    sources,
    checklist,
    self_confidence: selfConfidence,
    ai_score: aiScore,
    ai_rationale: aiRationale,
    submitted_at: new Date().toISOString(),
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

  // A real submit (not a draft autosave) counts as today's activity for the
  // student's streak. bump_daily_streak() does the "is this a new day, is it
  // consecutive, or did they miss a day" math atomically in Postgres — best
  // effort only, a hiccup here should never block the submission itself.
  try {
    await supabaseAdmin.rpc("bump_daily_streak", { p_student_id: studentId });
  } catch (err) {
    // ignore — streak is a nice-to-have, not worth failing the submit over
  }

  return NextResponse.json({ success: true });
}
