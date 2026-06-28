import { getSections, getBlogPosts, getMentors } from "./data";

export type SearchItemType = "section" | "blog" | "mentor";

export interface SearchItem {
  type: SearchItemType;
  title: string;
  subtitle: string;
  body: string;
  href: string;
}

function flatText(val: unknown): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (Array.isArray(val)) return val.map(flatText).join(" ");
  if (typeof val === "object") return Object.values(val as Record<string, unknown>).map(flatText).join(" ");
  return String(val);
}

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const s of getSections()) {
    items.push({
      type: "section",
      title: s.title,
      subtitle: s.menu ?? "",
      body: flatText(s.text) + " " + flatText(s.bibleVerse),
      href: s.id === "worship" ? "/" : `/${s.id}`,
    });
  }

  for (const post of getBlogPosts()) {
    items.push({
      type: "blog",
      title: post.title,
      subtitle: post.date,
      body: post.excerpt,
      href: `/blog/${post.slug}`,
    });
  }

  for (const m of getMentors()) {
    items.push({
      type: "mentor",
      title: m.name,
      subtitle: m.Ministry,
      body: "",
      href: "/about",
    });
  }

  return items;
}
