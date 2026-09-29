"use client";

// Small groups — Sept 29, 2026.
// Every saved group for a class: who's in it, how they're doing, when you
// last met. Groups are made from the gradebook's Small groups panel.

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import { BridgePage } from "../../../components/teacher/BridgeUI";
import { rememberedTeacherClass, rememberTeacherClass } from "../../../lib/teacherClass";
import { buildGradebook } from "../../../lib/gradebook";
import { groupProgress, meetings } from "../../../lib/smallGroups";
import { groupsApi, loadTeacherBook } from "../../../lib/groupsApi";
import "../gradebook/gradebook.css";
import "./groups.css";

function ago(value) {
  if (!value) return "";
  const days = Math.floor((Date.now() - new Date(value).getTime()) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function GroupCard({ book, group, notes }) {
  const progress = groupProgress(book, group, notes);
  const last = meetings(notes)[0];
  const s = progress.summary;
  const bits = [];
  if (s.withFollow) bits.push(`${s.movedUp} of ${s.withFollow} moved up`);
  if (s.ready) bits.push(`${s.ready} ready to leave`);
  if (s.done) bits.push(`${s.done} done`);
  return (
    <Link className="sg-group" href={`/teacher/groups/${group.id}`}>
      <div className="sg-row" style={{ justifyContent: "space-between" }}>
        <h3>{group.name}</h3>
        {group.plan && <span className="sg-tag plan">Plan ready</span>}
      </div>
      <p className="sg-sub">{group.standard_code ? `TEKS ${group.standard_code}` : "All work"}{group.subject ? ` · ${group.subject}` : ""} · {last ? `met ${ago(last.at)}` : "not met yet"}</p>
      <div className="sg-kids">
        {progress.rows.map((r) => <span key={r.student.id} className={r.done ? "done" : r.ready ? "ready" : ""}>{r.student.first_name}</span>)}
      </div>
      <p className="sg-sub">{bits.length ? bits.join(" · ") : progress.follow.length ? "Follow-up assigned, waiting on grades" : "No follow-up yet"}</p>
      {s.everyoneGetsIt && group.status !== "closed" && <span className="sg-tag ready" style={{ justifySelf: "start" }}>Everyone has it. Ready to close.</span>}
    </Link>
  );
}

export default function GroupsPage() {
  const router = useRouter();
  const [teacherEmail, setTeacherEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [setup, setSetup] = useState("");
  const [data, setData] = useState(null);
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState([]);
  const [classId, setClassId] = useState("");
  const [showClosed, setShowClosed] = useState(false);

  const load = useCallback(async (teacherId) => {
    setLoading(true);
    setError("");
    try {
      const [rows, list] = await Promise.all([loadTeacherBook(teacherId), groupsApi("list")]);
      setData(rows);
      setGroups(list.groups || []);
      setNotes(list.notes || []);
      setSetup(list.setup || "");
      setClassId((cur) => cur || rememberedTeacherClass(rows.classes, rows.classes[0]?.id || ""));
    } catch (err) {
      setError(err.message || "Couldn't load your groups.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: auth, error: authError }) => {
      if (authError || !auth?.user) { router.push("/login"); return; }
      setTeacherEmail(auth.user.email || "");
      load(auth.user.id);
    });
  }, [router, load]);

  const book = useMemo(() => (data && classId ? buildGradebook({ classId, periodKey: "all", ...data }) : null), [data, classId]);

  if (loading) return <div className="cc-loading">Loading…</div>;

  const classes = [...(data?.classes || [])].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  const mine = groups.filter((g) => g.class_id === classId);
  const open = mine.filter((g) => g.status !== "closed");
  const closed = mine.filter((g) => g.status === "closed");
  const notesFor = (id) => notes.filter((n) => n.group_id === id);

  return (
    <BridgePage teacherEmail={teacherEmail}>
      <div className="sg">
        <div className="sg-top">
          <div>
            <h1>Small groups</h1>
            <p className="sg-sub">Plan it, meet with them, follow up, and see who moved up.</p>
          </div>
          <Link className="cc-btn" href={`/teacher/gradebook?classId=${classId}&view=standard&groups=auto`}>Make a group</Link>
        </div>

        {error && <div className="cc-error" role="alert">{error}</div>}
        {setup && <div className="cc-error" role="alert">{setup}</div>}

        {classes.length > 1 && (
          <div className="sg-controls">
            <select aria-label="Class" value={classId} onChange={(e) => { setClassId(e.target.value); rememberTeacherClass(e.target.value); }}>
              {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        )}

        {book && (open.length ? (
          <div className="sg-list">{open.map((g) => <GroupCard key={g.id} book={book} group={g} notes={notesFor(g.id)} />)}</div>
        ) : (
          <div className="sg-empty">
            <p style={{ margin: "0 0 12px", fontWeight: 600, color: "#241b50" }}>No groups for this class yet.</p>
            <p style={{ margin: "0 0 14px" }}>In the gradebook, open Small groups, pick a standard, and save the group you want to pull.</p>
            <Link className="cc-btn" href={`/teacher/gradebook?classId=${classId}&view=standard&groups=auto`}>Open Small groups in the gradebook</Link>
          </div>
        ))}

        {book && closed.length > 0 && (
          <div style={{ marginTop: 22 }}>
            <button type="button" className="sg-link" onClick={() => setShowClosed(!showClosed)}>{showClosed ? "Hide" : "Show"} closed groups ({closed.length})</button>
            {showClosed && <div className="sg-list" style={{ marginTop: 10 }}>{closed.map((g) => <GroupCard key={g.id} book={book} group={g} notes={notesFor(g.id)} />)}</div>}
          </div>
        )}
      </div>
    </BridgePage>
  );
}
