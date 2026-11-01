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

  const [currentSlug, setCurrentSlug] = useState(
    activeSlug ?? categories[0]?.slug ?? ""
  );

  useEffect(() => {
    if (activeSlug) {
      setCurrentSlug(activeSlug);
    }
  }, [activeSlug]);

  useEffect(() => {
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
          setCurrentSlug(visibleSections[0].target.id);
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

    setCurrentSlug(slug);

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
          const Icon = cat.icon;

          return (
            <li key={cat.slug} className="shrink-0">
              <button
                type="button"
                onClick={() => handleCategoryClick(cat.slug)}
                className={cn(
                  "flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-xs md:text-sm font-medium transition-all cursor-pointer shadow-sm",
                  isActive
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
                aria-pressed={isActive}
              >
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white text-slate-700 shadow-xs"
                  )}
                  aria-hidden="true"
                >
                  <Icon className="size-3.5" />
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