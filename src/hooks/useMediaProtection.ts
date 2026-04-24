import { useEffect } from "react";

export function useMediaProtection() {
  useEffect(() => {
    const onContext = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "IMG" || t.tagName === "VIDEO" || t.closest(".protected"))) {
        e.preventDefault();
      }
    };
    const onDrag = (e: DragEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "IMG" || t.tagName === "VIDEO")) e.preventDefault();
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ["s", "u", "p"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    const onVisibility = () => {
      if (document.hidden) document.body.classList.add("tab-blurred");
      else document.body.classList.remove("tab-blurred");
    };
    document.addEventListener("contextmenu", onContext);
    document.addEventListener("dragstart", onDrag);
    document.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("dragstart", onDrag);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVisibility);
      document.body.classList.remove("tab-blurred");
    };
  }, []);
}
