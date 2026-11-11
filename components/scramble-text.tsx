"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#01";

type ScrambleTextProps = {
  text: string;
  className?: string;
  /** ms before the animation starts (staggering) */
  delay?: number;
  /** "mount" runs on hydration, "in-view" waits for the element to scroll in */
  trigger?: "mount" | "in-view";
  duration?: number;
};

export default function ScrambleText({
  text,
  className,
  delay = 0,
  trigger = "mount",
  duration = 900,
}: ScrambleTextProps) {
  const [play, setPlay] = useState(false);
  const [output, setOutput] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    if (trigger === "mount") {
      const t = setTimeout(() => setPlay(true), delay);
      return () => clearTimeout(t);
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger, delay]);

  useEffect(() => {
    if (!play) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const resolved = Math.floor(progress * text.length);
      let next = text.slice(0, resolved);
      for (let i = resolved; i < text.length; i += 1) {
        next +=
          text[i] === " "
            ? " "
            : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOutput(progress < 1 ? next : text);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, text, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>{output}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
