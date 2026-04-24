import showcase from "@/assets/ot.jpeg";
import { useParallax } from "@/hooks/useParallax";

export const Showcase = () => {
  const imgRef = useParallax<HTMLDivElement>(0.12);

  return (
    <section id="showcase" className="py-28 md:py-36 bg-background overflow-hidden">
      <div className="container">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 relative reveal">
            <div className="overflow-hidden">
              <div ref={imgRef} className="relative">
                <img
                  src={showcase}
                  alt="Samten caring for an elderly patient"
                  loading="lazy"
                  draggable={false}
                  width={1536}
                  height={1024}
                  className="protected-img w-full h-auto shadow-soft"
                />
                <div className="watermark-overlay" />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-4 md:-left-10 bg-cream px-6 py-4 shadow-card z-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-olive">Featured</p>
              <p className="font-serif text-xl text-olive-deep italic">Hyolmo Health Camp, 2024</p>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9 reveal">
            <h2 className="font-serif text-4xl md:text-5xl text-olive-deep leading-[1.05] mb-6">
              Bringing care home, <span className="italic">to the mountains.</span>
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              In the spring of 2024, I led a volunteer health camp in a remote Hyolmo village — two days of free check-ups, medication, and warm tea for 312 villagers, many of whom had never met a nurse before.
            </p>
            <p className="text-foreground/75 leading-relaxed">
              It reminded me why I do this work: medicine is most powerful when it travels to where it is needed the most.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
