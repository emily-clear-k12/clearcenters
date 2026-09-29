"use client";

import { useEffect, useRef, useState } from "react";

const SURFACES = {
  whiteboard: {
    fill: "#ffffff",
    stroke: "#1f2a44",
    className: "is-whiteboard",
  },
  light_table: {
    fill: "#e4f4fb",
    stroke: "#3a2a7a",
    className: "is-light-table",
  },
};

function surfaceConfig(surface) {
  return SURFACES[surface] || SURFACES.whiteboard;
}

/**
 * Simple pen/eraser canvas. Reports JPEG data URLs via onChange.
 * initialImage: optional existing data URL to restore.
 * surface: "whiteboard" | "light_table" — fill/stroke + CSS class (keeps ink when switching).
 */
export default function MakerDrawPad({
  initialImage = null,
  onChange,
  height = 280,
  labelChips = null,
  disabled = false,
  surface = "whiteboard",
}) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const [tool, setTool] = useState("pen");
  const [hasInk, setHasInk] = useState(!!initialImage);
  const restored = useRef(false);
  const history = useRef([]);
  const [undoCount, setUndoCount] = useState(0);
  const [color, setColor] = useState("#3a2a7a");
  function remember() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    history.current.push({ pixels: canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height), hasInk });
    if (history.current.length > 15) history.current.shift();
    setUndoCount(history.current.length);
  }
  function undo() {
    if (disabled || !history.current.length) return;
    const previous = history.current.pop();
    canvasRef.current.getContext("2d").putImageData(previous.pixels, 0, 0);
    setHasInk(previous.hasInk);
    setUndoCount(history.current.length);
    if (previous.hasInk) emit(); else onChange?.(null);
  }
  const cfg = surfaceConfig(surface);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(height));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const fill = surfaceConfig(surface).fill;
    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, w, h);
    if (initialImage && !restored.current) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, w, h);
        setHasInk(true);
        restored.current = true;
      };
      img.src = initialImage;
    }
  }, [height]); // eslint-disable-line react-hooks/exhaustive-deps

  function emit() {
    const canvas = canvasRef.current;
    if (!canvas || !onChange) return;
    try {
      onChange(canvas.toDataURL("image/jpeg", 0.82));
    } catch (_) {
      /* ignore */
    }
  }

  function pos(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const src = e.touches && e.touches[0] ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  }

  function start(e) {
    if (disabled) return;
    e.preventDefault();
    remember();
    drawing.current = true;
    last.current = pos(e);
  }

  function move(e) {
    if (!drawing.current || disabled) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const p = pos(e);
    const stroke = color;
    const fill = surfaceConfig(surface).fill;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (tool === "eraser") {
      // Paint surface fill so erase matches current canvas look (opaque JPEG).
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = fill;
      ctx.lineWidth = 18;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 3;
    }
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    setHasInk(true);
  }

  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.globalCompositeOperation = "source-over";
    }
    emit();
  }

  function clearAll() {
    if (disabled) return;
    remember();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = surfaceConfig(surface).fill;
    ctx.fillRect(0, 0, rect.width, height);
    setHasInk(false);
    if (onChange) onChange(null);
  }

  function stampLabel(text) {
    if (disabled || !text) return;
    remember();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = 16 + Math.random() * Math.max(40, rect.width - 120);
    const y = 28 + Math.random() * Math.max(40, height - 60);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#ede6ff";
    const padX = 10;
    ctx.font = "700 13px Inter, system-ui, sans-serif";
    const tw = ctx.measureText(text).width;
    const bw = tw + padX * 2;
    const bh = 26;
    roundRect(ctx, x, y - bh + 4, bw, bh, 8);
    ctx.fill();
    ctx.strokeStyle = "#8C52F2";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "#2a2350";
    ctx.fillText(text, x + padX, y - 4);
    setHasInk(true);
    emit();
  }

  return (
    <div className={`mk-draw mk-draw-surface ${cfg.className}`}>
      <div className="mk-draw-tools" role="toolbar" aria-label="Drawing tools">
        <button type="button" className={`mk-tool${tool === "pen" ? " on" : ""}`} disabled={disabled} onClick={() => setTool("pen")}>
          Pen
        </button>
        <button type="button" className={`mk-tool${tool === "eraser" ? " on" : ""}`} disabled={disabled} onClick={() => setTool("eraser")}>
          Eraser
        </button>
        <button type="button" className="mk-tool" disabled={disabled} onClick={clearAll}>
          Clear
        </button>
        <button type="button" className="mk-tool" disabled={disabled || !undoCount} onClick={undo}>Undo</button>
        <label className="mk-pen-color">Ink <input aria-label="Drawing color" type="color" value={color} disabled={disabled} onChange={e => setColor(e.target.value)} /></label>
        <span className="mk-quiet" style={{ marginLeft: "auto", fontSize: 12 }}>
          {hasInk ? "Drawing saved as you go" : "Draw here"}
        </span>
      </div>
      {Array.isArray(labelChips) && labelChips.length ? (
        <div className="mk-chips">
          {labelChips.map((chip) => (
            <button key={chip} type="button" className="mk-chip" disabled={disabled} onClick={() => stampLabel(chip)}>
              + {chip}
            </button>
          ))}
        </div>
      ) : null}
      <canvas
        ref={canvasRef}
        className={`mk-canvas ${cfg.className}`}
        style={{ height, background: cfg.fill }}
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
      />
    </div>
  );
}

function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
