"use client";

import { useMemo, useState } from "react";
import nyra from "@/content/nyra.json";
import Icon from "../Icon";

type Cap = (typeof nyra.areas)[number]["cards"][number] & { area: string };
const AREAS = nyra.areas;
const ALL: Cap[] = AREAS.flatMap(a => a.cards.map(c => ({ ...c, area: a.title })));
const TOTAL = ALL.length, ACTIONS = ALL.filter(c => c.tag === "Action").length;

function Card({ c, showArea }: { c: Cap; showArea: boolean }) {
  return (
    <article className="flex flex-col gap-3 rounded-[24px] border border-line bg-white p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[17px] leading-6 font-medium tracking-[-0.2px]">{c.title}</h3>
        {c.tag && <span className={`mt-0.5 flex-none rounded-full px-2.5 py-0.5 text-xs leading-5 font-medium ${c.tag === "Action" ? "bg-blue-soft text-blue-deep" : "bg-fill-2 text-muted"}`}>{c.tag}</span>}
      </div>
      {showArea && <p className="text-xs leading-4 text-faint">{c.area}</p>}
      <p className="text-[15px] leading-[22px] text-blue-deep">{c.hook || c.desc}</p>
      {c.prompts.length > 0 && (
        <ul className="flex flex-col gap-1 text-sm leading-5 text-ink-2">
          {c.prompts.slice(0, 3).map(p => <li key={p}>{p}</li>)}
        </ul>
      )}
      <details className="group mt-auto text-sm leading-[21px] text-muted">
        <summary className="flex w-fit cursor-pointer list-none items-center gap-1 font-medium text-ink [&::-webkit-details-marker]:hidden">
          Details <Icon name="chevron" size={13} className="rotate-90 transition-transform duration-300 group-open:-rotate-90" />
        </summary>
        <div className="flex flex-col gap-2 pt-3">
          {c.hook && c.desc && <p>{c.desc}</p>}
          {c.happens && <p><span className="font-medium text-ink">What happens: </span>{c.happens}</p>}
          {c.who && <p><span className="font-medium text-ink">Who: </span>{c.who}</p>}
          {c.note && <p><span className="font-medium text-ink">Good to know: </span>{c.note}</p>}
        </div>
      </details>
    </article>
  );
}

// The whole capability guide: 13 areas to browse, or one search across everything.
export default function NyraCapabilities() {
  const [area, setArea] = useState(0);
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const found = useMemo(() => (query ? ALL.filter(c => [c.title, c.hook, c.desc, c.area, ...c.prompts].join(" ").toLowerCase().includes(query)) : []), [query]);
  const list: Cap[] = query ? found : AREAS[area].cards.map(c => ({ ...c, area: AREAS[area].title }));

  return (
    <section id="capabilities" className="flex scroll-mt-20 flex-col items-center px-5 py-18 md:px-6 md:py-24 lg:px-8 lg:py-32">
      <div className="flex w-full max-w-[1136px] flex-col gap-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-12">
          <h2 data-reveal className="text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px] md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px] lg:flex-1 lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">
            Everything Nyra can do.
          </h2>
          <p data-reveal style={{ "--d": "0.1s" } as React.CSSProperties} className="text-[17px] leading-[24.65px] text-muted md:text-lg md:leading-[26.1px] lg:w-[400px]">
            {TOTAL} capabilities across {AREAS.length} areas, including {ACTIONS} actions that change data. Each one is previewed and confirmed first.
          </p>
        </div>

        <label className="flex h-14 w-full items-center gap-3 rounded-full bg-fill-2 px-5 shadow-[inset_0_0_0_1px_var(--color-line)] focus-within:shadow-[inset_0_0_0_1.5px_var(--color-blue)] md:max-w-[520px]">
          <Icon name="search" size={18} className="flex-none text-muted" />
          <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search: interview, offer, tracker, Hinglish…" aria-label="Search Nyra's capabilities"
            className="h-full w-full bg-transparent text-base text-ink outline-none placeholder:text-faint [&::-webkit-search-cancel-button]:hidden" />
          {query && <span className="flex-none text-sm text-muted tabular-nums">{found.length}</span>}
        </label>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
          <nav aria-label="Capability areas" className={`flex gap-1 overflow-x-auto pb-1 lg:sticky lg:top-24 lg:h-fit lg:w-[240px] lg:flex-none lg:flex-col lg:overflow-visible lg:pb-0 ${query ? "opacity-40" : ""}`}>
            {AREAS.map((a, i) => (
              <button key={a.id} type="button" aria-pressed={!query && area === i} onClick={() => { setArea(i); setQ(""); }}
                className={`flex flex-none cursor-pointer items-center justify-between gap-3 rounded-full px-4 py-2 text-left text-sm leading-5 whitespace-nowrap transition-colors duration-200
                  ${!query && area === i ? "bg-blue-soft font-medium text-blue-deep shadow-[inset_0_0_0_1px_#bfe3ff]" : "text-ink-2 hover:bg-fill-2"}`}>
                {a.title}<span className="text-xs text-faint tabular-nums">{a.cards.length}</span>
              </button>
            ))}
          </nav>

          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {!query && <p className="text-lg leading-[26px] text-muted">{AREAS[area].text}</p>}
            {query && found.length === 0 && <p className="text-lg leading-[26px] text-muted">Nothing matches &ldquo;{q.trim()}&rdquo;. Try another word, or check the limits below.</p>}
            <div className="grid gap-4 md:grid-cols-2">
              {list.map(c => <Card key={c.area + c.title} c={c} showArea={!!query} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
