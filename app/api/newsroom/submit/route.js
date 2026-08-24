import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { callClaude } from "../../../../lib/anthropic";
import { getNewsroomBNServerCase } from "../../../../lib/cases/newsroom-bn/index.server";

export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { assignmentId, caseStandard, newsroomData } = await request.json();
  const caseData = getNewsroomBNServerCase(caseStandard);

  // Human-readable text for the two columns every other page already
  // knows how to display (Reports, Progress, notifications) — the full
  // structured breakdown lives in newsroom_data for the grading page.
  const attempt1Text = `Right now: ${newsroomData?.attempt1?.rightNow || ""}\n\nWatch for: ${newsroomData?.attempt1?.watchFor || ""}`;
  const attempt2Text = `${newsroomData?.headline || ""}\n\nRight now: ${newsroomData?.attempt2?.rightNow || ""}\n\nWatch for: ${newsroomData?.attempt2?.watchFor || ""}`;

  let aiScore = null;
  let aiRationale = null;

  if (caseData) {
    const scoringPrompt = `Score this 5th grade student's Newsroom investigation report on a 0/1/2 scale against this rubric. Respond with ONLY a JSON object like {"score": 0, "rationale": "..."} — no other text.

Standard: ${caseData.standard} — ${caseData.title}
Big question: ${caseData.bigQuestion}
Rubric — a strong (2) response includes all of:
${caseData.mustInclude.map((m) => "- " + m).join("\n")}
A 1 includes some but not all of the above. A 0 shows little evidence-based reasoning.

Student's cause-and-effect reasoning:
Root cause: "${newsroomData?.causeChain?.rootCause || ""}"
Ripples: ${(newsroomData?.causeChain?.ripples || []).map((r, i) => `(${i + 1}) "${r}"`).join(" ")}

Student's final report:
"${attempt2Text}"

Source the student rejected and why: "${newsroomData?.attempt2?.rejectedJustification || "(none given)"}"`;

    try {
      const raw = await callClaude({ messages: [{ role: "user", content: scoringPrompt }], max_tokens: 250 });
      const parsed = JSON.parse(raw.trim());
      aiScore = parsed.score;
      aiRationale = parsed.rationale;
    } catch (err) {
      // Scoring failure shouldn't block the student's submission — a
      // teacher can still grade manually if this is null.
      aiScore = null;
      aiRationale = null;
    }
  }

  const fields = {
    attempt1: attempt1Text,
    attempt2: attempt2Text,
    organizer: { firstGuess: newsroomData?.firstGuess, rootCause: newsroomData?.causeChain?.rootCause, ripples: newsroomData?.causeChain?.ripples },
    sources: newsroomData?.investigationLog || [],
    newsroom_data: newsroomData || {},
    ai_score: aiScore,
    ai_rationale: aiRationale,
    submitted_at: new Date().toISOString(),
    // Same rule as Group Chat's submit route — a (re)submit always clears
    // any pending "please try again" flag, whether this is a first
    // submission or a resubmit after being sent back.
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
