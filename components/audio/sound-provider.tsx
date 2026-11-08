"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { AudioEngine } from "@dabaz/lib/audio-engine";

type SoundContextValue = {
  playing: boolean;
  toggle: () => void;
  getAnalyser: () => AnalyserNode | null;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<AudioEngine | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    if (!engineRef.current) {
      engineRef.current = new AudioEngine();
    }
    const engine = engineRef.current;
    if (playing) {
      engine.stop();
      setPlaying(false);
    } else {
      engine.start();
      setPlaying(true);
    }
  }, [playing]);

  const getAnalyser = useCallback(
    () => engineRef.current?.getAnalyser() ?? null,
    [],
  );

  const value = useMemo(
    () => ({ playing, toggle, getAnalyser }),
    [playing, toggle, getAnalyser],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return ctx;
}
