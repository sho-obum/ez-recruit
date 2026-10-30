"use client";

import { useEffect, useRef, useState } from "react";

// How far (px) the section has to scroll under its pinned stage before the app window slides over the copy.
const TRIGGER = 710;

// Pinned stage from tablet up: the copy holds still, then the dark app window slides in over it and the copy slides away.
// Phones get a plain stacked layout. Reduced motion swaps the two states without animating.
export default function RolesStage({ copy, panel }: { copy: React.ReactNode; panel: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const section = ref.current?.parentElement;
    if (!section) return;
    let raf = 0;
    const update = () => { raf = 0; setOpen(section.getBoundingClientRect().top <= -TRIGGER); };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
    return () => { removeEventListener("scroll", queue); removeEventListener("resize", queue); cancelAnimationFrame(raf); };
  }, []);

  const slide = "transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none";
  return (
    <div ref={ref} className="relative z-1 flex flex-col gap-8 overflow-clip px-5 py-18 md:sticky md:top-0 md:block md:h-screen md:p-0">
      <div className="flex items-center justify-center md:absolute md:inset-0 md:px-6 lg:px-8">
        <div className="w-full max-w-[1136px]">
          <div className={`max-w-[520px] ${slide} ${open ? "md:-translate-x-[640px]" : ""}`}>{copy}</div>
        </div>
      </div>
      <div className="relative z-2 flex items-center justify-center md:absolute md:inset-0 md:px-6 md:py-10 lg:px-8">
        <div className={`w-full max-w-[1040px] ${slide} ${open ? "" : "md:translate-x-[640px]"}`}>{panel}</div>
      </div>
    </div>
  );
}
