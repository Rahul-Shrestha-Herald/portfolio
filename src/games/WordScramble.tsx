import { useState, useEffect, useCallback } from "react";
import { GameLayout } from "./GameLayout";
import { GAMES, saveStats, getStats } from "./gamesData";
import { DifficultySelector, type Difficulty } from "./DifficultySelector";

const game = GAMES.find(g => g.id === "word-scramble")!;

const EASY_WORDS = ["REACT","NURSE","HEART","CLOUD","SMILE","PLANT","CHAIR","LIGHT","BREAD","PEACE"];
const MED_WORDS  = ["FUNCTION","VARIABLE","CALLBACK","TAILWIND","CONSOLE","PACKAGE","BROWSER","MONITOR","KEYBOARD","FRONTEND"];
const HARD_WORDS = ["TYPESCRIPT","COMPASSION","ARCHITECTURE","EXTRAORDINARY","SOPHISTICATED","REVOLUTIONARY","UNDERSTANDING","MANIFESTATION"];

const CONFIG: Record<Difficulty, { words: string[]; time: number }> = {
  Easy:         { words: EASY_WORDS, time: 45 },
  Intermediate: { words: MED_WORDS,  time: 30 },
  Hard:         { words: HARD_WORDS, time: 20 },
};

const scramble = (w: string): string => {
  const arr = w.split("").sort(() => Math.random() - 0.5);
  return arr.join("") === w ? scramble(w) : arr.join("");
};

export default function WordScramble() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [started, setStarted] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [jumbled, setJumbled] = useState("");
  const [input, setInput]     = useState("");
  const [wrong, setWrong]     = useState(false);
  const [score, setScore]     = useState(0);
  const [timeLeft, setTimeLeft] = useState(CONFIG["Easy"].time);
  const [active, setActive]   = useState(false);

  const { words, time } = CONFIG[difficulty];
  const word = words[wordIdx % words.length];

  useEffect(() => {
    if (!started) return;
    setJumbled(scramble(word));
    setInput("");
    setWrong(false);
    setTimeLeft(time);
    setActive(true);
  }, [wordIdx, started]);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setTimeLeft(p => {
      if (p <= 1) { setActive(false); clearInterval(t); return 0; }
      return p - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [active, wordIdx]);

  useEffect(() => {
    if (started && !active && timeLeft === 0) {
      const st = getStats("word-scramble");
      saveStats("word-scramble", { gamesPlayed: st.gamesPlayed + 1, wins: st.wins + (score > 0 ? 1 : 0), highScore: Math.max(st.highScore, score) });
    }
  }, [active]);

  const check = () => {
    if (input.toUpperCase() === word) {
      setScore(s => s + 10);
      setWordIdx(i => i + 1);
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 600);
      setInput("");
    }
  };

  const start = () => { setScore(0); setWordIdx(0); setStarted(true); };
  const restart = () => { setStarted(false); setScore(0); setWordIdx(0); setActive(false); };

  return (
    <GameLayout game={game} onRestart={restart}>
      <DifficultySelector value={difficulty} onChange={(d) => { setDifficulty(d); restart(); }} />

      {!started ? (
        <div className="text-center py-10">
          <p className="text-foreground/50 text-sm mb-6">
            {difficulty === "Easy" ? "45 seconds, short words" :
             difficulty === "Intermediate" ? "30 seconds, medium words" :
             "20 seconds, long words"}
          </p>
          <button onClick={start} className="px-8 py-3 border border-olive-deep bg-olive-deep text-cream rounded-lg text-sm font-medium hover:bg-olive-deep/90 transition-colors">
            Start Game
          </button>
        </div>
      ) : active ? (
        <div className="space-y-6 text-center">
          <div className="flex justify-between items-center">
            <div className="border border-olive/15 rounded-lg px-5 py-3">
              <div className="font-serif text-2xl italic text-olive-deep">{score}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-olive/50">Score</div>
            </div>
            <div className={`border rounded-lg px-5 py-3 ${timeLeft <= 10 ? "border-red-200 bg-red-50" : "border-olive/15"}`}>
              <div className={`font-serif text-2xl italic ${timeLeft <= 10 ? "text-red-700" : "text-olive-deep"}`}>{timeLeft}s</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-olive/50">Time</div>
            </div>
          </div>

          <div className="border border-olive/15 rounded-lg p-8 bg-cream/30">
            <p className="text-[10px] uppercase tracking-[0.3em] text-olive mb-5">Unscramble this word</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {jumbled.split("").map((l, i) => (
                <div key={i} className="w-9 h-11 border border-olive/30 rounded bg-background flex items-center justify-center font-bold text-olive-deep text-lg">
                  {l}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <input value={input} onChange={e => setInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === "Enter" && check()}
              placeholder="Your answer..."
              className={`flex-1 border rounded-lg px-4 py-3 text-center uppercase font-bold text-lg text-olive-deep bg-background focus:outline-none transition-colors ${wrong ? "border-red-300 bg-red-50" : "border-olive/20 focus:border-olive/50"}`}
            />
            <button onClick={check} className="px-5 py-3 border border-olive-deep bg-olive-deep text-cream rounded-lg text-sm font-medium hover:bg-olive-deep/90 transition-colors">
              Check
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-olive/20 rounded-lg p-8 bg-cream/30 text-center">
          <p className="font-serif text-4xl italic text-olive-deep mb-1">{score}</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-olive/60 mb-5">Final score · Time's up</p>
          <button onClick={restart} className="text-[11px] uppercase tracking-[0.25em] border-b border-olive-deep/40 text-olive-deep">
            Play Again
          </button>
        </div>
      )}
    </GameLayout>
  );
}
