"use client";

import { openNyra } from "../home/NyraLive";

// Text link that opens Nyra's chat (same look as TextCta).
export default function AskNyraLink({ children }: { children: string }) {
  return (
    <button type="button" onClick={openNyra}
      className="cursor-pointer font-display text-[15px] font-semibold tracking-[-0.15px] text-ink underline decoration-ink/25 underline-offset-[6px] transition-colors duration-300 hover:decoration-ink">
      {children}
    </button>
  );
}
