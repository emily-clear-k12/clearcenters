import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readProgress, saveProgress, addCrystals } from "../../../lib/cleardecodeServer";
import { scanStep, getRuin, applyFinish, nextSession, doneToday, dateKey, isRuinReady } from "../../../lib/cleardecode";

// ClearDecode student actions (Sept 30, 2026). The student session cookie
// identifies the student; nothing here trusts a student id from the body.
//   scan   -> save placement-scan answers so far; finishes the scan when done
//   room   -> save the resume point inside today's chamber
//   finish -> a chamber or vault is done: progress, crystals, next ruin
export async function POST(request) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const { row, missingTable } = await readProgress(studentId);
  if (missingTable) return NextResponse.json({ error: "ClearDecode isn't set up yet." }, { status: 500 });
  if (!row) return NextResponse.json({ error: "ClearDecode isn't turned on for you yet." }, { status: 403 });

  if (body.action === "scan") {
    if (!(row.scan && row.scan.pending)) return NextResponse.json({ error: "No scan to finish." }, { status: 400 });
    const tested = {};
    for (const [id, n] of Object.entries(body.tested || {})) {
      if (getRuin(id)) tested[id] = Math.max(0, Math.min(4, Number(n) || 0));
    }
    const step = scanStep(tested);
    const scan = { ...(row.scan || {}), tested };
    const fields = { scan };
    if (step.done) {
      const at = new Date().toISOString();
      scan.pending = false;
      scan.result = { startRuin: step.startRuin, scoredOut: step.scoredOut, belowFloor: step.belowFloor, mastered: step.mastered, gaps: step.gaps, at };
      scan.history = [...(Array.isArray(row.scan && row.scan.history) ? row.scan.history : []), { at, startRuin: step.startRuin, scoredOut: step.scoredOut, mastered: step.mastered.length }].slice(-12);
      if (row.status !== "on") fields.status = "scanned";
    }
    const { error } = await saveProgress(studentId, fields);
    if (error) return NextResponse.json({ error: "Couldn't save. Check your connection and try again." }, { status: 500 });
    return NextResponse.json({ done: step.done, next: step.done ? null : step.next });
  }

  if (row.status !== "on") return NextResponse.json({ error: "ClearDecode isn't turned on for you yet." }, { status: 403 });

  if (body.action === "room") {
    const ses = nextSession(row);
    if (!ses.ruin || body.ruin !== ses.ruin) return NextResponse.json({ ok: false });
    await saveProgress(studentId, { chamber: { ruin: ses.ruin, n: ses.n || null, kind: ses.kind, room: Math.max(0, Number(body.room) || 0), date: dateKey() } });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "finish") {
    const ses = nextSession(row);
    if (doneToday(row)) return NextResponse.json({ error: "You already finished today's session. See you tomorrow!", already: true }, { status: 409 });
    const keeper = ses.kind === "keeper";
    if (!ses.ruin || body.ruin !== ses.ruin || (!keeper && !isRuinReady(ses.ruin))) return NextResponse.json({ error: "That session isn't open right now." }, { status: 400 });
    const kind = keeper ? "keeper" : ses.kind === "vault" ? "vault" : "chamber";
    const items = Array.isArray(body.items) ? body.items.slice(0, 40).map((x) => ({ probe: String((x && x.probe) || ""), ok: !!(x && x.ok) })) : [];
    const SELF = ["smooth", "bumps", "tricky"];
    const reread = body.reread && SELF.includes(body.reread.self) ? { goal: String(body.reread.goal || "").slice(0, 20), self: body.reread.self } : null;
    const total = Math.max(0, Math.min(200, Number(body.total) || 0));
    const correct = Math.max(0, Math.min(total, Number(body.correct) || 0));
    const minutes = Math.max(0, Math.min(60, Math.round(Number(body.minutes) || 0)));
    const { fields, crystals, result } = applyFinish(row, { kind, ruin: ses.ruin, n: ses.n, correct, total, minutes, bonus: Number(body.bonus) || 0, items, reread });
    const { error } = await saveProgress(studentId, fields);
    if (error) return NextResponse.json({ error: "Couldn't save. Check your connection and try again." }, { status: 500 });
    await addCrystals(studentId, crystals);
    return NextResponse.json({ result, crystals, next: fields.current_ruin });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
