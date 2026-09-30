import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

// ClearKeys setup for one class (Sept 29, 2026).
//
//   action "status"  -> which always-on pieces (Foundations Track, Daily
//                       Transmission, Class Relay Race) this class already has
//   action "turnOn"  -> creates whichever of the three are missing, in one go,
//                       with no due date. Pieces already assigned are left
//                       alone, so pressing it twice never makes duplicates.
//
// Readings are still assigned one at a time from Assign.
const PIECES = [
  { key: "track", suffix: "TRACK", name: "Foundations Track" },
  { key: "daily", suffix: "DAILY", name: "Daily Transmission" },
  { key: "race", suffix: "RACE", name: "Class Relay Race" },
];

function pieceFor(standard) {
  const m = /^RS\.([345])\.(TRACK|DAILY|RACE)$/.exec(String(standard || ""));
  if (!m) return null;
  return PIECES.find((p) => p.suffix === m[2]) || null;
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { accessToken, action, classId } = body;
  if (!accessToken || !action || !classId) {
    return NextResponse.json({ error: "Missing class or session." }, { status: 400 });
  }
  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Your session expired — refresh the page and try again." }, { status: 401 });
  }
  const { data: cls } = await supabaseAdmin.from("classes").select("id, teacher_id, grade").eq("id", classId).maybeSingle();
  if (!cls || cls.teacher_id !== userData.user.id) {
    return NextResponse.json({ error: "That class isn't yours." }, { status: 403 });
  }

  const { data: existing, error: listError } = await supabaseAdmin
    .from("assignments")
    .select("id, case_standard, created_at")
    .eq("class_id", classId)
    .like("case_standard", "RS.%");
  if (listError) return NextResponse.json({ error: "Couldn't read this class's assignments." }, { status: 500 });

  const have = {};
  for (const a of existing || []) {
    const piece = pieceFor(a.case_standard);
    if (piece && !have[piece.key]) have[piece.key] = { id: a.id, standard: a.case_standard };
  }
  const classGrade = ["3", "4", "5"].includes(String(cls.grade)) ? String(cls.grade) : null;

  if (action === "status") {
    return NextResponse.json({ grade: classGrade, pieces: PIECES.map((p) => ({ key: p.key, name: p.name, on: !!have[p.key], assignmentId: have[p.key]?.id || null })) });
  }

  if (action === "turnOn") {
    const grade = classGrade || (["3", "4", "5"].includes(String(body.grade)) ? String(body.grade) : null);
    if (!grade) return NextResponse.json({ error: "Pick a grade for this class first.", needGrade: true }, { status: 400 });
    const rows = PIECES.filter((p) => !have[p.key]).map((p) => ({ class_id: classId, case_standard: `RS.${grade}.${p.suffix}`, due_date: null }));
    if (rows.length) {
      const { error } = await supabaseAdmin.from("assignments").insert(rows);
      if (error) return NextResponse.json({ error: "Couldn't turn ClearKeys on. Try again, or contact support if it keeps happening." }, { status: 500 });
    }
    return NextResponse.json({ added: rows.length, grade });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
