import { MapPin, Menu } from "lucide-react";

type RestaurantHeaderProps = {
  restaurantName?: string;
  location?: string;
  statusText?: string;
};

export default function RestaurantHeader({
  restaurantName = "کارولانز",
  location = "لاهیجان، میدان شیخ زاهد، ابتدای کمربندی",
  statusText = "آماده ثبت سفارش هستیم",
}: RestaurantHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden bg-white text-slate-800 border-b border-slate-200/80 shadow-sm">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 py-6 md:py-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* سمت راست: اطلاعات رستوران و لوگو */}
          <div className="flex items-center gap-4 text-right w-full md:w-auto">
            {/* لوگوی گرد */}
            <div className="relative size-20 md:size-24 rounded-full overflow-hidden bg-[#114b3e] border-2 border-white shadow-md shrink-0 flex items-center justify-center text-white">
              <span className="text-lg font-bold">طرح</span>
            </div>

            {/* متن‌ها */}
            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {restaurantName}
              </h1>
              
              <div className="flex items-center gap-1.5 text-xs md:text-sm text-slate-500">
                <MapPin className="size-4 text-emerald-600 shrink-0" />
                <span>{location}</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mt-0.5">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{statusText}</span>
              </div>
            </div>
          </div>

          {/* سمت چپ: دکمه منوی همبرگری موبایل یا ابزارها */}
          <div className="flex items-center gap-3 self-end md:self-center">
            <button className="md:hidden p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition text-slate-700">
              <Menu className="size-6" />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}