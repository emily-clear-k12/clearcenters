"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlanner } from "../../../lib/v2/usePlanner";
import { SUBJECTS, DAYS, DAY_NAMES, DATES, KINDS, PRODUCT_INFO, DEMO_WEEK } from "../../../lib/v2/demoWeek";
import { StationShell, Glass, Pill, SelectChip, INK, MUTED, LINE, LAVENDER } from "../../../components/v2/StationShell";
import { Toast } from "../../../components/v2/weekKit";

export default function StationDayClient() {
  const router = useRouter();
  const params = useSearchParams();
  const p = usePlanner();
  const day = Math.min(4, Math.max(0, Number(params.get("d") ?? 2)));
  const [openId, setOpenId] = useState(params.get("open"));
  const cls = p.setup.classes.find((c) => c.key === p.classFilter) || p.setup.classes[0];
  const items = p.visible.filter((a) => a.day === day);
  const teach = items.filter((a) => a.kind === "teach");
  const work = items.filter((a) => a.kind !== "teach");
  const minutes = items.reduce((s, a) => s + (a.minutes || 0), 0);
  const opened = items.find((a) => a.id === openId) || p.activities.find((a) => a.id === openId);
  const needs = p.openSuggestions.filter((s) => s.day === day);

  const classOptions = useMemo(
    () => p.setup.classes.map((c) => ({ value: c.key, label: c.name + (c.students ? " · " + c.students + " students" : "") })),
    [p.setup.classes]
  );

  return (
    <StationShell>
      <Glass>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 34, color: INK }}>{DAY_NAMES[day]}</h1>
            <div style={{ color: MUTED, marginTop: 2 }}>
              {DATES[day]} · {p.published ? "already published" : "not published yet"} · {minutes} min
            </div>
            <div style={{ marginTop: 10 }}>
              <SelectChip value={p.classFilter === "all" ? p.setup.classes[0].key : p.classFilter} onChange={p.setClassFilter} options={classOptions} />
            </div>
          </div>
          <button type="button" onClick={() => router.push("/v2/teacher")} style={{ background: "#fff", color: INK, border: "1px solid " + LINE, borderRadius: 999, padding: "10px 16px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Back to week
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "16px 0 12px" }}>
          <Pill active={p.subjectFilter === "all"} onClick={() => p.setSubjectFilter("all")}>All subjects</Pill>
          {p.setup.subjects.map((key) => (
            <Pill key={key} active={p.subjectFilter === key} onClick={() => p.setSubjectFilter(key)} color={SUBJECTS[key].color}>
              {SUBJECTS[key].name}
            </Pill>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {DAYS.map((label, i) => {
            const on = i === day;
            return (
              <button key={label} type="button" onClick={() => router.push("/v2/teacher/day?d=" + i)} style={{ borderRadius: 999, padding: "7px 12px", border: "1px solid " + (on ? LAVENDER : LINE), background: on ? LAVENDER : "#fff", color: on ? "#fff" : INK, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                {label} {DATES[i].split(" ")[1]}{i === 2 ? " · TODAY" : ""}
              </button>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Lane title="Teach together" items={teach} onOpen={setOpenId} />
          <Lane title="Student work" items={work} onOpen={setOpenId} />
        </div>

        <div style={{ marginTop: 14, background: "#FFF7E8", border: "1px solid #F0D7A0", borderRadius: 14, padding: "10px 14px", color: INK, fontSize: 14, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <strong>Needs you</strong>
          {needs.length === 0 && <span style={{ color: MUTED }}>Nothing waiting for {cls?.name || "this class"} today.</span>}
          {needs.slice(0, 3).map((s) => (
            <span key={s.id}>
              {s.text(cls?.name)}{" "}
              <button type="button" onClick={() => p.acceptSuggestion(s)} style={{ border: "none", background: "transparent", color: LAVENDER, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{s.action}</button>
            </span>
          ))}
          <span style={{ marginLeft: "auto", color: MUTED }}>{DEMO_WEEK.gradingCount} to grade</span>
        </div>
      </Glass>

      {opened && (
        <Glass style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: SUBJECTS[opened.subject].color, textTransform: "uppercase" }}>{SUBJECTS[opened.subject].name} · {KINDS[opened.kind].label}</div>
              <h2 style={{ margin: "4px 0", fontFamily: "'Poppins', sans-serif", color: INK }}>{opened.title}</h2>
              <p style={{ margin: 0, color: MUTED, fontSize: 14 }}>{opened.minutes} min · {opened.who} · {PRODUCT_INFO[opened.product]?.about || opened.product}</p>
              <p style={{ margin: "8px 0 0", color: INK, fontSize: 14 }}>This is the live assignment for {cls?.name || "this class"}.</p>
            </div>
            <button type="button" onClick={() => setOpenId(null)} style={{ border: "none", background: "transparent", cursor: "pointer", color: MUTED, fontWeight: 700 }}>Close</button>
          </div>
        </Glass>
      )}
      <Toast toast={p.toast} />
    </StationShell>
  );
}

function Lane({ title, items, onOpen }) {
  return (
    <div style={{ background: "#fff", border: "1px solid " + LINE, borderRadius: 16, padding: 12 }}>
      <div style={{ fontWeight: 800, color: INK, marginBottom: 10 }}>{title.toUpperCase()}</div>
      <div style={{ display: "grid", gap: 8 }}>
        {items.length === 0 && <div style={{ color: MUTED, fontSize: 14 }}>Nothing in this lane today.</div>}
        {items.map((act) => {
          const sub = SUBJECTS[act.subject];
          return (
            <button key={act.id} type="button" onClick={() => onOpen(act.id)} style={{ display: "flex", gap: 10, textAlign: "left", background: "#FBFBFF", border: "1px solid " + LINE, borderRadius: 12, padding: "10px 10px 10px 0", cursor: "pointer", fontFamily: "inherit" }}>
              <span style={{ width: 6, alignSelf: "stretch", background: sub.color, borderRadius: "12px 0 0 12px" }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: sub.color, textTransform: "uppercase" }}>{sub.name}</div>
                <div style={{ fontWeight: 700, color: INK }}>{act.title}</div>
                <div style={{ fontSize: 13, color: MUTED }}>{act.minutes} min · {act.who}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
