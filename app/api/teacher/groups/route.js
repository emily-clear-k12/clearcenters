import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { callClaude, extractJSON } from "../../../../lib/anthropic";
import { codesFor, mainCode } from "../../../../lib/standardCodes";
import { standardWording } from "../../../../lib/standardWording";

// SERVER ONLY. Small groups — Sept 29, 2026.
// Every read and write for small_groups and small_group_notes goes through
// here with the admin key, after checking the signed-in teacher owns the
// class. RLS on those tables has no policies, so the browser can't reach
// them directly (see add_small_groups.sql).
//
// One POST, many actions: list, get, create, update, meet, plan, delete.

const MISSING_TABLE = "Small groups aren't set up in the database yet. Run add_small_groups.sql in Supabase.";

function fail(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function tableMissing(error) {
  return error && /small_group|does not exist|schema cache/i.test(error.message || "");
}

async function teacherFrom(accessToken) {
  if (!accessToken) return null;
  const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !data?.user) return null;
  return data.user.id;
}

async function ownsClass(teacherId, classId) {
  if (!classId) return null;
  const { data } = await supabaseAdmin.from("classes").select("id, name, grade, subject, teacher_id").eq("id", classId).maybeSingle();
  return data && data.teacher_id === teacherId ? data : null;
}

async function ownGroup(teacherId, groupId) {
  if (!groupId) return { error: "Missing group." };
  const { data, error } = await supabaseAdmin.from("small_groups").select("*").eq("id", groupId).maybeSingle();
  if (error) return { error: tableMissing(error) ? MISSING_TABLE : error.message };
  if (!data || data.teacher_id !== teacherId) return { error: "Group not found." };
  return { group: data };
}

function cleanIds(list) {
  return [...new Set((Array.isArray(list) ? list : []).filter((id) => typeof id === "string" && /^[0-9a-f-]{36}$/i.test(id)))];
}

function textOf(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  try { return JSON.stringify(value); } catch { return ""; }
}

function clipText(value, max) {
  const line = textOf(value).replace(/\s+/g, " ").trim();
  return line.length > max ? `${line.slice(0, max)}…` : line;
}

// Makes a table plan with Claude from the group's own work on the standard.
// Students go to Claude as S1, S2… (never their names) and are mapped back.
async function makePlan(group, cls) {
  const code = group.standard_code;
  const subject = group.subject || cls.subject || "";
  const { data: assignments } = await supabaseAdmin.from("assignments").select("id, case_standard, created_at").eq("class_id", group.class_id);
  const standards = [...new Set((assignments || []).map((a) => a.case_standard).filter(Boolean))];
  const { data: cases } = standards.length
    ? await supabaseAdmin.from("cases").select("standard, title, subject, learning_target").in("standard", standards)
    : { data: [] };
  const caseMap = Object.fromEntries((cases || []).map((c) => [c.standard, c]));
  const onStandard = (assignments || []).filter((a) => {
    const c = caseMap[a.case_standard] || {};
    if (subject && c.subject && c.subject !== subject) return false;
    return mainCode(a.case_standard) === code || codesFor(a.case_standard).includes(code);
  });
  const targets = [...new Set(onStandard.map((a) => caseMap[a.case_standard]?.learning_target).filter(Boolean))].slice(0, 4);
  const ids = cleanIds(group.student_ids);
  const assignmentIds = onStandard.map((a) => a.id);
  const { data: subs } = assignmentIds.length && ids.length
    ? await supabaseAdmin.from("submissions")
      .select("student_id, assignment_id, attempt1, attempt2, teacher_grade, teacher_feedback, self_confidence, submitted_at")
      .in("assignment_id", assignmentIds).in("student_id", ids).not("submitted_at", "is", null)
    : { data: [] };
  const label = Object.fromEntries(ids.map((id, i) => [id, `S${i + 1}`]));
  const byStudent = {};
  (subs || [])
    .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
    .forEach((s) => { (byStudent[s.student_id] = byStudent[s.student_id] || []).push(s); });
  const work = ids.map((id) => {
    const rows = (byStudent[id] || []).slice(0, 3).map((s) => {
      const title = caseMap[onStandard.find((a) => a.id === s.assignment_id)?.case_standard]?.title || "Activity";
      const grade = s.teacher_grade === 0 ? "Not yet" : s.teacher_grade === 1 ? "Almost" : s.teacher_grade === 2 ? "Got it" : "Not graded";
      const sure = s.self_confidence === "strong" ? "really sure" : s.self_confidence === "solid" ? "pretty sure" : s.self_confidence === "shaky" ? "unsure" : "";
      const answer = clipText(s.attempt2 || s.attempt1, 700);
      const feedback = clipText(s.teacher_feedback, 240);
      return `- ${title}: ${grade}${sure ? `, felt ${sure}` : ""}.${answer ? ` Their answer: ${answer}` : ""}${feedback ? ` Teacher's note: ${feedback}` : ""}`;
    });
    return `${label[id]}:\n${rows.length ? rows.join("\n") : "- No turned-in work on this standard yet."}`;
  }).join("\n\n");

  const wording = standardWording(subject, code);
  const system = "You help a Texas elementary teacher plan a 10-minute small-group lesson at a kidney table. Write in plain, warm teacher language. No emoji. Short sentences. Stay on the standard. Only describe what the students' work actually shows; if there is no work, plan from the standard. Reply with ONLY a JSON object.";
  const prompt = `Grade ${cls.grade || "?"} ${subject}. TEKS ${code}: ${wording || "(wording not on file)"}
${targets.length ? `Learning targets from the activities: ${targets.join(" | ")}` : ""}

The group's work on this standard:
${work}

Return JSON exactly like this:
{
  "mixUp": "One or two sentences: the mix-up these students seem to share.",
  "steps": ["Step 1 (about 3 minutes): …", "Step 2 …", "Step 3 …"],
  "materials": "Short list of simple things to have at the table, or empty string.",
  "questions": [{"q": "A quick check question a student answers out loud or on a whiteboard.", "a": "The answer the teacher listens for."}],
  "students": [{"id": "S1", "note": "One short line on what this student's work shows, or what to watch for."}]
}
Give exactly 3 steps and exactly 3 questions, at grade ${cls.grade || "level"}. One students entry per student listed above.`;

  const raw = await callClaude({ system, messages: [{ role: "user", content: prompt }], max_tokens: 1400 });
  const parsed = extractJSON(raw);
  const back = Object.fromEntries(Object.entries(label).map(([id, l]) => [l, id]));
  return {
    mixUp: String(parsed.mixUp || "").slice(0, 600),
    steps: (Array.isArray(parsed.steps) ? parsed.steps : []).slice(0, 4).map((s) => String(s).slice(0, 400)),
    materials: String(parsed.materials || "").slice(0, 300),
    questions: (Array.isArray(parsed.questions) ? parsed.questions : []).slice(0, 4).map((q) => ({ q: String(q?.q || "").slice(0, 400), a: String(q?.a || "").slice(0, 300) })).filter((q) => q.q),
    students: (Array.isArray(parsed.students) ? parsed.students : [])
      .map((s) => ({ studentId: back[s?.id], note: String(s?.note || "").slice(0, 300) }))
      .filter((s) => s.studentId && s.note),
    targets,
    wording,
  };
}

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return fail("Bad request."); }
  const teacherId = await teacherFrom(body.accessToken);
  if (!teacherId) return fail("Your session expired. Refresh the page and try again.", 401);
  const action = body.action;

  if (action === "list") {
    let query = supabaseAdmin.from("small_groups").select("*").eq("teacher_id", teacherId).order("created_at", { ascending: false });
    if (body.classId) query = query.eq("class_id", body.classId);
    const { data: groups, error } = await query;
    if (error) return tableMissing(error) ? NextResponse.json({ groups: [], notes: [], setup: MISSING_TABLE }) : fail(error.message, 500);
    const groupIds = (groups || []).map((g) => g.id);
    const { data: notes } = groupIds.length
      ? await supabaseAdmin.from("small_group_notes").select("*").in("group_id", groupIds).order("met_at", { ascending: false })
      : { data: [] };
    return NextResponse.json({ groups: groups || [], notes: notes || [] });
  }

  if (action === "get") {
    const { group, error } = await ownGroup(teacherId, body.groupId);
    if (error) return fail(error, 404);
    const { data: notes } = await supabaseAdmin.from("small_group_notes").select("*").eq("group_id", group.id).order("met_at", { ascending: false });
    return NextResponse.json({ group, notes: notes || [] });
  }

  if (action === "create") {
    const cls = await ownsClass(teacherId, body.classId);
    if (!cls) return fail("That class isn't one of yours.", 403);
    const studentIds = cleanIds(body.studentIds);
    if (!studentIds.length) return fail("Pick at least one student.");
    const { data: roster } = await supabaseAdmin.from("students").select("id").eq("class_id", cls.id).in("id", studentIds);
    const allowed = (roster || []).map((s) => s.id);
    const levels = {};
    allowed.forEach((id) => {
      const l = body.startLevels ? body.startLevels[id] : null;
      levels[id] = l === 0 || l === 1 || l === 2 ? l : null;
    });
    const row = {
      teacher_id: teacherId,
      class_id: cls.id,
      name: String(body.name || "Small group").trim().slice(0, 80) || "Small group",
      subject: body.subject ? String(body.subject).slice(0, 40) : null,
      standard_code: body.standardCode ? String(body.standardCode).slice(0, 20) : null,
      standard_key: body.standardKey ? String(body.standardKey).slice(0, 80) : null,
      student_ids: allowed,
      start_levels: levels,
    };
    const { data, error } = await supabaseAdmin.from("small_groups").insert(row).select("*").single();
    if (error) return fail(tableMissing(error) ? MISSING_TABLE : error.message, 500);
    return NextResponse.json({ group: data });
  }

  if (action === "update") {
    const { group, error } = await ownGroup(teacherId, body.groupId);
    if (error) return fail(error, 404);
    const patch = {};
    const p = body.patch || {};
    if (typeof p.name === "string" && p.name.trim()) patch.name = p.name.trim().slice(0, 80);
    if (Array.isArray(p.studentIds)) {
      const ids = cleanIds(p.studentIds);
      const { data: roster } = ids.length ? await supabaseAdmin.from("students").select("id").eq("class_id", group.class_id).in("id", ids) : { data: [] };
      patch.student_ids = (roster || []).map((s) => s.id);
      const levels = { ...(group.start_levels || {}) };
      patch.student_ids.forEach((id) => {
        if (!(id in levels)) {
          const l = p.startLevels ? p.startLevels[id] : null;
          levels[id] = l === 0 || l === 1 || l === 2 ? l : null;
        }
      });
      patch.start_levels = levels;
    }
    if (Array.isArray(p.doneIds)) patch.done_ids = cleanIds(p.doneIds);
    if (p.status === "open" || p.status === "closed") {
      patch.status = p.status;
      patch.closed_at = p.status === "closed" ? new Date().toISOString() : null;
    }
    if (!Object.keys(patch).length) return fail("Nothing to change.");
    const { data, error: upError } = await supabaseAdmin.from("small_groups").update(patch).eq("id", group.id).select("*").single();
    if (upError) return fail(upError.message, 500);
    return NextResponse.json({ group: data });
  }

  if (action === "meet") {
    const { group, error } = await ownGroup(teacherId, body.groupId);
    if (error) return fail(error, 404);
    const members = new Set(group.student_ids || []);
    const metAt = new Date().toISOString();
    const rows = (Array.isArray(body.entries) ? body.entries : [])
      .filter((e) => e && members.has(e.studentId))
      .map((e) => ({
        group_id: group.id,
        teacher_id: teacherId,
        student_id: e.studentId,
        check_result: e.check === "got" || e.check === "shaky" ? e.check : null,
        note: e.note ? String(e.note).trim().slice(0, 500) : null,
        met_at: metAt,
      }))
      .filter((r) => r.check_result || r.note);
    if (!rows.length) return fail("Tap Got it now or Still shaky, or write a note, for at least one student.");
    const { error: insError } = await supabaseAdmin.from("small_group_notes").insert(rows);
    if (insError) return fail(insError.message, 500);
    const { data: notes } = await supabaseAdmin.from("small_group_notes").select("*").eq("group_id", group.id).order("met_at", { ascending: false });
    return NextResponse.json({ notes: notes || [] });
  }

  if (action === "plan") {
    const { group, error } = await ownGroup(teacherId, body.groupId);
    if (error) return fail(error, 404);
    if (!group.standard_code) return fail("This group isn't tied to a standard, so there's nothing to plan from.");
    const cls = await ownsClass(teacherId, group.class_id);
    if (!cls) return fail("That class isn't one of yours.", 403);
    let plan;
    try {
      plan = await makePlan(group, cls);
    } catch (err) {
      return fail(`Couldn't make a plan right now. ${err.message || ""}`.trim(), 502);
    }
    const planAt = new Date().toISOString();
    const { data, error: upError } = await supabaseAdmin.from("small_groups").update({ plan, plan_at: planAt }).eq("id", group.id).select("*").single();
    if (upError) return fail(upError.message, 500);
    return NextResponse.json({ group: data });
  }

  if (action === "delete") {
    const { group, error } = await ownGroup(teacherId, body.groupId);
    if (error) return fail(error, 404);
    await supabaseAdmin.from("small_group_notes").delete().eq("group_id", group.id);
    const { error: delError } = await supabaseAdmin.from("small_groups").delete().eq("id", group.id);
    if (delError) return fail(delError.message, 500);
    return NextResponse.json({ ok: true });
  }

  return fail("Unknown action.");
}
