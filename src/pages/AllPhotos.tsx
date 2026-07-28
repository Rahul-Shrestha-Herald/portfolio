import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowLeft } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useMediaProtection } from "@/hooks/useMediaProtection";

import p2  from "@/assets/photo2.jpeg";
import p3  from "@/assets/photo3.jpeg";
import p5  from "@/assets/photo5.jpeg";
import p6  from "@/assets/photo6.jpeg";
import p8  from "@/assets/photo8.png";
import p13 from "@/assets/photo13.png";
import p15 from "@/assets/photo15.jpeg";
import p16 from "@/assets/photo16.jpeg";
import p17 from "@/assets/photo17.jpeg";
import p18 from "@/assets/photo18.jpeg";
import p19 from "@/assets/photo19.jpeg";
import p20 from "@/assets/photo20.jpeg";
import p22 from "@/assets/photo22.jpeg";
import p24 from "@/assets/photo24.jpeg";
import p25 from "@/assets/photo25.jpeg";
import p26 from "@/assets/photo26.jpeg";
import p28 from "@/assets/photo28.jpeg";
import p29 from "@/assets/photo29.jpeg";
import p30 from "@/assets/photo30.jpeg";
import p31 from "@/assets/photo31.jpeg";
import p32 from "@/assets/photo32.jpeg";
import p33 from "@/assets/photo33.jpeg";
import p34 from "@/assets/photo34.jpeg";
import p35 from "@/assets/photo35.jpeg";
import p36 from "@/assets/photo36.jpg";
import p37 from "@/assets/photo37.jpg";
import p38 from "@/assets/photo38.jpg";
import p39 from "@/assets/photo39.png";
import p40 from "@/assets/photo40.jpg";
import p41 from "@/assets/photo41.jpg";
import p42 from "@/assets/photo42.jpg";
import p43 from "@/assets/photo43.webp";
import p44 from "@/assets/photo44.png";
import p45 from "@/assets/photo45.jpg";
import bouddha     from "@/assets/bouddha.jpeg";
import chandragiri from "@/assets/chandragiri.jpeg";
import moon        from "@/assets/moon.jpeg";
import ot          from "@/assets/ot.jpeg";
import ringu       from "@/assets/ringu.jpeg";
import rupeshdai   from "@/assets/rupeshdai.jpeg";
import yug         from "@/assets/yug.jpeg";
// New photos
import np1  from "@/assets/1000021016.jpg";
import np2  from "@/assets/20260616_225101.jpg";
import np3  from "@/assets/FRQS0682.jpg";
import np4  from "@/assets/IMG_20260216_204025_279.webp";
import np5  from "@/assets/IMG_20260621_201818_055.webp";
import np6  from "@/assets/IMG-39c45f9d86e66ca983b43d6986744eaf-V.jpg";
import np7  from "@/assets/IMG-b8f35cc03d79040d603402dc7980fd90-V.jpg";
import np8  from "@/assets/LCOA1675.jpg";
import np9  from "@/assets/Peachy_20260424_191650917.jpg";
import np10 from "@/assets/retouch_2026051916105552.jpg";
import np11 from "@/assets/retouch_2026051916273620b.jpg";
import np12 from "@/assets/retouch_2026062101104346b.jpg";
import np13 from "@/assets/Screenshot_20260621_200620_Photos.jpg";
import np14 from "@/assets/SNOW_20230521_192120_901.jpg";
import np15 from "@/assets/TAULE4016.jpg";
import np16 from "@/assets/UCVL6095.jpg";
import np17 from "@/assets/VID_20260714_050243_358.jpg";

const photos = [
  { src: p2,          alt: "Portrait",        caption: "Samten" },
  { src: p3,          alt: "Photo",           caption: "Moments" },
  { src: p5,          alt: "Photo",           caption: "Quiet mornings" },
  { src: p6,          alt: "Photo",           caption: "At work" },
  { src: p8,          alt: "Photo",           caption: "Memories" },
  { src: p13,         alt: "Photo",           caption: "Wellbeing" },
  { src: p15,         alt: "Photo",           caption: "Care" },
  { src: p16,         alt: "Photo",           caption: "Devotion" },
  { src: p17,         alt: "Photo",           caption: "Pause" },
  { src: p18,         alt: "Photo",           caption: "Home" },
  { src: p19,         alt: "Photo",           caption: "Journey" },
  { src: p20,         alt: "Photo",           caption: "Wandering" },
  { src: p22,         alt: "Photo",           caption: "Stillness" },
  { src: p24,         alt: "Photo",           caption: "Warmth" },
  { src: p25,         alt: "Photo",           caption: "Healing" },
  { src: p26,         alt: "Photo",           caption: "Together" },
  { src: p28,         alt: "Photo",           caption: "Sunrise" },
  { src: p29,         alt: "Photo",           caption: "Dusk" },
  { src: p30,         alt: "Photo",           caption: "Mountains" },
  { src: p31,         alt: "Photo",           caption: "Village" },
  { src: p32,         alt: "Photo",           caption: "Community" },
  { src: p33,         alt: "Photo",           caption: "Hands" },
  { src: p34,         alt: "Photo",           caption: "Smiles" },
  { src: p35,         alt: "Photo",           caption: "Stories" },
  { src: p36,         alt: "Photo",           caption: "Moments" },
  { src: p37,         alt: "Photo",           caption: "Light" },
  { src: p38,         alt: "Photo",           caption: "Warmth" },
  { src: p39,         alt: "Photo",           caption: "Reflections" },
  { src: p40,         alt: "Photo",           caption: "Serenity" },
  { src: p41,         alt: "Photo",           caption: "Calm" },
  { src: p42,         alt: "Photo",           caption: "Joy" },
  { src: p43,         alt: "Photo",           caption: "Wonder" },
  { src: p44,         alt: "Photo",           caption: "Grace" },
  { src: p45,         alt: "Photo",           caption: "Serenity" },
  { src: bouddha,     alt: "Bouddha",         caption: "Bouddhanath" },
  { src: chandragiri, alt: "Chandragiri",     caption: "Chandragiri" },
  { src: moon,        alt: "Moon",            caption: "Moonlight" },
  { src: ot,          alt: "OT",              caption: "Operating theatre" },
  { src: ringu,       alt: "Ringu",           caption: "Ringu" },
  { src: rupeshdai,   alt: "Rupesh dai",      caption: "Rupesh dai" },
  { src: yug,         alt: "Yug",             caption: "Yug" },
  { src: np1,         alt: "Photo",           caption: "Memory" },
  { src: np2,         alt: "Photo",           caption: "A day" },
  { src: np3,         alt: "Photo",           caption: "Moment" },
  { src: np4,         alt: "Photo",           caption: "Captured" },
  { src: np5,         alt: "Photo",           caption: "Life" },
  { src: np6,         alt: "Photo",           caption: "Story" },
  { src: np7,         alt: "Photo",           caption: "Journey" },
  { src: np8,         alt: "Photo",           caption: "Together" },
  { src: np9,         alt: "Photo",           caption: "Peachy" },
  { src: np10,        alt: "Photo",           caption: "Glow" },
  { src: np11,        alt: "Photo",           caption: "Radiance" },
  { src: np12,        alt: "Photo",           caption: "Shine" },
  { src: np13,        alt: "Photo",           caption: "Snapshot" },
  { src: np14,        alt: "Photo",           caption: "Snow" },
  { src: np15,        alt: "Photo",           caption: "Landscape" },
  { src: np16,        alt: "Photo",           caption: "Scene" },
  { src: np17,        alt: "Photo",           caption: "Still" },
];

const AllPhotos = () => {
  const [active, setActive] = useState<number | null>(null);
  const navigate = useNavigate();
  useReveal();
  useMediaProtection();

  useEffect(() => {
    document.title = "All Photos — Samten Dolma Hyolmo";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (active === null) return;
    document.body.classList.add("no-scroll");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a === null ? a : (a + 1) % photos.length));
      if (e.key === "ArrowLeft")  setActive((a) => (a === null ? a : (a - 1 + photos.length) % photos.length));
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <main className="bg-cream min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-olive/10">
        <div className="container py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/", { replace: true })}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-olive-deep/70 hover:text-olive-deep transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <a href="/" className="font-serif text-lg italic text-olive-deep">
            Samten<span className="text-olive">.</span>
          </a>
          <span className="text-[11px] uppercase tracking-[0.3em] text-olive/60">
            {photos.length} photos
          </span>
        </div>
      </div>

      {/* Hero heading */}
      <div className="container pt-16 pb-12">
        <h1 className="font-serif text-5xl md:text-7xl text-olive-deep">
          All <span className="italic">Moments.</span>
        </h1>
      </div>

      {/* Masonry grid */}
      <div className="container pb-28">
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-5">
          {photos.map((p, i) => (
            <figure
              key={i}
              className="relative mb-4 md:mb-5 break-inside-avoid overflow-hidden group reveal cursor-zoom-in"
              style={{ transitionDelay: `${(i % 12) * 60}ms` }}
              onClick={() => setActive(i)}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                draggable={false}
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </figure>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-olive-deep/95 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full border border-cream/50 text-cream flex items-center justify-center hover:bg-cream/10 transition-colors"
            onClick={(e) => { e.stopPropagation(); setActive(null); }}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-cream/30 text-cream flex items-center justify-center hover:bg-cream/10 transition-colors"
            onClick={(e) => { e.stopPropagation(); setActive((a) => (a === null ? a : (a - 1 + photos.length) % photos.length)); }}
            aria-label="Previous"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-cream/30 text-cream flex items-center justify-center hover:bg-cream/10 transition-colors rotate-180"
            onClick={(e) => { e.stopPropagation(); setActive((a) => (a === null ? a : (a + 1) % photos.length)); }}
            aria-label="Next"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <figure
            className="max-w-5xl max-h-[85vh] animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[active].src}
              alt={photos[active].alt}
              draggable={false}
              className="max-h-[80vh] w-auto mx-auto shadow-soft"
            />
          </figure>
        </div>
      )}
    </main>
  );
};

export default AllPhotos;
