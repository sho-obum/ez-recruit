import Reveal from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import Steps from "@/components/home/Steps";
import Security from "@/components/home/Security";
import Stats from "@/components/home/Stats";
import Platform from "@/components/home/Platform";
import Suite from "@/components/home/Suite";
import Nyra from "@/components/home/Nyra";
import Rework from "@/components/home/Rework";
import Regions from "@/components/home/Regions";
import Tour from "@/components/home/Tour";
import Customers from "@/components/home/Customers";
import Posts from "@/components/home/Posts";
import Faq, { FAQS } from "@/components/home/Faq";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/seo";
import Footer from "@/components/home/Footer";
import NyraChat from "@/components/home/NyraChat";

export default function Home() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "EZRecruit", url: SITE, applicationCategory: "BusinessApplication", operatingSystem: "Web",
        description: "An ATS and operating system for recruitment and staffing agencies: jobs, candidates, client trackers, interviews, closures and Nyra, the AI assistant." }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <Nav />
      <main>
        <Hero />
        <Steps />
        <Customers />
        <Platform />
        <Suite />
        <Nyra />
        <Tour />
        <Rework />
        <Regions />
        <Security />
        <Stats />
        <Posts />
        <Faq />
      </main>
      <Footer />
      <NyraChat />
      <Reveal />
      <SmoothScroll />
    </>
  );
}
