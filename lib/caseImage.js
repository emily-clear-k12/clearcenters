"use client";

import { useEffect, useState } from "react";

const SUFFIXES = ["-TH", "-WI", "-AD", "-SD", "-SL", "-SC", "-MM"];

function engineFallback(file) {
  if (file.startsWith("RS-")) return "/teacher/challenges/relay_station.jpg";
  if (file.endsWith("-AD")) return "/teacher/challenges/assembly_deck.jpg";
  if (file.endsWith("-SD")) return "/teacher/challenges/signal_defense.jpg";
  if (file.endsWith("-SL")) return "/teacher/challenges/simulation_lab.jpg";
  if (file.endsWith("-MM") || file.includes("-MM-")) return "/teacher/challenges/mission_map.jpg";
  if (file.includes("-FR")) return "/teacher/challenges/frequency_rush.jpg";
  if (file.endsWith("-SC-TH") || file.endsWith("-TH")) return "/teacher/challenges/fact_check_desk.jpg";
  if (file.endsWith("-SC-WI") || file.endsWith("-WI")) return "/signal-check/window.jpg";
  return "/icons/crystal_points.png";
}

export function caseImageCandidates(standard) {
  if (!standard) return ["/icons/crystal_points.png"];
  const file = String(standard).replace(/\./g, "-");
  const list = [];
  const add = (url) => {
    if (url && !list.includes(url)) list.push(url);
  };
  add(`/cases/${file}.jpg`);
  let cur = file;
  for (let i = 0; i < SUFFIXES.length; i += 1) {
    const suffix = SUFFIXES.find((item) => cur.endsWith(item));
    if (!suffix) break;
    cur = cur.slice(0, -suffix.length);
    add(`/cases/${cur}.jpg`);
  }
  add(engineFallback(file));
  return list;
}

export function CaseImage({ standard, alt = "", style, className }) {
  const candidates = caseImageCandidates(standard);
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
