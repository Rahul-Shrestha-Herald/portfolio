type Difficulty = "Easy" | "Intermediate" | "Hard";

const styles: Record<Difficulty, string> = {
  Easy:         "border-emerald-300 bg-emerald-50 text-emerald-800",
  Intermediate: "border-amber-300 bg-amber-50 text-amber-800",
  Hard:         "border-red-300 bg-red-50 text-red-800",
};

const activeStyles: Record<Difficulty, string> = {
  Easy:         "bg-emerald-700 border-emerald-700 text-white",
  Intermediate: "bg-amber-700 border-amber-700 text-white",
  Hard:         "bg-red-700 border-red-700 text-white",
};

interface Props {
  value: Difficulty;
  onChange: (d: Difficulty) => void;
}

export const DifficultySelector = ({ value, onChange }: Props) => (
  <div className="flex justify-center gap-2 mb-6">
    {(["Easy", "Intermediate", "Hard"] as Difficulty[]).map(d => (
      <button
        key={d}
        onClick={() => onChange(d)}
        className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded border transition-all ${
          value === d ? activeStyles[d] : `${styles[d]} hover:opacity-80`
        }`}
      >
        {d}
      </button>
    ))}
  </div>
);

export type { Difficulty };
