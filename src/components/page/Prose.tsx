// Long text from the live site: headings get anchors, and a sticky contents list sits beside it on wide screens.
const slugify = (s: string) => s.toLowerCase().replace(/&amp;/g, "and").replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Prose({ html, rail = true }: { html: string; rail?: boolean }) {
  const toc: { id: string; text: string }[] = [];
  const body = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "");
    const base = slugify(inner) || "section";
    let id = base; let n = 2;
    while (toc.some(t => t.id === id)) id = `${base}-${n++}`;
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  const showRail = rail && toc.length >= 3;
  return (
    <div className="mx-auto flex w-full max-w-[1136px] gap-14">
      {showRail && (
        <nav aria-label="On this page" className="sticky top-28 hidden h-fit w-[220px] flex-none flex-col gap-2.5 self-start lg:flex">
          {toc.map(t => <a key={t.id} href={`#${t.id}`} className="text-sm leading-5 text-muted transition-colors duration-200 hover:text-ink">{t.text}</a>)}
        </nav>
      )}
      <div className="prose-ez min-w-0 max-w-[680px] flex-1" dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}
