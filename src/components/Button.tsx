import Icon from "./Icon";

type Props = { href: string; children: string; variant?: "dark" | "light"; small?: boolean; chevron?: boolean; className?: string };

// Pill button: the label rolls up and the chevron slides through on hover.
export default function Button({ href, children, variant = "dark", small, chevron, className = "" }: Props) {
  const tone = variant === "dark" ? "bg-ink text-white hover:bg-[#262626]" : "bg-fill text-ink hover:bg-line";
  return (
    <a href={href}
      className={`roll-trigger relative inline-flex items-center justify-center gap-2 overflow-clip whitespace-nowrap rounded-full
        text-[15px] leading-[18px] font-medium tracking-[-0.15px] transition-colors duration-300 ease-(--ease-out)
        md:text-base md:leading-[19.2px] md:tracking-[-0.16px] ${small ? "px-4 py-2.5" : "px-[22px] py-3.5"} ${tone} ${className}`}>
      <span className="roll h-[18px] md:h-[19.2px]"><span>{children}</span><span aria-hidden="true">{children}</span></span>
      {chevron && <span className="icon-roll" aria-hidden="true"><Icon name="chevron" /><Icon name="chevron" /></span>}
    </a>
  );
}
