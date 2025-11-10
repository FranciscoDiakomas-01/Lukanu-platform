"use client";
import About from "@/components/landingPage/about";
import ContatoAccordion from "@/components/landingPage/accordion";
import Benefinits from "@/components/landingPage/benefits";
import Footer from "@/components/landingPage/footer";
import Header from "@/components/landingPage/header";
import Hero from "@/components/landingPage/hero";
import Prazos from "@/components/landingPage/prazos";
import React, { useEffect } from "react";
import AOS from "aos";
import CTA from "@/components/landingPage/cta";
export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <main className="bg-[#000a10]">
      <Header />
      <Hero />
      <About />
      <Benefinits />
      <CTA />
      <Prazos />
      <ContatoAccordion />
      <Footer />
    </main>
  );
}
