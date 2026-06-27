import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPost } from "@/lib/data";

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Brother Femi`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="flex-1 bg-cream py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="text-gold text-sm font-semibold hover:underline inline-block mb-8"
        >
          ← All Posts
        </Link>
        <article>
          <p className="text-gold/70 text-xs mb-2">{post.date}</p>
          <h1 className="text-3xl font-bold text-navy mb-8 leading-tight">
            {post.title}
          </h1>
          <div
            className="prose prose-navy max-w-none text-navy/80 leading-relaxed [&_h2]:text-navy [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-navy [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:text-navy/80 [&_p]:mb-4 [&_strong]:text-navy [&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-navy/70 [&_cite]:text-gold [&_cite]:text-sm [&_cite]:not-italic"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        <div className="mt-12 border-t border-gold/20 pt-8 text-center">
          <Link
            href="/blog"
            className="inline-block bg-navy text-gold text-sm font-semibold px-6 py-2 rounded-full hover:bg-navy/90 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
