import type { MetadataRoute } from "next";
import { EDITIONS, POST_LIST } from "@/lib/content";
import { abs } from "@/lib/seo";
import landing from "@/content/landing.json";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number][] = [["/", 1], ["/nyra/", 0.9], ["/demo/", 0.9], ...landing.map((l): [string, number] => [l.path, l.path === "/ats-for-recruitment-agencies/" ? 0.9 : 0.8]), ["/blog/", 0.8], ["/updates/", 0.6], ["/privacy-policy/", 0.2], ["/terms-and-conditions/", 0.2]];
  return [
    ...pages.map(([path, priority]) => ({ url: abs(path), lastModified: now, priority })),
    ...POST_LIST.map(p => ({ url: abs(p.href), lastModified: new Date(p.time), priority: 0.7 })),
    ...EDITIONS.map(e => ({ url: abs(`/updates/${e.slug}/`), lastModified: new Date(e.date), priority: 0.5 })),
  ];
}
