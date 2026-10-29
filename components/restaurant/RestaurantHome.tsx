"use client";

import { useState } from "react";
import RestaurantHeader from "./RestaurantHeader";
import CategoryNav from "./CategoryNav";
import MenuSection from "./MenuSection";
import BottomNav from "./BottomNav";
import SearchBar from "./SearchBar"; // کامپوننت جستجو
import { DEFAULT_CATEGORIES } from "./categories";
import { MOCK_MENU_ITEMS } from "./menuData";

const MOCK_RESTAURANT = {
  name: "اسم رستوران",
  location: "آدرس",
};

// Keep all categories, including categories without menu items.
const CATEGORY_SLUGS = DEFAULT_CATEGORIES.map((category) => category.slug);

export default function RestaurantHome() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background sm:max-w-lg">
      <RestaurantHeader
        restaurantName={MOCK_RESTAURANT.name}
        location={MOCK_RESTAURANT.location}
      />
      
      {/* اضافه کردن نوار جستجو با قابلیت فیلتر زنده */}
      <div className="px-4 py-2">
        <SearchBar
          value={searchQuery}
          onChange={(val) => setSearchQuery(val)}
        />
      </div>

      <CategoryNav categorySlugs={CATEGORY_SLUGS} />
      
      <div className="pb-24">
        {DEFAULT_CATEGORIES.map((category) => {
          // پیدا کردن و فیلتر کردن آیتم‌های هر دسته بر اساس متن جستجو شده
          const items = MOCK_MENU_ITEMS.filter((item) => {
            const matchesCategory = item.categorySlug === category.slug;
            const matchesSearch =
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase());
            
            return matchesCategory && matchesSearch;
          });

          // اگر جستجو انجام شده و در این دسته چیزی پیدا نشد، این بخش نمایش داده نشود
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
      
      <BottomNav active="/" />
    </main>
  );
}