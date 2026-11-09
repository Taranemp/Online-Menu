import type { Category } from "@/components/restaurant/categories";
import type { MenuItem } from "@/components/restaurant/menuData";
import { DEFAULT_CATEGORIES } from "@/components/restaurant/categories";
import { MOCK_MENU_ITEMS } from "@/components/restaurant/menuData";

export const ADMIN_PASSWORD = "admin123";
export const USER_ROLE_KEY = "user_role";
export const ADMIN_AUTH_KEY = "admin_auth";
export const STORAGE_KEY = "restaurant_menu_data_v1";

export type UserRole = "customer" | "admin" | null;

export type MenuData = {
  categories: Category[];
  items: MenuItem[];
};

export function getDefaultMenuData(): MenuData {
  return {
    categories: DEFAULT_CATEGORIES,
    items: MOCK_MENU_ITEMS,
  };
}

// Auth helpers

export function getUserRole(): UserRole {
  if (typeof window === "undefined") return null;
  const role = localStorage.getItem(USER_ROLE_KEY);
  if (role === "customer" || role === "admin") return role;
  if (localStorage.getItem(ADMIN_AUTH_KEY) === "1") return "admin";
  return null;
}

export function setCustomerRole() {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_ROLE_KEY, "customer");
  localStorage.removeItem(ADMIN_AUTH_KEY);
}

export function setAdminAuthed() {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_ROLE_KEY, "admin");
  localStorage.setItem(ADMIN_AUTH_KEY, "1");
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_ROLE_KEY);
  localStorage.removeItem(ADMIN_AUTH_KEY);
  localStorage.removeItem("authToken");
}

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ADMIN_AUTH_KEY) === "1";
}

// Menu persistence helpers

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
