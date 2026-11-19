import Icon from "./Icon";

// The 21st.dev "Motion button" (Shatlyk1011), in blue, at 75% of its original size: the arrow circle grows to fill the pill on hover.
export default function TalkButton({ href = "/demo/", children = "Talk to us" }: { href?: string; children?: string }) {
  return (
    <a href={href} className="group relative block h-[42px] w-[150px] rounded-full bg-white p-[3px] shadow-[inset_0_0_0_1px_var(--color-line)]">
      <span aria-hidden="true" className="block size-9 rounded-full bg-blue-deep duration-500 group-hover:w-full" />
      <span aria-hidden="true" className="absolute top-1/2 left-3 -translate-y-1/2 text-white duration-500 group-hover:translate-x-[0.3rem]">
        <Icon name="arrow" size={17} />
      </span>
      <span className="absolute top-1/2 left-1/2 ml-3 -translate-x-1/2 -translate-y-1/2 font-display text-[13.5px] font-medium tracking-tight whitespace-nowrap text-ink duration-500 group-hover:text-white">
        {children}
      </span>
    </a>
  );
}
