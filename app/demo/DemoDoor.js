"use client";

import { markTeacherLogin } from "../../components/teacher/SamCoach";

// The sandbox start page: go in as Mrs. Barrons or as one of three students.
export default function DemoDoor({ students }) {
  function enterTeacher() {
    try { markTeacherLogin(); } catch (err) { /* the door still opens */ }
    window.location.href = "/api/demo/enter?who=teacher";
  }

  return (
    <main style={{ minHeight: "100vh", margin: 0, background: "#edf0ff", color: "#241b50", fontFamily: "Inter, sans-serif", padding: "32px 16px" }}>
      <div style={{ width: "min(960px, 100%)", margin: "0 auto" }}>
        <p style={{ letterSpacing: ".08em", fontSize: 12, fontWeight: 700, color: "#74618e" }}>CLEARCENTERS SANDBOX</p>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 40, letterSpacing: "-1px", margin: "8px 0" }}>Mrs. Barrons’s classes</h1>
        <p style={{ color: "#70658d", fontSize: 16, lineHeight: 1.5, maxWidth: 680 }}>
          Three sample Grade 4 classes (ELAR, Science and Math) with the same 18 made-up students and four weeks of work. Some students are strong, some are improving, some struggle with one standard, and some have missing work, so the gradebook, reports and small groups all have something to show. The live site is not changed.
        </p>
        <section style={{ ...card, marginTop: 24 }}>
          <h2 style={h2}>Teacher</h2>
          <p style={{ color: "#70658d", margin: "0 0 14px" }}>Try Grades → Gradebook, then <b>Small groups</b>: pick a standard and the class splits into Reteach, Practice more and Ready to extend. <b>Assign to these</b> opens Assign with just those students picked.</p>
          <button type="button" onClick={enterTeacher} style={button}>Enter as Mrs. Barrons</button>
        </section>
        <h2 style={{ ...h2, margin: "28px 0 12px" }}>Students</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {students.map((s) => (
            <section key={s.index} style={card}>
              <span style={pill}>{s.label}</span>
              <h3 style={{ fontFamily: "Poppins, sans-serif", margin: "10px 0 4px" }}>{s.name}</h3>
              <p style={{ color: "#70658d", margin: "0 0 14px" }}>{s.blurb}.</p>
              <a href={`/api/demo/enter?who=student&n=${s.index}`} style={{ ...button, display: "inline-flex" }}>Enter as {s.name.split(" ")[0]}</a>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

const card = { background: "#fff", borderRadius: 20, padding: 22, border: "1px solid #e7e2f2" };
const h2 = { fontFamily: "Poppins, sans-serif", margin: "0 0 8px", fontSize: 22 };
const pill = { display: "inline-block", background: "#fff3b8", color: "#5a4700", borderRadius: 999, padding: "4px 10px", fontSize: 12, fontWeight: 700 };
const button = {
  background: "linear-gradient(135deg,#804ce2,#6132c2)",
  color: "#fff",
  border: 0,
  borderRadius: 24,
  padding: "12px 18px",
  fontWeight: 700,
  textDecoration: "none",
  cursor: "pointer",
};
