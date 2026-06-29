"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Section } from "@/types";
import { getBlogPosts } from "@/lib/data";

interface Props { section: Section }

export default function Blog({ section }: Props) {
  const intro = typeof section.text === "string" ? section.text : "";
  const posts = getBlogPosts();
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const els = cardsRef.current.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("blog-card--visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={section.id}
      className="py-24 px-4"
      style={{ background: "var(--color-parchment)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label">{section.title}</p>
          <h2
            className="leading-tight mb-0"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem,4vw,2.6rem)",
              color: "var(--color-ink)",
            }}
          >
            From the Heart
          </h2>
          <span className="gold-bar" style={{ display: "block", margin: "0.75rem auto" }} />
          {intro && (
            <p
              className="mt-2 max-w-md mx-auto"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="blog-card flex flex-col group"
              style={{
                textDecoration: "none",
                "--blog-delay": `${i * 0.1}s`,
              } as React.CSSProperties}
            >
              <article
                className="flex flex-col flex-1 rounded-sm overflow-hidden"
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
