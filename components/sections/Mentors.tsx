import type { Section, Mentor } from "@/types";

interface Props {
  section: Section;
  mentors: Mentor[];
}

export default function Mentors({ section, mentors }: Props) {
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
            Those Who Shaped This Walk
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mentors.map((mentor) => (
            <a
              key={mentor.name}
              href={mentor.minstry_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-4 rounded-sm transition-all"
              style={{
                border: "1px solid rgba(201,168,76,0.15)",
                background: "#fff",
              }}
            >
              <span
                className="mb-3"
                style={{ color: "var(--color-gold)", fontSize: "1.3rem" }}
              >
                ✝
              </span>
              <span
                className="leading-snug mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.78rem",
                  color: "var(--color-ink)",
                }}
              >
                {mentor.name}
              </span>
              <span
                className="leading-snug"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.68rem",
                  color: "var(--color-muted)",
                }}
              >
                {mentor.Ministry}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
