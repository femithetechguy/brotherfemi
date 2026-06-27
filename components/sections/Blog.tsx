import Link from "next/link";
import type { Section } from "@/types";

interface Props { section: Section }

export default function Blog({ section }: Props) {
  const intro = typeof section.text === "string" ? section.text : "";
  const posts = section.blogtitles ?? [];
  return (
    <section id={section.id} className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gold mb-6 tracking-widest uppercase text-center">
          {section.title}
        </h2>
        {intro && (
          <p className="text-navy/70 text-center mb-10 leading-relaxed">{intro}</p>
        )}
        <div className="space-y-4">
          {posts.map((post) => {
            const slug = post.read_more_url
              .replace("blog/", "")
              .replace(".html", "");
            return (
              <div
                key={slug}
                className="border border-gold/20 rounded-lg p-5 bg-cream/40 hover:border-gold hover:shadow-sm transition-all"
              >
                <h3 className="text-navy font-semibold text-lg mb-2">
                  {post.title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed mb-3">
                  {post.short_details}
                </p>
                <Link
                  href={`/blog/${slug}`}
                  className="text-gold text-sm font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
