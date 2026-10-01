"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { S, C } from "./ui";
import Stage, { At } from "./Stage";
import { PickItem, SpellItem } from "./Items";
import { scanStep, probeItems } from "../../lib/cleardecode/core";

// "Scan the ruins": the placement scan. Students never see a score or a
// level, only "Scan complete." The teacher sees the result.
export default function ScanClient({ initialTested = {}, skin = null }) {
  const [tested, setTested] = useState(initialTested);
  const [started, setStarted] = useState(Object.keys(initialTested).length > 0);
  const [itemIdx, setItemIdx] = useState(0);
  const [right, setRight] = useState(0);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const step = useMemo(() => scanStep(tested), [tested]);
  const items = useMemo(() => (step.done ? [] : probeItems(step.next)), [step]);
  const scanned = Object.keys(tested).length;

  async function save(nextTested) {
    setSaving(true); setErr("");
    try {
      const res = await fetch("/api/cleardecode", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "scan", tested: nextTested }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Couldn't save.");
    } catch (e) { setErr(e.message); }
    setSaving(false);
  }
  function answer(ok) {
    const nRight = right + (ok ? 1 : 0);
    if (itemIdx + 1 < items.length) { setRight(nRight); setItemIdx(itemIdx + 1); return; }
    const nextTested = { ...tested, [step.next]: nRight };
    setTested(nextTested); setItemIdx(0); setRight(0);
    save(nextTested);
  }

  const panel = (children, title = "Scan the Ruins") => (
    <At x={300} y={410} w={1000} h={455}>
      <div style={{ ...S.glass, height: "100%", padding: "56px 40px 26px", position: "relative", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ position: "absolute", top: -26, left: "50%", transform: "translateX(-50%)", padding: "10px 30px", borderRadius: 16, background: "#fff", border: "2px solid #bfe6f8", boxShadow: "0 6px 16px rgba(15,35,80,0.18)", whiteSpace: "nowrap", font: "800 26px Poppins, sans-serif", color: C.navy }}>
          <span>CLEAR</span><span style={{ color: C.blue }}>DECODE</span><span style={{ fontWeight: 600 }}> · {title}</span>
        </div>
        {children}
      </div>
    </At>
  );
  const sam = (line, state = "helping") => ({ skin, line, state });

  if (step.done) {
    return (
      <Stage scene="scan" exit={null} sam={sam(saving ? "Sending your scan…" : "Great scanning, Cadet.", "celebrating")}>
        {panel(
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
            <h1 style={{ ...S.h1, fontSize: 48, margin: 0 }}>Scan complete.</h1>
            <p style={{ ...S.p, fontSize: 22, textAlign: "center", margin: 0 }}>{saving ? "Sending the scan to the station…" : err ? err : "The station has your scan. Your teacher will let you know what's next."}</p>
            {err && <button type="button" style={S.primary} onClick={() => save(tested)}>Try again</button>}
            {!saving && !err && <Link href="/home" style={{ ...S.primary, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>Back to Home →</Link>}
          </div>
        )}
      </Stage>
    );
  }

  if (!started) {
    return (
      <Stage scene="scan" exit={{ href: "/home", label: "Back to Home" }} sam={sam("Ready when you are, Cadet.", "idle")}>
        {panel(
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, textAlign: "center" }}>
            <div style={S.eyebrow}>New expedition</div>
            <h1 style={{ ...S.h1, margin: 0 }}>The crew needs your help scanning the ruins.</h1>
            <p style={{ ...S.p, fontSize: 21, maxWidth: 820, margin: 0 }}>You&apos;ll hear words from the builders&apos; code. Some are real words, and some are alien words from the ruins. Tap or build the one you hear. There&apos;s no score. Just do your best, and take your time.</p>
            <button type="button" style={{ ...S.primary, minWidth: 280 }} onClick={() => setStarted(true)}>Start the scan →</button>
          </div>
        )}
      </Stage>
    );
  }

  const it = items[itemIdx];
  return (
    <Stage scene="scan" exit={{ href: "/home", label: "Save and exit" }} sam={sam(it && it.alien ? "An alien word. Listen closely." : "Take your time. Just do your best.")}>
      {panel(
        <>
          <div style={{ position: "absolute", top: 20, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 12 }}>
            {Array.from({ length: 4 }).map((_, i) => <span key={i} style={{ width: 20, height: 20, borderRadius: "50%", ...(i < itemIdx ? { background: C.teal } : i === itemIdx ? { background: "#fff", border: `4px solid ${C.teal}`, boxShadow: "0 0 10px rgba(20,184,200,0.8)" } : { background: "#fff", border: "2px solid #9fd6f2" }) }} />)}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {it && (it.kind === "spell"
              ? <SpellItem key={`${step.next}-${itemIdx}`} item={it} mode="check" onDone={answer} prompt="Hear the word, then build it." compact />
              : <PickItem key={`${step.next}-${itemIdx}`} item={it} mode="check" onDone={answer} prompt={it.alien ? "An alien word! Listen, then tap how it's spelled." : "Listen, then tap the word you heard."} />)}
          </div>
        </>
      )}
    </Stage>
  );
}
