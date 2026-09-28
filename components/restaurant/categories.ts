import {
  UtensilsCrossed,
  Soup,
  Beef,
  Coffee,
  Salad,
  Fish,
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
  { slug: "sushi", label: "سوشی", icon: Fish },
  { slug: "ramen", label: "رامن", icon: Soup },
  { slug: "donburi", label: "دونبوری", icon: Beef },
  { slug: "salads", label: "سالادها", icon: Salad },
  { slug: "appetizers", label: "پیش‌غذا", icon: UtensilsCrossed },
  { slug: "drinks", label: "نوشیدنی", icon: Coffee },
];

// Shared slug → label map for category detail pages.
export const CATEGORY_LABELS: Record<string, string> = {
  sushi: "سوشی",
  ramen: "رامن",
  donburi: "دونبوری",
  salads: "سالادها",
  appetizers: "پیش‌غذا",
  drinks: "نوشیدنی",
};
