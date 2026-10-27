import RestaurantHeader from "./RestaurantHeader";
import CategoryNav from "./CategoryNav";
import MenuSection from "./MenuSection";
import BottomNav from "./BottomNav";
import { DEFAULT_CATEGORIES } from "./categories";
import { MOCK_MENU_ITEMS } from "./menuData";

const MOCK_RESTAURANT = {
  name: "اسم رستوران",
  location: "آدرس",
};

// Keep all categories, including categories without menu items.
const CATEGORY_SLUGS = DEFAULT_CATEGORIES.map((category) => category.slug);

export default function RestaurantHome() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background sm\:max-w-lg">
      <RestaurantHeader
        restaurantName={MOCK_RESTAURANT.name}
        location={MOCK_RESTAURANT.location}
      />
      <CategoryNav categorySlugs={CATEGORY_SLUGS} />
      <div className="pb-24">
        {DEFAULT_CATEGORIES.map((category) => {
          const items = MOCK_MENU_ITEMS.filter(
            (item) => item.categorySlug === category.slug,
          );

          return (
            <MenuSection
              key={category.slug}
              slug={category.slug}
              title={category.label}
              items={items}
            />
          );
        })}
      </div>
      <BottomNav active="/" />
    </main>
  );
}