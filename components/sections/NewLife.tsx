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
  const s = section as NewLifeSection;
  const text = Array.isArray(s.text) ? s.text : [];
  const coreBeliefsRefs = s.core_beliefs_reference ?? [];
  const spiritual = s.spiritualNewlife;
  const children = s.children ?? [];

  const fiveFingerChild = children.find((c) => c.id === "five-finger-prayer");
  const altarCallChild = children.find((c) => c.id === "altar-call");
  const childrenPrayerChild = children.find((c) => c.id === "children-prayer" || c.id === "childrens-prayer");
  const otherChildren = children.filter(
    (c) => c.id !== "five-finger-prayer" && c.id !== "altar-call" && c.id !== "children-prayer" && c.id !== "childrens-prayer"
  );

  return (
    <section id={section.id}>
      {/* CORE BELIEFS — parchment bg */}
      <div className="py-20 px-4" style={{ background: "var(--color-parchment)" }}>
        <div className="max-w-4xl mx-auto">
          {section.bibleVerse && (
            <div className="mb-10 text-center">
              <p className="section-label">New Life in Christ</p>
              <h2 className="text-3xl leading-tight mb-6" style={{ color: "var(--color-ink)" }}>
                {section.title}
              </h2>
              <blockquote className="max-w-xl mx-auto">
                <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "1.05rem", color: "var(--color-ink)", lineHeight: 1.8 }}>
                  &ldquo;{section.bibleVerse}&rdquo;
                </p>
                {section.reference && (
                  <a href={section.bible_url} target="_blank" rel="noopener noreferrer" className="inline-block mt-2"
                    style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-cobalt)" }}>
                    — {section.reference}
                  </a>
                )}
              </blockquote>
            </div>
          )}

          {/* What is a Christian */}
          <p className="section-label">What is a Christian?</p>
          <ol className="space-y-3 mb-8">
            {text.map((line, i) => (
              <li key={i} className="flex gap-4">
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "var(--color-cobalt)", minWidth: "1.8rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.97rem", color: "var(--color-ink)", lineHeight: 1.75 }}>{line}</span>
              </li>
            ))}
          </ol>
          {coreBeliefsRefs.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {coreBeliefsRefs.map((ref) => (
                <a key={ref.reference} href={ref.bible_url} target="_blank" rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "var(--color-cobalt)", border: "1px solid rgba(30,58,95,0.3)", borderRadius: "2px", padding: "0.2rem 0.6rem" }}>
                  {ref.reference}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FIVE FINGER PRAYER — cobalt bg */}
      {fiveFingerChild && (
        <div className="py-20 px-4" style={{ background: "var(--color-cobalt)" }}>
          <div className="max-w-5xl mx-auto">
            <p className="section-label" style={{ color: "var(--color-sage)" }}>{fiveFingerChild.title}</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-dark-muted)", lineHeight: 1.75, marginBottom: "2rem" }}>
              {fiveFingerChild.text[0]}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {fiveFingerChild.fiveFingerPrayer?.map((f) => (
                <div key={f.finger} className="rounded-sm p-5" style={{ background: "rgba(250,247,242,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-gold)", marginBottom: "0.4rem" }}>
                    {f.finger}
                  </p>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-sage)", marginBottom: "0.6rem" }}>
                    {f.meaning}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-dark-text)", lineHeight: 1.6, marginBottom: "0.5rem" }}>
                    {f.prayFor.join(", ")}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.8rem", color: "var(--color-dark-muted)", lineHeight: 1.5 }}>
                    {f.prayerFocus}
                  </p>
                </div>
              ))}
            </div>
            {fiveFingerChild.scriptureReferences && (
              <div className="mt-6 space-y-2">
                {fiveFingerChild.scriptureReferences.map((sr) => (
                  <p key={sr.reference} style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.82rem", color: "var(--color-dark-muted)" }}>
                    {sr.reference} ({sr.version}): &ldquo;{sr.text}&rdquo;
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SPIRITUAL WARFARE — cobalt bg */}
      {spiritual && (
        <div className="py-20 px-4" style={{ background: "var(--color-cobalt)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
          <div className="max-w-4xl mx-auto">
            <p className="section-label" style={{ color: "var(--color-sage)" }}>Spiritual Warfare</p>
            <div className="space-y-4 mb-6">
              {spiritual.text.map((line, i) => (
                <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.97rem", color: "var(--color-dark-text)", lineHeight: 1.8 }}>{line}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {spiritual.spiritual_newlife_text_reference.map((ref) => (
                <a key={ref.reference} href={ref.bible_url} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "var(--color-gold)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "2px", padding: "0.2rem 0.6rem" }}>
                  {ref.reference}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {spiritual.bibleReferences.map((ref) => (
                <a key={ref.reference} href={ref.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "var(--color-dark-muted)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "2px", padding: "0.2rem 0.6rem" }}>
                  {ref.reference}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* OTHER CHILDREN — parchment bg */}
      {otherChildren.map((child) => (
        <div key={child.id} className="py-16 px-4" style={{ background: "var(--color-parchment)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
          <div className="max-w-3xl mx-auto">
            <p className="section-label">{child.title}</p>
            <PrayerLines lines={child.text} />
          </div>
        </div>
      ))}

      {/* ALTAR CALL — navy bg, centered */}
      {altarCallChild && (
        <div className="py-24 px-4 text-center" style={{ background: "var(--color-navy)" }}>
          <div className="max-w-2xl mx-auto">
            <p className="section-label" style={{ color: "var(--color-sage)" }}>{altarCallChild.title}</p>
            <div className="space-y-4 mb-10">
              {altarCallChild.text.map((line, i) => (
                <p key={i} style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "1.05rem", color: "var(--color-dark-text)", lineHeight: 1.85 }}>{line}</p>
              ))}
            </div>
            <a
              href="/#contact"
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
      )}

      {/* CHILDREN'S PRAYER — parchment bg */}
      {childrenPrayerChild && (
        <div className="py-20 px-4" style={{ background: "var(--color-parchment)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
          <div className="max-w-3xl mx-auto">
            <p className="section-label">For the Little Ones</p>
            <h3 className="text-2xl mb-6" style={{ color: "var(--color-ink)" }}>{childrenPrayerChild.title}</h3>
            <div className="space-y-1" style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 2, color: "var(--color-ink)" }}>
              {childrenPrayerChild.text.map((line, i) =>
                line === "" ? <div key={i} className="h-3" /> : <p key={i}>{line}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
