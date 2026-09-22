import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { TRACK_LEVELS, normalizeAccommodations } from "../../../../lib/cases/relay-station";

// SERVER ONLY. Teacher side of the Relay Station Foundations Track
// (design doc: claude/RelayStation_Digital_Design_v1.md §9).
//
//   action "list"     -> every active student in one of the teacher's classes
//                        + their track progress row (or none yet)
//   action "setLevel" -> move one student to a level (placement: skip a
//                        strong typist ahead, or send someone back)
//
// relay_station_progress has RLS on with no policies, so every read/write
// goes through here with the admin key after an ownership check — same
// pattern as app/api/teacher/roster/student/route.js.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { accessToken, action, classId, studentId, level } = body;
  if (!accessToken || !action) {
    return NextResponse.json({ error: "Missing action or session." }, { status: 400 });
  }

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Your session expired — refresh the page and try again." }, { status: 401 });
  }
  const teacherId = userData.user.id;
  const total = TRACK_LEVELS.length;

  if (action === "list") {
    if (!classId) return NextResponse.json({ error: "Pick a class." }, { status: 400 });
    const { data: cls } = await supabaseAdmin.from("classes").select("id, teacher_id").eq("id", classId).maybeSingle();
    if (!cls || cls.teacher_id !== teacherId) {
      return NextResponse.json({ error: "That class doesn't belong to you." }, { status: 403 });
    }
    const { data: students, error: stuError } = await supabaseAdmin
      .from("students")
      .select("id, first_name, active")
      .eq("class_id", classId)
      .order("first_name");
    if (stuError) return NextResponse.json({ error: stuError.message }, { status: 500 });
    const activeStudents = (students || []).filter((s) => s.active !== false);
    const ids = activeStudents.map((s) => s.id);
    let progressRows = [];
    if (ids.length) {
      const { data, error } = await supabaseAdmin
        .from("relay_station_progress")
        .select("student_id, current_level, level_results, completed_at, updated_at, placement, accommodations, daily")
        .in("student_id", ids);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      progressRows = data || [];
    }
    const byStudent = Object.fromEntries(progressRows.map((p) => [p.student_id, p]));
    return NextResponse.json({
      total,
      students: activeStudents.map((s) => ({ id: s.id, firstName: s.first_name, progress: byStudent[s.id] || null })),
    });
  }

  // Standards report (Tech Apps (c)(12)(C) keyboarding): one summary row per
  // class — how far students have climbed the Foundations Track.
  if (action === "summary") {
    const { data: classes } = await supabaseAdmin.from("classes").select("id, name, grade").eq("teacher_id", teacherId).order("name");
    const classIds = (classes || []).map((c) => c.id);
    if (!classIds.length) return NextResponse.json({ total, classes: [] });
    const { data: students } = await supabaseAdmin.from("students").select("id, class_id, active").in("class_id", classIds);
    const active = (students || []).filter((s) => s.active !== false);
    const ids = active.map((s) => s.id);
    let rows = [];
    if (ids.length) {
      const { data } = await supabaseAdmin.from("relay_station_progress").select("student_id, current_level, level_results, completed_at").in("student_id", ids);
      rows = data || [];
    }
    const byStudent = Object.fromEntries(rows.map((r) => [r.student_id, r]));
    const summary = (classes || []).map((c) => {
      const kids = active.filter((s) => s.class_id === c.id);
      const started = kids.filter((s) => byStudent[s.id]);
      const passedCounts = started.map((s) => Math.min(byStudent[s.id].current_level - 1, total));
      const accs = [];
      started.forEach((s) => Object.values(byStudent[s.id].level_results || {}).forEach((r) => { if (r && r.passed && !r.placed && typeof r.accuracy === "number") accs.push(r.accuracy); }));
      const wpms = [];
      started.forEach((s) => Object.values(byStudent[s.id].level_results || {}).forEach((r) => { if (r && r.passed && !r.placed && typeof r.wpm === "number") wpms.push(r.wpm); }));
      const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null);
      return {
        classId: c.id,
        className: c.name,
        grade: c.grade || null,
        studentCount: kids.length,
        startedCount: started.length,
        completedCount: started.filter((s) => byStudent[s.id].completed_at).length,
        avgLevelsPassed: avg(passedCounts),
        avgAccuracy: avg(accs),
        avgWpm: avg(wpms),
      };
    });
    return NextResponse.json({ total, classes: summary });
  }

  if (action === "setLevel") {
    const lvl = Math.floor(Number(level) || 0);
    if (!studentId || lvl < 1 || lvl > total) {
      return NextResponse.json({ error: "Pick a level between 1 and " + total + "." }, { status: 400 });
    }
    const { data: student } = await supabaseAdmin
      .from("students")
      .select("id, classes(teacher_id)")
      .eq("id", studentId)
      .maybeSingle();
    if (!student || student.classes?.teacher_id !== teacherId) {
      return NextResponse.json({ error: "That student doesn't belong to one of your classes." }, { status: 403 });
    }
    const { data: existing } = await supabaseAdmin
      .from("relay_station_progress")
      .select("level_results")
      .eq("student_id", studentId)
      .maybeSingle();
    const { error } = await supabaseAdmin.from("relay_station_progress").upsert(
      {
        student_id: studentId,
        current_level: lvl,
        level_results: (existing && existing.level_results) || {},
        completed_at: null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "student_id" }
    );
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  // Wave 1: per-student supports (large text, dyslexia-friendly font,
  // reduced motion, hide live speed, lower pass bar by 5 or 10 points).
  if (action === "setAccommodations") {
    if (!studentId) return NextResponse.json({ error: "Pick a student." }, { status: 400 });
    const { data: student } = await supabaseAdmin
      .from("students")
      .select("id, classes(teacher_id)")
      .eq("id", studentId)
      .maybeSingle();
    if (!student || student.classes?.teacher_id !== teacherId) {
      return NextResponse.json({ error: "That student doesn't belong to one of your classes." }, { status: 403 });
    }
    const accommodations = normalizeAccommodations(body.accommodations);
    const { data: existing } = await supabaseAdmin
      .from("relay_station_progress")
      .select("student_id")
      .eq("student_id", studentId)
      .maybeSingle();
    const { error } = existing
      ? await supabaseAdmin.from("relay_station_progress").update({ accommodations }).eq("student_id", studentId)
      : await supabaseAdmin.from("relay_station_progress").insert({ student_id: studentId, current_level: 1, level_results: {}, accommodations });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, accommodations });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
