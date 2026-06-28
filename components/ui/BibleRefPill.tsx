"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { CSSProperties } from "react";

const BibleVerseModal = dynamic(() => import("./BibleVerseModal"), { ssr: false });

interface Props {
  reference: string;
  bibleUrl?: string;
  verse?: string;
  dark?: boolean;
  style?: CSSProperties;
}

export default function BibleRefPill({ reference, bibleUrl, verse, dark = false, style }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title={`${reference} — tap to read`}
        aria-label={`Open ${reference}`}
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "0.7rem",
          cursor: "pointer",
          background: "none",
          border: dark
            ? "1px solid rgba(201,168,76,0.3)"
            : "1px solid rgba(30,58,95,0.3)",
          borderRadius: "2px",
          padding: "0.2rem 0.6rem",
          color: dark ? "var(--color-gold)" : "var(--color-cobalt)",
          transition: "border-color 0.2s, color 0.2s",
          ...style,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-gold)";
          e.currentTarget.style.color = "var(--color-gold)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = dark ? "rgba(201,168,76,0.3)" : "rgba(30,58,95,0.3)";
          e.currentTarget.style.color = dark ? "var(--color-gold)" : "var(--color-cobalt)";
        }}
      >
        {reference}
      </button>
      {open && (
        <BibleVerseModal
          verse={verse}
          reference={reference}
          bibleUrl={bibleUrl}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
