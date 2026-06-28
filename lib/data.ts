import brotherFemiRaw from "@/data/brotherfemi.json";
import sectionsRaw from "@/data/sections.json";
import mentorsRaw from "@/data/mentors.json";
import ministryRaw from "@/data/ministry.json";
import blogRaw from "@/data/blog.json";

import type { BrotherFemi, Section, Mentor, MinistryData, BlogPost } from "@/types";

export function getBrotherFemi(): BrotherFemi {
  return brotherFemiRaw.brotherFemi as unknown as BrotherFemi;
}

export function getSections(): Section[] {
  return sectionsRaw.sections as unknown as Section[];
}

export function getSectionById(id: string): Section | undefined {
  return getSections().find((s) => s.id === id);
}

export function getMentors(): Mentor[] {
  return mentorsRaw.mentors as unknown as Mentor[];
}

export function getMinistry(): MinistryData {
  return ministryRaw as MinistryData;
}

export function getBlogPosts(): BlogPost[] {
  return blogRaw as unknown as BlogPost[];
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}
