"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherHUD from "../../../components/TeacherHUD";
import { COLORS, PAGE_ACCENTS, panelStyle } from "../../../lib/teacherTheme";
import { RACE_MESSAGES, RACE_CRYSTALS, listRelayStationLessons } from "../../../lib/cases/relay-station";

// Class Relay Race board (Wave 3, design doc §15). The teacher picks a
// message and starts the race; this screen is meant for the projector. The
// message assembles leg by leg as students finish: green = delivered,
// gold = someone is typing it (with their name), dim = still open.
// Students join from their "Class Relay Race" assignment.
const ACCENT = PAGE_ACCENTS["/teacher/assign"] || COLORS.copper;

function fmt(sec) {
  const s = Math.max(0, Math.round(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function RelayRaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [teacherEmail, setTeacherEmail] = useState("");
  const [ready, setReady] = useState(false);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(searchParams.get("classId") || "");
  const [source, setSource] = useState(RACE_MESSAGES[0].key);
  const [race, setRace] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      setReady(true);
      supabase.from("classes").select("id, name").eq("teacher_id", data.user.id).order("created_at").then(({ data: cls }) => {
        setClasses(cls || []);
        if (!classId && cls && cls.length) setClassId(cls[0].id);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const call = useCallback(async (payload) => {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/teacher/relay-race", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, classId, accessToken: session?.access_token }),
    });
    const d = await res.json();
    if (!res.ok) throw new Error(d.error || "Something went wrong.");
    return d;
  }, [classId]);

  const refresh = useCallback(async () => {
    if (!classId) return;
    try { const d = await call({ action: "state" }); setRace(d.race); setError(null); } catch (e) { setError(e.message); }
  }, [classId, call]);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 2000);
    return () => clearInterval(id);
  }, [refresh]);
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 500); return () => clearInterval(id); }, []);

  async function act(action) {
    setBusy(true);
    try { const d = await call({ action, source }); setRace(d.race); } catch (e) { setError(e.message); }
    setBusy(false);
  }

  if (!ready) return <div style={{ minHeight: "100vh", background: COLORS.canvas }} />;

  const readings = listRelayStationLessons().filter((l) => l.text && !l.isTrack && !l.isDaily && !l.isRace);
  const legs = (race && race.legs) || [];
  const done = legs.filter((l) => l.status === "done").length;
  const typing = legs.filter((l) => l.status === "claimed").length;
  const live = race && race.status === "live";
  const elapsed = race ? ((race.endedAt ? new Date(race.endedAt).getTime() : now) - new Date(race.startedAt).getTime()) / 1000 : 0;
  const finishedLegs = legs.filter((l) => l.status === "done" && l.accuracy !== null);
  const avgAcc = finishedLegs.length ? Math.round(finishedLegs.reduce((n, l) => n + l.accuracy, 0) / finishedLegs.length) : null;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark, display: "flex", flexDirection: "column" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      <TeacherHUD title="Relay Race Board" subtitle="Relay Station · Class Relay Race" accent={ACCENT} teacherEmail={teacherEmail} />
      <main style={{ flex: 1, padding: "24px 28px", maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ ...panelStyle(ACCENT, { padding: 16, marginBottom: 14 }), display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <label style={{ fontSize: 13, fontWeight: 700 }}>Class{" "}
            <select value={classId} onChange={(e) => setClassId(e.target.value)} style={{ marginLeft: 6, padding: "6px 10px", borderRadius: 8, border: `1px solid ${COLORS.border}` }}>
              {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label style={{ fontSize: 13, fontWeight: 700, flex: 1, minWidth: 260 }}>Message{" "}
            <select value={source} onChange={(e) => setSource(e.target.value)} style={{ marginLeft: 6, padding: "6px 10px", borderRadius: 8, border: `1px solid ${COLORS.border}`, maxWidth: "100%" }}>
              <optgroup label="Race messages (24 legs)">
                {RACE_MESSAGES.map((m) => <option key={m.key} value={m.key}>{m.title} — {m.blurb}</option>)}
              </optgroup>
              {[3, 4, 5].map((g) => (
                <optgroup key={g} label={`Grade ${g} readings (fewer legs)`}>
                  {readings.filter((r) => r.grade === g).map((r) => <option key={r.code} value={r.code}>{r.title}</option>)}
                </optgroup>
              ))}
            </select>
          </label>
          <button disabled={busy || !classId} onClick={() => act("start")} style={{ background: ACCENT, color: "#fff", border: "none", borderRadius: 999, padding: "10px 20px", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>{live ? "Restart with this message" : "🏁 Start Race"}</button>
          {live && <button disabled={busy} onClick={() => act("end")} style={{ background: "none", color: COLORS.danger, border: `1px solid ${COLORS.danger}`, borderRadius: 999, padding: "9px 18px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>End Race</button>}
        </div>
        <p style={{ fontSize: 12.5, color: COLORS.textMuted, margin: "0 0 14px" }}>
          Students join from their <b>Class Relay Race</b> assignment (Challenge Library → Relay Station → Class Relay Race tile). Each student grabs a leg, types it, and grabs another. If someone gets stuck for over a minute, a teammate can pick up their leg. When every leg is delivered, everyone who carried one earns +{RACE_CRYSTALS} 💎.
        </p>
        {error && <div style={{ background: `${COLORS.danger}18`, color: COLORS.danger, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>{error}</div>}

        <div style={{ background: "radial-gradient(ellipse at 20% 20%, #16243F 0%, #0D1B2A 50%, #060B16 100%)", borderRadius: 20, padding: "26px 30px", color: "#fff", minHeight: 420 }}>
          {!race ? (
            <div style={{ textAlign: "center", paddingTop: 110 }}>
              <div style={{ fontSize: 56 }}>🏁</div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Poppins', sans-serif" }}>Ready when you are, Commander.</div>
              <div style={{ color: "rgba(255,255,255,.65)", marginTop: 6 }}>Pick a message and press Start Race.</div>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 13, letterSpacing: 2, color: "#00C2C7", fontWeight: 800 }}>{live ? "📡 RACE IN PROGRESS" : race.status === "done" ? "✅ MESSAGE DELIVERED" : "RACE ENDED"}</div>
                  <div style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800, fontFamily: "'Poppins', sans-serif" }}>{race.title}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "clamp(34px, 5vw, 64px)", fontWeight: 800, fontFamily: "'Poppins', sans-serif", lineHeight: 1, color: race.status === "done" ? "#FFC44D" : "#fff" }}>{fmt(elapsed)}</div>
                  <div style={{ color: "rgba(255,255,255,.7)", fontSize: 14 }}>{done} / {legs.length} legs · {typing} typing now · {race.carriers} cadets{avgAcc !== null ? ` · ${avgAcc}% avg accuracy` : ""}</div>
                </div>
              </div>
              <div style={{ height: 14, background: "rgba(255,255,255,.12)", borderRadius: 99, overflow: "hidden", marginBottom: 20 }}>
                <div style={{ width: `${(done / Math.max(1, legs.length)) * 100}%`, height: "100%", background: "linear-gradient(90deg, #39D97A, #00C2C7)", transition: "width .5s" }} />
              </div>
              <div style={{ fontSize: "clamp(16px, 1.7vw, 24px)", lineHeight: 1.9 }}>
                {legs.map((l) => (
                  <span key={l.index} title={l.by ? `Leg ${l.index + 1}: ${l.by}` : `Leg ${l.index + 1}`} style={{ marginRight: 8 }}>
                    {l.status === "done" && <span style={{ color: "#39D97A" }}>{l.text}</span>}
                    {l.status === "claimed" && <span style={{ color: "#FFC44D" }}>▓▓▓▓ <span style={{ fontSize: "0.7em", opacity: 0.85 }}>({l.by} is typing)</span></span>}
                    {l.status === "open" && <span style={{ color: "rgba(255,255,255,.25)" }}>▒▒▒▒▒▒</span>}
                  </span>
                ))}
              </div>
              {race.status === "done" && (
                <div style={{ marginTop: 22, fontSize: 22, fontWeight: 800, color: "#FFC44D" }}>🎉 The whole crew delivered the message in {fmt(elapsed)}! +{RACE_CRYSTALS} 💎 for every cadet who carried a leg.</div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default function RelayRacePage() {
  return (
    <Suspense fallback={null}>
      <RelayRaceContent />
    </Suspense>
  );
}
