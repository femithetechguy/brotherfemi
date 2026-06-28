"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Section, Mentor } from "@/types";

const MentorModal = dynamic(() => import("@/components/ui/MentorModal"), { ssr: false });

interface Props {
  section: Section;
  mentors: Mentor[];
}

export default function Mentors({ section, mentors }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Mentor | null>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".mentor-card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mentor-card--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={section.id}
      className="py-24 px-4"
      style={{ background: "var(--color-navy)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label" style={{ color: "var(--color-sage)" }}>
            {section.title}
          </p>
          <h2
            className="text-3xl leading-tight mb-0"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-dark-text)" }}
          >
            Those Who Shaped This Walk
          </h2>
          <span className="gold-bar" />
          <p
            className="max-w-xl mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: "0.97rem",
              color: "var(--color-dark-muted)",
              lineHeight: 1.8,
            }}
          >
            Voices God placed along the path — each one a gift, a torch, a compass.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {mentors.map((mentor, i) => (
            <button
              key={mentor.name}
              onClick={() => setActive(mentor)}
              className="mentor-card flex flex-col items-center text-center py-7 px-4 rounded-sm w-full"
              style={{ "--delay": `${(i % 5) * 0.07}s` } as React.CSSProperties}
            >
              {/* Cross */}
              <svg
                width="18"
                height="26"
                viewBox="0 0 18 26"
                fill="none"
                className="mb-5 flex-shrink-0"
                style={{ color: "var(--color-gold)", opacity: 0.7 }}
                aria-hidden="true"
              >
                <rect x="7" y="0" width="4" height="26" rx="1" fill="currentColor" />
                <rect x="0" y="7" width="18" height="4" rx="1" fill="currentColor" />
              </svg>

              <span
                className="leading-snug mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--color-dark-text)",
                  lineHeight: 1.45,
                }}
              >
                {mentor.name}
              </span>
              <span
                className="leading-snug"
                style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  fontSize: "0.73rem",
                  color: "var(--color-dark-muted)",
                  lineHeight: 1.5,
                }}
              >
                {mentor.Ministry}
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <MentorModal
          name={active.name}
          ministry={active.Ministry}
          url={active.minstry_url}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
