import Reveal from "../Reveal";
import SmoothScroll from "../SmoothScroll";
import Nav from "../home/Nav";
import Footer from "../home/Footer";
import NyraChat from "../home/NyraChat";
import JsonLd from "../JsonLd";
import { crumbs } from "@/lib/seo";

// Every inner page: the same nav, footer, Nyra chat, scroll reveals and smooth scroll as the home page.
export default function PageShell({ children, cta = true, trail }: { children: React.ReactNode; cta?: boolean; trail?: [string, string][] }) {
  return (
    <>
      {trail && <JsonLd data={crumbs([["Home", "/"], ...trail])} />}
      <Nav base="/" />
      <main>{children}</main>
      <Footer base="/" cta={cta} />
      <NyraChat />
      <Reveal />
      <SmoothScroll />
    </>
  );
}
