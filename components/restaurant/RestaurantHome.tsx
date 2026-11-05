"use client";

import { useState, useEffect } from "react";
import RestaurantHeader from "./RestaurantHeader";
import HeroSlider from "./HeroSlider";
import CategoryNav from "./CategoryNav";
import MenuSection from "./MenuSection";
import BottomNav from "./BottomNav";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import { loadMenuData, type MenuData } from "@/lib/menuStore";
import type { Category } from "./categories";
import type { MenuItem } from "./menuData";

const MOCK_RESTAURANT = {
  name: "restaurant name",
  location: "restaurant location",
};

export default function RestaurantHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuData, setMenuData] = useState<MenuData | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
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

  return (
    <div className="min-h-screen bg-slate-50 text-foreground flex flex-col relative">
      <Sidebar />

      <main className="flex-1 flex flex-col md:pl-20 w-full transition-all duration-300">
        <RestaurantHeader
          restaurantName={MOCK_RESTAURANT.name}
          location={MOCK_RESTAURANT.location}
        />
        
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 py-6 space-y-6">
          <HeroSlider />

          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-4 bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-slate-200/60">
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

          <div id="menu" className="pb-24">
            {categories.map((category) => {
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
            })}
          </div>
        </div>
      </main>
      
      <div className="md:hidden">
        <BottomNav active="/" />
      </div>
    </div>
  );
}
