"use client";

import { useEffect, useRef } from "react";

import { useSound } from "@dabaz/components/audio/sound-provider";

const ACCENT = "#b8ff29";

type VisualizerProps = {
  variant: "spectrum" | "mini";
  className?: string;
};

/**
 * Draws live spectrum data from the ambient engine's AnalyserNode.
 * Renders a faint baseline when the engine is muted.
 */
export default function Visualizer({ variant, className }: VisualizerProps) {
  const { playing, getAnalyser } = useSound();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let data: Uint8Array<ArrayBuffer> | null = null;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const analyser = getAnalyser();
      const baseline = getComputedStyle(canvas).color;

      if (playing && analyser) {
        if (!data || data.length !== analyser.frequencyBinCount) {
          data = new Uint8Array(analyser.frequencyBinCount);
        }
        analyser.getByteFrequencyData(data);

        if (variant === "spectrum") {
          const bars = 32;
          const gap = 3;
          const barW = (w - gap * (bars - 1)) / bars;
          ctx.fillStyle = ACCENT;
          for (let i = 0; i < bars; i += 1) {
            // log-ish spacing so low frequencies don't dominate
            const bin = Math.min(
              data.length - 1,
              Math.floor(Math.pow(i / bars, 1.7) * 320) + 2,
            );
            const v = data[bin] / 255;
            const barH = Math.max(2, v * (h - 2));
            const x = i * (barW + gap);
            ctx.fillRect(x, h - barH, barW, barH);
          }
        } else {
          const bars = 3;
          const barW = 2;
          const gap = 2;
          // mini bars follow the button's text color, not the accent
          ctx.fillStyle = baseline;
          const total = bars * barW + (bars - 1) * gap;
          for (let i = 0; i < bars; i += 1) {
            const bin = [6, 24, 64][i];
            const v = data[bin] / 255;
            const barH = Math.max(2, v * h);
            const x = (w - total) / 2 + i * (barW + gap);
            ctx.fillRect(x, h - barH, barW, barH);
          }
        }
      } else {
        ctx.fillStyle = baseline;
        ctx.globalAlpha = 0.6;
        ctx.fillRect(0, h - 1, w, 1);
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [playing, getAnalyser, variant]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      role="presentation"
    />
  );
}
