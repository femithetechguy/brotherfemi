import type { Section } from "@/types";

interface BibleRef { reference: string; bible_url?: string; url?: string }

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

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-gold mb-3 border-b border-gold/20 pb-1">
        {title}
      </h3>
      {children}
    </div>
  );
}

function PrayerLines({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-1 text-navy/80 text-sm leading-relaxed">
      {lines.map((line, i) =>
        line === "" ? (
          <div key={i} className="h-2" />
        ) : (
          <p key={i}>{line}</p>
        )
      )}
    </div>
  );
}

export default function NewLife({ section }: Props) {
  const s = section as NewLifeSection;
  const text = Array.isArray(s.text) ? s.text : [];

  return (
    <section id={section.id} className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gold mb-4 tracking-widest uppercase text-center">
          {section.title}
        </h2>

        {/* Key verse */}
        {section.bibleVerse && (
          <blockquote className="border-l-4 border-gold pl-5 mb-8 italic text-navy/70">
            <p className="mb-1">"{section.bibleVerse}"</p>
            {section.reference && (
              <a href={section.bible_url} target="_blank" rel="noopener noreferrer" className="text-gold text-sm not-italic">
                — {section.reference}
              </a>
            )}
          </blockquote>
        )}

        {/* Who is a Christian */}
        <SubSection title="What is a Christian?">
          <div className="space-y-2 text-navy/80 text-sm leading-relaxed">
            {text.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          {s.core_beliefs_reference && (
            <div className="mt-3 flex flex-wrap gap-2">
              {s.core_beliefs_reference.map((ref) => (
                <a key={ref.reference} href={ref.bible_url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-gold border border-gold/30 rounded px-2 py-0.5 hover:bg-gold/10 transition-colors">
                  {ref.reference}
                </a>
              ))}
            </div>
          )}
        </SubSection>

        {/* Spiritual Warfare */}
        {s.spiritualNewlife && (
          <SubSection title="Spiritual Warfare">
            <div className="space-y-2 text-navy/80 text-sm leading-relaxed mb-3">
              {s.spiritualNewlife.text.map((line, i) => <p key={i}>{line}</p>)}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {s.spiritualNewlife.spiritual_newlife_text_reference.map((ref) => (
                <a key={ref.reference} href={ref.bible_url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-gold border border-gold/30 rounded px-2 py-0.5 hover:bg-gold/10 transition-colors">
                  {ref.reference}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {s.spiritualNewlife.bibleReferences.map((ref) => (
                <a key={ref.reference} href={ref.url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-gold/70 border border-gold/20 rounded px-2 py-0.5 hover:bg-gold/10 transition-colors">
                  {ref.reference}
                </a>
              ))}
            </div>
          </SubSection>
        )}

        {/* Children sections */}
        {s.children?.map((child) => {
          if (child.id === "five-finger-prayer") {
            return (
              <SubSection key={child.id} title={child.title}>
                <p className="text-navy/70 text-sm mb-4">{child.text[0]}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {child.fiveFingerPrayer?.map((f) => (
                    <div key={f.finger} className="border border-gold/20 rounded-lg p-3 bg-cream/40">
                      <p className="text-gold font-bold text-sm">{f.finger} — {f.meaning}</p>
                      <p className="text-navy/60 text-xs mt-1">{f.prayFor.join(", ")}</p>
                      <p className="text-navy/70 text-xs mt-1 italic">{f.prayerFocus}</p>
                    </div>
                  ))}
                </div>
                {child.scriptureReferences && (
                  <div className="mt-3 space-y-1">
                    {child.scriptureReferences.map((sr) => (
                      <p key={sr.reference} className="text-xs text-navy/60 italic">
                        {sr.reference} ({sr.version}): "{sr.text}"
                      </p>
                    ))}
                  </div>
                )}
              </SubSection>
            );
          }
          return (
            <SubSection key={child.id} title={child.title}>
              <PrayerLines lines={child.text} />
            </SubSection>
          );
        })}
      </div>
    </section>
  );
}
