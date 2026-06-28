"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

export default function SearchButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        title="Search (⌘K)"
        className="flex items-center justify-center"
        style={{ color: "rgba(201,168,76,0.7)", transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(201,168,76,0.7)")}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
}
