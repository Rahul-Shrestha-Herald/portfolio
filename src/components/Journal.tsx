import b1 from "@/assets/photo12.jpg";
import b2 from "@/assets/photo13.png";
import b3 from "@/assets/laptop.jpeg";

const posts = [
  {
    img: b1,
    cat: "Reflection",
    title: "Notes from the night shift",
    excerpt: "On the strange, sacred quiet of a hospital after midnight.",
    date: "Apr 12, 2025",
  },
  {
    img: b2,
    cat: "Health Tips",
    title: "Five small habits for stronger immunity",
    excerpt: "Lemon, ginger, sleep, sunlight, breath. Begin where you are.",
    date: "Mar 28, 2025",
  },
  {
    img: b3,
    cat: "Wellbeing",
    title: "How I keep my own cup full",
    excerpt: "Caregivers must care for themselves first. Here is my ritual.",
    date: "Mar 04, 2025",
  },
];

export const Journal = () => {
  return (
    <section id="journal" className="py-28 md:py-36 bg-cream">
      <div className="container">
        <div className="flex items-end justify-between mb-14 reveal">
          <div>
            <h2 className="font-serif text-5xl md:text-6xl text-olive-deep">
              My <span className="italic">journey.</span>
            </h2>
          </div>
          <a href="#" className="hidden md:inline-block text-[11px] uppercase tracking-[0.3em] text-olive-deep border-b border-olive-deep/30 hover:border-olive-deep">
            Read all entries
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {posts.map((p, i) => (
            <article
              key={i}
              className="group reveal transition-all duration-500 hover:-translate-y-2"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="overflow-hidden mb-5 protected relative shadow-card group-hover:shadow-soft transition-shadow duration-500">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  draggable={false}
                  className="protected-img w-full aspect-[4/3] object-cover transition-transform duration-[900ms] group-hover:scale-110"
                />
                <div className="watermark-overlay" />
              </div>
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-olive mb-3">
                <span>{p.cat}</span>
                <span className="w-6 h-px bg-olive/40" />
                <span className="text-muted-foreground">{p.date}</span>
              </div>
              <h3 className="font-serif text-2xl text-olive-deep leading-snug mb-2 group-hover:italic transition-all">
                {p.title}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
