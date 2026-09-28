import { MapPin, Menu } from "lucide-react";
import SearchBar from "./SearchBar";

type RestaurantHeaderProps = {
  restaurantName?: string;
  location?: string;
};

// Compact dark header with restaurant logo, location pin, hamburger menu,
// and an integrated search bar. Replaces the large Hero image approach.
export default function RestaurantHeader({
  restaurantName = "ساکورا",
  location = "تهران، میرداماد",
}: RestaurantHeaderProps) {
  return (
    <header className="bg-[#111827] pb-2 text-foreground">
      <div className="mx-auto w-full max-w-md">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-1 text-xs text-gray-300">
            <MapPin className="size-3.5" aria-hidden="true" />
            <span>{location}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-bold">{restaurantName}</span>
          </div>
          <Menu className="size-5 text-gray-300" aria-label="Menu" />
        </div>
        <div className="px-3 pb-2.5">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}