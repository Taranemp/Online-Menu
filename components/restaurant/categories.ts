import {
  UtensilsCrossed,
  Beef,
  Coffee,
  Salad,
  Pizza,
  Sandwich,

} from "lucide-react";

export type Category = {
  slug: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

// Shared category definitions — consumed by every route tree so the public
// `/categories/[slug]` flow and the multi-restaurant `/restaurants/[id]/...`
// flow render identical data.
export const DEFAULT_CATEGORIES: Category[] = [
  { slug: "salads", label: "سالادها", icon: Salad },
  { slug: "appetizers", label: "پیش‌غذا", icon: UtensilsCrossed },
  { slug: "maincourse", label: "غذای اصلی", icon: Beef },
  { slug: "pizza", label: "پیتزا", icon: Pizza },
  { slug: "burger", label: "برگر و ساندویچ", icon: Sandwich },
  { slug: "pasta", label: "پاستا", icon: UtensilsCrossed },
  { slug: "drinks", label: "نوشیدنی", icon: Coffee },
  

];

// Shared slug → label map for category detail pages.
export const CATEGORY_LABELS: Record<string, string> = {
  maincourse: "غذای اصلی",
  burger: "برگر و ساندویچ",
  pasta: "پاستا",
  salads: "سالادها",
  appetizers: "پیش‌غذا",
  drinks: "نوشیدنی",
  pizza: "پیتزا",
};
