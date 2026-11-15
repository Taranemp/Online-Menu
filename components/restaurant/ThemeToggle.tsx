"use client";

import { useState, useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Lazy initializer reads the DOM class set by the inline script (client only).
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next === "dark");
    }
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("theme", next);
      } catch {}
    }
  };

  if (!mounted) {
    return <div className="size-11" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center justify-center size-11 rounded-full bg-transparent border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer touch-manipulation lg:border-white/10 lg:text-neutral-300 lg:hover:bg-neutral-800"
      aria-label={theme === "dark" ? "تغییر به حالت روشن" : "تغییر به حالت تاریک"}
    >
      {theme === "dark" ? (
        <Sun className="size-5" aria-hidden="true" />
      ) : (
        <Moon className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}