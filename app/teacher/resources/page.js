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
  return x.toISOString().slice(0, 10);
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
      <PageHeading title="Resources" subtitle="Planning for every class, then the guides." />
      {loading ? <Empty>Loading your week…</Empty> : (
        <div className="cc-stack">
          <section className="cc-panel">
            <div className="cc-row cc-between">
              <div>
                <h2>Planning</h2>
                <p className="cc-muted">Upload a calendar with date, class, topic, and an optional small group. This week shows what is already assigned, plus what the file suggests. Nothing goes to students until you assign it.</p>
              </div>
              <label className="cc-btn secondary">Upload calendar<input type="file" accept=".csv,text/csv,text/plain" onChange={onUpload} style={{ display: "none" }} /></label>
            </div>
            {note && <p className="cc-muted">{note}</p>}
            <div className="cc-week">
              <span />
              {days.map((day) => <em key={dayKey(day)} style={{ fontStyle: "normal", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "#70658d" }}>{day.toLocaleDateString(undefined, { weekday: "short", day: "numeric" })}</em>)}
              {classes.map((c) => (
                <Fragment key={c.id}>
                  <div className="cc-week-label">{c.name}</div>
                  {days.map((day) => {
                    const key = dayKey(day);
                    const due = assignments.filter((a) => a.class_id === c.id && a.due_date === key);
                    const ideas = plan.filter((item) => item.date === key && (!item.className || item.className.toLowerCase() === c.name.toLowerCase()));
                    return (
                      <article key={key} className="cc-day">
                        {due.map((a) => <p key={a.id}>{a.case_standard} due</p>)}
                        {ideas.map((item, i) => <React.Fragment key={`${item.topic}-${i}`}><strong>{item.topic}</strong>{item.group && <small>Small group · {item.group}</small>}</React.Fragment>)}
                        {!due.length && !ideas.length && <p> </p>}
                        {ideas[0] && <Link className="cc-link" href={`/teacher/assign/new?classId=${c.id}&standard=${encodeURIComponent(ideas[0].topic)}`}>Use this</Link>}
                      </article>
                    );
                  })}
                </Fragment>
              ))}
            </div>
            {!classes.length && <Empty>Create a class before planning a week.</Empty>}
          </section>
          <section className="cc-panel">
            <h2>Guides</h2>
            <p className="cc-muted">Teaching guides for a standard will live here. The printable companions are still being gathered.</p>
          </section>
        </div>
      )}
    </BridgePage>
  );
}
