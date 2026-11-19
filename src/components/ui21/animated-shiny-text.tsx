import type { CSSProperties, ReactNode } from "react";
import { cn } from "./cn";

// From 21st.dev "Animated shiny text" (dillionverma): a band of light sweeps across the text. tone picks the colours for a light or dark background.
export function AnimatedShinyText({ children, className, shimmerWidth = 100, tone = "light" }: { children: ReactNode; className?: string; shimmerWidth?: number; tone?: "light" | "dark" | "blue" }) {
  return (
    <p style={{ "--shiny-width": `${shimmerWidth}px` } as CSSProperties}
      className={cn(
        "mx-auto max-w-md",
        tone === "dark" ? "text-white/60" : tone === "blue" ? "text-blue-deep/60" : "text-neutral-600/70",
        // Shine effect
        "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%]",
        // Shine gradient
        "bg-gradient-to-r from-transparent via-50% to-transparent",
        tone === "dark" ? "via-white" : tone === "blue" ? "via-[#0b4f8a]" : "via-black/80",
        className,
      )}>
      {children}
    </p>
  );
}
