"use client";

import { useState } from "react";
import type { Section, ContactLink } from "@/types";

interface Props {
  section: Section;
  contact: ContactLink[];
}

const SOCIAL_TYPES = ["Email", "Instagram", "Thread", "Tiktok", "Youtube", "Facebook"];

export default function Contact({ section, contact }: Props) {
  const socials = SOCIAL_TYPES
    .map((type) => contact.find((c) => c.type === type))
    .filter((c): c is ContactLink => c !== undefined);

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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
    <section id={section.id} className="py-16 px-4 bg-navy text-cream">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gold mb-4 tracking-widest uppercase text-center">
          {section.title}
        </h2>
        {section.bibleVerse && (
          <blockquote className="text-center italic text-cream/60 mb-10">
            <p className="mb-1">"{section.bibleVerse}"</p>
            {section.reference && (
              <a href={section.bible_url} target="_blank" rel="noopener noreferrer"
                className="text-gold text-sm not-italic">
                — {section.reference}
              </a>
            )}
          </blockquote>
        )}

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 mb-10">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-cream/80 mb-1">Name</label>
            <input id="name" name="name" type="text" required
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gold/30 text-cream placeholder-cream/40 focus:outline-none focus:border-gold" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cream/80 mb-1">Email</label>
            <input id="email" name="email" type="email" required
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gold/30 text-cream placeholder-cream/40 focus:outline-none focus:border-gold" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-cream/80 mb-1">Message</label>
            <textarea id="message" name="message" rows={4} required
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gold/30 text-cream placeholder-cream/40 focus:outline-none focus:border-gold resize-none" />
          </div>
          <button type="submit" disabled={status === "sending"}
            className="w-full py-3 bg-gold text-navy font-bold rounded-full tracking-wide hover:bg-gold/90 transition-colors disabled:opacity-50">
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>
          {status === "success" && (
            <p className="text-center text-green-400 text-sm">Message sent! Thank you.</p>
          )}
          {status === "error" && (
            <p className="text-center text-red-400 text-sm">Something went wrong. Please try again.</p>
          )}
        </form>

        {/* Social links */}
        <div className="flex flex-wrap justify-center gap-4">
          {socials.map((link) => (
            <a key={link.type} href={link.url} target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold tracking-widest text-gold/70 hover:text-gold transition-colors uppercase border border-gold/20 px-3 py-1.5 rounded-full hover:border-gold">
              {link.type}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
