import { MapPin, Menu } from "lucide-react";
import SearchBar from "./SearchBar";

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
      <div
        className="absolute inset-0 -z-10 bg-black/55"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-md">
        {/* Top row */}
        <div className="flex items-center justify-between px-4 pt-6 pb-8">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="size-7" />
            <span>{location}</span>
          </div>

          <div className="text-base font-bold">
            {restaurantName}
          </div>

          <Menu className="size-8" aria-label="Menu" />
        </div>

        {/* Search */}
        <div className="px-4 pb-8">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}