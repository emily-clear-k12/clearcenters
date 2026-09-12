import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../../lib/supabaseAdmin";
import {
  getStudentFromCookie,
  assertStudentCanAccessAssignment,
  fetchOpenSessionForAssignment,
  fetchParticipants,
  serializeSession,
} from "../../../../../../lib/signal-ops/sessionHelpers";
import {
  advanceLiveSession,
  recomputeVoteTallies,
  voteIsOpen,
} from "../../../../../../lib/signal-ops/sessionSim";

// Student casts (or changes) their class upgrade vote during an open window.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { assignmentId, upgradeId } = body || {};

  if (!assignmentId || !upgradeId) {
    return NextResponse.json({ error: "Missing assignmentId or upgradeId." }, { status: 400 });
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

  try {
    session = await advanceLiveSession(session);
  } catch (err) {
    console.error("Signal Ops vote tick failed:", err);
  }

  if (!session || session.status !== "live") {
    const participants = session ? await fetchParticipants(session.id) : [];
    return NextResponse.json(
      session
        ? serializeSession(session, participants, { myStudentId: student.id })
        : { error: "Session ended." },
      { status: session ? 200 : 409 }
    );
  }

  if (!voteIsOpen(session.vote)) {
    return NextResponse.json({ error: "No open vote right now." }, { status: 409 });
  }

  const options = Array.isArray(session.vote.options) ? session.vote.options : [];
  if (!options.includes(upgradeId)) {
    return NextResponse.json({ error: "That upgrade is not on the ballot." }, { status: 400 });
  }

  const { data: participant } = await supabaseAdmin
    .from("signal_ops_participants")
    .select("id")
    .eq("session_id", session.id)
    .eq("student_id", student.id)
    .maybeSingle();

  if (!participant) {
    return NextResponse.json({ error: "Join the session first." }, { status: 403 });
  }

  await supabaseAdmin
    .from("signal_ops_participants")
    .update({
      vote_choice: upgradeId,
      last_seen_at: new Date().toISOString(),
    })
    .eq("id", participant.id);

  const tallies = await recomputeVoteTallies(session.id, options);
  const nextVote = { ...session.vote, tallies };

  const { data: updated, error } = await supabaseAdmin
    .from("signal_ops_sessions")
    .update({ vote: nextVote })
    .eq("id", session.id)
    .eq("status", "live")
    .select("*")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const participants = await fetchParticipants(session.id);
  return NextResponse.json(
    serializeSession(updated || { ...session, vote: nextVote }, participants, {
      myStudentId: student.id,
    })
  );
}
