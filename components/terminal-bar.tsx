"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  filterCommands,
  useCommands,
  type Command,
} from "@dabaz/components/command-registry";
import copyByLocale from "@dabaz/data/copy";
import type { Locale } from "@dabaz/data/site";

/**
 * Always-visible terminal prompt docked to the bottom-left of the viewport.
 * Focus it to reveal the command list above; Enter runs the active command.
 */
export default function TerminalBar({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  const commands = useCommands(locale);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [index, setIndex] = useState(0);
  // true only after real pointer movement — keeps CSS hover off during keyboard nav
  const [pointerActive, setPointerActive] = useState(false);
  // scrolling content under a resting pointer makes the browser fire synthetic
  // mouseenter events; ignore pointer input briefly after each key press
  const keyNavAt = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // keep the keyboard-selected item inside the scrollable list
  useEffect(() => {
    const listEl = listRef.current;
    const itemEl = listEl?.children[index] as HTMLElement | undefined;
    if (!listEl || !itemEl) return;
    const listRect = listEl.getBoundingClientRect();
    const itemRect = itemEl.getBoundingClientRect();
    if (itemRect.top < listRect.top) {
      listEl.scrollTop -= listRect.top - itemRect.top;
    } else if (itemRect.bottom > listRect.bottom) {
      listEl.scrollTop += itemRect.bottom - listRect.bottom;
    }
  }, [index]);

  const filtered = useMemo(
    () => filterCommands(commands, query),
    [commands, query],
  );
  const open = focused;
  const active = filtered[Math.min(index, filtered.length - 1)];

  const reset = () => {
    setQuery("");
    setIndex(0);
    setPointerActive(false);
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
      keyNavAt.current = Date.now();
      setPointerActive(false);
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      keyNavAt.current = Date.now();
      setPointerActive(false);
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      reset();
      inputRef.current?.blur();
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-[60] w-[min(420px,calc(100vw-2rem))] -translate-x-1/2 sm:bottom-6">
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-label={copy.terminal.suggestionsLabel}
          onMouseMove={() => {
            if (Date.now() - keyNavAt.current > 400) setPointerActive(true);
          }}
          className="absolute bottom-full mb-2 max-h-72 w-full overflow-y-auto border border-line bg-bg py-1"
        >
          {filtered.map((c, i) => (
            <li key={c.id} role="option" aria-selected={i === index}>
              <button
                type="button"
                onMouseEnter={() => {
                  if (Date.now() - keyNavAt.current < 400) return;
                  setPointerActive(true);
                  setIndex(i);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  run(c);
                }}
                className={`flex w-full items-center justify-between gap-4 px-4 py-2 text-left font-mono text-sm transition-colors ${
                  i === index
                    ? "bg-accent text-accent-ink"
                    : `text-fg ${pointerActive ? "hover:bg-accent hover:text-accent-ink" : ""}`
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
              {copy.terminal.empty}
            </li>
          )}
        </ul>
      )}
      <div className="flex items-center gap-2 border border-line bg-bg px-3 py-2.5">
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
          aria-label={copy.terminal.inputLabel}
          placeholder={copy.terminal.placeholder}
          style={{ outline: "none" }}
          className="w-full bg-transparent font-mono text-sm text-fg placeholder:text-muted"
        />
      </div>
    </div>
  );
}
