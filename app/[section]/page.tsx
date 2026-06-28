import HomeContent from "@/components/HomeContent";
import ScrollToSection from "@/components/ui/ScrollToSection";

// All sections that get their own clean URL route.
// "blog" is excluded — /blog already routes to the blog listing page.
const SECTION_SLUGS = [
  "worship",
  "mission",
  "vision",
  "core-values",
  "heart-cry",
  "about",
  "mentors",
  "word",
  "hymns",
  "newlife",
  "contact",
];

export function generateStaticParams() {
  return SECTION_SLUGS.map((section) => ({ section }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return (
    <>
      <ScrollToSection id={section} />
      <HomeContent />
    </>
  );
}
