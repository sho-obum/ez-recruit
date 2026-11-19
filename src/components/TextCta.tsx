// Text call to action: an underlined label, the site's CTA style everywhere outside Nyra.
export default function TextCta({ href, children, tone = "light", className = "" }: { href: string; children: string; tone?: "light" | "dark"; className?: string }) {
  const c = tone === "dark" ? "text-white/80 decoration-white/30 hover:text-white hover:decoration-white" : "text-ink decoration-ink/25 hover:decoration-ink";
  return (
    <a href={href} className={`font-display text-[15px] font-semibold tracking-[-0.15px] underline underline-offset-[6px] transition-colors duration-300 ${c} ${className}`}>
      {children}
    </a>
  );
}
