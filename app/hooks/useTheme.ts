"use client";

import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>("light");

  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-theme") as
      | ThemeMode
      | null) || "light";
    setThemeState(current);
  }, []);

  const setTheme = useCallback((mode: ThemeMode) => {
    const apply = () => {
      document.documentElement.setAttribute("data-theme", mode);
      try {
        localStorage.setItem("theme", mode);
      } catch {}
      setThemeState(mode);
    };
    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }, []);

  return { theme, setTheme };
}
