// Big title and one line, left aligned under the fixed nav.
export default function PageHeader({ title, text, children }: { title: string; text?: string; children?: React.ReactNode }) {
  return (
    <header className="flex flex-col items-center px-5 pt-32 pb-10 md:px-6 md:pt-40 md:pb-14 lg:px-8 lg:pt-44">
      <div className="flex w-full max-w-[1136px] flex-col items-start gap-5">
        <h1 data-reveal className="max-w-[860px] text-[40px] leading-[42px] font-semibold tracking-[-1.6px] text-balance md:text-[56px] md:leading-[58.8px] md:tracking-[-2.24px] lg:text-[72px] lg:leading-[72px] lg:tracking-[-2.88px]">{title}</h1>
        {text && <p data-reveal style={{ "--d": "0.1s" } as React.CSSProperties} className="max-w-[560px] text-[17px] leading-[24.65px] text-muted md:text-lg md:leading-[26.1px] lg:text-xl lg:leading-[29px]">{text}</p>}
        {children}
      </div>
    </header>
  );
}
