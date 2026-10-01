import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { readProgress } from "../../lib/cleardecodeServer";
import { PLANETS, ruinsOfPlanet, ruinIndex, getRuinContent, isRuinReady, nextSession, doneToday, ruinState, masteredRuins } from "../../lib/cleardecode";
import CodeHome from "../../components/cleardecode/CodeHome";
import { S } from "../../components/cleardecode/ui";

export const dynamic = "force-dynamic";

// ClearDecode door (Sept 30, 2026): only for students the teacher sent the
// placement scan to, or turned ClearDecode on for.
export default async function CodePage() {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) redirect("/login");
  const { data: student } = await supabaseAdmin.from("students").select("id, first_name").eq("id", studentId).single();
  if (!student) redirect("/login");
  const { row } = await readProgress(studentId);
  if (row && row.scan && row.scan.pending) redirect("/decode/scan");
  if (!row || row.status !== "on") {
    return (
      <main style={S.page}>
        <div style={S.wrap}>
          <section style={S.panel}>
            <div style={S.eyebrow}>ClearDecode</div>
            <h1 style={S.h1}>{row && row.status === "scanned" ? "Scan complete." : "Nothing here yet."}</h1>
            <p style={S.p}>{row && row.status === "scanned" ? "The station has your scan. Your teacher will let you know what's next." : "Your teacher will open ClearDecode for you when it's time."}</p>
            <Link href="/home" style={{ ...S.primary, display: "inline-flex", alignItems: "center", textDecoration: "none", marginTop: 14 }}>Back to Home</Link>
          </section>
        </div>
      </main>
    );
  }
  const current = row.current_ruin;
  const mastered = new Set(masteredRuins(row));
  const curIdx = ruinIndex(current);
  const planets = PLANETS.map((p) => {
    const ruins = ruinsOfPlanet(p.id).map((r) => ({ id: r.id, state: r.id === current ? "here" : mastered.has(r.id) || ruinIndex(r.id) < curIdx ? "done" : "locked" }));
    return { id: p.id, name: p.name, here: ruins.some((r) => r.state === "here"), ruins };
  });
  const relics = Object.entries(row.ruins || {}).filter(([, v]) => v && v.passedAt).map(([id]) => ({ id, ...(getRuinContent(id) || {}).relic })).filter((r) => r.name);
  const content = getRuinContent(current);
  const view = {
    planets, current, relics,
    session: nextSession(row),
    doneToday: doneToday(row),
    ready: isRuinReady(current),
    ruinName: content ? content.name : "Uncharted ruin",
    pieces: Math.min(4, ruinState(row, current).chambers || 0),
  };
  return <CodeHome firstName={student.first_name} view={view} />;
}
