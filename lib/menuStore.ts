import type { Category } from "@/components/restaurant/categories";
import type { MenuItem } from "@/components/restaurant/menuData";
import { DEFAULT_CATEGORIES } from "@/components/restaurant/categories";
import { MOCK_MENU_ITEMS } from "@/components/restaurant/menuData";

export type MenuData = {
  categories: Category[];
  items: MenuItem[];
};

const STORAGE_KEY = "restaurant_menu_data_v1";

export function getDefaultMenuData(): MenuData {
  return {
    categories: DEFAULT_CATEGORIES,
    items: MOCK_MENU_ITEMS,
  };
}

export function loadMenuData(): MenuData {
  if (typeof window === "undefined") return getDefaultMenuData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultMenuData();
    const parsed = JSON.parse(raw) as MenuData;
    if (!parsed?.categories?.length || !Array.isArray(parsed.items)) {
      return getDefaultMenuData();
    }
    return parsed;
  } catch {
    return getDefaultMenuData();
  }
}

export function saveMenuData(data: MenuData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetMenuData(): MenuData {
  const data = getDefaultMenuData();
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
  return data;
}
