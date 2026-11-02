import { MapPin, Menu, Navigation } from "lucide-react";

type RestaurantHeaderProps = {
  restaurantName?: string;
  location?: string;
  statusText?: string;
};

export default function RestaurantHeader({
  restaurantName = "restaurant name",
  location = "restaurant location",
  statusText = "آماده ثبت سفارش هستیم",
}: RestaurantHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden bg-white text-slate-800 border-b border-slate-200/80 shadow-xs">
      
      {/* هدر مخصوص موبایل (مینیمال و مشابه نمونه درخواستی) */}
      <div className="flex items-center justify-between px-4 py-4 md:hidden bg-white">
        {/* سمت چپ: دکمه منوی همبرگری */}
        <button 
          type="button"
          className="p-2 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors duration-200 text-slate-700"
          aria-label="منو"
        >
          <Menu className="size-5" />
        </button>

        {/* مرکز: لوگوی گرد کوچک */}
        <div className="size-12 rounded-full overflow-hidden bg-[#114b3e] border border-slate-200 shadow-sm flex items-center justify-center text-white shrink-0">
          <span className="text-xs font-bold">طرح</span>
        </div>

        {/* سمت راست: آیکون لوکیشن / نقشه */}
        <button 
          type="button"
          className="p-2 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors duration-200 text-slate-700"
          aria-label="موقعیت مکانی"
        >
          <MapPin className="size-5" />
        </button>
      </div>

      {/* هدر دسکتاپ (ساختار کامل قبلی) */}
      <div className="hidden md:block mx-auto w-full max-w-7xl px-8 py-8">
        <div className="flex items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 text-right">
            <div className="relative size-24 rounded-full overflow-hidden bg-[#114b3e] border-2 border-white shadow-md shrink-0 flex items-center justify-center text-white">
              <span className="text-lg font-bold">طرح</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {restaurantName}
              </h1>
              
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="size-4 text-emerald-600 shrink-0" />
                <span>{location}</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mt-0.5">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{statusText}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}