"use client";

import { useState } from "react";
import { loadMenuData, saveMenuData, type MenuData } from "@/lib/storage";

export function useMenu() {
  const [menu, setMenu] = useState<MenuData>(loadMenuData);

  const updateMenu = (next: MenuData) => {
    setMenu(next);
    saveMenuData(next);
  };

  return {
    categories: menu.categories,
    items: menu.items,
    updateMenu,
  };
}
