import { getBrotherFemi } from "@/lib/data";

const SOCIAL_ORDER = ["Email", "Instagram", "Thread", "Tiktok", "Youtube", "Facebook"];
const NAV_LINKS = [
  { label: "The Word", href: "/#the-word" },
  { label: "Blog", href: "/blog" },
  { label: "Hymns", href: "/#hymns" },
  { label: "New Life", href: "/#newlife" },
];

function getSocialColor(type: string): string {
  switch (type.toLowerCase()) {
    case "email":     return "#C9A84C";
    case "instagram": return "#E1306C";
    case "thread":
    case "threads":   return "#FFFFFF";
    case "tiktok":    return "#EE1D52";
    case "youtube":   return "#FF0000";
    case "facebook":  return "#1877F2";
    default:          return "#C9A84C";
  }
}

function SocialIcon({ type, size = 22 }: { type: string; size?: number }) {
  const t = type.toLowerCase();
  if (t === "email") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  );
  if (t === "instagram") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
  if (t === "thread" || t === "threads") return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068v-.076c0-3.548.85-6.424 2.525-8.547C5.865 1.18 8.609-.003 12.18 0h.014c2.746.018 5.143.806 6.92 2.233 1.645 1.323 2.678 3.165 3.079 5.477l-2.484.438c-.605-3.417-2.86-5.32-7.529-5.35-2.844.002-5.046.89-6.548 2.638-1.374 1.6-2.07 3.898-2.07 6.831v.076c0 2.924.698 5.209 2.072 6.792 1.501 1.726 3.71 2.605 6.564 2.612 2.523-.01 4.243-.61 5.35-1.813.734-.8 1.182-1.896 1.369-3.316-.974.148-1.99.205-3.035.17-1.62-.06-3.04-.41-4.186-1.04-1.36-.738-2.111-1.862-2.111-3.167 0-2.607 2.162-4.158 5.771-4.158.87 0 1.718.07 2.533.205-.143-.928-.476-1.648-1.003-2.152-.64-.609-1.573-.924-2.776-.935-1.18 0-2.148.262-2.877.778l-1.318-2.05c1.133-.76 2.564-1.147 4.254-1.147 3.856 0 6.028 2.082 6.28 5.865.194.072.386.149.572.23 1.877.822 2.954 2.219 2.954 4.169 0 .226-.014.45-.04.667C21.27 21.405 17.838 24 12.186 24zm1.247-8.31c1.093 0 2.115-.083 3.04-.247-.079-2.032-1.275-3.162-3.605-3.162-1.815 0-2.826.721-2.826 1.786 0 1.177 1.418 1.655 3.391 1.623z"/>
    </svg>
  );
  if (t === "tiktok") return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.78 1.53V6.75a4.85 4.85 0 01-1.01-.06z"/>
    </svg>
  );
  if (t === "youtube") return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  );
  if (t === "facebook") return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
  return null;
}

export default function Footer() {
  const { contact } = getBrotherFemi();
  const socials = SOCIAL_ORDER
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
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              <SocialIcon type={link.type} size={22} />
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
