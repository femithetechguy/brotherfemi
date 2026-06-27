import type { Section, BrotherFemi } from "@/types";

interface Props {
  section: Section;
  coreValues: BrotherFemi["coreValues"];
}

export default function CoreValues({ section, coreValues }: Props) {
  return (
    <section id={section.id} className="py-16 px-4 bg-cream">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gold mb-10 tracking-widest uppercase">
          {section.title}
        </h2>
        <ul className="inline-flex flex-col gap-4 text-left">
          {coreValues.map((value, i) => (
            <li key={i} className="flex items-start gap-3 text-navy text-lg">
              <span className="text-gold font-bold mt-0.5">✦</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
