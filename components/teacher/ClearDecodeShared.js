"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { ruinLabel, needsHelp, masteredRuins, minutesThisWeek, ruinState, dateKey, isComplete, slippingRuins, RUIN_ORDER, ruinIndex } from "../../lib/cleardecode/core";

// Shared pieces for the ClearDecode teacher pages (Sept 30, 2026). Same
// layout and tabs as ClearKeys so teachers learn one pattern.
const TABS = [
  { key: "home", label: "Overview", href: "/teacher/cleardecode" },
  { key: "progress", label: "Class progress", href: "/teacher/cleardecode/progress" },
  { key: "report", label: "Report", href: "/teacher/cleardecode/report" },
  { key: "words", label: "Class words", href: "/teacher/cleardecode/words" },
  { key: "kit", label: "Small-group kits", href: "/teacher/cleardecode/kit" },
];

export function ClearDecodeTabs({ active, classId }) {
  return (
    <nav aria-label="ClearDecode pages" style={{ display: "flex", gap: 4, flexWrap: "wrap", margin: "0 0 20px", borderBottom: "1px solid #e8e2f5" }}>
      {TABS.map((t) => {
        const on = t.key === active;
        return (
          <Link key={t.key} href={classId ? `${t.href}?classId=${classId}` : t.href} aria-current={on ? "page" : undefined}
            style={{ font: "600 13px Inter, sans-serif", textDecoration: "none", padding: "12px 14px", marginBottom: -1, borderBottom: `3px solid ${on ? "#7645ce" : "transparent"}`, color: on ? "#713ace" : "#716384" }}>
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

export async function callClearDecode(payload) {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch("/api/teacher/cleardecode", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, accessToken: session?.access_token }) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || "Something went wrong."), data);
  return data;
}

// Loads the teacher, her classes and the chosen class's ClearDecode list.
export function useClearDecodeClass() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [teacherEmail, setTeacherEmail] = useState("");
  const [ready, setReady] = useState(false);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(searchParams.get("classId") || "");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [needsSql, setNeedsSql] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: u, error: authError }) => {
      if (authError || !u?.user) { router.push("/login"); return; }
      setTeacherEmail(u.user.email || "");
      setReady(true);
      supabase.from("classes").select("id, name, grade").eq("teacher_id", u.user.id).order("created_at").then(({ data: cls }) => {
        setClasses(cls || []);
        if (!classId && cls && cls.length) setClassId(cls[0].id);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const reload = useCallback(async () => {
    if (!classId) return;
    setError(null);
    try { setData(await callClearDecode({ action: "list", classId })); setNeedsSql(false); }
    catch (e) { setError(e.message); setNeedsSql(!!e.needsSql); }
  }, [classId]);
  useEffect(() => { setData(null); reload(); }, [reload]);

  return { teacherEmail, ready, classes, classId, setClassId, data, reload, error, needsSql, cls: classes.find((c) => c.id === classId) };
}

// One student's status for the teacher.
export function statusOf(p) {
  if (!p) return { key: "none", label: "No scan yet", color: "neutral" };
  if (p.scan && p.scan.pending) return { key: "scanWait", label: "Scan waiting", color: "" };
  if (p.status === "on" && !p.current_ruin && isComplete(p)) return needsHelp(p) ? { key: "help", label: "Needs help", color: "danger" } : { key: "on", label: "Finished · keeper practice", color: "teal" };
  if (p.status === "on") return needsHelp(p) ? { key: "help", label: "Needs help", color: "danger" } : { key: "on", label: "In ClearDecode", color: "teal" };
  if (p.status === "off") return { key: "off", label: "Turned off", color: "neutral" };
  const r = p.scan && p.scan.result;
  if (r && r.scoredOut) return { key: "out", label: "Scored out", color: "neutral" };
  if (r) return { key: "needs", label: "Needs ClearDecode", color: "" };
  return { key: "none", label: "No scan yet", color: "neutral" };
}

export function scanLine(p) {
  const r = p && p.scan && p.scan.result;
  if (!r) return "—";
  if (r.scoredOut) return "Scored out: no ClearDecode needed";
  return `Start at ${ruinLabel(r.startRuin)}${r.belowFloor ? " · needs sounds and letters first (flag)" : ""}${r.gaps && r.gaps.length ? ` · gaps: ${r.gaps.join(", ")}` : ""}`;
}

export function weekStats(p) {
  if (!p) return { sessions: 0, minutes: 0 };
  const monday = new Date();
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  const start = dateKey(monday);
  const week = (p.log || []).filter((e) => e.date >= start && !e.placed);
  return { sessions: week.length, minutes: minutesThisWeek(p) };
}

export function recentAccuracy(p, n = 5) {
  const last = (p && p.log ? p.log : []).filter((e) => e.total).slice(-n);
  if (!last.length) return null;
  const c = last.reduce((a, e) => a + e.correct, 0);
  const t = last.reduce((a, e) => a + e.total, 0);
  return t ? Math.round((c / t) * 100) : null;
}

export function familyNote(name, p) {
  const r = p && p.current_ruin;
  const mastered = masteredRuins(p || {}).length;
  const wk = weekStats(p);
  if (!p || p.status !== "on") return `${name} isn't using ClearDecode right now.`;
  if (!r && isComplete(p)) return `${name} finished every pattern in ClearDecode, our daily word-reading practice, and now does short review missions to keep those skills sharp. This week ${name} finished ${wk.sessions} ${wk.sessions === 1 ? "session" : "sessions"}. Reading aloud together for a few minutes at home still helps.`;
  return `${name} is practicing reading and spelling words with the ${ruinLabel(r).replace(/^\w+ · /, "")} pattern in ClearDecode, our daily word-reading practice. This week ${name} finished ${wk.sessions} ${wk.sessions === 1 ? "session" : "sessions"}, and has ${mastered} ${mastered === 1 ? "pattern" : "patterns"} mastered so far. Reading aloud together for a few minutes at home helps these patterns stick.`;
}

// Where a student has had trouble: ruins with low practice accuracy, a
// missed vault, a scan gap, or a pattern slipping in keeper review.
export function troubleSpots(p) {
  if (!p) return [];
  const out = new Map();
  const add = (id, why) => { if (id && !out.has(id)) out.set(id, why); };
  slippingRuins(p).forEach((id) => add(id, "slipping in review"));
  Object.entries(p.ruins || {}).forEach(([id, v]) => { if (v && v.vaultTries >= 2) add(id, `vault took ${v.vaultTries} tries`); });
  const by = {};
  (p.log || []).filter((e) => e.kind === "chamber" && e.total).forEach((e) => { by[e.ruin] = by[e.ruin] || [0, 0, 0]; by[e.ruin][0] += e.correct; by[e.ruin][1] += e.total; by[e.ruin][2] += 1; });
  Object.entries(by).forEach(([id, [c, t, n]]) => { if (n >= 2 && c / t < 0.7) add(id, `${Math.round((c / t) * 100)}% in practice`); });
  const gaps = (p.scan && p.scan.result && p.scan.result.gaps) || [];
  gaps.forEach((id) => add(id, "scan gap"));
  return [...out.entries()].sort((a, b) => ruinIndex(a[0]) - ruinIndex(b[0])).map(([ruin, why]) => ({ ruin, why }));
}
// The student's last reread self-check, in plain words.
export function rereadNote(p) {
  const last = [...((p && p.log) || [])].reverse().find((e) => e.reread);
  if (!last) return null;
  const goal = { accurate: "every word right", smooth: "smoothly", expression: "with expression" }[last.reread.goal] || last.reread.goal;
  const self = { smooth: "felt smooth", bumps: "a few bumps", tricky: "tricky" }[last.reread.self] || last.reread.self;
  return `Reread ${goal}: ${self}`;
}

export { ruinLabel, needsHelp, masteredRuins, ruinState, isComplete, RUIN_ORDER };
