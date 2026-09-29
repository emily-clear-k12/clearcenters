"use client";

import { markTeacherLogin } from "../../components/teacher/SamCoach";

export default function DemoDoor() {
  function enterTeacher() {
    try {
      window.localStorage.setItem("cc-demo", "1");
      markTeacherLogin();
    } catch (err) {
      /* the door still opens */
    }
    window.location.href = "/api/demo/enter?who=teacher";
  }

  return (
    <main style={{ minHeight: "100vh", margin: 0, background: "#edf0ff", color: "#241b50", fontFamily: "Inter, sans-serif", padding: "32px 16px" }}>
      <div style={{ width: "min(880px, 100%)", margin: "0 auto" }}>
        <p style={{ letterSpacing: ".08em", fontSize: 12, fontWeight: 700, color: "#74618e" }}>CLEARCENTERS DEMO</p>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 40, letterSpacing: "-1px", margin: "8px 0" }}>Mrs. Barrons’s class</h1>
        <p style={{ color: "#70658d", fontSize: 16, lineHeight: 1.5, maxWidth: 620 }}>This is a sample Grade 4 class. The live site is not changed. Open it as the teacher, or as Maya, one of the students.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 24 }}>
          <section style={{ background: "#fff", borderRadius: 20, padding: 22, border: "1px solid #e7e2f2" }}>
            <h2 style={{ fontFamily: "Poppins, sans-serif", marginTop: 0 }}>Teacher</h2>
            <p style={{ color: "#70658d" }}>Today’s week, the class, the gradebook, and reports. Eight students already have work.</p>
            <button type="button" onClick={enterTeacher} style={button}>Enter as Mrs. Barrons</button>
          </section>
          <section style={{ background: "#fff", borderRadius: 20, padding: 22, border: "1px solid #e7e2f2" }}>
            <h2 style={{ fontFamily: "Poppins, sans-serif", marginTop: 0 }}>Student</h2>
            <p style={{ color: "#70658d" }}>Home, missions, and the work still waiting. Maya’s sign-in number is 2405.</p>
            <a href="/api/demo/enter?who=student" style={{ ...button, display: "inline-flex" }}>Enter as Maya Chen</a>
          </section>
        </div>
      </div>
    </main>
  );
}

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
