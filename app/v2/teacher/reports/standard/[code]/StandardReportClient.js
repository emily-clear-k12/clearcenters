"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  StationShell,
  Glass,
  TeacherSubnav,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  SOFT_LAV,
  GLANCE,
  glanceChipStyle,
} from "../../../../../../components/v2/StationShell";

import {
  getStandardDetail,
  softAssignmentGlanceLine,
  REPORTS_HREF,
  REPORTS_ASSIGNMENT_HREF,
} from "../../../../../../lib/v2/demoReports";
import {
  getWhoNeedsMeCount,
  readSelectedClassFilter,
  WHO_NEEDS_ME_STORAGE_KEY,
  CHECK_INS_HREF,
  TEACHER_SETUP_KEY,
} from "../../../../../../lib/v2/demoWhoNeedsMe";
import { TEACHER_SETUPS } from "../../../../../../lib/v2/demoWeek";

function usePeriodLens() {
  const [liveCheckIns, setLiveCheckIns] = useState(null);
  const [periodId, setPeriodId] = useState(null);
  const [periodLabel, setPeriodLabel] = useState(null);
  useEffect(() => {
    const refresh = () => {
      try {
        const period = readSelectedClassFilter();
        const pid = period && period !== "all" ? period : null;
        setPeriodId(pid);
        if (pid) {
          const setupKey =
            (typeof window !== "undefined" &&
              window.localStorage.getItem(TEACHER_SETUP_KEY)) ||
            "self";
          const setup = TEACHER_SETUPS[setupKey] || TEACHER_SETUPS.self;
          const cls = setup.classes.find((c) => c.key === pid);
          setPeriodLabel(cls?.name || `Period ${pid}`);
        } else setPeriodLabel(null);
        setLiveCheckIns(
          getWhoNeedsMeCount(undefined, undefined, {
            classFilter: period,
            inheritPeriodId: period || "A",
          })
        );
      } catch {
        setLiveCheckIns(0);
        setPeriodId(null);
        setPeriodLabel(null);
      }
    };
    refresh();
    const onStorage = (e) => {
      if (
        !e.key ||
        e.key === WHO_NEEDS_ME_STORAGE_KEY ||
        e.key === "ci2.grading.inbox" ||
        e.key === "ci2.grading.confirmedIds" ||
        e.key === "ci2.teacher.classFilter" ||
        e.key === "ci2.teacher.setupKey"
      )
        refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    window.addEventListener("ci2-who-needs-updated", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-who-needs-updated", refresh);
    };
  }, []);
  const checkInsHref =
    periodId && periodId !== "all"
      ? `${CHECK_INS_HREF}?period=${encodeURIComponent(periodId)}`
      : CHECK_INS_HREF;
  const waiting = typeof liveCheckIns === "number" && liveCheckIns > 0;
  return { liveCheckIns, periodLabel, checkInsHref, waiting };
}

const btnBase = {
  borderRadius: 999,
  padding: "10px 16px",
  fontWeight: 800,
  fontSize: 13,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function StandardReportClient({ code }) {
  const detail = getStandardDetail(code);
  const { liveCheckIns, periodLabel, checkInsHref, waiting } = usePeriodLens();

  const softPrimary = {
    background: "rgba(243,238,255,.88)",
    color: LAVENDER,
    border: `1px solid ${LINE}`,
    boxShadow: "none",
  };
  const amberPrimary = {
    background: GLANCE.needsYou.bg,
    color: GLANCE.needsYou.fg,
    border: `1px solid ${GLANCE.needsYou.border}`,
    boxShadow: "none",
  };
  const calmSecondary = {
    background: GLANCE.ready.bg,
    color: GLANCE.ready.fg,
    border: `1px solid ${GLANCE.ready.border}`,
  };
  const quietChip = {
    color: MUTED,
    background: SOFT_LAV,
    border: `1px solid ${LINE}`,
  };

  if (!detail) {
    return (
      <StationShell active="grow">
        <TeacherSubnav active="reports" />
        <div style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
          <Glass style={{ padding: 24 }}>
            <p style={{ color: MUTED, margin: 0 }}>That standard isn&apos;t in the demo MAP.</p>
            <Link href={REPORTS_HREF} style={{ ...btnBase, ...softPrimary, marginTop: 16 }}>← Back to Reports</Link>
          </Glass>
        </div>
      </StationShell>
    );
  }

  const { standard, contributing, softHint, calmNext, honesty, classPctLabel, dayHref } = detail;

  return (
    <StationShell active="grow">
      <TeacherSubnav active="reports" />
      <div style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
        <Glass style={{ padding: "18px 18px 16px" }}>
          <Link href={REPORTS_HREF} style={{ fontSize: 12, fontWeight: 700, color: MUTED, textDecoration: "none" }}>← Reports glance</Link>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start", marginTop: 10 }}>
            <div style={{ minWidth: 0, flex: "1 1 220px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: GLANCE.ready.fg, textTransform: "uppercase", letterSpacing: 0.35 }}>
                Standard report · {standard.subjectName}
              </div>
              <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: "6px 0 0", fontSize: 22, fontWeight: 700, color: INK, lineHeight: 1.25 }}>
                TEKS {standard.code}
              </h1>
              <p style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 500, color: MUTED, lineHeight: 1.4, maxWidth: 480 }}>{standard.plain}</p>
            </div>
            <div role="status" style={{ borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 700, ...quietChip }}>{honesty}</div>
          </div>
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span style={{ ...glanceChipStyle("ready"), borderRadius: 999, padding: "5px 11px", fontSize: 12, fontWeight: 700 }}>{classPctLabel}</span>
            <span style={{ ...quietChip, borderRadius: 999, padding: "5px 11px", fontSize: 12, fontWeight: 700 }}>{softHint}</span>
            {periodLabel ? <span style={{ ...quietChip, borderRadius: 999, padding: "5px 11px", fontSize: 12, fontWeight: 700 }}>Period · {periodLabel}</span> : null}
          </div>
          <div aria-hidden style={{ marginTop: 14, height: 8, borderRadius: 999, background: "rgba(247,244,255,.9)", border: `1px solid ${LINE}`, overflow: "hidden", maxWidth: 360 }}>
            <div style={{ width: `${Math.max(4, Math.min(100, standard.classPct))}%`, height: "100%", borderRadius: 999, background: GLANCE.ready.fg, opacity: 0.7 }} />
          </div>
          <p style={{ margin: "14px 0 0", fontSize: 14, fontWeight: 600, color: INK, lineHeight: 1.45, maxWidth: 520 }}>{calmNext}</p>
          <section style={{ marginTop: 20 }} aria-label="Contributing work">
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.35, color: MUTED, textTransform: "uppercase", marginBottom: 8 }}>Work that fed this glance</div>
            {contributing.length === 0 ? (
              <p style={{ margin: 0, color: MUTED, fontSize: 13 }}>No demo assignments linked yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {contributing.map((asg) => (
                  <Link key={asg.id} href={REPORTS_ASSIGNMENT_HREF(asg.id)} style={{ display: "block", textDecoration: "none", color: "inherit", background: "rgba(255,255,255,.92)", border: `1px solid ${LINE}`, borderRadius: 14, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: MUTED, textTransform: "uppercase" }}>{asg.subjectName}{asg.when ? ` · ${asg.when}` : ""}</div>
                    <div style={{ marginTop: 2, fontWeight: 700, fontSize: 14, color: INK }}>{asg.title}</div>
                    <div style={{ marginTop: 3, fontSize: 12, fontWeight: 600, color: MUTED }}>{softAssignmentGlanceLine(asg)} · See breakdown →</div>
                  </Link>
                ))}
              </div>
            )}
          </section>
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8, maxWidth: 320 }}>
            <Link href={checkInsHref} style={{ ...btnBase, ...(waiting ? amberPrimary : calmSecondary), width: "100%" }} title={waiting ? "Open Check-ins — live waiting needs you" : "Open Check-ins (secondary)"}>
              Check-ins{waiting ? ` · ${liveCheckIns} waiting` : ""} →
            </Link>
            <Link href={dayHref} style={{ ...btnBase, ...softPrimary, width: "100%" }}>← Daily Focus</Link>
            <Link href={REPORTS_HREF} style={{ ...btnBase, color: MUTED, background: "rgba(255,255,255,.88)", border: `1px solid ${LINE}`, width: "100%", fontWeight: 700 }}>Back to Reports MAP</Link>
          </div>
        </Glass>
      </div>
    </StationShell>
  );
}
