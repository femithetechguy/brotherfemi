import type { Section, Mentor } from "@/types";

interface Props {
  section: Section;
  mentors: Mentor[];
}

export default function Mentors({ section, mentors }: Props) {
  return (
    <section id={section.id} className="py-16 px-4 bg-cream">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gold mb-10 tracking-widest uppercase text-center">
          {section.title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mentors.map((mentor) => (
            <a
              key={mentor.name}
              href={mentor.minstry_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-3 rounded-lg border border-gold/20 bg-white hover:border-gold hover:shadow-md transition-all"
            >
              <span className="text-gold text-2xl mb-2">✝</span>
              <span className="text-navy text-xs font-semibold leading-snug mb-1">
                {mentor.name}
              </span>
              <span className="text-navy/50 text-xs leading-snug">
                {mentor.Ministry}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
