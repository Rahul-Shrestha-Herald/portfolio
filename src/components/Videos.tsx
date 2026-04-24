import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, X, ArrowRight } from "lucide-react";
import vid1 from "@/assets/video2.mp4";
import vid2 from "@/assets/video7.mp4";
import vid3 from "@/assets/video10.mp4";

export const allVideos = [
  { title: "Hand Hygiene, Done Right", src: vid1 },
  { title: "A Day in My Shoes",        src: vid2 },
  { title: "Coming Home — Hyolmo",     src: vid3 },
];

const videos = allVideos.slice(0, 3);

export const Videos = () => {
  const [active, setActive] = useState<number | null>(null);
  const navigate = useNavigate();
  const previewRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const onEnter = (i: number) => {
    const el = previewRefs.current[i];
    if (el) {
      el.currentTime = 0;
      el.play().catch(() => {});
    }
  };
  const onLeave = (i: number) => {
    const el = previewRefs.current[i];
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  };

  return (
    <section id="videos" className="py-28 md:py-36 bg-background">
      <div className="container">
        <div className="reveal mb-14">
          <h2 className="font-serif text-5xl md:text-6xl text-olive-deep">
            In <span className="italic">motion.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 protected">
          {videos.map((v, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              onMouseEnter={() => onEnter(i)}
              onMouseLeave={() => onLeave(i)}
              className="group text-left reveal"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="relative overflow-hidden bg-olive-deep">
                <video
                  src={v.src}
                  muted
                  playsInline
                  preload="metadata"
                  onContextMenu={(e) => e.preventDefault()}
                  className="protected-img w-full aspect-[4/5] object-cover opacity-90"
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
                <div className="absolute inset-0 bg-olive-deep/30 group-hover:bg-olive-deep/15 transition-colors pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full border border-cream/70 flex items-center justify-center backdrop-blur-sm bg-cream/10 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-cream ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-16 reveal">
          <button
            onClick={() => navigate("/videos")}
            className="group relative flex items-center gap-4 px-10 py-4 border border-olive-deep/30 text-olive-deep hover:text-cream transition-all duration-500 overflow-hidden"
          >
            <span className="absolute inset-0 bg-olive-deep translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <span className="relative text-[11px] uppercase tracking-[0.4em]">View All Videos</span>
            <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {active !== null && (
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
          <div
            className="w-full max-w-4xl aspect-video bg-black animate-zoom-in shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videos[active].src}
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
    </section>
  );
};

