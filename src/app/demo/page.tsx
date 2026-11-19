import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { crumbs, ogImage } from "@/lib/seo";
import Reveal from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/home/Nav";
import DemoSplit from "@/components/demo/DemoSplit";
import NyraChat from "@/components/home/NyraChat";

export const metadata: Metadata = { title: "Book a demo | EZRecruit", description: "A 30-minute walkthrough of EZRecruit on your own jobs, with help bringing your candidates in.", alternates: { canonical: "/demo/" },
  openGraph: { type: "website", siteName: "EZRecruit", url: "/demo/", title: "Book a demo | EZRecruit", images: ogImage("demo") } };

export default function DemoPage() {
  return (
    <>
      <JsonLd data={crumbs([["Home", "/"], ["Book a demo", "/demo/"]])} />
      <Nav base="/" />
      <main>
        <DemoSplit />
      </main>
      <NyraChat />
      <Reveal />
      <SmoothScroll />
    </>
  );
}
