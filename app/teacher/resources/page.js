"use client";

import React, { Fragment, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { BridgePage, PageHeading, Empty } from "../../../components/teacher/BridgeUI";

function mondayOf(date) {
  const x = new Date(date);
  const day = x.getDay();
  x.setDate(x.getDate() + (day === 0 ? -6 : 1 - day));
  x.setHours(0, 0, 0, 0);
  return x;
}

function dayKey(date) {
  const x = new Date(date);
  x.setHours(0, 0, 0, 0);
  return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`;
}

export default function ResourcesPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [plan, setPlan] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) { router.push("/login"); return; }
      const classResult = await supabase.from("classes").select("id,name,grade,subject").eq("teacher_id", data.user.id).order("name");
      const rows = classResult.data || [];
      let assigned = [];
      if (rows.length) {
        const ids = rows.map((c) => c.id);
        const assignmentResult = await supabase.from("assignments").select("id,class_id,case_standard,due_date").in("class_id", ids);
        assigned = assignmentResult.data || [];
      }
      if (cancelled) return;
      setEmail(data.user.email || "");
      setClasses(rows);
      setAssignments(assigned);
      try { setPlan(JSON.parse(sessionStorage.getItem("cc-plan") || "[]")); } catch { setPlan([]); }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [router]);

  const days = useMemo(() => {
    const start = mondayOf(new Date());
    return Array.from({ length: 5 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  }, []);

  function onUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const lines = String(reader.result || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      const parsed = [];
      lines.forEach((line, index) => {
        if (index === 0 && /date/i.test(line) && /topic/i.test(line)) return;
        const [date, className, topic, group] = line.split(",").map((part) => (part || "").trim());
        if (!date || !topic) return;
        parsed.push({ date: date.slice(0, 10), className, topic, group });
      });
      setPlan(parsed);
      try { sessionStorage.setItem("cc-plan", JSON.stringify(parsed)); } catch {}
      setNote(parsed.length ? "Calendar read. Nothing is assigned until you use a day." : "Add a date and a topic on each line.");
    };
    reader.readAsText(file);
  }

  return (
    <BridgePage teacherEmail={email}>
      <PageHeading title="Resources" subtitle="Plan your week and find support for your next lesson." />
      {loading ? <Empty>Loading your week…</Empty> : (
        <div className="cc-stack">
          <section className="cc-panel">
            <div className="cc-row cc-between">
              <div>
                <h2>This week</h2>
                <p className="cc-week-range">{days[0].toLocaleDateString(undefined,{month:"long",day:"numeric"})} – {days[4].toLocaleDateString(undefined,{month:"long",day:"numeric",year:"numeric"})}</p>
                <p className="cc-muted">See activities by due date and ideas from your calendar. Upload a CSV with date, class, topic, and optional small group. Ideas stay private until you assign them.</p>
              </div>
              <label className="cc-btn secondary">Upload calendar<input type="file" accept=".csv,text/csv,text/plain" onChange={onUpload} style={{ display: "none" }} /></label>
            </div>
            {note && <p className="cc-muted">{note}</p>}
            <div className="cc-week-scroll"><div className="cc-week">
              <span />
              {days.map(day=><div key={dayKey(day)} className={'cc-week-date'+(dayKey(day)===dayKey(new Date())?' is-today':'')} aria-current={dayKey(day)===dayKey(new Date())?'date':undefined}>{day.toLocaleDateString(undefined,{weekday:'short',day:'numeric'})}{dayKey(day)===dayKey(new Date())&&<span>Today</span>}</div>)}
              {classes.map((c) => (
                <Fragment key={c.id}>
                  <div className="cc-week-label">{c.name}</div>
                  {days.map((day) => {
                    const key = dayKey(day);
                    const due = assignments.filter((a) => a.class_id === c.id && a.due_date === key);
                    const ideas = plan.filter((item) => item.date === key && (!item.className || item.className.toLowerCase() === c.name.toLowerCase()));
                    return (
                      <article key={key} className={"cc-day"+(key===dayKey(new Date())?" is-today":"")}>
                        {due.map((a) => <p key={a.id}>{a.case_standard} due</p>)}
                        {ideas.map((item, i) => <React.Fragment key={`${item.topic}-${i}`}><strong>{item.topic}</strong>{item.group && <small>Small group · {item.group}</small>}</React.Fragment>)}
                        {!due.length && !ideas.length && <p className="cc-day-empty">No activities scheduled</p>}
                        {ideas[0] && <Link className="cc-link" href={`/teacher/assign/new?classId=${c.id}&standard=${encodeURIComponent(ideas[0].topic)}`}>Use this</Link>}
                      </article>
                    );
                  })}
                </Fragment>
              ))}
            </div>
            </div>
            {!classes.length && <Empty>Create a class before planning a week.</Empty>}
          </section>
          <section className="cc-panel">
            <div className="cc-row cc-between"><h2>Teaching guides</h2><span className="cc-badge neutral">Coming soon</span></div>
            <p className="cc-muted">Printable lesson companions are on their way. For now, open an activity to explore its learning purpose and teaching notes.</p>
            <Link className="cc-btn secondary" href="/teacher/assign/new">Explore activities</Link>
          </section>
        </div>
      )}
    </BridgePage>
  );
}
