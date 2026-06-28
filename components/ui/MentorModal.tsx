"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  name: string;
  ministry: string;
  url: string;
  onClose: () => void;
}

export default function MentorModal({ name, ministry, url, onClose }: Props) {
  const [loaded, setLoaded] = useState(false);

  // ESC to close
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const modal = (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ zIndex: 300, background: "rgba(10,16,32,0.88)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative flex flex-col m-auto rounded-sm overflow-hidden"
        style={{
          width: "min(96vw, 1100px)",
          height: "min(92vh, 800px)",
          background: "var(--color-navy)",
          border: "1px solid rgba(201,168,76,0.25)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-4 px-5 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(201,168,76,0.15)", background: "var(--color-cobalt)" }}
        >
          {/* Cross */}
          <svg width="12" height="18" viewBox="0 0 12 18" fill="none" aria-hidden="true" style={{ color: "var(--color-gold)", opacity: 0.8, flexShrink: 0 }}>
            <rect x="4.5" y="0" width="3" height="18" rx="1" fill="currentColor"/>
            <rect x="0" y="5" width="12" height="3" rx="1" fill="currentColor"/>
          </svg>

          <div className="flex-1 min-w-0">
            <p
              className="leading-tight truncate"
              style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", color: "var(--color-dark-text)" }}
            >
              {name}
            </p>
            <p
              className="leading-tight truncate"
              style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.72rem", color: "var(--color-dark-muted)" }}
            >
              {ministry}
            </p>
          </div>

          {/* Open externally */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new tab"
            className="flex items-center justify-center flex-shrink-0"
            style={{ color: "var(--color-dark-muted)", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-dark-muted)")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 30, height: 30, borderRadius: "50%",
              background: "rgba(159,176,192,0.1)", border: "none",
              color: "var(--color-dark-muted)", cursor: "pointer", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(159,176,192,0.1)")}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Iframe */}
        <div className="relative flex-1 min-h-0">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div
                style={{
                  width: 36, height: 36, border: "2px solid rgba(201,168,76,0.2)",
                  borderTop: "2px solid var(--color-gold)", borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--color-dark-muted)" }}>
                LOADING
              </p>
            </div>
          )}
          <iframe
            src={url}
            title={name}
            className="w-full h-full"
            style={{ border: "none", display: loaded ? "block" : "none" }}
            onLoad={() => setLoaded(true)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
          {/* Fallback hint — always visible after load */}
          {loaded && (
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-2"
              style={{ background: "rgba(26,39,68,0.9)", borderTop: "1px solid rgba(201,168,76,0.1)" }}
            >
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.62rem", letterSpacing: "0.12em", color: "var(--color-dark-muted)" }}>
                Site not loading?{" "}
                <a href={url} target="_blank" rel="noopener noreferrer"
                  style={{ color: "var(--color-gold)", textDecoration: "underline" }}>
                  Open in new tab →
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modal, document.body) : null;
}
