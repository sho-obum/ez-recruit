"use client";

import { useState } from "react";
import Icon from "../Icon";
import { RISE, SplitCopy, TRIGGER, from } from "./Nyra";
import TextCta from "../TextCta";
import NyraWindowChat, { SCENES } from "./NyraWindowChat";

type Copy = { title: string; body: string; points: string[]; link?: { label: string; href: string } };

// Pick a job on the left; the chat on the right replays it and ends in the result.
export default function NyraDemo({ copy }: { copy: Copy }) {
  const [on, setOn] = useState(0);
  return (
    <div className="flex w-full max-w-[1136px] flex-col gap-8 md:gap-10 lg:flex-row lg:items-center lg:gap-16">
      <SplitCopy {...copy}>
        <div className={`flex w-full flex-col gap-1.5 ${RISE}`} style={from("translateY(14px)", 0.5)}>
          {SCENES.map((s, i) => (
            <button key={s.title} type="button" aria-pressed={on === i} onClick={() => setOn(i)}
              className={`flex w-full cursor-pointer items-center gap-3.5 rounded-2xl p-3 text-left transition-colors duration-300
                ${on === i ? "bg-blue-soft shadow-[inset_0_0_0_1px_#bfe3ff]" : "hover:bg-fill-2"}`}>
              <span className={`grid size-10 flex-none place-items-center rounded-full transition-colors duration-300 ${on === i ? "bg-white text-blue-deep" : "bg-fill-2 text-muted"}`}>
                <Icon name={s.icon} size={17} />
              </span>
              <span className="flex flex-col">
                <span className="text-base leading-6 font-medium tracking-[-0.1px]">{s.title}</span>
                <span className="text-sm leading-5 text-muted">{s.text}</span>
              </span>
            </button>
          ))}
        </div>
        <div className={RISE} style={from("translateY(14px)", 0.7)}><TextCta href="/demo/">Book a demo</TextCta></div>
      </SplitCopy>

      <div data-reveal style={TRIGGER} className="w-full lg:w-[606px] lg:flex-none">
        {/* Calm sky-blue panel with fine hatching behind the chat window. */}
        <div className={`relative overflow-clip rounded-[40px] bg-[linear-gradient(125deg,#d8efff_0%,#9fd8ff_38%,#c9ebff_58%,#62bdf6_100%)] px-4 py-6 md:px-6 md:py-12 ${RISE}`} style={from("translateY(40px) scale(0.97)")}>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_75%_30%,rgba(255,255,255,0.75),transparent_70%),radial-gradient(50%_35%_at_15%_75%,rgba(255,255,255,0.55),transparent_70%)]" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.55)_0_1px,transparent_1px_3px)] opacity-60" />
          <div className="relative"><NyraWindowChat key={on} scene={on} /></div>
        </div>
      </div>
    </div>
  );
}
