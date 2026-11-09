"use client";

import { useState } from "react";
import type { Category } from "@/components/restaurant/categories";
import type { MenuItem } from "@/components/restaurant/menuData";
import type { MenuData } from "@/lib/storage";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

type Props = {
  categories: Category[];
  items: MenuItem[];
  onChange: (next: MenuData) => void;
};

// کلاس مشترک برای فیلدهای متنی
const inputClass =
  "w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400";

export default function CategoryEditor({ categories, items, onChange }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ slug: "", label: "" });
  const [isAdding, setIsAdding] = useState(false);

  const startEdit = (cat: Category) => {
    setEditingId(cat.slug);
    setForm({ slug: cat.slug, label: cat.label });
    setIsAdding(false);
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setForm({ slug: "", label: "" });
  };

  const cancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setForm({ slug: "", label: "" });
  };

  const save = () => {
    if (!form.slug.trim() || !form.label.trim()) return;
    if (isAdding) {
      if (categories.some((c) => c.slug === form.slug)) return;
      const newCat = {
        slug: form.slug,
        label: form.label,
        icon: categories[0]?.icon || (() => null),
      };
      onChange({ categories: [...categories, newCat], items });
    } else if (editingId) {
      const updated = categories.map((c) =>
        c.slug === editingId ? { ...c, slug: form.slug, label: form.label } : c
      );
      const updatedItems = items.map((i) =>
        i.categorySlug === editingId ? { ...i, categorySlug: form.slug } : i
      );
      onChange({ categories: updated, items: updatedItems });
    }
    cancel();
  };

  const remove = (slug: string) => {
    if (typeof window === "undefined") return;
    if (!window.confirm("این دسته‌بندی و آیتم‌های مرتبط حذف شوند؟")) return;
    onChange({
      categories: categories.filter((c) => c.slug !== slug),
      items: items.filter((i) => i.categorySlug !== slug),
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">دسته‌بندی‌ها</h2>
        <button
          type="button"
          onClick={startAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 cursor-pointer touch-manipulation"
        >
          <Plus className="w-4 h-4" /> افزودن
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
          <input
            placeholder="slug (مثال: drinks)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className={inputClass}
            dir="ltr"
          />
          <input
            placeholder="عنوان (مثال: نوشیدنی)"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            className={inputClass}
          />
          <div className="flex gap-2">
            <button type="button" onClick={save} className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg cursor-pointer touch-manipulation">
              <Save className="w-4 h-4" /> ذخیره
            </button>
            <button type="button" onClick={cancel} className="flex items-center gap-1 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm rounded-lg cursor-pointer touch-manipulation">
              <X className="w-4 h-4" /> انصراف
            </button>
          </div>
        </div>
      )}

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.slug} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">{cat.label}</p>
              <p className="text-xs text-slate-500" dir="ltr">{cat.slug}</p>
            </div>
            <div className="flex gap-1">
              <button type="button" onClick={() => startEdit(cat)} className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded cursor-pointer touch-manipulation">
                <Pencil className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => remove(cat.slug)} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer touch-manipulation">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}