import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { callClaude, extractJSON } from "../../../../lib/anthropic";
import { resolveRelayStationLesson } from "../../../../lib/relayStationServer";
import { getComposePrompt, COMPOSE_CRYSTALS } from "../../../../lib/cases/relay-station";

// Relay Station "Your Turn" — Copy -> Compose (Wave 2, design doc §14).
// After relaying a model text, the student writes their own version. The
// writing is saved to the assignment's submission (attempt1 + ai_score /
// ai_rationale, the same columns every other engine uses, so it shows up
// for grading) and gets kid-friendly AI feedback: two glows and one grow,
// plus which checklist items the writing meets. A failed AI call never
// blocks saving — the teacher can still read and grade it.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const assignmentId = body && body.assignmentId;
  const text = String((body && body.text) || "").replace(/\r\n?/g, "\n").trim().slice(0, 4000);
  if (!assignmentId) return NextResponse.json({ error: "Missing assignment." }, { status: 400 });
  if ((text.match(/\S+/g) || []).length < 5) return NextResponse.json({ error: "Write a little more first!" }, { status: 400 });

  const { data: student } = await supabaseAdmin.from("students").select("id, class_id").eq("id", studentId).single();
  const { data: assignment } = await supabaseAdmin.from("assignments").select("id, class_id, case_standard").eq("id", assignmentId).single();
  if (!student || !assignment || assignment.class_id !== student.class_id) {
    return NextResponse.json({ error: "Assignment not found." }, { status: 404 });
  }
  const lesson = await resolveRelayStationLesson(assignment.case_standard);
  const prompt = lesson && (lesson.compose || getComposePrompt(lesson.code));
  if (!prompt) return NextResponse.json({ error: "This lesson doesn't have a Your Turn activity." }, { status: 400 });

  let feedback = null;
  let aiScore = null;
  try {
    const system = "You give short, warm, specific writing feedback to elementary students (grades 3-5) in a classroom typing-and-writing app. Never rewrite their work for them. Plain words a 3rd-5th grader understands. Do not comment on spelling of individual words unless it changes the meaning.";
    const user = `A grade ${lesson.grade} student just copied a model ${prompt.type} called "${lesson.title}", then wrote their own for this prompt:
"${prompt.prompt}"

Checklist the writing should meet:
${prompt.checklist.map((c, i) => `${i + 1}. ${c}`).join("\n")}

Student writing:
"""
${text}
"""

Respond with ONLY a JSON object, no other text:
{"score": 0|1|2, "glows": ["specific praise 1", "specific praise 2"], "grow": "one specific next step", "checklist": [{"item": "<checklist item text>", "met": true|false}, ...one per checklist item, same order]}
Score: 2 = meets nearly all of the checklist for grade ${lesson.grade}; 1 = meets some; 0 = off-topic or very little. Each glow and the grow must be one sentence, under 25 words, and talk directly to the student ("You...").`;
    const raw = await callClaude({ system, messages: [{ role: "user", content: user }], max_tokens: 500 });
    const parsed = extractJSON(raw);
    aiScore = [0, 1, 2].includes(parsed.score) ? parsed.score : null;
    feedback = {
      glows: Array.isArray(parsed.glows) ? parsed.glows.slice(0, 2).map(String) : [],
      grow: parsed.grow ? String(parsed.grow) : null,
      checklist: Array.isArray(parsed.checklist) ? parsed.checklist.slice(0, prompt.checklist.length).map((c, i) => ({ item: prompt.checklist[i], met: !!(c && c.met) })) : [],
    };
  } catch (err) {
    console.error("Relay Station compose feedback failed:", err.message);
  }

  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id, relay_station_data, attempt2")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();
  const prevData = (existing && existing.relay_station_data) || {};
  const firstCompose = !prevData.compose;
  const compose = { type: prompt.type, prompt: prompt.prompt, text, feedback, score: aiScore, at: new Date().toISOString(), revisions: ((prevData.compose && prevData.compose.revisions) || 0) + (firstCompose ? 0 : 1) };
  const baseSummary = String((existing && existing.attempt2) || `Relay Station (${lesson.code}, ${lesson.title})`).split("\n\nYour Turn (")[0];
  const fields = {
    attempt1: text,
    attempt2: `${baseSummary}\n\nYour Turn (${prompt.type}):\n${text}`,
    ai_score: aiScore,
    ai_rationale: feedback ? [...feedback.glows.map((g) => `Glow: ${g}`), feedback.grow ? `Grow: ${feedback.grow}` : null].filter(Boolean).join("\n") : null,
    relay_station_data: { ...prevData, compose },
  };
  const { error } = existing
    ? await supabaseAdmin.from("submissions").update(fields).eq("id", existing.id)
    : await supabaseAdmin.from("submissions").insert({ assignment_id: assignmentId, student_id: studentId, submitted_at: new Date().toISOString(), revision_requested: false, ...fields });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let crystalsEarned = 0;
  if (firstCompose) {
    crystalsEarned = COMPOSE_CRYSTALS;
    try { await supabaseAdmin.rpc("increment_crystal_points", { p_student_id: studentId, p_amount: crystalsEarned }); } catch (err) { /* ignore */ }
  }
  return NextResponse.json({ success: true, feedback, score: aiScore, crystalsEarned });
}
