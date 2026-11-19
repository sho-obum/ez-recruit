"use client";

import { useId, useState } from "react";
import Icon from "../Icon";

// One answer open at a time; the panel animates its height through grid rows.
export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <div className="flex w-full flex-col gap-2.5">
      {items.map((it, n) => {
        const on = open === n;
        return (
          // The reveal wrapper keeps a static className, so React re-renders never strip Reveal's .is-in.
          <div key={it.q} data-reveal style={{ "--d": `${n * 0.05}s` } as React.CSSProperties}>
          <div className={`relative rounded-[20px] transition-[background-color,box-shadow] duration-500 ease-(--ease-out)
              after:pointer-events-none after:absolute after:inset-0 after:rounded-[20px] after:border-[0.8px] after:transition-colors after:duration-500
              ${on ? "bg-white shadow-[0_16px_32px_-22px_rgba(20,20,20,0.25)] after:border-[#dbdbdb]" : "bg-fill-2 after:border-line"}`}>
            <h3>
              <button type="button" aria-expanded={on} aria-controls={`${id}-${n}`} id={`${id}-q${n}`}
                onClick={() => setOpen(on ? null : n)}
                className="flex w-full cursor-pointer items-center gap-4 rounded-[20px] py-5 pr-5 pl-6 text-left">
                <span className="flex-1 text-[15px] leading-[19.5px] font-medium tracking-[-0.15px] md:text-base md:leading-[20.8px] md:tracking-[-0.16px]">{it.q}</span>
                <span aria-hidden="true" className={`grid size-[34px] flex-none place-items-center rounded-full transition-[background-color,color,rotate] duration-500 ease-(--ease-out)
                  ${on ? "rotate-45 bg-ink text-white" : "bg-white text-ink"}`}>
                  <Icon name="plus" size={15} stroke={1.6} />
                </span>
              </button>
            </h3>
            <div id={`${id}-${n}`} role="region" aria-labelledby={`${id}-q${n}`}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-(--ease-out) ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden" inert={!on || undefined}>
                <p className="pr-6 pb-[22px] md:pr-[74px] pl-6 text-[15px] leading-[22.5px] tracking-[-0.075px] text-muted md:text-base md:leading-6 md:tracking-[-0.08px]">{it.a}</p>
              </div>
            </div>
          </div>
          </div>
        );
      })}
    </div>
  );
}
