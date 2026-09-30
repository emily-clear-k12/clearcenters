"use client";
import React, { useCallback, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { BridgePage, PageHeading, ClassTabs, Empty } from "../../../components/teacher/BridgeUI";
import ClearKeysTabs from "../../../components/teacher/ClearKeysTabs";
import ClearKeysSwitch from "../../../components/teacher/ClearKeysSwitch";
import { TRACK_LEVELS } from "../../../lib/cases/relay-station";
import { classFuel } from "../../../lib/clearkeysFuel";
import { getClassPlanet, CLASS_PLANETS } from "../../../lib/classPlanets";

// ClearKeys home (Sept 29, 2026): the one teacher page for typing.
// Setup (one switch), a snapshot of the class, and tabs to every typing tool.
const TOTAL = TRACK_LEVELS.length;
const STUCK_ATTEMPTS = 4;

function statusKey(p) {
  if (!p) return "new";
  if (p.completed_at || p.current_level > TOTAL) return "done";
  const cur = (p.level_results || {})[String(p.current_level)];
  if (cur && !cur.passed && (cur.attempts || 0) >= STUCK_ATTEMPTS) return "stuck";
  return "on";
}

function ClearKeysHome() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [teacherEmail, setTeacherEmail] = useState("");
  const [ready, setReady] = useState(false);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(searchParams.get("classId") || "");
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      setReady(true);
      supabase.from("classes").select("id, name, grade, planet_key").eq("teacher_id", data.user.id).order("created_at").then(({ data: cls }) => {
        setClasses(cls || []);
        if (!classId && cls && cls.length) setClassId(cls[0].id);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const load = useCallback(async () => {
    if (!classId) return;
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/teacher/typing-track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "list", classId, accessToken: session?.access_token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setRows(data.students || []);
    } catch (err) {
      setError(err.message);
    }
  }, [classId]);
  useEffect(() => { setRows(null); load(); }, [load]);

  if (!ready) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#70658d" }}>Loading...</div>;

  const cls = classes.find((c) => c.id === classId);
  const counts = { new: 0, on: 0, stuck: 0, done: 0 };
  const stuck = [];
  (rows || []).forEach((r) => { const k = statusKey(r.progress); counts[k] += 1; if (k === "stuck") stuck.push(r); });
  const q = classId ? `?classId=${classId}` : "";
  const fuel = rows ? classFuel(rows.map((r) => r.progress).filter(Boolean), rows.length) : null;
  const planet = getClassPlanet(cls?.planet_key) || CLASS_PLANETS[0];
  const tile = { background: "#fff", border: "1px solid #e7e2f2", borderRadius: 16, padding: 16, textAlign: "center" };

  return (
    <BridgePage teacherEmail={teacherEmail}>
      <PageHeading title="ClearKeys" subtitle="Typing practice that doubles as reading practice" />
      <ClearKeysTabs active="home" classId={classId} />
      {classes.length > 1 && <ClassTabs classes={classes} value={classId} onChange={setClassId} />}
      {!classes.length && <Empty>Make a class first, then come back to turn on ClearKeys.</Empty>}
      {classId && <ClearKeysSwitch classId={classId} className={cls?.name} onChange={load} />}
      {classId && (
        <section className="cc-panel" style={{ marginBottom: 18 }}>
          <h2 style={{ marginTop: 0 }}>Foundations Track right now</h2>
          {error && <p role="alert" style={{ color: "#c4233a" }}>{error}</p>}
          {!rows && !error && <p className="cc-muted">Loading students…</p>}
          {rows && !rows.length && <p className="cc-muted">No students in this class yet.</p>}
          {rows && rows.length > 0 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
                <div style={tile}><b style={{ fontSize: 28, color: "#c4233a" }}>{counts.stuck}</b><div>Need help</div></div>
                <div style={tile}><b style={{ fontSize: 28 }}>{counts.on}</b><div>On track</div></div>
                <div style={tile}><b style={{ fontSize: 28, color: "#087c43" }}>{counts.done}</b><div>All 20 passed</div></div>
                <div style={tile}><b style={{ fontSize: 28, color: "#70658d" }}>{counts.new}</b><div>Not started</div></div>
              </div>
              {fuel && (
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16, flexWrap: "wrap" }}>
                  <img src={planet.image} alt="" width={56} height={56} />
                  <div style={{ flex: "1 1 260px" }}>
                    <b>Class relay beam this week: {fuel.fuel} of {fuel.goal} fuel</b> <span className="cc-muted">(toward {planet.name})</span>
                    <div style={{ height: 10, borderRadius: 999, background: "#eee8fb", marginTop: 6, overflow: "hidden" }}>
                      <div style={{ width: `${fuel.pct}%`, height: "100%", background: "linear-gradient(90deg,#00C2C7,#7541cf)" }} />
                    </div>
                    <div className="cc-muted" style={{ fontSize: 13, marginTop: 4 }}>Each Daily Transmission and each level passed adds 1. Students see this on their ClearKeys page.</div>
                  </div>
                </div>
              )}
              {stuck.length > 0 && (
                <p style={{ marginBottom: 0 }}>
                  <b>Check on:</b> {stuck.slice(0, 6).map((s) => s.firstName).join(", ")}{stuck.length > 6 ? ` and ${stuck.length - 6} more` : ""}. They have tried their level {STUCK_ATTEMPTS} or more times.{" "}
                  <Link href={`/teacher/typing-track${q}`}>Open class progress</Link>
                </p>
              )}
            </>
          )}
        </section>
      )}
      {classId && (
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          <Link href={`/teacher/typing-track${q}`} className="cc-panel" style={{ textDecoration: "none", color: "inherit" }}><h3 style={{ marginTop: 0 }}>Class progress</h3><p className="cc-muted">Every student's level, trouble keys, placement and supports.</p></Link>
          <Link href={`/teacher/relay-race${q}`} className="cc-panel" style={{ textDecoration: "none", color: "inherit" }}><h3 style={{ marginTop: 0 }}>Relay Race</h3><p className="cc-muted">Start a whole-class race on the projector.</p></Link>
          <Link href={`/teacher/typing-texts${q}`} className="cc-panel" style={{ textDecoration: "none", color: "inherit" }}><h3 style={{ marginTop: 0 }}>My texts</h3><p className="cc-muted">Paste a passage or spelling list for students to type.</p></Link>
          <Link href={`/teacher/assign/new?product=keys${classId ? `&classId=${classId}` : ""}`} className="cc-panel" style={{ textDecoration: "none", color: "inherit" }}><h3 style={{ marginTop: 0 }}>Assign readings</h3><p className="cc-muted">Science, social studies, ELAR and number passages at each grade.</p></Link>
        </section>
      )}
    </BridgePage>
  );
}

export default function Page() {
  return <Suspense fallback={null}><ClearKeysHome /></Suspense>;
}
