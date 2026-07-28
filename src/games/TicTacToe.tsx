import { useState, useCallback } from "react";
import { GameLayout } from "./GameLayout";
import { GAMES, saveStats, getStats } from "./gamesData";
import { DifficultySelector, type Difficulty } from "./DifficultySelector";

const game = GAMES.find(g => g.id === "tictactoe")!;
const WIN_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const checkWin = (b: Array<string|null>, p: string) => WIN_LINES.some(l => l.every(i => b[i] === p));
const empty = (b: Array<string|null>) => b.map((v,i) => v === null ? i : -1).filter(i => i >= 0);

// Minimax for Hard
const minimax = (b: Array<string|null>, isMax: boolean): number => {
  if (checkWin(b, "O")) return 10;
  if (checkWin(b, "X")) return -10;
  const avail = empty(b);
  if (!avail.length) return 0;
  let best = isMax ? -Infinity : Infinity;
  for (const i of avail) {
    const nb = [...b]; nb[i] = isMax ? "O" : "X";
    const score = minimax(nb, !isMax);
    best = isMax ? Math.max(best, score) : Math.min(best, score);
  }
  return best;
};

const cpuMove = (b: Array<string|null>, difficulty: Difficulty): number => {
  const avail = empty(b);
  if (difficulty === "Easy") return avail[Math.floor(Math.random() * avail.length)];
  if (difficulty === "Intermediate") {
    // Block player win or play random
    for (const i of avail) { const nb = [...b]; nb[i] = "O"; if (checkWin(nb, "O")) return i; }
    for (const i of avail) { const nb = [...b]; nb[i] = "X"; if (checkWin(nb, "X")) return i; }
    return avail[Math.floor(Math.random() * avail.length)];
  }
  // Hard: minimax
  let best = -Infinity; let move = avail[0];
  for (const i of avail) {
    const nb = [...b]; nb[i] = "O";
    const score = minimax(nb, false);
    if (score > best) { best = score; move = i; }
  }
  return move;
};

export default function TicTacToe() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [board, setBoard]   = useState<Array<string|null>>(Array(9).fill(null));
  const [xTurn, setXTurn]   = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [started, setStarted] = useState(false);

  const xWon = checkWin(board, "X");
  const oWon = checkWin(board, "O");
  const draw = !xWon && !oWon && board.every(Boolean);
  const done = xWon || oWon || draw;
  const winner = xWon ? "X" : oWon ? "O" : null;
  const winLine = WIN_LINES.find(l => l.every(i => board[i] && board[i] === board[l[0]]));

  const click = (i: number) => {
    if (done || board[i] || !xTurn) return;
    const next = [...board]; next[i] = "X";
    const playerWon = checkWin(next, "X");
    if (playerWon) { setScores(s => ({ ...s, X: s.X + 1 })); const st = getStats("tictactoe"); saveStats("tictactoe", { gamesPlayed: st.gamesPlayed + 1, wins: st.wins + 1 }); }
    else if (next.every(Boolean)) { const st = getStats("tictactoe"); saveStats("tictactoe", { gamesPlayed: st.gamesPlayed + 1 }); }
    setBoard(next);
    setXTurn(false);
    if (!playerWon && !next.every(Boolean)) {
      setTimeout(() => {
        const ci = cpuMove(next, difficulty);
        const nb = [...next]; nb[ci] = "O";
        const cpuWon = checkWin(nb, "O");
        if (cpuWon) { setScores(s => ({ ...s, O: s.O + 1 })); const st = getStats("tictactoe"); saveStats("tictactoe", { gamesPlayed: st.gamesPlayed + 1 }); }
        setBoard(nb);
        setXTurn(true);
      }, 300);
    } else { setXTurn(true); }
  };

  const restart = () => { setBoard(Array(9).fill(null)); setXTurn(true); setStarted(false); };

  return (
    <GameLayout game={game} onRestart={restart}>
      <DifficultySelector value={difficulty} onChange={(d) => { setDifficulty(d); restart(); }} />

      {!started ? (
        <div className="text-center py-10">
          <p className="text-foreground/50 text-sm mb-6">
            {difficulty === "Easy" ? "CPU plays randomly" :
             difficulty === "Intermediate" ? "CPU blocks your wins" :
             "CPU plays perfectly (unbeatable)"}
          </p>
          <button onClick={() => setStarted(true)} className="px-8 py-3 border border-olive-deep bg-olive-deep text-cream rounded-lg text-sm font-medium hover:bg-olive-deep/90 transition-colors">
            Start Game
          </button>
        </div>
      ) : (
        <div className="space-y-8 text-center">
          <div className="flex justify-center gap-6">
            {(["X","O"] as const).map(p => (
              <div key={p} className={`border rounded-lg px-8 py-4 transition-colors ${xTurn && p==="X" && !done ? "border-olive/50 bg-cream/40" : !xTurn && p==="O" && !done ? "border-olive/50 bg-cream/40" : "border-olive/15"}`}>
                <div className="font-serif text-3xl italic text-olive-deep">{scores[p]}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-olive/60 mt-1">{p === "X" ? "You" : "CPU"}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-[260px] mx-auto">
            {board.map((cell, i) => (
              <button key={i} onClick={() => click(i)}
                className={`aspect-square rounded-lg text-3xl font-black border transition-all ${
                  winLine?.includes(i) ? "border-olive/60 bg-cream" :
                  cell ? "border-olive/20 bg-cream/30" :
                  "border-olive/15 hover:border-olive/40 hover:bg-cream/30"
                }`}>
                {cell && <span className={cell === "X" ? "text-olive-deep" : "text-olive/70"}>{cell}</span>}
              </button>
            ))}
          </div>

          {done && (
            <div className="border border-olive/20 rounded-lg p-5 bg-cream/30">
              <p className="font-serif text-xl italic text-olive-deep mb-3">
                {draw ? "It's a draw." : winner === "X" ? "You win!" : "CPU wins."}
              </p>
              <button onClick={restart} className="text-[11px] uppercase tracking-[0.25em] border-b border-olive-deep/40 text-olive-deep">Play Again</button>
            </div>
          )}
          {!done && <p className="text-[11px] uppercase tracking-[0.25em] text-olive/60">{xTurn ? "Your turn" : "CPU thinking..."}</p>}
        </div>
      )}
    </GameLayout>
  );
}
