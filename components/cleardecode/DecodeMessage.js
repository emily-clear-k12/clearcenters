"use client";
import React from "react";
import Link from "next/link";
import { S } from "./ui";
import Stage, { At } from "./Stage";

// A simple message screen on the Relic Lab stage (scan done, not on yet).
export default function DecodeMessage({ skin, title, text }) {
  return (
    <Stage scene="scan" exit={null} sam={{ skin, line: "See you on the next expedition.", state: "idle" }}>
      <At x={300} y={410} w={1000} h={400}>
        <div style={{ ...S.glass, height: "100%", padding: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, textAlign: "center" }}>
          <div style={S.eyebrow}>ClearDecode</div>
          <h1 style={{ ...S.h1, fontSize: 46, margin: 0 }}>{title}</h1>
          <p style={{ ...S.p, fontSize: 22, margin: 0 }}>{text}</p>
          <Link href="/home" style={{ ...S.primary, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>Back to Home →</Link>
        </div>
      </At>
    </Stage>
  );
}
