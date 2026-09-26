"use client";

import { useEffect, useState } from "react";

const MODE_SUFFIXES = ["-TH", "-WI"];

const ENGINE_IMAGE = {
  mission_map: "/teacher/challenges/mission_map.jpg",
  group_chat: "/teacher/challenges/group_chat.jpg",
  fact_check_desk: "/teacher/challenges/fact_check_desk.jpg",
  assembly_deck: "/teacher/challenges/repair_desk.jpg",
  frequency_rush: "/teacher/challenges/frequency_rush.jpg",
  simulation_lab: "/teacher/challenges/simulation_lab.jpg",
  signal_defense: "/teacher/challenges/signal_defense.jpg",
  relay_station: "/teacher/products/keys.jpg",
  classification_lab: "/lab/room.jpg",
  exhibit_hall: "/maker/hall.jpg",
  expedition_station: "/teacher/challenges/mission_map.jpg",
  maker_studio: "/teacher/challenges/museum_exhibit.jpg",
};

function engineFallback(file, engine) {
  if (engine && ENGINE_IMAGE[engine]) return ENGINE_IMAGE[engine];
  if (file.startsWith("RS-")) return ENGINE_IMAGE.relay_station;
  if (file.endsWith("-AD")) return ENGINE_IMAGE.assembly_deck;
  if (file.endsWith("-SD")) return ENGINE_IMAGE.signal_defense;
  if (file.endsWith("-SL")) return ENGINE_IMAGE.simulation_lab;
  if (file.endsWith("-MM") || file.includes("-MM-")) return ENGINE_IMAGE.mission_map;
  if (file.includes("-FR")) return ENGINE_IMAGE.frequency_rush;
  if (file.endsWith("-CL")) return ENGINE_IMAGE.classification_lab;
  if (file.endsWith("-EX")) return ENGINE_IMAGE.exhibit_hall;
  if (file.endsWith("-GC")) return ENGINE_IMAGE.group_chat;
  if (file.endsWith("-SC") || file.endsWith("-SC-TH") || file.endsWith("-TH") || file.endsWith("-SC-WI") || file.endsWith("-WI")) return ENGINE_IMAGE.fact_check_desk;
  return "/icons/crystal_points.png";
}

export function caseImageCandidates(standard, engine) {
  const file = String(standard || "").replace(/\./g, "-");
  const list = [];
  const add = (url) => {
    if (url && !list.includes(url)) list.push(url);
  };
  if (file) add(`/cases/${file}.jpg`);
  let cur = file;
  for (let i = 0; i < MODE_SUFFIXES.length && cur; i += 1) {
    const suffix = MODE_SUFFIXES.find((item) => cur.endsWith(item));
    if (!suffix) break;
    cur = cur.slice(0, -suffix.length);
    add(`/cases/${cur}.jpg`);
  }
  add(engineFallback(file, engine));
  return list.length ? list : ["/icons/crystal_points.png"];
}

export function CaseImage({ standard, engine, alt = "", style, className }) {
  const candidates = caseImageCandidates(standard, engine);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [standard]);

  return (
    <img
      src={candidates[Math.min(index, candidates.length - 1)]}
      alt={alt}
      className={className}
      style={style}
      onError={() => setIndex((current) => (current < candidates.length - 1 ? current + 1 : current))}
    />
  );
}
