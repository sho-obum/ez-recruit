import type { Post } from "@/lib/content";

// The blog cover from the home page: brand colour, two rings, a short cover line.
export function PostCover({ p, className = "h-60" }: { p: Post; className?: string }) {
  return (
    <div className={`relative flex w-full flex-col justify-between overflow-clip rounded-[28px] p-6 ${p.tone} ${className}`}>
      <span aria-hidden="true" className={`absolute -right-16 -bottom-24 size-72 rounded-full border transition-transform duration-700 ease-(--ease-out) group-hover:scale-110 ${p.ring}`} />
      <span aria-hidden="true" className={`absolute -right-4 -bottom-12 size-44 rounded-full border transition-transform duration-700 ease-(--ease-out) group-hover:scale-110 ${p.ring}`} />
      <div className="relative flex w-full items-center justify-between">
        <span className="font-mono text-[11px] leading-[14.3px] font-medium tracking-[0.44px] uppercase md:text-xs md:leading-[15.6px] md:tracking-[0.48px]">{p.category}</span>
        <span className="text-base leading-[20.8px] font-semibold tracking-[-0.5px]">EZRecruit</span>
      </div>
      <span aria-hidden="true" className="relative max-w-[280px] text-balance text-[32px] leading-[32px] font-semibold tracking-[-1.28px] transition-transform duration-500 ease-(--ease-out) group-hover:-translate-y-1">{p.cover}</span>
    </div>
  );
}

export default function PostCard({ p, n = 0 }: { p: Post; n?: number }) {
  return (
    <a href={p.href} data-reveal style={{ "--d": `${(n % 3) * 0.1}s` } as React.CSSProperties} className="group flex flex-col items-start gap-3.5">
      <PostCover p={p} />
      <div className="flex items-center gap-2 text-xs leading-[15.6px] font-medium text-muted"><span>{p.date}</span><span aria-hidden="true">·</span><span>{p.read}</span></div>
      <h3 className="text-lg leading-[22.5px] font-medium tracking-[-0.36px] md:text-xl md:leading-[25px] md:tracking-[-0.4px]">{p.title}</h3>
      <p className="line-clamp-2 text-sm leading-[20.3px] text-muted">{p.description}</p>
    </a>
  );
}
