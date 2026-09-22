import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getAssemblyDeckServerCase } from "../../../../lib/cases/assembly-deck/index.server";
import { getAssemblyDeckPublicCase, REJECT_REASONS, getRound } from "../../../../lib/cases/assembly-deck/index.public";

// SERVER ONLY. Teacher side of Assembly Deck (design doc §7).
//
//   action "list" -> every finished Assembly Deck build in one class, rolled
//                    up into the thing no other engine can tell a teacher:
//                    WHICH KIND of bad sentence each student let through, and
//                    what they called it when they caught it.
//
// Everything here is recomputed from submissions.assembly_deck_data against
// the case keys — the client's own scoring is never trusted, and no new table
// was added for this.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { accessToken, action, classId } = body;
  if (!accessToken || !action) return NextResponse.json({ error: "Missing action or session." }, { status: 400 });

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Your session expired — refresh the page and try again." }, { status: 401 });
  }
  const teacherId = userData.user.id;

  if (action !== "list") return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  if (!classId) return NextResponse.json({ error: "Pick a class." }, { status: 400 });

  const { data: cls } = await supabaseAdmin.from("classes").select("id, teacher_id").eq("id", classId).maybeSingle();
  if (!cls || cls.teacher_id !== teacherId) return NextResponse.json({ error: "That class doesn't belong to you." }, { status: 403 });

  const { data: students } = await supabaseAdmin
    .from("students").select("id, first_name, active").eq("class_id", classId).order("first_name");
  const active = (students || []).filter((s) => s.active !== false);
  const nameOf = Object.fromEntries(active.map((s) => [s.id, s.first_name]));

  const { data: assignments } = await supabaseAdmin
    .from("assignments").select("id, case_standard").eq("class_id", classId);
  const deckAssignments = (assignments || []).filter((a) => !!getAssemblyDeckServerCase(a.case_standard));
  if (!deckAssignments.length) return NextResponse.json({ reasons: REJECT_REASONS, assignments: [], students: [], confusion: [], slots: [], totals: null });

  const { data: subs } = await supabaseAdmin
    .from("submissions")
    .select("assignment_id, student_id, assembly_deck_data, ai_score, submitted_at")
    .in("assignment_id", deckAssignments.map((a) => a.id));

  const caseOf = Object.fromEntries(deckAssignments.map((a) => [a.id, a.case_standard]));
  const rows = (subs || []).filter((s) => s.submitted_at && s.assembly_deck_data && nameOf[s.student_id]);

  // confusion[actual][chosen] — when a sentence really was an opinion, what
  // did students call it? The diagonal is "got it right".
  const confusion = {};
  REJECT_REASONS.forEach((r) => { confusion[r.key] = { total: 0, byChoice: {} }; });
  // how often each slot type is filled correctly, across every case
  const slots = {};
  const perStudent = {};

  rows.forEach((row) => {
    const standard = caseOf[row.assignment_id];
    const serverCase = getAssemblyDeckServerCase(standard);
    const publicCase = getAssemblyDeckPublicCase(standard);
    if (!serverCase || !publicCase) return;
    const d = row.assembly_deck_data;
    const st = (perStudent[row.student_id] = perStudent[row.student_id] || {
      id: row.student_id, name: nameOf[row.student_id], builds: 0,
      placement: { correct: 0, total: 0 }, decoys: { correct: 0, total: 0 },
      assembly: { correct: 0, total: 0 }, missedBy: {}, traps: { caught: 0, offered: 0 },
      challenge: 0, lastScore: null,
    });
    st.builds += 1;
    st.lastScore = row.ai_score;
    if (d.challenge) st.challenge += 1;
    if (d.trapCaught) st.traps.caught += 1;
    st.traps.offered += 1;
    ["placement", "decoys"].forEach((k) => {
      if (d[k]) { st[k].correct += d[k].correct || 0; st[k].total += d[k].total || 0; }
    });
    if (d.assemblyScore) { st.assembly.correct += d.assemblyScore.correct || 0; st.assembly.total += d.assemblyScore.total || 0; }

    Object.entries(serverCase.rounds || {}).forEach(([roundId, rk]) => {
      // which reason each leftover really was, and what the student called it
      const answers = (d.rejections || {})[roundId] || {};
      Object.entries(rk.decoyReason || {}).forEach(([pieceId, actual]) => {
        const chosen = answers[pieceId] || "(no answer)";
        confusion[actual].total += 1;
        confusion[actual].byChoice[chosen] = (confusion[actual].byChoice[chosen] || 0) + 1;
        if (chosen !== actual) st.missedBy[actual] = (st.missedBy[actual] || 0) + 1;
      });
      // which slot type gets filled wrong
      const board = (d.boards || {})[roundId] || {};
      const round = getRound(publicCase, roundId);
      Object.entries(rk.key || {}).forEach(([slotId, ids]) => {
        const label = ((round && round.slots.find((s) => s.id === slotId)) || {}).label || slotId;
        const bucket = (slots[label] = slots[label] || { label, correct: 0, total: 0 });
        const placedHere = board[slotId] || [];
        ids.forEach((id) => {
          bucket.total += 1;
          if (placedHere.includes(id)) bucket.correct += 1;
        });
      });
    });
  });

  const totals = rows.length
    ? {
        builds: rows.length,
        students: Object.keys(perStudent).length,
        ofClass: active.length,
        placement: Object.values(perStudent).reduce((a, s) => ({ correct: a.correct + s.placement.correct, total: a.total + s.placement.total }), { correct: 0, total: 0 }),
        decoys: Object.values(perStudent).reduce((a, s) => ({ correct: a.correct + s.decoys.correct, total: a.total + s.decoys.total }), { correct: 0, total: 0 }),
      }
    : null;

  return NextResponse.json({
    reasons: REJECT_REASONS,
    assignments: deckAssignments.map((a) => ({ id: a.id, standard: a.case_standard, title: (getAssemblyDeckPublicCase(a.case_standard) || {}).title || a.case_standard })),
    students: Object.values(perStudent).sort((a, b) => a.name.localeCompare(b.name)),
    notStarted: active.filter((s) => !perStudent[s.id]).map((s) => s.first_name),
    confusion: REJECT_REASONS.map((r) => ({ key: r.key, label: r.short, ...confusion[r.key] })),
    slots: Object.values(slots).sort((a, b) => (a.correct / (a.total || 1)) - (b.correct / (b.total || 1))),
    totals,
  });
}
