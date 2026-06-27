import type { Section } from "@/types";

interface Props { section: Section }

export default function TheWord({ section }: Props) {
  const text = Array.isArray(section.text) ? section.text : section.text ? [section.text] : [];
  return (
    <section id={section.id} className="py-16 px-4 bg-navy text-cream">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gold mb-8 tracking-widest uppercase">
          {section.title}
        </h2>
        {section.bibleVerse && (
          <blockquote className="border-l-4 border-gold pl-5 mb-6 text-left italic text-cream/80 text-lg">
            <p className="mb-2">"{section.bibleVerse}"</p>
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
        <div className="space-y-3 text-cream/70 text-base leading-relaxed text-left">
          {text.slice(1).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
