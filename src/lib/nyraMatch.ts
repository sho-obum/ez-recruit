// Matches a typed question to the closest entry in Nyra's capability guide. No AI: weighted keyword overlap, rarer words count more.
export type NyraCap = { title: string; tag: string; hook: string; desc: string; prompts: string[]; happens: string; who: string; note: string };
export type NyraData = { areas: { title: string; cards: NyraCap[] }[]; cant: { cant: string; instead: string }[] };
export type NyraHit = { kind: "cap"; cap: NyraCap; area: string } | { kind: "limit"; cant: string; instead: string } | null;

const STOP = new Set("a an the is are am was be to of in on at for with and or my me i you your our we it this that these those do does did can could would will please show tell give what which who whom how when where any some all about from by as into than then so just also not no yes hi hello hey thanks thank nyra ezrecruit there here have has had want need get got make let lets us".split(" "));
// Common Hinglish words mapped to the English ones the guide uses; filler words map to nothing.
const HINGLISH: Record<string, string> = {
  kitne: "many", kitni: "many", kitna: "many", mere: "", mera: "", meri: "", mujhe: "", hain: "", hai: "", ho: "", ka: "", ki: "", ke: "", ko: "", se: "", par: "", pe: "", kar: "", karo: "", kardo: "", do: "", de: "", dena: "", kya: "", hua: "status", aaj: "today", kal: "tomorrow",
  bhejo: "send", bhej: "send", dikhao: "show", dikha: "show", batao: "", bata: "", dhundo: "find", dhoondo: "find", dhund: "find", chahiye: "find", banao: "create", bana: "create",
  naukri: "job", kaam: "job", ummeedvar: "candidate", log: "candidates", hatao: "cancel", radd: "cancel", wala: "", wale: "", aur: "", liye: "", abhi: "today", hafte: "week", mahine: "month",
};
const stem = (w: string) => (w.length > 5 && w.endsWith("ing") ? w.slice(0, -3) : w.length > 4 && w.endsWith("ed") ? w.slice(0, -2) : w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w);
const words = (s: string, hinglish = false) => s.toLowerCase().replace(/[^a-z0-9+#]+/g, " ").split(" ")
  .map(w => (hinglish && w in HINGLISH ? HINGLISH[w] : w)).filter(w => w && !STOP.has(w) && !/^(jc|jg)\d*$/.test(w) && !/^\d+$/.test(w)).map(stem);

type Doc = { weights: Map<string, number>; prompts: string[] };
const doc = (parts: [string, number][], prompts: string[] = []): Doc => {
  const weights = new Map<string, number>();
  for (const [text, w] of parts) for (const t of words(text)) weights.set(t, Math.max(weights.get(t) ?? 0, w));
  return { weights, prompts: prompts.map(p => words(p).join(" ")) };
};

export function createNyraMatcher(data: NyraData) {
  const caps = data.areas.flatMap(a => a.cards.map(cap => ({ cap, area: a.title,
    // The language card lists other cards' asks as examples, so its prompts are not indexed; it gets its own keywords instead.
    d: /hinglish/i.test(cap.title)
      ? doc([[cap.title, 3], ["language languages speak talk understand hindi hinglish english", 3], [cap.hook, 1.5], [cap.desc, 1]])
      : doc([[cap.title, 3], [cap.prompts.join(" "), 3], [cap.hook, 1.5], [cap.desc, 1], [a.title, 1]], cap.prompts) })));
  const limits = data.cant.map(l => ({ ...l, d: doc([[l.cant, 3], [l.instead, 1]]) }));
  const all = [...caps.map(c => c.d), ...limits.map(l => l.d)];
  const df = new Map<string, number>();
  for (const d of all) for (const t of d.weights.keys()) df.set(t, (df.get(t) ?? 0) + 1);
  const idf = (t: string) => Math.log(1 + all.length / (df.get(t) ?? all.length));

  const score = (q: string[], d: Doc) => {
    let s = 0, hits = 0;
    for (const t of q) { const w = d.weights.get(t); if (w) { s += w * idf(t); hits++; } }
    const joined = q.join(" ");
    if (joined && d.prompts.some(p => p === joined)) s += 20;
    return { s, hits };
  };

  return (question: string): NyraHit => {
    const q = [...new Set(words(question, true))];
    // Pricing and anything commercial goes to the team, never to a guess.
    if (!q.length || /\b(cost|costs|price|prices|pricing|plan|plans|discount|trial|buy|purchase)\b/i.test(question)) return null;
    const total = q.reduce((n, t) => n + 3 * idf(t), 0);
    const best = <T extends { d: Doc }>(list: T[]) => list.map(x => ({ x, ...score(q, x.d) })).sort((a, b) => b.s - a.s)[0];
    const c = best(caps), l = best(limits);
    // Enough of the question must be covered: a one-word ask needs that word, anything longer needs two matching words.
    const ok = (r: { s: number; hits: number }) => r.s >= 5 && r.s / total >= 0.34 && (q.length < 2 || r.hits >= 2);
    if (l && ok(l) && l.s > c.s) return { kind: "limit", cant: l.x.cant, instead: l.x.instead };
    if (c && ok(c)) return { kind: "cap", cap: c.x.cap, area: c.x.area };
    if (l && ok(l)) return { kind: "limit", cant: l.x.cant, instead: l.x.instead };
    return null;
  };
}
