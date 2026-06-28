"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { buildSearchIndex, type SearchItem } from "@/lib/search";

const INDEX = buildSearchIndex();
const fuse = new Fuse(INDEX, {
  keys: [
    { name: "title",    weight: 0.6 },
    { name: "subtitle", weight: 0.2 },
    { name: "body",     weight: 0.2 },
  ],
  threshold: 0.4,
  includeScore: true,
});

const TYPE_LABEL: Record<string, string> = {
  section: "SECTION",
  blog:    "BLOG",
  mentor:  "MENTOR",
};

interface Props {
  onClose: () => void;
}

export default function SearchModal({ onClose }: Props) {
  const [query, setQuery]       = useState("");
  const [results, setResults]   = useState<SearchItem[]>([]);
  const [active, setActive]     = useState(0);
  const inputRef                = useRef<HTMLInputElement>(null);
  const router                  = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); setActive(0); return; }
    const hits = fuse.search(query, { limit: 8 }).map((r) => r.item);
    setResults(hits);
    setActive(0);
  }, [query]);

  const navigate = useCallback((item: SearchItem) => {
    onClose();
    router.push(item.href);
  }, [onClose, router]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
      if (e.key === "Enter" && results[active]) { navigate(results[active]); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [results, active, navigate, onClose]);

  const modal = (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4"
      style={{ background: "rgba(26,39,68,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-lg overflow-hidden"
        style={{ background: "var(--color-navy)", border: "1px solid rgba(201,168,76,0.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
          <SearchIcon />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, blog, mentors…"
            className="flex-1 bg-transparent outline-none"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.9rem",
              color: "var(--color-dark-text)",
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ color: "var(--color-dark-muted)", lineHeight: 1 }}>
              ✕
            </button>
          )}
          <kbd
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              color: "var(--color-dark-muted)",
              border: "1px solid rgba(159,176,192,0.3)",
              borderRadius: 4,
              padding: "2px 6px",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="py-2 max-h-80 overflow-y-auto">
            {results.map((item, i) => (
              <li key={`${item.type}-${item.href}-${i}`}>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                  style={{
                    background: i === active ? "rgba(201,168,76,0.1)" : "transparent",
                    borderLeft: i === active ? "2px solid #C9A84C" : "2px solid transparent",
                  }}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => navigate(item)}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      color: "var(--color-gold)",
                      minWidth: 52,
                    }}
                  >
                    {TYPE_LABEL[item.type]}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span
                      className="block truncate"
                      style={{ fontFamily: "var(--font-ui)", fontSize: "0.85rem", color: "var(--color-dark-text)" }}
                    >
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span
                        className="block truncate"
                        style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "var(--color-dark-muted)" }}
                      >
                        {item.subtitle}
                      </span>
                    )}
                  </span>
                  <ChevronIcon />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Empty state */}
        {query && results.length === 0 && (
          <p
            className="px-4 py-8 text-center"
            style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.9rem", color: "var(--color-dark-muted)" }}
          >
            No results for &ldquo;{query}&rdquo;
          </p>
        )}

        {/* Hint when empty */}
        {!query && (
          <p
            className="px-4 py-6 text-center"
            style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", letterSpacing: "0.12em", color: "var(--color-dark-muted)" }}
          >
            TYPE TO SEARCH · ↑↓ TO NAVIGATE · ENTER TO GO
          </p>
        )}
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modal, document.body)
    : null;
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: "var(--color-dark-muted)" }}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ color: "var(--color-dark-muted)", flexShrink: 0 }}>
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
