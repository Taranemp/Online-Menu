"use client";

import { useEffect, useState } from "react";
import CategoryEditor from "@/components/admin/CategoryEditor";
import ItemEditor from "@/components/admin/ItemEditor";
import { useMenu } from "@/hooks/useMenu";
import { isAdminAuthed, clearAuth, resetMenuData, type MenuData } from "@/lib/storage";
import { LayoutDashboard, LogOut, RotateCcw, ExternalLink } from "lucide-react";

export default function AdminPage() {
  const { categories, items, updateMenu } = useMenu();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const ok = isAdminAuthed();
      if (!ok) {
        window.location.assign("/login");
        return;
      }
      setAuthed(true);
    } catch {
      window.location.assign("/login");
    }
  }, []);

  const handleChange = (next: MenuData) => {
    updateMenu(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  };

  const handleReset = () => {
    if (typeof window === "undefined") return;
    if (!window.confirm("بازنشانی به داده‌های پیش‌فرض؟")) return;
    const d = resetMenuData();
    updateMenu(d);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  };

  const handleLogout = () => {
    try {
      clearAuth();
    } catch {}
    if (typeof window !== "undefined") {
      window.location.assign("/login");
    }
  };

  if (authed === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-slate-500 text-sm animate-pulse">در حال بررسی دسترسی...</div>
      </div>
    );
  }

  if (!authed) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-900 text-white rounded-lg">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900">پنل مدیریت منو</h1>
              <p className="text-xs text-slate-500">ویرایش دسته‌بندی‌ها و آیتم‌ها</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {saved && <span className="text-xs text-green-600">ذخیره شد</span>}
            <a
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg cursor-pointer touch-manipulation"
            >
              <ExternalLink className="w-4 h-4" /> مشاهده سایت
            </a>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg cursor-pointer touch-manipulation"
            >
              <RotateCcw className="w-4 h-4" /> بازنشانی
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 border border-slate-200 rounded-lg cursor-pointer touch-manipulation"
            >
              <LogOut className="w-4 h-4" /> خروج
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryEditor categories={categories} items={items} onChange={handleChange} />
        <ItemEditor categories={categories} items={items} onChange={handleChange} />
      </main>
      <p className="text-center text-xs text-slate-400 pb-6">دسترسی ادمین از طریق /login فعال می‌شود (رمز دمو: admin123)</p>
    </div>
  );
}
