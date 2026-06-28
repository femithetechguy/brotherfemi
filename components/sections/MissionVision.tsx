"use client";

import { useEffect, useRef } from "react";
import type { Section } from "@/types";

interface Props {
  mission: Section;
  vision: Section;
}

function FlameIcon() {
  return (
    <svg width="48" height="64" viewBox="0 0 48 64" fill="none" className="mission-icon" aria-hidden="true">
      <path
        d="M24 2C24 2 6 18 6 36C6 51.5 14 62 24 62C34 62 42 51.5 42 36C42 18 24 2 24 2Z"
        fill="url(#flameGrad2)"
        opacity="0.9"
      />
      <path
        d="M24 22C24 22 15 31 15 40C15 46 19 52 24 52C29 52 33 46 33 40C33 31 24 22 24 22Z"
        fill="var(--color-navy)"
        opacity="0.35"
      />
      <defs>
        <linearGradient id="flameGrad2" x1="24" y1="2" x2="24" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8D4A8" />
          <stop offset="60%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="rgba(201,168,76,0.3)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function EyeIcon() {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg width="72" height="48" viewBox="0 0 72 48" fill="none" className="vision-icon" aria-hidden="true">
      <path
        d="M4 24C4 24 16 6 36 6C56 6 68 24 68 24C68 24 56 42 36 42C16 42 4 24 4 24Z"
        stroke="url(#eyeGrad2)" strokeWidth="2" fill="none"
      />
      <circle cx="36" cy="24" r="9" stroke="url(#eyeGrad2)" strokeWidth="2" fill="none" />
      <circle cx="36" cy="24" r="4" fill="url(#eyeGrad2)" />
      {rays.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={36 + Math.cos(rad) * 14} y1={24 + Math.sin(rad) * 14}
            x2={36 + Math.cos(rad) * 19} y2={24 + Math.sin(rad) * 19}
            stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"
            opacity="0.4"
            style={{ animation: `rayFade 2.4s ease-in-out infinite ${i * 0.3}s` }}
          />
        );
      })}
      <defs>
        <linearGradient id="eyeGrad2" x1="4" y1="24" x2="68" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(201,168,76,0.4)" />
          <stop offset="50%" stopColor="#E8D4A8" />
          <stop offset="100%" stopColor="rgba(201,168,76,0.4)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ComingSoon({ delay = "0s", light = false }: { delay?: string; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm" style={{ border: "1px solid rgba(201,168,76,0.25)", background: light ? "rgba(201,168,76,0.07)" : "rgba(201,168,76,0.05)" }}>
      <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--color-gold)", animation: `mvPulse 2s ease-in-out infinite ${delay}` }} />
      <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: light ? "var(--color-cobalt)" : "var(--color-dark-muted)" }}>
        Coming Soon
      </span>
    </div>
  );
}

export default function MissionVision({ mission, vision }: Props) {
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panels = [missionRef.current, visionRef.current].filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("mv-visible"); observer.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    panels.forEach((p) => p && observer.observe(p));
    return () => observer.disconnect();
  }, []);

  const divider = (
    <div className="hidden md:block w-px self-stretch flex-shrink-0" style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.4) 30%, rgba(201,168,76,0.4) 70%, transparent)" }} />
  );

  return (
    <div className="flex flex-col md:flex-row" style={{ background: "var(--color-cream)" }}>
      {/* Mission */}
      <section id={mission.id} className="relative flex-1 py-24 px-8 overflow-hidden">
        <span aria-hidden="true" className="absolute select-none pointer-events-none" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(8rem,20vw,14rem)", fontWeight: 700, color: "rgba(26,39,68,0.04)", top: "50%", left: "5%", transform: "translateY(-50%)", lineHeight: 1 }}>I</span>
        <div ref={missionRef} className="mv-panel relative z-10 max-w-sm mx-auto text-center">
          <div className="flex justify-center mb-8"><FlameIcon /></div>
          <p className="section-label">{mission.title}</p>
          <h2 className="leading-tight mb-0" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "var(--color-ink)" }}>
            Our Mission
          </h2>
          <span className="gold-bar" style={{ margin: "1.25rem auto" }} />
          <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "1rem", color: "var(--color-cobalt)", lineHeight: 1.9, marginBottom: "2rem" }}>
            &ldquo;Being prayerfully discerned before the Lord.&rdquo;
          </p>
          <ComingSoon delay="0s" light />
        </div>
      </section>

      {divider}

      {/* Vision */}
      <section id={vision.id} className="relative flex-1 py-24 px-8 overflow-hidden" style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}>
        <span aria-hidden="true" className="absolute select-none pointer-events-none" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(8rem,20vw,14rem)", fontWeight: 700, color: "rgba(26,39,68,0.04)", top: "50%", right: "5%", transform: "translateY(-50%)", lineHeight: 1 }}>II</span>
        <div ref={visionRef} className="mv-panel relative z-10 max-w-sm mx-auto text-center" style={{ animationDelay: "0.15s" }}>
          <div className="flex justify-center mb-8"><EyeIcon /></div>
          <p className="section-label">{vision.title}</p>
          <h2 className="leading-tight mb-0" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "var(--color-ink)" }}>
            Our Vision
          </h2>
          <span className="gold-bar" style={{ margin: "1.25rem auto" }} />
          <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "1rem", color: "var(--color-cobalt)", lineHeight: 1.9, marginBottom: "0.5rem" }}>
            &ldquo;Where there is no vision, the people perish.&rdquo;
          </p>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "2rem" }}>
            — Proverbs 29:18
          </p>
          <ComingSoon delay="0.5s" light />
        </div>
      </section>
    </div>
  );
}
