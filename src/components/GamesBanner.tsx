import { useNavigate } from "react-router-dom";
import { Gamepad2 } from "lucide-react";

export const GamesBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-background py-10 border-t border-b border-olive/10">
      <div className="container flex items-center justify-center reveal">
        <button
          onClick={() => navigate("/games")}
          className="group inline-flex items-center gap-3 bg-olive-deep text-cream px-8 py-4 rounded-lg hover:bg-olive-deep/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
          <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-serif italic text-lg sm:text-xl">Play Mini Games</span>
          <span className="text-cream/50 text-[11px] uppercase tracking-[0.25em]">→</span>
        </button>
      </div>
    </section>
  );
};
