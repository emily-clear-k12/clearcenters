"use client";

import { useState } from "react";

const LIVE = "https://clearcenters.vercel.app";

export default function SandboxShell() {
  const [tab, setTab] = useState("live");
  const sandbox = tab === "sandbox";

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#241b50" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#241b50", fontFamily: "Inter, sans-serif" }}>
        <button type="button" onClick={() => setTab("live")} style={tabButton(!sandbox)}>Live</button>
        <button type="button" onClick={() => setTab("sandbox")} style={tabButton(sandbox)}>Sandbox</button>
      </div>
      {sandbox && (
        <div style={{ background: "#ffe14a", color: "#3a2e00", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 14, padding: "8px 16px" }}>
          Sandbox. This is not the live site. You are looking at Mrs. Barrons’s sample class.
        </div>
      )}
      <iframe key={tab} title={sandbox ? "Sandbox" : "Live site"} src={sandbox ? "/demo" : LIVE} style={{ flex: 1, width: "100%", border: 0, background: "#fff" }} />
    </div>
  );
}

function tabButton(on) {
  return {
    border: 0,
    borderRadius: 999,
    padding: "8px 16px",
    fontWeight: 700,
    cursor: "pointer",
    background: on ? "#ffe14a" : "transparent",
    color: on ? "#3a2e00" : "#f6f1e2",
  };
}
