"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { CSSProperties, ReactNode } from "react";

const BibleVerseModal = dynamic(() => import("./BibleVerseModal"), { ssr: false });

interface Props {
  verse?: string;
  reference: string;
  bibleUrl?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function BibleVerseLink({ verse, reference, bibleUrl, children, className, style }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className}
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left", ...style }}
        title={`${reference} — tap to read`}
        aria-label={`Open ${reference}`}
      >
        {children}
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
