import { useEffect, useState } from "react";

const links = [
  { id: "about", label: "About" },
  { id: "photos", label: "Photos" },
  { id: "videos", label: "Videos" },
  { id: "music", label: "Music" },
  { id: "showcase", label: "Showcase" },
  { id: "contact", label: "Contact" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-cream/85 backdrop-blur-md border-b border-olive/10 py-3" : "py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#top" className="font-serif text-lg italic text-olive-deep">
          Samten<span className="text-olive">.</span>
        </a>
        <nav className="hidden md:flex gap-8">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-[11px] uppercase tracking-[0.25em] text-olive-deep/70 hover:text-olive-deep transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="text-[11px] uppercase tracking-[0.25em] border-b border-olive-deep/40 text-olive-deep hover:border-olive-deep transition-colors"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
};
