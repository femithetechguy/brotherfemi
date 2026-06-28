import type { Section } from "@/types";
import BibleVerseLink from "@/components/ui/BibleVerseLink";

interface Props { section: Section }

export default function TheWord({ section }: Props) {
  const text = Array.isArray(section.text) ? section.text : section.text ? [section.text] : [];
  return (
    <section
      id={section.id}
      className="py-24 px-4"
      style={{
        background: "var(--color-navy)",
        borderTop: "1px solid rgba(201,168,76,0.12)",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <p className="section-label" style={{ color: "var(--color-sage)" }}>{section.title}</p>

        {section.bibleVerse && (
          <div className="mb-8">
            <p
              className="leading-relaxed mb-6"
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
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
                className="inline-block mt-4"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-sage)",
                }}
              >
                — {section.reference}
              </BibleVerseLink>
            )}
          </div>
        )}

        {text.slice(1).length > 0 && (
          <div
            className="space-y-3 mt-8 text-left max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.97rem",
              lineHeight: 1.85,
              color: "var(--color-dark-text)",
            }}
          >
            {text.slice(1).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
