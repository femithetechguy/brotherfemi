import sectionsData from "@/data/sections.json";
import type { Section, BlogTitle } from "@/types";

export function generateStaticParams() {
  const blogSection = (sectionsData as { sections: Section[] }).sections.find(
    (s) => s.id === "blog"
  );
  const titles: BlogTitle[] = blogSection?.blogtitles ?? [];
  return titles.map((t) => ({
    slug: t.read_more_url.replace("blog/", "").replace(".html", ""),
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <h1>{params.slug}</h1>
    </main>
  );
}
