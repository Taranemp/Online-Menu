import RestaurantHeader from "./RestaurantHeader";
import CategoryNav from "./CategoryNav";
import MenuSection from "./MenuSection";
import BottomNav from "./BottomNav";
import { DEFAULT_CATEGORIES } from "./categories";
import { MOCK_MENU_ITEMS } from "./menuData";

// Mock restaurant details — replace with real data fetching when available.
// Keep this co-located so the restaurant identity stays easy to update.
const MOCK_RESTAURANT = {
  name: "اسم رستوران",
  location: " آدرس",
};

// Restaurant homepage — the single public entry point.
export default function RestaurantHome() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col bg-background min-h-screen sm:max-w-lg">
      <RestaurantHeader restaurantName={MOCK_RESTAURANT.name} location={MOCK_RESTAURANT.location} />
      <CategoryNav />
      <div className="pb-24">
        {DEFAULT_CATEGORIES.map((cat) => {
          const items = MOCK_MENU_ITEMS.filter((m) => m.categorySlug === cat.slug);
          if (items.length === 0) return null;
          return <MenuSection key={cat.slug} title={cat.label} items={items} />;
        })}
      </div>
      <BottomNav active="/" />
    </main>
  );
}