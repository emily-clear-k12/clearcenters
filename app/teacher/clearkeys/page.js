"use client";
import React, { useCallback, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { BridgePage, PageHeading, ClassTabs, Empty } from "../../../components/teacher/BridgeUI";
import ClearKeysTabs from "../../../components/teacher/ClearKeysTabs";
import ClearKeysHomeView from "../../../components/teacher/ClearKeysHomeView";
import ClearKeysWeekPanel from "../../../components/teacher/ClearKeysWeekPanel";
import { TRACK_LEVELS } from "../../../lib/cases/relay-station";
import { classFuel } from "../../../lib/clearkeysFuel";
import { summarizeStudent } from "../../../lib/clearkeysReport";
import { getClassPlanet, CLASS_PLANETS } from "../../../lib/classPlanets";

// ClearKeys teacher Overview (Sept 29, 2026): setup switch, who needs help,
// year-goal picture, class fuel, and the tools. Layout: ClearKeysHomeView.
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

  if (!ready) return <div className="cc-loading">Loading...</div>;

  const cls = classes.find((c) => c.id === classId);
  const grade = Number(cls?.grade) || 4;
  const counts = { new: 0, on: 0, stuck: 0, done: 0 };
  const stuck = [];
  (rows || []).forEach((r) => {
    const k = statusKey(r.progress);
    counts[k] += 1;
    if (k === "stuck") {
      const lvl = r.progress.current_level;
      const cur = (r.progress.level_results || {})[String(lvl)] || {};
      stuck.push({ id: r.id, firstName: r.firstName, level: lvl, levelTitle: TRACK_LEVELS[lvl - 1]?.title || "", tries: cur.attempts || 0, lastAcc: typeof cur.accuracy === "number" ? cur.accuracy : null });
    }
  });
  const summaries = rows ? rows.map((r) => summarizeStudent(r.firstName, r.progress, grade)) : null;
  const fuel = rows ? classFuel(rows.map((r) => r.progress).filter(Boolean), rows.length) : null;
  const planet = getClassPlanet(cls?.planet_key) || CLASS_PLANETS[0];

  return (
    <BridgePage teacherEmail={teacherEmail}>
      <PageHeading title="ClearKeys" subtitle="Typing practice for your class">
        {classes.length > 1 && <ClassTabs classes={classes} value={classId} onChange={setClassId} />}
      </PageHeading>
      <ClearKeysTabs active="home" classId={classId} />
      {!classes.length ? (
        <Empty>Make a class first, then come back to turn on ClearKeys.</Empty>
      ) : (
        <>
          <ClearKeysHomeView cls={cls} classId={classId} rows={rows} summaries={summaries} counts={counts} stuck={stuck} fuel={fuel} planet={planet} total={TOTAL} stuckAttempts={STUCK_ATTEMPTS} error={error} />
          <ClearKeysWeekPanel classId={classId} />
        </>
      )}
    </BridgePage>
  );
}

export default function Page() {
  return <Suspense fallback={null}><ClearKeysHome /></Suspense>;
}
