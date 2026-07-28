import { useEffect } from "react";
import { WelcomePopup } from "@/components/WelcomePopup";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Photos } from "@/components/Photos";
import { Videos } from "@/components/Videos";
import { Music } from "@/components/Music";
import { Journal } from "@/components/Journal";
import { Contact } from "@/components/Contact";
import { useReveal } from "@/hooks/useReveal";
import { useMediaProtection } from "@/hooks/useMediaProtection";

const Index = () => {
  useReveal();
  useMediaProtection();

  useEffect(() => {
    document.title = "Samten Dolma Hyolmo — Nurse & Caregiver";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'description');
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute('content', 'Portfolio of Samten Dolma Hyolmo a nurse and caregiver from the Himalayas. Stories of compassion, care, and quiet devotion.');
  }, []);

  return (
    <main className="bg-background overflow-x-hidden">
      <WelcomePopup />
      <Nav />
      <Hero />
      <About />
      <Photos />
      <Videos />
      <Music />
      {/* <Journal /> */}
      <Contact />
    </main>
  );
};

export default Index;
