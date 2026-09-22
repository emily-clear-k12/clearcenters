import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { raceLegsFor } from "../../../../lib/cases/relay-station";

// Class Relay Race — teacher side (Wave 3). Same access-token + ownership
// pattern as the other teacher routes.
//   action "state" -> the class's latest race, with who is on each leg
//   action "start" -> end any live race for the class, start a new one
//   action "end"   -> stop the live race now
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { accessToken, action, classId } = body;
  if (!accessToken || !action || !classId) return NextResponse.json({ error: "Missing class, action, or session." }, { status: 400 });
  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if (userError || !userData?.user) return NextResponse.json({ error: "Your session expired — refresh the page and try again." }, { status: 401 });
  const teacherId = userData.user.id;
  const { data: cls } = await supabaseAdmin.from("classes").select("id, teacher_id").eq("id", classId).maybeSingle();
  if (!cls || cls.teacher_id !== teacherId) return NextResponse.json({ error: "That class doesn't belong to you." }, { status: 403 });

  if (action === "start") {
    const src = raceLegsFor(String(body.source || ""));
    if (!src || !src.legs.length) return NextResponse.json({ error: "Pick a message for the race." }, { status: 400 });
    const now = new Date().toISOString();
    await supabaseAdmin.from("relay_races").update({ status: "ended", ended_at: now }).eq("class_id", classId).eq("status", "live");
    const { data: race, error } = await supabaseAdmin
      .from("relay_races")
      .insert({ class_id: classId, teacher_id: teacherId, source: body.source, title: src.title, legs: src.legs, status: "live", started_at: now })
      .select("id")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const { error: legErr } = await supabaseAdmin.from("relay_race_legs").insert(src.legs.map((_, i) => ({ race_id: race.id, leg_index: i })));
    if (legErr) return NextResponse.json({ error: legErr.message }, { status: 500 });
  }

  if (action === "end") {
    await supabaseAdmin.from("relay_races").update({ status: "ended", ended_at: new Date().toISOString() }).eq("class_id", classId).eq("status", "live");
  }

  const { data: races } = await supabaseAdmin
    .from("relay_races")
    .select("id, title, legs, status, started_at, ended_at")
    .eq("class_id", classId)
    .order("started_at", { ascending: false })
    .limit(1);
  const race = races && races[0];
  if (!race) return NextResponse.json({ race: null });
  const { data: legRows } = await supabaseAdmin.from("relay_race_legs").select("leg_index, student_id, done_at, wpm, accuracy").eq("race_id", race.id);
  const ids = [...new Set((legRows || []).map((l) => l.student_id).filter(Boolean))];
  let names = {};
  if (ids.length) {
    const { data: studs } = await supabaseAdmin.from("students").select("id, first_name").in("id", ids);
    names = Object.fromEntries((studs || []).map((s) => [s.id, s.first_name]));
  }
  const byIndex = Object.fromEntries((legRows || []).map((l) => [l.leg_index, l]));
  return NextResponse.json({
    race: {
      id: race.id,
      title: race.title,
      status: race.status,
      startedAt: race.started_at,
      endedAt: race.ended_at,
      legs: race.legs.map((text, i) => {
        const l = byIndex[i] || {};
        return { index: i, text, status: l.done_at ? "done" : l.student_id ? "claimed" : "open", by: l.student_id ? names[l.student_id] || "a cadet" : null, wpm: l.wpm ?? null, accuracy: l.accuracy ?? null };
      }),
      carriers: ids.length,
    },
  });
}
