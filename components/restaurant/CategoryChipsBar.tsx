"use client";

import { useEffect, useRef, useState } from "react";
import { DEFAULT_CATEGORIES } from "./categories";
import { cn } from "@/lib/utils";

type Props = {
  categorySlugs?: string[];
};

export default function CategoryChipsBar({ categorySlugs }: Props) {
  const categories = categorySlugs
    ? DEFAULT_CATEGORIES.filter((cat) => categorySlugs.includes(cat.slug))
    : DEFAULT_CATEGORIES;

  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const sections = categories
      .map((cat) => document.getElementById(cat.slug))
      .filter((s): s is HTMLElement => s !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: [0, 0.1, 0.25, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const el = chipRefs.current[activeSlug];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeSlug]);

  function handleClick(slug: string) {
    const section = document.getElementById(slug);
    if (!section) return;
    setActiveSlug(slug);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      className="w-full overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]"
      aria-label="دسته‌بندی‌های منو"
    >
      <ul className="flex h-full items-center gap-2 px-4 py-0 flex-nowrap min-w-max">
        {categories.map((cat) => {
          const isActive = activeSlug === cat.slug;

          return (
            <li key={cat.slug} className="shrink-0">
              <button
                type="button"
                ref={(el) => {
                  chipRefs.current[cat.slug] = el;
                }}
                onClick={() => handleClick(cat.slug)}
                className={cn(
                  "flex min-h-[44px] items-center whitespace-nowrap rounded-full px-4 text-xs font-medium transition-colors cursor-pointer",
                  isActive
                    ? "bg-amber-400 text-neutral-950 font-semibold shadow-sm"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                )}
                aria-pressed={isActive}
              >
                {cat.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}