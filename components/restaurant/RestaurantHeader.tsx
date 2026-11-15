import { MapPin } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

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
    <header className="relative isolate overflow-hidden bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-white/10 shadow-xs lg:bg-neutral-900 lg:text-white lg:border-white/5">

      {/* هدر مخصوص موبایل (پیرو تم) */}
      <div className="flex items-center justify-between px-4 py-4 lg:hidden">
        {/* سمت راست: تغییر تم */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>

        {/* مرکز: لوگوی گرد کوچک */}
        <div className="size-12 rounded-full overflow-hidden bg-[#114b3e] border border-neutral-200 dark:border-white/10 shadow-sm flex items-center justify-center text-white shrink-0">
          <span className="text-xs font-bold">طرح</span>
        </div>

        {/* سمت چپ: آیکون لوکیشن / نقشه */}
        <button
          type="button"
          className="p-2 rounded-full bg-transparent border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
          aria-label="موقعیت مکانی"
        >
          <MapPin className="size-5" />
        </button>
      </div>

      {/* هدر دسکتاپ (ساختار قبلی، رنگ تیره در هر دو تم) */}
      <div className="hidden lg:block mx-auto w-full max-w-7xl px-8 py-8">
        <div className="flex items-center justify-between gap-6">

          <div className="flex items-center gap-4 text-right">
            <div className="relative size-24 rounded-full overflow-hidden bg-[#114b3e] border-2 border-white shadow-md shrink-0 flex items-center justify-center text-white">
              <span className="text-lg font-bold">طرح</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {restaurantName}
              </h1>

              <div className="flex items-center gap-1.5 text-sm text-neutral-400">
                <MapPin className="size-4 text-emerald-400 shrink-0" />
                <span>{location}</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mt-0.5">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{statusText}</span>
              </div>
            </div>
          </div>

          <ThemeToggle />

        </div>
      </div>
    </header>
  );
}