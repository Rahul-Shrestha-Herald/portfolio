import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Gamepad2, Clock } from "lucide-react";
import { GAMES, CATEGORIES, getStats, getRecentlyPlayed, addRecentlyPlayed, type GameMeta, type Category } from "@/games/gamesData";

const difficultyColor: Record<string, string> = {
  Easy: "text-emerald-700 bg-emerald-50 border border-emerald-200",
  Intermediate: "text-amber-700 bg-amber-50 border border-amber-200",
  Hard: "text-red-700 bg-red-50 border border-red-200",
};

const GameCard = ({ game, onClick }: { game: GameMeta; onClick: () => void }) => {
  const stats = getStats(game.id);
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-background border border-olive/15 hover:border-olive/40 rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl select-none">{game.icon}</span>
        <span className={`text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded ${difficultyColor[game.difficulty]}`}>
          {game.difficulty}
        </span>
      </div>

      <h3 className="font-serif text-xl text-olive-deep mb-2">{game.title}</h3>
      <p className="text-sm text-foreground/60 leading-relaxed mb-5">{game.description}</p>

      <div className="flex items-center justify-between pt-4 border-t border-olive/10">
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>Played: <strong className="text-olive-deep">{stats.gamesPlayed}</strong></span>
          <span>Wins: <strong className="text-olive-deep">{stats.wins}</strong></span>
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-olive-deep/60 group-hover:text-olive-deep transition-colors border-b border-olive-deep/30 group-hover:border-olive-deep">
          Play →
        </span>
      </div>
    </div>
  );
};

const Games = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | Category>("All");
  const recentIds = getRecentlyPlayed();
  const recentGames = recentIds.map(id => GAMES.find(g => g.id === id)).filter(Boolean) as GameMeta[];

  const filtered = GAMES.filter(g => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || g.category === activeCategory;
    return matchSearch && matchCat;
  });

  const handlePlay = (game: GameMeta) => {
    addRecentlyPlayed(game.id);
    navigate(game.route);
  };

  useEffect(() => {
    document.title = "Games — Samten";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-olive/10">
        <div className="container py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/", { replace: true })}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-olive-deep/70 hover:text-olive-deep transition-colors"
          >
            ← Back
          </button>
          <a href="/" className="font-serif text-lg italic text-olive-deep">
            Samten<span className="text-olive">.</span>
          </a>
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.3em] text-olive/60">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Arcade</span>
          </div>
        </div>
      </div>

      <div className="container py-16 md:py-24 max-w-5xl">

        {/* Title */}
        <div className="mb-12 md:mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-olive mb-3">Mini Arcade</p>
          <h1 className="font-serif text-5xl md:text-7xl text-olive-deep">
            Games<span className="italic font-light">.</span>
          </h1>
          <p className="text-foreground/60 mt-4 max-w-md text-sm leading-relaxed">
            Six small interactive games. Pick one and play.
          </p>
        </div>

        {/* Recently Played */}
        {recentGames.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-[0.3em] text-olive">
              <Clock className="w-3.5 h-3.5" /> Recently Played
            </div>
            <div className="flex flex-wrap gap-3">
              {recentGames.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handlePlay(g)}
                  className="flex items-center gap-2 border border-olive/20 hover:border-olive/50 rounded-lg px-4 py-2.5 text-sm text-olive-deep transition-colors hover:bg-cream/50"
                >
                  <span>{g.icon}</span>
                  <span className="font-serif italic">{g.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-olive/40" />
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-olive/20 rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground bg-background placeholder-foreground/30 focus:outline-none focus:border-olive/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-3 py-2 rounded-lg text-[10px] uppercase tracking-[0.2em] transition-all border ${
                  activeCategory === cat
                    ? "bg-olive-deep text-cream border-olive-deep"
                    : "border-olive/20 text-olive-deep/60 hover:border-olive/50 hover:text-olive-deep"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((game) => (
              <GameCard key={game.id} game={game} onClick={() => handlePlay(game)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-olive/15 rounded-lg">
            <p className="text-foreground/40 text-sm mb-3">No games found</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="text-olive-deep text-[11px] uppercase tracking-[0.25em] border-b border-olive-deep/30"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-olive/10 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Your scores are saved locally on your device
        </div>
      </div>
    </main>
  );
};

export default Games;
