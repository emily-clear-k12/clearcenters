"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Mic, Pause, Play, Volume2 } from "lucide-react";

export function clock(seconds) {
  const n = Math.max(0, Math.floor(Number(seconds) || 0));
  return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;
}

export function StudioHeader({ step, recording, busy, submitted, onStep }) {
  return (
    <header className="bb-studio-header">
      <div className="bb-header-main">
        <div className="bb-brand-row">
          <img className="bb-brand" src="/clearcenters_logo.png" alt="ClearCenters" />
          <span className="bb-brand-divider" aria-hidden="true" />
          <h1>Broadcast Booth</h1>
        </div>
        <div className="bb-header-nav">
          <a className="bb-home" href="/missions" aria-disabled={busy || undefined} onClick={(e) => { if (busy) e.preventDefault(); }}><ArrowLeft size={16} /> My Missions</a>
          <nav className="bb-steps" aria-label="Broadcast progress">
            {["Plan", "Record", "Review"].map((name, i) => (
              <button key={name} type="button" aria-current={step === i ? "step" : undefined}
                disabled={busy || submitted || i > step} onClick={() => onStep(i)}>
                <span className="bb-step-number">{i < step || submitted ? <Check size={16} /> : i + 1}</span>{name}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className={"bb-on-air" + (recording ? " is-live" : "")} aria-label={recording ? "On air: recording" : "Microphone off"}>
        <span aria-hidden="true">ON AIR</span>
      </div>
    </header>
  );
}

/** A real microphone analyser, disconnected when recording stops. */
export function RecordingMeter({ stream, active }) {
  const canvas = useRef(null);
  useEffect(() => {
    if (!active || !stream || !canvas.current) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    let ctx, source, analyser, frame;
    try {
      ctx = new AudioContext();
      source = ctx.createMediaStreamSource(stream);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      const samples = new Uint8Array(analyser.frequencyBinCount);
      const surface = canvas.current;
      const draw = surface.getContext("2d");
      if (!draw) { ctx.close().catch(() => {}); return; }
      const gradient = draw.createLinearGradient(0, 0, surface.width, 0);
      gradient.addColorStop(0, "#8c45ef");
      gradient.addColorStop(1, "#18c9de");
      const paint = () => {
        analyser.getByteFrequencyData(samples);
        draw.clearRect(0, 0, surface.width, surface.height);
        draw.fillStyle = gradient;
        for (let i = 0; i < 60; i++) {
          const height = Math.max(3, samples[i * 2] / 255 * 76);
          draw.fillRect(i * 10 + 2, (80 - height) / 2, 5, height);
        }
        frame = requestAnimationFrame(paint);
      };
      ctx.resume().catch(() => {});
      paint();
    } catch (_) { /* Recording works even if visualization is unavailable. */ }
    return () => {
      cancelAnimationFrame(frame);
      source?.disconnect();
      if (ctx && ctx.state !== "closed") ctx.close().catch(() => {});
    };
  }, [active, stream]);
  return active ? <canvas ref={canvas} className="bb-waveform" width="600" height="80" aria-hidden="true" /> :
    <div className="bb-mic-idle" aria-hidden="true"><Mic size={34} /></div>;
}

/** Native audio supplies playback; custom controls expose keyboard-accessible seeking. */
export function BroadcastPlayer({ src, duration, label, disabled = false }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [length, setLength] = useState(Number(duration) || 0);
  const [error, setError] = useState("");
  useEffect(() => { setPlaying(false); setPosition(0); setError(""); setLength(Number(duration) || 0); }, [src, duration]);
  useEffect(() => { if (disabled) ref.current?.pause(); }, [disabled]);
  async function toggle() {
    if (!ref.current || disabled) return;
    if (playing) { ref.current.pause(); return; }
    // Only one segment plays at a time, including players outside this card.
    document.querySelectorAll("audio[data-broadcast-player]").forEach((audio) => { if (audio !== ref.current) audio.pause(); });
    window.speechSynthesis?.cancel();
    try { await ref.current.play(); setError(""); }
    catch (_) { setError("Audio could not play. Try again or record this segment again."); }
  }
  return (
    <div className="bb-player">
      <audio ref={ref} src={src} preload="metadata" data-broadcast-player
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)} onTimeUpdate={() => setPosition(ref.current?.currentTime || 0)}
        onLoadedMetadata={() => { const d = ref.current?.duration; if (Number.isFinite(d)) setLength(d); }}
        onError={() => setError("This recording could not be loaded. Try recording it again.")} />
      <button type="button" className="bb-play" disabled={disabled} aria-label={`${playing ? "Pause" : "Play"} ${label}`} onClick={toggle}>
        {playing ? <Pause size={23} fill="currentColor" /> : <Play size={23} fill="currentColor" />}
      </button>
      <div className="bb-player-track">
        <input type="range" min="0" max={length || 1} step="0.1" value={Math.min(position, length || 1)} disabled={disabled || !length}
          aria-label={`Seek ${label}`} aria-valuetext={`${clock(position)} of ${clock(length)}`}
          onChange={(e) => { const value = Number(e.target.value); if (ref.current) ref.current.currentTime = value; setPosition(value); }} />
        <div className="bb-player-time"><span>{clock(position)}</span><span>{clock(length)}</span></div>
      </div>
      <Volume2 className="bb-player-speaker" size={18} aria-hidden="true" />
      {error ? <p className="bb-player-error" role="alert">{error}</p> : null}
    </div>
  );
}
