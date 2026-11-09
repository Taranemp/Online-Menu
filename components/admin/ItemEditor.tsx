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

const emptyItem = (): Omit<MenuItem, "id"> => ({
  name: "",
  description: "",
  price: "",
  categorySlug: "",
  image: "",
});

// کلاس مشترک برای همه فیلدهای متنی
const inputClass =
  "w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400";

export default function ItemEditor({ categories, items, onChange }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<MenuItem, "id">>(emptyItem());
  const [isAdding, setIsAdding] = useState(false);

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      categorySlug: item.categorySlug,
      image: item.image || "",
    });
    setIsAdding(false);
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setForm({ ...emptyItem(), categorySlug: categories[0]?.slug || "" });
  };

  const cancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setForm(emptyItem());
  };

  const save = () => {
    if (!form.name.trim() || !form.categorySlug) return;
    if (isAdding) {
      const newItem: MenuItem = { ...form, id: `item-${Date.now()}` };
      onChange({ categories, items: [...items, newItem] });
    } else if (editingId) {
      onChange({
        categories,
        items: items.map((i) => (i.id === editingId ? { ...form, id: editingId } : i)),
      });
    }
    cancel();
  };

  const remove = (id: string) => {
    if (typeof window === "undefined") return;
    if (!window.confirm("این آیتم حذف شود؟")) return;
    onChange({ categories, items: items.filter((i) => i.id !== id) });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">آیتم‌های منو</h2>
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
            placeholder="نام آیتم"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
          <textarea
            placeholder="توضیحات"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputClass}
            rows={2}
          />
          <input
            placeholder="قیمت (مثال: ۱۵۰,۰۰۰ تومان)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className={inputClass}
          />
          <select
            value={form.categorySlug}
            onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-900"
          >
            <option value="">انتخاب دسته‌بندی</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
          <input
            placeholder="مسیر تصویر (اختیاری، مثال: /file.svg)"
            value={form.image || ""}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className={inputClass}
            dir="ltr"
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

      <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
        {items.map((item) => {
          const cat = categories.find((c) => c.slug === item.categorySlug);
          return (
            <li key={item.id} className="flex items-start justify-between gap-2 p-3 border border-slate-200 rounded-lg">
              <div className="min-w-0">
                <p className="font-medium text-slate-900 truncate">{item.name}</p>
                <p className="text-xs text-slate-500">{cat?.label || item.categorySlug} · {item.price}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button type="button" onClick={() => startEdit(item)} className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded cursor-pointer touch-manipulation">
                  <Pencil className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => remove(item.id)} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer touch-manipulation">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}