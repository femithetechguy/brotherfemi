"use client";

import { useEffect, useRef } from "react";
import type { Section } from "@/types";

interface Props { section: Section }

function FlameIcon() {
  return (
    <svg
      width="48" height="64" viewBox="0 0 48 64" fill="none"
      className="mission-icon"
      aria-hidden="true"
    >
      {/* Outer flame */}
      <path
        d="M24 2C24 2 6 18 6 36C6 51.5 14 62 24 62C34 62 42 51.5 42 36C42 18 24 2 24 2Z"
        fill="url(#flameGrad)"
        opacity="0.9"
      />
      {/* Inner core */}
      <path
        d="M24 22C24 22 15 31 15 40C15 46 19 52 24 52C29 52 33 46 33 40C33 31 24 22 24 22Z"
        fill="var(--color-navy)"
        opacity="0.35"
      />
      <defs>
        <linearGradient id="flameGrad" x1="24" y1="2" x2="24" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8D4A8" />
          <stop offset="60%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="rgba(201,168,76,0.3)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Mission({ section }: Props) {
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
      style={{ background: "var(--color-navy)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}
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
          left: "8%",
          transform: "translateY(-50%)",
          lineHeight: 1,
        }}
      >
        I
      </span>

      <div ref={ref} className="mv-panel relative z-10 max-w-lg mx-auto text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <FlameIcon />
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
          My Mission
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
          &ldquo;Being prayerfully discerned before the Lord.&rdquo;
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
              animation: "mvPulse 2s ease-in-out infinite",
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
