


export const About = () => {
  return (
    <section id="about" className="py-28 md:py-40 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-4 reveal">
            <h2 className="font-serif text-5xl md:text-6xl text-olive-deep leading-[1] mb-2">
              About <span className="italic">me.</span>
            </h2>
          </div>

          <div className="md:col-span-7 md:col-start-6 reveal">
            <p className="font-serif text-2xl md:text-3xl leading-snug text-olive-deep/90 mb-8 text-balance">
              I am Samten Dolma Hyolmo — a nurse who believes healing begins with presence, patience, and a quiet kind of love.
            </p>
            <div className="space-y-5 text-foreground/75 leading-relaxed max-w-xl">
              <p>
                When I'm not working, you'll find me in a quiet corner of my room or a cozy café, rewatching my comfort shows like Friends and The Big Bang Theory, or getting lost in the science of the movie Interstellar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
