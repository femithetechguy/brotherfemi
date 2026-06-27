import type { Section, BrotherFemi } from "@/types";

interface Props {
  section: Section;
  heartCry: BrotherFemi["heartCry"];
}

export default function HeartCry({ section, heartCry }: Props) {
  return (
    <section
      id={section.id}
      className="py-20 px-4"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <p className="section-label">{section.title}</p>
        <h2
          className="text-3xl leading-tight mb-6"
          style={{ color: "var(--color-ink)" }}
        >
          A Cry from the Heart
        </h2>
        <span className="gold-bar" style={{ margin: "1.25rem auto" }} />

        <div className="space-y-8 mt-8">
          {heartCry.map((cry, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: "1.1rem",
                color: "var(--color-gold)",
                lineHeight: 1.85,
                padding: "0 1rem",
              }}
            >
              &ldquo;{cry}&rdquo;
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
