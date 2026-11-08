"use client";

import { useMemo, useRef, useState } from "react";

import {
  filterCommands,
  useCommands,
  type Command,
} from "@dabaz/components/command-registry";

/**
 * Always-visible terminal prompt docked to the bottom-left of the viewport.
 * Focus it to reveal the command list above; Enter runs the active command.
 */
export default function TerminalBar() {
  const commands = useCommands();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(
    () => filterCommands(commands, query),
    [commands, query],
  );
  const open = focused;
  const active = filtered[Math.min(index, filtered.length - 1)];

  const reset = () => {
    setQuery("");
    setIndex(0);
  };

  const run = (command: Command) => {
    command.run();
    reset();
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && active) {
      run(active);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      reset();
      inputRef.current?.blur();
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-[60] w-[min(420px,calc(100vw-2rem))] sm:bottom-6 sm:left-6">
      {open && (
        <ul
          role="listbox"
          aria-label="Command suggestions"
          className="absolute bottom-full mb-2 max-h-72 w-full overflow-y-auto border border-line bg-bg py-1"
        >
          {filtered.map((c, i) => (
            <li key={c.id} role="option" aria-selected={i === index}>
              <button
                type="button"
                onMouseEnter={() => setIndex(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  run(c);
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
      )}
      <div className="flex items-center gap-2 border border-line bg-bg px-3 py-2.5 transition-colors focus-within:border-accent">
        <span aria-hidden className="font-mono text-sm text-muted">
          $
        </span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          aria-label="Terminal command input"
          placeholder="type a command…"
          className="w-full bg-transparent font-mono text-sm text-fg outline-none focus-visible:outline-none placeholder:text-muted"
        />
      </div>
    </div>
  );
}
