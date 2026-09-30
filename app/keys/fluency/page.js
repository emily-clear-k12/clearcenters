import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { readFluency } from "../../../lib/fluencyServer";
import { TRACK_LEVELS } from "../../../lib/cases/relay-station";
import { FLUENCY_LEVELS, FLUENCY_UNITS, normalizeFluency } from "../../../lib/cases/relay-station/fluency";

// ClearKeys Fluency map (Sept 29, 2026): levels 21-40, after the track.
const C = { ink: "#241b50", muted: "#6b5f8a", violet: "#7B5DFF", teal: "#00C2C7", gold: "#F5B82E" };
const glass = { background: "rgba(255,255,255,0.84)", border: "1px solid rgba(255,255,255,0.95)", borderRadius: 24, boxShadow: "0 10px 30px rgba(60,40,140,.18)" };

export default async function FluencyMap() {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) redirect("/login");
  const { data: rs } = await supabaseAdmin.from("relay_station_progress").select("current_level, completed_at").eq("student_id", studentId).maybeSingle();
  const trackDone = !!rs && (!!rs.completed_at || rs.current_level > TRACK_LEVELS.length);
  if (!trackDone) redirect("/keys#fluency");
  const { fluency, ready } = await readFluency(studentId);
  const fl = normalizeFluency(fluency);

  return (
    <main style={{ minHeight: "100vh", color: C.ink, fontFamily: "'Inter', sans-serif", padding: "20px 16px 60px", background: "linear-gradient(180deg, #E9E4FB 0%, #F2F0FA 45%, #F7F5FD 100%)" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');`}</style>
      <div style={{ width: "min(960px, 100%)", margin: "0 auto", display: "grid", gap: 18 }}>
        <header style={{ ...glass, borderRadius: 999, padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <Link href="/keys" style={{ color: C.violet, textDecoration: "none", fontWeight: 800 }}>← ClearKeys</Link>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800 }}>Fluency Levels</span>
          <span style={{ color: C.muted, fontWeight: 700, fontSize: 14 }}>{Math.min(fl.current, 41) - 21} of 20 passed</span>
        </header>
        <section style={{ ...glass, padding: 20 }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 26 }}>Build your speed</h1>
          <p style={{ color: C.muted, margin: "6px 0 0" }}>You know where every key is. Now get faster. To pass a Fluency level you need <b>95% accuracy and the speed goal</b>. Every 5 levels also unlocks a bonus story chapter.</p>
          {!ready && <p style={{ color: "#c4233a", fontWeight: 700 }}>Fluency saving isn&apos;t switched on yet. Ask your teacher.</p>}
        </section>
        {FLUENCY_UNITS.map((u) => (
          <section key={u.id} style={{ ...glass, padding: 18 }}>
            <div style={{ color: C.muted, fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>{u.name}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
              {u.levels.map((n) => {
                const l = FLUENCY_LEVELS.find((x) => x.n === n);
                const r = fl.results[String(n)];
                const open = n <= fl.current;
                const isNow = n === fl.current;
                const inner = (
                  <>
                    <span style={{ flex: "0 0 38px", height: 38, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, background: r && r.passed ? `linear-gradient(135deg, ${C.teal}, ${C.violet})` : isNow ? C.gold : "#ece8f8", color: r && r.passed ? "#fff" : C.ink }}>{open ? n : "🔒"}</span>
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: "block", fontWeight: 800 }}>{l.title}</span>
                      <span style={{ display: "block", fontSize: 12.5, color: C.muted }}>
                        {r && r.passed ? `${"★".repeat(r.stars || 0)} · ${r.wpm} WPM` : isNow ? `Up next · goal ${l.goals.wpm} WPM` : open ? `Goal ${l.goals.wpm} WPM` : `Pass Level ${n - 1} first`}
                      </span>
                    </span>
                  </>
                );
                const box = { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 16, background: open ? "#fff" : "rgba(255,255,255,.55)", textDecoration: "none", color: C.ink, boxShadow: isNow ? `0 0 0 2px ${C.violet}` : "0 4px 12px rgba(60,40,140,.06)" };
                return open ? <Link key={n} href={`/keys/fluency/${n}`} style={box}>{inner}</Link> : <div key={n} style={box}>{inner}</div>;
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
