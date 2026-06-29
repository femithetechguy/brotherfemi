"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useBibleVerse } from "./BibleVerseContext";

const AUTO_CLOSE_MS = 10000;

export default function BibleVerseModal() {
  const { current, close } = useBibleVerse();
  const [barKey, setBarKey] = useState(0);
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef     = useRef(0);
  const remainingRef = useRef(AUTO_CLOSE_MS);
  const hoveredRef   = useRef(false);

  function clearTimer() {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }

  function startTimer(remaining: number) {
    clearTimer();
    startRef.current = Date.now();
    timerRef.current = setTimeout(close, remaining);
  }

  // Restart timer + progress bar on each new open
  useEffect(() => {
    if (!current.isOpen) { clearTimer(); return; }
    remainingRef.current = AUTO_CLOSE_MS;
    hoveredRef.current = false;
    setBarKey((k) => k + 1);
    startTimer(AUTO_CLOSE_MS);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { clearTimer(); window.removeEventListener("keydown", onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.isOpen, current.isOpen && current.reference]);

  function handleMouseEnter() {
    hoveredRef.current = true;
    if (timerRef.current) {
      const elapsed = Date.now() - startRef.current;
      remainingRef.current = Math.max(0, remainingRef.current - elapsed);
      clearTimer();
    }
  }

  function handleMouseLeave() {
    hoveredRef.current = false;
    startTimer(remainingRef.current);
  }

  if (!current.isOpen) return null;

  const { verse, reference, bibleUrl } = current;

  const card = (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={reference}
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 200,
        animation: "bvmSlideUp 0.32s cubic-bezier(0.16,1,0.3,1)",
      }}
      className="bvm-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          background: "linear-gradient(160deg, #1E2F50 0%, #16223C 100%)",
        }}
        className="bvm-inner"
      >
        {/* Gold top bar */}
        <div style={{ height: 4, background: "linear-gradient(90deg, #C9A84C 0%, #E8D4A8 50%, #C9A84C 100%)", borderRadius: "8px 8px 0 0" }} />

        <div className="bvm-body">
          {/* Header row: reference + close */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", letterSpacing: "0.18em", color: "var(--color-gold)" }}>
                {reference}
              </span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.22em", color: "var(--color-navy)", background: "var(--color-gold)", borderRadius: "2px", padding: "2px 7px" }}>
                NKJV
              </span>
            </div>
            <button
              onClick={close}
              aria-label="Close"
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(159,176,192,0.1)", color: "var(--color-dark-muted)", border: "none", cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(159,176,192,0.1)")}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Verse text */}
          {verse ? (
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "clamp(0.95rem,2.2vw,1.1rem)", color: "var(--color-gold-lt)", lineHeight: 1.85, marginBottom: "1rem" }}>
              &ldquo;{verse}&rdquo;
            </p>
          ) : (
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.92rem", color: "var(--color-dark-muted)", lineHeight: 1.7, marginBottom: "1rem" }}>
              Read this passage in full on Bible.com →
            </p>
          )}

          {/* Read in context */}
          {bibleUrl && (
            <a
              href={bibleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
              style={{ fontFamily: "var(--font-ui)", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-dark-muted)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-dark-muted)")}
            >
              Read in context on Bible.com
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>

        {/* Auto-close progress bar — restarts on each new verse via key */}
        <div style={{ overflow: "hidden", height: 4 }}>
          <div
            key={barKey}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #C9A84C 0%, #E8D4A8 60%, #C9A84C 100%)",
              transformOrigin: "left center",
              animation: `bvmAutoClose ${AUTO_CLOSE_MS}ms linear forwards`,
            }}
            className="bvm-progress"
          />
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(card, document.body) : null;
}
