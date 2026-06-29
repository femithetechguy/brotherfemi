"use client";

import { useState, useEffect, useRef } from "react";
import { SocialIcon, getSocialColor, SOCIAL_ORDER_CONTACT } from "@/components/ui/SocialIcon";
import BibleVerseLink from "@/components/ui/BibleVerseLink";
import type { Section, ContactLink } from "@/types";

interface Props {
  section: Section;
  contact: ContactLink[];
}

const inputStyle = {
  width: "100%",
  background: "var(--color-cobalt)",
  border: "1px solid rgba(201,168,76,0.2)",
  borderRadius: "2px",
  padding: "0.8rem 1rem",
  fontFamily: "var(--font-body)",
  fontSize: "0.95rem",
  color: "var(--color-dark-text)",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const labelStyle = {
  display: "block",
  fontFamily: "var(--font-ui)",
  fontSize: "0.7rem",
  fontWeight: 500,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--color-dark-muted)",
  marginBottom: "0.4rem",
};

export default function Contact({ section, contact }: Props) {
  const socials = SOCIAL_ORDER_CONTACT
    .map((type) => contact.find((c) => c.type === type))
    .filter((c): c is ContactLink => c !== undefined);

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = [leftRef.current, rightRef.current].filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("contact-visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    targets.forEach((t) => observer.observe(t));

    // Social stagger: trigger when socials container enters view
    const socialsEl = socialsRef.current;
    const socialsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          socialsEl?.classList.add("contact-socials--visible");
          socialsObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (socialsEl) socialsObserver.observe(socialsEl);

    return () => { observer.disconnect(); socialsObserver.disconnect(); };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xnnvgoen", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id={section.id}
      className="py-20 px-4"
      style={{ background: "var(--color-navy)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left: info */}
        <div ref={leftRef} className="contact-left">
          <p className="section-label" style={{ color: "var(--color-sage)" }}>Get in Touch</p>
          <h2
            className="text-3xl leading-tight mb-0"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-dark-text)" }}
          >
            {section.title}
          </h2>
          <span className="gold-bar" />

          {section.bibleVerse && (
            <p
              className="mb-8 leading-relaxed"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-dark-muted)", lineHeight: 1.8 }}
            >
              &ldquo;{section.bibleVerse}&rdquo;{" "}
              {section.reference && (
                <BibleVerseLink
                  verse={section.bibleVerse!}
                  reference={section.reference}
                  bibleUrl={section.bible_url}
                  style={{ color: "var(--color-gold)", fontStyle: "italic" }}
                >
                  — {section.reference}
                </BibleVerseLink>
              )}
            </p>
          )}

          {/* Social icons */}
          <div ref={socialsRef} className="flex flex-wrap gap-4 mb-10">
            {socials.map((link, i) => (
              <a
                key={link.type}
                href={link.url}
                target={link.url.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={link.type}
                style={{ color: getSocialColor(link.type), ["--si-delay" as string]: `${i * 0.07}s` }}
                className="social-icon contact-social-item"
              >
                <SocialIcon type={link.type} size={24} />
              </a>
            ))}
          </div>

          <p
            style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.95rem", color: "var(--color-gold-lt)" }}
          >
            &ldquo;Every message is received with prayer.&rdquo;
          </p>
        </div>

        {/* Right: form */}
        <form ref={rightRef} onSubmit={handleSubmit} className="contact-right space-y-5">
          <div>
            <label htmlFor="name" style={labelStyle}>Name</label>
            <input id="name" name="name" type="text" required placeholder="Your name" className="contact-input" style={inputStyle} />
          </div>
          <div>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input id="email" name="email" type="email" required placeholder="your@email.com" className="contact-input" style={inputStyle} />
          </div>
          <div>
            <label htmlFor="message" style={labelStyle}>Message</label>
            <textarea id="message" name="message" rows={5} required placeholder="What's on your heart?"
              className="contact-input" style={{ ...inputStyle, resize: "none" }} />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              width: "100%",
              fontFamily: "var(--font-ui)",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: "var(--color-gold)",
              color: "var(--color-navy)",
              border: "none",
              borderRadius: "2px",
              padding: "0.9rem 2rem",
              cursor: status === "sending" ? "not-allowed" : "pointer",
              opacity: status === "sending" ? 0.6 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>
          {status === "success" && (
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.85rem", color: "var(--color-sage)", textAlign: "center" }}>
              Message sent! Thank you.
            </p>
          )}
          {status === "error" && (
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.85rem", color: "#e07070", textAlign: "center" }}>
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
