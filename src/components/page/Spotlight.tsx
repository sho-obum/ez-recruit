import type { Edition } from "@/lib/content";

// The edition's headline change, on the same sky panel with a frosted card as the home page steps.
export default function Spotlight({ s }: { s: NonNullable<Edition["spotlight"]> }) {
  return (
    <div className="relative overflow-clip rounded-[28px] bg-[linear-gradient(125deg,#d8efff_0%,#9fd8ff_38%,#c9ebff_58%,#62bdf6_100%)] p-4 md:p-6">
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_75%_30%,rgba(255,255,255,0.75),transparent_70%),radial-gradient(50%_35%_at_15%_75%,rgba(255,255,255,0.55),transparent_70%)]" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.55)_0_1px,transparent_1px_3px)] opacity-60" />
      <div className="relative rounded-[18px] bg-white/80 p-5 backdrop-blur-[10px] md:p-6">
        <h3 className="text-lg leading-[24px] font-medium tracking-[-0.36px] md:text-xl md:leading-[26px]">{s.title}</h3>
        <p className="mt-2 text-[15px] leading-[23px] text-muted md:text-base md:leading-6">{s.body}</p>
        {s.for && <p className="mt-3 text-sm leading-5 text-faint">{s.for}</p>}
      </div>
    </div>
  );
}
