import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AllPhotos from "./pages/AllPhotos.tsx";
import AllVideos from "./pages/AllVideos.tsx";

// Lazy-load game pages
const Games           = lazy(() => import("./pages/Games.tsx"));
const Hangman         = lazy(() => import("./games/Hangman.tsx"));
const TicTacToe       = lazy(() => import("./games/TicTacToe.tsx"));
const RockPaperScissors = lazy(() => import("./games/RockPaperScissors.tsx"));
const GuessTheNumber  = lazy(() => import("./games/GuessTheNumber.tsx"));
const WordScramble    = lazy(() => import("./games/WordScramble.tsx"));
const MemoryGame      = lazy(() => import("./games/MemoryGame.tsx"));

const GameLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-olive/40 text-sm animate-pulse">Loading...</div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/photos" element={<AllPhotos />} />
          <Route path="/videos" element={<AllVideos />} />
          <Route path="/games" element={<Suspense fallback={<GameLoader />}><Games /></Suspense>} />
          <Route path="/games/hangman" element={<Suspense fallback={<GameLoader />}><Hangman /></Suspense>} />
          <Route path="/games/tictactoe" element={<Suspense fallback={<GameLoader />}><TicTacToe /></Suspense>} />
          <Route path="/games/rock-paper-scissors" element={<Suspense fallback={<GameLoader />}><RockPaperScissors /></Suspense>} />
          <Route path="/games/guess-the-number" element={<Suspense fallback={<GameLoader />}><GuessTheNumber /></Suspense>} />
          <Route path="/games/word-scramble" element={<Suspense fallback={<GameLoader />}><WordScramble /></Suspense>} />
          <Route path="/games/memory" element={<Suspense fallback={<GameLoader />}><MemoryGame /></Suspense>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
