import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { computeRun, RACE_CRYSTALS, RACE_STALE_SECONDS } from "../../../../lib/cases/relay-station";

// Class Relay Race — student side (Wave 3, design doc §15).
//   action "state"  -> the class's current race (live, or finished in the last 30 min)
//   action "claim"  -> give me a leg: my unfinished one, else the next open
//                      leg, else a leg someone claimed > RACE_STALE_SECONDS ago
//                      and hasn't finished (helping a teammate)
//   action "finish" -> I typed my leg; when the LAST leg lands, the race is
//                      done and everyone who carried a leg gets crystals
// Leg text is only sent for legs that are done (the message reveals as the
// class types) and for the leg the student is typing.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const { assignmentId, action } = body;

  const { data: student } = await supabaseAdmin.from("students").select("id, class_id").eq("id", studentId).single();
  const { data: assignment } = await supabaseAdmin.from("assignments").select("id, class_id").eq("id", assignmentId).single();
  if (!student || !assignment || assignment.class_id !== student.class_id) {
    return NextResponse.json({ error: "Assignment not found." }, { status: 404 });
  }

  const race = await currentRace(student.class_id);
  if (!race) return NextResponse.json({ race: null });

  if (action === "claim") {
    if (race.status !== "live") return NextResponse.json(await buildState(race, studentId));
    const now = new Date();
    const legs = await getLegs(race.id);
    const mine = legs.find((l) => l.student_id === studentId && !l.done_at);
    if (mine) return NextResponse.json({ ...(await buildState(race, studentId)), myLeg: { index: mine.leg_index, text: race.legs[mine.leg_index] } });

    // Next open leg, first come first served. The conditional update means two
    // students can never end up with the same leg.
    const open = legs.filter((l) => !l.student_id).map((l) => l.leg_index).sort((a, b) => a - b);
    for (const idx of open) {
      const { data: got } = await supabaseAdmin
        .from("relay_race_legs")
        .update({ student_id: studentId, claimed_at: now.toISOString() })
        .eq("race_id", race.id).eq("leg_index", idx).is("student_id", null)
        .select("leg_index");
      if (got && got.length) return NextResponse.json({ ...(await buildState(race, studentId)), myLeg: { index: idx, text: race.legs[idx] } });
    }
    // Help a teammate: a leg claimed a while ago that still isn't finished.
    const cutoff = new Date(now.getTime() - RACE_STALE_SECONDS * 1000).toISOString();
    const staleMs = now.getTime() - RACE_STALE_SECONDS * 1000;
    const stale = legs.filter((l) => l.student_id && !l.done_at && new Date(l.claimed_at).getTime() < staleMs).sort((a, b) => a.leg_index - b.leg_index);
    for (const l of stale) {
      const { data: got } = await supabaseAdmin
        .from("relay_race_legs")
        .update({ student_id: studentId, claimed_at: now.toISOString() })
        .eq("race_id", race.id).eq("leg_index", l.leg_index).is("done_at", null).lt("claimed_at", cutoff)
        .select("leg_index");
      if (got && got.length) return NextResponse.json({ ...(await buildState(race, studentId)), myLeg: { index: l.leg_index, text: race.legs[l.leg_index] }, helping: true });
    }
    return NextResponse.json({ ...(await buildState(race, studentId)), myLeg: null, note: "Every leg is being typed right now. Cheer your crew on — if someone gets stuck, you can pick up their leg in a minute!" });
  }

  if (action === "finish") {
    const idx = Math.floor(Number(body.legIndex));
    const text = race.legs[idx];
    if (text === undefined) return NextResponse.json({ error: "No such leg." }, { status: 400 });
    const r = body.result || {};
    const errors = Math.max(0, Math.floor(Number(r.errors) || 0));
    const { wpm, accuracy } = computeRun({ chars: text.length, keystrokes: Math.floor(Number(r.keystrokes) || 0), errors, ms: Number(r.ms) || 0 });
    const { data: updated } = await supabaseAdmin
      .from("relay_race_legs")
      .update({ done_at: new Date().toISOString(), wpm, accuracy })
      .eq("race_id", race.id).eq("leg_index", idx).eq("student_id", studentId).is("done_at", null)
      .select("leg_index");
    if (!updated || !updated.length) {
      return NextResponse.json({ ...(await buildState(race, studentId)), note: "That leg was already delivered." });
    }
    const legs = await getLegs(race.id);
    if (race.status === "live" && legs.every((l) => l.done_at)) {
      // Only the request that flips live -> done hands out crystals.
      const { data: flipped } = await supabaseAdmin
        .from("relay_races")
        .update({ status: "done", ended_at: new Date().toISOString() })
        .eq("id", race.id).eq("status", "live")
        .select("id");
      if (flipped && flipped.length) {
        const carriers = [...new Set(legs.map((l) => l.student_id).filter(Boolean))];
        await Promise.all(carriers.map((id) => supabaseAdmin.rpc("increment_crystal_points", { p_student_id: id, p_amount: RACE_CRYSTALS }).then(() => null, () => null)));
      }
      race.status = "done";
      race.ended_at = new Date().toISOString();
    }
    return NextResponse.json(await buildState(race, studentId));
  }

  return NextResponse.json(await buildState(race, studentId));
}

async function currentRace(classId) {
  const { data } = await supabaseAdmin
    .from("relay_races")
    .select("id, title, legs, status, started_at, ended_at")
    .eq("class_id", classId)
    .order("started_at", { ascending: false })
    .limit(1);
  const race = data && data[0];
  if (!race) return null;
  if (race.status === "live") return race;
  const endedAgo = race.ended_at ? Date.now() - new Date(race.ended_at).getTime() : Infinity;
  return endedAgo < 30 * 60 * 1000 ? race : null;
}

async function getLegs(raceId) {
  const { data } = await supabaseAdmin
    .from("relay_race_legs")
    .select("leg_index, student_id, claimed_at, done_at")
    .eq("race_id", raceId);
  return data || [];
}

async function buildState(race, studentId) {
  const legs = await getLegs(race.id);
  const byIndex = Object.fromEntries(legs.map((l) => [l.leg_index, l]));
  const seconds = race.ended_at && race.started_at ? Math.round((new Date(race.ended_at) - new Date(race.started_at)) / 1000) : null;
  return {
    race: {
      id: race.id,
      title: race.title,
      status: race.status,
      total: race.legs.length,
      seconds,
      legs: race.legs.map((text, i) => {
        const l = byIndex[i] || {};
        const status = l.done_at ? "done" : l.student_id ? "claimed" : "open";
        return { index: i, status, text: status === "done" ? text : null, mine: l.student_id === studentId };
      }),
    },
    iFinishedALeg: legs.some((l) => l.student_id === studentId && l.done_at),
  };
}
