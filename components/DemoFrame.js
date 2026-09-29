"use client";

import { useEffect, useState } from "react";
import { demoStudentName } from "../lib/demo/barrons";

// The yellow bar on every sandbox page when it is opened on its own
// (inside the sandbox window, the window's own bar does this job).
export default function DemoFrame({ student }) {
  const [framed, setFramed] = useState(true);
  const [name, setName] = useState("");
  useEffect(() => {
    setFramed(window.parent !== window);
    const id = (document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith("cc_student_id=")) || "").split("=")[1] || "";
    setName(demoStudentName(decodeURIComponent(id)));
  }, []);
  if (framed) return null;

  return (
    <div style={{ background: "#ffe14a", color: "#3a2e00", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", padding: "10px 18px", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
      <strong>Sandbox</strong>
      <span style={{ flex: 1 }}>{student ? `You are ${name || "a sample student"}, in Mrs. Barrons’s ELAR class. This is not the live site.` : "You are Mrs. Barrons. This is sample work, not the live site."}</span>
      {student
        ? <a href="/api/demo/enter?who=teacher" style={link}>Switch to Mrs. Barrons</a>
        : <a href="/demo" style={link}>Switch to a student</a>}
      <a href="/api/demo/enter?who=leave" style={link}>Start page</a>
    </div>
  );
}

const link = { background: "#3a2e00", color: "#ffe14a", border: 0, borderRadius: 999, padding: "8px 14px", fontWeight: 700, textDecoration: "none", cursor: "pointer" };
