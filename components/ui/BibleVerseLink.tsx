"use client";

import type { CSSProperties, ReactNode } from "react";
import { useBibleVerse } from "./BibleVerseContext";

interface Props {
  verse?: string;
  reference: string;
  bibleUrl?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function BibleVerseLink({ verse, reference, bibleUrl, children, className, style }: Props) {
  const { open } = useBibleVerse();

  return (
    <button
      onClick={() => open({ verse, reference, bibleUrl })}
      className={className}
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left", ...style }}
      title={`${reference} — tap to read`}
      aria-label={`Open ${reference}`}
    >
      {children}
    </button>
  );
}
