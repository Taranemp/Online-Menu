import BottomNav from "@/components/restaurant/BottomNav";
import { Tag } from "lucide-react";

export default function DiscountsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-900 text-white">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">تخفیف‌ها</h1>
            <p className="text-sm text-slate-500">پیشنهادها و تخفیف‌های ویژه</p>
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-slate-600">
          در حال حاضر تخفیفی ثبت نشده است.
        </div>
      </main>
      <div className="md:hidden">
        <BottomNav active="/discounts" />
      </div>
    </div>
  );
}
