import { getBrotherFemi } from "@/lib/data";
import { SocialIcon, getSocialColor, SOCIAL_ORDER_NAV } from "@/components/ui/SocialIcon";
const NAV_LINKS = [
  { label: "The Word", href: "/#the-word" },
  { label: "Blog", href: "/blog" },
  { label: "Hymns", href: "/#hymns" },
  { label: "New Life", href: "/#newlife" },
];


export default function Footer() {
  const { contact } = getBrotherFemi();
  const socials = SOCIAL_ORDER_NAV
    .map((type) => contact.find((c) => c.type === type))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto py-12 px-4"
      style={{
        background: "var(--color-navy)",
        borderTop: "1px solid rgba(201,168,76,0.1)",
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        <img src="/svg/logo-icon.svg" alt="Brother Femi" className="h-12 w-12" />

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-dark-muted)",
              }}
              className="hover:opacity-100 opacity-70 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-5">
          {socials.map((link) => (
            <a
              key={link.type}
              href={link.url}
              target={link.url.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={link.type}
              style={{ color: getSocialColor(link.type) }}
              className="social-icon"
            >
              <SocialIcon type={link.type} />
            </a>
          ))}
        </div>

        {/* Closing scripture */}
        <p
          className="text-center max-w-sm leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: "0.9rem",
            color: "var(--color-gold-lt)",
          }}
        >
          "Now the God of peace be with you all. Amen." — Romans 15:33
        </p>

        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.7rem",
            color: "var(--color-dark-muted)",
            opacity: 0.5,
          }}
        >
          © {year} Brother Femi · Bond Servant of Christ
        </p>
      </div>
    </footer>
  );
}
