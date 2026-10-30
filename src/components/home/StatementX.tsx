"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Publishes scroll progress as --p (0 to 1) so each word can fill in turn; without JS or with reduced motion it stays at 1.
export default function StatementX({ count, className, children }: { count: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = innerHeight;
      const p = (vh * 0.9 - el.getBoundingClientRect().top) / (vh * 0.5);
      el.style.setProperty("--p", String(Math.min(1, Math.max(0, p))));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return <p ref={ref} className={className} style={{ "--n": count } as CSSProperties}>{children}</p>;
}
