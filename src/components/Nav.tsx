import { useEffect, useState } from "react";
import { Menu, X, Gamepad2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const links = [
  { id: "about",   label: "About",   href: "/#about" },
  { id: "photos",  label: "Photos",  href: "/#photos" },
  { id: "videos",  label: "Videos",  href: "/#videos" },
  { id: "music",   label: "Music",   href: "/#music" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onGamesPage = location.pathname.startsWith("/games");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled || menuOpen ? "bg-cream/95 backdrop-blur-md border-b border-olive/10 py-3" : "py-5 md:py-6"
        }`}
      >
        <div className="container flex items-center justify-between">
          <a href="/#top" className="font-serif text-lg italic text-olive-deep" onClick={close}>
            Samten<span className="text-olive">.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.href}
                className="text-[11px] uppercase tracking-[0.25em] text-olive-deep/70 hover:text-olive-deep transition-colors"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => navigate("/games")}
              className={`flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] transition-colors px-3 py-1.5 rounded-full border ${
                onGamesPage
                  ? "bg-olive-deep text-cream border-olive-deep"
                  : "text-olive-deep/70 hover:text-olive-deep border-olive-deep/20 hover:border-olive-deep/60"
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" /> Games
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="/#contact"
              className="hidden md:inline-block text-[11px] uppercase tracking-[0.25em] border-b border-olive-deep/40 text-olive-deep hover:border-olive-deep transition-colors"
            >
              Get in touch
            </a>
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center text-olive-deep"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-cream pt-20 px-6 flex flex-col gap-6 animate-fade-in md:hidden overflow-y-auto">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              onClick={close}
              className="font-serif text-3xl italic text-olive-deep border-b border-olive/10 pb-4"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { close(); navigate("/games"); }}
            className="flex items-center gap-3 font-serif text-3xl italic text-olive-deep border-b border-olive/10 pb-4 text-left"
          >
            <Gamepad2 className="w-6 h-6" /> Games
          </button>
          <a
            href="/#contact"
            onClick={close}
            className="mt-4 text-[11px] uppercase tracking-[0.3em] text-olive-deep border-b border-olive-deep/40 w-fit"
          >
            Get in touch
          </a>
        </div>
      )}
    </>
  );
};
