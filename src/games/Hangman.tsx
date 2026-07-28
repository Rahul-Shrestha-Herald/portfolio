import { useState, useEffect, useCallback } from "react";
import { GameLayout } from "./GameLayout";
import { GAMES, saveStats, getStats } from "./gamesData";
import { DifficultySelector, type Difficulty } from "./DifficultySelector";

const game = GAMES.find(g => g.id === "hangman")!;

const EASY_WORDS   = ["REACT","NURSE","SMILE","HEART","CLOUD","PLANT","BREAD","CHAIR","LIGHT","PEACE"];
const MEDIUM_WORDS = ["JAVASCRIPT","TYPESCRIPT","COMPONENT","FUNCTION","VARIABLE","INTERFACE","CALLBACK","PROMISE","PORTFOLIO","FRONTEND"];
const HARD_WORDS   = ["COMPASSIONATE","EXTRAORDINARY","HEARTWARMING","SOPHISTICATED","ARCHITECTURE","MANIFESTATION","UNDERSTANDING","REVOLUTIONARY"];

const CONFIG: Record<Difficulty, { words: string[]; maxWrong: number }> = {
  Easy:         { words: EASY_WORDS,   maxWrong: 8 },
  Intermediate: { words: MEDIUM_WORDS, maxWrong: 6 },
  Hard:         { words: HARD_WORDS,   maxWrong: 4 },
};

const HangmanSVG = ({ wrong, max }: { wrong: number; max: number }) => {
  const pct = wrong / max;
  return (
    <svg viewBox="0 0 120 130" className="w-28 h-28 mx-auto text-olive-deep/60" strokeWidth="2.5" strokeLinecap="round" fill="none" stroke="currentColor">
      <line x1="10" y1="125" x2="110" y2="125" />
      <line x1="30" y1="125" x2="30" y2="5" />
      <line x1="30" y1="5"   x2="75" y2="5" />
      <line x1="75" y1="5"   x2="75" y2="20" />
      {pct >= 1/max && <circle cx="75" cy="30" r="10" />}
      {pct >= 2/max && <line x1="75" y1="40" x2="75" y2="75" />}
      {pct >= 3/max && <line x1="75" y1="50" x2="55" y2="65" />}
      {pct >= 4/max && <line x1="75" y1="50" x2="95" y2="65" />}
      {pct >= 5/max && <line x1="75" y1="75" x2="55" y2="95" />}
      {pct >= 6/max && <line x1="75" y1="75" x2="95" y2="95" />}
    </svg>
  );
};

export default function Hangman() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [word, setWord]     = useState("");
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [started, setStarted] = useState(false);

  const { words, maxWrong } = CONFIG[difficulty];

  const init = useCallback(() => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuessed(new Set());
    setStarted(true);
  }, [words]);

  const restart = () => { setStarted(false); setWord(""); setGuessed(new Set()); };

  const wrong = [...guessed].filter(l => !word.includes(l)).length;
  const won   = word.length > 0 && [...word].every(l => guessed.has(l));
  const lost  = wrong >= maxWrong;
  const done  = won || lost;

  useEffect(() => {
    if (!done || !word) return;
    const s = getStats("hangman");
    saveStats("hangman", { gamesPlayed: s.gamesPlayed + 1, wins: s.wins + (won ? 1 : 0) });
  }, [done]);

  const guess = (letter: string) => {
    if (done || guessed.has(letter)) return;
    setGuessed(prev => new Set([...prev, letter]));
  };

  useEffect(() => {
    if (!started) return;
    const handler = (e: KeyboardEvent) => {
      const l = e.key.toUpperCase();
      if (/^[A-Z]$/.test(l)) guess(l);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [guessed, done, word, started]);

  return (
    <GameLayout game={game} onRestart={restart}>
      <DifficultySelector value={difficulty} onChange={(d) => { setDifficulty(d); restart(); }} />

      {!started ? (
        <div className="text-center py-10">
          <p className="text-foreground/50 text-sm mb-6">
            {difficulty === "Easy" ? "8 attempts, short words" :
             difficulty === "Intermediate" ? "6 attempts, medium words" :
             "4 attempts, long words"}
          </p>
          <button onClick={init} className="px-8 py-3 border border-olive-deep bg-olive-deep text-cream rounded-lg text-sm font-medium hover:bg-olive-deep/90 transition-colors">
            Start Game
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="border border-olive/15 rounded-lg p-6 text-center bg-cream/30">
            <p className="text-[10px] uppercase tracking-[0.3em] text-olive mb-4">
              {maxWrong - wrong} attempt{maxWrong - wrong !== 1 ? "s" : ""} remaining
            </p>
            <HangmanSVG wrong={wrong} max={maxWrong} />
            <div className="flex justify-center gap-2 flex-wrap mt-6">
              {word.split("").map((l, i) => (
                <div key={i} className="w-8 h-10 border-b-2 border-olive/40 flex items-end justify-center pb-1">
                  {guessed.has(l) && <span className="text-olive-deep font-bold text-lg">{l}</span>}
                </div>
              ))}
            </div>
          </div>

          {done && (
            <div className={`border rounded-lg p-5 text-center ${won ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
              <p className={`font-serif text-xl italic mb-1 ${won ? "text-emerald-800" : "text-red-800"}`}>
                {won ? "Well done!" : `The word was: ${word}`}
              </p>
              <button onClick={restart} className="mt-3 text-[11px] uppercase tracking-[0.25em] border-b border-olive-deep/40 text-olive-deep">
                Play Again
              </button>
            </div>
          )}

          <div className="grid grid-cols-9 gap-1.5">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => {
              const correct = word.includes(l) && guessed.has(l);
              const missed  = !word.includes(l) && guessed.has(l);
              return (
                <button key={l} onClick={() => guess(l)} disabled={guessed.has(l) || done}
                  className={`w-full aspect-square rounded text-xs font-semibold transition-all border ${
                    correct ? "bg-emerald-100 border-emerald-300 text-emerald-800" :
                    missed  ? "bg-foreground/5 border-foreground/10 text-foreground/25" :
                              "border-olive/20 text-olive-deep hover:border-olive/60 hover:bg-cream/50"
                  }`}>
                  {l}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </GameLayout>
  );
}
