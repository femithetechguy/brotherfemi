import type { Section } from "@/types";

interface Props { section: Section }

export default function Vision({ section }: Props) {
  return (
    <section
      id={section.id}
      className="py-20 px-4"
      style={{ background: "var(--color-cream)", borderTop: "1px solid rgba(201,168,76,0.1)" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <p className="section-label">{section.title}</p>
        <h2
          className="text-3xl leading-tight mb-6"
          style={{ color: "var(--color-ink)" }}
        >
          Our Vision
        </h2>
        <span className="gold-bar" style={{ margin: "1.25rem auto" }} />
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: "1.05rem",
            color: "var(--color-muted)",
            lineHeight: 1.85,
          }}
        >
          This is being prayerfully discerned. Check back soon.
        </p>
      </div>
    </section>
  );
}
