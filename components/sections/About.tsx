import type { Section, BrotherFemi } from "@/types";

interface Props {
  section: Section;
  brotherFemi: BrotherFemi;
}

export default function About({ section, brotherFemi }: Props) {
  const { testimony, anchor } = brotherFemi;
  return (
    <section
      id={section.id}
      className="py-20 px-4"
      style={{ background: "var(--color-parchment)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: text */}
        <div>
          <p className="section-label">{section.title}</p>
          <h2
            className="text-3xl mb-0 leading-tight"
            style={{ color: "var(--color-ink)" }}
          >
            {anchor.title}
          </h2>
          <span className="gold-bar" />

          <div
            className="space-y-4 mb-8"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.97rem",
              lineHeight: 1.85,
              color: "var(--color-ink)",
            }}
          >
            {testimony.text.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Anchor scripture */}
          <blockquote
            className="pl-5 border-l-4 mb-6"
            style={{ borderColor: "var(--color-gold)" }}
          >
            <p
              className="mb-2 leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                color: "var(--color-ink)",
              }}
            >
              &ldquo;{anchor.bibleVerse}&rdquo;
            </p>
            <a
              href={anchor.bible_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-cobalt)",
              }}
            >
              — {anchor.reference}
            </a>
          </blockquote>
        </div>

        {/* Right: visual card */}
        <div
          className="relative rounded-sm overflow-hidden flex flex-col justify-end min-h-96"
          style={{
            background: "var(--color-cobalt)",
            border: "1px solid rgba(201,168,76,0.15)",
            aspectRatio: "3/4",
          }}
        >
          {/* Cross watermark */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.06 }}
            viewBox="0 0 300 400"
            preserveAspectRatio="xMidYMid meet"
          >
            <rect x="138" y="60" width="24" height="280" fill="var(--color-gold)" />
            <rect x="60" y="148" width="180" height="24" fill="var(--color-gold)" />
          </svg>

          {/* Instagram embed */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <iframe
              src={testimony.iframe.src}
              className="w-full rounded-sm"
              style={{ maxWidth: "320px", height: "380px" }}
              frameBorder="0"
              scrolling="no"
              allowFullScreen
            />
          </div>

          {/* Name card at bottom */}
          <div
            className="relative z-10 px-6 py-5"
            style={{ background: "rgba(26,39,68,0.85)" }}
          >
            <p
              className="leading-tight mb-1"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--color-gold)",
              }}
            >
              Brother Femi
            </p>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-dark-muted)",
              }}
            >
              Bond Servant · Worshipper · Steward
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
