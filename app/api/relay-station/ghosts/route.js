import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { TRACK_LEVELS, rankFor, cleanTimeline } from "../../../../lib/cases/relay-station";

// Classmate ghosts (Sept 29, 2026): up to 3 best runs from classmates on this
// Foundations Track level, so a student can race them. Anonymous on purpose:
// a ghost is labeled by the classmate's rank ("a Lieutenant from your class"),
// never by name, and no student ids leave the server.
export async function POST(request) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const level = Number(body.level);
  const level0 = TRACK_LEVELS[level - 1];
  if (!level0) return NextResponse.json({ ghosts: [] });
  const length = level0.text.length;

  const { data: me } = await supabaseAdmin.from("students").select("id, class_id").eq("id", studentId).single();
  if (!me) return NextResponse.json({ ghosts: [] });
  const { data: mates } = await supabaseAdmin.from("students").select("id, active").eq("class_id", me.class_id);
  const ids = (mates || []).filter((s) => s.active !== false && s.id !== studentId).map((s) => s.id);
  if (!ids.length) return NextResponse.json({ ghosts: [] });
  const { data: rows } = await supabaseAdmin.from("relay_station_progress").select("current_level, level_results").in("student_id", ids);

  const runs = [];
  for (const r of rows || []) {
    const res = (r.level_results || {})[String(level)];
    if (!res || !res.passed) continue;
    const timeline = cleanTimeline(res.timeline, length);
    if (!timeline) continue;
    runs.push({ wpm: Number(res.wpm) || 0, accuracy: Number(res.accuracy) || 0, rank: rankFor(r.current_level || 1), timeline });
  }
  if (!runs.length) return NextResponse.json({ ghosts: [] });
  runs.sort((a, b) => a.wpm - b.wpm);

  // A spread: the class's fastest, one from the middle, and one steady run.
  const pick = [];
  const add = (r) => { if (r && !pick.includes(r)) pick.push(r); };
  add(runs[runs.length - 1]);
  add(runs[Math.floor(runs.length / 2)]);
  add(runs[0]);
  const labels = ["Fastest in your class", "Middle of the pack", "Steady and careful"];
  return NextResponse.json({
    ghosts: pick.map((r, i) => ({ label: labels[i], rank: r.rank, wpm: r.wpm, accuracy: r.accuracy, timeline: r.timeline })),
  });
}
