import { useState, useCallback } from "react";
import { GameLayout } from "./GameLayout";
import { GAMES, saveStats, getStats } from "./gamesData";
import { DifficultySelector, type Difficulty } from "./DifficultySelector";

const game = GAMES.find(g => g.id === "guess-the-number")!;

const CONFIG: Record<Difficulty, { max: number; tries: number | null; label: string }> = {
  Easy:         { max: 50,  tries: null, label: "1–50, unlimited tries" },
  Intermediate: { max: 100, tries: 10,  label: "1–100, 10 tries" },
  Hard:         { max: 200, tries: 7,   label: "1–200, 7 tries" },
};

export default function GuessTheNumber() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [secret, setSecret]   = useState<number | null>(null);
  const [input, setInput]     = useState("");
  const [guesses, setGuesses] = useState<Array<{ n: number; hint: string }>>([]);
  const [won, setWon]         = useState(false);

  const { max, tries } = CONFIG[difficulty];
  const triesLeft = tries !== null ? tries - guesses.length : null;
  const lost = !won && tries !== null && guesses.length >= tries;

  const start = useCallback(() => {
    setSecret(Math.floor(Math.random() * max) + 1);
    setGuesses([]);
    setInput("");
    setWon(false);
  }, [max]);

  const restart = () => { setSecret(null); setGuesses([]); setInput(""); setWon(false); };

  const guess = () => {
    if (!secret) return;
    const n = parseInt(input);
    if (isNaN(n) || n < 1 || n > max) return;
    const hint = n === secret ? "Correct!" : n < secret ? "Too low" : "Too high";
    const next = [...guesses, { n, hint }];
    setGuesses(next);
    setInput("");
    if (n === secret) {
      setWon(true);
      const st = getStats("guess-the-number");
      saveStats("guess-the-number", { gamesPlayed: st.gamesPlayed + 1, wins: st.wins + 1, highScore: Math.max(st.highScore, Math.max(0, 100 - (next.length - 1) * 10)) });
    } else if (tries !== null && next.length >= tries) {
      const st = getStats("guess-the-number");
      saveStats("guess-the-number", { gamesPlayed: st.gamesPlayed + 1 });
    }
  };

  return (
    <GameLayout game={game} onRestart={restart}>
      <DifficultySelector value={difficulty} onChange={(d) => { setDifficulty(d); restart(); }} />

      {!secret ? (
        <div className="text-center py-10">
          <p className="text-foreground/50 text-sm mb-6">{CONFIG[difficulty].label}</p>
          <button onClick={start} className="px-8 py-3 border border-olive-deep bg-olive-deep text-cream rounded-lg text-sm font-medium hover:bg-olive-deep/90 transition-colors">
            Start Game
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border border-olive/15 rounded-lg p-5 text-center bg-cream/30">
            <p className="text-[10px] uppercase tracking-[0.3em] text-olive">
              Guess a number between 1 and {max}
              {triesLeft !== null && ` · ${triesLeft} ${triesLeft === 1 ? "try" : "tries"} left`}
            </p>
          </div>

          {!won && !lost && (
            <div className="flex gap-3">
              <input type="number" min={1} max={max} value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && guess()}
                placeholder={`1 – ${max}`}
                className="flex-1 border border-olive/20 rounded-lg px-4 py-3 text-center text-lg text-olive-deep bg-background focus:outline-none focus:border-olive/50"
              />
              <button onClick={guess} className="px-6 py-3 border border-olive-deep bg-olive-deep text-cream rounded-lg text-sm font-medium hover:bg-olive-deep/90 transition-colors">
                Guess
              </button>
            </div>
          )}

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {[...guesses].reverse().map((g, i) => (
              <div key={i} className={`flex items-center justify-between rounded-lg px-4 py-3 border text-sm ${
                g.hint === "Correct!" ? "border-emerald-200 bg-emerald-50 text-emerald-800" :
                g.hint === "Too low"  ? "border-orange-200 bg-orange-50 text-orange-800" :
                                        "border-blue-200 bg-blue-50 text-blue-800"
              }`}>
                <span className="font-semibold">{g.n}</span>
                <span>{g.hint}</span>
              </div>
            ))}
          </div>

          {(won || lost) && (
            <div className={`border rounded-lg p-5 text-center ${won ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
              <p className={`font-serif text-xl italic mb-1 ${won ? "text-emerald-800" : "text-red-800"}`}>
                {won ? `Got it in ${guesses.length} ${guesses.length === 1 ? "guess" : "guesses"}!` : `The number was ${secret}.`}
              </p>
              <button onClick={restart} className="mt-3 text-[11px] uppercase tracking-[0.25em] border-b border-olive-deep/40 text-olive-deep">
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </GameLayout>
  );
}
