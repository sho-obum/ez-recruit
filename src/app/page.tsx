import Reveal from "@/components/Reveal";
import Loader from "@/components/home/Loader";
import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import Platform from "@/components/home/Platform";
import Suite from "@/components/home/Suite";
import Nyra from "@/components/home/Nyra";
import Rework from "@/components/home/Rework";
import Regions from "@/components/home/Regions";
import Tour from "@/components/home/Tour";
import Roles from "@/components/home/Roles";
import Customers from "@/components/home/Customers";
import Posts from "@/components/home/Posts";
import Faq from "@/components/home/Faq";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";
import NyraChat from "@/components/home/NyraChat";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Nyra />
        <Platform />
        <Suite />
        <Rework />
        <Regions />
        <Tour />
        <Roles />
        <Customers />
        <Posts />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <NyraChat />
      <Reveal />
    </>
  );
}
