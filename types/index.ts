// brotherfemi.json
export interface ContactLink {
  type: string;
  url: string;
}

export interface TestimonyUrl {
  href: string;
  target: string;
  rel: string;
}

export interface TestimonyIframe {
  src: string;
  allowtransparency: boolean;
  allowfullscreen: boolean;
  frameborder: number;
  scrolling: string;
}

export interface Testimony {
  text: string[];
  url: TestimonyUrl;
  iframe: TestimonyIframe;
}

export interface AnchorVerse {
  id: string;
  title: string;
  menu: string;
  bibleVerse: string;
  reference: string;
  bible_url: string;
}

export interface BrotherFemi {
  title: string;
  details: string;
  vision: string;
  mission: string;
  testimony: Testimony;
  heartCry: string[];
  coreValues: string[];
  anchor: AnchorVerse;
  contact: ContactLink[];
}

export interface BrotherFemiData {
  brotherFemi: BrotherFemi;
}

// sections.json
export interface BibleReference {
  reference: string;
  bible_url: string;
}

export interface BlogTitle {
  title: string;
  short_details: string;
  read_more_url: string;
}

export interface SectionChild {
  id: string;
  title: string;
  text: string[];
}

export interface Section {
  id: string;
  title: string;
  menu: string;
  bibleVerse?: string;
  reference?: string;
  bible_url?: string;
  text?: string | string[];
  blogtitles?: BlogTitle[];
  children?: SectionChild[];
}

export interface Footer {
  year: number;
  copyright: string;
  subtitle: string;
}

export interface SectionsData {
  sections: Section[];
  footer: Footer;
}

// mentors.json
export interface Mentor {
  name: string;
  Ministry: string;
  minstry_url: string;
}

export interface MentorsData {
  mentors: Mentor[];
}

// ministry.json
export interface MinistryData {
  [key: string]: unknown;
}

// blog.json
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}
