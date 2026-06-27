import type { Section, BrotherFemi } from "@/types";

interface Props {
  section: Section;
  brotherFemi: BrotherFemi;
}

export default function About({ section, brotherFemi }: Props) {
  const { testimony, anchor } = brotherFemi;
  return (
    <section id={section.id} className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gold mb-8 tracking-widest uppercase text-center">
          {section.title}
        </h2>

        {/* Anchor scripture */}
        <blockquote className="border border-gold/30 rounded-lg p-5 mb-8 text-center bg-cream/50">
          <p className="text-navy italic mb-2">"{anchor.bibleVerse}"</p>
          <a
            href={anchor.bible_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold text-sm font-semibold"
          >
            — {anchor.reference}
          </a>
        </blockquote>

        {/* Testimony paragraphs */}
        <div className="space-y-4 mb-8">
          {testimony.text.map((para, i) => (
            <p key={i} className="text-navy/80 leading-relaxed text-justify">
              {para}
            </p>
          ))}
        </div>

        {/* Instagram embed */}
        <div className="flex justify-center">
          <iframe
            src={testimony.iframe.src}
            className="w-full max-w-sm rounded-lg border border-gold/20"
            height="540"
            frameBorder="0"
            scrolling="no"
            allowTransparency
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
