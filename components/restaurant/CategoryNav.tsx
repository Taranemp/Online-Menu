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
      className="w-full overflow-x-auto"
      aria-label="منو دسته‌بندی‌ها"
    >
      <ul className="flex items-center gap-1.5 px-3 py-3">
        {categories.map((cat) => {
          const isActive = currentSlug === cat.slug;
          const Icon = cat.icon;

          return (
            <li key={cat.slug}>
              <button
                type="button"
                onClick={() => handleCategoryClick(cat.slug)}
                className={cn(
                  "flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-muted/40 text-foreground hover:bg-muted"
                )}
                aria-pressed={isActive}
              >
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-primary/10 text-primary"
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
