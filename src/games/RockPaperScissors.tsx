import { useState } from "react";
import { GameLayout } from "./GameLayout";
import { GAMES, saveStats, getStats } from "./gamesData";
import { DifficultySelector, type Difficulty } from "./DifficultySelector";

const game = GAMES.find(g => g.id === "rock-paper-scissors")!;
const CHOICES = ["🪨","📄","✂️"] as const;
const LABELS  = ["Rock","Paper","Scissors"];
type Choice = typeof CHOICES[number];
const beats: Record<Choice, Choice> = { "🪨": "✂️", "📄": "🪨", "✂️": "📄" };

const ROUNDS: Record<Difficulty, number> = { Easy: 3, Intermediate: 5, Hard: 7 };

export default function RockPaperScissors() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [scores, setScores] = useState({ you: 0, cpu: 0 });
  const [result, setResult] = useState<{ you: Choice; cpu: Choice; outcome: string } | null>(null);
  const [round, setRound]   = useState(1);
  const [started, setStarted] = useState(false);

  const maxRounds = ROUNDS[difficulty];

  const play = (choice: Choice) => {
    const cpu = CHOICES[Math.floor(Math.random() * 3)];
    const won = beats[choice] === cpu;
    const outcome = choice === cpu ? "Draw" : won ? "You win" : "CPU wins";
    setResult({ you: choice, cpu, outcome });
    const ns = { you: scores.you + (won ? 1 : 0), cpu: scores.cpu + (!won && choice !== cpu ? 1 : 0) };
    if (choice !== cpu) setScores(ns);
    if (round === maxRounds) {
      const st = getStats("rock-paper-scissors");
      saveStats("rock-paper-scissors", { gamesPlayed: st.gamesPlayed + 1, wins: st.wins + (ns.you > ns.cpu ? 1 : 0) });
    }
    setRound(r => r + 1);
  };

  const restart = () => { setScores({ you: 0, cpu: 0 }); setResult(null); setRound(1); setStarted(false); };

  return (
    <GameLayout game={game} onRestart={restart}>
      <DifficultySelector value={difficulty} onChange={(d) => { setDifficulty(d); restart(); }} />

      {!started ? (
        <div className="text-center py-10">
          <p className="text-foreground/50 text-sm mb-6">Best of {maxRounds} rounds</p>
          <button onClick={() => setStarted(true)} className="px-8 py-3 border border-olive-deep bg-olive-deep text-cream rounded-lg text-sm font-medium hover:bg-olive-deep/90 transition-colors">
            Start Game
          </button>
        </div>
      ) : (
        <div className="space-y-8 text-center">
          <div className="flex justify-center gap-6">
            {[["You", scores.you], ["CPU", scores.cpu]].map(([l, s]) => (
              <div key={String(l)} className="border border-olive/15 rounded-lg px-8 py-4">
                <div className="font-serif text-3xl italic text-olive-deep">{s}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-olive/60 mt-1">{l}</div>
              </div>
            ))}
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-olive/50">Round {Math.min(round, maxRounds)} of {maxRounds}</p>

          {result && (
            <div className="border border-olive/15 rounded-lg p-5 bg-cream/30">
              <div className="flex justify-center items-center gap-6 text-4xl mb-3">
                <span>{result.you}</span>
                <span className="text-olive/30 text-lg">vs</span>
                <span>{result.cpu}</span>
              </div>
              <p className="font-serif italic text-olive-deep text-lg">{result.outcome}</p>
            </div>
          )}

          {round <= maxRounds ? (
            <div className="flex justify-center gap-4">
              {CHOICES.map((c, i) => (
                <button key={c} onClick={() => play(c)}
                  className="flex flex-col items-center gap-2 border border-olive/20 hover:border-olive/50 hover:bg-cream/40 rounded-lg p-5 transition-all">
                  <span className="text-4xl">{c}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-olive/60">{LABELS[i]}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="border border-olive/20 rounded-lg p-6 bg-cream/30">
              <p className="font-serif text-xl italic text-olive-deep mb-1">
                {scores.you > scores.cpu ? "You won the match!" : scores.you < scores.cpu ? "CPU wins." : "It's a draw."}
              </p>
              <p className="text-sm text-foreground/50 mb-4">{scores.you} — {scores.cpu}</p>
              <button onClick={restart} className="text-[11px] uppercase tracking-[0.25em] border-b border-olive-deep/40 text-olive-deep">Play Again</button>
            </div>
          )}
        </div>
      )}
    </GameLayout>
  );
}
