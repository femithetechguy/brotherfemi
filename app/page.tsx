import { getBrotherFemi, getSections, getMentors } from "@/lib/data";
import {
  Worship, Mission, Vision, CoreValues, HeartCry,
  About, Mentors, TheWord, Blog, Hymns, NewLife, Contact,
} from "@/components/sections";

export default function Home() {
  const brotherFemi = getBrotherFemi();
  const sections = getSections();
  const mentors = getMentors();

  function s(id: string) {
    return sections.find((sec) => sec.id === id)!;
  }

  return (
    <main>
      <Worship    section={s("worship")}    brotherFemi={brotherFemi} />
      <Mission    section={s("mission")} />
      <Vision     section={s("vision")} />
      <CoreValues section={s("core-values")} coreValues={brotherFemi.coreValues} />
      <HeartCry   section={s("heart-cry")}   heartCry={brotherFemi.heartCry} />
      <About      section={s("about")}       brotherFemi={brotherFemi} />
      <Mentors    section={s("mentors")}     mentors={mentors} />
      <TheWord    section={s("the-word")} />
      <Blog       section={s("blog")} />
      <Hymns      section={s("hymns")} />
      <NewLife    section={s("newlife")} />
      <Contact    section={s("contact")}     contact={brotherFemi.contact} />
    </main>
  );
}
