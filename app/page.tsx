import { getBrotherFemi, getSections, getMentors, getMinistry } from "@/lib/data";

export default function Home() {
  console.log("[data] brotherFemi.title:", getBrotherFemi().title);
  console.log("[data] sections.length:", getSections().length);
  console.log("[data] mentors.length:", getMentors().length);
  console.log("[data] ministry keys:", Object.keys(getMinistry()));

  return (
    <main>
      <p>Brother Femi — coming soon.</p>
    </main>
  );
}
