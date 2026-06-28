"use client";

import { useEffect, useRef } from "react";
import type { Section } from "@/types";

interface Props { section: Section }

function EyeIcon() {
  return (
    <svg
      width="72" height="48" viewBox="0 0 72 48" fill="none"
      className="vision-icon"
      aria-hidden="true"
    >
      {/* Outer eye shape */}
      <path
        d="M4 24C4 24 16 6 36 6C56 6 68 24 68 24C68 24 56 42 36 42C16 42 4 24 4 24Z"
        stroke="url(#eyeGrad)"
        strokeWidth="2"
        fill="none"
      />
      {/* Iris */}
      <circle cx="36" cy="24" r="9" stroke="url(#eyeGrad)" strokeWidth="2" fill="none" />
      {/* Pupil */}
      <circle cx="36" cy="24" r="4" fill="url(#eyeGrad)" />
      {/* Light rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 36 + Math.cos(rad) * 14;
        const y1 = 24 + Math.sin(rad) * 14;
        const x2 = 36 + Math.cos(rad) * 19;
        const y2 = 24 + Math.sin(rad) * 19;
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#C9A84C"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
            style={{ animation: `rayFade 2.4s ease-in-out infinite ${i * 0.3}s` }}
          />
        );
      })}
      <defs>
        <linearGradient id="eyeGrad" x1="4" y1="24" x2="68" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(201,168,76,0.4)" />
          <stop offset="50%" stopColor="#E8D4A8" />
          <stop offset="100%" stopColor="rgba(201,168,76,0.4)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Vision({ section }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("mv-visible"); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={section.id}
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "#0f1a2e", borderBottom: "1px solid rgba(201,168,76,0.08)" }}
    >
      {/* Subtle watermark numeral */}
      <span
        aria-hidden="true"
        className="absolute select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(8rem, 20vw, 16rem)",
          fontWeight: 700,
          color: "rgba(201,168,76,0.04)",
          top: "50%",
          right: "8%",
          transform: "translateY(-50%)",
          lineHeight: 1,
        }}
      >
        II
      </span>

      <div ref={ref} className="mv-panel relative z-10 max-w-lg mx-auto text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <EyeIcon />
        </div>

        <p className="section-label" style={{ color: "var(--color-sage)" }}>
          {section.title}
        </p>
        <h2
          className="leading-tight mb-0"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "var(--color-dark-text)",
          }}
        >
          Our Vision
        </h2>
        <span className="gold-bar" style={{ margin: "1.25rem auto" }} />

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: "1.05rem",
            color: "var(--color-gold-lt)",
            lineHeight: 1.9,
            marginBottom: "2rem",
          }}
        >
          &ldquo;Where there is no vision, the people perish.&rdquo;
        </p>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.68rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-dark-muted)",
            marginBottom: "2rem",
          }}
        >
          — Proverbs 29:18
        </p>

        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-sm"
          style={{
            border: "1px solid rgba(201,168,76,0.2)",
            background: "rgba(201,168,76,0.05)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--color-gold)",
              animation: "mvPulse 2s ease-in-out infinite 0.5s",
            }}
          />
          <span style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-dark-muted)",
          }}>
            Coming Soon
          </span>
        </div>
      </div>
    </section>
  );
}
