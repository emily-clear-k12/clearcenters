"use client";

import { useState } from "react";

// Live and Sandbox as two tabs. The Sandbox tab has a yellow banner and a
// "View as" picker: Mrs. Barrons, or one of three students with different stories.
export default function SandboxShell({ liveUrl, students }) {
  const [tab, setTab] = useState("sandbox");
  const [who, setWho] = useState("door");
  const [reload, setReload] = useState(0);
  const sandbox = tab === "sandbox";

  let src = "/demo";
  if (who === "teacher") src = "/api/demo/enter?who=teacher";
  else if (who.startsWith("student-")) src = `/api/demo/enter?who=student&n=${who.slice(8)}`;

  function view(next) {
    setWho(next);
    setReload((n) => n + 1);
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#241b50" }}>
      <div style={bar}>
        <div role="tablist" aria-label="Site" style={{ display: "flex", gap: 6 }}>
          <button type="button" role="tab" aria-selected={!sandbox} onClick={() => setTab("live")} style={tabButton(!sandbox, false)}>Live site</button>
          <button type="button" role="tab" aria-selected={sandbox} onClick={() => setTab("sandbox")} style={tabButton(sandbox, true)}>Sandbox</button>
        </div>
        <div style={{ flex: 1 }} />
        {!sandbox && <a href={liveUrl} target="_blank" rel="noreferrer" style={small}>Open the live site in its own tab ↗</a>}
      </div>
      {sandbox ? (
        <div style={banner}>
          <strong>SANDBOX</strong>
          <span style={{ flex: 1, minWidth: 220 }}>Not the live site. Mrs. Barrons’s sample Grade 4 classes, 18 made-up students. Nothing here touches real data.</span>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700 }}>
            View as
            <select value={who} onChange={(e) => view(e.target.value)} style={select}>
              <option value="door">Start page</option>
              <option value="teacher">Mrs. Barrons (teacher)</option>
              {students.map((s) => <option key={s.index} value={`student-${s.index}`}>{s.name} (student · {s.label.toLowerCase()})</option>)}
            </select>
          </label>
          <button type="button" onClick={() => setReload((n) => n + 1)} style={darkButton}>Start over</button>
        </div>
      ) : (
        <div style={{ ...banner, background: "#e4f7f0", color: "#0b4d3a" }}>
          <strong>LIVE</strong>
          <span style={{ flex: 1 }}>Your real site and real classes. You may need to sign in here the first time.</span>
        </div>
      )}
      <iframe
        key={sandbox ? `sandbox-${reload}` : "live"}
        title={sandbox ? "Sandbox" : "Live site"}
        src={sandbox ? src : liveUrl}
        style={{ flex: 1, width: "100%", border: 0, background: "#fff" }}
      />
    </div>
  );
}

const bar = { display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#241b50", fontFamily: "Inter, sans-serif", flexWrap: "wrap" };
const banner = { background: "#ffe14a", color: "#3a2e00", fontFamily: "Inter, sans-serif", fontSize: 14, padding: "8px 16px", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" };
const select = { font: "600 13px Inter, sans-serif", borderRadius: 999, border: "1px solid #3a2e00", padding: "6px 10px", background: "#fffbe0", color: "#3a2e00" };
const darkButton = { background: "#3a2e00", color: "#ffe14a", border: 0, borderRadius: 999, padding: "7px 14px", fontWeight: 700, cursor: "pointer" };
const small = { color: "#f6f1e2", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600 };

function tabButton(on, yellow) {
  return {
    border: 0,
    borderRadius: 999,
    padding: "8px 16px",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
    background: on ? (yellow ? "#ffe14a" : "#e4f7f0") : "transparent",
    color: on ? (yellow ? "#3a2e00" : "#0b4d3a") : "#f6f1e2",
  };
}
