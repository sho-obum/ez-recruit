"use client";

import { useEffect, useState } from "react";

type Item = { id: string; title: string };

// Sticky index beside the tour cards; the active item is the last card that has reached the middle of the screen.
export default function TourNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const cards = items.map(i => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    let raf = 0;
    const update = () => {
      raf = 0;
      let n = 0;
      cards.forEach((c, i) => { if (c.getBoundingClientRect().top <= innerHeight * 0.5) n = i; });
      setActive(n);
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
    return () => { removeEventListener("scroll", queue); removeEventListener("resize", queue); cancelAnimationFrame(raf); };
  }, [items]);

  return (
    <nav aria-label="Product tour" className="sticky top-40 flex flex-col pl-[22px]">
      <span aria-hidden="true" className="absolute inset-y-0 left-1 w-px bg-line" />
      <span aria-hidden="true" style={{ transform: `translateY(${active * 38}px)` }}
        className="absolute top-[7px] left-0.5 h-6 w-[5px] rounded-full bg-ink transition-transform duration-500 ease-(--ease-out) motion-reduce:transition-none" />
      {items.map((it, i) => (
        <a key={it.id} href={`#${it.id}`} aria-current={i === active ? "step" : undefined}
          className={`py-2.5 text-[15px] leading-[18px] font-medium tracking-[-0.15px] transition-colors duration-300
            ${i === active ? "text-ink" : "text-faint hover:text-muted"}`}>
          {it.title}
        </a>
      ))}
    </nav>
  );
}
