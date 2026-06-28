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
  // ESC to close — no scroll lock, page stays fully interactive
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const card = (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={`${reference}`}
      style={{
        position: "fixed",
        // Desktop: bottom-right corner. Mobile: full-width bottom sheet.
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 200,
        animation: "bvmSlideUp 0.32s cubic-bezier(0.16,1,0.3,1)",
      }}
      // Desktop overrides via inline media — handled via className below
      className="bvm-card"
    >
      <div
        style={{
          background: "linear-gradient(160deg, #1E2F50 0%, #16223C 100%)",
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
        }}
        className="bvm-inner"
      >
        {/* Gold top bar */}
        <div style={{ height: 4, background: "linear-gradient(90deg, #C9A84C 0%, #E8D4A8 50%, #C9A84C 100%)", borderRadius: "8px 8px 0 0" }} />

        <div className="bvm-body">
          {/* Header row: reference + close */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.18em",
                  color: "var(--color-gold)",
                }}
              >
                {reference}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.55rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  color: "var(--color-navy)",
                  background: "var(--color-gold)",
                  borderRadius: "2px",
                  padding: "2px 7px",
                }}
              >
                NKJV
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(159,176,192,0.1)",
                color: "var(--color-dark-muted)",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(159,176,192,0.1)")}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Verse text */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
              color: "var(--color-gold-lt)",
              lineHeight: 1.85,
              marginBottom: "1rem",
            }}
          >
            &ldquo;{verse}&rdquo;
          </p>

          {/* Read in context */}
          {bibleUrl && (
            <a
              href={bibleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.62rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-dark-muted)",
                transition: "color 0.2s",
              }}
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
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(card, document.body) : null;
}
