// Numbered blue badge plus a white label, shown above every section title.
export default function SectionTag({ n, label, dot = "bg-lime", className = "" }: { n: number; label: string; dot?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 text-[13px] leading-[15.6px] font-medium tracking-[-0.065px] md:text-sm md:leading-[16.8px] md:tracking-[-0.07px] ${className}`}>
      <span className="inline-flex h-[34px] items-center gap-2 rounded-lg bg-blue pr-2 pl-2.5 text-white">
        {n}
        <span aria-hidden="true" className="grid grid-cols-2 gap-[2px]">
          {[0, 1, 2, 3].map(i => <span key={i} className={`size-[7px] rounded-[2px] ${dot}`} />)}
        </span>
      </span>
      <span className="inline-flex h-[34px] items-center rounded-lg border border-line bg-white px-[13px]">{label}</span>
    </div>
  );
}
