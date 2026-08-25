"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StudentSidebar from "../../components/StudentSidebar";

const COLORS = {
  navy: "#0D1B2A",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  gold: "#FFC44D",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
  border: "#E1E2EE",
  danger: "#E4574C",
};

// Percent-based boxes matching room features drawn into
// /public/gear/hq_background.png (a 1672x941 canvas, the "Dream Space"
// woodland-cottage art). If the background art is ever redrawn with
// different room proportions, these boxes are the only thing that needs
// to move to match it. "lighting" and "fireplace" are new slots added
// alongside the original five when the room was re-themed; "window" and
// "pet" still point at their original (pre-reskin) placeholder art since
// no replacement pieces exist for those yet — repositioned here just
// enough to sit sensibly in the new room, not restyled.
const SLOT_LAYOUT = {
  window: { left: "2%", top: "42%", width: "12%", height: "18%" },
  wall: { left: "40%", top: "24%", width: "20%", height: "34%" },
  seating: { left: "5%", top: "62%", width: "22%", height: "32%" },
  rug: { left: "33%", top: "80%", width: "34%", height: "16%" },
  pet: { left: "26%", top: "85%", width: "10%", height: "13%" },
  lighting: { left: "38%", top: "2%", width: "24%", height: "18%" },
  fireplace: { left: "70%", top: "56%", width: "24%", height: "36%" },
};

const SLOT_LABELS = {
  seating: "Seating",
  rug: "Rug",
  wall: "Wall Décor",
  window: "Window",
  pet: "Pet",
  lighting: "Lighting",
  fireplace: "Fireplace",
};
const SLOT_ORDER = ["seating", "rug", "wall", "lighting", "fireplace", "window", "pet"];

export default function GearLockerClient({ student, shopItems, inventory }) {
  const router = useRouter();
  const [busyItemId, setBusyItemId] = useState(null);
  const [error, setError] = useState(null);

  const itemsById = Object.fromEntries(shopItems.map((it) => [it.id, it]));
  const ownedByItemId = Object.fromEntries(inventory.map((row) => [row.item_id, row]));

  // What's actually showing in each slot right now.
  const equippedBySlot = {};
  inventory.forEach((row) => {
    if (!row.equipped) return;
    const item = itemsById[row.item_id];
    if (item) equippedBySlot[item.slot_key] = item;
  });

  const itemsBySlot = {};
  shopItems.forEach((item) => {
    if (!itemsBySlot[item.slot_key]) itemsBySlot[item.slot_key] = [];
    itemsBySlot[item.slot_key].push(item);
  });

  async function handleBuy(item) {
    setError(null);
    setBusyItemId(item.id);
    try {
      const res = await fetch("/api/gear/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't complete that purchase.");
        return;
      }
      router.refresh();
    } catch (err) {
      setError("Something went wrong — try again.");
    } finally {
      setBusyItemId(null);
    }
  }

  async function handleEquip(item) {
    setError(null);
    setBusyItemId(item.id);
    try {
      const res = await fetch("/api/gear/equip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id }),
      });
      if (!res.ok) {
        setError("Couldn't switch that item — try again.");
        return;
      }
      router.refresh();
    } catch (err) {
      setError("Something went wrong — try again.");
    } finally {
      setBusyItemId(null);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', sans-serif", color: COLORS.textDark, display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
        .gc-btn:disabled { cursor: default; transform: none; }
      `}</style>

      <StudentSidebar />

      <main style={{ flex: 1, padding: 24, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 700, margin: "0 0 4px 0" }}>Your HQ</h1>
            <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 14 }}>Fill your treehouse with stuff you earn from missions.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.white, borderRadius: 999, padding: "8px 16px", boxShadow: "0 4px 16px rgba(0,0,0,.08)", fontWeight: 700, fontSize: 15 }}>
            🔮 {student.crystal_points}
          </div>
        </div>

        {error && (
          <div style={{ background: "#FDEAEA", color: COLORS.danger, borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16, fontWeight: 600 }}>{error}</div>
        )}

        {/* The HQ stage */}
        <div style={{ position: "relative", width: "100%", paddingTop: "56.3%", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,.18)", marginBottom: 28 }}>
          <img src="/gear/hq_background.png" alt="Your treehouse HQ" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          {SLOT_ORDER.map((slot) => {
            const item = equippedBySlot[slot];
            if (!item) return null;
            const box = SLOT_LAYOUT[slot];
            return (
              <img
                key={slot}
                src={item.image_url}
                alt={item.name}
                style={{ position: "absolute", left: box.left, top: box.top, width: box.width, height: box.height, objectFit: "contain" }}
              />
            );
          })}
        </div>

        {/* The shop */}
        <div style={{ display: "grid", gap: 20 }}>
          {SLOT_ORDER.filter((slot) => itemsBySlot[slot]?.length).map((slot) => (
            <div key={slot}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4 }}>{SLOT_LABELS[slot]}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 14 }}>
                {itemsBySlot[slot].map((item) => {
                  const owned = ownedByItemId[item.id];
                  const isEquipped = owned?.equipped;
                  const canAfford = student.crystal_points >= item.price;
                  const busy = busyItemId === item.id;
                  return (
                    <div key={item.id} style={{ background: COLORS.white, borderRadius: 16, padding: 14, boxShadow: "0 4px 16px rgba(0,0,0,.08)", border: isEquipped ? `2px solid ${COLORS.gold}` : "2px solid transparent", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                      <div style={{ width: "100%", height: 90, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src={item.image_url} alt={item.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                      </div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, textAlign: "center" }}>{item.name}</div>
                      {owned ? (
                        <button
                          className="gc-btn"
                          onClick={() => !isEquipped && handleEquip(item)}
                          disabled={isEquipped || busy}
                          style={{ width: "100%", borderRadius: 999, padding: "7px 10px", fontWeight: 700, fontSize: 12, background: isEquipped ? COLORS.violetSoft : COLORS.cream, color: isEquipped ? COLORS.violet : COLORS.textDark }}
                        >
                          {isEquipped ? "✓ In Your HQ" : busy ? "..." : "Equip"}
                        </button>
                      ) : (
                        <button
                          className="gc-btn"
                          onClick={() => handleBuy(item)}
                          disabled={!canAfford || busy}
                          style={{ width: "100%", borderRadius: 999, padding: "7px 10px", fontWeight: 700, fontSize: 12, background: canAfford ? COLORS.violet : COLORS.border, color: canAfford ? COLORS.white : COLORS.textMuted }}
                        >
                          {busy ? "..." : `🔮 ${item.price}`}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
