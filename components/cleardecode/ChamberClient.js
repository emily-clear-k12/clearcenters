"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { S, C, CrystalIcon } from "./ui";
import Stage, { SideCard, At } from "./Stage";
import { WarmRoom, CodexRoom, WallRoom, SortRoom, DoorRoom, ForgeRoom, ChainRoom, ReadRoom, RereadRoom, ClassRoom, VaultRoom, MAIN } from "./Rooms";
import { GameRoom } from "./Games";

// One daily ClearDecode session: a chamber (rooms in order) or the vault.
// Saves the resume point after every room; the result is saved at the end.
// Relic Lab redesign (Sept 30, 2026): each room sits on its scene.
const ROOM = { warm: WarmRoom, codex: CodexRoom, wall: WallRoom, sort: SortRoom, door: DoorRoom, forge: ForgeRoom, chain: ChainRoom, read: ReadRoom, reread: RereadRoom, class: ClassRoom };
const SCENE = { wall: "wall", door: "door", sort: "sort", forge: "forge", read: "tablet", reread: "tablet" };
const LABEL = { reread: "Reread", warm: "Warm-up", codex: "Codex", wall: "Glyph wall", sort: "Sorting vault", door: "Sealed door", forge: "Forge", chain: "Word chain", read: "Inscription", class: "Class words", game: "Bonus game" };
const SAM = {
  warm: "Quick warm-up on codes you already cracked.",
  codex: "Here's a new code from the ruins!",
  wall: "Find the vowel sounds first.",
  sort: "Read it, then sort it.",
  door: "Listen sound by sound.",
  forge: "Word parts snap together like key pieces.",
  chain: "Change just one sound each time.",
  read: "Read it first. Then hunt.",
  reread: "Same log, new goal. You've got this.",
  class: "Big words from your class. Chunk them now.",
  game: "You earned it. Only code words count.",
};

async function post(payload) {
  const res = await fetch("/api/cleardecode", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || "Couldn't save."), data);
  return data;
}

export default function ChamberClient({ session, rooms, vault, startRoom = 0, ruinName, codeLabel, meta, skin, relic, pieces = 0, keeper = false }) {
  const [idx, setIdx] = useState(vault ? 0 : Math.min(startRoom, Math.max(0, rooms.length - 1)));
  const [phase, setPhase] = useState("play"); // play | saving | done | error
  const [reward, setReward] = useState(null);
  const [err, setErr] = useState("");
  const stats = useRef({ correct: 0, total: 0, bonus: 0, items: [], reread: null });
  const started = useRef(Date.now());
  const m = meta || { ruinName, codeLabel };
  const planetScene = m.planetId ? `planet-${m.planetId}` : "flats";

  async function finish() {
    setPhase("saving");
    try {
      const minutes = Math.max(1, Math.round((Date.now() - started.current) / 60000));
      const data = await post({ action: "finish", ruin: session.ruin, correct: stats.current.correct, total: stats.current.total, minutes, bonus: stats.current.bonus, items: stats.current.items, reread: stats.current.reread });
      setReward(data); setPhase("done");
    } catch (e) { setErr(e.message); setPhase(e.already ? "done" : "error"); }
  }
  function roomDone(res) {
    stats.current.correct += res.correct || 0;
    stats.current.total += res.total || 0;
    if (res.bonus) stats.current.bonus = res.bonus;
    if (Array.isArray(res.items)) stats.current.items = [...stats.current.items, ...res.items];
    if (res.reread) stats.current.reread = res.reread;
    const next = idx + 1;
    if (next >= rooms.length) { finish(); return; }
    setIdx(next);
    post({ action: "room", ruin: session.ruin, room: next }).catch(() => {});
  }

  const exit = { href: "/decode", label: "Save and exit" };
  if (phase !== "play") {
    return (
      <Stage scene={vault && phase === "done" && reward?.result?.passed ? "case" : planetScene} exit={phase === "done" ? null : exit} sam={{ skin, line: phase === "done" ? (vault ? (reward?.result?.passed ? "Vault cracked. That relic is yours." : "Close. One more practice run, then try again.") : "Nice work today, Cadet.") : "Saving your expedition…", state: phase === "done" ? "celebrating" : "thinking" }}>
        {phase === "saving" && <Center><p style={{ ...S.p, fontSize: 24, textAlign: "center" }}>Saving your expedition…</p></Center>}
        {phase === "error" && <Center><p style={{ ...S.p, color: C.warn, fontSize: 22, textAlign: "center" }}>{err}</p><button type="button" style={S.primary} onClick={finish}>Try saving again</button></Center>}
        {phase === "done" && <Reward data={reward} vault={!!vault} keeper={keeper} message={err} ruinName={m.ruinName} />}
      </Stage>
    );
  }

  if (vault) {
    return (
      <Stage scene="vault" exit={exit} sam={{ skin, line: "One try per seal.", size: 120 }}
        side={<SideCard meta={m} width={290} />} sideTop={120}>
        <VaultRoom items={vault} relic={relic} pieces={pieces} onDone={(r) => { stats.current = { ...stats.current, ...r }; finish(); }} />
      </Stage>
    );
  }

  const room = rooms[idx];
  const Comp = ROOM[room.type];
  const steps = rooms.map((r, i) => ({ label: LABEL[r.type], state: i < idx ? "done" : i === idx ? "now" : "todo" }));
  return (
    <Stage scene={room.type === "game" ? (room.kind === "runner" ? "runner" : planetScene) : SCENE[room.type] || planetScene} exit={exit} sam={{ skin, line: room.type === "wall" && room.mode === "sounds" ? "Hear each sound. Then cut." : SAM[room.type], state: "helping" }}
      side={<SideCard meta={m} title={keeper ? "Keeper mission" : `Chamber ${session.n}`} steps={steps} />}>
      {room.type === "game" ? <GameRoom key={idx} room={room} onDone={roomDone} /> : <Comp key={idx} room={room} onDone={roomDone} />}
    </Stage>
  );
}

function Center({ children }) {
  return (
    <At x={420} y={260} w={1120} h={420}>
      <div style={{ ...S.glass, height: "100%", padding: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22 }}>{children}</div>
    </At>
  );
}

function Reward({ data, vault, keeper, message, ruinName }) {
  const rr = (data && data.result) || {};
  if (vault && rr.passed && rr.complete) {
    return (
      <Center>
        <div style={S.eyebrow}>ClearDecode complete</div>
        <h1 style={{ ...S.h1, fontSize: 48, margin: 0 }}>You can read the builders&apos; code.</h1>
        <p style={{ ...S.p, fontSize: 22, textAlign: "center", maxWidth: 860, margin: 0 }}>{rr.relic ? `${rr.relic.name}: ${rr.relic.caption}` : "The Builders' Seal is yours."} From now on you are a Keeper of the Archive. Short keeper missions keep every code sharp.</p>
        {data.crystals > 0 && <div style={{ display: "flex", alignItems: "center", gap: 10, font: "800 26px Poppins, sans-serif", color: C.gold }}><CrystalIcon size={30} /> +{data.crystals} crystals</div>}
        <Link href="/decode" style={{ ...S.primary, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>To the archive →</Link>
      </Center>
    );
  }
  if (keeper && data) {
    return (
      <Center>
        <div style={S.eyebrow}>Keeper mission complete</div>
        <h1 style={{ ...S.h1, fontSize: 46, margin: 0 }}>The archive is safe.</h1>
        <p style={{ ...S.p, fontSize: 22, textAlign: "center", margin: 0 }}>Every code you reviewed today stays sharp.</p>
        {data.crystals > 0 && <div style={{ display: "flex", alignItems: "center", gap: 10, font: "800 26px Poppins, sans-serif", color: C.gold }}><CrystalIcon size={30} /> +{data.crystals} crystals</div>}
        <Link href="/decode" style={{ ...S.primary, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>Back to the map →</Link>
      </Center>
    );
  }
  if (!data) return <Center><p style={{ ...S.p, fontSize: 24 }}>{message || "Done for today."}</p><Link href="/decode" style={{ ...S.primary, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>Back to the map</Link></Center>;
  const r = data.result || {};
  const headline = vault ? (r.passed ? "Vault cracked!" : "The vault held this time.") : "Chamber cleared";
  const line = vault
    ? (r.passed ? `${r.relic ? r.relic.name : "A relic"} goes in your relic case. ${r.relic ? r.relic.caption : ""}` : `You cracked ${r.correct} seals. One more practice chamber tomorrow, then you can try the vault again.`)
    : r.movedBack ? "S.A.M. found an easier way in. Your next chamber is in a different part of the ruins." : `Relic piece ${r.piece || 1} of 4 from ${ruinName}.`;
  const piece = Math.min(4, r.piece || 0);
  return (
    <Center>
      <div style={S.eyebrow}>{vault ? "The vault" : "Chamber complete"}</div>
      <h1 style={{ ...S.h1, fontSize: 46, margin: 0 }}>{headline}</h1>
      <p style={{ ...S.p, fontSize: 22, textAlign: "center", maxWidth: 820, margin: 0 }}>{line}</p>
      {!vault && !r.movedBack && (
        <div style={{ display: "flex", gap: 12 }}>
          {[0, 1, 2, 3].map((k) => <div key={k} style={{ width: 70, height: 70, borderRadius: 14, border: "3px solid #9fd6f2", background: k < piece ? "linear-gradient(135deg, #ffd765, #d99a14)" : "#fff", boxShadow: k < piece ? "0 0 14px rgba(255,200,60,0.7)" : "none" }} />)}
        </div>
      )}
      {data.crystals > 0 && <div style={{ display: "flex", alignItems: "center", gap: 10, font: "800 26px Poppins, sans-serif", color: C.gold }}><CrystalIcon size={30} /> +{data.crystals} crystals</div>}
      <Link href="/decode" style={{ ...S.primary, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>Back to the map →</Link>
    </Center>
  );
}
