"use client";

import { useEffect, useState } from "react";

export default function DemoFrame({ student }) {
  const [framed, setFramed] = useState(false);
  useEffect(() => {
    setFramed(window.parent !== window);
  }, []);
  if (framed) return null;

  function openTeacher() {
    try { window.localStorage.setItem("cc-demo", "1"); } catch (err) { /* cookie still carries the demo */ }
    window.location.href = "/api/demo/enter?who=teacher";
  }
  function leave() {
    try { window.localStorage.removeItem("cc-demo"); } catch (err) { /* cookie clear still leaves */ }
    window.location.href = "/api/demo/enter?who=leave";
  }
  return (
    <div style={{ background: "#ffe14a", color: "#3a2e00", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", padding: "10px 18px", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
      <strong>Sandbox</strong>
      <span style={{ flex: 1 }}>{student ? "You are Maya Chen, in Mrs. Barrons’s ELAR class. This is not the live site." : "You are Mrs. Barrons. This is sample work, not the live site."}</span>
      {student
        ? <button type="button" onClick={openTeacher} style={link}>Switch to Mrs. Barrons</button>
        : <a href="/api/demo/enter?who=student" style={link}>Switch to Maya</a>}
      <button type="button" onClick={leave} style={link}>Leave sandbox</button>
    </div>
  );
}

const link = { background: "#3a2e00", color: "#ffe14a", border: 0, borderRadius: 999, padding: "8px 14px", fontWeight: 700, textDecoration: "none", cursor: "pointer" };
