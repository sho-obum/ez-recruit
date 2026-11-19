// Nyra's mark from the product: an N that draws itself in one stroke, ending in a small plus-shaped spark.
export default function NyraMark({ size = 18, once, className = "" }: { size?: number; once?: boolean; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={size <= 16 ? 2.2 : 1.8}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`nyra-mark flex-none ${once ? "nyra-mark-once" : ""} ${className}`}>
      <path className="nyra-mark-n" pathLength={60} d="M5 19V6.5a1.5 1.5 0 0 1 2.7-.9l7.6 10.8a1.5 1.5 0 0 0 2.7-.9V9" />
      <path className="nyra-mark-spark" d="M19 2.5v3M17.5 4h3" />
    </svg>
  );
}
