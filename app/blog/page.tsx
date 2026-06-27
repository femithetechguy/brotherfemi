import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — Brother Femi",
  description: "Faith reflections, testimonies, and devotionals from Brother Femi.",
};

export default function BlogPage() {
  const posts = getBlogPosts();
  return (
    <main className="flex-1 bg-cream py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-navy mb-2 tracking-widest uppercase text-center">
          Blog
        </h1>
        <p className="text-navy/60 text-center mb-12 text-sm">
          Faith reflections, testimonies, and devotionals
        </p>
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border border-gold/20 rounded-xl p-6 bg-white hover:border-gold hover:shadow-md transition-all"
            >
              <p className="text-gold/70 text-xs mb-2">{post.date}</p>
              <h2 className="text-navy font-bold text-xl mb-2">{post.title}</h2>
              <p className="text-navy/60 text-sm leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block bg-navy text-gold text-sm font-semibold px-4 py-2 rounded-full hover:bg-navy/90 transition-colors"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/#blog" className="text-gold text-sm font-semibold hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
