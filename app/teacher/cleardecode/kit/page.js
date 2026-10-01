import Link from "next/link";
import { PLANETS, ruinsOfPlanet, ruinLabel, getRuin, getRuinContent, planetOf } from "../../../../lib/cleardecode";
import PrintButton from "./PrintButton";
import "../../../../components/teacher/bridge.css";

export const dynamic = "force-dynamic";

// ClearDecode small-group kit (Sept 30, 2026). One printable packet per
// ruin, built from the same content students practice on screen, so the
// interventionist's table and the student's screen use the same words.
// No student data here: it's product content only.
function hi(word, find) {
  const re = new RegExp(`(${find})`, "i");
  const m = word.match(re);
  if (!m) return word;
  const i = m.index;
  return <>{word.slice(0, i)}<b style={{ textDecoration: "underline", textDecorationThickness: 3 }}>{m[0]}</b>{word.slice(i + m[0].length)}</>;
}

const css = `
  .kit { font-family: Inter, Arial, sans-serif; color: #13254a; max-width: 960px; margin: 0 auto; padding: 24px; }
  .kit h1 { font: 800 30px Poppins, sans-serif; margin: 0 0 4px; }
  .kit h2 { font: 800 22px Poppins, sans-serif; margin: 0 0 10px; border-bottom: 3px solid #13b8c8; padding-bottom: 6px; }
  .kit .page { page-break-after: always; break-after: page; padding: 8px 0 24px; }
  .kit .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .kit .card { border: 2px dashed #8aa; border-radius: 10px; height: 92px; display: flex; align-items: center; justify-content: center; font: 700 34px Poppins, Arial, sans-serif; }
  .kit .sorthead { border: 3px solid #13254a; border-radius: 10px; padding: 10px; font: 800 20px Poppins, sans-serif; text-align: center; }
  .kit .log { border: 2px solid #d8b46a; border-radius: 12px; padding: 14px 18px; margin-bottom: 14px; font-size: 19px; line-height: 1.7; background: #fffaf0; }
  .kit .muted { color: #5b6b8d; }
  .kit ol li { margin-bottom: 6px; font-size: 17px; }
  .kit .noprint { display: flex; gap: 12px; align-items: center; margin-bottom: 18px; flex-wrap: wrap; }
  @media print { .kit .noprint { display: none; } .kit { padding: 0; } body { background: #fff !important; } }
`;

export default function KitPage({ searchParams }) {
  const id = searchParams && searchParams.ruin;
  const c = id ? getRuinContent(id) : null;
  const back = `/teacher/cleardecode${searchParams && searchParams.classId ? `?classId=${searchParams.classId}` : ""}`;
  if (!c) {
    return (
      <main className="kit">
        <style>{css}</style>
        <div className="noprint"><Link href={back} className="cc-btn secondary">← Back to ClearDecode</Link></div>
        <h1>ClearDecode small-group kits</h1>
        <p className="muted">Pick a ruin. Each kit has the 5-minute mini-lesson, word cards, sort cards, a spelling list, the four decodable logs, and a home practice page.</p>
        {PLANETS.map((p) => (
          <section key={p.id} style={{ margin: "18px 0" }}>
            <h2>{p.id} · {p.name} <span className="muted" style={{ fontWeight: 600, fontSize: 16 }}>{p.skill}</span></h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {ruinsOfPlanet(p.id).map((r) => <Link key={r.id} href={`/teacher/cleardecode/kit?ruin=${r.id}${searchParams && searchParams.classId ? `&classId=${searchParams.classId}` : ""}`} className="cc-btn secondary">{ruinLabel(r.id)}</Link>)}
            </div>
          </section>
        ))}
      </main>
    );
  }
  const ru = getRuin(id);
  const planet = planetOf(id);
  const yes = c.bank.slice(0, 9);
  const no = c.contrast.slice(0, 9);
  return (
    <main className="kit">
      <style>{css}</style>
      <div className="noprint"><Link href={`/teacher/cleardecode/kit${searchParams.classId ? `?classId=${searchParams.classId}` : ""}`} className="cc-btn secondary">← All kits</Link><PrintButton /><span className="muted">Prints about 6 pages. Cut the word and sort cards on the dashed lines.</span></div>

      <section className="page">
        <div className="muted" style={{ fontWeight: 700 }}>ClearDecode small-group kit · {planet.name} · UFLI {ru.ufli} · TEKS {(ru.standards.TX || []).join(", ")}</div>
        <h1>{ruinLabel(id)} · {c.name}</h1>
        <p style={{ fontSize: 19 }}><b>The code:</b> {c.code.rule}.</p>
        <h2>5-minute mini-lesson: {c.miniLesson.title}</h2>
        <ol>{c.miniLesson.steps.map((st, i) => <li key={i}>{st}</li>)}</ol>
        <h2 style={{ marginTop: 20 }}>For emergent bilingual students</h2>
        <p style={{ fontSize: 17 }}>{c.spanish}</p>
        <h2 style={{ marginTop: 20 }}>Word chains (change one letter)</h2>
        {c.chains.map((ch, i) => <p key={i} style={{ fontSize: 22, fontWeight: 700 }}>{ch.join("  →  ")}</p>)}
      </section>

      <section className="page">
        <h2>Word cards</h2>
        <div className="cards">{[...c.codex.map((x) => x.w), ...c.bank.filter((w) => !c.codex.some((x) => x.w === w))].slice(0, 18).map((w) => <div key={w} className="card">{hi(w, c.find)}</div>)}</div>
      </section>

      <section className="page">
        <h2>Sort: {c.sort.yes} or {c.sort.no}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div className="sorthead">{c.sort.yes}<div className="muted" style={{ fontSize: 15 }}>{c.sort.yesHint}</div></div>
          <div className="sorthead">{c.sort.no}<div className="muted" style={{ fontSize: 15 }}>{c.sort.noHint}</div></div>
        </div>
        <div className="cards">{[...yes, ...no].sort().map((w) => <div key={w} className="card" style={{ fontSize: 30 }}>{w}</div>)}</div>
      </section>

      <section className="page">
        <h2>Spelling: say it, tap the sounds, write it</h2>
        <ol style={{ columns: 2 }}>{c.door.map((d) => <li key={d.w} style={{ fontSize: 22 }}><b>{d.w}</b> <span className="muted">({d.parts.join(" · ")})</span></li>)}</ol>
        {c.wall && c.wall.mode === "syllables" && (
          <>
            <h2 style={{ marginTop: 20 }}>Chunk it</h2>
            <p style={{ fontSize: 22 }}>{c.wall.words.map((x) => { const parts = []; let last = 0; x.cuts.forEach((k) => { parts.push(x.w.slice(last, k)); last = k; }); parts.push(x.w.slice(last)); return parts.join(" · "); }).join("     ")}</p>
          </>
        )}
        <h2 style={{ marginTop: 20 }}>Heart words</h2>
        <p style={{ fontSize: 20 }}>{(c.heart || []).join(", ") || "None for this ruin."}</p>
      </section>

      <section className="page">
        <h2>Decodable logs (one per day; reread yesterday&apos;s before today&apos;s)</h2>
        {c.inscriptions.map((ins, i) => <div key={i} className="log"><b>{ins.title}</b><br />{ins.text}</div>)}
      </section>

      <section className="page">
        <div style={{ border: "4px solid #13b8c8", borderRadius: 18, padding: 24 }}>
          <div className="muted" style={{ fontWeight: 800, letterSpacing: "0.1em" }}>CLEARDECODE · HOME PRACTICE</div>
          <h1 style={{ marginTop: 6 }}>This week&apos;s code: {c.code.label}</h1>
          <p style={{ fontSize: 18 }}>{c.code.rule.charAt(0).toUpperCase() + c.code.rule.slice(1)}.</p>
          <p style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.8 }}>{c.codex.map((x) => x.w).join("   ·   ")}</p>
          <div className="log">{c.inscriptions[0].text}</div>
          <p style={{ fontSize: 17 }}><b>Try this at home (5 minutes):</b> read the words together, then read the log out loud two times. The second time, read it smoothly, like talking. Point to the code in each word.</p>
          <p className="muted" style={{ fontSize: 15 }}>Relic: {c.relic.name}. {c.relic.caption}</p>
        </div>
      </section>
    </main>
  );
}
