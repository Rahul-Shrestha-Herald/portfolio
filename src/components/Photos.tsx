import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";

import g1  from "@/assets/photo3.jpeg";
import g2  from "@/assets/photo5.jpeg";
import g3  from "@/assets/photo6.jpeg";
import g4  from "@/assets/chandragiri.jpeg";
import g5  from "@/assets/bouddha.jpeg";
import g6  from "@/assets/ringu.jpeg";
import g7  from "@/assets/photo2.jpeg";
import g8  from "@/assets/photo36.jpg";
import g9  from "@/assets/photo15.jpeg";
import g10 from "@/assets/photo16.jpeg";
import g11 from "@/assets/photo17.jpeg";
import g12 from "@/assets/photo18.jpeg";
import g13 from "@/assets/photo19.jpeg";
import g14 from "@/assets/photo20.jpeg";
import g15 from "@/assets/photo22.jpeg";
import g16 from "@/assets/photo37.jpg";
import g17 from "@/assets/photo24.jpeg";
import g18 from "@/assets/rupeshdai.jpeg";
import g19 from "@/assets/photo38.jpg";
import g20 from "@/assets/yug.jpeg";
import g21 from "@/assets/moon.jpeg";
import g22 from "@/assets/ot.jpeg";

export const allPhotos = [
  { src: g1,  alt: "Hands holding herbs",          caption: "Care, in small things" },
  { src: g3,  alt: "Smiling in the Himalayas",      caption: "Home — Hyolmo" },
  { src: g2,  alt: "Stethoscope on desk",           caption: "Quiet mornings" },
  { src: g6,  alt: "Butter lamps at monastery",     caption: "Devotion" },
  { src: g4,  alt: "Walking the hospital corridor", caption: "Another shift" },
  { src: g5,  alt: "Tea by the window",             caption: "Pause" },
  { src: g7,  alt: "Portrait",                      caption: "Samten" },
  { src: g8,  alt: "Photo",                         caption: "Notes from the shift" },
  { src: g9,  alt: "Photo",                         caption: "Care" },
  { src: g10, alt: "Photo",                         caption: "Devotion" },
  { src: g11, alt: "Photo",                         caption: "Pause" },
  { src: g12, alt: "Photo",                         caption: "Home" },
  { src: g13, alt: "Photo",                         caption: "Journey" },
  { src: g14, alt: "Photo",                         caption: "Wandering" },
  { src: g15, alt: "Photo",                         caption: "Stillness" },
  { src: g16, alt: "Photo",                         caption: "Light" },
  { src: g17, alt: "Photo",                         caption: "Warmth" },
  { src: g18, alt: "Rupesh dai",                    caption: "Rupesh dai" },
  { src: g19, alt: "Swimming",                      caption: "Swimming" },
  { src: g20, alt: "Yug",                           caption: "Yug" },
  { src: g21, alt: "Moon",                          caption: "Moonlight" },
  { src: g22, alt: "OT",                            caption: "Operating theatre" },
];

// Each slot has its own interval (ms) so they never sync up
const SLOT_INTERVALS = [5000, 7000, 6000, 8000, 5500, 9000];

// Each slot starts at a different photo so there's no duplication initially
const INITIAL_INDICES = [0, 1, 2, 3, 4, 5];

const PhotoSlot = ({
  slot,
  startIndex,
  interval,
  onOpen,
}: {
  slot: number;
  startIndex: number;
  interval: number;
  onOpen: (src: string, alt: string, caption: string) => void;
}) => {
  const [photoIdx, setPhotoIdx] = useState(startIndex);
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lockedHeight = useRef<number | null>(null);

  const lockHeight = () => {
    if (lockedHeight.current === null && containerRef.current) {
      const h = containerRef.current.offsetHeight;
      if (h > 0) {
        lockedHeight.current = h;
        containerRef.current.style.height = `${h}px`;
      }
    }
  };

  useEffect(() => {
    let next = (startIndex + 6) % allPhotos.length;
    const timer = setInterval(() => {
      lockHeight(); // ensure locked before swap
      const img = new Image();
      img.src = allPhotos[next].src;
      setNextIdx(next);
      setTimeout(() => {
        setPhotoIdx(next);
        setNextIdx(null);
        next = (next + 6) % allPhotos.length;
      }, 700);
    }, interval);
    return () => clearInterval(timer);
  }, [startIndex, interval]);

  const p = allPhotos[photoIdx];
  const pNext = nextIdx !== null ? allPhotos[nextIdx] : null;

  return (
    <figure
      className="relative mb-4 md:mb-6 break-inside-avoid overflow-hidden group reveal cursor-zoom-in tilt"
      style={{ transitionDelay: `${slot * 80}ms` }}
      onClick={() => onOpen(p.src, p.alt, p.caption)}
    >
      {/* Invisible spacer img — sets natural height, never changes, never shown */}
      <img
        src={p.src}
        alt=""
        aria-hidden
        draggable={false}
        onLoad={lockHeight}
        className="w-full h-auto block invisible"
      />
      {/* Actual container locked to spacer height */}
      <div ref={containerRef} className="absolute inset-0">
        {/* Current photo */}
        <img
          src={p.src}
          alt={p.alt}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06]"
          style={{
            transition: "opacity 0.7s ease, transform 0.7s ease",
            opacity: pNext ? 0 : 1,
          }}
        />
        {/* Next photo crossfades in */}
        {pNext && (
          <img
            src={pNext.src}
            alt={pNext.alt}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ animation: "fadeIn 0.7s ease forwards" }}
          />
        )}
      </div>
    </figure>
  );
};

export const Photos = () => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; caption: string } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    document.body.classList.add("no-scroll");
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <section id="photos" className="py-20 sm:py-28 md:py-36 bg-cream">
      <div className="container">
        <div className="flex items-end justify-between mb-10 md:mb-14 reveal">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-olive-deep">
            Moments, <span className="italic">framed.</span>
          </h2>
          <p className="hidden md:block max-w-xs text-sm text-muted-foreground">
            A small archive of the days at work, at home, on quiet wanders.
          </p>
        </div>

        <div className="columns-2 md:columns-3 gap-3 md:gap-6">
          {INITIAL_INDICES.map((startIdx, slot) => (
            <PhotoSlot
              key={slot}
              slot={slot}
              startIndex={startIdx}
              interval={SLOT_INTERVALS[slot]}
              onOpen={(src, alt, caption) => setLightbox({ src, alt, caption })}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12 md:mt-16 reveal">
          <button
            onClick={() => navigate("/photos")}
            className="group relative flex items-center gap-3 sm:gap-4 px-8 sm:px-10 py-3 sm:py-4 border border-olive-deep/30 text-olive-deep hover:bg-olive-deep hover:text-cream transition-all duration-500 overflow-hidden"
          >
            <span className="absolute inset-0 bg-olive-deep translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <span className="relative text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em]">View All Photos</span>
            <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-olive-deep/95 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full border border-cream/50 text-cream flex items-center justify-center hover:bg-cream/10 transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <figure
            className="max-w-5xl max-h-[85vh] animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              draggable={false}
              className="max-h-[80vh] w-auto mx-auto shadow-soft"
            />
          </figure>
        </div>
      )}
    </section>
  );
};
