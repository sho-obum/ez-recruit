import Icon, { type IconName } from "../Icon";

// Each folder holds three paper sheets that peek over the front panel and lift on hover.
type Sheet = "jd" | "cv" | "sheet" | "offer";
type Folder = { title: string; caption: string; href: string; dot: string; ink: string; icon: IconName; sheet: Sheet };
const FOLDERS: Folder[] = [
  { title: "Requirements", caption: "Structured briefs", href: "#platform", dot: "bg-blue", ink: "text-blue", icon: "file", sheet: "jd" },
  { title: "Sourcing", caption: "Your own database", href: "#platform", dot: "bg-violet", ink: "text-violet", icon: "database", sheet: "cv" },
  { title: "Tracker", caption: "Client-ready trackers", href: "#tour", dot: "bg-orange", ink: "text-orange", icon: "table", sheet: "sheet" },
  { title: "Closures", caption: "Offer to joining", href: "#tour", dot: "bg-green", ink: "text-green", icon: "handshake", sheet: "offer" },
];
const AVATARS = ["bg-[#ffd6a8]", "bg-[#c9dcff]", "bg-[#d8f5c4]"];

// Resting and hover placement per sheet; phone sizes are relative to the narrower folder.
const PAPER = [
  "left-[6%] top-[21px] w-[47%] h-[94px] md:left-5 md:top-[38px] md:w-[132px] md:h-[154px] -rotate-9 group-hover:-translate-x-1.5 group-hover:-translate-y-4 group-hover:-rotate-12",
  "left-[27%] top-[15px] w-[42%] h-[86px] md:left-[74px] md:top-7 md:w-[117px] md:h-[142px] rotate-2 group-hover:-translate-y-[22px]",
  "left-[41%] top-[21px] w-[47%] h-[94px] md:left-28 md:top-[38px] md:w-[132px] md:h-[154px] rotate-9 group-hover:translate-x-1.5 group-hover:-translate-y-4 group-hover:rotate-12",
];
const LINE = "block h-1 rounded md:h-[5px]";

function Paper({ kind, n }: { kind: Sheet; n: number }) {
  return (
    <span className={`absolute flex flex-col gap-[5px] overflow-clip rounded-[10px] bg-white px-2 py-2.5 md:gap-[7px] md:rounded-[14px] md:px-3 md:py-3.5
      shadow-[0_8px_18px_-8px_rgba(20,20,20,0.35),0_0_0_1px_rgba(20,20,20,0.04)] transition-[translate,rotate] duration-500 ease-(--ease-out) ${PAPER[n]}`}>
      {kind === "cv" && <span className={`block size-[18px] rounded-full md:size-[26px] ${AVATARS[n]}`} />}
      {kind === "sheet" && <span className={`-mx-2 -mt-2.5 mb-0.5 block h-3 border-b md:-mx-3 md:-mt-3.5 md:h-4 ${n === 1 ? "border-[#cbdcff] bg-[#e2ecff]" : "border-[#b9ebcb] bg-[#d3f5df]"}`} />}
      {kind === "jd" && <span className={`block h-3.5 w-[34px] rounded-md ${n === 1 ? "bg-ink" : "bg-blue"}`} />}
      {kind === "offer" && <span className={`block size-[22px] rounded-full ${n === 1 ? "bg-[#ffe1cf] shadow-[inset_0_0_0_4px_#ffc8a6]" : "bg-lime shadow-[inset_0_0_0_4px_#b8e600]"}`} />}
      <span className={`${LINE} w-[64%] bg-[#d6d6d6]`} />
      <span className={`${LINE} w-[82%] bg-line`} />
      <span className={`${LINE} w-[48%] bg-line`} />
    </span>
  );
}

export default function Products() {
  return (
    <div data-section="Products"
      className="relative z-1 grid w-full max-w-[1136px] grid-cols-2 gap-x-3 gap-y-5 md:flex md:flex-wrap md:items-start md:justify-center md:gap-x-6 md:gap-y-2">
      {FOLDERS.map(f => (
        <a key={f.title} href={f.href} className="group flex flex-col items-center gap-2.5 pt-[30px] md:w-[264px] md:gap-3.5 md:pt-12">
          <span aria-hidden="true" className="relative block h-[132px] w-full md:h-[220px]">
            <span className="absolute inset-x-0 top-6 h-[108px] rounded-2xl bg-fill md:top-11 md:h-[176px] md:rounded-3xl">
              <span className="absolute top-[-10px] left-3 h-7 w-[60px] rounded-[9px] bg-fill md:top-[-14px] md:left-[18px] md:h-10 md:w-24 md:rounded-xl" />
            </span>
            {[0, 1, 2].map(n => <Paper key={n} kind={f.sheet} n={n} />)}
            <span className="absolute inset-x-0 top-10 h-[92px] rounded-2xl bg-[linear-gradient(rgba(255,255,255,0.96)_0%,rgba(250,250,250,0.92)_100%)] backdrop-blur-[24px]
              shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_12px_28px_-14px_rgba(20,20,20,0.22)] md:top-[70px] md:h-[150px] md:rounded-3xl">
              <span className="absolute top-3 left-3 grid h-10 w-[35px] -rotate-8 place-items-center rounded-md bg-white outline-[1.5px] -outline-offset-4 outline-dashed outline-[#d6d6d6]
                shadow-[0_4px_10px_-4px_rgba(20,20,20,0.2)] md:top-[19px] md:left-[19px] md:h-[58px] md:w-[51px]">
                <span className={`size-3.5 rounded-full md:size-5 ${f.dot}`} />
              </span>
              <span className={`absolute top-4 right-[11px] grid size-[41px] rotate-8 place-items-center rounded-[11px] bg-white shadow-[0_6px_14px_-6px_rgba(20,20,20,0.25)]
                md:top-[27px] md:right-4 md:size-[59px] md:rounded-[15px] [&>svg]:size-5 md:[&>svg]:size-[29px] ${f.ink}`}>
                <Icon name={f.icon} size={29} stroke={1.8} />
              </span>
              <span className="absolute inset-x-3 top-[72px] h-px bg-line md:inset-x-5 md:top-[119px]" />
              <span className="absolute inset-x-3 top-[78px] h-px bg-line md:inset-x-5 md:top-[127px]" />
            </span>
          </span>
          <h4 className="text-center text-lg leading-[23px] font-medium tracking-[-0.36px] md:text-xl md:leading-[25px] md:tracking-[-0.4px]">{f.title}</h4>
          <span className="rounded-full bg-fill px-2.5 py-[5px] text-center text-[13px] leading-[18px] font-medium tracking-[-0.14px] text-muted md:px-3 md:text-sm md:leading-[18.2px]">
            {f.caption}
          </span>
        </a>
      ))}
    </div>
  );
}
