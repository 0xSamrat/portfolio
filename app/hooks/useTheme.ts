"use client";

import { useCallback, useSyncExternalStore } from "react";

export type ThemeMode = "light" | "dark";

/**
 * The inline bootstrap in `layout.tsx` sets `data-theme` before React hydrates,
 * so the attribute — not React state — is the source of truth. Subscribing to it
 * with `useSyncExternalStore` keeps the toggle in sync without a setState pass
 * inside an effect, and without a hydration mismatch.
 */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): ThemeMode {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/** The server always renders the light default; the client corrects on hydration. */
function getServerSnapshot(): ThemeMode {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((mode: ThemeMode) => {
    const apply = () => {
      document.documentElement.setAttribute("data-theme", mode);
      try {
        localStorage.setItem("theme", mode);
      } catch {}
    };
    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }, []);

  return { theme, setTheme };
}
