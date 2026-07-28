import { useState, useEffect, useCallback } from "react";
import { GameLayout } from "./GameLayout";
import { GAMES, saveStats, getStats } from "./gamesData";
import { DifficultySelector, type Difficulty } from "./DifficultySelector";

const game = GAMES.find(g => g.id === "memory")!;

const ALL_EMOJIS = ["🌸","🎯","🚀","🎨","🎵","🌙","⚡","🎃","🐉","🦋"];

const CONFIG: Record<Difficulty, { pairs: number; cols: number; label: string }> = {
  Easy:         { pairs: 6,  cols: 4, label: "6 pairs — 4×3 grid" },
  Intermediate: { pairs: 8,  cols: 4, label: "8 pairs — 4×4 grid" },
  Hard:         { pairs: 10, cols: 5, label: "10 pairs — 5×4 grid" },
};

const makeCards = (pairs: number) =>
  [...ALL_EMOJIS.slice(0, pairs), ...ALL_EMOJIS.slice(0, pairs)]
    .map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);

export default function MemoryGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [started, setStarted] = useState(false);
  const [cards, setCards]     = useState(() => makeCards(CONFIG["Easy"].pairs));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves]     = useState(0);
  const [locked, setLocked]   = useState(false);
  const [won, setWon]         = useState(false);

  const { pairs, cols } = CONFIG[difficulty];

  useEffect(() => {
    if (flipped.length !== 2) return;
    setLocked(true);
    const [a, b] = flipped;
    const match = cards[a].emoji === cards[b].emoji;
    setTimeout(() => {
      setCards(prev => prev.map((c, i) => i === a || i === b ? { ...c, matched: match, flipped: match } : c));
      setFlipped([]);
      setLocked(false);
      setMoves(m => m + 1);
    }, 700);
  }, [flipped]);

  useEffect(() => {
    if (started && cards.length > 0 && cards.every(c => c.matched)) {
      setWon(true);
      const st = getStats("memory");
      saveStats("memory", { gamesPlayed: st.gamesPlayed + 1, wins: st.wins + 1, highScore: Math.max(st.highScore, Math.max(0, 200 - moves * 5)) });
    }
  }, [cards, started]);

  const flip = (i: number) => {
    if (locked || cards[i].matched || cards[i].flipped || flipped.length === 2) return;
    setCards(prev => prev.map((c, idx) => idx === i ? { ...c, flipped: true } : c));
    setFlipped(prev => [...prev, i]);
  };

  const start = () => { setCards(makeCards(pairs)); setFlipped([]); setMoves(0); setLocked(false); setWon(false); setStarted(true); };
  const restart = () => { setStarted(false); setWon(false); };

  return (
    <GameLayout game={game} onRestart={restart}>
      <DifficultySelector value={difficulty} onChange={(d) => { setDifficulty(d); restart(); }} />

      {!started ? (
        <div className="text-center py-10">
          <p className="text-foreground/50 text-sm mb-6">{CONFIG[difficulty].label}</p>
          <button onClick={start} className="px-8 py-3 border border-olive-deep bg-olive-deep text-cream rounded-lg text-sm font-medium hover:bg-olive-deep/90 transition-colors">
            Start Game
          </button>
        </div>
      ) : (
        <div className="space-y-6 text-center">
          <div className="flex justify-center gap-6">
            <div className="border border-olive/15 rounded-lg px-6 py-3">
              <div className="font-serif text-2xl italic text-olive-deep">{moves}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-olive/50">Moves</div>
            </div>
            <div className="border border-olive/15 rounded-lg px-6 py-3">
              <div className="font-serif text-2xl italic text-olive-deep">{cards.filter(c => c.matched).length / 2}/{pairs}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-olive/50">Matched</div>
            </div>
          </div>

          <div
            className="grid gap-2.5 mx-auto"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, maxWidth: cols * 60 + (cols - 1) * 10 }}
          >
            {cards.map((card, i) => (
              <button key={card.id} onClick={() => flip(i)}
                className={`aspect-square rounded-lg text-xl border transition-all duration-200 ${
                  card.matched ? "border-emerald-200 bg-emerald-50" :
                  card.flipped ? "border-olive/40 bg-cream" :
                  "border-olive/20 bg-background hover:border-olive/40 hover:bg-cream/30"
                }`}>
                {(card.flipped || card.matched) ? card.emoji : ""}
              </button>
            ))}
          </div>

          {won && (
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-5">
              <p className="font-serif text-xl italic text-emerald-800 mb-1">Completed in {moves} moves!</p>
              <p className="text-sm text-emerald-700/60 mb-3">Score: {Math.max(0, 200 - moves * 5)} pts</p>
              <button onClick={restart} className="text-[11px] uppercase tracking-[0.25em] border-b border-emerald-700/40 text-emerald-800">Play Again</button>
            </div>
          )}
        </div>
      )}
    </GameLayout>
  );
}
