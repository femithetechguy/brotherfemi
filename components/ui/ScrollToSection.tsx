"use client";

import { useEffect } from "react";

export default function ScrollToSection({ id }: { id: string }) {
  useEffect(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "instant" });
  }, [id]);
  return null;
}
