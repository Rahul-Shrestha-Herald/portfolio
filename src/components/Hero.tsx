import { useEffect, useState } from "react";
import hero1 from "@/assets/photo35.jpeg";
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
          width={1080}
          height={1920}
          className={`w-full h-full object-cover object-top sm:object-center transition-opacity duration-700 ${fading ? "opacity-0" : "opacity-100"}`}
          draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/80 via-olive-deep/20 to-cream/30" />
      </div>

      {/* Top label */}
      <div className="relative z-10 container pt-32 md:pt-36">
        <div className="flex items-center justify-between text-cream/85 text-[10px] uppercase tracking-[0.4em] animate-fade-in">
          <span className="hidden sm:block">Est. {new Date().getFullYear()}</span>
        </div>
      </div>

      {/* Center title with parallax */}
      <div ref={textRef} className="relative z-10 container mt-[15vh] sm:mt-[18vh] md:mt-[22vh]">
        <div className="max-w-5xl">
          <p className="text-cream/85 text-xs uppercase tracking-[0.5em] mb-6 animate-fade-up">
            Nurse  ·  Caregiver
          </p>
          <h1
            className="font-serif text-cream text-[12vw] sm:text-[13vw] md:text-[10vw] leading-[0.9] tracking-tight animate-fade-up drop-shadow-[0_4px_30px_rgba(0,0,0,0.35)]"
            style={{ animationDelay: "0.25s" }}
          >
            Samten<br />
            <span className="italic font-light">Dolma</span> Hyolmo
          </h1>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <div className="container pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-cream">
          <p
            className="font-serif italic text-lg md:text-xl max-w-sm leading-snug animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            "Healing with kindness, in care that feels like home."
          </p>
          <div
            className="flex items-end gap-6 animate-fade-up"
            style={{ animationDelay: "0.65s" }}
          >
            <div className="hidden sm:block">
              {/* QR code hidden
              <div className="w-20 h-20 bg-cream p-1.5">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://yourwebsite.com&color=3b4a2a&bgcolor=f5efe0"
                  alt="QR code to portfolio"
                  className="w-full h-full"
                  draggable={false}
                />
              </div>
              <p className="text-[9px] uppercase tracking-[0.3em] mt-2 text-cream/70">Scan to share</p>
              */}
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.3em] text-cream/70 mb-1">Scroll</div>
              <div className="w-px h-12 bg-cream/60 ml-auto animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
