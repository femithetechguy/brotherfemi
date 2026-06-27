import { getSections } from "@/lib/data";

export function generateStaticParams() {
  const blogSection = getSections().find((s) => s.id === "blog");
  return (blogSection?.blogtitles ?? []).map((t) => ({
    slug: t.read_more_url.replace("blog/", "").replace(".html", ""),
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main>
      <h1>{slug}</h1>
    </main>
  );
}
