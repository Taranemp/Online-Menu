"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_CATEGORIES,
} from "@/components/restaurant/categories";
import { cn } from "@/lib/utils";

type CategoryNavProps = {
  activeSlug?: string;
  categorySlugs?: string[];
};

export default function CategoryNav({
  activeSlug,
  categorySlugs,
}: CategoryNavProps) {
  const categories = useMemo(
    () =>
      categorySlugs
        ? DEFAULT_CATEGORIES.filter((cat) =>
            categorySlugs.includes(cat.slug)
          )
        : DEFAULT_CATEGORIES,
    [categorySlugs]
  );

  const [internalSlug, setInternalSlug] = useState(categories[0]?.slug ?? "");
  const currentSlug = activeSlug ?? internalSlug;

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const sections = categories
      .map((cat) => document.getElementById(cat.slug))
      .filter(
        (section): section is HTMLElement => section !== null
      );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setInternalSlug(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-15% 0px -65% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [categories]);

  function handleCategoryClick(slug: string) {
    const section = document.getElementById(slug);

    if (!section) return;

    setInternalSlug(slug);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <nav
      className="w-full overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]"
      aria-label="منو دسته‌بندی‌ها"
    >
      {/* اضافه شدن flex-nowrap و shrink-0 برای جلوگیری از به‌هم‌ریختگی در موبایل */}
      <ul className="flex items-center gap-2 px-2 py-2 flex-nowrap min-w-max">
        {categories.map((cat) => {
          const isActive = currentSlug === cat.slug;

          return (
            <li key={cat.slug} className="shrink-0">
              <button
                type="button"
                onClick={() => handleCategoryClick(cat.slug)}
                className={cn(
                  "flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-xs md:text-sm font-medium transition-all cursor-pointer shadow-sm",
                  isActive
                    ? "bg-slate-900 text-white dark:bg-amber-400 dark:text-neutral-950 shadow-md"
                    : "bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700"
                )}
                aria-pressed={isActive}
              >
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full text-sm leading-none",
                    isActive
                      ? "bg-white/20 dark:bg-neutral-950/20"
                      : "bg-white shadow-xs dark:bg-neutral-700"
                  )}
                  aria-hidden="true"
                >
                  {cat.emoji}
                </span>

                {cat.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}