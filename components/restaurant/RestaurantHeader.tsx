import { MapPin, Menu } from "lucide-react";


type RestaurantHeaderProps = {
  restaurantName?: string;
  location?: string;
};

export default function RestaurantHeader({
  restaurantName = "اسم رستوران",
  location = "آدرس",
}: RestaurantHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden bg-black text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/restaurant-header.jpg')",
        }}
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-black/55" aria-hidden="true" />

      <div className="mx-auto w-full max-w-md">
        {/* استفاده از items-center برای قرارگیری منظم عمودی و تنظیم پدینگ دلخواه */}
        <div className="flex items-start justify-between px-4 pt-8 pb-16">
          <div className="flex items-start gap-2 text-sm md:text-base">
            <MapPin className="size-6 text-primary" />
            <span>{location}</span>
          </div>

          <div className="text-lg font-bold">{restaurantName}</div>

          <Menu className="size-7 cursor-pointer" aria-label="Menu" />
        </div>
      </div>
    </header>
  );
}
