import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play, X, ArrowLeft } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useMediaProtection } from "@/hooks/useMediaProtection";

import vid1  from "@/assets/video1.mov";
import vid2  from "@/assets/video2.mp4";
import vid4  from "@/assets/video4.mov";
import vid7  from "@/assets/video7.mp4";
import vid9  from "@/assets/video9.mp4";
import vid10 from "@/assets/video10.mp4";
import vid12 from "@/assets/video12.mp4";
import vid14 from "@/assets/video14.mp4";
import vid15 from "@/assets/video15.mp4";

const videos = [
  { src: vid1,  url: null },
  { src: vid2,  url: null },
  { src: vid4,  url: null },
  { src: vid7,  url: null },
  { src: vid9,  url: null },
  { src: vid10, url: null },
  { src: vid12, url: null },
  { src: vid14, url: null },
  { src: vid15, url: null },
];

const AllVideos = () => {
  const [active, setActive] = useState<number | null>(null);
  const navigate = useNavigate();
  const previewRefs = useRef<(HTMLVideoElement | null)[]>([]);
  useReveal();
  useMediaProtection();

  useEffect(() => {
    document.title = "All Videos — Samten Dolma Hyolmo";
    window.scrollTo(0, 0);
  }, []);

  const onEnter = (i: number) => {
    const el = previewRefs.current[i];
    if (el) { el.currentTime = 0; el.play().catch(() => {}); }
  };
  const onLeave = (i: number) => {
    const el = previewRefs.current[i];
    if (el) { el.pause(); el.currentTime = 0; }
  };

  const handleClick = (i: number) => {
    const v = videos[i];
    if (v.url) window.open(v.url, "_blank", "noopener,noreferrer");
    else setActive(i);
  };

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-olive/10">
        <div className="container py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-olive-deep/70 hover:text-olive-deep transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <a href="/" className="font-serif text-lg italic text-olive-deep">
            Samten<span className="text-olive">.</span>
          </a>
          <span className="text-[11px] uppercase tracking-[0.3em] text-olive/60">
            {videos.length} videos
          </span>
        </div>
      </div>

      {/* Hero heading */}
      <div className="container pt-16 pb-12">
        <h1 className="font-serif text-5xl md:text-7xl text-olive-deep">
          All <span className="italic">Motion.</span>
        </h1>
      </div>

      {/* Grid */}
      <div className="container pb-28">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 protected">
          {videos.map((v, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              onMouseEnter={() => onEnter(i)}
              onMouseLeave={() => onLeave(i)}
              className="group text-left reveal"
              style={{ transitionDelay: `${(i % 8) * 80}ms` }}
            >
              <div className="relative overflow-hidden bg-olive-deep">
                {v.src ? (
                  <>
                    <video
                      src={v.src}
                      muted
                      playsInline
                      preload="metadata"
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full aspect-[4/5] object-cover opacity-90"
                    />
                    <video
                      ref={(el) => (previewRefs.current[i] = el)}
                      src={v.src}
                      muted
                      loop
                      playsInline
                      preload="none"
                      onContextMenu={(e) => e.preventDefault()}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    />
                  </>
                ) : (
                  <div className="w-full aspect-[4/5] bg-olive-deep/60" />
                )}
                <div className="absolute inset-0 bg-olive-deep/30 group-hover:bg-olive-deep/15 transition-colors pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full border border-cream/70 flex items-center justify-center backdrop-blur-sm bg-cream/10 group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 text-cream ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && videos[active].src && (
        <div
          className="fixed inset-0 z-50 bg-olive-deep/95 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full border border-cream/50 text-cream flex items-center justify-center hover:bg-cream/10"
            onClick={() => setActive(null)}
            aria-label="Close video"
          >
            <X className="w-4 h-4" />
          </button>
          {/* Prev / Next */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-cream/30 text-cream flex items-center justify-center hover:bg-cream/10 transition-colors"
            onClick={(e) => { e.stopPropagation(); setActive((a) => (a === null ? a : (a - 1 + videos.length) % videos.length)); }}
            aria-label="Previous"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-cream/30 text-cream flex items-center justify-center hover:bg-cream/10 transition-colors rotate-180"
            onClick={(e) => { e.stopPropagation(); setActive((a) => (a === null ? a : (a + 1) % videos.length)); }}
            aria-label="Next"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div
            className="w-full max-w-4xl aspect-video bg-black animate-zoom-in shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videos[active].src!}
              autoPlay
              controls
              controlsList="nodownload noremoteplayback noplaybackrate"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default AllVideos;
