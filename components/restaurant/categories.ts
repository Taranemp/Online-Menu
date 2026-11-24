export type Category = {
  slug: string;
  label: string;
  emoji: string;
};

// Shared category definitions — single source for grid, detail pill row, and labels.
export const DEFAULT_CATEGORIES: Category[] = [
  { slug: "salads", label: "سالادها", emoji: "🥗" },
  { slug: "appetizers", label: "پیش‌غذا", emoji: "🥟" },
  { slug: "maincourse", label: "غذای اصلی", emoji: "🍽️" },
  { slug: "pizza", label: "پیتزا", emoji: "🍕" },
  { slug: "burger", label: "برگر و ساندویچ", emoji: "🍔" },
  { slug: "pasta", label: "پاستا", emoji: "🍝" },
  { slug: "drinks", label: "نوشیدنی", emoji: "🥤" },
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
