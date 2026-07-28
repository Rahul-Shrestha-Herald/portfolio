import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import type { GameMeta } from "./gamesData";

interface Props {
  game: GameMeta;
  onRestart: () => void;
  children: React.ReactNode;
}

export const GameLayout = ({ game, onRestart, children }: Props) => {
  const navigate = useNavigate();

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-olive/10">
        <div className="container py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/games", { replace: true })}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-olive-deep/70 hover:text-olive-deep transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Games
          </button>
          <div className="flex items-center gap-2 font-serif italic text-olive-deep">
            <span>{game.icon}</span>
            <span className="hidden sm:inline">{game.title}</span>
          </div>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-olive-deep/70 hover:text-olive-deep transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </button>
        </div>
      </div>

      <div className="container py-10 sm:py-14 max-w-lg">
        {children}
      </div>
    </main>
  );
};
