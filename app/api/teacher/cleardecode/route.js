import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { PROGRESS_COLS, readClassWords, suggestClassWords } from "../../../../lib/cleardecodeServer";
import { getRuin, cleanClassWords, dateKey, needsHelp, getRuinContent } from "../../../../lib/cleardecode";
import { weekRange } from "../../../../lib/clearkeysFuel";

// ClearDecode teacher actions (Sept 30, 2026). Design: claude/ClearDecode_Design_v1.md §10.
//   list         -> students in the class + their ClearDecode rows + class words
//   sendScan     -> send the placement scan to the whole class (or some students)
//   turnOn       -> turn ClearDecode on for students (starts at their scan result)
//   turnOff      -> turn it off for one student (progress is kept)
//   placeAt      -> move a student to a ruin (also unlocks today's session)
//   setPassMark  -> vault pass mark, 80 or 90
//   getWords / saveWords / suggestWords -> this week's class words
const NEEDS_SQL = "ClearDecode needs a quick database update first (add_clearcode.sql).";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { accessToken, action, classId } = body;
  if (!accessToken || !action || !classId) return NextResponse.json({ error: "Missing class or session." }, { status: 400 });
  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if (userError || !userData?.user) return NextResponse.json({ error: "Your session expired — refresh the page and try again." }, { status: 401 });
  const { data: cls } = await supabaseAdmin.from("classes").select("id, teacher_id, name").eq("id", classId).maybeSingle();
  if (!cls || cls.teacher_id !== userData.user.id) return NextResponse.json({ error: "That class isn't yours." }, { status: 403 });

  const { data: students } = await supabaseAdmin.from("students").select("id, first_name, active").eq("class_id", classId).order("first_name");
  const active = (students || []).filter((s) => s.active !== false);
  const inClass = new Set(active.map((s) => s.id));
  const pickIds = (ids) => (Array.isArray(ids) ? ids.filter((id) => inClass.has(id)) : []);

  if (action === "list") {
    const ids = active.map((s) => s.id);
    let rows = [];
    if (ids.length) {
      const { data, error } = await supabaseAdmin.from("clearcode_progress").select(PROGRESS_COLS).in("student_id", ids);
      if (error) return NextResponse.json({ error: NEEDS_SQL, needsSql: true }, { status: 500 });
      rows = data || [];
    }
    const byId = Object.fromEntries(rows.map((r) => [r.student_id, r]));
    const words = await readClassWords(classId);
    return NextResponse.json({
      className: cls.name,
      students: active.map((s) => {
        const p = byId[s.id] || null;
        const h = needsHelp(p);
        return { id: s.id, firstName: s.first_name, progress: p, miniLesson: h ? ((getRuinContent(h.ruin) || {}).miniLesson || null) : null };
      }),
      classWords: words.words,
      weekOf: words.weekOf,
    });
  }

  if (action === "sendScan") {
    const targets = body.studentIds ? pickIds(body.studentIds) : active.map((s) => s.id);
    if (!targets.length) return NextResponse.json({ error: "No students to send the scan to." }, { status: 400 });
    const { data: existing, error } = await supabaseAdmin.from("clearcode_progress").select("student_id, status, scan").in("student_id", targets);
    if (error) return NextResponse.json({ error: NEEDS_SQL, needsSql: true }, { status: 500 });
    const have = Object.fromEntries((existing || []).map((r) => [r.student_id, r]));
    const sentAt = new Date().toISOString();
    const inserts = targets.filter((id) => !have[id]).map((id) => ({ student_id: id, class_id: classId, status: "scan", scan: { pending: true, tested: {}, sentAt } }));
    if (inserts.length) {
      const { error: insErr } = await supabaseAdmin.from("clearcode_progress").insert(inserts);
      if (insErr) return NextResponse.json({ error: "Couldn't send the scan. Try again." }, { status: 500 });
    }
    for (const id of targets.filter((x) => have[x])) {
      const row = have[id];
      const scan = { ...(row.scan || {}), pending: true, tested: {}, sentAt };
      const status = row.status === "on" ? "on" : "scan";
      await supabaseAdmin.from("clearcode_progress").update({ scan, status, class_id: classId, updated_at: sentAt }).eq("student_id", id);
    }
    return NextResponse.json({ sent: targets.length });
  }

  if (action === "turnOn") {
    const targets = pickIds(body.studentIds);
    if (!targets.length) return NextResponse.json({ error: "Pick at least one student." }, { status: 400 });
    const { data: rows, error } = await supabaseAdmin.from("clearcode_progress").select("student_id, current_ruin, scan").in("student_id", targets);
    if (error) return NextResponse.json({ error: NEEDS_SQL, needsSql: true }, { status: 500 });
    const have = Object.fromEntries((rows || []).map((r) => [r.student_id, r]));
    for (const id of targets) {
      const row = have[id];
      const start = (row && row.current_ruin) || (row && row.scan && row.scan.result && row.scan.result.startRuin) || "A1";
      if (row) await supabaseAdmin.from("clearcode_progress").update({ status: "on", current_ruin: start, updated_at: new Date().toISOString() }).eq("student_id", id);
      else await supabaseAdmin.from("clearcode_progress").insert({ student_id: id, class_id: classId, status: "on", current_ruin: start, scan: {} });
    }
    return NextResponse.json({ on: targets.length });
  }

  const one = body.studentId && inClass.has(body.studentId) ? body.studentId : null;

  if (action === "turnOff") {
    if (!one) return NextResponse.json({ error: "Pick a student." }, { status: 400 });
    await supabaseAdmin.from("clearcode_progress").update({ status: "off", updated_at: new Date().toISOString() }).eq("student_id", one);
    return NextResponse.json({ ok: true });
  }

  if (action === "placeAt") {
    if (!one || !getRuin(body.ruin)) return NextResponse.json({ error: "Pick a student and a ruin." }, { status: 400 });
    const { data: row } = await supabaseAdmin.from("clearcode_progress").select("log").eq("student_id", one).maybeSingle();
    const today = dateKey();
    const log = Array.isArray(row && row.log) ? row.log.map((e) => (e.date === today ? { ...e, placed: true } : e)) : [];
    const fields = { current_ruin: body.ruin, status: "on", chamber: null, log, updated_at: new Date().toISOString() };
    if (row) await supabaseAdmin.from("clearcode_progress").update(fields).eq("student_id", one);
    else await supabaseAdmin.from("clearcode_progress").insert({ student_id: one, class_id: classId, scan: {}, ...fields });
    return NextResponse.json({ ok: true });
  }

  if (action === "setPassMark") {
    const mark = Number(body.mark) === 90 ? 90 : 80;
    if (!one) return NextResponse.json({ error: "Pick a student." }, { status: 400 });
    await supabaseAdmin.from("clearcode_progress").update({ pass_mark: mark, updated_at: new Date().toISOString() }).eq("student_id", one);
    return NextResponse.json({ mark });
  }

  if (action === "getWords") {
    const words = await readClassWords(classId);
    const suggested = await suggestClassWords(classId).catch(() => []);
    return NextResponse.json({ ...words, suggested });
  }

  if (action === "saveWords") {
    const words = cleanClassWords(body.words);
    const { error } = await supabaseAdmin.from("classes").update({ clearcode_settings: { weekOf: weekRange().start, words } }).eq("id", classId);
    if (error) return NextResponse.json({ error: NEEDS_SQL, needsSql: true }, { status: 500 });
    return NextResponse.json({ words, weekOf: weekRange().start });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
