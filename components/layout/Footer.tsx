import { getBrotherFemi } from "@/lib/data";

const SOCIAL_ORDER = ["Instagram", "Thread", "Tiktok", "Youtube", "Facebook"];

export default function Footer() {
  const { contact } = getBrotherFemi();
  const socials = SOCIAL_ORDER
    .map((type) => contact.find((c) => c.type === type))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-gold/20 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-5">
        <img src="/svg/logo-icon.svg" alt="Brother Femi" className="h-12 w-12" />

        <div className="flex flex-wrap justify-center gap-5">
          {socials.map((link) => (
            <a
              key={link.type}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold tracking-widest text-gold/60 hover:text-gold transition-colors uppercase"
            >
              {link.type}
            </a>
          ))}
        </div>

        <p className="text-cream/30 text-xs tracking-wide text-center">
          © {year} Brother Femi · Bond Servant of Christ
        </p>
      </div>
    </footer>
  );
}
