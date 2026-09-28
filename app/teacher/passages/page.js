"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { BridgePage, PageHeading, Empty } from "../../../components/teacher/BridgeUI";
import { PASSAGES } from "../../../lib/passages/catalog";

const SUBJECTS = ["Science", "ELAR", "Math", "Social Studies"];
const STATUS = { draft: "Draft", checked: "Checked", live: "Live" };
const ENGINES = {
  group_chat: "Group Chat",
  assembly_deck: "Assembly Deck",
  mission_map: "Mission Map",
  frequency_rush: "Frequency Rush",
  maker_studio: "Maker Studio",
  broadcast_booth: "Broadcast Booth",
  relay_station: "ClearKeys",
  signal_defense: "Crew",
};

export default function PassagesPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);
  const [subject, setSubject] = useState("Science");
  const [selectedId, setSelectedId] = useState("sci-3-6a-raft-load");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getUser().then(({ data, error }) => {
      if (cancelled) return;
      if (error || !data?.user) { router.push("/login"); return; }
      setEmail(data.user.email || "");
      setReady(true);
    });
    return () => { cancelled = true; };
  }, [router]);

  const rows = useMemo(
    () => PASSAGES.filter((passage) => passage.subject === subject),
    [subject]
  );
  const selected = rows.find((passage) => passage.id === selectedId) || rows[0] || null;

  function chooseSubject(next) {
    setSubject(next);
    const first = PASSAGES.find((passage) => passage.subject === next);
    setSelectedId(first ? first.id : "");
    setCopied(false);
  }

  async function copyText() {
    if (!selected?.text) return;
    try {
      await navigator.clipboard.writeText(selected.text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (!ready) {
    return <BridgePage teacherEmail={email}><Empty>Loading passages…</Empty></BridgePage>;
  }

  return (
    <BridgePage teacherEmail={email}>
      <PageHeading title="Passages" subtitle="Pick a subject. Open a passage on its own." />
      <div className="cc-stack">
        <section className="cc-panel">
          <div className="cc-keys-subjects" role="group" aria-label="Subject">
            {SUBJECTS.map((name) => (
              <button key={name} type="button" className="cc-btn" aria-pressed={subject === name} onClick={() => chooseSubject(name)}>{name}</button>
            ))}
          </div>
        </section>
        {!rows.length ? (
          <Empty>No passages for {subject} yet.</Empty>
        ) : (
          <div className="cc-two">
            <section className="cc-panel">
              <h2>{subject}</h2>
              <div className="cc-gallery cc-compact-gallery">
                {rows.map((passage) => (
                  <button key={passage.id} type="button" className="cc-activity" aria-pressed={selected?.id === passage.id} onClick={() => { setSelectedId(passage.id); setCopied(false); }}>
                    <div>
                      <small>Grade {passage.grade} · {passage.standard}</small>
                      <strong>{passage.title}</strong>
                      <em>{STATUS[passage.status] || passage.status}</em>
                    </div>
                  </button>
                ))}
              </div>
            </section>
            {selected && (
              <aside className="cc-panel">
                <div className="cc-row cc-between">
                  <h2>{selected.title}</h2>
                  <span className="cc-badge neutral">{STATUS[selected.status] || selected.status}</span>
                </div>
                <p className="cc-muted">Grade {selected.grade} · {selected.subject} · {selected.standard}</p>
                <p>{selected.summary}</p>
                {selected.text.split("\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <button type="button" className="cc-btn secondary" onClick={copyText}>{copied ? "Copied" : "Copy text"}</button>
                {!!selected.usedBy?.length && (
                  <>
                    <h3>Used in</h3>
                    {selected.usedBy.map((use) => (
                      <p key={`${use.engine}-${use.standard}`} className="cc-muted">{ENGINES[use.engine] || use.engine} · {use.title}</p>
                    ))}
                  </>
                )}
              </aside>
            )}
          </div>
        )}
      </div>
    </BridgePage>
  );
}
