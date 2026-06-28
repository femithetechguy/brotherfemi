import type { Section, BrotherFemi } from "@/types";

interface Props {
  section: Section;
  coreValues: BrotherFemi["coreValues"];
}

export default function CoreValues({ section, coreValues }: Props) {
  return (
    <section
      id={section.id}
      className="py-20 px-4"
      style={{ background: "var(--color-parchment)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label">{section.title}</p>
          <h2
            className="text-3xl leading-tight"
            style={{ color: "var(--color-ink)" }}
          >
            What We Stand For
          </h2>
        </div>

        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))" }}
        >
          {coreValues.map((value, i) => (
            <div
              key={i}
              className="px-6 py-5 rounded-sm"
              style={{
                background: "var(--color-cobalt)",
                borderLeft: "3px solid var(--color-gold)",
              }}
            >
              <p
                className="mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--color-gold)",
                  letterSpacing: "0.05em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  color: "var(--color-dark-text)",
                  lineHeight: 1.6,
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
