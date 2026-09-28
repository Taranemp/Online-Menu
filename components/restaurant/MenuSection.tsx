import MenuItem from "./MenuItem";
import type { MenuItem as MenuItemType } from "./menuData";

type MenuSectionProps = {
  title: string;
  items: MenuItemType[];
};

// Category title + list of compact food rows.
export default function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <section className="bg-background">
      <h2 className="px-4 py-3 text-center text-lg font-bold">{title}</h2>
      <ul className="divide-y divide-border">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
