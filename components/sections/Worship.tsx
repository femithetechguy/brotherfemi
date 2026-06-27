import type { Section, BrotherFemi } from "@/types";

interface Props {
  section: Section;
  brotherFemi: BrotherFemi;
}

export default function Worship({ section, brotherFemi }: Props) {
  return (
    <section
      id={section.id}
      className="min-h-screen bg-navy text-cream flex items-center py-20 px-4"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <img
          src="/svg/holybible.svg"
          alt="Holy Bible"
          className="w-64 md:w-80 flex-shrink-0 opacity-90"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4 leading-tight">
            Bond Servant of Christ
          </h1>
          <p className="text-cream/80 text-lg leading-relaxed mb-6">
            {brotherFemi.details}
          </p>
          {section.bibleVerse && (
            <blockquote className="border-l-4 border-gold pl-4 mb-6 italic text-cream/70">
              <p className="mb-1">"{section.bibleVerse}"</p>
              {section.reference && (
                <a
                  href={section.bible_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold text-sm not-italic"
                >
                  — {section.reference}
                </a>
              )}
            </blockquote>
          )}
          <a
            href="/#contact"
            className="inline-block bg-gold text-navy font-bold px-6 py-3 rounded-full text-sm tracking-wide hover:bg-gold/90 transition-colors"
          >
            Let&apos;s Connect
          </a>
        </div>
      </div>
    </section>
  );
}
