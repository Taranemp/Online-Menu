"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryEditor from "@/components/admin/CategoryEditor";
import ItemEditor from "@/components/admin/ItemEditor";
import { loadMenuData, saveMenuData, resetMenuData, type MenuData } from "@/lib/menuStore";
import { isAdminAuthed, clearAuth } from "@/lib/auth";
import { LayoutDashboard, LogOut, RotateCcw, ExternalLink } from "lucide-react";
import type { Category } from "@/components/restaurant/categories";
import type { MenuItem } from "@/components/restaurant/menuData";

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [data, setData] = useState<MenuData | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ok = isAdminAuthed();
      if (!ok) {
        router.replace("/login");
        return;
      }
      setAuthed(true);
      setData(loadMenuData());
      setReady(true);
    }
  }, [router]);

  const handleChange = (categories: Category[], items: MenuItem[]) => {
    const next = { categories, items };
    setData(next);
    saveMenuData(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleReset = () => {
    if (!confirm("بازنشانی به داده‌های پیش‌فرض؟")) return;
    const d = resetMenuData();
    setData(d);
  };

  const handleLogout = () => {
    clearAuth();
    router.replace("/login");
  };

  if (!ready || !authed) return null;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-900 text-white rounded-lg">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900">پنل مدیریت منو</h1>
              <p className="text-xs text-slate-500">ویرایش دسته‌بندی‌ها و آیتم‌ها</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {saved && <span className="text-xs text-green-600">ذخیره شد</span>}
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg"
            >
              <ExternalLink className="w-4 h-4" /> مشاهده سایت
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg"
            >
              <RotateCcw className="w-4 h-4" /> بازنشانی
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 border border-slate-200 rounded-lg"
            >
              <LogOut className="w-4 h-4" /> خروج
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryEditor categories={data.categories} items={data.items} onChange={handleChange} />
        <ItemEditor categories={data.categories} items={data.items} onChange={handleChange} />
      </main>
      <p className="text-center text-xs text-slate-400 pb-6">دسترسی ادمین از طریق /login فعال می‌شود (رمز دمو: admin123)</p>
    </div>
  );
}

