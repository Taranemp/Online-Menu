import BottomNav from "@/components/restaurant/BottomNav";
import { Tag } from "lucide-react";

export default function DiscountsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 pb-24">
      <header className="bg-white dark:bg-neutral-900 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-900 dark:bg-amber-400 text-white dark:text-neutral-950">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">تخفیف‌ها</h1>
            <p className="text-sm text-slate-500 dark:text-neutral-400">پیشنهادها و تخفیف‌های ویژه</p>
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 text-center text-slate-600 dark:text-neutral-400">
          در حال حاضر تخفیفی ثبت نشده است.
        </div>
      </main>
      <div className="md:hidden">
        <BottomNav active="/discounts" />
      </div>
    </div>
  );
}
