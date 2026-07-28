export type Difficulty = "Easy" | "Intermediate" | "Hard";
export type Category = "Puzzle" | "Strategy" | "Memory" | "Arcade";

export interface GameMeta {
  id: string;
  title: string;
  icon: string;
  description: string;
  difficulty: Difficulty;
  category: Category;
  route: string;
  color: string; // gradient from-color
  color2: string; // gradient to-color
}

export const GAMES: GameMeta[] = [
  {
    id: "hangman",
    title: "Hangman",
    icon: "🎯",
    description: "Guess the hidden word one letter at a time before the man is hanged. A classic word challenge.",
    difficulty: "Intermediate",
    category: "Puzzle",
    route: "/games/hangman",
    color: "from-violet-600",
    color2: "to-purple-900",
  },
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    icon: "❌",
    description: "The timeless strategy game. Outsmart your opponent and claim three in a row.",
    difficulty: "Easy",
    category: "Strategy",
    route: "/games/tictactoe",
    color: "from-blue-600",
    color2: "to-cyan-900",
  },
  {
    id: "rock-paper-scissors",
    title: "Rock Paper Scissors",
    icon: "🪨",
    description: "The ultimate hand game. Beat the computer in best of five rounds.",
    difficulty: "Easy",
    category: "Arcade",
    route: "/games/rock-paper-scissors",
    color: "from-emerald-600",
    color2: "to-teal-900",
  },
  {
    id: "guess-the-number",
    title: "Guess the Number",
    icon: "🔢",
    description: "Can you guess the secret number in the fewest tries? Hot or cold guidance included.",
    difficulty: "Easy",
    category: "Puzzle",
    route: "/games/guess-the-number",
    color: "from-orange-500",
    color2: "to-red-900",
  },
  {
    id: "word-scramble",
    title: "Word Scramble",
    icon: "📝",
    description: "Unscramble the jumbled letters to form a real word. Race against the clock.",
    difficulty: "Intermediate",
    category: "Puzzle",
    route: "/games/word-scramble",
    color: "from-pink-600",
    color2: "to-rose-900",
  },
  {
    id: "memory",
    title: "Memory Card Game",
    icon: "🧠",
    description: "Flip cards and find all matching pairs. Tests concentration and short-term memory.",
    difficulty: "Hard",
    category: "Memory",
    route: "/games/memory",
    color: "from-amber-500",
    color2: "to-yellow-900",
  },
];

export const CATEGORIES: Array<"All" | Category> = ["All", "Puzzle", "Strategy", "Memory", "Arcade"];

// LocalStorage helpers
export const getStats = (gameId: string) => {
  try {
    const raw = localStorage.getItem(`game_stats_${gameId}`);
    return raw ? JSON.parse(raw) : { highScore: 0, gamesPlayed: 0, wins: 0 };
  } catch { return { highScore: 0, gamesPlayed: 0, wins: 0 }; }
};

export const saveStats = (gameId: string, stats: { highScore?: number; gamesPlayed?: number; wins?: number }) => {
  try {
    const prev = getStats(gameId);
    localStorage.setItem(`game_stats_${gameId}`, JSON.stringify({ ...prev, ...stats }));
  } catch {}
};

export const getRecentlyPlayed = (): string[] => {
  try {
    const raw = localStorage.getItem("recently_played");
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

export const addRecentlyPlayed = (gameId: string) => {
  try {
    const prev = getRecentlyPlayed().filter(id => id !== gameId);
    localStorage.setItem("recently_played", JSON.stringify([gameId, ...prev].slice(0, 3)));
  } catch {}
};
