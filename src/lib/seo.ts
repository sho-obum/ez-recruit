export const SITE = "https://ezrecruit.ai";
export const abs = (path: string) => new URL(path, SITE).toString();
export const ogImage = (name: string) => [{ url: `/og/${name}.png`, width: 1200, height: 630 }];

// Breadcrumb trail for structured data: [name, path] pairs, home first.
export const crumbs = (items: [string, string][]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
});
