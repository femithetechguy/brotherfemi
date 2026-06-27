import type { Section } from "@/types";

interface Props { section: Section }

export default function Mission({ section }: Props) {
  return (
    <section id={section.id} className="py-16 px-4 bg-cream">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gold mb-8 tracking-widest uppercase">
          {section.title}
        </h2>
        <p className="text-navy/60 italic text-lg">To be disclosed</p>
      </div>
    </section>
  );
}
