import Link from "next/link";
import type { Section } from "@/types";
import { getBlogPosts } from "@/lib/data";

interface Props { section: Section }

export default function Blog({ section }: Props) {
  const intro = typeof section.text === "string" ? section.text : "";
  const posts = getBlogPosts();
  return (
    <section
      id={section.id}
      className="py-20 px-4"
      style={{ background: "var(--color-parchment)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label">Reflections</p>
          <h2
            className="text-3xl leading-tight"
            style={{ color: "var(--color-ink)" }}
          >
            From the Heart
          </h2>
          {intro && (
            <p
              className="mt-4 max-w-md mx-auto"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                color: "var(--color-muted)",
                lineHeight: 1.7,
              }}
            >
              {intro}
            </p>
          )}
        </div>

        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))" }}
        >
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col group"
              style={{ textDecoration: "none" }}
            >
              <article
                className="flex flex-col flex-1 rounded-sm overflow-hidden transition-transform duration-200 group-hover:-translate-y-1"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderTop: "3px solid var(--color-gold)",
                }}
              >
                <div className="p-6 flex flex-col flex-1">
                  <p
                    className="mb-3"
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.65rem",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--color-cobalt)",
                    }}
                  >
                    {post.date}
                  </p>
                  <h3
                    className="mb-3 leading-snug"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.05rem",
                      color: "var(--color-ink)",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="flex-1 mb-5"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      color: "var(--color-ink)",
                      lineHeight: 1.7,
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "var(--color-cobalt)",
                    }}
                  >
                    Read more →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
