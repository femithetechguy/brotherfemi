"use client";

import { useEffect, useRef } from "react";
import type { Section, BrotherFemi } from "@/types";

interface Props {
  section: Section;
  heartCry: BrotherFemi["heartCry"];
}

function HeartIcon() {
  return (
    <svg width="52" height="48" viewBox="0 0 52 48" fill="none" aria-hidden="true" className="hc-heart-icon">
      <path
        d="M26 42C26 42 5 29 5 16C5 10 10 5 16 5C20.5 5 24.4 7.5 26 11.2C27.6 7.5 31.5 5 36 5C42 5 47 10 47 16C47 29 26 42 26 42Z"
        fill="url(#hcHeartGrad)"
        opacity="0.88"
      />
      <defs>
        <linearGradient id="hcHeartGrad" x1="5" y1="5" x2="47" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#E8D4A8" stopOpacity="0.85" />
          <stop offset="55%"  stopColor="#C9A84C" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.25" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function HeartCry({ section, heartCry }: Props) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>(".hc-cry");
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("hc-cry--visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={section.id}
      className="py-24 px-4"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <HeartIcon />
        </div>

        <p className="section-label">{section.title}</p>
        <h2
          className="leading-tight mb-0"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem,4vw,2.8rem)",
            color: "var(--color-ink)",
          }}
        >
          A Cry from the Heart
        </h2>
        <span className="gold-bar" style={{ margin: "1.25rem auto" }} />

        <div className="relative mt-10" ref={listRef}>
          {/* Large decorative open-quote watermark */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(8rem,22vw,13rem)",
              color: "rgba(201,168,76,0.07)",
              top: "-2.5rem",
              left: "-0.5rem",
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            &ldquo;
          </span>

          <div className="relative z-10 flex flex-col gap-8">
            {heartCry.map((cry, i) => (
              <p
                key={i}
                className="hc-cry"
                style={{ "--hc-delay": `${i * 0.13}s` } as React.CSSProperties}
              >
                &ldquo;{cry}&rdquo;
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
