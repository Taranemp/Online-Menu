"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import RestaurantHeader from "./RestaurantHeader";
import HeroSlider from "./HeroSlider";
import CategoryNav from "./CategoryNav";
import CategoryChipsBar from "./CategoryChipsBar";
import MenuSection from "./MenuSection";
import BottomNav from "./BottomNav";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import { loadMenuData, type MenuData } from "@/lib/storage";
import type { Category } from "./categories";
import type { MenuItem } from "./menuData";

const MOCK_RESTAURANT = {
  name: "restaurant name",
  location: "restaurant location",
};

function MenuSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-white/5">
      <div className="w-20 h-20 shrink-0 rounded-xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-2/3 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        <div className="h-3 w-full rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        <div className="h-3.5 w-1/3 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      </div>
    </div>
  );
}

export default function RestaurantHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuData, setMenuData] = useState<MenuData>(() => loadMenuData());

  // Mounted flag without setState-in-effect: false on server + hydration, true after.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const loading = !mounted;

  useEffect(() => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- re-read latest data on mount (same-tab admin edits)
    setMenuData(loadMenuData());
    const onStorage = (e: StorageEvent) => {
      if (e.key === "restaurant_menu_data_v1") setMenuData(loadMenuData());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const categories: Category[] = menuData?.categories ?? [];
  const items: MenuItem[] = menuData?.items ?? [];
  const categorySlugs = categories.map((c) => c.slug);

  const menuContent = categories.map((category) => {
    const filtered = items.filter((item) => {
      const matchesCategory = item.categorySlug === category.slug;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (searchQuery && filtered.length === 0) return null;

    return (
      <MenuSection
        key={category.slug}
        slug={category.slug}
        title={category.label}
        items={filtered}
      />
    );
  });

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-white flex flex-col relative">
      <Sidebar />

      <main className="flex-1 flex flex-col lg:pl-20 w-full transition-all duration-300">
        <RestaurantHeader
          restaurantName={MOCK_RESTAURANT.name}
          location={MOCK_RESTAURANT.location}
        />

        <div className="mx-auto w-full max-w-lg lg:max-w-7xl px-4 md:px-8 py-6 space-y-6">
          <HeroSlider />

          {/* Desktop category nav + search (white box) */}
          <div className="hidden lg:flex flex-col-reverse lg:flex-row items-center justify-between gap-4 bg-white dark:bg-neutral-900 p-3 md:p-4 rounded-2xl shadow-sm border border-neutral-200 dark:border-white/10">
            <div className="w-full overflow-hidden">
              <CategoryNav categorySlugs={categorySlugs} />
            </div>

            <div className="w-full lg:w-72 shrink-0">
              <SearchBar
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
              />
            </div>
          </div>

          {/* Mobile search — lg:hidden */}
          <div className="lg:hidden mb-2">
            <SearchBar
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
            />
          </div>

          <div id="menu" className="pb-28 lg:pb-24">
            {/* Mobile sticky category chips — lg:hidden */}
            <div className="lg:hidden sticky top-0 z-30 -mx-4 h-14 bg-white dark:bg-neutral-950 backdrop-blur-md border-b border-neutral-200 dark:border-white/10">
              <CategoryChipsBar categorySlugs={categorySlugs} />
            </div>

            {loading ? (
              <>
                {/* Mobile skeleton */}
                <div className="lg:hidden space-y-3 pt-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <MenuSkeleton key={i} />
                  ))}
                </div>
                {/* Desktop: render data immediately (no skeleton) */}
                <div className="hidden lg:block">{menuContent}</div>
              </>
            ) : (
              menuContent
            )}
          </div>
        </div>
      </main>

      <div className="lg:hidden">
        <BottomNav active="/" />
      </div>
    </div>
  );
}