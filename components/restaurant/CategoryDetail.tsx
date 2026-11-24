"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_CATEGORIES } from "./categories";
import type { MenuItem } from "./menuData";
import MenuItemCard from "./MenuItemCard";

type CategoryDetailProps = {
  slug: string;
  items: MenuItem[];
};

export default function CategoryDetail({ slug, items }: CategoryDetailProps) {
  const activeCategory = DEFAULT_CATEGORIES.find((category) => category.slug === slug);
  const pillRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const active = pillRefs.current[slug];
    active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [slug]);

  return (
    <main className="min-h-[100svh] bg-neutral-950 text-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col px-4 pb-10 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6">
        <div className="flex justify-center pb-4">
          <Link
            href="/"
            aria-label="بازگشت به دسته‌بندی‌ها"
            className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ChevronUp className="size-5" aria-hidden="true" />
          </Link>
        </div>

        <nav aria-label="دسته‌بندی‌ها" className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6">
          <ul className="flex min-w-max items-center gap-2">
            {DEFAULT_CATEGORIES.map((category) => {
              const isActive = category.slug === slug;
              return (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    ref={(node) => {
                      pillRefs.current[category.slug] = node;
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                      isActive
                        ? "border-amber-400/40 bg-amber-400 text-neutral-950"
                        : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <span className="text-base leading-none" aria-hidden="true">
                      {category.emoji}
                    </span>
                    <span>{category.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <header className="py-6 text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            {activeCategory?.label ?? slug}
          </h1>
        </header>

        <div className="flex flex-col gap-5">
          {items.length > 0 ? (
            items.map((item) => <MenuItemCard key={item.id} item={item} />)
          ) : (
            <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-white/60">
              آیتمی برای این دسته‌بندی پیدا نشد.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}