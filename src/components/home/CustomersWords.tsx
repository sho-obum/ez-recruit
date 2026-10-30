// Blur-in words like the Hero title, but held until the heading scrolls into view (Reveal adds .is-in).
export default function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span data-reveal className={`reveal-words [html.js_&:not(.is-in)>span]:[animation-play-state:paused] ${className}`}
      style={{ "--boot": "0s", translate: "none" } as React.CSSProperties}>
      {text.split(" ").map((w, n) => (
        <span key={n} className="mr-[0.24em] last:mr-0" style={{ "--i": n } as React.CSSProperties}>{w}</span>
      ))}
    </span>
  );
}
