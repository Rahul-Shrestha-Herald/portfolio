export const Music = () => {
  return (
    <section id="music" className="py-20 sm:py-28 md:py-36 bg-olive-deep text-cream relative overflow-hidden">
      <div className="container">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
          <div className="md:col-span-5 reveal">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 md:mb-6 leading-[1]">
              My favorite <span className="italic font-light">music.</span>
            </h2>
            <p className="text-cream/75 leading-relaxed max-w-md text-sm sm:text-base">
              The sound of my long shifts, my mountain mornings, and my slow Sundays. Press play and walk with me a while.
            </p>
            <div className="mt-8 md:mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-cream/60">
              <span className="w-10 h-px bg-cream/40" />
              Curated playlist
            </div>
          </div>

          <div className="md:col-span-7 reveal">
            <div className="bg-cream/5 p-2 sm:p-3 backdrop-blur-sm border border-cream/10">
              <iframe
                title="Spotify playlist"
                src="https://open.spotify.com/embed/playlist/37ayjC5L8adBAM8sPjjg2t?utm_source=generator&theme=0"
                width="100%"
                height="380"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="block"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
