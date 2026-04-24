import { Facebook, Instagram } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-28 md:py-36 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7 reveal">
            <h2 className="font-serif text-6xl md:text-8xl text-olive-deep leading-[0.95] mb-6">
              Let's <span className="italic">talk.</span>
            </h2>
            <p className="text-foreground/70 max-w-md leading-relaxed">
              For collaborations, speaking, mentorship, or simply to say namaste.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9 reveal space-y-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">Email</div>
              <a href="mailto:samten.hyolmo@gmail.com" className="font-serif text-xl text-olive-deep italic hover:underline">
                samten.hyolmo@gmail.com
              </a>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">Location</div>
              <p className="font-serif text-xl text-olive-deep italic">Kathmandu, Nepal</p>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">Follow</div>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/share/18jPVZjtKX/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-olive-deep/70 hover:text-olive-deep transition-colors group"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="text-[11px] uppercase tracking-[0.25em] group-hover:underline">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/samten_dolmahyolmo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-olive-deep/70 hover:text-olive-deep transition-colors group"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="text-[11px] uppercase tracking-[0.25em] group-hover:underline">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-28 pt-8 border-t border-olive/15 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <div>© {new Date().getFullYear()} Samten Dolma Hyolmo</div>
          <div className="flex items-center gap-1">
            Made with <span className="text-rose-400 text-sm">♥</span> by Rahul
          </div>
        </footer>
      </div>
    </section>
  );
};
