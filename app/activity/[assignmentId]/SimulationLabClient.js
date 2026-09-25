"use client";

// Simulation Lab student entry point (rendered by page.js for every
// "simulation_lab" case).
//
// Sept 24, 2026 — the animated scene design (components/simulation-lab/) is
// the ONLY Simulation Lab experience. The old console/dial layout that used
// to live in this file was removed on purpose and must not be restored (see
// ClearCenters_STATE.md §9 rule 22). Every live case has a scene; a new case
// needs one before it can go live (components/simulation-lab/README.md).
import React from "react";
import SimLabStudio from "../../../components/simulation-lab/SimLabStudio";
import { hasSimLabScene } from "../../../components/simulation-lab/sceneIds";

export default function SimulationLabClient(props) {
  if (hasSimLabScene(props.publicCase)) return <SimLabStudio {...props} />;
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#efecf8", fontFamily: "sans-serif", textAlign: "center", padding: 20, color: "#2a2440" }}>
      <div>
        <h1>This lab isn’t ready yet</h1>
        <p style={{ color: "#5b5378" }}>Its experiment scene is still being built. Try another mission for now!</p>
        <a href="/home" style={{ color: "#5a4bb8", fontWeight: 700 }}>← Back to Home</a>
      </div>
    </div>
  );
}
