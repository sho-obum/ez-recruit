import Icon from "./Icon";

type Props = { href: string; children: string; variant?: "dark" | "light"; small?: boolean; chevron?: boolean; className?: string };

// Pill button. Main action: a dot grows to fill the pill on hover and an arrow slides in. Light: quiet outline.
export default function Button({ href, children, variant = "dark", small, chevron, className = "" }: Props) {
  const size = `text-[15px] leading-[18px] font-medium tracking-[-0.15px] md:text-base md:leading-[19.2px] md:tracking-[-0.16px] ${small ? "px-4 py-2.5" : "px-[22px] py-3.5"}`;
  if (variant === "dark") return (
    <a href={href} className={`group relative inline-flex items-center justify-center overflow-clip whitespace-nowrap rounded-full bg-blue-soft text-blue-deep
      shadow-[inset_0_0_0_1px_#bfe3ff] ${size} ${className}`}>
      <span aria-hidden="true" className="absolute top-1/2 left-[18px] size-2 -translate-y-1/2 rounded-full bg-blue-deep transition-transform duration-500 ease-(--ease-out) group-hover:scale-[70]" />
      <span className="relative ml-4 transition-[translate,color] duration-500 ease-(--ease-out) group-hover:-translate-x-4 group-hover:text-white">{children}</span>
      <Icon name="arrow" size={15} className="absolute top-1/2 right-[18px] -translate-x-3 -translate-y-1/2 text-white opacity-0 transition-[translate,opacity] duration-500 ease-(--ease-out) group-hover:translate-x-0 group-hover:opacity-100" />
    </a>
  );
  return (
    <a href={href}
      className={`roll-trigger relative inline-flex items-center justify-center gap-2 overflow-clip whitespace-nowrap rounded-full text-ink-2
        shadow-[inset_0_0_0_1px_var(--color-line)] transition-colors duration-300 ease-(--ease-out) hover:bg-fill-2 hover:text-ink ${size} ${className}`}>
      <span className="roll h-[18px] md:h-[19.2px]"><span>{children}</span><span aria-hidden="true">{children}</span></span>
      {chevron && <span className="icon-roll" aria-hidden="true"><Icon name="chevron" /><Icon name="chevron" /></span>}
    </a>
  );
}
