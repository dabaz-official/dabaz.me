"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { filterCommands, useCommands } from "@dabaz/components/command-registry";

export default function CommandPalette() {
  const commands = useCommands();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const filtered = useMemo(
    () => filterCommands(commands, query),
    [commands, query],
  );
  const active = filtered[Math.min(index, filtered.length - 1)];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && active) {
      close();
      active.run();
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Command palette"
      className="fixed inset-0 z-[150] flex justify-center bg-black/40 px-4 pt-[18vh] backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="h-fit w-[min(560px,100%)] border border-line bg-bg">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="type a command…"
          aria-label="Command input"
          className="w-full border-b border-line bg-transparent px-4 py-3 font-mono text-sm text-fg outline-none placeholder:text-muted"
        />
        <ul className="max-h-72 overflow-y-auto py-1" role="listbox">
          {filtered.map((c, i) => (
            <li key={c.id} role="option" aria-selected={i === index}>
              <button
                type="button"
                onMouseEnter={() => setIndex(i)}
                onClick={() => {
                  close();
                  c.run();
                }}
                className={`flex w-full items-center justify-between gap-4 px-4 py-2 text-left font-mono text-sm transition-colors ${
                  i === index
                    ? "bg-accent text-accent-ink"
                    : "text-fg hover:bg-accent hover:text-accent-ink"
                }`}
              >
                <span>{c.label}</span>
                <span
                  className={`text-xs ${
                    i === index ? "text-accent-ink/70" : "text-muted"
                  }`}
                >
                  {c.hint}
                </span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-4 py-3 font-mono text-sm text-muted">
              command not found
            </li>
          )}
        </ul>
        <div className="flex gap-4 border-t border-line px-4 py-2 font-mono text-[10px] text-muted">
          <span>↑↓ navigate</span>
          <span>↵ run</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
