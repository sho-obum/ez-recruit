// Intro screen: only visible while <html> has the "boot" class set by the layout's inline script.
export default function Loader() {
  return (
    <div aria-hidden="true"
      className="hidden [html.boot_&]:flex fixed inset-0 z-100 flex-col items-center justify-center gap-7 bg-fill-2
        animate-[loader-out_0.6s_var(--ease-out)_1.5s_forwards]">
      <span className="grid size-11 place-items-center rounded-full bg-ink text-[17px] font-semibold tracking-[-0.5px] text-white
        animate-[mark-in_0.8s_var(--ease-out)_both]">Ez</span>
      <span className="h-[3px] w-[140px] overflow-clip rounded-full bg-[#dbdbdb] animate-[track-in_0.5s_var(--ease-out)_0.15s_both]">
        <span className="block size-full rounded-full bg-ink animate-[fill_1.1s_cubic-bezier(0.65,0,0.35,1)_0.25s_forwards]"
          style={{ transform: "translateX(-100%)" }} />
      </span>
    </div>
  );
}
