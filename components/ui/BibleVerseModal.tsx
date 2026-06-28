"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  verse: string;
  reference: string;
  bibleUrl?: string;
  onClose: () => void;
}

export default function BibleVerseModal({ verse, reference, bibleUrl, onClose }: Props) {
  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Bible verse — ${reference}`}
      className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8"
      style={{ background: "rgba(26,39,68,0.92)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden"
        style={{
          background: "var(--color-navy)",
          border: "1px solid rgba(201,168,76,0.28)",
          borderRadius: "2px",
          boxShadow: "0 32px 96px rgba(0,0,0,0.7), inset 0 1px 0 rgba(201,168,76,0.12)",
          animation: "bvmIn 0.28s cubic-bezier(0.16,1,0.3,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold top accent bar */}
        <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)" }} />

        <div className="px-8 pt-8 pb-10 md:px-12 md:pt-10 md:pb-12">

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 flex items-center justify-center w-8 h-8 rounded-full transition-colors"
            style={{ color: "var(--color-dark-muted)", background: "rgba(159,176,192,0.08)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.12)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(159,176,192,0.08)")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Decorative oversized quote mark */}
          <div
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "7rem",
              lineHeight: 0.65,
              color: "rgba(201,168,76,0.1)",
              userSelect: "none",
              marginBottom: "0.75rem",
              marginLeft: "-0.25rem",
            }}
          >
            &ldquo;
          </div>

          {/* Verse text */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 2.8vw, 1.2rem)",
              color: "var(--color-gold-lt)",
              lineHeight: 1.9,
              marginBottom: "2rem",
            }}
          >
            {verse}
          </p>

          {/* Gold divider */}
          <div
            style={{
              width: 40,
              height: 1,
              background: "rgba(201,168,76,0.5)",
              marginBottom: "1.25rem",
            }}
          />

          {/* Reference + translation badge */}
          <div className="flex items-center gap-3 flex-wrap mb-8">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.78rem",
                letterSpacing: "0.18em",
                color: "var(--color-gold)",
              }}
            >
              — {reference}
            </span>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.58rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                color: "var(--color-navy)",
                background: "var(--color-gold)",
                borderRadius: "2px",
                padding: "3px 8px",
              }}
            >
              NKJV
            </span>
          </div>

          {/* Read in context */}
          {bibleUrl && (
            <a
              href={bibleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-dark-muted)",
                borderBottom: "1px solid rgba(159,176,192,0.2)",
                paddingBottom: "1px",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#C9A84C";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-dark-muted)";
                e.currentTarget.style.borderColor = "rgba(159,176,192,0.2)";
              }}
            >
              Read in context on Bible.com
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>

        {/* Subtle cross watermark */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 16,
            right: 24,
            fontFamily: "var(--font-display)",
            fontSize: "5rem",
            color: "rgba(201,168,76,0.04)",
            userSelect: "none",
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          ✝
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modal, document.body) : null;
}
