// Tiny class joiner for the 21st.dev components (strings, falsy values and { class: boolean } maps).
type Arg = string | false | null | undefined | Record<string, boolean | undefined>;
export const cn = (...args: Arg[]) =>
  args.flatMap(a => (!a ? [] : typeof a === "string" ? [a] : Object.keys(a).filter(k => a[k]))).join(" ");
