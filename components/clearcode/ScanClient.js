"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { S, C, Sam } from "./ui";
import { PickItem, SpellItem } from "./Items";
import { scanStep, probeItems } from "../../lib/clearcode";

// "Scan the ruins": the placement scan. Students never see a score or a
// level, only "Scan complete." The teacher sees the result.
export default function ScanClient({ initialTested = {} }) {
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
      const res = await fetch("/api/clearcode", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "scan", tested: nextTested }) });
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

  if (step.done) {
    return (
      <main style={S.page}>
        <div style={S.wrap}>
          <section style={{ ...S.panel, display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
            <div style={S.eyebrow}>Scan the ruins</div>
            <h1 style={S.h1}>Scan complete.</h1>
            <p style={{ ...S.p, fontSize: 17 }}>{saving ? "Sending the scan to the station…" : err ? err : "The station has your scan. Your teacher will let you know what's next."}</p>
            {err && <button type="button" style={S.primary} onClick={() => save(tested)}>Try again</button>}
            {!saving && !err && <Link href="/home" style={{ ...S.primary, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>Back to Home</Link>}
          </section>
        </div>
      </main>
    );
  }

  return (
    <main style={S.page}>
      <div style={S.wrap}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted }}>ClearCode · Relic Lab</div>
            <div style={{ font: "700 20px Poppins, sans-serif" }}>Scan the ruins</div>
          </div>
          <Link href="/home" style={{ ...S.secondary, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>Save and exit</Link>
        </header>
        {!started ? (
          <section style={{ ...S.panel, display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
            <div style={S.eyebrow}>New expedition</div>
            <h1 style={S.h1}>The crew needs your help scanning the ruins.</h1>
            <p style={{ ...S.p, fontSize: 17, maxWidth: 720 }}>You&apos;ll hear words from the builders&apos; code. Some are real words, and some are alien words from the ruins. Tap or build the one you hear. There&apos;s no score. Just do your best, and take your time.</p>
            <button type="button" style={S.primary} onClick={() => setStarted(true)}>Start the scan</button>
          </section>
        ) : (
          <section style={{ ...S.panel, display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div style={S.eyebrow}>Scanning sector {scanned + 1}{items[itemIdx] && items[itemIdx].alien ? " · alien word" : ""}</div>
              <div style={{ display: "flex", gap: 6 }}>{Array.from({ length: 4 }).map((_, i) => <span key={i} style={{ width: 10, height: 10, borderRadius: 999, background: i < itemIdx ? C.teal : i === itemIdx ? C.violet : "#262c68" }} />)}</div>
            </div>
            {items[itemIdx] && (items[itemIdx].kind === "spell"
              ? <SpellItem key={`${step.next}-${itemIdx}`} item={items[itemIdx]} mode="check" onDone={answer} prompt="Hear the word, then build it." />
              : <PickItem key={`${step.next}-${itemIdx}`} item={items[itemIdx]} mode="check" onDone={answer} prompt={items[itemIdx].alien ? "An alien word! Listen, then tap how it's spelled." : "Listen, then tap the word you heard."} />)}
          </section>
        )}
        <Sam line={started ? "Steady scanning. One try each, then on to the next sector." : "Ready when you are, Cadet."} />
      </div>
    </main>
  );
}
