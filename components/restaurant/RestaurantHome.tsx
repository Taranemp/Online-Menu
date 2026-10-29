"use client";

import { useState } from "react";
import RestaurantHeader from "./RestaurantHeader";
import CategoryNav from "./CategoryNav";
import MenuSection from "./MenuSection";
import BottomNav from "./BottomNav";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import { DEFAULT_CATEGORIES } from "./categories";
import { MOCK_MENU_ITEMS } from "./menuData";

const MOCK_RESTAURANT = {
  name: "کارولانز",
  location: "لاهیجان، میدان شیخ زاهد، ابتدای کمربندی",
};

const CATEGORY_SLUGS = DEFAULT_CATEGORIES.map((category) => category.slug);

export default function RestaurantHome() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 text-foreground flex flex-col relative">
      {/* سایدبار دسکتاپ */}
      <Sidebar />

      {/* بدنه اصلی */}
      <main className="flex-1 flex flex-col md:pl-20 w-full transition-all duration-300">
        <RestaurantHeader
          restaurantName={MOCK_RESTAURANT.name}
          location={MOCK_RESTAURANT.location}
        />
        
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 py-6">
          
          {/* نوار جستجو و دسته‌بندی‌ها (ترتیب صحیح در راستای هم) */}
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-4 mb-8 bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-slate-200/60">
            {/* دسته‌بندی‌ها که فضای بیشتری می‌گیرند */}
            <div className="w-full overflow-hidden">
              <CategoryNav categorySlugs={CATEGORY_SLUGS} />
            </div>

            {/* نوار جستجو */}
            <div className="w-full lg:w-72 shrink-0">
              <SearchBar
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
              />
            </div>
          </div>

          {/* بخش آیتم‌های منو */}
          <div className="pb-24">
            {DEFAULT_CATEGORIES.map((category) => {
              const items = MOCK_MENU_ITEMS.filter((item) => {
                const matchesCategory = item.categorySlug === category.slug;
                const matchesSearch =
                  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.description.toLowerCase().includes(searchQuery.toLowerCase());
                
                return matchesCategory && matchesSearch;
              });

              if (searchQuery && items.length === 0) return null;

              return (
                <MenuSection
                  key={category.slug}
                  slug={category.slug}
                  title={category.label}
                  items={items}
                />
              );
            })}
          </div>
        </div>
      </main>
      
      {/* منوی پایین موبایل */}
      <div className="md:hidden">
        <BottomNav active="/" />
      </div>
    </div>
  );
}