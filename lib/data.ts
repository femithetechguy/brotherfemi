import brotherFemiRaw from "@/data/brotherfemi.json";
import sectionsRaw from "@/data/sections.json";
import mentorsRaw from "@/data/mentors.json";
import ministryRaw from "@/data/ministry.json";

import type { BrotherFemi, Section, Mentor, MinistryData } from "@/types";

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
