import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import {
  getStudentFromCookie,
  assertStudentCanAccessAssignment,
  fetchOpenSessionForAssignment,
  fetchParticipants,
  serializeSession,
} from "../../../../../lib/signal-ops/sessionHelpers";
import {
  advanceLiveSession,
  maybeOpenVoteAfterContribute,
} from "../../../../../lib/signal-ops/sessionSim";
import { SALVAGE_PER_CORRECT, POWER_PER_CORRECT } from "../../../../../lib/signal-ops/gameConfig";

// Correct-answer contribution only. Wrong answers must never call this.
// Personal blast stays client-side. V1.5 also restores Power against drain
// and may open a class upgrade vote when Salvage crosses the threshold.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { assignmentId } = body || {};

  if (!assignmentId) {
    return NextResponse.json({ error: "Missing assignmentId." }, { status: 400 });
  }

  const student = await getStudentFromCookie();
  if (!student) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const access = await assertStudentCanAccessAssignment(student, assignmentId);
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  let session = await fetchOpenSessionForAssignment(assignmentId);
  if (!session) {
    return NextResponse.json({ error: "No live session." }, { status: 404 });
  }
  if (session.status !== "live") {
    return NextResponse.json({ error: "Session is not live yet." }, { status: 409 });
  }
  if (session.outcome && session.outcome !== "ongoing") {
    return NextResponse.json({ error: "Session already wrapped." }, { status: 409 });
  }

  const { data: participant } = await supabaseAdmin
    .from("signal_ops_participants")
    .select("id, correct_count")
    .eq("session_id", session.id)
    .eq("student_id", student.id)
    .maybeSingle();

  if (!participant) {
    return NextResponse.json({ error: "Join the session first." }, { status: 403 });
  }

  // Tick first so drain/vote/wave stay authoritative before the bump.
  try {
    session = await advanceLiveSession(session);
  } catch (err) {
    console.error("Signal Ops pre-contribute tick failed:", err);
  }
  if (!session || session.status !== "live" || (session.outcome && session.outcome !== "ongoing")) {
    const participants = session ? await fetchParticipants(session.id) : [];
    return NextResponse.json(
      session
        ? serializeSession(session, participants, { myStudentId: student.id })
        : { error: "Session ended." },
      { status: session ? 200 : 409 }
    );
  }

  const nextSalvage = session.salvage + SALVAGE_PER_CORRECT;
  const nextPower = Math.min(100, session.power + POWER_PER_CORRECT);
  const nextTotal = session.total_correct + 1;

  const { data: updated, error } = await supabaseAdmin
    .from("signal_ops_sessions")
    .update({
      salvage: nextSalvage,
      power: nextPower,
      total_correct: nextTotal,
    })
    .eq("id", session.id)
    .eq("status", "live")
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabaseAdmin
    .from("signal_ops_participants")
    .update({
      correct_count: (participant.correct_count || 0) + 1,
      last_seen_at: new Date().toISOString(),
    })
    .eq("id", participant.id);

  let finalSession = updated;
  try {
    finalSession = await maybeOpenVoteAfterContribute(updated);
  } catch (err) {
    console.error("Signal Ops vote-open failed:", err);
  }

  const participants = await fetchParticipants(session.id);
  return NextResponse.json(serializeSession(finalSession, participants, { myStudentId: student.id }));
}
