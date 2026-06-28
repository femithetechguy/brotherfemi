import type { Section } from "@/types";
import BibleVerseLink from "@/components/ui/BibleVerseLink";

interface Props { section: Section }

export default function Hymns({ section }: Props) {
  const lines = Array.isArray(section.text) ? section.text.slice(1) : [];
  return (
    <section
      id={section.id}
      className="py-20 px-4"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left */}
        <div>
          <p className="section-label">Sacred Songs</p>
          <h2
            className="text-3xl leading-tight mb-0"
            style={{ color: "var(--color-ink)" }}
          >
            {section.title} &amp; Worship
          </h2>
          <span className="gold-bar" />

          {section.bibleVerse && (
            <blockquote className="mb-6">
              <p
                className="leading-relaxed mb-2"
                style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  fontSize: "1rem",
                  color: "var(--color-ink)",
                  lineHeight: 1.8,
                }}
              >
                &ldquo;{section.bibleVerse}&rdquo;
              </p>
              {section.reference && (
                <BibleVerseLink
                  verse={section.bibleVerse!}
                  reference={section.reference}
                  bibleUrl={section.bible_url}
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-cobalt)",
                  }}
                >
                  — {section.reference}
                </BibleVerseLink>
              )}
            </blockquote>
          )}

          {lines.slice(0, 1).map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.97rem",
                color: "var(--color-ink)",
                lineHeight: 1.75,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Right: hymn list rows */}
        <div>
          <div
            className="rounded-sm overflow-hidden"
            style={{ border: "1px solid rgba(201,168,76,0.12)" }}
          >
            {lines.length > 0 ? lines.map((hymn, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4 group transition-colors"
                style={{
                  borderBottom: i < lines.length - 1 ? "1px solid rgba(201,168,76,0.12)" : "none",
                  background: "transparent",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.75rem",
                    color: "var(--color-cobalt)",
                    minWidth: "1.5rem",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="flex-1"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    color: "var(--color-ink)",
                  }}
                >
                  {hymn}
                </span>
                <button
                  aria-label="Play"
                  className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full transition-colors"
                  style={{
                    border: "1px solid var(--color-gold)",
                    color: "var(--color-cobalt)",
                    background: "transparent",
                    fontSize: "0.75rem",
                  }}
                >
                  ▷
                </button>
              </div>
            )) : (
              <div
                className="px-5 py-8 text-center"
                style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  color: "var(--color-ink)",
                  fontSize: "0.9rem",
                }}
              >
                A curated hymn playlist is being prayerfully assembled. Check back soon.
              </div>
            )}
          </div>

          {/* Music player hint */}
          <p
            className="mt-4"
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: "0.88rem",
              color: "var(--color-muted)",
            }}
          >
            Now playing — a playlist of worship hymns
          </p>
          <p
            className="mt-1"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-sage)",
            }}
          >
            Player controls in the top bar ↑
          </p>
        </div>
      </div>
    </section>
  );
}
