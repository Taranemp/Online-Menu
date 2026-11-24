"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Globe,
  Maximize2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_CATEGORIES, type Category } from "./categories";
import MiniSiteModal from "./MiniSiteModal";

type HeroLandingProps = {
  restaurantName?: string;
  tagline?: string;
  categories?: Category[];
  onSelectCategory?: (slug: string) => void;
};

const INFO_TITLE = "مینی‌وبسایت رستوران";
const INFO_DESCRIPTION = "منو، دسته‌بندی‌ها و سفارش آنلاین در یک نگاه";

export default function HeroLanding({
  restaurantName = "نام رستوران",
  tagline = "طعم اصیل، لحظه‌های دلنشین",
  categories = [],
  onSelectCategory,
}: HeroLandingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMiniSiteOpen, setIsMiniSiteOpen] = useState(false);
  const [lang, setLang] = useState<"FA" | "EN">("FA");
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen && !isMiniSiteOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen, isMiniSiteOpen]);

  useEffect(() => {
    if (!isOpen && !isMiniSiteOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (isMiniSiteOpen) {
        setIsMiniSiteOpen(false);
        return;
      }
      setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isMiniSiteOpen]);

  useEffect(() => {
    if (isOpen || isMiniSiteOpen) return;
    const el = heroRef.current;
    if (!el) return;

    let touchStartY = 0;

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY > 12) {
        event.preventDefault();
        setIsOpen(true);
      }
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? 0;
      if (touchStartY - currentY > 40) {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [isOpen, isMiniSiteOpen]);

  function handleSelectCategory(slug: string) {
    setIsOpen(false);
    window.setTimeout(() => {
      if (onSelectCategory) {
        onSelectCategory(slug);
        return;
      }
      document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 320);
  }

  return (
    <section
      ref={heroRef}
      className="relative h-[100svh] w-full shrink-0 overflow-hidden bg-neutral-950 text-white"
      aria-label="صفحه‌ی اصلی رستوران"
    >
      <Image
        src="/images/restaurant-header.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      <button
        type="button"
        onClick={() => setLang((current) => (current === "FA" ? "EN" : "FA"))}
        aria-label="تغییر زبان"
        className="absolute left-4 top-[max(1rem,env(safe-area-inset-top))] z-20 flex size-11 items-center justify-center gap-1 rounded-full border border-white/25 bg-black/30 text-[11px] font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <Globe className="size-4" aria-hidden="true" />
        <span>{lang}</span>
      </button>

      <div
        className={cn(
          "relative z-10 flex h-full flex-col items-center justify-between px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(4.5rem,env(safe-area-inset-top))] transition-all duration-500",
          isOpen && "scale-[0.97] opacity-70"
        )}
      >
        <div className="flex w-full flex-1 flex-col items-center justify-center text-center lg:pl-24">
          <div className="flex size-16 items-center justify-center rounded-full border border-white/40 bg-white/5 text-white shadow-lg backdrop-blur-sm sm:size-20">
            <UtensilsCrossed className="size-7 sm:size-8" aria-hidden="true" />
          </div>

          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
            {restaurantName}
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/70 sm:text-base">{tagline}</p>

          <button
            type="button"
            onClick={() => setIsMiniSiteOpen(true)}
            className="mt-8 flex w-full max-w-md items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-right backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label={INFO_TITLE}
          >
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-white">{INFO_TITLE}</span>
              <span className="mt-0.5 block truncate text-xs text-white/60">
                {INFO_DESCRIPTION}
              </span>
            </span>
            <Maximize2 className="size-4 shrink-0 text-white/70" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex w-full max-w-md flex-col items-center gap-1 rounded-2xl px-4 py-2 text-center transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="مشاهده منو"
        >
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur-sm",
              !isOpen && "motion-safe:animate-[hero-nudge_1.8s_ease-in-out_infinite]"
            )}
          >
            <ChevronUp className="size-5" aria-hidden="true" />
          </span>
          <span className="mt-1 text-base font-bold text-white">مشاهده منو</span>
          <span className="text-xs text-white/60">برای دیدن دسته‌بندی‌ها ضربه بزنید</span>
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[55] bg-black/60 backdrop-blur-[2px] transition-opacity duration-500",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="hero-sheet-title"
        inert={!isOpen}
        className={cn(
          "fixed inset-x-0 bottom-0 z-[60] mx-auto flex h-[82svh] max-h-[640px] w-full max-w-2xl flex-col rounded-t-[2rem] border-t border-white/10 bg-neutral-950/95 text-white shadow-2xl backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex justify-center pt-3">
          <span className="h-1.5 w-12 rounded-full bg-white/20" aria-hidden="true" />
        </div>

        <div className="flex items-center justify-between px-5 py-3">
          <h2 id="hero-sheet-title" className="text-base font-bold">
            دسته‌بندی‌های منو
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="بستن"
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          {categories.length === 0 ? (
            <p className="px-2 py-10 text-center text-sm text-white/50">
              دسته‌بندی‌ای وجود ندارد.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {categories.map((category) => {
                  const emoji =
                    category.emoji ??
                    DEFAULT_CATEGORIES.find((item) => item.slug === category.slug)?.emoji ??
                    "🍽️";
                  return (
                    <li key={category.slug}>
                      <button
                        type="button"
                        onClick={() => handleSelectCategory(category.slug)}
                        className="group flex min-h-[88px] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center transition-colors hover:border-amber-400/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      >
                        <span
                          className="flex size-10 items-center justify-center rounded-full bg-amber-400/15 text-2xl leading-none transition-colors group-hover:bg-amber-400/25"
                          aria-hidden="true"
                        >
                          {emoji}
                        </span>
                        <span className="text-xs font-medium leading-tight">{category.label}</span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ChevronDown className="size-4" aria-hidden="true" />
            بازگشت به صفحه‌ی اصلی
          </button>
        </div>
      </div>

      <MiniSiteModal open={isMiniSiteOpen} onClose={() => setIsMiniSiteOpen(false)} />
    </section>
  );
}