import { useEffect, useState } from "react";
import hero1 from "@/assets/photo37.jpg";
import hero2 from "@/assets/ot.jpeg";
import { useParallax } from "@/hooks/useParallax";

const heroPhotos = [hero1, hero2];

export const Hero = () => {
  const imgRef = useParallax<HTMLDivElement>(0.18);
  const textRef = useParallax<HTMLDivElement>(-0.08);
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % heroPhotos.length);
        setFading(false);
      }, 600);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden bg-cream">
      <div ref={imgRef} className="absolute inset-0 scale-110">
        <img
          src={heroPhotos[current]}
          alt="Portrait of Samten Dolma Hyolmo, nurse"
          className={`absolute inset-0 w-full h-full object-cover object-top sm:object-center transition-opacity duration-700 ${fading ? "opacity-0" : "opacity-100"}`}
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/80 via-olive-deep/20 to-cream/30" />
      </div>

      {/* Top label */}
      <div className="relative z-10 container pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        <div className="flex items-center justify-between text-cream/85 text-[10px] uppercase tracking-[0.4em] animate-fade-in">
          <span className="hidden sm:block">Est. {new Date().getFullYear()}</span>
        </div>
      </div>

      {/* Center title */}
      <div ref={textRef} className="relative z-10 container mt-[12vh] sm:mt-[15vh] md:mt-[18vh] lg:mt-[22vh]">
        <div className="max-w-5xl px-2 sm:px-0">
          <p className="text-cream/85 text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.5em] mb-4 sm:mb-6 animate-fade-up">
            Registered Nurse
          </p>
          <h1
            className="font-serif text-cream text-[11vw] sm:text-[12vw] md:text-[9vw] lg:text-[8vw] xl:text-[7vw] leading-[0.9] tracking-tight animate-fade-up drop-shadow-[0_4px_30px_rgba(0,0,0,0.35)]"
            style={{ animationDelay: "0.25s" }}
          >
            Samten<br />
            <span className="italic font-light">Dolma</span> Hyolmo
          </h1>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <div className="container pb-8 md:pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 text-cream">
          <p
            className="font-serif italic text-base sm:text-lg md:text-xl max-w-xs sm:max-w-sm leading-snug animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            "Healing with kindness, in care that feels like home."
          </p>
          <div className="flex items-end gap-6 animate-fade-up" style={{ animationDelay: "0.65s" }}>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.3em] text-cream/70 mb-1">Scroll</div>
              <div className="w-px h-10 md:h-12 bg-cream/60 ml-auto animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
