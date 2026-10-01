"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { S, C, Sam, CrystalIcon } from "./ui";
import { WarmRoom, CodexRoom, WallRoom, SortRoom, DoorRoom, ForgeRoom, ChainRoom, ReadRoom, ClassRoom, VaultRoom } from "./Rooms";
import { GameRoom } from "./Games";

// One daily ClearDecode session: a chamber (rooms in order) or the vault.
// Saves the resume point after every room; the result is saved at the end.
const ROOM = { warm: WarmRoom, codex: CodexRoom, wall: WallRoom, sort: SortRoom, door: DoorRoom, forge: ForgeRoom, chain: ChainRoom, read: ReadRoom, class: ClassRoom };
const LABEL = { warm: "Warm-up", codex: "Codex", wall: "Glyph wall", sort: "Sorting vault", door: "Sealed door", forge: "Forge", chain: "Word chain", read: "Inscription", class: "Class words", game: "Bonus game" };
const SAM = {
  warm: "Quick warm-up on codes you already cracked. Listen, then tap.",
  codex: "New code from the builders. Tap every word and watch the glowing part.",
  wall: "Long words break into chunks. Find the vowel sounds first.",
  sort: "Read each relic, then send it to the right vault.",
  door: "Now you spell it. Listen to the password, then build it.",
  forge: "Word parts snap together like key pieces. Think about what each part means.",
  chain: "Change just one sound each time.",
  read: "Read the log first. Then hunt for the code words.",
  class: "These are big words from your class this week. Chunk them now and they'll be easy later.",
  game: "You earned it. Only words with today's code count.",
};

async function post(payload) {
  const res = await fetch("/api/cleardecode", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || "Couldn't save."), data);
  return data;
}

export default function ChamberClient({ session, rooms, vault, startRoom = 0, ruinName, codeLabel }) {
  const [idx, setIdx] = useState(vault ? 0 : Math.min(startRoom, Math.max(0, rooms.length - 1)));
  const [phase, setPhase] = useState("play"); // play | saving | done | error
  const [reward, setReward] = useState(null);
  const [err, setErr] = useState("");
  const stats = useRef({ correct: 0, total: 0, bonus: 0 });
  const started = useRef(Date.now());

  async function finish() {
    setPhase("saving");
    try {
      const minutes = Math.max(1, Math.round((Date.now() - started.current) / 60000));
      const data = await post({ action: "finish", ruin: session.ruin, correct: stats.current.correct, total: stats.current.total, minutes, bonus: stats.current.bonus });
      setReward(data); setPhase("done");
    } catch (e) { setErr(e.message); setPhase(e.already ? "done" : "error"); }
  }
  function roomDone(res) {
    stats.current.correct += res.correct || 0;
    stats.current.total += res.total || 0;
    if (res.bonus) stats.current.bonus = res.bonus;
    const next = idx + 1;
    if (next >= rooms.length) { finish(); return; }
    setIdx(next);
    post({ action: "room", ruin: session.ruin, room: next }).catch(() => {});
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const room = !vault ? rooms[idx] : null;
  const Comp = room ? ROOM[room.type] : null;
  const title = vault ? "The vault" : `Chamber ${session.n}`;

  return (
    <main style={S.page}>
      <div style={S.wrap}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted }}>ClearDecode · Relic Lab</div>
            <div style={{ font: "700 20px Poppins, sans-serif" }}>{ruinName} · {title}</div>
          </div>
          <Link href="/decode" style={{ ...S.secondary, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>Save and exit</Link>
        </header>
        {!vault && phase === "play" && (
          <nav aria-label="Rooms" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {rooms.map((r, i) => (
              <span key={i} style={{ padding: "7px 13px", borderRadius: 999, font: "600 12.5px Inter, sans-serif", whiteSpace: "nowrap", border: `1px solid ${i === idx ? C.teal : i < idx ? C.line2 : "#262b66"}`, background: i === idx ? "rgba(47,212,200,0.14)" : i < idx ? "#1b2052" : "transparent", color: i === idx ? C.tealText : i < idx ? C.soft : "#6f73a8" }}>{i < idx ? "✓ " : ""}{LABEL[r.type]}</span>
            ))}
          </nav>
        )}

        {phase === "play" && vault && <VaultRoom items={vault} onDone={(r) => { stats.current = { ...stats.current, ...r }; finish(); }} />}
        {phase === "play" && room && room.type === "game" && <GameRoom key={idx} room={room} onDone={roomDone} />}
        {phase === "play" && Comp && <Comp key={idx} room={room} onDone={roomDone} />}
        {phase === "saving" && <section style={S.panel}><p style={S.p}>Saving your expedition…</p></section>}
        {phase === "error" && (
          <section style={S.panel}>
            <p style={{ ...S.p, color: C.warn }}>{err}</p>
            <button type="button" style={S.primary} onClick={finish}>Try saving again</button>
          </section>
        )}
        {phase === "done" && <Reward data={reward} vault={!!vault} message={err} ruinName={ruinName} />}

        {phase === "play" && <Sam line={vault ? "One try per seal. Show what you know." : SAM[room && room.type]} />}
      </div>
    </main>
  );
}

function Reward({ data, vault, message, ruinName }) {
  if (!data) return <section style={S.panel}><p style={S.p}>{message || "Done for today."}</p><Link href="/decode" style={{ ...S.primary, display: "inline-flex", alignItems: "center", textDecoration: "none", marginTop: 12 }}>Back to the map</Link></section>;
  const r = data.result || {};
  const headline = vault ? (r.passed ? "Vault cracked!" : "The vault held this time.") : `Chamber cleared · relic piece ${r.piece || 1} of 4`;
  const line = vault
    ? (r.passed ? `${r.relic ? r.relic.name : "A relic"} goes in your relic case. ${r.relic ? r.relic.caption : ""}` : `You cracked ${r.correct} seals. One more practice chamber tomorrow, then you can try the vault again.`)
    : r.movedBack ? "S.A.M. found an easier way in. Your next chamber is in a different part of the ruins." : `Another piece of the ${ruinName} relic.`;
  return (
    <section style={{ ...S.panel, display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
      <div style={S.eyebrow}>{vault ? "The vault" : "Chamber complete"}</div>
      <h1 style={S.h1}>{headline}</h1>
      <p style={{ ...S.p, fontSize: 17 }}>{line}</p>
      {data.crystals > 0 && <div style={{ display: "flex", alignItems: "center", gap: 10, font: "700 18px Poppins, sans-serif", color: C.gold }}><CrystalIcon size={22} /> +{data.crystals} crystals</div>}
      <Link href="/decode" style={{ ...S.primary, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>Back to the map</Link>
    </section>
  );
}
