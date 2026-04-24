import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "welcome_popup_seen";

export const WelcomePopup = () => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Only show if not seen before
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => handleClose(), 7000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = () => {
    setClosing(true);
    localStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 500);
  };

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-olive-deep/40 backdrop-blur-sm px-6 transition-opacity duration-500 ${
        closing ? "opacity-0" : "opacity-100 animate-fade-in"
      }`}
      onClick={handleClose}
    >
      <div
        className="relative max-w-md w-full bg-cream border border-olive/20 shadow-soft p-10 text-center animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-olive-deep/60 hover:text-olive-deep transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <p className="text-xs uppercase tracking-[0.3em] text-olive mb-4">A Note</p>
        <h3 className="font-serif text-3xl text-olive-deep mb-4 italic">Namaste</h3>
        <p className="text-sm leading-relaxed text-foreground/75">
          Welcome to my portfolio. Please feel free to know more about me — my story, my work, and the moments that shape my journey.
        </p>
        <div className="mt-6 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          — Samten Dolma Hyolmo
        </div>
      </div>
    </div>
  );
};
