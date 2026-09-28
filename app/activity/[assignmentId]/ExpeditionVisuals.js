"use client";

// Expedition Station — whole-number math visuals (Sept 27, 2026).
// A task (or one part of a parts task) can carry `visual: { type, ... }`.
// None of these configs hold answers. Interactive ones report a value:
//   blocks  (build)  → a whole number          (answer kind: number)
//   numline (pick)   → a whole number          (answer kind: number)
//   money   (build)  → dollars, e.g. 3.45      (answer kind: number)
//   coords  (pick)   → { x, y }                (answer kind: point)
// Show-only visuals: blocks (show), array, bars, pictograph, dotplot, angle, coords (show).

import { useState } from "react";

const PLACE_INFO = {
  thousands: { label: "Thousands", value: 1000, short: "1,000" },
  hundreds: { label: "Hundreds", value: 100, short: "100" },
  tens: { label: "Tens", value: 10, short: "10" },
  ones: { label: "Ones", value: 1, short: "1" },
};

function fmt(n) {
  return Number(n).toLocaleString("en-US");
}

function BlockPiece({ place }) {
  return <i className={`esv-block esv-block-${place}`} aria-hidden="true" />;
}

// Base-ten blocks. build: steppers per place set the number. show: fixed counts.
function Blocks({ v, value, onChange }) {
  const places = v.places || ["hundreds", "tens", "ones"];
  const [counts, setCounts] = useState(() => {
    const c = {};
    places.forEach((p) => (c[p] = (v.start && v.start[p]) || 0));
    return c;
  });
  const shown = v.mode === "show" ? v.counts || {} : counts;
  const total = places.reduce((sum, p) => sum + (shown[p] || 0) * PLACE_INFO[p].value, 0);
  const set = (p, n) => {
    const next = { ...counts, [p]: Math.max(0, Math.min(v.maxPer || 19, n)) };
    setCounts(next);
    onChange && onChange(String(places.reduce((sum, q) => sum + (next[q] || 0) * PLACE_INFO[q].value, 0)));
  };
  return (
    <div className="esv-card">
      {v.title ? <div className="esv-title">{v.title}</div> : null}
      <div className="esv-blocks">
        {places.map((p) => (
          <div className="esv-place" key={p}>
            <div className="esv-place-head">{PLACE_INFO[p].label}</div>
            <div className={`esv-pile esv-pile-${p}`}>
              {Array.from({ length: shown[p] || 0 }, (_, i) => (
                <BlockPiece place={p} key={i} />
              ))}
            </div>
            {v.mode === "show" ? (
              <div className="esv-count">{shown[p] || 0}</div>
            ) : (
              <div className="esv-stepper">
                <button type="button" aria-label={`Fewer ${PLACE_INFO[p].label.toLowerCase()}`} onClick={() => set(p, (counts[p] || 0) - 1)}>−</button>
                <b>{counts[p] || 0}</b>
                <button type="button" aria-label={`More ${PLACE_INFO[p].label.toLowerCase()}`} onClick={() => set(p, (counts[p] || 0) + 1)}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {v.mode === "show" || v.hideTotal ? null : <div className="esv-readout">Your blocks make <b>{fmt(total)}</b></div>}
    </div>
  );
}

// Rows × columns of dots or tiles. build: tap a cell to set the size. show: fixed.
function ArrayGrid({ v }) {
  const maxR = v.maxRows || 10;
  const maxC = v.maxCols || 10;
  const [size, setSize] = useState({ r: v.mode === "show" ? v.rows : 0, c: v.mode === "show" ? v.cols : 0 });
  const tiles = v.style === "tiles";
  const r = v.mode === "show" ? v.rows : size.r;
  const c = v.mode === "show" ? v.cols : size.c;
  const drawR = v.mode === "show" ? v.rows : maxR;
  const drawC = v.mode === "show" ? v.cols : maxC;
  return (
    <div className="esv-card">
      {v.title ? <div className="esv-title">{v.title}</div> : null}
      <div className="esv-array-wrap">
        {v.mode === "show" && v.sideLabels ? <div className="esv-side-top">{v.sideLabels.top}</div> : null}
        <div className="esv-array-row">
          {v.mode === "show" && v.sideLabels ? <div className="esv-side-left">{v.sideLabels.left}</div> : null}
          <div
            className={`esv-array ${tiles ? "tiles" : "dots"} ${v.perimeter ? "perimeter" : ""}`}
            style={{ gridTemplateColumns: `repeat(${drawC}, 1fr)` }}
          >
            {Array.from({ length: drawR * drawC }, (_, i) => {
              const row = Math.floor(i / drawC) + 1;
              const col = (i % drawC) + 1;
              const on = row <= r && col <= c;
              return v.mode === "show" ? (
                <span key={i} className="esv-cell on" aria-hidden="true">{v.icon && !tiles ? v.icon : null}</span>
              ) : (
                <button
                  key={i}
                  type="button"
                  className={`esv-cell ${on ? "on" : ""}`}
                  aria-label={`${row} rows of ${col}`}
                  onClick={() => setSize(size.r === row && size.c === col ? { r: 0, c: 0 } : { r: row, c: col })}
                >
                  {on && v.icon && !tiles ? v.icon : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {v.mode === "show" ? null : (
        <div className="esv-readout">
          {r && c ? (
            <>Your model: <b>{r}</b> {v.rowWord || "rows"} of <b>{c}</b></>
          ) : (
            <>Tap a square to build {v.rowWord || "rows"} and columns.</>
          )}
        </div>
      )}
    </div>
  );
}

// Bar graph (vertical or horizontal), pictograph, or dot plot. Show only.
function Bars({ v }) {
  const cats = v.categories || [];
  const scaleMax = v.max || Math.max(...cats.map((c) => c.value), 1);
  const step = v.step || Math.max(1, Math.ceil(scaleMax / 5));
  const ticks = [];
  for (let t = 0; t <= scaleMax; t += step) ticks.push(t);
  if (v.type === "pictograph") {
    return (
      <div className="esv-card">
        {v.title ? <div className="esv-title">{v.title}</div> : null}
        <table className="esv-picto">
          <tbody>
            {cats.map((c) => (
              <tr key={c.label}>
                <th>{c.label}</th>
                <td>
                  {Array.from({ length: Math.floor(c.value / v.per) }, (_, i) => (
                    <span key={i} className="esv-picto-icon">{v.icon || "●"}</span>
                  ))}
                  {c.value % v.per ? <span className="esv-picto-icon half">{v.icon || "●"}</span> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="esv-key">Key: {v.icon || "●"} = {fmt(v.per)} {v.unit || ""}{v.per % 2 === 0 ? ` · half ${v.icon || "●"} = ${fmt(v.per / 2)}` : ""}</div>
      </div>
    );
  }
  if (v.type === "dotplot") {
    const min = v.min != null ? v.min : Math.min(...(v.values || [0]));
    const max = v.max != null ? v.max : Math.max(...(v.values || [0]));
    const labels = v.labels || Array.from({ length: max - min + 1 }, (_, i) => String(min + i));
    const counts = labels.map((_, i) => (v.values || []).filter((x) => x === min + i).length);
    return (
      <div className="esv-card">
        {v.title ? <div className="esv-title">{v.title}</div> : null}
        <div className="esv-dotplot" style={{ gridTemplateColumns: `repeat(${labels.length}, 1fr)` }}>
          {counts.map((n, i) => (
            <div className="esv-dotcol" key={i}>
              {Array.from({ length: n }, (_, k) => <i key={k}>✕</i>)}
            </div>
          ))}
          {labels.map((l, i) => <div className="esv-dotlabel" key={`l${i}`}>{l}</div>)}
        </div>
        {v.axis ? <div className="esv-axis">{v.axis}</div> : null}
      </div>
    );
  }
  const horizontal = v.orientation === "horizontal";
  return (
    <div className="esv-card">
      {v.title ? <div className="esv-title">{v.title}</div> : null}
      <div className={`esv-bars ${horizontal ? "horizontal" : "vertical"}`}>
        <div className="esv-bars-plot">
          {ticks.map((t) => (
            <i key={t} className="esv-gridline" style={horizontal ? { left: `${(t / scaleMax) * 100}%` } : { bottom: `${(t / scaleMax) * 100}%` }}>
              <span>{fmt(t)}</span>
            </i>
          ))}
          {cats.map((c) => (
            <div className="esv-bar-slot" key={c.label}>
              <div className="esv-bar" style={horizontal ? { width: `${(c.value / scaleMax) * 100}%` } : { height: `${(c.value / scaleMax) * 100}%` }} />
              <span className="esv-bar-label">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
      {v.axis ? <div className="esv-axis">{v.axis}</div> : null}
    </div>
  );
}

// Whole-number line from min to max by step. pick: tap a tick to choose it.
function NumLine({ v, value, onChange }) {
  const ticks = [];
  for (let t = v.min; t <= v.max + 1e-9; t += v.step) ticks.push(Math.round(t * 1000) / 1000);
  const pct = (x) => ((x - v.min) / (v.max - v.min)) * 100;
  const labelEvery = v.labelEvery || (ticks.length > 11 ? Math.ceil(ticks.length / 10) : 1);
  const chosen = value !== "" && value != null ? Number(value) : null;
  return (
    <div className="esv-card">
      {v.title ? <div className="esv-title">{v.title}</div> : null}
      <div className="esv-numline">
        <div className="esv-numline-track" />
        {ticks.map((t, i) => (
          <button
            key={t}
            type="button"
            className={`esv-numline-tick ${i % labelEvery === 0 ? "major" : ""} ${chosen === t ? "on" : ""}`}
            style={{ left: `${pct(t)}%` }}
            aria-label={`Mark ${fmt(t)}`}
            disabled={!v.pick}
            onClick={() => v.pick && onChange && onChange(String(t))}
          >
            <span>{i % labelEvery === 0 || i === ticks.length - 1 ? fmt(t) : ""}</span>
          </button>
        ))}
        {(v.marks || []).map((m, i) => (
          <div key={i} className="esv-numline-mark" style={{ left: `${pct(m.value)}%` }}>
            <em>{m.label}</em>
          </div>
        ))}
        {v.pick && chosen != null && chosen >= v.min && chosen <= v.max ? <div className="esv-rover" style={{ left: `${pct(chosen)}%` }} aria-hidden="true" /> : null}
      </div>
      {v.label ? <div className="esv-axis">{v.label}</div> : null}
    </div>
  );
}

const MONEY = {
  p: { label: "1¢", cents: 1, name: "penny", kind: "coin" },
  n: { label: "5¢", cents: 5, name: "nickel", kind: "coin" },
  d: { label: "10¢", cents: 10, name: "dime", kind: "coin" },
  q: { label: "25¢", cents: 25, name: "quarter", kind: "coin" },
  b1: { label: "$1", cents: 100, name: "one-dollar bill", kind: "bill" },
  b5: { label: "$5", cents: 500, name: "five-dollar bill", kind: "bill" },
  b10: { label: "$10", cents: 1000, name: "ten-dollar bill", kind: "bill" },
  b20: { label: "$20", cents: 2000, name: "twenty-dollar bill", kind: "bill" },
};

function dollars(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

// Money tray. build: tap coins and bills to add; tap one in the tray to take it out.
// show: displays a fixed set (v.show = ["q","q","d"]).
function Money({ v, onChange }) {
  const kinds = v.kinds || ["b1", "q", "d", "n", "p"];
  const [tray, setTray] = useState(v.start || []);
  const shown = v.mode === "show" ? v.show || [] : tray;
  const total = shown.reduce((s, k) => s + MONEY[k].cents, 0);
  const update = (next) => {
    setTray(next);
    onChange && onChange((next.reduce((s, k) => s + MONEY[k].cents, 0) / 100).toFixed(2));
  };
  return (
    <div className="esv-card">
      {v.title ? <div className="esv-title">{v.title}</div> : null}
      {v.mode === "show" ? null : (
        <div className="esv-money-bank">
          {kinds.map((k) => (
            <button key={k} type="button" className={`esv-money ${MONEY[k].kind} esv-${k}`} onClick={() => update([...tray, k])} aria-label={`Add a ${MONEY[k].name}`}>
              {MONEY[k].label}
            </button>
          ))}
        </div>
      )}
      <div className="esv-money-tray" aria-label="Money tray">
        {shown.length ? (
          [...shown]
            .map((k, i) => ({ k, i }))
            .sort((a, b) => MONEY[b.k].cents - MONEY[a.k].cents)
            .map(({ k, i }) =>
              v.mode === "show" ? (
                <span key={i} className={`esv-money ${MONEY[k].kind} esv-${k}`}>{MONEY[k].label}</span>
              ) : (
                <button key={i} type="button" className={`esv-money ${MONEY[k].kind} esv-${k}`} onClick={() => update(tray.filter((_, j) => j !== i))} aria-label={`Take out a ${MONEY[k].name}`}>
                  {MONEY[k].label}
                </button>
              )
            )
        ) : (
          <span className="esv-empty">Tap coins and bills to add them.</span>
        )}
      </div>
      {v.mode === "show" || v.hideTotal ? null : <div className="esv-readout">In the tray: <b>{dollars(total)}</b></div>}
    </div>
  );
}

// Protractor showing an angle (show only). Like a real protractor it has two
// number scales: the outer one starts at 0 on the left, the inner one starts at
// 0 on the right. v.degrees is measured from the base ray: from "right" (default)
// or from "left". Students must read the scale that starts at 0 on the base ray.
function Angle({ v }) {
  const cx = 170, cy = 160, R = 140;
  const fromLeft = v.from === "left";
  // position by "standard" angle: 0 = right ray, 180 = left ray
  const at = (std, r) => {
    const a = (std * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
  };
  const ticks = [];
  for (let d = 0; d <= 180; d += 5) {
    const long = d % 10 === 0;
    const [x1, y1] = at(d, R);
    const [x2, y2] = at(d, R - (long ? 14 : 7));
    ticks.push(<line key={d} x1={x1} y1={y1} x2={x2} y2={y2} className={long ? "long" : ""} />);
  }
  const labels = [];
  for (let d = 0; d <= 180; d += 10) {
    const [ox, oy] = at(d, R + 12);
    const [ix, iy] = at(d, R - 26);
    labels.push(<text key={`o${d}`} x={ox} y={oy + 4} className="outer">{180 - d}</text>);
    labels.push(<text key={`i${d}`} x={ix} y={iy + 4} className="inner">{d}</text>);
  }
  const rayStd = fromLeft ? 180 - v.degrees : v.degrees;
  const [ex, ey] = at(rayStd, R + 2);
  const [bx, by] = at(fromLeft ? 180 : 0, R + 2);
  return (
    <div className="esv-card">
      {v.title ? <div className="esv-title">{v.title}</div> : null}
      <svg className="esv-angle" viewBox="0 0 340 180" role="img" aria-label="A protractor measuring an angle">
        <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy} Z`} className="esv-protractor" />
        {ticks}
        {labels}
        <line x1={cx} y1={cy} x2={bx} y2={by} className="esv-ray" />
        <line x1={cx} y1={cy} x2={ex} y2={ey} className="esv-ray" />
        <circle cx={cx} cy={cy} r="5" className="esv-vertex" />
      </svg>
      <div className="esv-axis">Outer numbers start at 0 on the left · inner numbers start at 0 on the right</div>
    </div>
  );
}

// First-quadrant coordinate grid. pick: tap an intersection to choose (x, y).
function Coords({ v, point, onPoint }) {
  const max = v.max || 10;
  const size = 300, pad = 30;
  const unit = (size - pad * 2) / max;
  const X = (x) => pad + x * unit;
  const Y = (y) => size - pad - y * unit;
  const lines = [];
  for (let i = 0; i <= max; i++) {
    lines.push(<line key={`v${i}`} x1={X(i)} y1={Y(0)} x2={X(i)} y2={Y(max)} className={i === 0 ? "axis" : ""} />);
    lines.push(<line key={`h${i}`} x1={X(0)} y1={Y(i)} x2={X(max)} y2={Y(i)} className={i === 0 ? "axis" : ""} />);
  }
  const nums = [];
  for (let i = 0; i <= max; i += v.labelStep || 1) {
    nums.push(<text key={`x${i}`} x={X(i)} y={Y(0) + 16} className="num">{i}</text>);
    if (i) nums.push(<text key={`y${i}`} x={X(0) - 12} y={Y(i) + 4} className="num">{i}</text>);
  }
  const hits = [];
  if (v.pick) {
    for (let x = 0; x <= max; x++)
      for (let y = 0; y <= max; y++)
        hits.push(
          <circle key={`p${x}-${y}`} cx={X(x)} cy={Y(y)} r={unit / 2.4} className="esv-hit" onClick={() => onPoint && onPoint({ x, y })}>
            <title>{`(${x}, ${y})`}</title>
          </circle>
        );
  }
  return (
    <div className="esv-card">
      {v.title ? <div className="esv-title">{v.title}</div> : null}
      <svg className="esv-coords" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Coordinate grid">
        {lines}
        {nums}
        {(v.points || []).map((p, i) => (
          <g key={i}>
            <circle cx={X(p.x)} cy={Y(p.y)} r="6" className="esv-pt" />
            {p.label ? <text x={X(p.x) + 9} y={Y(p.y) - 8} className="esv-pt-label">{p.label}</text> : null}
          </g>
        ))}
        {hits}
        {point ? <circle cx={X(point.x)} cy={Y(point.y)} r="8" className="esv-pick" /> : null}
      </svg>
      {v.pick ? <div className="esv-readout">{point ? <>You picked <b>({point.x}, {point.y})</b></> : "Tap a point where two grid lines cross."}</div> : null}
    </div>
  );
}

export default function Visual({ v, value, onChange, point, onPoint }) {
  if (!v) return null;
  switch (v.type) {
    case "blocks": return <Blocks v={v} value={value} onChange={onChange} />;
    case "array": return <ArrayGrid v={v} />;
    case "bars":
    case "pictograph":
    case "dotplot": return <Bars v={v} />;
    case "numline": return <NumLine v={v} value={value} onChange={onChange} />;
    case "money": return <Money v={v} onChange={onChange} />;
    case "angle": return <Angle v={v} />;
    case "coords": return <Coords v={v} point={point} onPoint={onPoint} />;
    default: return null;
  }
}
