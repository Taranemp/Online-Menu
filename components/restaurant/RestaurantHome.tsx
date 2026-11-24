"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HeroLanding from "./HeroLanding";
import { DEFAULT_CATEGORIES, type Category } from "./categories";
import { loadMenuData } from "@/lib/storage";

const MOCK_RESTAURANT = {
  name: "اسم رستوران",
  tagline: "طعم اصیل، لحظه‌های دلنشین",
};

export default function RestaurantHome() {
  const router = useRouter();
  const [categories] = useState<Category[]>(
    () => loadMenuData()?.categories ?? DEFAULT_CATEGORIES
  );

  const handleSelectCategory = (slug: string) => {
    router.push(`/categories/${slug}`);
  };

  return (
    <main className="min-h-[100svh] bg-neutral-950">
      <HeroLanding
        restaurantName={MOCK_RESTAURANT.name}
        tagline={MOCK_RESTAURANT.tagline}
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />
    </main>
  );
}
