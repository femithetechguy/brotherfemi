"use client";

import { useEffect, useRef } from "react";
import type { Section } from "@/types";
import BibleRefPill from "@/components/ui/BibleRefPill";
import BibleVerseLink from "@/components/ui/BibleVerseLink";

interface BibleRef { reference: string; bibleVerse?: string; bible_url?: string; url?: string }

interface NewLifeChild {
  id: string;
  title: string;
  text: string[];
  fiveFingerPrayer?: {
    finger: string;
    meaning: string;
    prayFor: string[];
    prayerFocus: string;
  }[];
  scriptureReferences?: { reference: string; text: string; version: string }[];
}

interface NewLifeSection extends Section {
  core_beliefs_reference?: BibleRef[];
  spiritualNewlife?: {
    text: string[];
    spiritual_newlife_text_reference: BibleRef[];
    bibleReferences: BibleRef[];
  };
  children?: NewLifeChild[];
}

interface Props { section: Section }

const FINGER_DEFS = [
  { x: 2,  y: 22, h: 36 }, // Thumb
  { x: 14, y: 10, h: 48 }, // Index
  { x: 26, y: 2,  h: 56 }, // Middle
  { x: 38, y: 12, h: 46 }, // Ring
  { x: 50, y: 24, h: 34 }, // Pinky
];

function FingerIcon({ activeIndex }: { activeIndex: number }) {
  return (
    <svg width="44" height="52" viewBox="0 0 60 65" fill="none" aria-hidden="true">
      {/* Palm */}
      <rect x="2" y="46" width="56" height="17" rx="4" fill="rgba(201,168,76,0.15)" />
      {/* Fingers */}
      {FINGER_DEFS.map((f, i) => (
        <rect
          key={i}
          x={f.x} y={f.y} width="9" height={f.h} rx="4.5"
          fill={i === activeIndex ? "var(--color-gold)" : "rgba(201,168,76,0.15)"}
        />
      ))}
    </svg>
  );
}

function CoreBeliefLine({ line }: { line: string }) {
  if (line.endsWith(":")) {
    return (
      <p style={{
        fontFamily: "var(--font-ui)",
        fontSize: "0.65rem",
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--color-cobalt)",
        marginTop: "1.25rem",
        marginBottom: "0.25rem",
      }}>
        {line.slice(0, -1)}
      </p>
    );
  }
  if (line.startsWith("•")) {
    return (
      <div className="flex gap-3 items-baseline">
        <span style={{ color: "var(--color-gold)", flexShrink: 0, fontSize: "0.75rem" }}>—</span>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.97rem", color: "var(--color-ink)", lineHeight: 1.75 }}>
          {line.slice(1).trim()}
        </p>
      </div>
    );
  }
  return (
    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.97rem", color: "var(--color-ink)", lineHeight: 1.75 }}>
      {line}
    </p>
  );
}

function PrayerLines({ lines }: { lines: string[] }) {
  return (
    <div
      className="space-y-1"
      style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 2, color: "var(--color-ink)" }}
    >
      {lines.map((line, i) =>
        line === "" ? <div key={i} className="h-3" /> : <p key={i}>{line}</p>
      )}
    </div>
  );
}

export default function NewLife({ section }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const panels = Array.from(el.querySelectorAll<HTMLElement>(".nl-panel"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { (e.target as HTMLElement).classList.add("nl-visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    panels.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  const s = section as NewLifeSection;
  const text = Array.isArray(s.text) ? s.text : [];
  const coreBeliefsRefs = s.core_beliefs_reference ?? [];
  const spiritual = s.spiritualNewlife;
  const children = s.children ?? [];

  const STUB_IDS = ["christian", "acknowledgement", "confession"];
  const EXCLUDE_IDS = ["five-finger-prayer", "altercall", "prayer-for-children", ...STUB_IDS];

  const fiveFingerChild    = children.find((c) => c.id === "five-finger-prayer");
  const altarCallChild     = children.find((c) => c.id === "altercall");
  const childrenPrayerChild = children.find((c) => c.id === "prayer-for-children");
  const stubChildren       = children.filter((c) => STUB_IDS.includes(c.id));
  const otherChildren      = children.filter((c) => !EXCLUDE_IDS.includes(c.id));

  return (
    <section id={section.id} ref={sectionRef}>
      {/* CORE BELIEFS — parchment bg */}
      <div className="py-20 px-4" style={{ background: "var(--color-parchment)" }}>
        <div className="max-w-4xl mx-auto">
          {section.bibleVerse && (
            <div className="nl-panel mb-10 text-center">
              <p className="section-label">New Life in Christ</p>
              <h2
                className="leading-tight mb-0"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem,4vw,2.6rem)",
                  color: "var(--color-ink)",
                }}
              >
                {section.title}
              </h2>
              <span className="gold-bar" style={{ display: "block", margin: "0.75rem auto" }} />
              <blockquote className="max-w-xl mx-auto">
                <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "1.05rem", color: "var(--color-ink)", lineHeight: 1.8 }}>
                  &ldquo;{section.bibleVerse}&rdquo;
                </p>
                {section.reference && (
                  <BibleVerseLink
                    verse={section.bibleVerse}
                    reference={section.reference}
                    bibleUrl={section.bible_url}
                    className="inline-block mt-2"
                    style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-cobalt)" }}
                  >
                    — {section.reference}
                  </BibleVerseLink>
                )}
              </blockquote>
            </div>
          )}

          {/* What is a Christian */}
          <div className="nl-panel space-y-2 mb-8" style={{ "--nl-delay": "0.1s" } as React.CSSProperties}>
            {text.map((line, i) => (
              <CoreBeliefLine key={i} line={line} />
            ))}
          </div>
          {coreBeliefsRefs.length > 0 && (
            <div className="nl-panel flex flex-wrap gap-2 mt-6" style={{ "--nl-delay": "0.18s" } as React.CSSProperties}>
              {coreBeliefsRefs.map((ref) => (
                <BibleRefPill
                  key={ref.reference}
                  reference={ref.reference}
                  verse={ref.bibleVerse}
                  bibleUrl={ref.bible_url}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FIVE FINGER PRAYER — cobalt bg */}
      {fiveFingerChild && (
        <div className="py-20 px-4" style={{ background: "var(--color-cobalt)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="nl-panel">
              <p className="section-label" style={{ color: "var(--color-sage)" }}>{fiveFingerChild.title}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-dark-muted)", lineHeight: 1.75, marginBottom: "2.5rem" }}>
                {fiveFingerChild.text[0]}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {fiveFingerChild.fiveFingerPrayer?.map((f, i) => (
                <div
                  key={f.finger}
                  className={`nl-panel rounded-sm p-5 flex flex-col${
                    i === 4 ? " sm:col-span-2 sm:max-w-xs sm:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0" : ""
                  }`}
                  style={{ background: "rgba(250,247,242,0.05)", border: "1px solid rgba(201,168,76,0.2)", ["--nl-delay" as string]: `${i * 0.08}s` }}
                >
                  {/* Finger SVG */}
                  <div className="flex justify-center mb-4">
                    <FingerIcon activeIndex={i} />
                  </div>

                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-gold)", marginBottom: "0.4rem" }}>
                    {f.finger}
                  </p>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-sage)", marginBottom: "0.6rem" }}>
                    {f.meaning}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-dark-text)", lineHeight: 1.6, marginBottom: "0.5rem" }}>
                    {f.prayFor.join(", ")}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.8rem", color: "var(--color-dark-muted)", lineHeight: 1.5, marginTop: "auto" }}>
                    {f.prayerFocus}
                  </p>
                </div>
              ))}
            </div>

            {fiveFingerChild.scriptureReferences && (
              <div className="mt-8 flex flex-wrap gap-3 items-start">
                {fiveFingerChild.scriptureReferences.map((sr) => (
                  <BibleRefPill
                    key={sr.reference}
                    reference={`${sr.reference} (${sr.version})`}
                    verse={sr.text}
                    dark
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SPIRITUAL WARFARE — navy bg */}
      {spiritual && (() => {
        const bodyLines = spiritual.text.slice(0, -1);
        const refsLabel = spiritual.text[spiritual.text.length - 1];
        return (
          <div
            className="py-24 px-4 relative overflow-hidden"
            style={{ background: "var(--color-navy)", borderTop: "1px solid rgba(201,168,76,0.12)" }}
          >
            {/* Shield watermark */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ opacity: 0.04 }}
              viewBox="0 0 400 400"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M200 40 L340 90 L340 210 C340 290 200 360 200 360 C200 360 60 290 60 210 L60 90 Z"
                fill="var(--color-gold)"
              />
              <path
                d="M200 80 L310 122 L310 214 C310 276 200 332 200 332 C200 332 90 276 90 214 L90 122 Z"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="6"
              />
            </svg>

            <div className="max-w-6xl mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left: heading + body */}
              <div className="nl-panel">
                <p className="section-label" style={{ color: "var(--color-dark-muted)" }}>Spiritual Warfare</p>
                <h2
                  className="leading-tight mb-0"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem,4vw,2.6rem)",
                    color: "var(--color-gold-lt)",
                  }}
                >
                  Stand Firm in the Faith
                </h2>
                <span className="gold-bar" />
                <div className="space-y-4">
                  {bodyLines.map((line, i) => (
                    <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.97rem", color: "var(--color-dark-text)", lineHeight: 1.85 }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right: key refs + meditation pills */}
              <div className="nl-panel lg:pt-16" style={{ "--nl-delay": "0.12s" } as React.CSSProperties}>
                {/* Key references */}
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "0.6rem" }}>
                  Key References
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {spiritual.spiritual_newlife_text_reference.map((ref) => (
                    <BibleRefPill
                      key={ref.reference}
                      reference={ref.reference}
                      verse={ref.bibleVerse}
                      bibleUrl={ref.bible_url}
                      dark
                    />
                  ))}
                </div>

                {/* Meditation scriptures */}
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-sage)", marginBottom: "0.6rem" }}>
                  {refsLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {spiritual.bibleReferences.map((ref) => (
                    <BibleRefPill
                      key={ref.reference}
                      reference={ref.reference}
                      verse={ref.bibleVerse}
                      bibleUrl={ref.url}
                      dark
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* STEPS INTO NEW LIFE — consolidated stub cards */}
      {stubChildren.length > 0 && (
        <div className="py-20 px-4" style={{ background: "var(--color-parchment)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label">Steps into New Life</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {stubChildren.map((child, i) => (
                <div
                  key={child.id}
                  className="nl-panel rounded-sm p-6 flex flex-col"
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(201,168,76,0.15)",
                    borderTop: "3px solid var(--color-gold)",
                    ["--nl-delay" as string]: `${i * 0.1}s`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "rgba(201,168,76,0.25)",
                      lineHeight: 1,
                      marginBottom: "0.75rem",
                      display: "block",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-cobalt)", marginBottom: "0.5rem" }}>
                    {child.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-ink)", lineHeight: 1.7, marginTop: "auto" }}>
                    {child.text[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* OTHER CHILDREN — parchment bg */}
      {otherChildren.map((child) => (
        <div key={child.id} className="py-16 px-4" style={{ background: "var(--color-parchment)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
          <div className="nl-panel max-w-3xl mx-auto">
            <p className="section-label">{child.title}</p>
            <PrayerLines lines={child.text} />
          </div>
        </div>
      ))}

      {/* ALTAR CALL — navy bg, centered */}
      {altarCallChild && (() => {
        const stanzas = altarCallChild.text
          .reduce<string[][]>((acc, line) => {
            if (line === "") { acc.push([]); }
            else { if (!acc.length) acc.push([]); acc[acc.length - 1].push(line); }
            return acc;
          }, [])
          .filter((s) => s.length > 0);

        return (
          <div className="py-24 px-4 text-center relative overflow-hidden" style={{ background: "var(--color-navy)" }}>
            {/* Cross watermark */}
            <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
              <rect x="188" y="60"  width="24" height="280" fill="var(--color-gold)" />
              <rect x="80"  y="152" width="240" height="24" fill="var(--color-gold)" />
            </svg>

            <div className="nl-panel max-w-xl mx-auto relative">
              <p className="section-label" style={{ color: "var(--color-dark-muted)" }}>Altar Call</p>
              <h2
                className="leading-tight mb-0"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem,3.5vw,2.2rem)", color: "var(--color-gold-lt)" }}
              >
                A Prayer of Surrender
              </h2>
              <span className="gold-bar" style={{ display: "block", margin: "0.75rem auto" }} />

              <div className="space-y-8 mb-12 mt-8">
                {stanzas.map((stanza, si) => (
                  <div key={si} className="space-y-1">
                    {stanza.map((line, li) => {
                      const isSalutation = si === 0 && li === 0;
                      const isAmen = line.trim().toLowerCase() === "amen.";
                      return (
                        <p
                          key={li}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontStyle: "italic",
                            fontSize: isSalutation ? "1.15rem" : isAmen ? "1.2rem" : "1rem",
                            color: isSalutation || isAmen ? "var(--color-gold)" : "var(--color-dark-text)",
                            lineHeight: 1.75,
                            fontWeight: isAmen ? 600 : undefined,
                            letterSpacing: isAmen ? "0.05em" : undefined,
                            marginTop: isAmen ? "0.5rem" : undefined,
                          }}
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>
                ))}
              </div>

              <a
                href="/contact"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: "var(--color-gold)",
                  color: "var(--color-navy)",
                  borderRadius: "2px",
                  padding: "0.9rem 2.4rem",
                  display: "inline-block",
                }}
              >
                Receive New Life
              </a>
            </div>
          </div>
        );
      })()}

      {/* CHILDREN'S PRAYER — cream bg */}
      {childrenPrayerChild && (() => {
        const DIVIDER = "⸻";
        const BULLET = "\t•\t";

        // Split text into groups by ⸻ divider
        const groups = childrenPrayerChild.text.reduce<string[][]>((acc, line) => {
          if (line === DIVIDER) { acc.push([]); }
          else { if (!acc.length) acc.push([]); acc[acc.length - 1].push(line); }
          return acc;
        }, []);

        // Last group is the closing line if it doesn't start with a number
        const lastGroup = groups[groups.length - 1];
        const closingLine = lastGroup?.length === 1 && !/^\d+\./.test(lastGroup[0])
          ? groups.pop()?.[0]
          : null;

        const prayerBlocks = groups.map((block) => {
          const [, num, theme] = block[0].match(/^(\d+)\.\s+(.+)$/) ?? ["", "", block[0]];
          const salutation = block[1] ?? "";
          const rest = block.slice(2);
          const opener = rest[0] && !rest[0].startsWith(BULLET) ? rest[0] : null;
          const petitions = rest.filter((l) => l.startsWith(BULLET)).map((l) => l.replace(BULLET, ""));
          return { num, theme, salutation, opener, petitions };
        });

        return (
          <div className="py-20 px-4 relative overflow-hidden" style={{ background: "var(--color-cream)" }}>
            {/* Heart watermark */}
            <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
              <path d="M200 320 C200 320 60 220 60 140 C60 100 90 75 130 75 C160 75 185 95 200 115 C215 95 240 75 270 75 C310 75 340 100 340 140 C340 220 200 320 200 320Z" fill="var(--color-gold)" />
            </svg>

            <div className="max-w-xl mx-auto relative">
              <div className="nl-panel">
                <p className="section-label" style={{ color: "var(--color-cobalt)" }}>For the Little Ones</p>
                <h2
                  className="leading-tight mb-0"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem,3vw,2rem)", color: "var(--color-navy)" }}
                >
                  {childrenPrayerChild.title}
                </h2>
                <span className="gold-bar" style={{ display: "block", margin: "0.75rem 0" }} />
              </div>

              <div className="mt-8 space-y-10">
                {prayerBlocks.map(({ num, theme, salutation, opener, petitions }, i) => (
                  <div key={i} className="nl-panel" style={{ ["--nl-delay" as string]: `${i * 0.1}s` }}>
                    {/* Numbered section badge */}
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        style={{
                          width: 28, height: 28, borderRadius: "50%",
                          background: "var(--color-gold)", color: "var(--color-navy)",
                          fontFamily: "var(--font-display)", fontSize: "0.72rem",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {num}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-display)", fontSize: "0.68rem",
                          letterSpacing: "0.2em", textTransform: "uppercase",
                          color: "var(--color-navy)",
                        }}
                      >
                        {theme}
                      </span>
                    </div>

                    {/* Salutation */}
                    <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "1.05rem", color: "var(--color-cobalt)", lineHeight: 1.6, marginBottom: "0.2rem" }}>
                      {salutation}
                    </p>

                    {/* Opener */}
                    {opener && (
                      <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.97rem", color: "var(--color-ink)", lineHeight: 1.8, marginBottom: "0.75rem" }}>
                        {opener}
                      </p>
                    )}

                    {/* Petitions */}
                    <ul className="space-y-2 mt-2">
                      {petitions.map((petition, pi) => (
                        <li key={pi} className="flex gap-3 items-start">
                          <span style={{ color: "var(--color-gold)", flexShrink: 0, marginTop: "0.05rem" }}>—</span>
                          <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.95rem", color: "var(--color-ink)", lineHeight: 1.75 }}>
                            {petition}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Divider between blocks */}
                    {i < prayerBlocks.length - 1 && (
                      <div style={{ borderTop: "1px solid rgba(201,168,76,0.3)", marginTop: "2.5rem" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Closing line */}
              {closingLine && (
                <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "1.05rem", color: "var(--color-gold)", textAlign: "center", marginTop: "3rem", letterSpacing: "0.03em" }}>
                  {closingLine}
                </p>
              )}
            </div>
          </div>
        );
      })()}
    </section>
  );
}
