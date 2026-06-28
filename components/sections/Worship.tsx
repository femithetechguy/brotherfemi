import type { Section } from "@/types";
import BibleVerseLink from "@/components/ui/BibleVerseLink";

interface Props {
  section: Section;
}

export default function Worship({ section }: Props) {
  return (
    <section
      id={section.id}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      style={{ background: "var(--color-navy)" }}
    >
      {/* Cross watermark */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.04 }}
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="200" cy="200" r="200" fill="var(--color-gold)" />
        <rect x="188" y="60" width="24" height="280" fill="var(--color-navy)" />
        <rect x="100" y="148" width="200" height="24" fill="var(--color-navy)" />
      </svg>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto py-24">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block h-px w-10" style={{ background: "var(--color-dark-muted)" }} />
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--color-dark-muted)",
            }}
          >
            Bond Servant of Christ
          </span>
          <span className="block h-px w-10" style={{ background: "var(--color-dark-muted)" }} />
        </div>

        {/* Heading */}
        <h1
          className="mb-8 leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
            fontWeight: 700,
            color: "var(--color-gold)",
          }}
        >
          Brother Femi
        </h1>

        {/* Scripture quote */}
        {section.bibleVerse && (
          <div className="mb-8 max-w-xl">
            <p
              className="leading-relaxed mb-3"
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: "1.05rem",
                color: "var(--color-gold-lt)",
                lineHeight: 1.8,
              }}
            >
              &ldquo;{section.bibleVerse}&rdquo;
            </p>
            <span className="verse-underline" />
            {section.reference && (
              <BibleVerseLink
                verse={section.bibleVerse!}
                reference={section.reference}
                bibleUrl={section.bible_url}
                className="inline-block mt-3"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                }}
              >
                — {section.reference}
              </BibleVerseLink>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/#about"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "var(--color-gold)",
              color: "var(--color-navy)",
              borderRadius: "2px",
              padding: "0.9rem 2.2rem",
              display: "inline-block",
            }}
          >
            My Story
          </a>
          <a
            href="/#contact"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "transparent",
              color: "var(--color-dark-text)",
              border: "1px solid var(--color-gold)",
              borderRadius: "2px",
              padding: "0.9rem 2.2rem",
              display: "inline-block",
            }}
          >
            Let&apos;s Connect
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
        style={{ animation: "scrollBob 2s ease-in-out infinite" }}
      >
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--color-dark-muted)",
          }}
        >
          Scroll
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "var(--color-gold)" }}>
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
