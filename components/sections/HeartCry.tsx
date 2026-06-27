import type { Section, BrotherFemi } from "@/types";

interface Props {
  section: Section;
  heartCry: BrotherFemi["heartCry"];
}

export default function HeartCry({ section, heartCry }: Props) {
  return (
    <section id={section.id} className="py-16 px-4 bg-navy text-cream">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gold mb-10 tracking-widest uppercase">
          {section.title}
        </h2>
        <ul className="inline-flex flex-col gap-5 text-left">
          {heartCry.map((cry, i) => (
            <li key={i} className="flex items-start gap-3 text-cream/90 text-base leading-relaxed">
              <span className="text-gold font-bold mt-0.5 flex-shrink-0">♱</span>
              <span>{cry}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
