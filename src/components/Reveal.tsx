"use client";

import { useEffect } from "react";

// Adds "is-in" to every [data-reveal] element the first time it scrolls into view.
export default function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
