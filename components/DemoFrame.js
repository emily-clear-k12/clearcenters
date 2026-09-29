"use client";

export default function DemoFrame({ student }) {
  function openTeacher() {
    try { window.localStorage.setItem("cc-demo", "1"); } catch (err) { /* cookie still carries the demo */ }
    window.location.href = "/api/demo/enter?who=teacher";
  }
  function leave() {
    try { window.localStorage.removeItem("cc-demo"); } catch (err) { /* cookie clear still leaves */ }
    window.location.href = "/api/demo/enter?who=leave";
  }
  return (
    <div style={{ background: "#173a28", color: "#f6f1e2", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", padding: "10px 18px", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
      <strong>Demo</strong>
      <span style={{ flex: 1 }}>{student ? "You are Maya Chen, in Mrs. Barrons’s ELAR class." : "You are Mrs. Barrons. This is sample work, not a real class."}</span>
      {student
        ? <button type="button" onClick={openTeacher} style={link}>Switch to Mrs. Barrons</button>
        : <a href="/api/demo/enter?who=student" style={link}>Switch to Maya</a>}
      <button type="button" onClick={leave} style={link}>Leave demo</button>
    </div>
  );
}

const link = { background: "#f6f1e2", color: "#173a28", border: 0, borderRadius: 999, padding: "8px 14px", fontWeight: 700, textDecoration: "none", cursor: "pointer" };
